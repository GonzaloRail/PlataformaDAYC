Construction of Website-based Platform on
Development Assessment of Children with Autism
Li Guxin , Liu Qiufang
Software Development Center of Special Education,
Nanjing Technical College of Special Education, China
Abstract (cid:252)National Disability and Rehabilitation Office developmental disorder children.
organized the experts in children with autism education to make
The dependence on manual operation of results analysis
Development Assessment of Children with Autism Evaluation
and transition will cause the repetition work of statistical
Form (Trial) in March 2009. The college website provides a
calculation and charting. Our college uses the computer for
network platform for the implementation of the development of
processing and provides a network platform for those
children which analyzes and converts the evaluation results so
rehabilitation workers to free from tedious manual operation.
that the majority of children with autism rehabilitation
professionals can free from cumbersome manual operation. The Experts can also use this platform to offer suggestions to the
experts concerned can also use the platform to guide the rehabilitation work.
rehabilitation of children with autism.
II. DEVELOPING AND RUNNING ENVIRONMENT
Keywords- Network platform, children with autism, This system is designed and developed with ASP.NET
development assessment, system whose ADO.NET can provide data access interface to the data.
It provides the possibility to develop the application with a
I. INTRODUCTION
powerful Web data access. This system uses SQL Server 2005
Autism, also known as infantile autism, categorized as a as the back-end database which has a powerful data managing
developmental disorder caused by disorders in the nervous and solving capacity with a higher security performance. Each
system, is a serious mental developmental disorder and a database can hold 200 thousands data table which is only
mental disease characterized by disabilities in social, limited by the space provided by the server hard disk. The SQL
communication skills and abnormal behaviors. According to Server 2005 is chosen also because it provides remote access.
the United Nations, the incidence of autism was 1/150 and the The system uses B/S (Browser/Server) mode, which has a
male-to-female ratio is 4 to 1. In recent years, the incidence of simplified client and many advantages such as easy to maintain
autism is on the rise, and there are around 67 million patients and upgrade, lower network loads and remote login.
with autism in the world. But the etiology is still unknown.
III. SYSTEM FUNCTION ANALYSIS
Educational and medical circles at home and abroad agreed
that early intervention is important to the recovery of autism. In Users on this net platform are divided into three classes:
order to guide the local rehabilitation training and manage the administrators, navigators and guidance experts. When the
quality of the training, National Disability and Rehabilitation registration information is verified, each user can enter the
Office organized the experts in children with autism education corresponding webpage in order to accomplish different tasks.
to make Development Assessment of Children with Autism
A. Requirements of Administrator
Evaluation Form (Trial) in March 2009.
An administrator is the manager of the platform. He is able
Psychological assessment, ecological assessment, to manage users’ information and authorize different users with
functional assessment and so on are integrated in Development different permissions. He can also set the moderators and
Assessment of Children with Autism Evaluation Form (Trial). respond the users’ request such as addition, modification, and
There are 493 items in 8 assessment fields which are sensory deletion the information in the online forum. The senior
perception, gross motor, fine motor, language and administrator can manage the register and the maintenance of
communication, cognition, social interaction, self-help ability, the database.
emotion and behavior respectively. Each assessment field is
In order to ensure the scientificity and accuracy, the system
independent and shields from other fields when assessing.
requires the verification of the experts who is qualified for
The development and implementation of Development assessment. The logging data offered by them can be adopted
Assessment of Children with Autism Evaluation Form (Trial) online while others can only offer assess table. The
is aimed at having a systematic, scientific and comprehensive administrator regularly maintains the database to ensure the
assessment for children with autism. What's more, individual security, integrality and reliability of the database.
teaching and rehabilitation training plan is made according to
B. Requirements of Checkers
the characteristic of every autistic child. These plans are
adjusted according to the dynamic assessment of the training Checkers are the major users of the platform. The initial
effect in order to ensure the scientificity and effectiveness of registration information is provided by the administrator to the
the rehabilitation training for autistic and other pervasive experts in college for confirming. Only verified users can use
978-1-4799-2860-6/13/$31.00 ©2013 IEEE
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). 1D9o9wnloaded on May 26,2026 at 22:51:03 UTC from IEEE Xplore. Restrictions apply.

