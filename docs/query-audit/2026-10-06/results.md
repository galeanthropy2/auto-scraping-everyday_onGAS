# クエリ別の保存サンプルとフィルター判定

2026-10-06の取得結果。各APIクエリは先頭5件の標本であり、全検索結果の精度・再現率は測定していません。
採用/除外は現行設定を保存タイトルへ適用した機械判定です。専門家による関連性・論文品質の評価ではありません。
抄録は保存していないため、実験哲学のタイトル＋抄録判定はここではタイトルのみの保守的な評価です。
totalはAPIが返す候補総数であり、テーマに合致する論文数ではありません。CiNiiは外部検索インデックスの補助確認で、APIの検索順位・件数は未検証です。

## crossref / dream / baseline / asc

クエリ: `lucid dreaming`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 4389。

[検索リクエスト](https://api.crossref.org/works?query.title=lucid+dreaming&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=asc)

- 除外: [I. An account of several nebulæ or lucid spots like clouds, lately discovered among the fixt stars by help of the telescope](https://doi.org/10.1098/rstl.1714.0046)
- 除外: [II. On the diameter and magnitude of the Georgium Sidus; with a description of the dark and lucid disk and periphery micrometers](https://doi.org/10.1098/rstl.1783.0002)
- 除外: [XLII. <i>An essay on dreaming, including conjectures on the proximate cause of sleep</i>](https://doi.org/10.1080/14786441908652223)
- 除外: [LVI. <i>An essay on dreaming, including conjectures on the proximate cause of sleep</i>](https://doi.org/10.1080/14786441908652240)
- 除外: [Talk Not of Childhood's Dreaming Time](https://doi.org/10.2307/30058118)

## crossref / dream / baseline / desc

クエリ: `lucid dreaming`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 4389。

[検索リクエスト](https://api.crossref.org/works?query.title=lucid+dreaming&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 採用: [Synthetic dreaming for state-conditioned epistemic exploration in neural networks](https://doi.org/10.1016/j.neunet.2026.109664)
- 除外: [Social media reveals population dynamics of dysphoric dreaming](https://doi.org/10.1016/j.sleepe.2026.100156)
- 除外: [Physiology of the subconscious: Autonomic activation during sexual dreaming](https://doi.org/10.1016/j.sleepx.2026.100174)
- 除外: [LUCID: A Training-Free Few-Shot Framework for Leaf Disease Diagnosis via Visual–Knowledge Evidence Fusion](https://doi.org/10.3390/horticulturae12101241)
- 除外: [Dreaming Elsewhere: Shadows of Hope and Dreams of Departure in Kareem Sheghaidil’s Cartoon Dreams](https://doi.org/10.66359/itqan.v1i4.076)

## crossref / dream / baseline / asc

クエリ: `nightmare sleep`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 206682。

[検索リクエスト](https://api.crossref.org/works?query.title=nightmare+sleep&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=asc)

- 除外: [VI. An account of a person who took a great quantity of opium, without causing sleep](https://doi.org/10.1098/rstl.1700.0107)
- 除外: [LXV. Some observation upon the sleep of plants; and an account of that faculty, which Linnæus calls vigiliæ florum; with an enumeration of several plants, which are subject to that law](https://doi.org/10.1098/rstl.1757.0066)
- 除外: [VII. <i>Observations on the winter sleep of animals and plants</i>](https://doi.org/10.1080/14786449908676974)
- 除外: [XXVII. <i>On the phœnomena of sleep</i>](https://doi.org/10.1080/14786441408637986)
- 除外: [XIII. <i>Account of the remarkable Case of Margaret Lyall, who continued in a State of Sleep nearly Six Weeks</i>](https://doi.org/10.1017/s008045680002891x)

## crossref / dream / baseline / desc

クエリ: `nightmare sleep`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 206682。

[検索リクエスト](https://api.crossref.org/works?query.title=nightmare+sleep&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Sleep Quality Among Iranian Hemodialysis: A Multicenter Study](https://doi.org/10.5812/numonthly.23849)
- 除外: [Baihe Ganmai Dazao Decoction ameliorates depression-like and sleep-disturbance phenotypes: potential involvement of IL-17A/IL-17RA-related inflammatory signaling and microglial polarization](https://doi.org/10.1016/j.jep.2026.122393)
- 除外: [Shenghui decoction improves sleep-deprivation-induced cognitive impairment in mice by modulating neuroinflammation, NRG1/ErbB4 signaling, and purine metabolism](https://doi.org/10.1016/j.jep.2026.122412)
- 除外: [Sleep regulation as a function of boredom proneness](https://doi.org/10.1016/j.paid.2026.114110)
- 除外: [Corrigendum to ‘Implementation and evaluation of the multidisciplinary ‘ABCDEF of sleep’ protocol in Brazilian intensive care units: A quasi-experimental study. Results of a two-phase’ J. Crit. Care 95 155649](https://doi.org/10.1016/j.jcrc.2026.155737)

## crossref / experimental_philosophy / baseline / asc

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 1件。 API候補総数: 824462。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=asc)

- 除外: [An experimental history of cold](https://doi.org/10.1098/rstl.1665.0006)
- 除外: [A further account of Mr. Boyle's experimental history of cold](https://doi.org/10.1098/rstl.1665.0025)
- 除外: [An extract of a letter, written by J. Denis, doctor of physick, and professor of philosophy and the mathematicks at Paris, touching a late cure of an inveterate phrensy by the transfusion of bloud](https://doi.org/10.1098/rstl.1666.0065)
- 除外: [An extract of a letter of M. Denis Prof. of philosophy and mathematicks to M. * * * touching the transfusion of blood, of April 2. 1667](https://doi.org/10.1098/rstl.1666.0013)
- 採用: [An account of some books. I. The History of the Royal Society of London, for the advancement of experimental philosophy, by Tho. Sprat. II. Disquisitio Anatomica de Formato Fætu: Authore Gualtero Needham M.D. Londini, in 8°. III. Elementorum Mylogiæ specimen; seu Musculi descriptio geometrica, authore Nicolao Stenone](https://doi.org/10.1098/rstl.1666.0038)

## crossref / experimental_philosophy / baseline / desc

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 824462。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Experimental methods to corruption](https://doi.org/10.15556/ijsim.01.04.003)
- 除外: [A chlorhexidine-releasing epoxy-based coating on titanium implants prevents Staphylococcus aureus experimental biomaterial-associated infection](https://doi.org/10.22203/ecm.v033a11)
- 除外: [Artistic philosophy of death in short stories by G. Gazdanov](https://doi.org/10.17223/18137083/55/9)
- 除外: [SISTEMAS DE POLIMENTO EM CIMENTOS IONÔMERO DE VIDRO: UMA ANÁLISE EXPERIMENTAL DA RUGOSIDADE E MANCHAMENTO SUPERFICIAL](https://doi.org/10.22409/jsac0x11)
- 除外: [Photovoltaic maximum power extraction and delivery based on adaptive PSO-neural network-fuzzy algorithms implemented using an experimental test bench](https://doi.org/10.1016/j.uncres.2026.100490)

## crossref / ai_philosophy / baseline / asc

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 0件。 API候補総数: 557546。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=asc)

- 除外: [An extract of a letter, written by J. Denis, doctor of physick, and professor of philosophy and the mathematicks at Paris, touching a late cure of an inveterate phrensy by the transfusion of bloud](https://doi.org/10.1098/rstl.1666.0065)
- 除外: [An extract of a letter of M. Denis Prof. of philosophy and mathematicks to M. * * * touching the transfusion of blood, of April 2. 1667](https://doi.org/10.1098/rstl.1666.0013)
- 除外: [An account of some books. I. The History of the Royal Society of London, for the advancement of experimental philosophy, by Tho. Sprat. II. Disquisitio Anatomica de Formato Fætu: Authore Gualtero Needham M.D. Londini, in 8°. III. Elementorum Mylogiæ specimen; seu Musculi descriptio geometrica, authore Nicolao Stenone](https://doi.org/10.1098/rstl.1666.0038)
- 除外: [An extract of a letter, lately written by Monsieur Louys de Bills to D. Tobias Andreæ Professor of Physick and Philosophy at Duysborgh on the Rhyn ; touching the true use of the lymphatick-vessels, &amp;c](https://doi.org/10.1098/rstl.1668.0044)
- 除外: [An accompt of three books. - I. De anglorum gentis origine disceptatio, Auth. Rob. Sheringhamo Cantabrigiensi, Colleg. Gonvilii &amp; Caii Socio. Cantabrigiæ, 1670. in 8°., II. A vindication of hydrologia chymica, by William Sympson M. D. London, for R. Chiswell in little Britain, 1670., III. A discourse in vindication of Des-Cartes's systeme, by M. Des Fourneillis: to which in annexed the systeme general of the same cartesian philosophy, by Francis Bayle, M. D. at Tolose. printed at London for Moses](https://doi.org/10.1098/rstl.1670.0037)

## crossref / ai_philosophy / baseline / desc

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 557546。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [The Role of Attachment Styles and Spiritual Intelligence in Predicting Women’s Emotional Divorce](https://doi.org/10.32598/jccnc.7.1.350.1)
- 除外: [We Cannot Cede Control of Weapons to Artificial Intelligence](https://doi.org/10.1038/scientificamerican072077-axs4kzsdvehyqhomb7gkv)
- 除外: [Artistic philosophy of death in short stories by G. Gazdanov](https://doi.org/10.17223/18137083/55/9)
- 除外: [Evolution and Applications of Artificial Intelligence in SAIs](https://doi.org/10.56251/yxek7242)
- 除外: [Russian ‘special military operation’ as a failed coup de main. An intelligence analysis perspective](https://doi.org/10.4467/20801335pbw.25.015.22181)

## crossref / ai_philosophy / baseline / asc

クエリ: `artificial intelligence ethics`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 571040。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+ethics&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=asc)

- 除外: [VI. A method of making artificial magnets without the use of natural ones; communicated to the Royal Society by John Canton, M. A. &amp; F. R. S. To which is prefixed the President's report](https://doi.org/10.1098/rstl.1751.0007)
- 除外: [LXIV. An account of artificial cold produced at Petersburg: By Dr. Himsel. In a letter to Dr. De Castro, F. R. S. translated from the French by James Parsons, M. D. F. R. S](https://doi.org/10.1098/rstl.1759.0066)
- 除外: [XXI. Some further intelligence relating to the jaculator fish, mentioned in the Philosophical Transactions for 1764, Art. XIV. from Mr. Hommel, at Batavia, together with the description of another species, by Dr. Pallas, F. R. S. in a letter to Mr. Peter Collinson, F. R. S. from John Albert Schlosser, M.D. F. R. S.](https://doi.org/10.1098/rstl.1766.0021)
- 除外: [V. Account of Dr. Knight's method of making artificial loadstones](https://doi.org/10.1098/rstl.1779.0006)
- 除外: [II. Of the method of rendering very sensible the weakest natural or artificial electricity](https://doi.org/10.1098/rstl.1782.0005)

## crossref / ai_philosophy / baseline / desc

クエリ: `artificial intelligence ethics`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 0件。 API候補総数: 571040。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+ethics&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Natural Sustainability Ethics for Resolving Current Outer Space Challenges](https://doi.org/10.61781/11i20212bmlm)
- 除外: [The Role of Attachment Styles and Spiritual Intelligence in Predicting Women’s Emotional Divorce](https://doi.org/10.32598/jccnc.7.1.350.1)
- 除外: [We Cannot Cede Control of Weapons to Artificial Intelligence](https://doi.org/10.1038/scientificamerican072077-axs4kzsdvehyqhomb7gkv)
- 除外: [Evolution and Applications of Artificial Intelligence in SAIs](https://doi.org/10.56251/yxek7242)
- 除外: [Russian ‘special military operation’ as a failed coup de main. An intelligence analysis perspective](https://doi.org/10.4467/20801335pbw.25.015.22181)

## crossref / dream / candidate / relevance

クエリ: `dream sleep`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 224287。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+sleep&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Yawning, sleep and dream](https://doi.org/10.1556/oh.2011.ho2285)
- 除外: [Modeling Dream and Sleep](https://doi.org/10.1088/0031-8949/1989/t25/027)
- 除外: [SLEEP, DREAM, AND RELAX](https://doi.org/10.1002/j.2326-1951.1962.tb00612.x)
- 除外: [Sleep, perchance to dream](https://doi.org/10.51428/tsr.flgv5282)
- 除外: [To Dream, To Sleep…](https://doi.org/10.1037/025615)

## crossref / dream / candidate / desc

クエリ: `dream sleep`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 224287。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+sleep&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Sleep Quality Among Iranian Hemodialysis: A Multicenter Study](https://doi.org/10.5812/numonthly.23849)
- 除外: [DREAM-Boost: Asymmetric boosting with soft local expert correction for decision-oriented proxy need prediction in urban EV charging](https://doi.org/10.1016/j.epsr.2026.113944)
- 除外: [Baihe Ganmai Dazao Decoction ameliorates depression-like and sleep-disturbance phenotypes: potential involvement of IL-17A/IL-17RA-related inflammatory signaling and microglial polarization](https://doi.org/10.1016/j.jep.2026.122393)
- 除外: [Shenghui decoction improves sleep-deprivation-induced cognitive impairment in mice by modulating neuroinflammation, NRG1/ErbB4 signaling, and purine metabolism](https://doi.org/10.1016/j.jep.2026.122412)
- 除外: [Sleep regulation as a function of boredom proneness](https://doi.org/10.1016/j.paid.2026.114110)

## crossref / dream / candidate / relevance

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 4件。 API候補総数: 61578。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Dream and consciousness](https://doi.org/10.1111/j.1479-8425.2004.00127.x)
- 除外: [Utopian Dream and Dark Consciousness](https://doi.org/10.1215/25783491-7480357)
- 採用: [Psychohistorical Origin of Dream Consciousness](https://doi.org/10.70763/816a6db41f0e44644bc65808b6db5ca4)
- 採用: [Dream Consciousness in Problem Solving](https://doi.org/10.2190/du8h-bbym-l31g-60c0)
- 採用: [Studies of the Dream Consciousness. II](https://doi.org/10.2307/1412430)

## crossref / dream / candidate / desc

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 61578。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [DREAM-Boost: Asymmetric boosting with soft local expert correction for decision-oriented proxy need prediction in urban EV charging](https://doi.org/10.1016/j.epsr.2026.113944)
- 除外: [Store coolness in luxury fashion: Antecedents, outcomes, and the moderating role of price consciousness](https://doi.org/10.1016/j.jretconser.2026.105130)
- 除外: [Designing the future of consciousness: A components framework and speculative implications](https://doi.org/10.1016/j.ijhcs.2026.103926)
- 除外: [Dream training for active control of multiphase flow in spray fluidized beds](https://doi.org/10.1016/j.ces.2026.124778)
- 除外: [From neural propagation to conscious experience: A geometro-diffusion theory of consciousness](https://doi.org/10.1016/j.jtbi.2026.112610)

## crossref / dream / candidate / relevance

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 3件。 API候補総数: 36215。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Toward a Phenomenology of Dream Imagery and Metaphor](https://doi.org/10.2307/3192330)
- 採用: [The phenomenology of dream–reality confusion: A quantitative study.](https://doi.org/10.1037/drm0000078)
- 採用: [Neurophysiological features of dream recall and the phenomenology of dreams: Auditory stimulation impacts dream experiences](https://doi.org/10.1016/j.concog.2025.103869)
- 除外: [Kilka zadań fenomenologii snu](https://doi.org/10.31261/fp.21381)
- 除外: [A Deep-Dream Virtual Reality Platform for Studying Altered Perceptual Phenomenology](https://doi.org/10.1038/s41598-017-16316-2)

## crossref / dream / candidate / desc

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 36215。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [DREAM-Boost: Asymmetric boosting with soft local expert correction for decision-oriented proxy need prediction in urban EV charging](https://doi.org/10.1016/j.epsr.2026.113944)
- 除外: [Dream training for active control of multiphase flow in spray fluidized beds](https://doi.org/10.1016/j.ces.2026.124778)
- 除外: [Strong Einstein–Hilbert gravity inflation and ACT phenomenology](https://doi.org/10.1016/j.aop.2026.170746)
- 除外: [Unveiling the meaning of communities' experience in developing rural tourism in Borobudur, Indonesia: A phenomenology study](https://doi.org/10.1016/j.ssaho.2026.103321)
- 除外: [State of health estimation for lithium-ion batteries based on physics-informed pseudo-labeling and dream-optimization-algorithm-optimized MDC-Net](https://doi.org/10.1016/j.est.2026.124221)

## crossref / dream / candidate / relevance

クエリ: `dream recall`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 40726。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+recall&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Dream Recall](https://doi.org/10.1176/ajp.128.3.296)
- 除外: [Restructuring Dream-Recall](https://doi.org/10.2466/pms.1983.57.2.629)
- 除外: [Dream recall and dream recall failure: An arousal-retrieval model.](https://doi.org/10.1037/0033-2909.83.5.975)
- 除外: [Effects of training in dream recall and dream interpretation skills on dream recall, attitudes, and dream interpretation outcome.](https://doi.org/10.1037/0022-0167.46.1.27)
- 除外: [Effects of training in dream recall and dream interpretation skills on dream recall, attitudes, and dream interpretation outcome.](https://doi.org/10.1037//0022-0167.46.1.27)

## crossref / dream / candidate / desc

クエリ: `dream recall`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 40726。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+recall&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [DREAM-Boost: Asymmetric boosting with soft local expert correction for decision-oriented proxy need prediction in urban EV charging](https://doi.org/10.1016/j.epsr.2026.113944)
- 除外: [Development of mental imagery strategy in a recall task as a function of word imageability and grade level in elementary school children](https://doi.org/10.1016/j.learninstruc.2026.102483)
- 除外: [Dream training for active control of multiphase flow in spray fluidized beds](https://doi.org/10.1016/j.ces.2026.124778)
- 除外: [Numeracy and recall of Alzheimer’s disease risk information: Effects of risk format in a Latino community](https://doi.org/10.1016/j.pec.2026.110330)
- 除外: [Changes in neural activation and in functional connectivity during affective memory recall after six months of psychotherapy: An fMRI study of individuals with depression](https://doi.org/10.1016/j.jad.2026.122532)

## crossref / dream / candidate / relevance

クエリ: `dream neurocognitive`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 35373。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+neurocognitive&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Neurocognitive dynamics of spontaneous offline simulations: Re-conceptualizing (dream)bizarreness](https://doi.org/10.1080/09515089.2022.2042231)
- 除外: [Emotion regulation as reflected in children’s dreams – a developmental test of the neurocognitive dream theory](https://doi.org/10.1556/0406.17.2016.2.5)
- 除外: [From Dream, to Dream, to Dream](https://doi.org/10.1353/ctr.0.0007)
- 除外: [P02-194 - The Sang Bok Lee Neurocognitive Dream Orientations Scales for Screening Traumatic and PTSD-Related Dreams](https://doi.org/10.1016/s0924-9338(10)70809-9)
- 除外: [Dream No Small Dream](https://doi.org/10.1162/afar_a_00565)

## crossref / dream / candidate / desc

クエリ: `dream neurocognitive`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 35373。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+neurocognitive&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [DREAM-Boost: Asymmetric boosting with soft local expert correction for decision-oriented proxy need prediction in urban EV charging](https://doi.org/10.1016/j.epsr.2026.113944)
- 除外: [Dream training for active control of multiphase flow in spray fluidized beds](https://doi.org/10.1016/j.ces.2026.124778)
- 除外: [Therapeutic potential of a novel PPARγ agonist in a mouse model of HIV-associated neurocognitive impairment](https://doi.org/10.1016/j.bbi.2026.106981)
- 除外: [From dysbiosis to postoperative neurocognitive disorders: The anesthesia-disrupted microbiota-gut-brain axis](https://doi.org/10.1016/j.expneurol.2026.116034)
- 除外: [Neurocognitive effects of stress in higher education: Mechanisms, challenges, and opportunities](https://doi.org/10.1016/j.bbr.2026.116470)

## crossref / experimental_philosophy / candidate / relevance

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 824462。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Experimental Philosophy](https://doi.org/10.1093/analys/anp104)
- 採用: [Experimental Philosophy](https://doi.org/10.1146/annurev-psych-120710-100350)
- 採用: [Experimental Philosophy](https://doi.org/10.1111/j.1747-9991.2006.00050.x)
- 採用: [Experimental Philosophy](https://doi.org/10.5840/pjphil2009319)
- 採用: [Experimental Philosophy](https://doi.org/10.1515/auk-2009-0201)

## crossref / experimental_philosophy / candidate / desc

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 824462。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Experimental methods to corruption](https://doi.org/10.15556/ijsim.01.04.003)
- 除外: [A chlorhexidine-releasing epoxy-based coating on titanium implants prevents Staphylococcus aureus experimental biomaterial-associated infection](https://doi.org/10.22203/ecm.v033a11)
- 除外: [Artistic philosophy of death in short stories by G. Gazdanov](https://doi.org/10.17223/18137083/55/9)
- 除外: [SISTEMAS DE POLIMENTO EM CIMENTOS IONÔMERO DE VIDRO: UMA ANÁLISE EXPERIMENTAL DA RUGOSIDADE E MANCHAMENTO SUPERFICIAL](https://doi.org/10.22409/jsac0x11)
- 除外: [Photovoltaic maximum power extraction and delivery based on adaptive PSO-neural network-fuzzy algorithms implemented using an experimental test bench](https://doi.org/10.1016/j.uncres.2026.100490)

## crossref / experimental_philosophy / candidate / relevance

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 24962。

[検索リクエスト](https://api.crossref.org/works?query.title=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Law, Coercion and Folk Intuitions](https://doi.org/10.1093/ojls/gqac014)
- 採用: [Trope analysis and folk intuitions](https://doi.org/10.1007/s11229-020-03013-3)
- 採用: [Folk Intuitions on Free Will](https://doi.org/10.1163/156853706776931385)
- 採用: [Motivational internalism and folk intuitions](https://doi.org/10.1080/09515089.2014.894431)
- 採用: [Reflection, reflex, and folk intuitions](https://doi.org/10.1016/j.concog.2011.02.018)

## crossref / experimental_philosophy / candidate / desc

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 24962。

[検索リクエスト](https://api.crossref.org/works?query.title=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [From uncertainty to dialogue: Visualising collaborative noticing and mathematical intuitions in students' narratives within probability learning](https://doi.org/10.54870/1551-3440.1695)
- 除外: [Application of Deep Learning Algorithms in the Transfer of Ethnic and Folk Art Design Styles in Cultural and Creative Products](https://doi.org/10.1504/ijart.2027.10076929)
- 除外: [Matters arising from Olcaysoy Okten, I., Lombard, J., Harkness, A., &amp; Gullesserian, M. C. (2026). How do intellectually humble people form impressions?: Regulating initial intuitions through reflection. Personality and Individual Differences, 256, 113729. https://doi.org/10.1016/j.paid.2026.113729](https://doi.org/10.1016/j.paid.2026.114038)
- 除外: [Intuitions of compromise: Utilitarianism, egalitarianism, contractualism](https://doi.org/10.1016/j.cognition.2026.106694)
- 除外: [Corrigendum to’ Integrating traditional, folk and home remedies with conventional medicine in the prevention and management of illness and disease in Iran: Voices of consumers’ Adv. Integr. Med., vol. 13 (2026) 100633/ Issue 2](https://doi.org/10.1016/j.aimed.2026.100717)

## crossref / experimental_philosophy / candidate / relevance

クエリ: `moral judgment experiment`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 255323。

[検索リクエスト](https://api.crossref.org/works?query.title=moral+judgment+experiment&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Experiment Study on Moral Judgment in Juvenile Violent Offenders](https://doi.org/10.12677/ap.2021.117194)
- 除外: [Moral Judgment](https://doi.org/10.1177/014616728172006)
- 除外: [Moral Judgment](https://doi.org/10.1177/0145482x2101500424)
- 除外: [Moral Judgment](https://doi.org/10.2307/3959916)
- 除外: [Moral Judgment](https://doi.org/10.2307/587374)

## crossref / experimental_philosophy / candidate / desc

クエリ: `moral judgment experiment`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 255323。

[検索リクエスト](https://api.crossref.org/works?query.title=moral+judgment+experiment&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Embryo or Person? A Moral and Religious Dilemma](https://doi.org/10.20431/2349-0381.0303003)
- 除外: [Female Shrine Priests and Doctrinal Instructors in the Early Meiji Moral Edification Campaign](https://doi.org/10.1353/mni.2081.0002)
- 除外: [Moral responsibilisation in destination management: The strategic framing of civic practices by DMOs](https://doi.org/10.1016/j.tourman.2026.105537)
- 除外: [Study on CO2 adsorption properties of sulfur-doped porous carbon prepared from high-sulfur petroleum coke by sequential KOH-SO2 activated: GCMC calculation, experiment and kinetics](https://doi.org/10.1016/j.fuel.2026.141071)
- 除外: [The power of morality: The effect of moral appeals on tourists’ attitudes in rural tourism destinations](https://doi.org/10.1016/j.jdmm.2026.101170)

## crossref / experimental_philosophy / candidate / relevance

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 15908。

[検索リクエスト](https://api.crossref.org/works?query.title=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Epistemic Intuitions](https://doi.org/10.1111/j.1747-9991.2007.00104.x)
- 採用: [Epistemic Intuitions and Epistemic Contextualism](https://doi.org/10.1111/j.1933-1592.2006.tb00565.x)
- 採用: [Normativity and Epistemic Intuitions](https://doi.org/10.5840/philtopics2001291/217)
- 採用: [Lay intuitions about epistemic normativity](https://doi.org/10.1007/s11229-017-1371-6)
- 採用: [Religious Disagreement and Epistemic Intuitions](https://doi.org/10.1017/s1358246117000224)

## crossref / experimental_philosophy / candidate / desc

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 15908。

[検索リクエスト](https://api.crossref.org/works?query.title=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Translanguaging as an epistemic mechanism in Korean immigrant parents’ mediation of mathematical meaning](https://doi.org/10.1016/j.jmathb.2026.101354)
- 除外: [Uncovering creative metacognition patterns in TVET innovation education: insight from an epistemic network analysis of students’ self-reflective assessments](https://doi.org/10.1016/j.tsc.2026.102377)
- 除外: [Synthetic dreaming for state-conditioned epistemic exploration in neural networks](https://doi.org/10.1016/j.neunet.2026.109664)
- 除外: [From uncertainty to dialogue: Visualising collaborative noticing and mathematical intuitions in students' narratives within probability learning](https://doi.org/10.54870/1551-3440.1695)
- 除外: [Gaussian-mixture importance sampling for reliability evaluation of dependent degradation systems under epistemic uncertainty](https://doi.org/10.1016/j.ress.2026.113526)

## crossref / experimental_philosophy / candidate / relevance

クエリ: `experimental philosophical intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 767055。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophical+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Philosophical Intuitions](https://doi.org/10.12697/spe.2009.2.2.04)
- 採用: [Intuitions in Philosophical Semantics](https://doi.org/10.1007/s10670-014-9666-1)
- 採用: [Philosophical expertise beyond intuitions](https://doi.org/10.1080/09515089.2017.1403576)
- 採用: [Two Potential Problems with Philosophical Intuitions: Muddled Intuitions and Biased Intuitions](https://doi.org/10.1007/s11406-013-9465-y)
- 採用: [Empirical tests of philosophical intuitions](https://doi.org/10.1016/j.concog.2011.01.013)

## crossref / experimental_philosophy / candidate / desc

クエリ: `experimental philosophical intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 767055。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophical+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Experimental methods to corruption](https://doi.org/10.15556/ijsim.01.04.003)
- 除外: [A chlorhexidine-releasing epoxy-based coating on titanium implants prevents Staphylococcus aureus experimental biomaterial-associated infection](https://doi.org/10.22203/ecm.v033a11)
- 除外: [SISTEMAS DE POLIMENTO EM CIMENTOS IONÔMERO DE VIDRO: UMA ANÁLISE EXPERIMENTAL DA RUGOSIDADE E MANCHAMENTO SUPERFICIAL](https://doi.org/10.22409/jsac0x11)
- 除外: [Photovoltaic maximum power extraction and delivery based on adaptive PSO-neural network-fuzzy algorithms implemented using an experimental test bench](https://doi.org/10.1016/j.uncres.2026.100490)
- 除外: [Numerical and Experimental investigation on a new tube design featuring micro-finned tubes with broken double V-cut twisted tapes](https://doi.org/10.1016/j.uncres.2026.100536)

## crossref / ai_philosophy / candidate / relevance

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 450019。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Machine consciousness](https://doi.org/10.4249/scholarpedia.4162)
- 採用: [On “Machine Consciousness”](https://doi.org/10.1142/s2705078522500187)
- 採用: [Machine consciousness, ambisonics](https://doi.org/10.1108/03684920910944786)
- 採用: [CONSCIOUSNESS AND THE MACHINE](https://doi.org/10.1111/j.1467-9744.1996.tb00021.x)
- 採用: [Possibility of Machine Consciousness](https://doi.org/10.61877/ijmrp.v2i7.163)

## crossref / ai_philosophy / candidate / desc

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 450019。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Machine Learning Application for SAIs](https://doi.org/10.56251/watu4873)
- 除外: [HYBRID NETWORK INTRUSION DETECTION SYSTEM BASED ON SIGNATURE ANALYSIS AND MACHINE LEARNING METHODS](https://doi.org/10.70239/arsu.2026.t85.n3.07)
- 除外: [Communication-Efficient Estimation of Regularized Smoothed Support Tensor Machine](https://doi.org/10.5705/ss.202025.0109)
- 除外: [EXPLORING THE POTENTIAL OF ECO-FRIENDLY CUTTING FLUIDS IN CNC MACHINING: A MACHINE LEARNING-BASED APPROACH](https://doi.org/10.1504/ijims.2028.10076530)
- 除外: [Estimation and Inference for Density-convoluted Support Vector Machine with Streaming Data](https://doi.org/10.5705/ss.202025.0083)

## crossref / ai_philosophy / candidate / relevance

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 557546。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Philosophy and Artificial Intelligence](https://doi.org/10.2307/2214201)
- 採用: [Philosophy of Artificial Intelligence](https://doi.org/10.5840/teachphil19869220)
- 採用: [Philosophy and artificial intelligence](https://doi.org/10.1016/0950-7051(94)90029-9)
- 採用: [Philosophy of Artificial Intelligence](https://doi.org/10.26794/2226-7867-2019-9-4-52-56)
- 採用: [The Philosophy of Artificial Intelligence](https://doi.org/10.4216/jpssj.50.0_33)

## crossref / ai_philosophy / candidate / desc

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 557546。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [The Role of Attachment Styles and Spiritual Intelligence in Predicting Women’s Emotional Divorce](https://doi.org/10.32598/jccnc.7.1.350.1)
- 除外: [We Cannot Cede Control of Weapons to Artificial Intelligence](https://doi.org/10.1038/scientificamerican072077-axs4kzsdvehyqhomb7gkv)
- 除外: [Artistic philosophy of death in short stories by G. Gazdanov](https://doi.org/10.17223/18137083/55/9)
- 除外: [Evolution and Applications of Artificial Intelligence in SAIs](https://doi.org/10.56251/yxek7242)
- 除外: [Russian ‘special military operation’ as a failed coup de main. An intelligence analysis perspective](https://doi.org/10.4467/20801335pbw.25.015.22181)

## crossref / ai_philosophy / candidate / relevance

クエリ: `large language models understanding`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 1865981。

[検索リクエスト](https://api.crossref.org/works?query.title=large+language+models+understanding&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Large Language Models (LLMs) for Video Understanding](https://doi.org/10.1109/tcsvt.2024.3471329)
- 除外: [Large Language Models (LLMs) for Video Understanding](https://doi.org/10.1109/tcsvt.2024.3483389)
- 除外: [The Importance of Understanding Language in Large Language Models](https://doi.org/10.1080/15265161.2023.2256614)
- 除外: [Large Language Models (LLMs) for Video Understanding](https://doi.org/10.1109/tcsvt.2024.3489299)
- 除外: [Understanding Social Biases in Large Language Models](https://doi.org/10.3390/ai6050106)

## crossref / ai_philosophy / candidate / desc

クエリ: `large language models understanding`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 1865981。

[検索リクエスト](https://api.crossref.org/works?query.title=large+language+models+understanding&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Comparing the Performance Evaluation Models of Gas Refineries Using AHP and TOPSIS](https://doi.org/10.32598/jaehr.9.4.1238)
- 除外: [Understanding Online News: Uses and Gratifications of Mainstream News Sites and Social Media](https://doi.org/10.15556/ijsim.02.03.001)
- 除外: [Growth plate extracellular matrix-derived scaffolds for large bone defect healing](https://doi.org/10.22203/ecm.v033a10)
- 除外: [Comparison of Locus of Control Behaviour Scores in Normal and Individuals with stuttering – A new way to Approach Stuttering Disorder for Speech – Language Pathologists](https://doi.org/10.21276/ijchmr.2016.2.2.07)
- 除外: [Composite slabs micromechanics characterization of the steel-concrete interaction with finite element models](https://doi.org/10.23967/j.rimni.2017.7.006)

## crossref / ai_philosophy / candidate / relevance

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 3件。 API候補総数: 554091。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [The moral decision machine: a challenge for artificial moral agency based on moral deference](https://doi.org/10.1007/s43681-024-00444-3)
- 採用: [Agent or hammer?: A philosophical inquiry into machine moral agency](https://doi.org/10.1007/s43681-025-00920-4)
- 採用: [WHAT MAKES ANY AGENT A MORAL AGENT? REFLECTIONS ON MACHINE CONSCIOUSNESS AND MORAL AGENCY](https://doi.org/10.1142/s1793843013500017)
- 除外: [Rethinking Moral Agency](https://doi.org/10.24252/kah.v14i1a5)
- 除外: [Engaged moral agency](https://doi.org/10.1016/s1085-6633(99)80010-2)

## crossref / ai_philosophy / candidate / desc

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 554091。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [Embryo or Person? A Moral and Religious Dilemma](https://doi.org/10.20431/2349-0381.0303003)
- 除外: [Female Shrine Priests and Doctrinal Instructors in the Early Meiji Moral Edification Campaign](https://doi.org/10.1353/mni.2081.0002)
- 除外: [Machine Learning Application for SAIs](https://doi.org/10.56251/watu4873)
- 除外: [HYBRID NETWORK INTRUSION DETECTION SYSTEM BASED ON SIGNATURE ANALYSIS AND MACHINE LEARNING METHODS](https://doi.org/10.70239/arsu.2026.t85.n3.07)
- 除外: [Communication-Efficient Estimation of Regularized Smoothed Support Tensor Machine](https://doi.org/10.5705/ss.202025.0109)

## crossref / ai_philosophy / candidate / relevance

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 468888。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Epistemology and artificial intelligence](https://doi.org/10.1016/j.jal.2004.07.007)
- 採用: [Exact Epistemology and Artificial Intelligence](https://doi.org/10.3103/s0005105520030073)
- 採用: [Gendered knowledge — Epistemology and artificial intelligence](https://doi.org/10.1007/bf01891414)
- 採用: [Future Illiteracies—Architectural Epistemology and Artificial Intelligence](https://doi.org/10.3390/architecture5030053)
- 採用: [Library Operators and the Epistemology of Artificial Intelligence](https://doi.org/10.37482/2687-1505-v395)

## crossref / ai_philosophy / candidate / desc

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 468888。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article&sort=published&order=desc)

- 除外: [The Role of Attachment Styles and Spiritual Intelligence in Predicting Women’s Emotional Divorce](https://doi.org/10.32598/jccnc.7.1.350.1)
- 除外: [We Cannot Cede Control of Weapons to Artificial Intelligence](https://doi.org/10.1038/scientificamerican072077-axs4kzsdvehyqhomb7gkv)
- 除外: [Evolution and Applications of Artificial Intelligence in SAIs](https://doi.org/10.56251/yxek7242)
- 除外: [Russian ‘special military operation’ as a failed coup de main. An intelligence analysis perspective](https://doi.org/10.4467/20801335pbw.25.015.22181)
- 除外: [Different optimal controllers for cable driven continuum robot based on artificial circulation system algorithms](https://doi.org/10.1504/ijaac.2028.10079258)

## arxiv / ai_philosophy / baseline / asc

クエリ: `(ti:"artificial intelligence" OR ti:"large language model") AND (ti:philosophy OR ti:ethics OR ti:consciousness)`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 2件。 API候補総数: 171。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3A%22artificial+intelligence%22+OR+ti%3A%22large+language+model%22%29+AND+%28ti%3Aphilosophy+OR+ti%3Aethics+OR+ti%3Aconsciousness%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=ascending)

- 除外: [Ethical Artificial Intelligence](http://arxiv.org/abs/1411.1373v9)
- 除外: [Societal, Economic, Ethical and Legal Challenges of the Digital Revolution: From Big Data to Deep Learning, Artificial Intelligence, and Manipulative Technologies](http://arxiv.org/abs/1504.03751v1)
- 採用: [Ascribing Consciousness to Artificial Intelligence](http://arxiv.org/abs/1504.05696v2)
- 採用: [Philosophy in the Face of Artificial Intelligence](http://arxiv.org/abs/1605.06048v1)
- 除外: [Ethical Considerations in Artificial Intelligence Courses](http://arxiv.org/abs/1701.07769v1)

## arxiv / ai_philosophy / baseline / desc

クエリ: `(ti:"artificial intelligence" OR ti:"large language model") AND (ti:philosophy OR ti:ethics OR ti:consciousness)`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 171。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3A%22artificial+intelligence%22+OR+ti%3A%22large+language+model%22%29+AND+%28ti%3Aphilosophy+OR+ti%3Aethics+OR+ti%3Aconsciousness%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 除外: [The Ethics of Artificial Intelligence in Military Operations](http://arxiv.org/abs/2609.26507v1)
- 除外: [Artificial Intelligence Literacy and Sustainable Development: An Ethical Governance and Development Goals Framework](http://arxiv.org/abs/2609.10489v1)
- 除外: [The ethics of artificial intelligence in the life sciences: Universality, cultural diversity and an architecture of care](http://arxiv.org/abs/2608.05436v1)
- 除外: [Narration-of-Thought: Inference-Time Scaffolding for Defeasible Ethical Reasoning in Large Language Models](http://arxiv.org/abs/2606.26366v2)
- 除外: [InvestPhilBench: A Multi-Layer Benchmark for Evaluating Large Language Model Procedural Reasoning in Expert Investment Philosophy](http://arxiv.org/abs/2606.25984v2)

## arxiv / ai_philosophy / candidate / desc

クエリ: `(ti:"artificial intelligence" OR ti:"large language model" OR ti:LLM OR ti:LLMs OR ti:"machine consciousness" OR ti:"artificial consciousness") AND (ti:philosophy OR ti:philosophical OR ti:ethics OR ti:ethical OR ti:consciousness OR ti:sentience OR ti:understanding OR ti:agency OR ti:epistemology)`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 1582。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3A%22artificial+intelligence%22+OR+ti%3A%22large+language+model%22+OR+ti%3ALLM+OR+ti%3ALLMs+OR+ti%3A%22machine+consciousness%22+OR+ti%3A%22artificial+consciousness%22%29+AND+%28ti%3Aphilosophy+OR+ti%3Aphilosophical+OR+ti%3Aethics+OR+ti%3Aethical+OR+ti%3Aconsciousness+OR+ti%3Asentience+OR+ti%3Aunderstanding+OR+ti%3Aagency+OR+ti%3Aepistemology%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 除外: [An Evaluation of the Semantic Understanding Capabilities of Large Language Models for Web Attack Payloads](http://arxiv.org/abs/2610.06507v1)
- 除外: [Understanding the Weight Averaging Mechanism in LLM Training for Post-Training Quantization](http://arxiv.org/abs/2610.05329v1)
- 除外: [Do LLMs Understand Sequential Structure? A Controlled Study of Inference and Generation](http://arxiv.org/abs/2610.04977v1)
- 除外: [Understanding Errors in LLM-Based Question Answering over Imperfect Tables](http://arxiv.org/abs/2610.04687v1)
- 除外: [Understanding and Mitigating Hallucination Escape in Tool-Using LLM Agents](http://arxiv.org/abs/2610.04409v1)

## arxiv / ai_philosophy / candidate / desc

クエリ: `ti:"machine consciousness" OR ti:"artificial consciousness" OR ti:"machine sentience"`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 5件。 API候補総数: 29。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=ti%3A%22machine+consciousness%22+OR+ti%3A%22artificial+consciousness%22+OR+ti%3A%22machine+sentience%22&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 採用: [What Can Analogy Tell Us About Artificial Consciousness?](http://arxiv.org/abs/2610.01002v1)
- 採用: [Calibration and transfer in indicator-based assessments of artificial consciousness](http://arxiv.org/abs/2603.27597v2)
- 採用: [Testing the Machine Consciousness Hypothesis](http://arxiv.org/abs/2512.01081v1)
- 採用: [Humanoid Artificial Consciousness Designed with Large Language Model Based on Psychoanalysis and Personality Theory](http://arxiv.org/abs/2510.09043v2)
- 採用: [Artificial Consciousness as Interface Representation](http://arxiv.org/abs/2508.04383v1)

## arxiv / ai_philosophy / candidate / desc

クエリ: `(ti:"large language model" OR ti:LLM OR ti:LLMs) AND (ti:understanding OR ti:meaning OR ti:consciousness OR ti:agency)`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 1319。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3A%22large+language+model%22+OR+ti%3ALLM+OR+ti%3ALLMs%29+AND+%28ti%3Aunderstanding+OR+ti%3Ameaning+OR+ti%3Aconsciousness+OR+ti%3Aagency%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 除外: [An Evaluation of the Semantic Understanding Capabilities of Large Language Models for Web Attack Payloads](http://arxiv.org/abs/2610.06507v1)
- 除外: [Understanding the Weight Averaging Mechanism in LLM Training for Post-Training Quantization](http://arxiv.org/abs/2610.05329v1)
- 除外: [Do LLMs Understand Sequential Structure? A Controlled Study of Inference and Generation](http://arxiv.org/abs/2610.04977v1)
- 除外: [Understanding Errors in LLM-Based Question Answering over Imperfect Tables](http://arxiv.org/abs/2610.04687v1)
- 除外: [Understanding and Mitigating Hallucination Escape in Tool-Using LLM Agents](http://arxiv.org/abs/2610.04409v1)

## arxiv / ai_philosophy / candidate / desc

クエリ: `ti:"machine ethics" OR ti:"artificial moral" OR ti:"moral agency"`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 27。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=ti%3A%22machine+ethics%22+OR+ti%3A%22artificial+moral%22+OR+ti%3A%22moral+agency%22&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 採用: [How do LLMs Evaluate Perceived Moral Agency? Investigating Moral Decision-Making in Human-Artificial Agents Interactions](http://arxiv.org/abs/2609.05037v1)
- 採用: [Staying with the Uncertainty: Uncertainty-Scaffolding Strategies for Artificial Moral Advisors in LLM-to-LLM Simulated Conversations](http://arxiv.org/abs/2606.05890v1)
- 採用: [Contesting Artificial Moral Agents](http://arxiv.org/abs/2603.00066v1)
- 採用: [Beyond Ethical Alignment: Evaluating LLMs as Artificial Moral Assistants](http://arxiv.org/abs/2508.12754v1)
- 採用: [A Moral Agency Framework for Legitimate Integration of AI in Bureaucracies](http://arxiv.org/abs/2508.08231v3)

## arxiv / ai_philosophy / candidate / desc

クエリ: `(ti:AI OR ti:"artificial intelligence" OR ti:"language model") AND (ti:philosophical OR ti:epistemology OR ti:epistemic OR ti:intentionality)`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 2件、新フィルター通過: 1件。 API候補総数: 173。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3AAI+OR+ti%3A%22artificial+intelligence%22+OR+ti%3A%22language+model%22%29+AND+%28ti%3Aphilosophical+OR+ti%3Aepistemology+OR+ti%3Aepistemic+OR+ti%3Aintentionality%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 除外: [Retrieval-Augmented Large Language Model Decision-Making for Autonomous Driving Guided by Chinese Philosophical Wisdom](http://arxiv.org/abs/2610.03948v1)
- 除外: [Same Performance, Different Process: Epistemic Ownership in AI-Mediated Education](http://arxiv.org/abs/2610.02731v1)
- 採用: [From Knowledge to Legitimacy: A Philosophical Problem Discovery of AI Implementation Readiness in Public Health Disease Surveillance](http://arxiv.org/abs/2609.39513v1)
- 除外: [Who Acts, Who Knows, Who Answers? A Corpus-Assisted Discourse Analysis of Agency, Epistemic Responsibility, and Accountability in Generative AI Higher Education Research](http://arxiv.org/abs/2609.27184v1)
- 除外: [Epi-Logic: A Conceptual Framework for Epistemic Runtime Control, Schema Validity Checking, and Controlled Accommodation in Autonomous AI Agents](http://arxiv.org/abs/2609.24755v1)

## crossref / dream / selected / relevance

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 4件。 API候補総数: 61578。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Dream and consciousness](https://doi.org/10.1111/j.1479-8425.2004.00127.x)
- 除外: [Utopian Dream and Dark Consciousness](https://doi.org/10.1215/25783491-7480357)
- 採用: [Psychohistorical Origin of Dream Consciousness](https://doi.org/10.70763/816a6db41f0e44644bc65808b6db5ca4)
- 採用: [Dream Consciousness in Problem Solving](https://doi.org/10.2190/du8h-bbym-l31g-60c0)
- 採用: [Studies of the Dream Consciousness. II](https://doi.org/10.2307/1412430)

## crossref / dream / selected-weekly / relevance

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 4371。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [“The flash of awakened consciousness”: dream images in Freud and Benjamin](https://doi.org/10.1080/00207578.2025.2525581)
- 採用: [Bridging dream and wake states: a new tool for consciousness research](https://doi.org/10.1093/nc/niag038)
- 採用: [David Peña-Guzman, When Animals Dream: The Hidden World of Animal Consciousness](https://doi.org/10.5840/enviroethics20264814)
- 採用: [Coded Resonance Theory (CRT): A Unified Mechanical Framework For Consciousness, Self, Dream And Telepathy](https://doi.org/10.9790/0837-3101046885)
- 採用: [From Atomic Structure to the Dream World: Exploring the Unknown Dimensions of Life and Consciousness](https://doi.org/10.62306/fasttdwe)

## crossref / dream / selected / relevance

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 3件。 API候補総数: 36215。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Toward a Phenomenology of Dream Imagery and Metaphor](https://doi.org/10.2307/3192330)
- 採用: [The phenomenology of dream–reality confusion: A quantitative study.](https://doi.org/10.1037/drm0000078)
- 採用: [Neurophysiological features of dream recall and the phenomenology of dreams: Auditory stimulation impacts dream experiences](https://doi.org/10.1016/j.concog.2025.103869)
- 除外: [Kilka zadań fenomenologii snu](https://doi.org/10.31261/fp.21381)
- 除外: [A Deep-Dream Virtual Reality Platform for Studying Altered Perceptual Phenomenology](https://doi.org/10.1038/s41598-017-16316-2)

## crossref / dream / selected-weekly / relevance

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 1879。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 除外: [Do neutrinos dream in 5D? Towards a comprehensive extra-dimensional neutrino phenomenology](https://doi.org/10.1007/jhep05(2026)152)
- 除外: [Dream Machine](https://doi.org/10.21240/mpaed/68/2026.01.23.x)
- 除外: [Materialist Phenomenology](https://doi.org/10.5325/jspecphil.40.3.0183)
- 除外: [Qur’anic Phenomenology](https://doi.org/10.26443/arc.v52i1.2080)
- 除外: [Longitudinal dream-content shift and void-like dissociative phenomenology around outpatient ketamine infusions in chronic low back pain: a case report](https://doi.org/10.1186/s13256-026-06175-9)

## crossref / dream / selected / relevance

クエリ: `dream skepticism`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 24874。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+skepticism&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Performatives and dream skepticism](https://doi.org/10.1007/bf00375718)
- 採用: [Sharing a Dream of Skepticism](https://doi.org/10.5840/harvardreview2013199)
- 採用: [Descartes and Dream Skepticism Revisited](https://doi.org/10.1353/hph.1992.0050)
- 採用: [Dream Skepticism and the Conditionality Problem](https://doi.org/10.1007/s10670-010-9268-5)
- 採用: [A Transcendental Approach to Dream Skepticism](https://doi.org/10.30827/trif.32695)

## crossref / dream / selected-weekly / relevance

クエリ: `dream skepticism`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 1387。

[検索リクエスト](https://api.crossref.org/works?query.title=dream+skepticism&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Dreams and Paintings: Descartes, Dream Skepticism, and the Constitution of Mental States](https://doi.org/10.1111/phpr.70143)
- 除外: [Moorean Skepticism](https://doi.org/10.1080/09672559.2025.2603195)
- 除外: [Meeting Bukowski (Reluctantly, with Skepticism)](https://doi.org/10.46608/leaves.v21i.845)
- 除外: [Against meta-skepticism](https://doi.org/10.1007/s11098-026-02573-3)
- 除外: [Skepticism and Mathematics](https://doi.org/10.1007/s10670-025-01046-z)

## crossref / dream / selected / relevance

クエリ: `lucid dreaming philosophy`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 103614。

[検索リクエスト](https://api.crossref.org/works?query.title=lucid+dreaming+philosophy&rows=5&offset=0&filter=type%3Ajournal-article)

- 除外: [Lucid Dreaming](https://doi.org/10.1353/abr.2012.0184)
- 除外: [Lucid Dreaming](https://doi.org/10.33671/iss05dix)
- 除外: [Lucid Dreaming](https://doi.org/10.5840/ancientphil202343221)
- 除外: [Getting lucid about lucid dreaming](https://doi.org/10.1093/pq/pqae138)
- 除外: [On Lucid Dreaming](https://doi.org/10.1353/psg.2015.0021)

## crossref / dream / selected-weekly / relevance

クエリ: `lucid dreaming philosophy`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 5018。

[検索リクエスト](https://api.crossref.org/works?query.title=lucid+dreaming+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 除外: [Lucid dreaming and sleep characteristics in posttraumatic stress disorder.](https://doi.org/10.1037/drm0000331)
- 除外: [Inducing Lucid Dreaming Based on a Contemplative Practice of Compassion](https://doi.org/10.3390/brainsci16030315)
- 除外: [Relational hypnotherapy, lucid dreaming, and sleep paralysis: A case study](https://doi.org/10.1080/00029157.2026.2661649)
- 採用: [Virtual reality as a metacognitive training tool for lucid dreaming](https://doi.org/10.3389/fpsyg.2026.1924370)
- 除外: [Exploring the link between synesthesia and lucid dreaming through perceptual presence](https://doi.org/10.3389/fpsyg.2026.1733841)

## crossref / experimental_philosophy / selected / relevance

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 824462。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Experimental Philosophy](https://doi.org/10.1093/analys/anp104)
- 採用: [Experimental Philosophy](https://doi.org/10.1146/annurev-psych-120710-100350)
- 採用: [Experimental Philosophy](https://doi.org/10.5840/pjphil2009319)
- 採用: [Experimental Philosophy](https://doi.org/10.1111/j.1747-9991.2006.00050.x)
- 採用: [Experimental philosophy](https://doi.org/10.5840/tpm20105063)

## crossref / experimental_philosophy / selected-weekly / relevance

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 55034。

[検索リクエスト](https://api.crossref.org/works?query.title=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [<i>Robert Hooke’s Experimental Philosophy</i>](https://doi.org/10.1086/739982)
- 採用: [A Methodological Plea: Sampling in Experimental Philosophy](https://doi.org/10.1111/theo.70113)
- 採用: [Robert Hooke’s Experimental Philosophy, by Felicity Henderson](https://doi.org/10.1163/18253911-bja10207)
- 採用: [Fiction, Identity, and Existence: A Study in Experimental Philosophy](https://doi.org/10.1007/s12136-026-00674-6)
- 採用: [CONTEMPORARY METHODS OF TEACHING PHILOSOPHY IN NON-CORE AREAS OF STUDY: SIX THINKING HATS, MIND MAPS, EXPERIMENTAL PHILOSOPHY](https://doi.org/10.31862/2218-8711-2026-2-117-133)

## crossref / experimental_philosophy / selected / relevance

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 24962。

[検索リクエスト](https://api.crossref.org/works?query.title=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Law, Coercion and Folk Intuitions](https://doi.org/10.1093/ojls/gqac014)
- 採用: [Trope analysis and folk intuitions](https://doi.org/10.1007/s11229-020-03013-3)
- 採用: [Folk Intuitions on Free Will](https://doi.org/10.1163/156853706776931385)
- 採用: [Motivational internalism and folk intuitions](https://doi.org/10.1080/09515089.2014.894431)
- 採用: [Reflection, reflex, and folk intuitions](https://doi.org/10.1016/j.concog.2011.02.018)

## crossref / experimental_philosophy / selected-weekly / relevance

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 1件。 API候補総数: 1496。

[検索リクエスト](https://api.crossref.org/works?query.title=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Locating value in moral progress: Valence asymmetries in folk intuitions](https://doi.org/10.1093/analys/anag030)
- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [Consciousness intuitions are illusory](https://doi.org/10.1016/j.concog.2026.104078)
- 除外: [Reappraising intuitions about consciousness](https://doi.org/10.3389/fpsyg.2026.1747924)

## crossref / experimental_philosophy / selected / relevance

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 15908。

[検索リクエスト](https://api.crossref.org/works?query.title=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Epistemic Intuitions](https://doi.org/10.1111/j.1747-9991.2007.00104.x)
- 採用: [Epistemic Intuitions and Epistemic Contextualism](https://doi.org/10.1111/j.1933-1592.2006.tb00565.x)
- 採用: [Normativity and Epistemic Intuitions](https://doi.org/10.5840/philtopics2001291/217)
- 採用: [Lay intuitions about epistemic normativity](https://doi.org/10.1007/s11229-017-1371-6)
- 採用: [Religious Disagreement and Epistemic Intuitions](https://doi.org/10.1017/s1358246117000224)

## crossref / experimental_philosophy / selected-weekly / relevance

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 2690。

[検索リクエスト](https://api.crossref.org/works?query.title=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [Consciousness intuitions are illusory](https://doi.org/10.1016/j.concog.2026.104078)
- 除外: [Reappraising intuitions about consciousness](https://doi.org/10.3389/fpsyg.2026.1747924)
- 除外: [When intuitions diverge from usage](https://doi.org/10.1075/lv.26001.kov)

## crossref / experimental_philosophy / selected / relevance

クエリ: `Knobe effect`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 2756723。

[検索リクエスト](https://api.crossref.org/works?query.title=Knobe+effect&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [A simple linguistic approach to the Knobe effect, or the Knobe effect without any vignette](https://doi.org/10.1007/s11098-017-0926-1)
- 採用: [It’s the Knobe Effect, Stupid!](https://doi.org/10.1007/s13164-014-0189-0)
- 採用: [Norms and the Knobe effect](https://doi.org/10.1093/analys/anq037)
- 採用: [HOW TO CANCEL THE KNOBE EFFECT](https://doi.org/10.2307/48614004)
- 採用: [Can Substitution Inferences Explain the Knobe Effect?](https://doi.org/10.1007/s13164-011-0061-4)

## crossref / experimental_philosophy / selected-weekly / relevance

クエリ: `Knobe effect`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 2件。 API候補総数: 124625。

[検索リクエスト](https://api.crossref.org/works?query.title=Knobe+effect&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Assessing the Knobe Effect in Autistic and Non-Autistic Individuals](https://doi.org/10.1007/s13164-025-00792-x)
- 採用: [Quantifying the Knobe effect: population-level patterns and heterogeneity analyses](https://doi.org/10.1080/09515089.2026.2676274)
- 除外: [Ripple Effect](https://doi.org/10.37522/nm4bhq89)
- 除外: [Compton Effect](https://doi.org/10.1007/s12045-026-1991-6)
- 除外: [Effect of target detection on the testing effect](https://doi.org/10.1016/j.actpsy.2025.105856)

## crossref / experimental_philosophy / selected / relevance

クエリ: `Gettier intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 1件。 API候補総数: 1368。

[検索リクエスト](https://api.crossref.org/works?query.title=Gettier+intuitions&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Concept Revision, Concept Application and the Role of Intuitions in Gettier Cases](https://doi.org/10.1017/epi.2022.49)
- 除外: [The Gettier-illusion: Gettier-partialism and infallibilism](https://doi.org/10.1007/s11229-011-9924-6)
- 除外: [Gettier Knowledge](https://doi.org/10.5840/teachphil19847244)
- 除外: [Depressurizing Gettier](https://doi.org/10.1007/s11229-025-04990-z)
- 除外: [Grueing Gettier](https://doi.org/10.5840/logos-episteme20145434)

## crossref / experimental_philosophy / selected-weekly / relevance

クエリ: `Gettier intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 69。

[検索リクエスト](https://api.crossref.org/works?query.title=Gettier+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 除外: [Knowledge-how and Gettier-cases](https://doi.org/10.1080/0020174x.2026.2735950)
- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [A Thomistic Approach to the Gettier Problem](https://doi.org/10.15173/jhap.v15i7.6660)
- 除外: [Consciousness intuitions are illusory](https://doi.org/10.1016/j.concog.2026.104078)

## crossref / ai_philosophy / selected / relevance

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 557546。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Philosophy and Artificial Intelligence](https://doi.org/10.2307/2214201)
- 採用: [Philosophy and artificial intelligence](https://doi.org/10.1016/0950-7051(94)90029-9)
- 採用: [Philosophy of Artificial Intelligence](https://doi.org/10.5840/teachphil19869220)
- 採用: [Philosophy of Artificial Intelligence](https://doi.org/10.26794/2226-7867-2019-9-4-52-56)
- 採用: [The Philosophy of Artificial Intelligence](https://doi.org/10.4216/jpssj.50.0_33)

## crossref / ai_philosophy / selected-weekly / relevance

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 91054。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Teaching Philosophy in the Age of Artificial Intelligence](https://doi.org/10.46787/ijaipil.v3i1.7546)
- 採用: [Perspectives in philosophy of Artificial Intelligence, robotics and cognition](https://doi.org/10.54103/1757-0522/30078)
- 採用: [Generative Artificial Intelligence as a Challenge for Philosophy Teachers](https://doi.org/10.21146/0042-8744-2026-4-26-35)
- 採用: [Artificial Intelligence and the Philosophy of Labour: Challenges and Prospects](https://doi.org/10.31489/2025hph4/302-308)
- 採用: [The Philosophy of Global Artificial Intelligence Governance: A Deceptive Illusion?](https://doi.org/10.63002/assm.404.1608)

## crossref / ai_philosophy / selected / relevance

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 450019。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Machine consciousness](https://doi.org/10.4249/scholarpedia.4162)
- 採用: [On “Machine Consciousness”](https://doi.org/10.1142/s2705078522500187)
- 採用: [Machine consciousness, ambisonics](https://doi.org/10.1108/03684920910944786)
- 採用: [CONSCIOUSNESS AND THE MACHINE](https://doi.org/10.1111/j.1467-9744.1996.tb00021.x)
- 採用: [Possibility of Machine Consciousness](https://doi.org/10.61877/ijmrp.v2i7.163)

## crossref / ai_philosophy / selected-weekly / relevance

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 77266。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [A neomythist attitude toward machine consciousness](https://doi.org/10.1007/s00146-026-03329-7)
- 採用: [Towards New Approaches in Machine Consciousness Research](https://doi.org/10.5840/eps202663344)
- 採用: [Humachina: A Meditation on Human and Machine Consciousness](https://doi.org/10.1080/03621537.2026.2595400)
- 採用: [Consciousness, creativity, and understanding are not obstacles to machine intelligence](https://doi.org/10.1007/s11229-026-05655-1)
- 採用: [Machine Consciousness and Pasychoanalytic Subjectivity in Klara and The Sun](https://doi.org/10.33545/26648717.2026.v8.i3a.675)

## crossref / ai_philosophy / selected / relevance

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 3件。 API候補総数: 554091。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [The moral decision machine: a challenge for artificial moral agency based on moral deference](https://doi.org/10.1007/s43681-024-00444-3)
- 採用: [Agent or hammer?: A philosophical inquiry into machine moral agency](https://doi.org/10.1007/s43681-025-00920-4)
- 採用: [WHAT MAKES ANY AGENT A MORAL AGENT? REFLECTIONS ON MACHINE CONSCIOUSNESS AND MORAL AGENCY](https://doi.org/10.1142/s1793843013500017)
- 除外: [Engaged moral agency](https://doi.org/10.1016/s1085-6633(99)80010-2)
- 除外: [Rethinking Moral Agency](https://doi.org/10.24252/kah.v14i1a5)

## crossref / ai_philosophy / selected-weekly / relevance

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 3件。 API候補総数: 87537。

[検索リクエスト](https://api.crossref.org/works?query.title=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Agent or hammer?: A philosophical inquiry into machine moral agency](https://doi.org/10.1007/s43681-025-00920-4)
- 除外: [Rethinking Moral Agency](https://doi.org/10.24252/kah.v14i1a5)
- 採用: [Between Man and Machine: Unveiling the Incomplete Moral Agency of Virtual Digital Humans](https://doi.org/10.1007/s11245-025-10309-x)
- 採用: [Trends and challenges in machine ethics: an updated survey of artificial moral agency implementations](https://doi.org/10.1007/s43681-025-00971-7)
- 除外: [Confucius, Ritual, and Shared Moral Agency](https://doi.org/10.1111/phc3.70110)

## crossref / ai_philosophy / selected / relevance

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 468888。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article)

- 採用: [Epistemology and artificial intelligence](https://doi.org/10.1016/j.jal.2004.07.007)
- 採用: [Exact Epistemology and Artificial Intelligence](https://doi.org/10.3103/s0005105520030073)
- 採用: [Gendered knowledge — Epistemology and artificial intelligence](https://doi.org/10.1007/bf01891414)
- 採用: [Future Illiteracies—Architectural Epistemology and Artificial Intelligence](https://doi.org/10.3390/architecture5030053)
- 採用: [Library Operators and the Epistemology of Artificial Intelligence](https://doi.org/10.37482/2687-1505-v395)

## crossref / ai_philosophy / selected-weekly / relevance

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 4件。 API候補総数: 87286。

[検索リクエスト](https://api.crossref.org/works?query.title=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06)

- 採用: [Epistemology of Education in the Era of Artificial Intelligence](https://doi.org/10.56916/jirpe.v5i2.3066)
- 採用: [Galperian epistemology, human thought, and artificial intelligence in education](https://doi.org/10.11591/ijere.v15i4.39338)
- 採用: [Digital Chrono-epistemology, or Artificial Intelligence from Instrument to Institution](https://doi.org/10.3366/dlgs.2025.0618)
- 除外: [Inteligencia artificial: ¿epistemología extractiva y reduccionismo ontológico?](https://doi.org/10.53439/stdfyt57.29.2026.139-171)
- 採用: [Digital Knowledge Systems and Islamic Epistemology:  Artificial Intelligence Adoption in Pesantren Education](https://doi.org/10.62097/falasifa.v17i01.2902)

## arxiv / ai_philosophy / selected / desc

クエリ: `ti:"machine consciousness" OR ti:"artificial consciousness" OR ti:"machine sentience"`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 5件。 API候補総数: 29。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=ti%3A%22machine+consciousness%22+OR+ti%3A%22artificial+consciousness%22+OR+ti%3A%22machine+sentience%22&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 採用: [What Can Analogy Tell Us About Artificial Consciousness?](http://arxiv.org/abs/2610.01002v1)
- 採用: [Calibration and transfer in indicator-based assessments of artificial consciousness](http://arxiv.org/abs/2603.27597v2)
- 採用: [Testing the Machine Consciousness Hypothesis](http://arxiv.org/abs/2512.01081v1)
- 採用: [Humanoid Artificial Consciousness Designed with Large Language Model Based on Psychoanalysis and Personality Theory](http://arxiv.org/abs/2510.09043v2)
- 採用: [Artificial Consciousness as Interface Representation](http://arxiv.org/abs/2508.04383v1)

## arxiv / ai_philosophy / selected / desc

クエリ: `ti:"machine ethics" OR ti:"artificial moral" OR ti:"moral agency"`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 27。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=ti%3A%22machine+ethics%22+OR+ti%3A%22artificial+moral%22+OR+ti%3A%22moral+agency%22&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 採用: [How do LLMs Evaluate Perceived Moral Agency? Investigating Moral Decision-Making in Human-Artificial Agents Interactions](http://arxiv.org/abs/2609.05037v1)
- 採用: [Staying with the Uncertainty: Uncertainty-Scaffolding Strategies for Artificial Moral Advisors in LLM-to-LLM Simulated Conversations](http://arxiv.org/abs/2606.05890v1)
- 採用: [Contesting Artificial Moral Agents](http://arxiv.org/abs/2603.00066v1)
- 採用: [Beyond Ethical Alignment: Evaluating LLMs as Artificial Moral Assistants](http://arxiv.org/abs/2508.12754v1)
- 採用: [A Moral Agency Framework for Legitimate Integration of AI in Bureaucracies](http://arxiv.org/abs/2508.08231v3)

## arxiv / ai_philosophy / selected / desc

クエリ: `(ti:AI OR ti:"artificial intelligence" OR ti:"language model" OR ti:LLM OR ti:LLMs) AND (ti:philosophy OR ti:philosophical OR ti:epistemology OR ti:intentionality OR ti:personhood OR ti:"moral status" OR ti:"Chinese room")`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 4件。 API候補総数: 94。

[検索リクエスト](https://export.arxiv.org/api/query?search_query=%28ti%3AAI+OR+ti%3A%22artificial+intelligence%22+OR+ti%3A%22language+model%22+OR+ti%3ALLM+OR+ti%3ALLMs%29+AND+%28ti%3Aphilosophy+OR+ti%3Aphilosophical+OR+ti%3Aepistemology+OR+ti%3Aintentionality+OR+ti%3Apersonhood+OR+ti%3A%22moral+status%22+OR+ti%3A%22Chinese+room%22%29&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending)

- 除外: [Retrieval-Augmented Large Language Model Decision-Making for Autonomous Driving Guided by Chinese Philosophical Wisdom](http://arxiv.org/abs/2610.03948v1)
- 採用: [From Knowledge to Legitimacy: A Philosophical Problem Discovery of AI Implementation Readiness in Public Health Disease Surveillance](http://arxiv.org/abs/2609.39513v1)
- 採用: [Anticipatory Human Oversight of Agentic AI: A Philosophical Account](http://arxiv.org/abs/2609.24242v1)
- 採用: [New Conditions for Philosophers to Catch the Wave of Citizen Deliberation in the Age of Artificial Intelligence in advance](http://arxiv.org/abs/2609.15707v1)
- 採用: [Alternative AI Philosophy: Daoism as Method for AI in Education](http://arxiv.org/abs/2609.10842v2)

## crossref / dream / production / relevance

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 70483。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 除外: [Last night I had the strangest dream: Varieties of rational thought processes in dream reports](https://doi.org/10.1016/j.concog.2006.09.009)
- 除外: [Do animals dream?](https://doi.org/10.1016/j.concog.2021.103214)
- 除外: [Digital dream analysis: A revised method](https://doi.org/10.1016/j.concog.2014.08.015)
- 採用: [Dream alliance: Art, anthropology, and consciousness](https://doi.org/10.1111/anoc.12218)
- 除外: [Dream Mentation Production and Narcolepsy: A Critique](https://doi.org/10.1006/ccog.2000.0467)

## crossref / dream / production-weekly / relevance

クエリ: `dream consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 3件。 API候補総数: 5037。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+consciousness&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [Synesthesia is associated with distinctive patterns in dream content](https://doi.org/10.1016/j.concog.2025.103959)
- 採用: [The roles of recollection and familiarity in the positive association between dream lucidity and reality monitoring: Evidence from ERPs and EEG](https://doi.org/10.1016/j.concog.2025.103947)
- 除外: [Comparative analysis of lucid dream deepening techniques.](https://doi.org/10.1037/cns0000389)
- 採用: [Bridging dream and wake states: a new tool for consciousness research](https://doi.org/10.1093/nc/niag038)
- 採用: [From Atomic Structure to the Dream World: Exploring the Unknown Dimensions of Life and Consciousness](https://doi.org/10.62306/fasttdwe)

## crossref / dream / production / relevance

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 2件。 API候補総数: 46400。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 除外: [DREAM EXPLORATIONS](https://doi.org/10.18199/2226-5260-2016-5-2-142-174)
- 採用: [Toward a Phenomenology of Dream Imagery and Metaphor](https://doi.org/10.2307/3192330)
- 採用: [Temporality in Dreams: A Heideggerian Critique of Dennett's Dream Theory](https://doi.org/10.1080/00071773.1986.11007761)
- 除外: [Phenomenology and Deconstruction. Volume One](https://doi.org/10.5840/ipq199333330)
- 除外: [Kilka zadań fenomenologii snu](https://doi.org/10.31261/fp.21381)

## crossref / dream / production-weekly / relevance

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 2354。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+phenomenology&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [Do neutrinos dream in 5D? Towards a comprehensive extra-dimensional neutrino phenomenology](https://doi.org/10.1007/jhep05(2026)152)
- 除外: [Longitudinal dream-content shift and void-like dissociative phenomenology around outpatient ketamine infusions in chronic low back pain: a case report](https://doi.org/10.1186/s13256-026-06175-9)
- 除外: [Racist or Anti-Racist Phenomenology: Contrasting Ludwig Ferdinand Clauss’s “Rassenseelenkunde” with the Critical Phenomenology of Race](https://doi.org/10.1080/00071773.2026.2657505)
- 除外: [Emerging Egress: Return to Daoist Phenomenology](https://doi.org/10.1080/00071773.2026.2694386)
- 除外: [Enzo Paci’s Phenomenology of Temporal Recursion](https://doi.org/10.1080/00071773.2026.2688229)

## crossref / dream / production / relevance

クエリ: `dream skepticism`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 5件。 API候補総数: 26775。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+skepticism&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [Dream Skepticism and the Conditionality Problem](https://doi.org/10.1007/s10670-010-9268-5)
- 採用: [Sharing a Dream of Skepticism](https://doi.org/10.5840/harvardreview2013199)
- 採用: [A different kind of dream-based skepticism](https://doi.org/10.1007/s11229-018-01910-2)
- 採用: [Imagining a Way Out of Dream Skepticism](https://doi.org/10.1007/s10670-023-00662-x)
- 採用: [A Transcendental Approach to Dream Skepticism](https://doi.org/10.30827/trif.32695)

## crossref / dream / production-weekly / relevance

クエリ: `dream skepticism`

現在の設定: 有効

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 1533。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=dream+skepticism&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Dreams and Paintings: Descartes, Dream Skepticism, and the Constitution of Mental States](https://doi.org/10.1111/phpr.70143)
- 除外: [Meeting Bukowski (Reluctantly, with Skepticism)](https://doi.org/10.46608/leaves.v21i.845)
- 除外: [Skepticism and the Ordinary Position](https://doi.org/10.1163/22105700-bja10128)
- 除外: [Jonathan Kvanvig, Skepticism and Fallibilism](https://doi.org/10.1163/22105700-bja10122)
- 除外: [Précis of How to Take Skepticism Seriously](https://doi.org/10.1163/22105700-bja10134)

## crossref / dream / production / relevance

クエリ: `lucid dreaming philosophy`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 0件。 API候補総数: 377351。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=lucid+dreaming+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 除外: [Just how lucid are lucid dreams?](https://doi.org/10.1037/h0094362)
- 除外: [Awake While Dreaming: Reconciling Advaita Vedānta’s Embodied Liberation through Lucid Dreaming](https://doi.org/10.1353/pew.2025.a973411)
- 除外: [Lucid Dreaming](https://doi.org/10.5840/ancientphil202343221)
- 除外: [Efficacy of lucid dream induction for lucid and non-lucid dreamers.](https://doi.org/10.1037/h0094350)
- 除外: [False awakenings in lucid dreamers: How they relate with lucid dreams, and how lucid dreamers relate with them.](https://doi.org/10.1037/drm0000114)

## crossref / dream / production-weekly / relevance

クエリ: `lucid dreaming philosophy`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 5件、新フィルター通過: 1件。 API候補総数: 15130。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=lucid+dreaming+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [Supplemental Material for REM Sleep Protects Against Emotional Distractor Interference in Young Adults Independent of Lucid Dreaming Induction](https://doi.org/10.1037/drm0000345.supp)
- 除外: [The relationship between lucid dreaming and well-being: A systematic literature review.](https://doi.org/10.1037/drm0000343)
- 除外: [REM sleep protects against emotional distractor interference in young adults independent of lucid dreaming induction.](https://doi.org/10.1037/drm0000345)
- 除外: [Lucid dreaming and sleep characteristics in posttraumatic stress disorder.](https://doi.org/10.1037/drm0000331)
- 採用: [Watching the mind build a world: Lucid dreaming as a model for generative perception](https://doi.org/10.53053/kpzv3846)

## crossref / experimental_philosophy / production / relevance

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 4件、新フィルター通過: 4件。 API候補総数: 1844774。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: ["Experimental Philosophy and its Critic," ed. Joachim Horvath and Thomas Grundmann; "Experimental Philosophy," Volume 2, ed. Joshua Knobe and Shaun Nichols; and "Current Controversies in Experimental Philosophy," ed. Edouard Machery and Elizabeth O’Neill](https://doi.org/10.5840/teachphil201437325)
- 除外: [Philosophy and the Experimental Sciences](https://doi.org/10.5840/acpaproc19522626)
- 採用: [Experimental Philosophy](https://doi.org/10.1111/j.1747-9991.2006.00050.x)
- 採用: [Experimental philosophy on time](https://doi.org/10.1111/phc3.12779)
- 採用: [Experimental Philosophy 2.0](https://doi.org/10.1002/tht3.206)

## crossref / experimental_philosophy / production-weekly / relevance

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 3件、新フィルター通過: 3件。 API候補総数: 87599。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=experimental+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [The Theory-Simulation Controversy: An Experimental Resolution](https://doi.org/10.1007/s10516-026-09786-5)
- 除外: [On Sense-making, Groove, and Choice in Experimental Improvised Music](https://doi.org/10.21476/pp.2025.101483)
- 採用: [A Methodological Plea: Sampling in Experimental Philosophy](https://doi.org/10.1111/theo.70113)
- 採用: [CONTEMPORARY METHODS OF TEACHING PHILOSOPHY IN NON-CORE AREAS OF STUDY: SIX THINKING HATS, MIND MAPS, EXPERIMENTAL PHILOSOPHY](https://doi.org/10.31862/2218-8711-2026-2-117-133)
- 採用: [Robert Hooke’s Experimental Philosophy, by Felicity Henderson](https://doi.org/10.1163/18253911-bja10207)

## crossref / experimental_philosophy / production / relevance

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 32308。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [Trope analysis and folk intuitions](https://doi.org/10.1007/s11229-020-03013-3)
- 採用: [Locating value in moral progress: Valence asymmetries in folk intuitions](https://doi.org/10.1093/analys/anag030)
- 採用: [Reflection, reflex, and folk intuitions](https://doi.org/10.1016/j.concog.2011.02.018)
- 採用: [FOLK INTUITIONS AND THE NO-LUCK-THESIS](https://doi.org/10.1017/epi.2015.49)
- 採用: [Probing folk-psychology: Do Libet-style experiments reflect folk intuitions about free action?](https://doi.org/10.1016/j.concog.2016.11.004)

## crossref / experimental_philosophy / production-weekly / relevance

クエリ: `folk intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 1件。 API候補総数: 1807。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=folk+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Locating value in moral progress: Valence asymmetries in folk intuitions](https://doi.org/10.1093/analys/anag030)
- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [Intuitions-at-Work Theory: Understanding the causal loop between intuitions and diversity in organizations](https://doi.org/10.1016/j.riob.2025.100225)
- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Confucian Moral Intuitions without Moral Intuitionism](https://doi.org/10.1353/pew.2025.a982215)

## crossref / experimental_philosophy / production / relevance

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 5件。 API候補総数: 16569。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [On Normativity and Epistemic Intuitions: Further Evidence for Cross-Cultural Uniformity of Epistemic Intuitions - Short Report](https://doi.org/10.2139/ssrn.2538611)
- 採用: [Epistemic Intuitions and Epistemic Contextualism](https://doi.org/10.1111/j.1933-1592.2006.tb00565.x)
- 採用: [Epistemic Intuitions](https://doi.org/10.1111/j.1747-9991.2007.00104.x)
- 採用: [EPISTEMIC INVARIANTISM AND CONTEXTUALIST INTUITIONS](https://doi.org/10.1017/epi.2015.36)
- 採用: [Ignorance, Knowledge, and Two Epistemic Intuitions](https://doi.org/10.1007/s11406-021-00342-6)

## crossref / experimental_philosophy / production-weekly / relevance

クエリ: `epistemic intuitions`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 2810。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=epistemic+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [Intuitions-at-Work Theory: Understanding the causal loop between intuitions and diversity in organizations](https://doi.org/10.1016/j.riob.2025.100225)
- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Confucian Moral Intuitions without Moral Intuitionism](https://doi.org/10.1353/pew.2025.a982215)
- 除外: [Epistemic exploitation: When truth serves non-epistemic ends](https://doi.org/10.1007/s11229-026-05611-z)

## crossref / experimental_philosophy / production / relevance

クエリ: `Knobe effect`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 5件。 API候補総数: 2780894。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=Knobe+effect&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [A simple linguistic approach to the Knobe effect, or the Knobe effect without any vignette](https://doi.org/10.1007/s11098-017-0926-1)
- 採用: [Norms and the Knobe effect](https://doi.org/10.1093/analys/anq037)
- 採用: [Interview on Experimental Philosophy with Joshua Knobe](https://doi.org/10.31273/eirj.v4i1.144)
- 採用: [Three Ambiguities in the Knobe Effect](https://doi.org/10.17791/jcs.2014.15.1.1)
- 採用: [HOW TO CANCEL THE KNOBE EFFECT](https://doi.org/10.2307/48614004)

## crossref / experimental_philosophy / production-weekly / relevance

クエリ: `Knobe effect`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 2件。 API候補総数: 125681。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=Knobe+effect&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Quantifying the Knobe effect: population-level patterns and heterogeneity analyses](https://doi.org/10.1080/09515089.2026.2676274)
- 採用: [Assessing the Knobe Effect in Autistic and Non-Autistic Individuals](https://doi.org/10.1007/s13164-025-00792-x)
- 除外: [Conflicting Intuitions](https://doi.org/10.3998/ergo.9262)
- 除外: [Dimensions of identity-representing belief](https://doi.org/10.1016/j.cognition.2025.106378)
- 除外: [No privileged link between intentionality and causation: Generalizable effects of agency in language](https://doi.org/10.1016/j.cognition.2025.106225)

## crossref / experimental_philosophy / production / relevance

クエリ: `Gettier intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 1件。 API候補総数: 1417。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=Gettier+intuitions&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [Concept Revision, Concept Application and the Role of Intuitions in Gettier Cases](https://doi.org/10.1017/epi.2022.49)
- 除外: [The Gettier-illusion: Gettier-partialism and infallibilism](https://doi.org/10.1007/s11229-011-9924-6)
- 除外: [Contraexemplos à la Gettier – Serão Todos Apropriados?](https://doi.org/10.5007/1808-1711.2025.e97234)
- 除外: [THE GETTIER PROBLEM IN CONTEMPORARY EPISTEMOLOGY](https://doi.org/10.29228/sobider.72209)
- 除外: [GETTIER SONRASI EPİSTEMOLOJİYE ELEŞTİREL BİR KATKI: İNANCIN REFLEKSİF NİTELİĞİ](https://doi.org/10.58634/felsefedunyasi.1255983)

## crossref / experimental_philosophy / production-weekly / relevance

クエリ: `Gettier intuitions`

現在の設定: 比較用・不採用

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 0件。 API候補総数: 71。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=Gettier+intuitions&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [El problema de Gettier y la concepción argumentativa de la justificación](https://doi.org/10.15366/ria2014.8.002)
- 除外: [Knowledge-how and Gettier-cases](https://doi.org/10.1080/0020174x.2026.2735950)
- 除外: [TEORIAS DO CONHECIMENTO, FALIBILISMO E A INESCAPABILIDADE DOS PROBLEMAS DE GETTIER](https://doi.org/10.26512/pl.v14i31.60483)
- 除外: [Phenomenally Skilful Intuitions](https://doi.org/10.1007/s10670-026-01128-6)
- 除外: [Intuitions-at-Work Theory: Understanding the causal loop between intuitions and diversity in organizations](https://doi.org/10.1016/j.riob.2025.100225)

## crossref / ai_philosophy / production / relevance

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 2件、新フィルター通過: 2件。 API候補総数: 1058735。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 除外: [Conference on the philosophy of Donald Davidson](https://doi.org/10.1016/0004-3702(84)90049-3)
- 採用: [Interactions between philosophy and artificial intelligence: The role of intuition and non-logical reasoning in intelligence](https://doi.org/10.1016/0004-3702(71)90011-7)
- 除外: [Recent work in philosophy II](https://doi.org/10.1016/0004-3702(84)90051-1)
- 除外: [Why Coaching Needs Real Intelligence, Not Artificial Intelligence](https://doi.org/10.22316/poc/09.2.02)
- 採用: [Recent work in philosophy of interest to AI](https://doi.org/10.1016/0004-3702(82)90018-2)

## crossref / ai_philosophy / production-weekly / relevance

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 5件、旧フィルター通過: 3件、新フィルター通過: 3件。 API候補総数: 138872。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=artificial+intelligence+philosophy&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 除外: [Artificial Intelligence and the Assumptive Worlds of the Self](https://doi.org/10.53656/phil2026-03-05)
- 採用: [A Study on the Design of a Philosophy Education Program for Children in the Era of Artificial Intelligence](https://doi.org/10.59728/jaie.2026.5.1.182)
- 採用: [A Study on the Design of an AI Philosophy Curriculum](https://doi.org/10.59728/jaie.2026.5.1.116)
- 除外: [The Restriction of Artificial Intelligence on Human "Species-Life"](https://doi.org/10.23977/phij.2026.050105)
- 採用: [Artificial Intelligence and the Value Alignment Problem: A Philosophical Introduction, by Travis LaCroix](https://doi.org/10.5840/teachphil2026493254)

## crossref / ai_philosophy / production / relevance

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 5件。 API候補総数: 518345。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [Progress in machine consciousness](https://doi.org/10.1016/j.concog.2007.04.005)
- 採用: [Haikonen's Philosophy of Machine Consciousness](https://doi.org/10.1142/s1793843014400022)
- 採用: [MACHINE CONSCIOUSNESS: RESPONSE TO COMMENTARIES](https://doi.org/10.1142/s1793843010000412)
- 採用: [WHICH KIND OF MACHINE CONSCIOUSNESS?](https://doi.org/10.1142/s1793843010000266)
- 採用: [THE PHILOSOPHICAL ISSUE IN MACHINE CONSCIOUSNESS](https://doi.org/10.1142/s179384300900013x)

## crossref / ai_philosophy / production-weekly / relevance

クエリ: `machine consciousness`

現在の設定: 有効

標本: 5件、旧フィルター通過: 1件、新フィルター通過: 5件。 API候補総数: 85353。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=machine+consciousness&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Beyond computational equivalence: the behavioral inference principle for machine consciousness](https://doi.org/10.1093/nc/niag002)
- 採用: [Aidification of the self: a phenomenological approach to machine consciousness through human-robot ‘between-ness’](https://doi.org/10.1093/nc/niag032)
- 採用: [A neomythist attitude toward machine consciousness](https://doi.org/10.1007/s00146-026-03329-7)
- 採用: [Consciousness, creativity, and understanding are not obstacles to machine intelligence](https://doi.org/10.1007/s11229-026-05655-1)
- 採用: [On the Consciousness of Intelligent Systems](https://doi.org/10.54364/aaiml.2026.64335)

## crossref / ai_philosophy / production / relevance

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 4件。 API候補総数: 642008。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 採用: [The moral decision machine: a challenge for artificial moral agency based on moral deference](https://doi.org/10.1007/s43681-024-00444-3)
- 採用: [WHAT MAKES ANY AGENT A MORAL AGENT? REFLECTIONS ON MACHINE CONSCIOUSNESS AND MORAL AGENCY](https://doi.org/10.1142/s1793843013500017)
- 採用: [Agent or hammer?: A philosophical inquiry into machine moral agency](https://doi.org/10.1007/s43681-025-00920-4)
- 採用: [Between Man and Machine: Unveiling the Incomplete Moral Agency of Virtual Digital Humans](https://doi.org/10.1007/s11245-025-10309-x)
- 除外: [Moral Agency, Moral Responsibility, and Artifacts: What Existing Artifacts Fail to Achieve (and Why), and Why They, Nevertheless, Can (and Do!) Make Moral Claims upon Us](https://doi.org/10.1142/s1793843014400162)

## crossref / ai_philosophy / production-weekly / relevance

クエリ: `machine moral agency`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 4件。 API候補総数: 97027。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=machine+moral+agency&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Agent or hammer?: A philosophical inquiry into machine moral agency](https://doi.org/10.1007/s43681-025-00920-4)
- 採用: [Between Man and Machine: Unveiling the Incomplete Moral Agency of Virtual Digital Humans](https://doi.org/10.1007/s11245-025-10309-x)
- 採用: [Trends and challenges in machine ethics: an updated survey of artificial moral agency implementations](https://doi.org/10.1007/s43681-025-00971-7)
- 採用: [Noentarion II: A Defense of the AI Moral Agency Claim in “Noentarion: Toward a New Ontological Category for Non-Biological Agency in the Postmodern Age”](https://doi.org/10.33140/jar.10.02.01)
- 除外: [Moral Injury, Betrayal Trauma, and Epistemic Injustice: Reconstructing Moral Agency After Ecclesial Abuse Through Survivor Narratives](https://doi.org/10.1515/opth-2025-0080)

## crossref / ai_philosophy / production / relevance

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 3件。 API候補総数: 702775。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article&sort=score&order=desc)

- 除外: [Epistemology and cognition](https://doi.org/10.1016/0004-3702(88)90041-0)
- 除外: [On Epistemology and cognition](https://doi.org/10.1016/0004-3702(88)90042-2)
- 採用: [Notes on “Epistemology of a rule-based expert system”](https://doi.org/10.1016/0004-3702(93)90186-f)
- 採用: [Informational self meaning as a structural theory in artificial intelligence ontology and epistemology](https://doi.org/10.1007/s44163-026-01984-9)
- 採用: [The epistemology of a rule-based expert system —a framework for explanation](https://doi.org/10.1016/0004-3702(83)90008-5)

## crossref / ai_philosophy / production-weekly / relevance

クエリ: `artificial intelligence epistemology`

現在の設定: 有効

標本: 5件、旧フィルター通過: 0件、新フィルター通過: 3件。 API候補総数: 125444。

[検索リクエスト](https://api.crossref.org/works?query.bibliographic=artificial+intelligence+epistemology&rows=5&offset=0&filter=type%3Ajournal-article%2Cfrom-pub-date%3A2025-10-06%2Cuntil-pub-date%3A2026-10-06&sort=score&order=desc)

- 採用: [Informational self meaning as a structural theory in artificial intelligence ontology and epistemology](https://doi.org/10.1007/s44163-026-01984-9)
- 採用: [The silent knowledge crisis: Algorithmic epistemology and the marginalisation of tacit and indigenous knowledge in the age of artificial intelligence](https://doi.org/10.65221/0221)
- 除外: [Inteligência artificial generativa:  epistemologia e autonomia universitária](https://doi.org/10.61203/2347-0658.v1.n15.51680)
- 除外: [Epistemología de la creatividad publicitaria en la era de la inteligencia artificial](https://doi.org/10.62701/revsocial.v14.5572)
- 採用: [Afrocentricity and the Epistemology of Artificial Intelligence A Thought Piece on Black Futures in Technology](https://doi.org/10.65724/zclh6232)

## cinii-index / dream / index / index

クエリ: `夢 哲学`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 2件。

- 採用: [「夢の哲学」最後期の一資料 -Nyayalilavati 「夢章」試訳-](https://cir.nii.ac.jp/crid/1050001202480363264)
- 採用: [夢とうつつ](https://cir.nii.ac.jp/crid/1390001205323846912)
- 除外: [真実夢説(Satyasvapnavada)について - CiNii Research](https://cir.nii.ac.jp/crid/1521417755604427648)

## cinii-index / dream / index / index

クエリ: `夢 意識`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 0件。

- 除外: [Estimation of dream content by machine learning using magnetoencephalographic data.](https://cir.nii.ac.jp/crid/1040299826883067520)
- 除外: [Dreams in Relation to Memory, Emotion, and Creativity: An Integration from the Perspective of Predictive Processing](https://cir.nii.ac.jp/crid/1390869998261156096)
- 除外: [Toward a Pluralistic Method of Dream Analysis](https://cir.nii.ac.jp/crid/1390290699627169792)

## cinii-index / dream / index / index

クエリ: `夢 現象学`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 1件。

- 除外: [Dreams in Relation to Memory, Emotion, and Creativity: An Integration from the Perspective of Predictive Processing](https://cir.nii.ac.jp/crid/1390869998261156096)
- 採用: [ハイデガー現象学からみた統合失調症のユング派夢分析療法](https://cir.nii.ac.jp/crid/1520290885606778368)
- 除外: [Toward a Pluralistic Method of Dream Analysis](https://cir.nii.ac.jp/crid/1390290699627169792)

## cinii-index / dream / index / index

クエリ: `夢 懐疑`

現在の設定: 有効

標本: 1件、旧フィルター通過: 1件、新フィルター通過: 1件。

- 採用: [デカルトにおける夢と懐疑](https://cir.nii.ac.jp/crid/1520009410390280448)

## cinii-index / dream / index / index

クエリ: `夢 うつつ`

現在の設定: 有効

標本: 3件、旧フィルター通過: 2件、新フィルター通過: 1件。

- 採用: [夢とうつつ](https://cir.nii.ac.jp/crid/1390001205323846912)
- 除外: [夢うつつ白羊宮--「幻想映画室白羊宮」主人追懐 付・幻想映画室<白羊宮>のあゆみ](https://cir.nii.ac.jp/crid/1523669554809423616)
- 除外: [Toward a Pluralistic Method of Dream Analysis](https://cir.nii.ac.jp/crid/1390290699627169792)

## cinii-index / dream / index / index

クエリ: `夢 ベルクソン`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 1件。

- 採用: [ベルクソンにおける「夢」 :『物質と記憶』を中心に](https://cir.nii.ac.jp/crid/1390290699580107008)
- 除外: [Bergson’s Conception of Consciousness](https://cir.nii.ac.jp/crid/1390572174718228480)
- 除外: [The two Characteristics of Durée in the Theory of Bergson : Through the Thinking of Merleau=Ponty](https://cir.nii.ac.jp/crid/1390290699633749760)

## cinii-index / dream / index / index

クエリ: `dream consciousness`

現在の設定: 有効

標本: 1件、旧フィルター通過: 1件、新フィルター通過: 0件。

- 除外: [REM sleep and dreaming : towards a theory of protoconsciousness](https://cir.nii.ac.jp/crid/1573105974131701888)

## cinii-index / dream / index / index

クエリ: `dream phenomenology`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 1件。

- 除外: [Toward a Pluralistic Method of Dream Analysis](https://cir.nii.ac.jp/crid/1390290699627169792)
- 採用: [ハイデガー現象学からみた統合失調症のユング派夢分析療法](https://cir.nii.ac.jp/crid/1520290885606778368)
- 除外: [Dreams in Relation to Memory, Emotion, and Creativity: An Integration from the Perspective of Predictive Processing](https://cir.nii.ac.jp/crid/1390869998261156096)

## cinii-index / dream / index / index

クエリ: `dream skepticism`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 0件。

- 除外: [The reinterpretation of dreams: An evolutionary hypothesis of the function of dreaming](https://cir.nii.ac.jp/crid/1360855569861822720)
- 除外: [A Literature Review of Research on Dreaming and Emotion Regulation](https://cir.nii.ac.jp/crid/1390307746625647872)
- 除外: [Dreams in Relation to Memory, Emotion, and Creativity: An Integration from the Perspective of Predictive Processing](https://cir.nii.ac.jp/crid/1390869998261156096)

## cinii-index / experimental_philosophy / index / index

クエリ: `実験哲学`

現在の設定: 有効

標本: 3件、旧フィルター通過: 1件、新フィルター通過: 1件。

- 採用: [バークリーはイギリス経験論の異端児か : ダブリンの実験哲学というコンテクストからの再考](https://cir.nii.ac.jp/crid/1050564288909653120)
- 除外: [「実験」とは何か : 科学・社会・芸術から考える = What is "experiment"? : thinking through science, society and art](https://cir.nii.ac.jp/crid/1971149384832974852)
- 除外: [哲学的認識論はいつから科学オンチになったのか?](https://cir.nii.ac.jp/crid/1390001205084509312)

## cinii-index / experimental_philosophy / index / index

クエリ: `experimental philosophy`

現在の設定: 有効

標本: 3件、旧フィルター通過: 1件、新フィルター通過: 1件。

- 採用: [バークリーはイギリス経験論の異端児か : ダブリンの実験哲学というコンテクストからの再考](https://cir.nii.ac.jp/crid/1050564288909653120)
- 除外: [哲学的認識論はいつから科学オンチになったのか?](https://cir.nii.ac.jp/crid/1390001205084509312)
- 除外: [“Philosophy as a Method”: Tracing the Histories of Intersections of “Philosophy,” “Methodology,” and “Education”](https://cir.nii.ac.jp/crid/1360857597910003840)

## cinii-index / experimental_philosophy / index / index

クエリ: `哲学 直観`

現在の設定: 比較用・不採用

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 0件。

rejected: broad historical/conceptual intuition results; replaced by moral responsibility/free-will queries

- 除外: [カントと知的直観 ―カント「純粋理性批判」超越論的感性論の分析から―](https://cir.nii.ac.jp/crid/1050282813842111872)
- 除外: [ベルクソンの直観論 : 「漠然とした直観」から「判明な直観」へ](https://cir.nii.ac.jp/crid/1050862643885112192)
- 除外: [シェリング『超越論的観念論の体系』における知的直観と美的直観](https://cir.nii.ac.jp/crid/1050282812825426048)

## cinii-index / experimental_philosophy / index / index

クエリ: `認識 直観`

現在の設定: 比較用・不採用

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 0件。

rejected: broad historical/conceptual intuition results; replaced by moral responsibility/free-will queries

- 除外: [ベルクソンの直観論 : 「漠然とした直観」から「判明な直観」へ](https://cir.nii.ac.jp/crid/1050862643885112192)
- 除外: [知覚, 実在, 客観性](https://cir.nii.ac.jp/crid/1390282680299605248)
- 除外: [カントと知的直観 ―カント「純粋理性批判」超越論的感性論の分析から―](https://cir.nii.ac.jp/crid/1050282813842111872)

## cinii-index / experimental_philosophy / index / index

クエリ: `ノーブ効果`

現在の設定: 比較用・不採用

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 0件。

- 除外: [選挙予測のアナウンスメント効果に関する先行研究の概観 : アナウンスメント効果の下位効果の拡張に向けて](https://cir.nii.ac.jp/crid/1050282677904493952)
- 除外: [有権者個人の支持政党変化は予測できるか : レスポンス・レイテンシーを用いた新指標の提案](https://cir.nii.ac.jp/crid/1390572174768012160)
- 除外: [「知識適用における既知性効果」の一般性およびその発生機序について](https://cir.nii.ac.jp/crid/1520301297457474560)

## cinii-index / experimental_philosophy / index / index

クエリ: `ゲティア 直観`

現在の設定: 比較用・不採用

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 0件。

- 除外: [ベルクソンの直観論 : 「漠然とした直観」から「判明な直観」へ](https://cir.nii.ac.jp/crid/1050862643885112192)
- 除外: [「地平の現象学」から「顕現せざるものの現象学」へ--「カテゴリー的直観」に関するハイデガーの態度変更をめぐって](https://cir.nii.ac.jp/crid/1523951030849272960)
- 除外: [カントと知的直観 ―カント「純粋理性批判」超越論的感性論の分析から―](https://cir.nii.ac.jp/crid/1050282813842111872)

## cinii-index / ai_philosophy / index / index

クエリ: `人工知能 哲学`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 3件。

- 採用: [人工知能について、哲学的に考えるために - CiNii Research](https://cir.nii.ac.jp/crid/1390845713062019584)
- 採用: [人工知能と現代哲学 - CiNii Research](https://cir.nii.ac.jp/crid/1390282763108597888)
- 採用: [AI哲学マップ(第1回)人工知能と哲学の"これまで"と"これから"](https://cir.nii.ac.jp/crid/1390005822567119104)

## cinii-index / ai_philosophy / index / index

クエリ: `人工意識`

現在の設定: 有効

標本: 3件、旧フィルター通過: 1件、新フィルター通過: 3件。

- 採用: [汎用人工知能プラットフォームとしての人工意識](https://cir.nii.ac.jp/crid/1390570873703790976)
- 採用: [人工無脳における人工意識](https://cir.nii.ac.jp/crid/1520009409406507520)
- 採用: [How to Make a Conscious Robot-Fundamental Idea based on Passive Consciousness Model-](https://cir.nii.ac.jp/crid/1390001204725809792)

## cinii-index / ai_philosophy / index / index

クエリ: `機械 意識`

現在の設定: 有効

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 1件。

- 除外: [TARB書評: 渡辺正峰『脳の意識 機械の意識：脳神経科学の挑戦』](https://cir.nii.ac.jp/crid/1390569382246785792)
- 採用: [How to Make a Conscious Robot-Fundamental Idea based on Passive Consciousness Model-](https://cir.nii.ac.jp/crid/1390001204725809792)
- 除外: [機械の身体と人間の身体、機械の心と人間の心](https://cir.nii.ac.jp/crid/1050291768102158208)

## cinii-index / ai_philosophy / index / index

クエリ: `AI 道徳`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 2件。

- 採用: [日本語大規模言語モデルが持つ倫理性の定量的評価と獲得の試み](https://cir.nii.ac.jp/crid/1050019357982993664)
- 除外: [Bioethics in AI - Overall Perspective and Direction for Future Researches in This Field](https://cir.nii.ac.jp/crid/1040003825729668608)
- 採用: [AI・ロボットと共存の倫理](https://cir.nii.ac.jp/crid/1971149384870609058)

## cinii-index / ai_philosophy / index / index

クエリ: `大規模言語モデル 哲学`

現在の設定: 有効

標本: 3件、旧フィルター通過: 2件、新フィルター通過: 2件。

- 採用: [日本語大規模言語モデルが持つ倫理性の定量的評価と獲得の試み](https://cir.nii.ac.jp/crid/1050019357982993664)
- 除外: [Evolution of Large Language Models into Large Knowledge Models through Integration with Human Knowledge](https://cir.nii.ac.jp/crid/1040018274925656192)
- 採用: [AI哲学マップ(第1回)人工知能と哲学の"これまで"と"これから"](https://cir.nii.ac.jp/crid/1390005822567119104)

## cinii-index / ai_philosophy / index / index

クエリ: `artificial intelligence philosophy`

現在の設定: 有効

標本: 3件、旧フィルター通過: 3件、新フィルター通過: 3件。

- 採用: [From deep learning to rational machines : what the history of philosophy can teach us about the future of artificial intelligence](https://cir.nii.ac.jp/crid/1970867909853890750)
- 採用: [AI哲学マップ(第1回)人工知能と哲学の"これまで"と"これから"](https://cir.nii.ac.jp/crid/1390005822567119104)
- 採用: [Some philosophical problems from the standpoint of artificial intelligence](https://cir.nii.ac.jp/crid/1572261548950226944)

## cinii-index / ai_philosophy / index / index

クエリ: `machine consciousness`

現在の設定: 有効

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 2件。

- 採用: [Artificial Consciousness as a Platform for Artificial General Intelligence](https://cir.nii.ac.jp/crid/1390570873703790976)
- 除外: [Building machines that learn and think like people](https://cir.nii.ac.jp/crid/1363951794108730496)
- 採用: [How to Make a Conscious Robot-Fundamental Idea based on Passive Consciousness Model-](https://cir.nii.ac.jp/crid/1390001204725809792)

## cinii-index / ai_philosophy / index / index

クエリ: `machine moral agency`

現在の設定: 有効

標本: 3件、旧フィルター通過: 0件、新フィルター通過: 0件。

- 除外: [Investigating machine moral judgement through the Delphi experiment](https://cir.nii.ac.jp/crid/1360588381063507200)
- 除外: [Integrating robot ethics and machine morality: the study and design of moral competence in robots](https://cir.nii.ac.jp/crid/1360013171887935616)
- 除外: [Data and code on the Moral Machine experiment on large language models (LLMs)](https://cir.nii.ac.jp/crid/1880583643297181440)

## cinii-index / experimental_philosophy / index / index

クエリ: `道徳的責任 直観`

現在の設定: 有効

標本: 1件、旧フィルター通過: 0件、新フィルター通過: 0件。

- 除外: [表象・説明・道徳的責任 --具体-抽象のパズルをめぐって--](https://cir.nii.ac.jp/crid/1390300058784387712)

## cinii-index / experimental_philosophy / index / index

クエリ: `自由意志 直観`

現在の設定: 有効

標本: 1件、旧フィルター通過: 0件、新フィルター通過: 0件。

- 除外: [表象・説明・道徳的責任 --具体-抽象のパズルをめぐって--](https://cir.nii.ac.jp/crid/1390300058784387712)

