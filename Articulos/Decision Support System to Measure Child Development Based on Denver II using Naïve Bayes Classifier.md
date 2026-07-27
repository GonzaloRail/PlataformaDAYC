2021 International Conference on Data and Software Engineering (ICoDSE)
Decision Support System to Measure Child
Development Based on Denver II using Naïve
Bayes Classifier
Yulia Ery Kurniawati Yulius Denny Prabowo
Informatics Department, Faculty Computer Science and Design Informatics Department, Faculty Computer Science and Design
Institut Teknologi dan Bisnis Kalbis Institut Teknologi dan Bisnis Kalbis
Jakarta, Indonesia Jakarta, Indonesia
yulia.kurniawati@kalbis.ac.id yulius.prabowo@kalbis.ac.id
Abstract— This study aims to develop a decision support [10], solve exam timetabling problem [11], and measure
system to measure child development. The test was based on tobacco cultivation [12].
Denver II. Naïve Bayes Classifier (NBC) was used to classify the
Denver Development Screening Test-Revised or the
test result. The Software Development Life Cycle (SDLC) used
is incremental development. This study used two increments. Denver II is the tool for early detection of child development
The first increment was used to build the classification model disorder. It is a test used to evaluate the development of
using NBC. The model's accuracy, precision, recall, and f- children aged 0-6 years based on activities according to their
measure were 95.1%, 95.4%, 95.1%, and 94.8%, respectively. age [13]. The test consists of 125 items and assesses four
The second increment was used for developing the application. sectors: personal-social, fine motor-adaptive, language, and
Based on the black box testing, all functionality run as expected. gross motor. The items given depend on the age and ability of
the child. It also can identify child developmental disorders
Keywords— child development, decision support system, and excess. It has been used in 54 countries, and 15 have
Denver II, Naïve Bayes Classifier standardised it as a child development screening test because
it is highly portable, affordable, and does not require intensive
I. INTRODUCTION
training [13].
World Health Organization officially declared a new type
This study aims to develop an intelligent system to
of coronavirus, COVID-19, pandemic on March 9, 2020 [1].
measure child development based on Denver II using Naïve
Indonesia is one of the countries affected by the COVID-19
Bayes Classifier (NBC). It is a follow-up study conducted by
pandemic. Indonesia was ranked first as the world's highest
Kurniawati, etc. [14] in 2013. The application is only for
number of daily COVID-19 cases on Monday, July 12, 2021,
children with age 0-2 years old. We will improve that
with 40,427 cases [2]. Several cities in Indonesia have
application to test children up to 6 years old as Denver II does.
implemented Large-Scale Social Restriction or Pembatasan
NBC was chosen because it is simple and fast [15][16], require
Sosial Berskala Besar (PSBB), and Jakarta was the first
little training data for estimation of the necessary parameters
province to implement it starting in April 10, 2020 [3]. As a
for classification [17].
result, the movement of people is limited to avoid crowds and
the spread of the virus.
II. RELATED WORKS
In addition, public facilities also apply strict rules for There are several studies applied to measure child
visitors. Hospitals where patients are exposed to COVID-19 development in Bahasa Indonesia. Rakhmawati etc. developed
also apply strict rules. If they are not urgent, they are expected a desktop-based application based on Denver II using
to delay going to the hospital; children [4], [5]. Before the Decision Tree [14]. In this study, the data was test results from
pandemic, if a child is indicated experiencing a developmental child development poly. It has 137 data learning and 141 rules.
disorder, the child will be taken to the hospital. Then they will Kurniawan etc. developed an Android-based application to
be examined by a paediatrician or psychologist. However, monitor children development based on Denver II, but it does
after the pandemic, this child's developmental disorder is not not give further information about the data and data mining
included in the symptoms or emergency signs recommended method [18].
by the Indonesian Pediatrician Association (IDAI) [4], so that
detection of developmental delay is advised to be delayed. At Gumiri, etc., developed a desktop-based expert system to
the same time, the developmental disorder must be identified classify early child development status with NBC based on
and treated as early as possible so that their development is not DDST Rules [19]. They used 513 data from Integrated
disrupted. Healthcare Center. The inputs were the number of failures per
sector. Latubessy and Wijayanti developed an expert system
Decision Support Systems (DSS) are one of the primary to monitor child development using Denver II [20]. They used
tools supporting decision-makers [6]. DSS has been backwards chaining to develop the model of the system.
implemented to solve various problems, such as application to Gusman and Henri in 2019 developed an expert system to
evaluate and predict environmental comfort for mutton sheep diagnose child development growth disorders with the forward
[7], select the data mining algorithm [8], assist clinical nursing chaining method [21]. The system can diagnose five disorders
in the psychiatric department [9], sustainable farming in Egypt of child development, especially in children aged 6-12 years.
978-1-6654-9453-3/21/$31.00 ©2021 IEEE
7248469.1202.09635ESDoCI/9011.01
:IOD
|
EEEI
1202©
00.13$/12/3-3549-4566-1-879
|
)ESDoCI(
gnireenignE
erawtfoS
dna
ataD
no
ecnerefnoC
lanoitanretnI
1202
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore. Restrictions apply.

2021 International Conference on Data and Software Engineering (ICoDSE)

|     |     |     |     |     |     | TABLE I.   | THE EXAMPLE OF DATA TRAINING  |     |     |
| --- | --- | --- | --- | --- | --- | ---------- | ----------------------------- | --- | --- |
The disorders are autism, Asperger syndrome, attention deficit
disorders  and  hyperactivity,  down  syndrome,  and  mental  Personal Fine Motor- Gross
|               |     |     |     |     |          |           | Language  |        | Conclusion  |
| ------------- | --- | --- | --- | --- | -------- | --------- | --------- | ------ | ----------- |
| retardation.  |     |     |     |     | -Social  | Adaptive  |           | Motor  |             |
Kurniawati, etc., in 2013, conducted a study to develop a  normal  normal  normal  normal  normal
screening test application based on Denver II using NBC [14]  normal  normal  advance  normal  normal
for 0-2 years old children. In this study, we improved the
|              |               |            |                        |      | advance  | normal  | caution  | normal  | normal  |
| ------------ | ------------- | ---------- | ---------------------- | ---- | -------- | ------- | -------- | ------- | ------- |
| application  | to  be  used  | up  to  6  | years  old  children.  | The  |          |         |          |         |         |
application is web-based, so it does not need to install and can
|     |     |     |     |     | caution  | advance  | normal  | advance  | normal  |
| --- | --- | --- | --- | --- | -------- | -------- | ------- | -------- | ------- |
be accessed everywhere and anytime.
|     |     |     |     |     | delayed  | normal  | normal  | normal  | suspect  |
| --- | --- | --- | --- | --- | -------- | ------- | ------- | ------- | -------- |
III. METHODOLOGY
|     |     |     |     |     | normal  | delayed  | normal  | normal  | suspect  |
| --- | --- | --- | --- | --- | ------- | -------- | ------- | ------- | -------- |
Fig. 1 shows the methodology for this research. It divides
|     |     |     |     |     | caution  | delayed  | delayed  | delayed  | suspect  |
| --- | --- | --- | --- | --- | -------- | -------- | -------- | -------- | -------- |
into two stages, problem modelling and system modelling.
The problem modelling stage was used to study the problem
|                                                                   |                      |       |                         |      | delayed  | delayed  | caution  | delayed  | suspect  |
| ----------------------------------------------------------------- | -------------------- | ----- | ----------------------- | ---- | -------- | -------- | -------- | -------- | -------- |
| and look for data related to making an intelligent system. It is  |                      |       |                         |      |          |          |          |          |          |
| divided                                                           | into  three  parts:  | data  | analysis,  determining  | the  |          |          |          |          |          |
questions, and test assessment.  B. Determining The Questions
The system modelling stage was used to develop the  The question items are all question items in Denver II up
to six years old. Table II is an example of questions items from
| application.  | SDLC  used  | in  this  | study  was  | incremental  |     |     |     |     |     |
| ------------- | ----------- | --------- | ----------- | ------------ | --- | --- | --- | --- | --- |
each sector. The indicator is how the test is carried out directly
development. In this study, two increments were used. The
(D) or indirectly (ID), while the reference is a direction for the
first increment is for making the classification model with
administrator.
| NBC,  and  | the  second  | increment  | is  the  | application  |     |     |     |     |     |
| ---------- | ------------ | ---------- | -------- | ------------ | --- | --- | --- | --- | --- |
development.
|     |     |     |     |     |     | TABLE II.   | THE EXAMPLE OF QUESTION ITEMS  |            |         |
| --- | --- | --- | --- | --- | --- | ----------- | ------------------------------ | ---------- | ------- |
|     |     |     |     |     | No  | Items       | Indicator                      | Reference  | Sector  |
Personal-
|     |     |     |     |     | 1  Regard face  |     | ID  |     |     |
| --- | --- | --- | --- | --- | --------------- | --- | --- | --- | --- |
Social
|     |     |     |     |     | Smile          |     |     |     | Personal- |
| --- | --- | --- | --- | --- | -------------- | --- | --- | --- | --------- |
|     |     |     |     |     | 2              |     | D   |     |           |
|     |     |     |     |     | spontaneously  |     |     |     | Social    |
Move yarn slowly
|     |     |     |     |     |               |     |     | in an arc from one  | Fine   |
| --- | --- | --- | --- | --- | ------------- | --- | --- | ------------------- | ------ |
|     |     |     |     |     | 3  Follow to  |     | ID  | side to the other,  | Motor- |
midline
|     |     |     |     |     |     |     |     | about 8" above the  | Adaptive  |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------- | --------- |
child's face
Fine
Hands
|     |     |     |     |     | 4   |     | ID  |     | Motor- |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------ |
together
Adaptive
Respond to
|     |     |     |     |     | 5  the bell   |     | ID  |     | Language  |
| --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --------- |
|     |     |     |     |     | 6  Vocalizes  |     | D   |     | Language  |
|     |     |     |     |     | 7  Equal      |     | ID  |     | Gross     |
|     |     |     |     |     | movement      |     |     |     | Motor     |
Gross
|     |     |     |     |     | 8  Lift head  |     | D   |     |     |
| --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- |
Motor

The question items were determined by drawing a straight
line at the age of the child. The items used are on the line with
50% to 90% for the normal result. It is different from the
normal result status in Denver II; the percentage is 75% to
90%. The difference between the application and the actual
|     |     |     |     |     | Denver II. In Denver II, the test stops if the child fails three  |     |     |     |     |
| --- | --- | --- | --- | --- | ----------------------------------------------------------------- | --- | --- | --- | --- |
  times while the application fails only once. The answers will
Fig. 1.  Research Flowchart  determine  the  status  of  each  sector  delayed,  caution,  or
advanced.
IV. PROBLEM MODELLING
Table III is a table of the code item and percentage of each
The problem modelling stage is used to study the problem  age. The percentage in that table refer to 50-75% as one and
and look for data related to making intelligent applications.
75%-90% as two. The child's age is in months.
| This  stage,                                     | it  divided  | into  three  | parts:  data  | analysis,  |     |     |     |     |     |
| ------------------------------------------------ | ------------ | ------------ | ------------- | ---------- | --- | --- | --- | --- | --- |
| determining the questions, and test assessment.  |              |              |               |            |     |     |     |     |     |

A. Data Analysis
| Denver II's rules are used to determine whether the child's  |     |     |     |     |     |     |     |     |     |
| ------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
development is normal or suspected of being late. These rules

are then used as data training. Table I is an example of the
training data. The number of training data is 259 instances.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore.  Restrictions apply.

2021 International Conference on Data and Software Engineering (ICoDSE)

|     | TABLE III.   THE EXAMPLE OF AGE AND TEST  |     |     |     |     |     |     |     |     |
| --- | ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Test
|     | Age  | Item Code  | Percentage  |     |     |     |     |     |     |
| --- | ---- | ---------- | ----------- | --- | --- | --- | --- | --- | --- |
Number
|     | 1  1  | 1   | 2   |     |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
|     | 2  1  | 2   | 1   |     |     |     |     |     |     |
|     | 3  1  | 26  | 2   |     |     |     |     |     |     |
|     | 4  1  | 55  | 2   |     |     |     |     |     |     |
|     | 5  1  | 56  | 2   |     |     |     |     |     |     |
C. Test Assessment
In one test, a child must answer questions from four
sectors: personal-social, fine motor-adaptive, language, and
gross motor. There are four assessments for each sector of

child development:
Fig. 2.  Classification Model
a. Advance
Fig. 2 is a classification model used in this research. The
| If  a  | child  can  perform  | items  above  | the  age  line,  its  |     |     |     |     |     |     |
| ------ | -------------------- | ------------- | --------------------- | --- | --- | --- | --- | --- | --- |
training data will be classified using NBC and evaluated using
development is above the average age.
accuracy, precision, recall, and f-measure. Accuracy is the
b. Normal  result that is correctly predicted from the data. Precision
describes the level of accuracy between the requested data and
If a child can do items on the age line, their development
|     |     |     |     | the  prediction  | results  | provided  | by  | the  model.  | The  recall  |
| --- | --- | --- | --- | ---------------- | -------- | --------- | --- | ------------ | ------------ |
is expected according to their age.
describes the model's success in finding back information
c. Caution  obtained, and f-measure is an evaluation in the information
retrieval that combines recall and precision.
If a child can perform items below the age line, it means a
| warning for their developmental delay.  |     |     |     | 3.  Implementation  |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | ------------------- | --- | --- | --- | --- | --- |
d. Delayed  NBC used to classify the training data using WEKA Data
|     |     |     |     | Mining  | Software.  | Data  | validation  | used  | 10-fold  cross- |
| --- | --- | --- | --- | ------- | ---------- | ----- | ----------- | ----- | --------------- |
If a child cannot perform items below the age line, the child  validation. It means the data will be divided into ten parts.
has a developmental delay.
One part will be the training data, and the rest will be the
testing data. This process will be repeated ten times until
V.  SYSTEM MODELLING
|     |     |     |     | all  parts  | have  | become  | training  | and  testing  | data.  The  |
| --- | --- | --- | --- | ----------- | ----- | ------- | --------- | ------------- | ----------- |
The incremental development does system modelling. It  classification model evaluation used a confusion matrix.
| interleaves  | the  specification,  | development,  | and  validation  |     |     |     |     |     |     |
| ------------ | -------------------- | ------------- | ---------------- | --- | --- | --- | --- | --- | --- |
4.  Test
activities where the system is developed as a series of versions
(increments) [22]. Each increment will add functionality from
| the  previous  | increment.  | This  study  is  | divided  into  two  |     |     |     |     |     |     |
| -------------- | ----------- | ---------------- | ------------------- | --- | --- | --- | --- | --- | --- |
increments. The first increment is for making the classification
model with NBC and the second increment is to develop the
| application.  |     |     |     |     |     |                            |     |     |     |
| ------------- | --- | --- | --- | --- | --- | -------------------------- | --- | --- | --- |
|               |     |     |     |     |     | Fig. 3.  Confusion Matrix  |     |     |     |
A. First Increment
The first increment is used for making a classification  Fig. 3 is the result of the confusion matrix generated by
model using NBC. It consists of the research analysis, model  WEKA. It shows that True Positive (TP) is 37, False
logic design, design implementation, and data training test.  Positive (FP) is 11, False Negative (FN) is zero, and True
Negative (TN) is 175.
1.  Analysis
|     |     |     |     |     | TABLE IV.   | MODEL EVALUATION  |     |     |     |
| --- | --- | --- | --- | --- | ----------- | ----------------- | --- | --- | --- |
At this stage, analysis is carried out regarding the method
used in making the model. The hardware and software that
|     |     |     |     |   Accuracy  |     | Precision  | Recall  | F-measure  | Class  |
| --- | --- | --- | --- | ----------- | --- | ---------- | ------- | ---------- | ------ |
is needed to build the model.
|     |     |     |     |   0.771  |     | 1   | 0.771  | 0.871  | Normal  |
| --- | --- | --- | --- | -------- | --- | --- | ------ | ------ | ------- |
2.  Design
|     |     |     |     |              | 1   | 0.941  | 1      | 0.970  | Suspect  |
| --- | --- | --- | --- | ------------ | --- | ------ | ------ | ------ | -------- |
|     |     |     |     | Avg.  0.951  |     | 0.954  | 0.951  | 0.948  |          |

Table IV shows the model evaluation from the 10-fold
|     |     |     |     | cross-validation  |     | using  NBC.  | Based  | on  | it,  accuracy,  |
| --- | --- | --- | --- | ----------------- | --- | ------------ | ------ | --- | --------------- |
precision, recall, and f-measure obtained 95.1%, 95.4%,
95,1%, and 94,8% respectively.

Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore.  Restrictions apply.

2021 International Conference on Data and Software Engineering (ICoDSE)
B. Second Increment
The second increment is making the intelligent system to
measure child development based on Denver II.
1. Analysis
The analysis phase in the second increment is to analyse
the system and user requirements to make the application.
The application is a web-based application. The functional
requirements of the system are:
• Users can perform more than one test by previously
registering the user.
• The test is divided into two tests, for children aged 0-
24 months old and over 24 months until six years old.
• The result will display the results of each development
sector. If any fails will be displayed on the test results
along with the final results.
2. Design
Fig. 5. Test flowchart for every development sector 1
Fig. 5 and Fig. 6 are test flowcharts for every development
sector. After the child's age is calculated, the application
will display an assessment according to the child's age. If
the child does not pass or do the assessment, the
application will display assessment under the child's age.
If the child can pass this assessment, the child will have a
caution status. But they do not pass, the child will have
delayed status.
Fig. 4. Application flowchart
In this stage, the application design and interface will be
designed. Fig. 4 is the application flowchart. The user must
have an account to be able to do the assessment. If the users
do not have it, they have to register to make an account.
The assessment will be divided into two parts. The first
part is for the children who are 0-2 years old, and the
second one is for the children who are over two years old
up to six years old.
Fig. 6. Test flowchart for every development sector 2
If the children can pass this assessment according to their
age, the application will display an assessment above their
age. If they can pass this, the status will advance; it will be
normal if not passed.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore. Restrictions apply.

2021 International Conference on Data and Software Engineering (ICoDSE)
3. Implementation ACKNOWLEDGEMENT
The authors would like to thank the Ministry of Research,
Technology and BRIN (RistekBRIN) Indonesia through PDP
2020 for funding this research.
REFERENCES
[1] Satuan Tugas Penanganan COVID-19, “Apa yang dimaksud dengan
pandemi?,” 2020. https://covid19.go.id/tanya-jawab?search=Apa
yang dimaksud dengan pandemi? (accessed Oct. 26, 2020).
[2] N. S. Sagita, “Rekor 40 Ribu Kasus Harian Corona, RI Tempati
Peringkat Pertama di Dunia.” https://health.detik.com/berita-
detikhealth/d-5641274/rekor-40-ribu-kasus-harian-corona-ri-tempati-
peringkat-pertama-di-dunia (accessed Oct. 01, 2021).
[3] C. Wijaya, “PSBB Jakarta mulai 10 April selama dua minggu, namun
pakar menyebut hasil efektif satu bulan untuk tekan Covid-19,” 2020.
https://www.bbc.com/indonesia/indonesia-52194441 (accessed Oct.
26, 2020).
[4] E. Pranita, “Pandemi Covid-19: Ahli Ingatkan Tunda Bawa Anak ke
Fig. 7. Frontpage of the application Rumah Sakit, Kecuali Gejala Darurat Berikut.,” 2020.
https://www.kompas.com/sains/read/2020/05/05/133000723/pandemi
Fig. 7 is the front page when the application is opened. If -covid-19--ahli-ingatkan-tunda-bawa-anak-ke-rumah-sakit-kecuali
(accessed Oct. 26, 2020).
the user already has an account, they can directly log in.
[5] “Tunda Bawa Anak ke Rumah Sakit selama Pandemi Corona, Kecuali
However, if they don't have it yet, users are asked to
karena Alasan Ini,” 2020. https://www.inews.id/lifestyle/health/tunda-
register first. bawa-anak-ke-rumah-sakit-selama-pandemi-corona-kecuali-karena-
alasan-ini (accessed Oct. 26, 2020).
[6] G. R. Garcia, G. Michau, H. H. Einstein, and O. Fink, "Decision
support system for an intelligent operator of utility tunnel boring
machines," Automation in Construction, vol. 131, p. 103880, 2021,
doi: 10.1016/j.autcon.2021.103880.
[7] L. Wang, M. Zhang, Y. Li, J. Xia, and R. Ma, "Wearable multi-sensor
enabled decision support system for environmental comfort evaluation
of mutton sheep farming," Computers and Electronics in Agriculture,
vol. 187, Aug. 2021, doi: 10.1016/j.compag.2021.106302.
[8] T. Man, N. A. Zhukova, A. M. Thaw, and S. A. Abbas, "A decision
support system for DM algorithm selection based on module
Fig. 8. Personal social assessment actual child's age extraction," in Procedia Computer Science, 2021, vol. 186, pp. 529–
537. doi: 10.1016/j.procs.2021.04.173.
Fig. 8 is the display assessment in the personal social [9] K. F. Ho, P. H. Chou, J. C. J. Chao, C. Y. Hsu, and M. H. Chung,
sector. It displays the number of items, indicator, "Design and evaluation of a knowledge-based clinical decision support
reference, and the answer. system for the psychiatric nursing process," Computer Methods and
Programs in Biomedicine, vol. 207, Aug. 2021, doi:
10.1016/j.cmpb.2021.106128.
[10] K. Munir, M. Ghafoor, M. Khafagy, and H. Ihshaish,
"AgroSupportAnalytics: A Cloud-based Complaints Management and
Decision Support System for Sustainable Farming in Egypt," Egyptian
Informatics Journal, 2021, doi: 10.1016/j.eij.2021.06.002.
Fig. 9. The assessment result
[11] M. G. Güler, E. Geçici, T. Köroğlu, and E. Becit, "A web-based
decision support system for examination timetabling," Expert Systems
Fig. 9 is the display of the assessment result. It will display
with Applications, vol. 183, Nov. 2021, doi:
the result and the failed items of all developmental sectors. 10.1016/j.eswa.2021.115363.
4. Test [12] L. Wang, H. Zhou, J. Yang, Y. Xiong, J. She, and W. Chen, "A
decision support system for tobacco cultivation measures based on
The system's functionality had been tested using black-box BPNN and GA," Computers and Electronics in Agriculture, vol. 181,
Feb. 2021, doi: 10.1016/j.compag.2020.105928.
testing. Black box testing is also known as "behavioural
[13] F. Lopez Boo, M. Cubides Mateus, and A. Llonch Sabatés, "Initial
testing". The result is all the system functionalities had run
psychometric properties of the Denver II in a sample from Northeast
as expected and found no error.
Brazil," Infant Behavior and Development, vol. 58, no. January 2019,
p. 101391, 2020, doi: 10.1016/j.infbeh.2019.101391.
VI. CONCLUSIONS AND FUTURE WORK
[14] Y. E. Kurniawati, R. Saptono, and U. Salamah, “Alat Bantu Penentu
The intelligent system to measure child development based Fase Tumbuh Kembang Anak Berdasarkan Instrumen Tes Denver II
Menggunakan Metode Naïve Bayes Classifier,” Universitas Sebelas
on Denver II using NBC has been successfully developed. The
Maret, 2013.
classification model using NBC obtain accuracy, precision,
[15] O. Tejaswini, S. K. P. Aswath, K. R. Geethika, and G. R. Brindha,
recall, and f-measure 95.1%, 95.4%, 95,1%, and 94,8%,
"New Feature Selection Process to Enhance Naïve Bayes
respectively. Based on the black box testing, all the system Classification," Proceedings of the 2nd International Conference on
functionality worked as expected. Electronics, Communication and Aerospace Technology, ICECA
2018, no. ICECA, pp. 98–101, 2018, doi:
For future work, we will continue this study to compare 10.1109/ICECA.2018.8474746.
the application results with the results of Denver II and [16] A. R. Atmadja, M. Irfan, A. Halim, and Sarbini, "Classification of
validate them with paediatricians or psychologists. article knowledge field using naive bayes classifier," Proceedings -
2020 6th International Conference on Wireless and Telematics, ICWT
2020, pp. 20–23, 2020, doi: 10.1109/ICWT50448.2020.9243639.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore. Restrictions apply.