this system. Checkers can only modify their own data. For divided into administration subsystem, assessment sheet
those who failed to be verified by experts, the system can only generation subsystem, expert guidance subsystem. Each
offer them the sample table of their required age group. subsystem has its own modules. There are three kinds of users,
administrator, checker and experts. In order to ensure the
C. Requirements of Experts
security of the users’ information, each has his own different
The guidance experts are those who have the title of a login option interface. Structure of
senior professional post or those who are verified by the
authority. They can recheck the assessment results and provide V. DWELL ON MODULE OF EACH SYSTEM PART
the specific rehabilitation training plan. They also need to give For the limitation of thesis, this thesis only introduces some
comprehensive suggestions to the complex situation. parts of modules functions.
IV. FRAMEWORK OF SYSTEM FUNCTION
According to the requirements of the system, the system is
Figure 1. Function and structure of development assessment system for children with autism
assessment of rehabilitation training will be made. For the
A. Assessment Table Generating Subsystem
second, third and fourth time, periodic assessment of the effect
After the checker logging on the system, he has to type in of rehabilitation training will be made. The system can
the child’s information or add new information. The webpage automatically collect the remaining information of the child.
automatically turn to page of child’s information. In order to When the checker logs on, the system automatically reminds
ensure the uniqueness of the data, the child’s ID card number him to finish the remaining items.
(or his/her parents’) is needed and the information will be
B. Data Processing and Output Subsystem
searched and discriminated. When the information of the child
is confirmed, the system will give a unique code to the child (1)The methods of development assessment of autism
(assessment code of autism child’s condition). The checker can children evaluation table are sensory perception, gross motor,
get the information of the child when he types in the code. The fine motor, language and communication, cognition, social
system can automatically generate a table according to the birth interaction and self-help ability.
date of the child. The checker can also refer to the child’s
The rating system of these methods consists of Pass (P),
intelligence to choose the items of assessment. When the items
intermediate reaction (E) and fail (F). P represents 1 point,
are confirmed, the check can choose to print them or present on
indicating that child can finish a specific item independent. E
the computer screen, and record the data. According to the
do not count point, indicating that child has the consciousness
requirement of Development Assessment of Children with
of finishing the item also failed to do it, or means that the child
Autism Evaluation Form (Trial), the autism children should be
can finish it with the help of others. The intermediate reaction
evaluated for four times. For the first assessment, diagnostic
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). 2D0o0wnloaded on May 26,2026 at 22:51:03 UTC from IEEE Xplore. Restrictions apply.

can be translated to specific item. F counts 0 point, indicating (A), mild (M), severe (S). Absence (A) means children with
that the child cannot finish the mission even with the help of proper emotion and behavior adaptive to their age. Mild (M)
others. X(ungraded) means this item is not suitable for the means children with subtle abnormalities (slower than children
child. of the same age or infrequency of occurrence of abnormal
emotion or behavior). Severe (S) means children with extreme
(2) Grading on emotion and behavior. Clinical judgment is
abnormal emotion or behavior on intensity, nature and trait and
adopted as a grading principle in emotion and behavior, with
with frequent occurrence. X (ungraded) means children are
relative terms such as “age-adaptive”, “within normal limits”
substandard on age or capacity, hence they are not adequate for
etc. Normally, three degrees of grading are accepted: absence
this project.
Figure 2. Development Profiles of Children with Autism
(3) Charting of grading. After grading, evaluations of for capability development and the dotted one stands for
children will be put in this system to be transformed into individualized training goal.
“Development Profile of Children with Autism” and “Emotion
The evaluation results of “emotional behavior” are
and Behavior of Children with Autism”. (See Figure 2 &
transformed into pie chart of “presentation of emotional
Figure 3)
behavior of children with autism”. Add up all the items within
Transform evaluations of “sensory perception”, “gross the evaluation scope of (A), (M) and (S) respectively to get
motor”, “fine motor”, “language and communication”, three total scores. Get a preliminary judgment of the degree of
“cognition”, “social communication” and “operational abilities the emotional and behavioral problem on children. Mark the
in everyday life” into pie chart of “Development of Children evaluation results (absence mild severe) of each item within
with Autism Chart”. According to the scores of passing items, evaluation scope on the cross point of the latitude and
mark the corresponding score point on chart. Add up the total longitude lines on pie chart. The first circle from inside of the
scores of “middle items (E)” with total scores of pass items to a pie chart signifies severely abnormal(S), the second circle
total score in one field and mark the corresponding point of the signifies mildly abnormal (M), the third circle signifies no
filed on chart. Join each score point of passing items of each abnormal. Join two adjacent junctions with solid lines.
filed with solid lines and middle items with dotted lines. Thus, Compare the severity of children’s emotional and behavioral
there are two lines forming on the chart: the solid one stands problem from this to make educational goal and plan of
rehabilitation training.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). 2D0o1wnloaded on May 26,2026 at 22:51:03 UTC from IEEE Xplore. Restrictions apply.

