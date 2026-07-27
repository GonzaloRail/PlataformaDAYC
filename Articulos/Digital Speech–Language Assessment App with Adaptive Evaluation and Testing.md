Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
Digital Speech–Language Assessment App with
Adaptive Evaluation and Testing
Aadi Shankar Pillai Deepthi K Moorthy
Dept. of Computer Science and Engineering Dept. of Computer Science and Engineering
Mar Baselios College of Engineering and Technology Mar Baselios College of Engineering and Technology
Trivandrum, India Trivandrum, India
aadishankarp@gmail.com deepthikmoorthy@gmail.com
Dr. Sreedevi P Nandana D
Dept. of Electronics and Communication Engineering Dept. of Computer Science and Engineering
Mar Baselios College of Engineering and Technology Mar Baselios College of Engineering and Technology
Trivandrum, India Trivandrum, India
sreedevi.p@mbcet.ac.in nandana2004nannu@gmail.com
Rohit B Nair Salin Shain
Dept. of Computer Science and Engineering Dept. of Computer Science and Engineering
Mar Baselios College of Engineering and Technology Mar Baselios College of Engineering and Technology
Trivandrum, India Trivandrum, India
rohitbnair1@gmail.com salinshain@gmail.com
Abstract—Early identification of speech and language disor- Traditional speech–language assessment methods, typically
ders in children is critical for effective clinical intervention and based on manual testing and therapist observation, are clini-
healthycognitivedevelopment.Conventionalassessmentmethods
callyreliablebutoftentime-consuming,costly,andsusceptible
are largely manual, time-consuming, and subject to evaluator
to inter-evaluator variability due to limited standardization.
inconsistencies. This paper presents a Digital Speech–Language
Assessment App with Adaptive Evaluation and Testing, a bilin- With the increasing demand for digital transformation in
gual mobile-based platform designed to digitize and standardize healthcare, there is a strong need for intelligent systems that
pediatric speech and language assessment. The system is devel- improve assessment efficiency, and accessibility. In response
oped using Flutter for cross-platform deployment and Firebase to this need, the present work focuses on supporting early
for secure authentication, real-time data storage, and synchro-
detection and timely intervention through a structured and
nization.TheapplicationsupportsbilingualassessmentinEnglish
and Malayalam, making it suitable for multilingual regions. technology-driven assessment framework.
An age-adaptive testing framework dynamically recommends The proposed solution is a bilingual, age-adaptive mo-
appropriate reception and expression tests based on the child’s bile application that digitizes pediatric speech and language
age and historical performance. Both automatic and therapist-
assessment using a Flutter-based frontend and Firebase for
assistedmanualscoringaresupportedtoensureclinicalflexibility
secure data storage and access control. The system main-
andaccuracy.ALanguageProficiencyProgressTrackervisually
monitorslong-termdevelopmentaltrendstoassistinpersonalized tains comprehensive assessment histories and enables visual
therapyplanning.Thesystemisdesignedwithstrictdataprivacy trackingoflanguagedevelopmentovertime,whilesupporting
androle-basedaccesscontroltomeethealthcaredatastandards. bilingualevaluationsuitableformultilingualenvironments.By
Initial implementation and testing validate secure therapist au-
integrating a Language Proficiency Progress Tracker and an
thentication,profilemanagement,andage-basedtestassignment.
Intelligent Age Group Recommender, the platform provides
The proposed system improves assessment efficiency, diagnostic
consistency, and accessibility for pediatric speech and language personalized, data-driven insights to assist clinical decision-
evaluation. making. In addition to improving workflow efficiency, the
Index Terms—Speech-language assessment, adaptive testing, system ensures data privacy and scalability, offering a reliable
progress tracking.
digital tool to support speech–language pathologists in deliv-
ering consistent and adaptive therapy tailored to each child’s
I. INTRODUCTION developmental needs.
Language development is a critical component of a child’s
A. Novelty and Scientific Contribution
cognitive, emotional, and social growth, and delays or disor-
dersinspeechandlanguageacquisitioncansignificantlyaffect This research’s main point is the fusion of adaptive as-
learning, communication, and long-term academic outcomes. sessment, weighted scoring, and predictive analytics into a
979-8-3315-5519-1/26/$31.00 ©2026 IEEE 1588
12921411.6202.38276ISCMCI/9011.01
:IOD
|
EEEI
6202©
00.13$/62/1-9155-5133-8-979
| )ISCMCI(
scitamrofnI
elbaniatsuS
dna
gnitupmoC
eliboM
no
ecnerefnoC
lanoitanretnI
ht7
6202
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore. Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
speech–language evaluation platform that can be used in a reading fluency has also been taken into account in studies
clinical setting. In general, the digital tools that only digitize [9] and [7] where acoustic-prosodic attributes and ASR-based
themanualworkflowsarenotlikethisproposedsystemwhich pipelineswereusedtomeasurethecorrelationbetweenspeech
changes assessment difficulty dynamically, looks at longitu- characteristics and rater scores over big classroom datasets
dinal performance trends and even predicts future learning thus the possibility of automated fluency screening has been
outcomes to facilitate clinical decision-making that is driven demonstrated.
by data. Recent research in self-supervised learning (SSL) and deep
Fromthepointofviewofthemethod,theweightedscoring learning has substantially changed the research of speech and
mechanism is a combination of response correctness, task voice assessment. In the papers [2], [6], [12], [13], and [14]
difficulty, and response time that are all integrated into one the authors show that SSL embeddings like wav2vec2 and
performancemetricwhichmakesitpossibletodetectchanges HuBERTworkbestfordetectingvoicedisordersandanalyzing
in learning more sensitively than when using binary scoring. pediatric speech sound disorder and the results are consistent
TheincorporationofaRandomForestregressionmodelmakes inthattheseembeddingsbeatthehandcraftedacousticfeatures
the assessment going far beyond the retrospective analysis. in various datasets and different ways of evaluation. These
Also,bilingualsupportandatransparent,rule-basedagegroup researches talked about robust representation learning, cross-
recommender that helps overcome the challenges faced in database generalization, and multimodal inputs whereas the
multilingualandresource-constrainedclinicalsettings,respec- articles [4], [5], and [8] took the speech processing research
tively, are two of the factors that, when combined, constitute further into the realm of end-to-end ASR systems, pronun-
a clinically valid and scalable framework for the adaptive ciation assessment, and interactive spoken language learning
speech–language assessment. platforms using the FastSpeech, CNN–BLSTM architectures,
and multitask wav2vec2 models respectively. Together, these
B. Limitations of Existing Studies and Research Gap
papersattesttotheincreaseduseofAI-drivenspeechtechnol-
Current digital and computational methods for speech- ogy in healthcare and education.
language assessment, which are largely static digitizations Afterward, the use of large language models and sequence-
of manual workflows, do not possess adaptive clinical in- to-sequence layouts for higher-level language assessment and
telligence. In most cases, studies on this subject do not error correction has been the subject of inquiry. In the experi-
consider difficulty-aware scoring, response-time sensitivity, or ment [10], the authors pitted supervised ASR error correction
the explicit modeling of learning progression across sessions. modelsagainstzero-shotcorrectionusinglargelanguagemod-
In addition, predictive analytics for performance forecasting els such as GPT-3.5 and GPT-4 and the result was that post-
areveryrarelyusedinpediatricassessment,thussuchsystems recognitioncorrectioncouldbecarriedoutmoreefficientlyby
are limited to retrospective analysis and cannot be used as usingthedecodingstrategiestheyproposed.Inthesamevein,
a source of proactive therapeutic support. These drawbacks the researchers in study [11] presented an LLM-based model
become even more significant in multilingual and resource- as the best fit for the assessment of language abilities in kids
poor clinical environments, where the existing solutions may withASD,throughmulti-expertvotingitgothighconcurrence
be requiring a complicated speech processing infrastructure with clinical evaluation standards. Although these pieces of
or may be only supporting monolingual evaluation. The lack work highlight the capabilities of sophisticated models in
of transparent, clinically interpretable mechanisms for the speech and language analysis, the majority of the current
adaptive adjustment of difficulty levels reveals a research methodstakeintoaccountonlyisolatedtaskssuchasrecogni-
gap, which this work fills by combining weighted scoring, tion, scoring, or pathology detection. Our research, however,
predictive progress modeling, age-adaptive evaluation, and is different in that it fills this void by combining adaptive
bilingual support in a single, easily accessible mobile assess- assessment, weighted scoring, predictive progress modeling,
ment platform for real-world clinical use. and bilingual support in one integrated, deployable platform
for longitudinal pediatric speech–language evaluation.
II. LITERATUREREVIEW
Several studies have been done on automated scoring and
III. METHODOLOGY
linguistic analysis by using natural language processing and The project design is in line with a modular and iterative
statistical modeling techniques. The research [1] dealt with development process, which guarantees that each module is
NLP-powered automatic scoring of vocabulary responses by individually working, scalable, and maintainable with ease.
using Word2Vec, GloVe, BERT, GPT-2, and ELMo as pre- The system’s architecture is made up of several modules that
trained embeddings and showed that the time for manual encompass both clinical and technical requirements.
scoringofshorttextualresponsescanbeconsiderablyreduced.
A. Therapist Authentication and Access Control
The paper [3] was about figuring out the cognitive predictors
of language development in children with developmental lan- TheTherapistAuthenticationandAccessControlmoduleis
guagedisorderusinglogisticregressionandROCanalysisand intended to guarantee that the system is accessed in a secure
an important result was that working memory and learning mannerandthatthereisstrictadherencetothehealthcaredata
mechanisms play a crucial role in this process. The issue of protection standards Fig 1. Secure login features are put in
979-8-3315-5519-1/26/$31.00 ©2026 IEEE 1589
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore. Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
|     |     |     |     |     |     |     |     | store test | data   | and  | Flutter-based |     | UI controls | for        | an engag- |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------ | ---- | ------------- | --- | ----------- | ---------- | --------- |
|     |     |     |     |     |     |     |     | ing and    | smooth | test | management    |     | experience. | Therapists | can       |
graphically,textually,andphoneme-wisecreatenewtestitems.
|         |            |     |              |     |        |          |         | Besides      | that, they | can            | also   | modify        | or delete       | existing        | tasks as |
| ------- | ---------- | --- | ------------ | --- | ------ | -------- | ------- | ------------ | ---------- | -------------- | ------ | ------------- | --------------- | --------------- | -------- |
|         |            |     |              |     |        |          |         | per the      | change     | of therapy     |        | objectives.   | Such            | a flexible      | design   |
|         |            |     |              |     |        |          |         | guarantees   | that       | the assessment |        | repository    |                 | stays adaptive  | and      |
|         |            |     |              |     |        |          |         | in line with | the        | individualized |        | intervention  |                 | strategies.     |          |
|         |            |     |              |     |        |          |         | E. Manual    | Evaluation |                | and    | Therapist     | Recommendations |                 |          |
| Fig. 1: | High-level |     | architecture |     | of the | proposed | system. |              |            |                |        |               |                 |                 |          |
|         |            |     |              |     |        |          |         | The          | Manual     | Evaluation     |        | and Therapist |                 | Recommendations |          |
|         |            |     |              |     |        |          |         | component    | features   |                | expert | clinical      | judgment        | merged          | with     |
placewithFirebaseAuthentication,whichisaserviceprovider system-generated assessment results to provide a flexible and
| for identity | verification |     | at the | backend | that | can | be trusted. |          |             |     |             |     |       |             |        |
| ------------ | ------------ | --- | ------ | ------- | ---- | --- | ----------- | -------- | ----------- | --- | ----------- | --- | ----- | ----------- | ------ |
|              |              |     |        |         |      |     |             | accurate | evaluation. |     | The module, |     | which | is designed | with a |
Therapists must verify their identity through credential- Flutter-based interface and uses Firebase Firestore for data
based access by using registered email and password combi- storage, makes it possible for therapists to check, cancel, or
nations. This method hides the intricacies of standard security changetheautomatedscoresincaseofunusualspeechpatterns
protocols like token management and session handling, at the or behavioral factors affecting the performance. Besides, it
same time, it impedes unauthorized users from gaining access helpsinthecreationofpersonalizedtherapyplansbyoffering
to the system. The frontend user interface and authentication the possibility of session-specific recommendations that are
logicaredoneinFlutter,whichgivesanunhinderedanduser- safely connected to the individual assessments in order to
| friendly | interaction | of  | all the | platforms | supported. |     |     |     |     |     |     |     |     |     |     |
| -------- | ----------- | --- | ------- | --------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
makedata-drivenclinicaldecision-makingpossible,whichare
|             |             |            |            |         |        |             |               | in line with  | each | child’s | developmental |     |     | needs. |     |
| ----------- | ----------- | ---------- | ---------- | ------- | ------ | ----------- | ------------- | ------------- | ---- | ------- | ------------- | --- | --- | ------ | --- |
| B. Patient  | Profile     | Management |            |         |        |             |               |               |      |         |               |     |     |        |     |
| The Patient |             | Profile    | Management |         | module | is          | the core data |               |      |         |               |     |     |        |     |
|             |             |            |            |         |        |             |               | F. Assessment |      | Module  |               |     |     |        |     |
| layer of    | the system, |            | it is the  | enabler | of     | centralized | storage       |               |      |         |               |     |     |        |     |
and retrieval of clinical records necessary for assessment It is the instrument that performs standardized speech and
and progress tracking. This module is built with Firebase language evaluations and also gathers structured performance
Firestore, a scalable NoSQL cloud database that is suitable data that is necessary for analytics and tracking of progress
for real-time applications. A well-defined Patient data model over time. After each assessment session, the system is doing
|            |         |          |     |            |      |            |         | the automated |     | post-assessment |     | reporting |     | by producing | a de- |
| ---------- | ------- | -------- | --- | ---------- | ---- | ---------- | ------- | ------------- | --- | --------------- | --- | --------- | --- | ------------ | ----- |
| is created | through | a custom |     | Dart class | that | represents | the key |               |     |                 |     |           |     |              |       |
features of the patient demographics, developmental history, tailed summary including total scores, the assigned age band,
and references to test sessions linked. This standard data andfocusareasfortherapy.Thesereportsarekeptsecurelyin
schemaactsasaunifyingagentforpatient-relatedinformation Firestore and are made available to therapists for their review
system-wide, thus ensuring consistency, data integrity, and and follow-up. Moreover, the module is enabling the creation
efficient storage. of session reports in a hard copy PDF format which is a great
|              |         |     |             |            |     |     |     | help in | documentation, |     | communication |     | with | the parents, | and |
| ------------ | ------- | --- | ----------- | ---------- | --- | --- | --- | ------- | -------------- | --- | ------------- | --- | ---- | ------------ | --- |
| C. Therapist | Control |     | and Profile | Management |     |     |     |         |                |     |               |     |      |              |     |
clinicalrecord-keeping.Theclinicalefficiencythatisachieved
The Therapist Control and Profile Management module through this automated reporting mechanism is one of the
empowers authorized clinicians with a single consolidated advantagesofit,besidesthat,themanualdocumentationwork
access to patient information and assessment controls, which is reduced and the accurate archiving of assessment outcomes
| facilitates | efficient | and | safe | clinical | operations. |     | To imple- |     |     |     |     |     |     |     |     |
| ----------- | --------- | --- | ---- | -------- | ----------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
is ensured.
| ment this            | module,        | Firebase |          | Firestore  | is  | used as | the backend   |          |         |     |         |     |     |     |     |
| -------------------- | -------------- | -------- | -------- | ---------- | --- | ------- | ------------- | -------- | ------- | --- | ------- | --- | --- | --- | --- |
| database             | to accommodate |          | the      | structured |     | storage | and retrieval |          |         |     |         |     |     |     |     |
|                      |                |          |          |            |     |         |               | G. Score | History | and | Records |     |     |     |     |
| of therapist-managed |                |          | records. |            |     |         |               |          |         |     |         |     |     |     |     |
TheScoreHistoryandRecordsmoduleisdesignedtostore
| Therapists | are | equipped | with | all | necessary | means | to create, |     |     |     |     |     |     |     |     |
| ---------- | --- | -------- | ---- | --- | --------- | ----- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
update, and maintain patient profiles, as well as to assign age and display assessment performance over time, i.e., across
varioussessions,andthusitactsasthemainprogressdatabase
| bands, store | medical |     | and speech | history, |     | and manage | related |     |     |     |     |     |     |     |     |
| ------------ | ------- | --- | ---------- | -------- | --- | ---------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
test sessions. By centralizing these activities within a single of the system. The module is realized with Firebase Firestore
interface, it is guaranteed that there will be consistency in the to handle data storage that is both scalable and secure, and
|               |     |         |          |           |     |            |         | Flutter-based |     | UI controls | are | used | for data | visualization | and |
| ------------- | --- | ------- | -------- | --------- | --- | ---------- | ------- | ------------- | --- | ----------- | --- | ---- | -------- | ------------- | --- |
| documentation |     | and the | accurate | long-term |     | monitoring | of each |               |     |             |     |      |          |               |     |
patient’s developmental trajectory will be supported. accessibility. The system keeps a detailed record of the tests
|            |      |               |     |     |     |     |     | for each | child,  | including | unique |     | test IDs,   | dates of | sessions,  |
| ---------- | ---- | ------------- | --- | --- | --- | --- | --- | -------- | ------- | --------- | ------ | --- | ----------- | -------- | ---------- |
| D. Dynamic | Test | Configuration |     |     |     |     |     |          |         |           |        |     |             |          |            |
|            |      |               |     |     |     |     |     | weighted | scores, | and       | levels | of  | difficulty. | Such     | a detailed |
The Add/Modify Tests module gives therapists the freedom organization of historical testing data serves as a foundation
to reconfigure assessment tasks on the fly as per the changing for regular progress tracking and opens up the possibility of
clinical requirements. This module uses Firebase Firestore to in-depth performance analysis over long periods of therapy.
|     |     |     |     |     |     | 979-8-3315-5519-1/26/$31.00 ©2026 IEEE |     |     |     |     |     |     |     |     | 1590 |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore.  Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
H. Progress Tracker and Predictive Analytics decision-making. The weighted test score trend, which is a
measure that takes into account both correctness and the
The Progress Tracker module is the central learning analyt-
importance of the task, is used for performance evaluation.
ics engine of the system, which makes it possible to perform
The system recognizes six standard age bands: (0–1), (1–2),
longitudinal analysis of children’s speech and language de-
(2–3), (3–4), (4–5), and (5–6) years. In case a child shows an
velopment based on historical assessment data. This module
increasing performance trend over the three tests, the system
is done in Python with Pandas and NumPy to make data
will be recommending the retention of the current age band
pre-processing, aggregation, and numerical analysis fast and
so as to continue providing the optimal cognitive challenge.
efficient. A structured dataset with 210 assessment entries is
This provision is aimed at ensuring that the continuity of
the analytical foundation. For each test session, the multiple
learning is maintained while at the same time the difficulty
performance indicators are aggregated, among them are the
of the assessment is kept at the level of the child’s developing
weighted test scores based on question weightage, average
capability.
response time, and average difficulty level of the tasks at-
tempted. This change of raw question-level interaction data
J. Model Description and Experimental Configuration
into meaningful test-level performance indicators makes it
The integrated system consolidates rule-based logic and
possibletotrackdevelopmentaltrendsacrossdifferentsessions
machine learning models to facilitate adaptive assessment
consistently.
and predictive analysis. To capture the various non-linear
To make progress visualization accurate, the system per-
interdependencies in the data, the main predictive element of
forms temporal aggregation of test-level metrics, thus, each
the system is built employing a Random Forest Regressor,
child’s performance trajectory is mapped over time. The
which was chosen to handle small-to-medium-sized datasets
weighted scoring mechanism makes sure that the higher-
with high robustness. A model is designed to predict a child’s
importance questions contribute proportionally more to the
future performance score, weighted average, based on the
final performance metric, thereby increasing the diagnostic
previous assessment data.
sensitivity. As a result, they generate a multidimensional per-
The features fed into the regression model are: (i) the
formance profile that enables fine-grained analysis of speech
weighted score that is a function of the number of correct
and language progression.
answers, the difficulty factor, and the response time penalty,
Besides descriptive analytics, the Progress Tracker has a
(ii)averageresponsetimepertest,(iii)averagedifficultylevel
layer of predictive modeling to forecast future assessment
of the test items, and (iv) test sequence index to indicate the
outcomes. For the next test weighted performance score pre-
order of the test. The output variable is the weighted score
diction, a Random Forest Regressor, using Scikit-learn, is the
the model predicts for the next test-taking session. Scikit-
machine learning model of choice. The model takes multiple
learn library was used in implementing the Random Forest
input features derived from past performance, i.e., historical
modelwiththenumberofestimatorssetto100andthedefault
weighted scores, average response time, past test difficulty
impurity-based splitting criteria. The parameters were chosen
levels, and a sequential test index representing progression
so that the prediction accuracy and the computational power
order.
are both used efficiently.
The model’s output is the anticipated weighted score for
The evaluation part of the experiment used a dataset con-
the upcoming assessment, thus, enabling therapy planning
sisting of about 1,200 question-level records, which were
in advance and adaptive intervention strategies. This pre-
aggregated into 240 test-level samples from 40 children,
diction ability is what actually empowers the system to be
each going through six assessment sessions. The dataset was
an intelligent clinical decision-support system and not only
split into training and testing sets using an 80:20 train–test
a monitoring tool that is passively used. It helps therapists
split. Mean Absolute Error (MAE) and the coefficient of
anticipate learning trends and dynamically adjust assessment
determination (R2) metrics were used to evaluate the model’s
difficulty and therapy focus.
performance. Besides machine learning-based prediction, a
I. Age Group Recommender rule-based Age Group Recommender was created to change
The Age Group Recommender module aims at deliver- the difficulty of the test based on the most recent perfor-
ing performance-driven adaptive training recommendations. mance trend. This recommender obtains extremely reliable
It ensures that a child’s assessment level is based on the clinicalrecommendationsbyapplyingdeterministicthresholds
observed learning ability rather than biological age only. This onweightedscoresoverthelastthreeassessmentstogenerate
module is made of Python with rule-based decision logic clinically interpretable recommendations
that helps in giving clinically reliable recommendations. The
IV. EXPERIMENTSANDDATASETUSED
system is based on the idea that kids can show different
A. Assessment Question Bank and Age-Band Mapping
rates of developmental progression and thus strict age-based
classification can lead to either situations where children are The evaluation framework of the newly planned system
under-challenged or over-challenged. is very much in line with the clinical standards and it is
The module takes the last three completed assessment organized around an age-banded, clinically validated question
sessions of a child as the main input window for its adaptive bank for the assessment of developmental ages. The question
979-8-3315-5519-1/26/$31.00 ©2026 IEEE 1591
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore. Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
TABLE I: Sample Question-Level Dataset (Before Aggrega-
sets correspond to developmental stages of children and are
tion)
derived from standardized language milestones which are
typically used in pediatric speech and language pathology.
ChildID TestID QNo Score Weight RT(ms)
Different sets of questions have been prepared for children c1 t1 q1 1 0.5 92
between 0 and 3 years and those between 3 and 6 years, c1 t1 q2 0 0.5 138
with additional detailed subdivisions for monthly and yearly c1 t1 q3 0 0.5 89
developmental stages. In every age band, the tasks include c1 t1 q4 1 0.5 169
both receptive language abilities (for example recognizing c1 t1 q5 1 2.0 31
one’s name, identifying objects, obeying commands, and un- Purpose: This table represents the raw response data collected for
each question in a test, including correctness, difficulty level, and
derstanding concepts) and expressive language abilities (for
response time obtained from assessment logs.
example vocal imitation, naming, sentence formation, and
spontaneous speech). Hence, the age-wise distribution of the
tasks ensures that the assessment tasks are very tightly linked weighted performance score. This transformation converts
to the linguistic milestones that are expected at each stage of rawinteractiondataintostructuredlearningindicatorssuitable
early childhood development. for machine learning–based progress modeling.
Forpredictivemodeling,thetargetvariableY wasdefined
B. Progress Tracker: Dataset, Feature Engineering, Model
astheweightedperformancescore,asitdirectlyrepresentsthe
Training, Prediction and Evaluation
child’sspeechproficiency.Theinput featuresX consistedof
The Progress Tracker module was developed and evalu-
average response time, average difficulty level, and the test
ated using a structured dataset derived from digital speech
sequence index, capturing fluency, cognitive challenge, and
assessment records collected during pilot clinical usage. The
learning progression respectively. This resulted in a total of
datasetconsistsofapproximately1,200question-levelassess-
240 test-level samples (40 children × 6 tests). The dataset
ment entries, obtained from 40 children, each undergoing
wasdividedusingan80:20train–testsplit,yielding192sam-
6 assessment sessions, with 5 questions per test session.
plesfortrainingand48samplesfortesting.ARandomForest
This configuration provides adequate representation across
Regressorwasselectedduetoitsrobustnessagainstoverfitting
multiple age bands and varying language proficiency levels.
and its ability to learn nonlinear performance transitions from
The raw question-level data include response correctness, re-
moderate-sized clinical datasets.
sponsetime,anddifficultylevelforeachitem,asillustratedin
Model performance was evaluated using the Mean Abso-
Table I. These fine-grained records were subsequently aggre-
lute Error (MAE) metric, computed as:
gated through feature engineering to generate structured test-
levelperformanceparameters,whichformthefinalmachine 1 (cid:88) n
MAE = |y −yˆ| (4)
learning training dataset, as shown in Table II. This hierar- n i i
chical transformation enables consistent longitudinal progress i=1
analysis. wherey representstheactualweightedscoreandyˆ denotes
i i
Foreachtestsession,fourprimaryfeatureswerecomputed: the predicted score. The trained model achieved an MAE
weighted score, average response time, average difficulty of approximately 0.21, indicating a low average prediction
level,andtestsequenceindex.Theweightedscorerepresents error on the normalized performance scale. After validation,
the child’s overall performance during an assessment and is the model was retrained using the full dataset and deployed
computed using the following equation: for real-time inference. For each child, the system extracts
the most recent test parameters and predicts the expected
weighted score for the subsequent assessment session. The
Weighted Score=(Correctness×Difficulty Weight)
(1) results are visualized using a progress graph, where historical
−Response Time Penalty
performanceisplottedasacontinuouscurveandthepredicted
The difficulty weights are assigned as: future score is displayed as a projected point. This enables
therapists to detect early learning stagnation and dynamically
Easy=0.5 Medium=1, Hard=2.0 (2) adapt intervention strategies using predictive, data-driven in-
sights.
The response time penalty is computed as:
V. RESULTSANDDISCUSSIONS
The effectiveness of the newly introduced system for mon-
Response Time Penalty=0.1×Response Time (3)
itoring progress through the test-level dataset was measured.
Correct responses to higher-difficulty questions contribute The dataset was derived from verified assessment records that
more significantly to the final score, while slower responses involved the pilot clinical usage of the system. It contained
introduce a proportional penalty, thereby capturing both accu- about 1,200 question-level entries which were converted by
racy and fluency. The weighted values are averaged across all feature engineering into 240 test-level records that referred
five questions within a test to obtain a normalized test-level to 40 children with 6 assessment sessions for each child.
979-8-3315-5519-1/26/$31.00 ©2026 IEEE 1592
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore. Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
| TABLE | II: Aggregated |     | Test-Level |     | Dataset | (Used | for ML |     |     |     |     |     |     |     |     |
| ----- | -------------- | --- | ---------- | --- | ------- | ----- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
Training)
| ChildID    | TestNo            |            | WeightedScore |           | AvgRT(ms)  |                 | AvgDiff. |           |                |         |                  |        |               |          |             |
| ---------- | ----------------- | ---------- | ------------- | --------- | ---------- | --------------- | -------- | --------- | -------------- | ------- | ---------------- | ------ | ------------- | -------- | ----------- |
| c1         |                   | 1          | 0.75          |           | 103.8      |                 | 2.2      |           |                |         |                  |        |               |          |             |
| c1         |                   | 2          | 0.30          |           | 125.8      |                 | 3.0      |           |                |         |                  |        |               |          |             |
| c1         |                   | 3          | 0.33          |           | 79.0       |                 | 2.4      |           |                |         |                  |        |               |          |             |
| c1         |                   | 4          | 0.55          |           | 94.8       |                 | 3.0      |           |                |         |                  |        |               |          |             |
| c1         |                   | 5          | 0.85          |           | 103.2      |                 | 2.6      |           |                |         |                  |        |               |          |             |
| c1         |                   | 6          | 0.71          |           | 129.2      |                 | 1.4      |           |                |         |                  |        |               |          |             |
| Purpose:   | This table        | represents |               | the final | test-level | dataset         | used for |           |                |         |                  |        |               |          |             |
| Random     | Forest regression |            | training,     | where     | each       | row corresponds | to       |           |                |         |                  |        |               |          |             |
| a complete |                   | assessment | session       | after     | feature    | engineering.    |          |           |                |         |                  |        |               |          |             |
|            |                   |            |               |           |            |                 |          | Fig. 3:   | Progress       | Tracker |                  | Output | for Child     | c7:      | Actual vs   |
|            |                   |            |               |           |            |                 |          | Predicted | Weighted       | Scores  |                  |        |               |          |             |
|            |                   |            |               |           |            |                 |          | TABLE     | III: Practical |         | Interpretation   |        | of Prediction |          | Outcomes    |
|            |                   |            |               |           |            |                 |          | TestRange | ActualTrend    |         | PredictedOutcome |        |               | Clinical | Interpreta- |
tion
|     |     |     |     |     |     |     |     | T1–T5 | Decreasing |     |     | Lownextscore |     | Requires | easier inter- |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | ---------- | --- | --- | ------------ | --- | -------- | ------------- |
vention
|     |     |     |     |     |     |     |     | T1–T7 | Improving |     | Predicted10%growth |     |     | Therapy | plan is effec- |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --------- | --- | ------------------ | --- | --- | ------- | -------------- |
tive
|     |     |     |     |     |     |     |     | improvement, |     | thereby | demonstrating |     | its | capacity | to handle |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ------- | ------------- | --- | --- | -------- | --------- |
Fig. 2: Progress Tracker Output for Child c1: Actual vs non-linear learning behavior. The close match between the
Predicted Weighted Scores predictedcurveandtheactualscoresisevidencethatthemodel
|     |     |     |     |     |     |     |     | has effectively |     | learned | the | underlying | progression |     | pattern for |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ------- | --- | ---------- | ----------- | --- | ----------- |
this child.
| Random  | Forest      | Regressor | was           | instructed |          | by using | features |             |     |          |          |     |             |      |           |
| ------- | ----------- | --------- | ------------- | ---------- | -------- | -------- | -------- | ----------- | --- | -------- | -------- | --- | ----------- | ---- | --------- |
|         |             |           |               |            |          |          |          | A different |     | learning | behavior |     | can be seen | with | Child c7. |
| of past | performance |           | that included |            | weighted | score,   | average  |             |     |          |          |     |             |      |           |
AfterarelativelygoodstartingpointatTest1,theperformance
| response    | time,       | average | difficulty | level,       | test | sequence | index.      |             |            |          |             |        |      |                |            |
| ----------- | ----------- | ------- | ---------- | ------------ | ---- | -------- | ----------- | ----------- | ---------- | -------- | ----------- | ------ | ---- | -------------- | ---------- |
|             |             |         |            |              |      |          |             | sharply     | declines   | in Tests | 2           | and 3. | From | Test 4 onward, | the        |
| The model’s | performance |         |            | was assessed |      | with     | the help of |             |            |          |             |        |      |                |            |
|             |             |         |            |              |      |          |             | child shows | continuous |          | improvement |        | till | Test 5         | and then a |
standard regression measures prior to its implementation for slight drop at Test 6. The predicted scores are very close
| real-time | score      | prediction. |        |              |        |          |         |                |            |       |              |      |              |                  |            |
| --------- | ---------- | ----------- | ------ | ------------ | ------ | -------- | ------- | -------------- | ---------- | ----- | ------------ | ---- | ------------ | ---------------- | ---------- |
|           |            |             |        |              |        |          |         | to this        | ups and    | downs | progression  |      | pattern.     | This             | outcome is |
|           |            |             |        |              |        |          |         | a confirmation |            | that  | the model    | does | not tend     | to only          | mono-      |
| A. Visual | Progress   | Analysis    |        | Using Sample |        | Children |         |                |            |       |              |      |              |                  |            |
|           |            |             |        |              |        |          |         | tonically      | increasing |       | trends       | and  | can deal     | with performance |            |
| In order  | to provide |             | visual | evidence     | of the | progress | tracker |                |            |       |              |      |              |                  |            |
|           |            |             |        |              |        |          |         | fluctuations   | as         | well  | as temporary |      | regressions, | which,           | in fact,   |
and predictive model correctness, progress charts showing the arethemostcommontherapeuticlearningscenariosinthereal
| score trends | over | time | were | created | for two | typical | cases, i.e., |             |           |     |       |             |     |                |     |
| ------------ | ---- | ---- | ---- | ------- | ------- | ------- | ------------ | ----------- | --------- | --- | ----- | ----------- | --- | -------------- | --- |
|              |      |      |      |         |         |         |              | world. Such | instances |     | serve | as evidence | of  | the robustness | and |
Child c1 and Child c7. Fig. 2 demonstrates the progress trend clinicalrelevanceoftheproposedpredictiveProgressTracker.
| for Child       | c1, whereas |         | the corresponding |            |             | trend | for Child c7 |                 |     |       |            |     |     |     |     |
| --------------- | ----------- | ------- | ----------------- | ---------- | ----------- | ----- | ------------ | --------------- | --- | ----- | ---------- | --- | --- | --- | --- |
| is depicted     | in          | Fig. 3. | These             | figures    | exemplify   |       | not only the |                 |     |       |            |     |     |     |     |
|                 |             |         |                   |            |             |       |              | B. Quantitative |     | Model | Evaluation |     |     |     |     |
| actual weighted |             | scores  | of the            | historical | assessments |       | but also     |                 |     |       |            |     |     |     |     |
the predicted scores of the Random Forest regression model. The Random Forest Regressor was tested through a train–
The juxtaposition of actual and predicted trends serves as an test split strategy, which is the standard approach. Eighty
unmistakable visual confirmation of the system’s prediction percent of the samples were used for training and twenty
power. percent for testing the finalized dataset consisting of 240 test-
Child c1’s progress curve shows the performance dropping level assessment records. This division led to 192 samples
from Test 1 to Test 2 and then subsequently increasing from for training the model and 48 samples for an independent
Test 3 onward with a very obvious peak at Test 5. The performance evaluation. The features fed into the model
predicted trend almost mirrors the actual learning trajectory were average response time, average difficulty level, and test
for all six tests. The model manages to capture both the sequence index, whereas the output target was the weighted
initial drop in performance as well as the later phase of performance score.
|     |     |     |     |     |     | 979-8-3315-5519-1/26/$31.00 ©2026 IEEE |     |     |     |     |     |     |     |     | 1593 |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore.  Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
TABLEIV:ComparativePerformanceAnalysisofTraditional
| and Proposed       | Assessment |     | Methods         |     |                    |     |     |     |     |     |     |     |     |     |
| ------------------ | ---------- | --- | --------------- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Metric             |            |     | Traditional     |     | ProposedSystem     |     |     |     |     |     |     |     |     |     |
| AssessmentTime     |            |     | 20–30min        |     | 8–12min            |     |     |     |     |     |     |     |     |     |
| ScoringConsistency |            |     | Therapist-based |     | High(weightedscor- |     |     |     |     |     |     |     |     |     |
ing)
| ProgressTracking  |     |     | Manualnotes    |     | Automatedanalytics |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | --- | -------------- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PredictionSupport |     |     | Notavailable   |     | ML-basedprediction |     |     |     |     |     |     |     |     |     |
| AgeBandAdaptation |     |     | Manualdecision |     | Rule-based         |     |     |     |     |     |     |     |     |     |
adaptation
| DataStorage |     |     | Paperrecords |     | Securereal-timeDB |     |     |     |     |     |     |     |     |     |
| ----------- | --- | --- | ------------ | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
High(MAE≈0.21)
| Accuracy |     | (Trend | Moderate |     |     |     |     |     |     |     |     |     |     |     |
| -------- | --- | ------ | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Match)
| C. Accuracy                                           | of            | Weighted   | Scoring     | Mechanism        |          |             |         |              |     |           |       |              |     |               |
| ----------------------------------------------------- | ------------- | ---------- | ----------- | ---------------- | -------- | ----------- | ------- | ------------ | --- | --------- | ----- | ------------ | --- | ------------- |
| The                                                   | dependability |            | of the      | suggested        | weighted | scoring     |         |              |     |           |       |              |     |               |
| method                                                | was checked   |            | by the      | first comparison |          | of weighted |         |              |     |           |       |              |     |               |
|                                                       |               |            |             |                  |          |             | Fig.    | 4: Therapist |     | Dashboard | UI of | the deployed |     | mobile appli- |
| scorescreatedbythesystemandscoresassignedbytherapists |               |            |             |                  |          |             | cation. |              |     |           |       |              |     |               |
| during several                                        |               | assessment | sessions.   | In               | order to | measure the |         |              |     |           |       |              |     |               |
| similarity                                            | between       | the        | two scoring | methods,         | the      | Score Devi- |         |              |     |           |       |              |     |               |
ation Accuracy (SDA) was calculated for each test session. manualscoring,andhandwrittenprogressrecords,whichmay
| SDA indicates |     | the degree | of agreement |     | between | the score of |       |             |     |             |     |            |     |              |
| ------------- | --- | ---------- | ------------ | --- | ------- | ------------ | ----- | ----------- | --- | ----------- | --- | ---------- | --- | ------------ |
|               |     |            |              |     |         |              | cause | variability |     | and prolong | the | assessment |     | time. On the |
the system and the score of the therapist, and the agreement other hand, the proposed system makes a dramatic cut in the
| is normalized | by  | the | maximum | possible | score. It | is given as: |     |     |     |     |     |     |     |     |
| ------------- | --- | --- | ------- | -------- | --------- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
assessmenttimeasitdeliversthetestelectronically,calculates
thescoreautomatically,andallowseasyaccesstothehistorical
|     |     |        | |S  | −S     | |         |     |      |          |     |     |     |     |     |     |
| --- | --- | ------ | --- | ------ | --------- | --- | ---- | -------- | --- | --- | --- | --- | --- | --- |
|     |     | SDA=1− |     | system | therapist | (5) | data | at once. |     |     |     |     |     |     |
S
|     |     |     |     | max |     |     | Besides,thetraditionalassessmentmethodsdonothavethe |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
Values closer to 1 signal very good agreement, whereas capabilities of prediction and adaptation, while the proposed
| values near | 0   | point | to significant | deviation. | Evaluations | of  |        |          |     |         |                |     |          |            |
| ----------- | --- | ----- | -------------- | ---------- | ----------- | --- | ------ | -------- | --- | ------- | -------------- | --- | -------- | ---------- |
|             |     |       |                |            |             |     | method | includes |     | machine | learning-based |     | progress | prediction |
all sessions revealed high SDA values throughout, thus the and rule-based age group adaptation. The use of standardized
weighted score - calculated by correctness, difficulty weight- weighted scoring enhances scoring consistency and allows
ing, and response time penalty - is in line with the clinical quantitativetrendanalysisoverdifferentsessions.WithaMean
judgment made by therapists during manual evaluation. Absolute Error of about 0.21, the proposed system is more
| As an | additional | measure | of  | scoring | reliability, | the Pearson |     |           |     |          |          |        |      |            |
| ----- | ---------- | ------- | --- | ------- | ------------ | ----------- | --- | --------- | --- | -------- | -------- | ------ | ---- | ---------- |
|       |            |         |     |         |              |             | in  | line with | the | observed | learning | trends | than | the manual |
correlation coefficient (r) was calculated between therapist tracking.Thesefindingsserveasaquantitativeandqualitative
scores and system-generated weighted scores for the whole witness to the fact that the proposed solution is far more
dataset. The correlation was estimated as: efficient,consistent,andprovidesbetteranalyticalsupportthan
|     |     |     |     |     |     |     | the | traditional | assessment |     | workflows. |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ---------- | --- | ---------- | --- | --- | --- |
(cid:80)
(x−x¯)(y−y¯)
|     |     | r =               |         |                  |     | (6) |     |        |            |     |     |     |     |     |
| --- | --- | ----------------- | ------- | ---------------- | --- | --- | --- | ------ | ---------- | --- | --- | --- | --- | --- |
|     |     | (cid:112)(cid:80) | (x−x¯)2 | (cid:80) (y−y¯)2 |     |     | E.  | System | Deployment |     |     |     |     |     |
where x are the weighted scores and yare the therapist- The proposed Digital Speech–Language Assessment App
assigned scores. The correlation that was found to be strongly was made available as a cross-platform mobile application
positivesuggeststhattheweightedscoringmethodmostofthe built with Flutter and Firebase services. The system is aimed
time reflects the scoring trends of therapists. Such an agree- at real-time clinical usage, thus therapists can log in securely,
|             |     |          |          |         |                   |     | manage |     | patient | records, | administer | assessments, |     | and check |
| ----------- | --- | -------- | -------- | ------- | ----------------- | --- | ------ | --- | ------- | -------- | ---------- | ------------ | --- | --------- |
| ment serves | as  | evidence | that the | scoring | method introduced |     | is     |     |         |          |            |              |     |           |
notonlyclinicallymeaningfulandcomputationallyreliableby the progress through the graphs. The working model that is
which it is possible to accomplish accurate progress tracking released offers a smooth, responsive interface that is capable
and to detect performance variations across test sessions in a ofbothtabletandmobiledevices,thustheusabilityisensured
| more sensitive |     | manner.     |     |          |     |     | in     | different | clinical      | environments. |               |           |        |               |
| -------------- | --- | ----------- | --- | -------- | --- | --- | ------ | --------- | ------------- | ------------- | ------------- | --------- | ------ | ------------- |
|                |     |             |     |          |     |     | Figure |           | 4 illustrates |               | the therapist | dashboard |        | that provides |
| D. Comparative |     | Performance |     | Analysis |     |     |        |           |               |               |               |           |        |               |
|                |     |             |     |          |     |     | the    | main      | navigation    | hub           | for accessing |           | speech | assessments,  |
A comparative performance analysis was done to measure patient lists, therapist profile management, and quick notes.
theefficiencyofthenewlyproposeddigitalassessmentsystem The interface is of a clean, minimal design with the most
ascomparedtotheusualmanualspeech–languageassessment logical and simplest components to help the user through
practices. From Table IV, it can be seen that conventional the routine without any extra effort of the brain. Figure 5
assessments are mainly dependent on therapist experience, presentstheage-bandselectionscreentobeusedforinitiating
|     |     |     |     |     | 979-8-3315-5519-1/26/$31.00 ©2026 IEEE |     |     |     |     |     |     |     |     | 1594 |
| --- | --- | --- | --- | --- | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore.  Restrictions apply.

Proceedings of the 7th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI-2026)
IEEE Xplore Part Number: CFP26US4-ART; ISBN: 979-8-3315-5519-1
[2] Ribas,Dayana,MiguelA.Pastor,AntonioMiguel,DavidMart´ınez,Al-
fonsoOrtega,andEduardoLleida.”Automaticvoicedisorderdetection
|     |     |     |     |     |     |     |     | using | self-supervised |     | representations.” | Ieee | Access | 11 (2023): | 14915- |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --------------- | --- | ----------------- | ---- | ------ | ---------- | ------ |
14927.
[3] Blake,Ashley,EwaDabrowska,andNickRiches.”Exploringcognitive
predictorsoflanguageinchildrenwithdevelopmentallanguagedisorder:
TheroleofnonverbalIQ,workingmemory,implicitstatisticallearning,
|     |     |     |     |     |     |     |     | and speed | of  | automatization.” |     | Journal | of Communication |     | Disorders |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | --- | ---------------- | --- | ------- | ---------------- | --- | --------- |
(2025):106541.
|     |     |     |     |     |     |     |     | [4] Dhahbi, | Sami,   | Nasir Saleem, |             | Sami Bourouis, | Mouhebeddine |                    | Berrima,   |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ------- | ------------- | ----------- | -------------- | ------------ | ------------------ | ---------- |
|     |     |     |     |     |     |     |     | and Elena   | Verdu.  | ”End-to-end   |             | neural         | automatic    | speech recognition |            |
|     |     |     |     |     |     |     |     | system      | for low | resource      | languages.” | Egyptian       | Informatics  |                    | Journal 29 |
(2025):100615.
|     |     |     |     |     |     |     |     | [5] Getman,  | Yaroslav, |             | Nhan         | Phan, Ragheb |                 | Al-Ghezi, | Ekaterina |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------ | --------- | ----------- | ------------ | ------------ | --------------- | --------- | --------- |
|     |     |     |     |     |     |     |     | Voskoboinik, |           | Mittul      | Singh,       | Tamas Grosz, | Mikko           | Kurimo    | et al.    |
|     |     |     |     |     |     |     |     | ”Developing  | an        | ai-assisted | low-resource |              | spoken language | learning  | app       |
forchildren.”IEEEAccess11(2023):86025-86037.
[6] Ng,Si-Ioi,CymieWing-YeeNg,JiaruiWang,andTanLee.”Automatic
|     |     |     |     |     |     |     |     | detection  | of speech | sound | disorder     | in Cantonese-speaking |                |     | pre-school |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --------- | ----- | ------------ | --------------------- | -------------- | --- | ---------- |
|     |     |     |     |     |     |     |     | children.” | IEEE/ACM  |       | Transactions | on                    | Audio, Speech, | and | Language   |
Processing(2024).
Fig.5:Age-bandselectioninterfaceforinitiatingassessments.
|     |     |     |     |     |     |     |     | [7] da Silva, | Gabriel | Candido, |                | Rodrigo         | Lins Rodrigues, | Ame´rico      | N.        |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ------- | -------- | -------------- | --------------- | --------------- | ------------- | --------- |
|     |     |     |     |     |     |     |     | Amorim,       | Lieny   | Jeon,    | Emilia         | XS Albuquerque, |                 | Vanessa       | C. Silva, |
|     |     |     |     |     |     |     |     | Vin´ıcius     | F. da   | Silva et | al. ”Assessing | Reading         | Fluency         | in Elementary |           |
assessments. This interface allows the therapist to access the Grades: A Machine Learning Approach.” Computers and Education:
ArtificialIntelligence(2025):100411.
| structured | test categories |     | such | as 0–1 | years, | 1–2 | years,2–3 |           |       |         |             |         |     |                         |     |
| ---------- | --------------- | --- | ---- | ------ | ------ | --- | --------- | --------- | ----- | ------- | ----------- | ------- | --- | ----------------------- | --- |
|            |                 |     |      |        |        |     |           | [8] Jing, | Wang. | ”Speech | recognition | sensors | and | artificial intelligence |     |
years, 3-4 years, 4-5 years, and 5-6 years, each containing automatic evaluation application in English oral correction system.”
tasks appropriate to the developmental level. These UI com- Measurement:Sensors32(2024):101070.
ponents are a demonstration of the deployed system being [9] Sabu,Kamini,andPreetiRao.”Predictingchildren’sperceivedreading
proficiencywithprosodymodeling.”ComputerSpeech&Language84
| ready for | speech–language |     | evaluation |     | in the | real world. |     | (2024):101557. |              |       |      |        |          |        |            |
| --------- | --------------- | --- | ---------- | --- | ------ | ----------- | --- | -------------- | ------------ | ----- | ---- | ------ | -------- | ------ | ---------- |
|           |                 |     |            |     |        |             |     | [10] Ma,       | Rao, Mengjie | Qian, | Mark | Gales, | and Kate | Knill. | ”Asr error |
|           |                 | VI. | CONCLUSION |     |        |             |     |                |              |       |      |        |          |        |            |
correctionusinglargelanguagemodels.”IEEETransactionsonAudio,
This research introduced a comprehensive digital platform SpeechandLanguageProcessing(2025).
|     |     |     |     |     |     |     |     | [11] Qin, | Saige, Min | Liu, | Tongquan | Wei, | and Qiaoyun | Liu. | ”Language |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ---------- | ---- | -------- | ---- | ----------- | ---- | --------- |
for pediatric speech–language assessment that features secure proficiencyassessmentofautisticchildrenusinglargelanguagemodels.”
therapist access, age-adaptive evaluation, weighted scoring, ExpertSystemswithApplications(2025):129712.
|     |     |     |     |     |     |     |     | [12] Sankaran,Anitha,andLakshmiSuthaKumar.”Advancesinautomated |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
and data-driven progress monitoring all integrated within voice pathology detection: A comprehensive review of speech signal
a single mobile application. By digitizing standardized as- analysistechniques.”IEEEAccess(2024).
sessment workflows and facilitating bilingual evaluation, the [13] Latiff, Nurul Mu’azzah Abdul, Fahad Taha Al-Dhief, Nurul Fariesya
|        |               |           |     |                |     |              |     | Suhaila | Md Sazihan, |     | Marina Mat | Baki, | Nik Noordini | Nik Abd | Malik, |
| ------ | ------------- | --------- | --- | -------------- | --- | ------------ | --- | ------- | ----------- | --- | ---------- | ----- | ------------ | ------- | ------ |
| system | benefits from | increased |     | accessibility, |     | consistency, | and |         |             |     |            |       |              |         |        |
MusatafaAbbasAbboodAlbadr,andAliHashimAbbas.”Voicepathol-
clinicalefficiency,whilestillallowingtherapiststheflexibility ogydetectionusingmachinelearningalgorithmsbasedondifferentvoice
databases.”ResultsinEngineering25(2025):103937.
| of manual | score  | validation. | The    | newly | introduced   |     | weighted |                                                                  |     |     |     |     |     |     |     |
| --------- | ------ | ----------- | ------ | ----- | ------------ | --- | -------- | ---------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|           |        |             |        |       |              |     |          | [14] Kadiri,SudarsanaReddy,FarhadJavanmardi,andPaavoAlku.”Inves- |     |     |     |     |     |     |     |
| scoring   | method | showed      | a high | level | of agreement |     | with the |                                                                  |     |     |     |     |     |     |     |
tigationofself-supervisedpre-trainedmodelsforclassificationofvoice
| therapist | evaluations, | thus, | confirming |     | its clinical |     | reliability. |     |     |     |     |     |     |     |     |
| --------- | ------------ | ----- | ---------- | --- | ------------ | --- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
qualityfromspeechandnecksurfaceaccelerometersignals.”Computer
Speech&Language83(2024):101550.
Moreover,theProgressTrackeralongwiththeRandomForest
| regression     | model  | was          | able to  | capture | both   | the improvement |       |     |     |     |     |     |     |     |     |
| -------------- | ------ | ------------ | -------- | ------- | ------ | --------------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| and regression | trends | effectively, |          | with    | a Mean | Absolute        | Error |     |     |     |     |     |     |     |     |
| of around      | 0.21,  | thus,        | allowing | the     | early  | identification  | of    |     |     |     |     |     |     |     |     |
stagnationthroughaccurateperformanceforecasting.Therule-
basedAgeGroupRecommenderalsoplayedanimportantrole
| in adaptive | assessment |     | by providing |     | guidance | for | develop- |     |     |     |     |     |     |     |     |
| ----------- | ---------- | --- | ------------ | --- | -------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
mentallyappropriatetestselection.Thecross-platformmobile
| application     | deployment |            | serves      | as a | practical     | demonstration |          |     |     |     |     |     |     |     |     |
| --------------- | ---------- | ---------- | ----------- | ---- | ------------- | ------------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
| of the proposed |            | approach’s | feasibility |      | in real-world |               | clinical |     |     |     |     |     |     |     |     |
| settings.       | Subsequent | research   |             | aims | to broaden    | the           | dataset, |     |     |     |     |     |     |     |     |
integratemoredetailedbehavioralandphoneme-levelfeatures,
| and fine-tune    | the      | predictive | models   |     | to enhance | accuracy | and |     |     |     |     |     |     |     |     |
| ---------------- | -------- | ---------- | -------- | --- | ---------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| bolster clinical | decision |            | support. |     |            |          |     |     |     |     |     |     |     |     |     |
REFERENCES
| [1] Nnamoko, | Nonso,      | Themis        | Karaminis, |            | Jack Procter, | Joseph | Barrow-         |     |     |     |     |     |     |     |     |
| ------------ | ----------- | ------------- | ---------- | ---------- | ------------- | ------ | --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| clough,      | and Ioannis | Korkontzelos. |            | ”Automatic | language      |        | ability assess- |     |     |     |     |     |     |     |     |
mentmethodbasedonnaturallanguageprocessing.”NaturalLanguage
ProcessingJournal8(2024):100094.
|     |     |     |     |     |     | 979-8-3315-5519-1/26/$31.00 ©2026 IEEE |     |     |     |     |     |     |     | 1595 |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ---- | --- |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:12 UTC from IEEE Xplore.  Restrictions apply.