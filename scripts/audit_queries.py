#!/usr/bin/env python3
"""Read-only live query sampling. No credentials, spreadsheet writes or emails.
Python standard library only; one serial request per source, persistent result cache.
"""
import argparse
import concurrent.futures
import datetime
import json
import pathlib
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parents[1]
NS = {'a': 'http://www.w3.org/2005/Atom', 'o': 'http://a9.com/-/spec/opensearch/1.1/'}

def plan():
    topics = json.loads((ROOT / 'docs/query-audit/2026-10-06/topics-before.json').read_text())
    jobs = []
    for t in topics:
        for source, queries in t['queries'].items():
            if source == 'cinii':
                continue  # Requires the operator's AppID. Never read or embed private GAS properties.
            for query in queries:
                for order in ['asc', 'desc']:
                    jobs.append(dict(topic=t['id'], source=source, query=query, order=order, phase='baseline'))
    candidates = {
        'dream': ['dream sleep', 'dream consciousness', 'dream phenomenology', 'dream recall', 'dream neurocognitive'],
        'experimental_philosophy': ['experimental philosophy', 'folk intuitions', 'moral judgment experiment', 'epistemic intuitions', 'experimental philosophical intuitions'],
        'ai_philosophy': ['machine consciousness', 'artificial intelligence philosophy', 'large language models understanding', 'machine moral agency', 'artificial intelligence epistemology']
    }
    for topic, queries in candidates.items():
        for query in queries:
            for order in ['relevance', 'desc']:
                jobs.append(dict(topic=topic, source='crossref', query=query, order=order, phase='candidate'))
    for query in [
        '(ti:"artificial intelligence" OR ti:"large language model" OR ti:LLM OR ti:LLMs OR ti:"machine consciousness" OR ti:"artificial consciousness") AND (ti:philosophy OR ti:philosophical OR ti:ethics OR ti:ethical OR ti:consciousness OR ti:sentience OR ti:understanding OR ti:agency OR ti:epistemology)',
        'ti:"machine consciousness" OR ti:"artificial consciousness" OR ti:"machine sentience"',
        '(ti:"large language model" OR ti:LLM OR ti:LLMs) AND (ti:understanding OR ti:meaning OR ti:consciousness OR ti:agency)',
        'ti:"machine ethics" OR ti:"artificial moral" OR ti:"moral agency"',
        '(ti:AI OR ti:"artificial intelligence" OR ti:"language model") AND (ti:philosophical OR ti:epistemology OR ti:epistemic OR ti:intentionality)',
    ]:
        jobs.append(dict(topic='ai_philosophy', source='arxiv', query=query, order='desc', phase='candidate'))
    return jobs

def url_for(job, count):
    if job['source'] == 'crossref':
        params = {job.get('query_field', 'query.title'): job['query'], 'rows': count, 'offset': 0, 'filter': 'type:journal-article'}
        if job['order'] != 'relevance':
            params.update(sort='published', order=job['order'])
        if job.get('query_field') == 'query.bibliographic':
            params.update(sort='score', order='desc')
        if job.get('from_date'):
            params['filter'] += ',from-pub-date:' + job['from_date'] + ',until-pub-date:' + job['until_date']
        return 'https://api.crossref.org/works?' + urllib.parse.urlencode(params)
    return 'https://export.arxiv.org/api/query?' + urllib.parse.urlencode(dict(search_query=job['query'], start=0, max_results=count, sortBy='submittedDate', sortOrder='ascending' if job['order']=='asc' else 'descending'))

def fetch(job, count):
    result = dict(job, url=url_for(job, count), checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(), sample_size=count)
    try:
        req = urllib.request.Request(result['url'], headers={'User-Agent': 'GAS-Paper-Harvester-Query-Audit/1.0', 'Accept': 'application/json' if job['source']=='crossref' else 'application/atom+xml'})
        with urllib.request.urlopen(req, timeout=25) as r:
            result['http_status'] = r.status
            text = r.read().decode('utf-8')
        if job['source'] == 'crossref':
            data = json.loads(text)['message']
            result.update(total=data['total-results'], items=[{'title': (x.get('title') or [''])[0], 'url': 'https://doi.org/' + x['DOI'], 'doi': x['DOI'], 'published': x.get('published', {}).get('date-parts'), 'journal': x.get('container-title', [])} for x in data['items']])
        else:
            root = ET.fromstring(text)
            result.update(total=int(root.findtext('o:totalResults', '0', NS)), items=[{'title': ' '.join(x.findtext('a:title', '', NS).split()), 'url': x.findtext('a:id', '', NS), 'published': x.findtext('a:published', '', NS)} for x in root.findall('a:entry', NS)])
    except urllib.error.HTTPError as e:
        result.update(http_status=e.code, error=str(e), retry_after=e.headers.get('Retry-After'))
    except Exception as e:
        result['error'] = str(e)
    return result

def run_source(source, jobs, out, count):
    target = out / (source + '.json')
    results = json.loads(target.read_text()) if target.exists() else []
    identity = lambda j: (j['query'], j['order'], j['phase'], j['topic'], j.get('query_field'), j.get('from_date'), j.get('until_date'))
    done = {identity(j) for j in results}
    for job in jobs:
        if job['source'] != source or identity(job) in done:
            continue
        result = fetch(job, count)
        results.append(result)
        target.write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
        print(source, job['phase'], job['order'], job['query'], result.get('http_status'), len(result.get('items', [])), flush=True)
        # Do not keep probing a service that asks us to stop.
        if result.get('http_status') in (403, 429):
            print(source, 'stopped: access/rate limit', flush=True)
            break
        time.sleep(3.2 if source == 'arxiv' else 1.1)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=pathlib.Path, default=ROOT/'docs/query-audit/2026-10-06')
    parser.add_argument('--plan', type=pathlib.Path, help='Explicit frozen query plan JSON; default is the original baseline/candidate audit')
    parser.add_argument('--count', type=int, default=5)
    args = parser.parse_args()
    if not 1 <= args.count <= 20:
        parser.error('--count must be 1..20')
    args.output.mkdir(parents=True, exist_ok=True)
    jobs = json.loads(args.plan.read_text()) if args.plan else plan()
    (args.output/'plan.json').write_text(json.dumps(jobs, ensure_ascii=False, indent=2)+'\n')
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        list(executor.map(lambda s: run_source(s, jobs, args.output, args.count), ['crossref', 'arxiv']))
