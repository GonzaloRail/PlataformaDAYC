AI-HEAT: A Clinical Decision Support System for
pediatrics febrile conditions
Abraham Bautista-Castillo Rocio A. Padilla-Medina Jessica Nguyen
Computational Biomedicine Lab Computational Biomedicine Lab Division of Rheumatology
University of Houston University of Houston Baylor College of Medicine
Houston, TX, USA Houston, TX, USA Houston, TX, USA
Chisato Shimizu Adriana H. Tremoulet Jane C. Burns
Department of Pediatrics Department of Pediatrics Department of Pediatrics
Rady Children’s Hospital, San Diego Rady Children’s Hospital, San Diego Rady Children’s Hospital, San Diego
University of California San Diego University of California San Diego University of California San Diego
La Jolla, CA, USA La Jolla, CA, USA La Jolla, CA, USA
Ananth V. Annapragada Tiphanie P. Vogel Ioannis A. Kakadiaris
Department of Radiology Division of Rheumatology Computational Biomedicine Lab
Baylor College of Medicine Baylor College of Medicine University of Houston
Texas Children’s Hospital Texas Children’s Hospital Houston, TX, USA
Houston, TX, USA Houston, TX, USA ikakadia@central.uh.edu
Abstract—In recent years, several diagnostic challenges have I. INTRODUCTION
developed due to the COVID-19 pandemic, including the post-
infectious sequelae multisystem inflammatory syndrome in chil- In April 2020, children began to be hospitalized for fever
dren (MIS-C). This syndrome shares several clinical features andmultisysteminflammation[3,4,5,6],andoneofthemost
with other entities, such as Kawasaki disease (KD) and endemic critical clinical challenges to arise during the pandemic ap-
typhus,amongotherfebrilediseases.Endemictyphus,ormurine
peared:multisysteminflammatorysyndromeinchildren(MIS-
typhus,isanacuteinfectiontreatedmuchdifferentlythanMIS-C
C). In May 2020, the Centers for Disease Control and Pre-
and KD. Early diagnosis and appropriate treatment are crucial
to a favorable outcome for patients with these disorders. To vention (CDC) published a case definition for this syndrome
address these challenges, a Clinical Decision Support System [7], where the clinical similarity with other febrile diseases
(CDSS)designedtosupportthedecision-makingofmedicalteams was already evident. Fever, rash, conjunctivitis, oromucosal
can be implemented to differentiate between these disorders.
changes,abdominalpain,vomiting,diarrhea,myocarditis,and
We developed and evaluated a CDSS based on a Triplet Loss
hematological abnormalities are just some of the symptoms
SiameseNetworktodistinguishbetweenpatientspresentingwith
clinicallysimilarfebrileillnesses,KD,MIS-C,ortyphus.Weused frequently found in MIS-C [3, 4, 5, 6, 7, 8] and that can be
eight clinical and laboratory features typically available within found in Kawasaki Disease (KD) [9], toxic shock syndrome
six hours of presentation. The performance assessment for AI- (TSS)[10],andtyphus[11,12],generatingaclinicalchallenge
HEAT, Logistic Regression, Support Vector Machine, XGBoost, to distinguish MIS-C from these pathologies.
and the TabPFN machine learning models was performed by
computing Balanced Accuracy. AI-HEAT is a CDSS capable of To address other high-level clinical challenges, computer
obtainingperformancesimilartoastate-of-the-artTransformer- systems designed to support the decision-making of medical
typedeeplearningmodelsuchasTabPFN,withadvantagessuch teams, such as Clinical Decision Support Systems (CDSS),
as being almost a thousand times smaller.
have been implemented. These computing systems have been
IndexTerms—ArtificialIntelligence,ClinicalDecisionSupport implemented in a wide range of clinical challenges, such as
System, Deep Learning, Endemic Typhus, Kawasaki, MIS-C
antibioticmanagement[13],heartdiseaseprediction[14],and
even cancer detection [15], so the implementation of a CDSS
capable of distinguishing between KD, MIS-C, typhus among This work was partly supported by NIH grant number R33HD105593.
Abraham Bautista-Castillo is also supported by the National Council of other non-specific febrile illnesses would be of significant
Science and Technology of Mexico, scholarship number 739528. Icons impact for medical teams in the emergency department for
and diagrams shown in this work were obtained and created through free
timely-decision making which is essential for better outcomes
licensesfromIcons8[1]andDraw.io[2],respectively.Anyopinions,findings,
conclusions, or recommendations expressed in this material are those of the in these febrile conditions.
authors.TheydonotnecessarilyreflecttheviewsoftheNIH,otherfunders, The main contributions of this paper are:
the position, or the policy of the Government, and no official endorsement
shouldbeinferred. • Developed and evaluated an AI-based CDSS for distin-
36731901.4202.06626IHB/9011.01
:IOD
|
EEEI
4202©
00.13$/42/2-5515-3053-8-979
|
)IHB(
scitamrofnI
htlaeH
dna
lacidemoiB
no
ecnerefnoC
lanoitanretnI
SBME
EEEI
4202
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore. Restrictions apply.

| guishing      |               | between       | KD, MIS-C,    |                | typhus,      | and other    | non-     |     |     |     |     |     |     |     |
| ------------- | ------------- | ------------- | ------------- | -------------- | ------------ | ------------ | -------- | --- | --- | --- | --- | --- | --- | --- |
| specific      | febrile       | illnesses.    |               |                |              |              |          |     |     |     |     |     |     |     |
| • Developed   |               | and evaluated |               | a new          | downsampling |              | approach |     |     |     |     |     |     |     |
| to            | face the      | problems      | of small      | imbalanced     |              | datasets.    |          |     |     |     |     |     |     |     |
|               |               | II.           | BACKGROUND    |                |              |              |          |     |     |     |     |     |     |     |
| CDSSs         | have          | been          | used during   | the            | COVID-19     |              | pandemic |     |     |     |     |     |     |     |
| as support    | tools         | for           | the prognosis |                | of disease   | severity     | [16]     |     |     |     |     |     |     |     |
| or predicting |               | mortality     | [17], and     | most           | of           | them have    | focused  |     |     |     |     |     |     |     |
| only on       | MIS-C-related |               | clinical      | challenges     |              | [18, 19].    | One of   |     |     |     |     |     |     |     |
| the only      | CDSS          | that has      | extended      | its            | approach     | beyond       | MIS-     |     |     |     |     |     |     |     |
| C prediction  | is            | the one       | presented     | by             | Lam          | et al. [20], | where    |     |     |     |     |     |     |     |
| they built    | a two-stage   |               | model         | of feedforward |              | neural       | networks |     |     |     |     |     |     |     |
intended to differentiate between MIS-C, KD, and children Fig.1. Elbowmethodappliedtogettheoptimalnumberofclusters(K)for
with non-specific febrile illnesses, considering the importance theK-meansalgorithmusingdistortionasthemetric.
oftimelypredictionusingfeaturesobtainedwithinthefirst24
hours.
| This              | research    | can be  | considered   | an         | extension | of               | Bautista- |     |     |     |     |     |     |     |
| ----------------- | ----------- | ------- | ------------ | ---------- | --------- | ---------------- | --------- | --- | --- | --- | --- | --- | --- | --- |
| Castillo,         | et al.      | work    | [21], which, | to         | our       | knowledge,       | is the    |     |     |     |     |     |     |     |
| only one          | considering |         | endemic      | typhus     | as        | one of           | the pos-  |     |     |     |     |     |     |     |
| sible overlapping |             | febrile | diseases     | for        | MIS-C     | and              | that also |     |     |     |     |     |     |     |
| incorporates      | a           | score   | that can     | be         | used      | in the Emergency |           |     |     |     |     |     |     |     |
| Department        | (ED)        | without | using        | electronic |           | devices          | and only  |     |     |     |     |     |     |     |
usingfeaturesobtainedduringthefirstsixhoursafterpatient’s
| arrival.   | AI-HEAT   | incorporates |            | KD             | and children |                     | with non- |     |     |     |     |     |     |     |
| ---------- | --------- | ------------ | ---------- | -------------- | ------------ | ------------------- | --------- | --- | --- | --- | --- | --- | --- | --- |
| specific   | febrile   | illnesses    | to be      | distinguished, |              | being               | the first |     |     |     |     |     |     |     |
| CDSS that  | considers | these        | febrile    | conditions     |              | only using          | eight     |     |     |     |     |     |     |     |
| features   | obtained  | during       | the        | first six      | hours        | after Emergency     |           |     |     |     |     |     |     |     |
| Department | arrival   | and          | predicting | the            | four         | febrile conditions. |           |     |     |     |     |     |     |     |
III. METHODS Fig. 2. Informative Samples Selection method using k-means and the
Euclideandistancetoselectthosepatientsthatarefurtherfromthecentroid
becausetheypossessthelesscommonpatternwithinthatclusterandaremore
| This | section | will discuss | the | methods | used | to  | create AI- |     |     |     |     |     |     |     |
| ---- | ------- | ------------ | --- | ------- | ---- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
informativetoourmodel.Allpatientsbelongtothesamemajorityclass.
HEAT,aCDSSbasedonaTripletLossSiameseNetworkthat
distinguishesbetweenpatientswithKawasaki,MIS-C,Typhus,
| and non-specific |     | febrile | illnesses. |     |     |     |     |                |     |         |           |        |     |     |
| ---------------- | --- | ------- | ---------- | --- | --- | --- | --- | -------------- | --- | ------- | --------- | ------ | --- | --- |
|                  |     |         |            |     |     |     |     | C. Informative |     | Samples | Selection | Method |     |     |
A. Data Imputation
Toaddressthedatasetclassimbalanceproblem,wepropose
| Multiple      | Imputation |     | by Chained |         | Equations | (MICE)  | [22]       |              |                  |              |     |              |                      |        |
| ------------- | ---------- | --- | ---------- | ------- | --------- | ------- | ---------- | ------------ | ---------------- | ------------ | --- | ------------ | -------------------- | ------ |
|               |            |     |            |         |           |         |            | an algorithm | for              | downsampling |     | the majority | classes.             | First, |
| with LightGBM |            | was | used to    | address | the       | missing | values for |              |                  |              |     |              |                      |        |
|               |            |     |            |         |           |         |            | we perform   | a bi-dimensional |              |     | projection   | of all patients from | a      |
dataimputation.Thisisaniterativestatisticaltechniquewhere
majorityclassthatwillbeusedfortraininginthetrialusingt-
valuesareimputedseveraltimesandperformedchainedusing
distributedStochasticNeighborEmbedding(t-SNE).Next,we
| LightGBM | to  | perform | the predictions |     | in every | iteration. | The |     |     |     |     |     |     |     |
| -------- | --- | ------- | --------------- | --- | -------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
usedk-meansasourclusteringalgorithm,definingthenumber
| Python | package | implemented |     | in this | work | can be | found | in          |     |         |       |            |          |       |
| ------ | ------- | ----------- | --- | ------- | ---- | ------ | ----- | ----------- | --- | ------- | ----- | ---------- | -------- | ----- |
|        |         |             |     |         |      |        |       | of clusters | (K) | to find | using | the ”elbow | method,” | where |
[23].
|           |          |     |     |     |     |     |     | we initialize      | k-means   |         | from      | one and iteratively | augment             | that  |
| --------- | -------- | --- | --- | --- | --- | --- | --- | ------------------ | --------- | ------- | --------- | ------------------- | ------------------- | ----- |
|           |          |     |     |     |     |     |     | number             | until the | sum     | of square | distances,          | or distortion       | stops |
| B. Cohort | Creation |     |     |     |     |     |     |                    |           |         |           |                     |                     |       |
|           |          |     |     |     |     |     |     | being considerably |           | smaller | for       | the next            | iteration, compared | to    |
To avoid biases during the training and testing phases, we the previous one to find the optimal number of clusters (Fig.
created four cohorts, considering three characteristics: age, 1). Finally, we compute the Euclidean distance of all points
sex, and the patient’s condition, to obtain the most homo- from the cluster’s centroid to which they belong to determine
geneous distribution of patients possible in each cohort. This which points are closer to the centroid and which are further
processcanalsobereferredtoasa4-setcross-validationwith from it, keeping those that are further due to they possess the
matching conditions, where the matching conditions are the less common pattern within that cluster and, therefore, they
age, delimited in one-year intervals, the sex, and the patient’s will be more informative to our model (Fig. 2). This process
febrile condition. is iterative and is applied to all majority classes one at a time.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore.  Restrictions apply.

|     |     |     |     |     |     | Fig. 5. | AI-HEAT | diagram, | our deep | learning | model | consisting | of an |
| --- | --- | --- | --- | --- | --- | ------- | ------- | -------- | -------- | -------- | ----- | ---------- | ----- |
embeddingstageandaclassificationstage.
| Fig.3. | TripletLossSiameseNetworkrepresentation. |     |     |     |     |     |     |     |     |     |     |     |     |
| ------ | ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
TABLEI
DATASETFEATURES
|     |     |     |     |     |     | ID                     | Feature |     |     |                          | Description |     | DT  |
| --- | --- | --- | --- | --- | --- | ---------------------- | ------- | --- | --- | ------------------------ | ----------- | --- | --- |
|     |     |     |     |     |     | ALC:AbsoluteLymphocyte |         |     |     | ALClaboratorytestwithin  |             |     |     |
|     |     |     |     |     |     | 1                      |         |     |     |                          |             |     | N   |
|     |     |     |     |     |     | Count(K/µL)            |         |     |     | sixhoursofpresentation   |             |     |     |
|     |     |     |     |     |     | ANC:AbsoluteNeutrophil |         |     |     | ANClaboratorytestwithin  |             |     |     |
|     |     |     |     |     |     | 2                      |         |     |     |                          |             |     | N   |
|     |     |     |     |     |     | Count(K/µL)            |         |     |     | sixhoursofpresentation   |             |     |     |
|     |     |     |     |     |     | 3 Age(years)           |         |     |     | Patient’sagewhenadmitted |             |     | N   |
|     |     |     |     |     |     | ALT:Alanine            |         |     |     | ALTlaboratorytestwithin  |             |     |     |
|     |     |     |     |     |     | 4                      |         |     |     |                          |             |     | N   |
|     |     |     |     |     |     | Aminotransaminase(U/L) |         |     |     | sixhoursofpresentation   |             |     |     |
|     |     |     |     |     |     | 5 Conjunctivitis       |         |     |     | Rednessoftheconjunctiva  |             |     | B   |
Fig.4. VisualizationoftheTripletLossfunctionintheembeddingspace. Feverdaysbefore Self-reporteddaysoffever
|     |     |     |     |     |     | 6              |     |     |     |                 |     |     | N   |
| --- | --- | --- | --- | --- | --- | -------------- | --- | --- | --- | --------------- | --- | --- | --- |
|     |     |     |     |     |     | hospital(days) |     |     |     | beforeadmission |     |     |     |
Abnormalchangein
|            |                      |     |     |     |     | 7 Rash |     |     |     | skincolor       |     |     | B   |
| ---------- | -------------------- | --- | --- | --- | --- | ------ | --- | --- | --- | --------------- | --- | --- | --- |
| D. Triplet | Loss Siamese Network |     |     |     |     |        |     |     |     |                 |     |     |     |
|            |                      |     |     |     |     | 8 Sex  |     |     |     | Female=0,Male=1 |     |     | B   |
The core of our deep learning model is the Triplet Loss DT=DataType,N=Numerical,B=Binary
| Siamese Network. | Two of | the network’s |     | main characteristics |     |     |     |     |     |     |     |     |     |
| ---------------- | ------ | ------------- | --- | -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
arethatithasthreebranchesthatshareweightsandrequireas
IV. RESULTS
| input a positive | example, | a negative | example, | and | an anchor |     |     |     |     |     |     |     |     |
| ---------------- | -------- | ---------- | -------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
or baseline (Fig. 3). This input is usually referred to as a This section will discuss the characteristics related to the
triplet. This neural network aims to enforce a desired distance dataset used to train and test the AI-HEAT model and the
between the triplets that make up its input in a meaningful models used as baselines, among them TabPFN [24], a prior-
|     |     |     |     |     |     | data fitted | network | that | uses | a transformer | to  | classify | small |
| --- | --- | --- | --- | --- | --- | ----------- | ------- | ---- | ---- | ------------- | --- | -------- | ----- |
embeddingspace,reducingthedistancebetweentheanchoror
baselineandthepositiveexampleandmaximizingthedistance tabular data, XGBoost [25], Support Vector Machine (SVM),
betweentheanchororbaselineandthenegativeone,usingthe andLogisticRegression(LR),inadditiontothecharacteristics
Triplet Loss function defined as: of the cohorts and trials, the metrics used as performance
|     |     |     |     |     |     | assessment, | and | all the | settings | for the | experimental | results. |     |
| --- | --- | --- | --- | --- | --- | ----------- | --- | ------- | -------- | ------- | ------------ | -------- | --- |
L(A,P,N)=max{d(A,P)−d(A,N)+α,0}
|              |                 |         |     |        |             | A. Training/Testing |      | Dataset | Description |             |      |        |     |
| ------------ | --------------- | ------- | --- | ------ | ----------- | ------------------- | ---- | ------- | ----------- | ----------- | ---- | ------ | --- |
| where d(A,P) | is the distance | between | the | anchor | or baseline |                     |      |         |             |             |      |        |     |
|              |                 |         |     |        |             | The dataset         | used | for     | training    | and testing | both | models | in- |
andthepositiveexample,d(A,N)isthedistancebetweenthe cluded943patientsadmittedwithnon-specificfebrileillnesses
| anchor or | baseline and the   | negative | example, |           | and α is the |            |          |             |            |          |          |            |           |
| --------- | ------------------ | -------- | -------- | --------- | ------------ | ---------- | -------- | ----------- | ---------- | -------- | -------- | ---------- | --------- |
|           |                    |          |          |           |              | and 1,105  | patients | admitted    |            | with KD  | to Rady  | Children’s |           |
| minimum   | desired difference | between  | the      | distances | (Fig. 4).    |            |          |             |            |          |          |            |           |
|           |                    |          |          |           |              | Hospital   | and its  | satellite   | locations, | 135      | patients | admitted   |           |
|           |                    |          |          |           |              | with MIS-C | and      | 87 patients |            | admitted | with     | murine     | typhus    |
| E. Deep   | Learning Model:    | AI-HEAT  |          |           |              |            |          |             |            |          |          |            |           |
|           |                    |          |          |           |              | admitted   | to Texas | Children’s  |            | Hospital | and its  | two        | satellite |
AI-HEAT consists of an embedding stage and a classifica- campuses within the greater Houston area. Medical records
tion stage. In the embedding stage, the patient information were reviewed, with eight demographic, clinical, and labo-
enters the four Siamese Triplet Loss Networks, where the ratory features available within six hours of the presentation
representation of that patient is obtained for each of the for all febrile conditions (Table I). Within the dataset, 1,347
embedding spaces in which the four febrile conditions are patientsaremales,and923arefemales.Maximum,minimum,
represented. Subsequently, the resulting embedded vectors are mean, prevalence, and missing values for all the features of
concatenated to form a single vector with said embedded the dataset are shown in Table II.
| representations. | This vector | will | feed the | classification | stage, |     |     |     |     |     |     |     |     |
| ---------------- | ----------- | ---- | -------- | -------------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
B. Trials
| consisting | of densely connected |     | layers with | a   | final softmax |     |     |     |     |     |     |     |     |
| ---------- | -------------------- | --- | ----------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
layer, whose output will be a probability distributed among After applying the 4-set cross-validation with matching
the four febrile conditions given the patient’s clinical and conditions to create the four cohorts for training and testing,
laboratory features (Fig. 5). the distributions shown in Table III were obtained. Once the
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore.  Restrictions apply.

as follows:
TABLEII
DATASETSTATISTICS
N
1 (cid:88)
|     |     |           |     |     |        |     |     | Balanced | Accuracy= |     |     | Sensitivity | ,   |     |
| --- | --- | --------- | --- | --- | ------ | --- | --- | -------- | --------- | --- | --- | ----------- | --- | --- |
|     |     | Numerical |     |     | Binary |     |     |          |           |     |     |             | i   |     |
N
| Feature | Min  | Max   | Median |     | Prevalence | Missing |     |     |     |     | i=1 |     |     |     |
| ------- | ---- | ----- | ------ | --- | ---------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
| ALC     | 0.07 | 17.42 | 2.52   |     | -          | 96      |     |     |     |     |     |     |     |     |
N
ANC 0.38 37.97 6.99 - 92 where is the number of febrile conditions.
| Age(years) | <1  | 19      |     | 3   | -   | 0   |                 |     |         |     |     |     |     |     |
| ---------- | --- | ------- | --- | --- | --- | --- | --------------- | --- | ------- | --- | --- | --- | --- | --- |
|            |     |         |     |     |     |     | D. Experimental |     | Results |     |     |     |     |     |
| ALT        |     | 3 1,045 |     | 33  | -   | 273 |                 |     |         |     |     |     |     |     |
Yes:71% The training and testing of all models were performed with
| Conjunctivitis |     | - - |     | -   |     | 5   |     |     |     |     |     |     |     |     |
| -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
No:29%
|     |     |     |     |     |     |     | Python 3.9.17, |     | Tensorflow | 2.13.0, | Pandas | 2.0.3, | and | Keras |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ---------- | ------- | ------ | ------ | --- | ----- |
Feverdays
2.13.1runningonaLINUX-basedcomputerequippedwithan
| beforehospital |     | 0 15 |     | 5   | -   | 1   |                                           |     |     |     |     |     |     |     |
| -------------- | --- | ---- | --- | --- | --- | --- | ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| (days)         |     |      |     |     |     |     | AMDRyzen55600gCPUandaNVIDIAGeForceRTX3060 |     |     |     |     |     |     |     |
Yes:81%
Rash - - - 5 GPU. For TabPFN, we used the Python package downloaded
No:19%
|     |     |     |     |     |     |     | directly from | the | authors’ | GitHub | repository |     | [26]. Similarly, |     |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | -------- | ------ | ---------- | --- | ---------------- | --- |
Female:41%
| Sex |     | - - |     | -   |     | 0   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Male:59% XGBoost was installed and ran following the steps outlined
|     |     |     |     |     |     |     | in the developers’ |     | documentation |     | [27]. | SVM | and LR | were |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | ------------- | --- | ----- | --- | ------ | ---- |
implementeddirectlyfromthescikit-learnpackageforPython
TABLEIII
NUMBEROFPATIENTSINEACHCOHORT [28]. To train AI-HEAT, our CDSS, we began by training
|     |     |     |     |     |     |     | each Triplet | Loss | Siamese |     | network. These |     | networks | were |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---- | ------- | --- | -------------- | --- | -------- | ---- |
%of
Cohort1 Cohort2 Cohort3 Cohort4 designed to create an embedding space for each of the four
Total
Febrile febrile conditions. In this setup, each febrile condition was
|     | 250 |     | 241 | 232 | 220 | 42  |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Control treatedasapositiveinstancewithinitsembeddingspace,while
| Kawasaki | 292 |     | 278 | 271 | 264 | 48  |           |            |      |            |           |     |          |      |
| -------- | --- | --- | --- | --- | --- | --- | --------- | ---------- | ---- | ---------- | --------- | --- | -------- | ---- |
|          |     |     |     |     |     |     | the other | conditions | were | considered | negative. |     | Once the | four |
| MIS-C    | 50  |     | 38  | 28  | 19  | 6   |           |            |      |            |           |     |          |      |
TripletLossSiameseNetworkshadbeentrained,theiroutputs
| Typhus | 34  |     | 24  | 18  | 11  | 4   |     |     |     |     |     |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Total 626 581 549 514 100 were fed into a concatenation layer that combines the vectors
|     |     |     |     |     |     |     | from each | network | and  | pass them | through            | a series | of densely |     |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------- | ---- | --------- | ------------------ | -------- | ---------- | --- |
|     |     |     |     |     |     |     | connected | layers  | that | form      | the classification |          | stage of   | our |
cohorts were created, we defined the training and testing CDSS. Each Triplet Loss Siamese Network consists of four
|              |      |             |     |                |       |          | layers with | 16, | 32, 16, | and 8 | neurons, | respectively. | Training |     |
| ------------ | ---- | ----------- | --- | -------------- | ----- | -------- | ----------- | --- | ------- | ----- | -------- | ------------- | -------- | --- |
| patients for | each | trial based | on  | these cohorts, | where | for each |             |     |         |       |          |               |          |     |
trial, the cohort with the same Trial number will be used as wasperformedusingtheTripletLossfunctionwithalearning
a test cohort. For Trial 1, the cohort used as a test set was rate of 0.002, an alpha parameter of 0.2, and a batch size of
|           |           |        |        |         |          |            | 30. The | classification |     | module | uses three | densely | connected |     |
| --------- | --------- | ------ | ------ | ------- | -------- | ---------- | ------- | -------------- | --- | ------ | ---------- | ------- | --------- | --- |
| Cohort 1; | for Trial | 2, the | cohort | used as | the test | was Cohort |         |                |     |        |            |         |           |     |
2, and so on. Finally, for the cohorts used as training for each layers,with32,64,and32neurons,respectively,andemploys
|            |             |         |           |     |        |              | a ReLU    | activation | function. |        | For training  | this | module, | we   |
| ---------- | ----------- | ------- | --------- | --- | ------ | ------------ | --------- | ---------- | --------- | ------ | ------------- | ---- | ------- | ---- |
| trial, the | Informative | Samples | Selection |     | Method | (Sec. III-C) |           |            |           |        |               |      |         |      |
|            |             |         |           |     |        |              | used mean | square     | error     | as the | loss function |      | and an  | Adam |
wasapplied,obtainingthedistributionofthefebrileconditions
for training for every trial shown in Table IV. optimizer with a learning rate of 0.001 over 25 epochs, with
tenstepsperepoch.Thetrainingwasconductedforallmodels
|     |     |     |     |     |     |     | with and | without | the | Informative | Sample | Selection | method |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------- | --- | ----------- | ------ | --------- | ------ | --- |
C. Performance Assessment implementation to compare the impact of the downsampling
|     |     |     |     |     |     |     | method proposed |     | in III-C. | In  | the case of | TabPFN, | due | to the |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | --------- | --- | ----------- | ------- | --- | ------ |
TheBalancedAccuracymetricwasusedtoevaluatetheper- Transformer’s restrictions that do not admit more than 1024
formance of AI-HEAT and the baseline models. This decision samples for training, a random sampling of 400 samples was
| was made | based | on the evident |     | imbalance | of the | cohort used |             |                  |     |         |           |     |              |     |
| -------- | ----- | -------------- | --- | --------- | ------ | ----------- | ----------- | ---------------- | --- | ------- | --------- | --- | ------------ | --- |
|          |       |                |     |           |        |             | carried out | for non-specific |     | febrile | illnesses | and | KD patients. |     |
fortestingineachtrial,whichisnotsubjecttotheInformative The experimental results for all trials are shown in Table V,
Sample Selection Method and thus retains the characteristics while experimental results for all classes can be seen in Fig.
showninTableIII.TheBalancedAccuracymetricwasdefined
6.
|     |     |     |     |     |     |     |     |     |     | V. DISCUSSION |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- |
TABLEIV In the results shown in Table V and Figure 6, the positive
DISTRIBUTIONOFPATIENTSFOREACHFEBRILECONDITIONACROSSALL impact of implementing the Informative Samples Selection
TRIALS Method is evident, where the models most benefited by its
Trial1 Trial2 Trial3 Trial4 %ofTotal implementation were SVM and AI-HEAT, and the least bene-
Febrile fited was TabPFN. This may be due to TabPFN’s well-known
|     | 67  | 79  |     | 90  | 98  | 24  |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Control
robustnessevenwhendealingwithimbalanceddatasetsthanks
| Kawasaki | 78  | 92  |     | 103 | 111 | 28  |                         |     |     |               |         |     |          |     |
| -------- | --- | --- | --- | --- | --- | --- | ----------------------- | --- | --- | ------------- | ------- | --- | -------- | --- |
|          |     |     |     |     |     |     | to its Transformer-type |     |     | architecture. | AI-HEAT |     | achieves | a   |
| MIS-C    | 85  | 97  |     | 107 | 116 | 29  |                         |     |     |               |         |     |          |     |
performancesimilartothatoftheTabPFN,withsomespecific
| Typhus | 53  | 63  |     | 69  | 76  | 19  |            |      |          |     |            |        |               |     |
| ------ | --- | --- | --- | --- | --- | --- | ---------- | ---- | -------- | --- | ---------- | ------ | ------------- | --- |
| Total  | 283 | 331 |     | 369 | 401 | 100 |            |      |          |     |            |        |               |     |
|        |     |     |     |     |     |     | advantages | such | as being | a   | model that | allows | visualization |     |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore.  Restrictions apply.

TABLEV
BALANCEDACCURACYRESULTSFORALLTRIALS
|     |         |      |      |         | Imbalanced |        |         |      |      |         | Balanced |        |         |     |     |
| --- | ------- | ---- | ---- | ------- | ---------- | ------ | ------- | ---- | ---- | ------- | -------- | ------ | ------- | --- | --- |
|     |         | LR   | SVM  | XGBoost |            | TabPFN | AI-HEAT | LR   | SVM  | XGBoost |          | TabPFN | AI-HEAT |     |     |
|     | Trial1  | 0.51 | 0.48 |         | 0.55       | 0.64   | 0.50    | 0.64 | 0.63 | 0.61    |          | 0.66   | 0.69    |     |     |
|     | Trial2  | 0.49 | 0.42 |         | 0.53       | 0.65   | 0.54    | 0.68 | 0.65 | 0.66    |          | 0.75   | 0.72    |     |     |
|     | Trial3  | 0.52 | 0.47 |         | 0.64       | 0.66   | 0.51    | 0.69 | 0.70 | 0.70    |          | 0.78   | 0.74    |     |     |
|     | Trial4  | 0.55 | 0.49 |         | 0.69       | 0.69   | 0.54    | 0.69 | 0.73 | 0.73    |          | 0.75   | 0.78    |     |     |
|     | Average | 0.52 | 0.47 |         | 0.60       | 0.66   | 0.52    | 0.68 | 0.68 | 0.67    |          | 0.74   | 0.73    |     |     |
Fig.6. ExperimentalresultsperclassforeverybaselinemodelandAI-HEATbeforeandafterInformativeSamplesSelectionMethod.
of the embedding spaces (Fig. 7, 8, 9, and 10) that can allow the visualization of its embedding spaces to the better
result in a better understanding of the similarity of some of understanding of the febrile conditions that it distinguishes,
the febrile conditions treated here, as well as the significant and having the flexibility to be able to incorporate other
difference in size of both architectures, where TabPFN has architectures in its classification stage that can improve its
| 25.8Mparameters.Incomparison,AI-HEATonlyhas24.4K |     |     |     |     |     |     |     | performance. |     |     |     |     |     |     |     |
| ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
parameters.
REFERENCES
| In these  | bidimensional   |     | projections | of      | the multi-embedding |     |         |     |        |              |         |     |                |         |     |
| --------- | --------------- | --- | ----------- | ------- | ------------------- | --- | ------- | --- | ------ | ------------ | ------- | --- | -------------- | ------- | --- |
|           |                 |     |             |         |                     |     |         | [1] | Icons8 | (Free Icons, | Clipart |     | Illustrations, | Photos, | and |
| space, it | can be observed |     | how         | AI-HEAT | interprets          |     | the ex- |     |        |              |         |     |                |         |     |
|           |                 |     |             |         |                     |     |         |     | Music, | n.d.)        |         |     |                |         |     |
istence of a certain similarity in febrile conditions such as https://icons8.com/. Accessed: 2023-05-
| Kawasaki     | (Fig. 8) | and typhus | (Fig. | 10), | where   | it      | observes |     | 10.     |           |     |            |     |            |          |
| ------------ | -------- | ---------- | ----- | ---- | ------- | ------- | -------- | --- | ------- | --------- | --- | ---------- | --- | ---------- | -------- |
|              |          |            |       |      |         |         |          | [2] | Draw.io | (Diagrams | for | Confluence |     | and Jira). | https:// |
| that several | patients | occupy     | the   | same | regions | of this | multi-   |     |         |           |     |            |     |            |          |
embedding space. At the same time, it can be seen that drawio-app.com/. Accessed: 2023-05-10.
|                       |            |       |          |             |              |            |         | [3] | Leora R. | Feldstein,  | Erica    | B.  | Rose, Steven | M.  | Horwitz,  |
| --------------------- | ---------- | ----- | -------- | ----------- | ------------ | ---------- | ------- | --- | -------- | ----------- | -------- | --- | ------------ | --- | --------- |
| patients              | with MIS-C | (Fig. | 9) are   | distributed |              | throughout | the     |     |          |             |          |     |              |     |           |
|                       |            |       |          |             |              |            |         |     | Jennifer | P. Collins, | Margaret |     | M. Newhams,  |     | Mary Beth |
| multi-embeddingspace, |            | which | suggests |             | that theyare |            | themost |     |          |             |          |     |              |     |           |
challenging patients to distinguish between the four febrile F. Son, Jane W. Newburger, Lawrence C. Kleinman,
|     |     |     |     |     |     |     |     |     | Sabrina | M. Heidemann, |     | Amarilis | A.  | Martin, | Aalok R. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | ------------- | --- | -------- | --- | ------- | -------- |
conditions.Theseconclusionswereconfirmedbymedicalstaff
who are in constant contact with these febrile conditions. Singh, Simon Li, Keiko M. Tarquinio, Preeti Jaggi,
|     |     |                 |     |     |     |     |     |     | Matthew | E. Oster,     | Sheemon |           | P. Zackai, | Jennifer | Gillen,     |
| --- | --- | --------------- | --- | --- | --- | --- | --- | --- | ------- | ------------- | ------- | --------- | ---------- | -------- | ----------- |
|     |     |                 |     |     |     |     |     |     | Adam J. | Ratner,       | Rowan   | F. Walsh, | Julie      | C.       | Fitzgerald, |
|     |     | VI. CONCLUSIONS |     |     |     |     |     |     |         |               |         |           |            |          |             |
|     |     |                 |     |     |     |     |     |     | Michael | A. Keenaghan, |         | Hussam    | Alharash,  |          | Sule Doy-   |
AI-HEAT is a CDSS capable of obtaining performance maz, Katharine N. Clouser, John S. Giuliano, Anjali
| similar      | to that of | a state-of-the-art |                | Transformer-type |            |     | deep       |     |          |        |            |       |           |         |           |
| ------------ | ---------- | ------------------ | -------------- | ---------------- | ---------- | --- | ---------- | --- | -------- | ------ | ---------- | ----- | --------- | ------- | --------- |
|              |            |                    |                |                  |            |     |            |     | Gupta,   | Robert | M. Parker, |       | Aline B.  | Maddux, | Vinod     |
| learning     | model such | as                 | TabPFN         | with             | advantages |     | such as    |     |          |        |            |       |           |         |           |
|              |            |                    |                |                  |            |     |            |     | Havalad, | Stacy  | Ramsingh,  | Hulya | Bukulmez, |         | Tamara T. |
| being almost | a thousand |                    | times smaller, |                  | having     | the | ability to |     |          |        |            |       |           |         |           |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore.  Restrictions apply.

Fig. 7. Bidimensional projection of Febrile Control patients in the multi- Fig. 9. Bidimensional projection of MIS-C patients in the multi-embedded
embeddedspaceobtainedfromAI-HEAT. spaceobtainedfromAI-HEAT.
Fig.8. BidimensionalprojectionofKawasakipatientsinthemulti-embedded Fig. 10. Bidimensional projection of typhus patients in the multi-embedded
spaceobtainedfromAI-HEAT. spaceobtainedfromAI-HEAT.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore. Restrictions apply.

Bradford,LincolnS.Smith,MarkW.Tenforde,Christo- 2021), pp. 57–59. ISSN: 0091-6749, 1097-6825. DOI:
pher L. Carroll, Becky J. Riggs, Shira J. Gertz, Ariel 10.1016/j.jaci.2020.10.008.
Daube, Amanda Lansell, Alvaro Coronado Munoz, [11] Andrea Dean, Rathi Asaithambi, and Hannah C.
Charlotte V. Hobbs, Kimberly L. Marohn, Natasha B. Neubauer. “Murine Typhus in 5 Children Hospitalized
Halasa, Manish M. Patel, and Adrienne G. Randolph. for Multisystem Inflammatory Syndrome in Children”.
“MultisystemInflammatorySyndromeinU.S.Children In:HospitalPediatrics11.4(Apr.2021),e61–e65.ISSN:
andAdolescents”.In:NewEnglandJournalofMedicine 2154-1663. DOI: 10.1542/hpeds.2020-005652.
383.4(July2020),pp.334–346. ISSN:0028-4793. DOI: [12] Zain Alamarat, Norma Pe´rez, Susan Wootton, Ankur
10.1056/NEJMoa2021680. Kamdar, Keely Smith, Gloria P. Heresi, and Michael
[4] Shelley Riphagen, Xabier Gomez, Carmen Gonzalez- Chang. “Murine Typhus Outbreak Presenting as Mul-
Martinez, Nick Wilkinson, and Paraskevi Theocharis. tisystem Inflammatory Syndrome in Children During
“Hyperinflammatory shock in children during COVID- SARS-CoV-2 Pandemic”. In: The Pediatric Infectious
19 pandemic”. In: The Lancet 395.10237 (May 2020), Disease Journal 39.12 (Dec. 2020), e447. ISSN: 0891-
pp. 1607–1608. ISSN: 0140-6736, 1474-547X. DOI: 10. 3668. DOI: 10.1097/INF.0000000000002947.
1016/S0140-6736(20)31094-1. [13] Nada Atef Shebl, Bryony Dean Franklin, and Nick
[5] Lucio Verdoni, Angelo Mazza, Annalisa Gervasoni, Barber. “Clinical decision support systems and antibi-
Laura Martelli, Maurizio Ruggeri, Matteo Ciuffreda, otic use”. In: Pharmacy world & science 29.4 (2007),
Ezio Bonanomi, and Lorenzo D’Antiga. “An outbreak pp. 342–349.
of severe Kawasaki-like disease at the Italian epicentre [14] Pooja Rani, Rajneesh Kumar, Nada MO Ahmed, and
of the SARS-CoV-2 epidemic: an observational co- Anurag Jain. “A decision support system for heart
hort study”. In: The Lancet 395.10239 (June 2020), disease prediction based upon machine learning”. In:
pp.1771–1778. ISSN:0140-6736. DOI:10.1016/S0140- JournalofReliableIntelligentEnvironments7.3(2021),
6736(20)31103-X. pp. 263–275.
[6] Francesco Licciardi, Giulia Pruccoli, Marco Den- [15] Rishu Garg, Saumil Maheshwari, and Anupam Shukla.
ina, Emilia Parodi, Manuela Taglietto, Sergio Rosati, “Decision support system for detection and classifi-
andDavideMontin.“SARS-CoV-2–InducedKawasaki- cation of skin cancer using CNN”. In: Innovations
Like Hyperinflammatory Syndrome: A Novel COVID in Computational Intelligence and Computer Vision.
Phenotype in Children”. In: Pediatrics 146.2 (Aug. Springer, 2021, pp. 578–586.
2020), e20201711. ISSN: 0031-4005. DOI: 10.1542/ [16] Guangyao Wu, Pei Yang, Yuanliang Xie, Henry C
peds.2020-1711. Woodruff, Xiangang Rao, Julien Guiot, Anne-Noelle
[7] HAN Archive - 00432 — Health Alert Network (HAN). Frix,RenaudLouis,MichelMoutschen,JiaweiLi,etal.
en-us. Sept. 2021. “Development of a clinical decision support system for
[8] Tiphanie P. Vogel, Karina A. Top, Christos Karatzios, severity risk prediction and triage of COVID-19 pa-
David C. Hilmers, Lorena I. Tapia, Pamela Moceri, tientsathospitaladmission:aninternationalmulticentre
Lisa Giovannini-Chami, Nicholas Wood, Rebecca E. study”. In: European Respiratory Journal 56.2 (2020).
Chandler, Nicola P. Klein, Elizabeth P. Schlaudecker, [17] Akshaya Karthikeyan, Akshit Garg, PK Vinod, and
M. Cecilia Poli, Eyal Muscal, and Flor M. Munoz. U Deva Priyakumar. “Machine learning based clinical
“Multisystem inflammatory syndrome in children and decision support system for early COVID-19 mortality
adults(MIS-C/A):Casedefinition&guidelinesfordata prediction”. In: Frontiers in public health 9 (2021),
collection, analysis, and presentation of immunization p. 626697.
safety data”. In: Vaccine 39.22 (May 2021), pp. 3037– [18] Maulin Soneji, John Tan, and Emily Wong. “662.
3049. ISSN: 0264-410X. DOI: 10.1016/j.vaccine.2021. Using Machine Learning to Aid in the Diagnosis of
01.054. Multisystem Inflammatory Syndrome in Children”. In:
[9] Caterina Matucci-Cerinic, Roberta Caorsi, Alessandro OpenForumInfectiousDiseases.Vol.8.Suppl1.2021,
Consolaro, Silvia Rosina, Adele Civino, and Angelo pp. 433–433.
Ravelli. “Multisystem Inflammatory Syndrome in Chil- [19] MatthewTClark,DanielleARankin,LaurenSPeetluk,
dren: Unique Disease or Part of the Kawasaki Disease Alisa Gotte, Alison Herndon, William McEachern, An-
Spectrum?” In: Frontiers in Pediatrics 9 (2021). ISSN: drewSmith,DanielEClark,EdwardHardison,AdamJ
2296-2360. Esbenshade, et al. “A Diagnostic Prediction Model
[10] Magali Noval Rivas, Rebecca A. Porritt, Mary Hongy- to Distinguish Multisystem Inflammatory Syndrome in
ing Cheng, Ivet Bahar, and Moshe Arditi. “COVID- Children”. In: ACR Open Rheumatology (2022).
19–associated multisystem inflammatory syndrome in [20] Jonathan Y Lam, Chisato Shimizu, Adriana H
children (MIS-C): A novel disease that mimics toxic Tremoulet, Emelia Bainto, Samantha C Roberts, Nipha
shock syndrome—the superantigen hypothesis”. In: Sivilay,MichaelAGardiner,JohnTKanegaye,Alexan-
JournalofAllergyandClinicalImmunology147.1(Jan. derHHogan,JuanCSalazar,etal.“Amachine-learning
algorithm for diagnosis of multisystem inflammatory
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore. Restrictions apply.

syndrome in children and Kawasaki disease in the
USA:aretrospectivemodeldevelopmentandvalidation
study”. In: The Lancet Digital Health 4.10 (2022),
e717–e726.
[21] Abraham Bautista-Castillo, Angela Christine Chun,
Tiphanie Phillips Vogel, and Ioannis A Kakadiaris.
“AI-MET: A Deep Learning-based Clinical Decision
SupportSystemforDistinguishingMultisystemInflam-
matory Syndrome in Children from Endemic Typhus”.
In: medRxiv (2023), pp. 2023–06.
[22] Stef Van Buuren and Karin Groothuis-Oudshoorn.
“mice: Multivariate imputation by chained equations
in R”. In: Journal of statistical software 45 (2011),
pp. 1–67.
[23] Samuel Von Wilson. AnotherSamWilson/miceforest.
original-date: 2020-08-22T00:00:22Z. July 2024. URL:
https://github.com/AnotherSamWilson/miceforest
(visited on 07/04/2024).
[24] Noah Hollmann, Samuel Mu¨ller, Katharina
Eggensperger, and Frank Hutter. “TabPFN: A
transformer that solves small tabular classification
problems in a second”. In: arXiv preprint
arXiv:2207.01848 (2022).
[25] TianqiChenandCarlosGuestrin.“Xgboost:Ascalable
treeboostingsystem”.In:Proceedingsofthe22ndacm
sigkddinternationalconferenceonknowledgediscovery
and data mining. 2016, pp. 785–794.
[26] GitHub - automl/TabPFN: Official implementation of
the TabPFN paper (https://arxiv.org/abs/2207.01848)
and the tabpfn package. — github.com. https://github.
com/automl/TabPFN. [Accessed 08-10-2023].
[27] XGBoost Python Package — xgboost 2.1.1 documenta-
tion. URL: https://xgboost.readthedocs.io/en/stable/
python/index.html (visited on 08/27/2024).
[28] scikit-learn: machine learning in Python — scikit-learn
1.5.1 documentation. URL: https://scikit-learn.org/
stable/index.html (visited on 08/27/2024).
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:54:06 UTC from IEEE Xplore. Restrictions apply.