Figure 3.  Emotion and Behavior of Children with Autism
|     |     |     |     | children,  | solves  the  problem  | of  expert  resources  | shortage,  |
| --- | --- | --- | --- | ---------- | --------------------- | ---------------------- | ---------- |
VI.  SUBSYSTEM OF EXPERT GUIDANCE
facilitates the rapid development of rehabilitation career of
| According  | to  the  requirements  | of  training  | manual  of  |     |     |     |     |
| ---------- | ---------------------- | ------------- | ----------- | --- | --- | --- | --- |
children with autism in China and makes sure that all the
Development Evaluation of Children with Autism, concrete
children can grow up happily and healthily.
proposal of rehabilitation training could be offered to children
with autistic tendency on single item survey. As for those with
REFERENCES
complicate comprehensive test results or evaluators couldn’t
|     |     |     |     | [1]  Wanf  | Hui,  Li  Xiaoqing,  | LI  Xiaojuan.  A  Review  | of  Research  on  |
| --- | --- | --- | --- | ---------- | -------------------- | ------------------------- | ----------------- |
offer rehabilitation training proposal due to their limited ability,
Assessment Tool for Children with Autism in China. Chinese Journal of
evaluators  file  a  petition  and  system  will  notify  experts  Special Education, pp. 54-59, 2009.
| automatically.  | Experts  | of  children  autism  | recover  from  |     |     |     |     |
| --------------- | -------- | --------------------- | -------------- | --- | --- | --- | --- |
[2]  Liu Zhiyun, Rresearch status on children with autism . Chin J Prev
universities  will  give  concrete  rehabilitation  training  plans  Contr  Chron  Non-commun  Dis,February,  pp.  104-107,  2008,Vol.
| according to their evaluation and follow-up guidance for future  |     |     |     | 16,No.1.  |     |     |     |
| ---------------------------------------------------------------- | --- | --- | --- | --------- | --- | --- | --- |
training [5].  [3]  National  Federation  of  the  Disabled.  Development  Assessment  of
|     |       |             |     | Children                                      | with  Autism  | Evaluation  | Form  (Trial).  |
| --- | ----- | ----------- | --- | --------------------------------------------- | ------------- | ----------- | --------------- |
|     |       |             |     | http://www.cdpf.org.cn/2008old/ggtz/content/  |               |             | 2009-09/23/     |
|     | VII.  | CONCLUSION  |     |                                               |               |             |                 |
content_30256846.htm
The application of Development Evaluation of Children  [4]  Gu  Jiangping,  Web-based  online  examination  system  for  network
with  Autism  system  on  the  Internet  greatly  promotes  the  teaching .  Journal of chifeng University (Natural Science Edition), pp.
development  of  the  evaluation  and  rehabilitation  career  of  43-45, 2011.
children with autism in China. Take full advantages of network,  [5]  Chen Yuan.  Charcteristics of Children with Autism and Training
the application enhances the efficiency of evaluation of autistic  Tactics. .  Journal of Minjiang University. pp. 64-67, 2004.

Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). 2D0o2wnloaded on May 26,2026 at 22:51:03 UTC from IEEE Xplore.  Restrictions apply.