2021 International Conference on Data and Software Engineering (ICoDSE)
[17] I. A. P. Banlawe, J. C. D. Cruz, J. C. P. Gaspar, and E. J. I. Gutierrez, [20] A. Latubessy and E. Wijayanti, “Model Ddst(Denver Development
"Optimal Frequency Characterisation of Mango Pulp Weevil Mating Screening Test) Untuk Monitoring Perkembangan Anak Berbasis
Activity using Naïve Bayes Classifier Algorithm," Proceeding - 2021 Expert System,” Simetris: Jurnal Teknik Mesin, Elektro dan Ilmu
IEEE 17th International Colloquium on Signal Processing and Its Komputer, vol. 9, no. 1, pp. 205–210, 2018, doi:
Applications, CSPA 2021, no. March, pp. 116–120, 2021, doi: 10.24176/simet.v9i1.1763.
10.1109/CSPA52141.2021.9377277. [21] A. P. Gusman and H. Hendri, "Expert system to diagnose child
[18] R. Kurniawan, I. Muhimmah, and H. Roichatul Jannah, “Sistem development growth disorders with forward chaining method," Journal
Monitoring Perkembangan Anak Berbasis Denver Development of Physics: Conference Series, vol. 1339, no. 1, 2019, doi:
Screening Test (DDST / Denver II),” Teknoin, vol. 22, no. 4, pp. 305– 10.1088/1742-6596/1339/1/012045.
314, 2016, doi: 10.20885/teknoin.vol22.iss4.art8. [22] I. Sommerville, Software engineering (10th edition), 10th ed. Pearson
[19] V. L. Gumiri, D. Puspitaningrum, and Ernawati, “Sistem Pakar Education, 2016.
Klasifikasi Status Perkembangan Anak Usia Dini dengan Metode
Naive Bayes Classifer Berbasis DDST Rules,” Jurnal Rekursif, vol. 3,
no. 2, pp. 107–122, 2015.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:25:27 UTC from IEEE Xplore. Restrictions apply.