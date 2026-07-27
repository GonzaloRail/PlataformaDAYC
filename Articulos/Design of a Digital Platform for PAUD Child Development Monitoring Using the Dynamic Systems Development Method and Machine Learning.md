Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
Design of a Digital Platform for PAUD Child Development Monitoring Using
the Dynamic Systems Development Method and Machine Learning
Rachmat Destriana*1, Muhamad Luthfi Aksani2, Dyas Yudi Priyanggodo3, Revalina Farzani4
1,2,3,4Informatics Study Program, Muhammadiyah University of Tangerang, Tangerang, Indonesia
Email: 1rachmat.destriana@umt.ac.id
Received : Jun 26, 2025; Revised : Jul 10, 2025; Accepted : Jul 31, 2025; Published : Okt 21, 2025
Abstract
This study aims to design a digital platform for monitoring early childhood development in PAUD (Pendidikan Anak
Usia Dini) institutions by integrating Machine Learning (ML) into the Dynamic Systems Development Method
(DSDM) framework. The research addresses persistent challenges in traditional monitoring systems, which are
typically manual, fragmented, and lack real-time responsiveness. Utilizing a Research and Development (R&D)
approach, the platform was developed iteratively with active involvement from teachers, parents, and administrators
of PAUD institutions. System modeling employed Unified Modeling Language (UML), while ML techniques such
as Decision Trees were trained on datasets sourced from PAUD Flamboyan in Tangerang. Key platform features
include child data input, growth visualization, predictive analytics, and interactive dashboards. The system underwent
black-box testing and usability assessments, achieving an average usability score of 4.5 out of 5. The ML model
demonstrated statistically valid and reliable performance with 89% accuracy, 85% precision, and 87% recall in
predicting developmental delays. The findings highlight the effectiveness of the DSDM approach in facilitating
adaptive system development, and underscore the value added by ML integration in enhancing decision-making
within early childhood education. The platform not only streamlines developmental monitoring but also supports
early interventions. Future work is recommended to broaden data sources, enrich personalization, and scale
deployment across varied PAUD contexts. This study contributes to the advancement of intelligent decision support
systems in early childhood education, enabling more accurate developmental monitoring and timely interventions.
Keywords : Digital Monitoring System, DSDM Method, Early Childhood Development, Machine Learning,
Predictive Analytics.
This work is an open access article and licensed under a Creative Commons Attribution-Non Commercial
4.0 International License
1. INTRODUCTION
Childhood Education (PAUD) plays a crucial foundational role in the cognitive, social, and
emotional development of children. In Indonesia, PAUD is strategically important in preparing children
before they enter basic education. However, many PAUD institutions continue to face significant
challenges, particularly in terms of comprehensive and sustainable monitoring of children's
development[1][2]. In 2021, the PAUD Gross Participation Rate (APK) reached 57.71%, while in 2022 it
increased to 64.14%, although it remained below the target of 74.55%.[3] [4] [5]. Based on data from the
Ministry of Education, Culture, Research, and Technology in the last 5 years, only around 34.61% of
children aged 5-6 years are adequately served by the PAUD program and many PAUD institutions, one of
which includes Flamboyan PAUD in Tangerang and is a challenge that must be faced in monitoring child
3587

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
development. The Monitoring system used moment this tend Still is manual, fragmentary, and does not
allow reporting in real-time. This is caused low effectiveness communication between educators and
parents, as well as a delay in intervention when children show symptoms of delayed development [6].In the
era of digital transformation, the conventional approach kind of this need improved with the implementation
of adaptive and intelligent technology [7]. One of the evolving approaches in development system modern
information systems is the use Dynamic Systems Development Method (DSDM), which is iterative and
agile, as well as capable respond change needs of user in a dynamic way [8] [9]. However, for answer
challenge complex in monitoring developments PAUD children in general precision, integration machine
learning technology becomes solution potential innovation [10] [11]. Machine learning models can utilized
For analyze patterns development child, detect anomaly in a way early, and give recommendation
personalized learning [12]. Some study previous show that implementation digital system in education child
age early can increase effectiveness administration and quality communication between teachers and
parents [13] [14]. Implementation studies conducted in various regions, including Tangerang, show that
digital platforms can support monitoring development child in a way more accurate and efficient [15] [16].
However, the use of machine learning in context this Still seldom explored in a way systematic, even though
the potential is very large For strengthen system taking decision data based [17]. Therefore that, research
this aiming for to design a digital platform for monitoring developments PAUD children who do not only
build with DSDM approach, However, this system also incorporates machine learning models to support
analysis and development in real-time and predictively. With this integration, it is anticipated that this
system will become a smart technological aid to support stakeholder involvement in developmental
monitoring, evaluate, and respond optimally to the needs of development children. To make the research
structure clear, the issue is that PAUD institutions do not have integrated, real-time monitoring. The gap is
in the limited application of machine learning for predictive analysis, even though current digital
approaches employing techniques like DSDM offer improvements. In order to improve early detection and
data-driven interventions in child development, this study integrates machine learning (ML) into a DSDM-
based platform.
2. METHOD
2.1. Types and Methods of Research
This research uses the Research method and Development (R&D) with the Dynamic Systems
Development Method (DSDM) approach because it is considered suitable for iterative and collaborative
information system development, especially in designing a digital platform for monitoring the development
of PAUD children [18] [19] [20]. Integration of machine learning models learning becomes the main focus
to improve the system's ability to analyze and predict child development in real- time and adaptively. The
object of the research is the information system being developed, while the subjects include PAUD teachers,
parents of students, and admins from partner PAUD institutions. The initial stages in system development
begin with a literature study and needs analysis, which includes a study of child development standards,
DSDM methods, and the application of machine learning. learning, as well as referring to the framework
CRISP-DM for ML model integration. Researchers also conducted direct observations at PAUD
Flamboyan Tangerang and interviews with teachers, parents, and admins to explore system needs from
various perspectives. The results of the study were analyzed and formulated in User Requirements
3588

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
Specification (URS) which contains functional and non-functional requirements, system flow, and technical
limitations, which then become the basis for the system design and development process.
Figure 1. Approach Study
2.1.1. Design System using Unified Modeling Language (UML)
Once user needs are identified through the User document Requirements Specification (URS), the
next stage is system design using the Unified Modeling Language (UML) approach. UML was chosen
because it is able to describe the structure and behavior of the system in a structured manner and is easy to
understand by developers and non-technical users [21] [22]. Several UML diagrams are used in this study,
starting from the use Case diagrams to describe the interactions between actors (admins, teachers, and
parents) with the main functions of the system. Activity diagrams are then used to explain the main process
flow, such as inputting child development data and report retrieval. To detail the communication flow
between components, a sequence diagram is created to show the sequence of interactions between objects
during the process. Finally, a class diagram is developed to map the system data structure, including student
entities, teachers, development aspects, and relationships between objects. This design is the foundation for
system implementation, both in terms of interface design, programming logic, and database structure, in
order for the finished product to appropriately reflect user needs and be prepared for integration with the
machine learning module. The research team's primary development environment for the digital monitoring
system was Visual Studio Code, with MySQL and PHP (Laravel framework) supporting database and
backend administration. Figma was used to design the system interface, and XAMPP was used for local
testing. Using Python and the scikit-learn, pandas, and numPy libraries, model training was carried out for
the machine learning component. A Flask-based REST API was used to deploy and integrate the trained
Decision Tree model into the main platform. GitHub was used to manage collaboration and version control,
and Microsoft Word and draw.io were used to create system documentation and UML diagrams,
respectively.
3589

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
2.1.2. Machine Model Integration Learning into the System.
Machine model integration learning is carried out to improve the system's ability to analyze child
development data predictively and adaptively [23]. This stage begins with collecting child development
data from partner PAUD institutions, which then goes through a preprocessing process to ensure the quality
and consistency of the data used in model training. There were several important steps in the preprocessing
phase. In order to deal with missing or inconsistent entries, especially in scoring fields for developmental
indicators, data cleaning was done first. To guarantee consistent value ranges across features like fine motor
skills, cognitive scores, and language abilities, data normalization was then implemented using min-max
scaling. The goal of this step was to avoid feature dominance and maximize algorithm performance.
Moreover, data balancing was carried out using random oversampling to prevent bias toward the majority
class during model training, given the dataset's moderate class imbalance between "Normal" and
"Hampered" labels. Next, the machine learning algorithm is selected appropriate learning, such as Decision
Tree or Random Forest, based on the system's needs in classifying and predicting aspects of child
development. The model is then trained using a prepared dataset, and evaluated using accuracy and
precision metrics to ensure optimal performance. The trained model is then integrated into a digital platform
using an API or separate module that can be called when the system needs predictions or recommendations.
The prediction results are displayed in real -time on the teacher and parent dashboard as material for
evaluating child development. This integration allows the system to not only be a recording tool, but also
an intelligent decision support in detecting potential developmental delays early on.
From a mathematical standpoint, the integration of the machine learning model specifically a
Decision Tree Classifier—relies on entropy-based optimization to guide the learning process. The classifier
aims to partition the input space in a way that maximizes information gain with respect to the target class
labels.
Let the dataset D consist of instances (x,y) where x ∈ R6 represents the feature vector of a child
i i i
(including Age in Months, Fine Motor, Gross Motor, Cognitive, Language, and Socio-Emotional scores),
and y ∈ {0,1} denotes the class label (0 = Normal, 1 = Hampered).
i
The entropy of the dataset D is computed as:
𝐸𝑛𝑡𝑟𝑜𝑝𝑦(𝐷) = −𝑝0 𝑙𝑜𝑔2(𝑝0) − 𝑝1 𝑙𝑜𝑔2(𝑝1) (1)
Where p and p represent the proportion of samples in each class (Normal and Hampered,
0 1
respectively). To determine the best feature to split on, the algorithm calculates the Information Gain (IG)
for each attribute A :
|𝐷𝑣|
𝐼𝐺(𝐷,𝐴) = 𝐸𝑛𝑡𝑟𝑜𝑝𝑦(𝐷)−∑ .𝐸𝑛𝑡𝑟𝑜𝑝𝑖 (𝐷𝑣) (2)
𝑣∈𝑉𝑎𝑙𝑢𝑒(𝐴)
|𝐷|
This recursive process continues until the model reaches stopping criteria such as maximum depth,
minimum samples per node, or pure leaf nodes.
After the model is trained, it maps any new feature vector x ∈ R6 to a predicted label h(x) ∈ {0,1}.
The model is evaluated using the following standard metrics:
TP+TN
Accuracy :
TP+TN+FP+FN
TP
Precision :
TP+TN
TP
Recall :
TP+FN
3590

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
Where:
• TP = True Positives (correctly predicted "Hampered"),
• TN = True Negatives (correctly predicted "Normal"),
• FP = False Positives,
• FN = False Negatives.
This mathematical formulation ensures that the system’s prediction mechanism is not heuristic but
grounded in statistical learning theory, providing robustness and interpretability for early developmental
delay detection in children.
2.1.3. System Development using DSDM approach
The system development stage using the Dynamic Systems Development Method (DSDM) approach
is carried out iteratively and focuses on active user involvement during the design process [24]. DSDM was
chosen because of its flexibility in responding to changing needs and its ability to encourage collaboration
between the development team and stakeholders [25][26]. Development activities begin with a Feasibility
Study, where an analysis of the technical, operational, and economic feasibility of the designed system is
carried out. At this stage, it is also ensured that the PAUD partner infrastructure supports the implementation
of a web-based and machine learning digital system. learning, Next, enter the Business Study, which is the
stage where researchers compile the system's business flow based on the work process in the field. Data
from the needs study is used as the basis for creating a system usage scenario by admins, teachers, and
parents. At the Functional Model Iteration stage, the team designs and validates an initial prototype of the
system interface based on the previously formulated functional requirements. The prototype is tested on a
limited basis by users (PAUD teachers and admins) to identify feedback on the design, navigation flow,
and main features of the system. After initial validation, the stage continues to Design and Build Iteration,
where system development is carried out in stages based on an approved design. System components, such
as child development data input, account management, machine learning integration learning, and report
dashboards, are built modularly and tested at each iteration. The final stage is Implementation, which is the
process of integrating all system modules and implementing them in the PAUD partner environment. At
this stage, user training and documentation of system usage are also carried out. In addition, final
improvements are made based on the results of the trial and input from users to ensure that the system runs
as expected and is ready to operate. Through this DSDM approach, system development is carried out with
a collaborative, fast, and adaptive approach to the dynamics of needs in the field.
Figure 2. DSDM stage diagram with machine learning integration flow
3591

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
2.1.4. System Testing and Validation.
After the system is developed, the next stage is to conduct trials and validation to ensure that all
functionality runs according to user needs. Trials are carried out on a limited basis in the PAUD partner
environment, especially by teachers, parents, and admins as the main users of the system. Black box method
Box testing is used to test each system feature from the user side, without seeing the program code directly
[27][28]. This testing includes the login menu, child development input, report access, communication
features, and visualization of prediction data from the machine learning model. learning, each test is
evaluated based on the conformity of the output results with initial expectations. In addition to technical
testing, usability testing is also carried out by involving users to evaluate aspects of comfort and ease of use
of the system. Teachers and parents are asked to use the system directly and provide input regarding
interface design, navigation, access speed, and clarity of information displayed. To validate the quality of
the system, observations are made of user interactions with the system, short interviews, and questionnaires
are distributed to measure the level of satisfaction and benefits of the system for monitoring child
development activities. Feedback obtained from users is the basis for further improvement or development.
The results of the trial showed that the system was able to run well functionally, and the integration of the
machine learning model learning successfully provides added value in the child monitoring process.
Validation from users shows a positive level of acceptance, although some development suggestions are
still needed to improve system performance in the future.
2.1.5. System Documentation and Evaluation
The final stage in the system development process is documentation and evaluation, which aims to
record the entire development process and assess the success of the system from various aspects.
Documentation is carried out comprehensively, covering system specifications, development flow based
on the DSDM approach, interface design, database structure, machine learning algorithms. learning used,
as well as the results of the trial [29][30]. The documentation also records each iteration of improvements
made during the development process, including feedback from users and corrective actions taken. In
addition, a system usage guide (user manual) is prepared to help teachers, parents, and admins operate the
platform independently. The system evaluation is carried out holistically by reviewing aspects of the
functionality, usability, reliability, and benefits of the system for the child development monitoring process.
This evaluation also considers the effectiveness of the integration of the machine learning model learning
in providing predictions and recommendations for child development in real- time, From the evaluation
results, the system is considered capable of meeting the main needs of users in monitoring the development
of PAUD children comprehensively and efficiently. However, several notes for improvement are prepared
as recommendations for further development, such as increasing interface responsiveness, enriching report
features, and optimizing the performance of machine learning models. learning based on bigger data in the
future.
2.1.6. Integration of Machine Learning Models
The main focus of this study is to integrate the machine learning model learning into the system to
improve the ability to analyze and predict child development in real time, The object of this study is the
PAUD child development monitoring information system that was developed, while the research subjects
included PAUD teachers, parents of students, and admins from PAUD institutions that were partners in
implementing the system. The development process began with a literature study and needs analysis that
3592

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
included a review of references on child development, PAUD standards, DSDM methods, and the
application of machine learning in the education system. Researchers also refer to the CRISP-DM
framework as a guide in machine integration learning, in addition to literature studies, direct observations
were conducted at PAUD Flamboyan Tangerang to understand the ongoing monitoring process, as well as
interviews with teachers, parents, and admins to explore user needs and expectations of the system. The
results of this stage are formulated in the User document Requirements Specification (URS) which contains
functional and non-functional requirements, system flow, and technical limitations, and is the main
reference in the next system design and development stages.
To strengthen the mathematical foundation of the model integration, the implementation of the
Decision Tree Classifier in this system is governed by a formal optimization criterion that partitions the
feature space based on maximum information gain. Formally, the classifier constructs a hypothesis function
h:Rd →{0,1}, where d=6 (the number of child development indicators).
Each decision node evaluates a split on attribute A using the Information Gain criterion:
|𝐷𝑣|
𝐼𝐺(𝐷,𝐴) = 𝐸𝑛𝑡𝑟𝑜𝑝𝑦(𝐷)−∑ .𝐸𝑛𝑡𝑟𝑜𝑝𝑖 (𝐷𝑣) (3)
𝑣∈𝑉𝑎𝑙𝑢𝑒(𝐴)
|𝐷|
where Entropy(D)Entropy(D) is defined as:
2
𝐸𝑛𝑡𝑟𝑜𝑝𝑦(𝐷)= −∑ Pc 𝑙𝑜𝑔 (𝑃) (4)
𝑐∈{0,1} 2 𝑐
and P is the probability of class c in dataset D. The model recursively builds a tree that minimizes
c
classification impurity, where the resulting structure can be interpreted as a series of indicator-based
decision rules.
Once integrated into the system, the trained model accepts input vectors x = [x1,x2,...,x6]
representing a child’s profile and outputs the predicted class y = h(x) ∈ {0,1}, where:
• x1x_1: Age in months
• x2x_2: Fine motor skills score
• x3x_3: Gross motor skills score
• x4x_4: Cognitive score
• x5x_5: Language score
• x6x_6: Socio-emotional score
For system-level deployment, the classifier is embedded within a web-based architecture through a
RESTful API end point. Upon each user request, the system applies the function h (x) to produce the real-
time prediction.
The integration enables not only deterministic inference but also the basis for further extensions such
as probabilistic classification using softmax-transformed decision scores or Bayesian averaging for
uncertainty estimation. These enhancements offer deeper analytical capabilities to support high-stakes
decision-making in early childhood interventions.
2.2. Testing System
Testing system done with Black Box Testing method for ensure all over function system walk in
accordance design[31], In order to gauge user satisfaction and convenience, usability testing was also done
on parents and teachers.
3593

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
2.3. Validation and Evaluation
Validation through observation live and interview to user system [32]. Evaluation done based on
effectiveness system in assist in the process of monitoring developments child as well as machine learning
model performance in give predictions and recommendations development.
3. RESULT
3.1. System Design Using UML
System design done use Unified Modeling Language (UML) approach to modeling structure and
behavior system visually, Several UML diagrams are used for describe the whole process and interaction
in system, First, a use case diagram is drawn up. For identify actor main, namely teachers, parents, and
admins, along with the interaction with Features system such as input of development data, access reports,
and management account, Next, activity diagram is used For describe channel activity user in system, start
from the login process to making report development child, Sequence diagrams are used For show order
interaction between component during the process of inputting and processing development data ongoing,
While that, class diagram is composed For represent deep data structure system, including relation between
entity such as student data, aspects developments, users, and reports, Use of UML in design This aiming
For ensure that system built with structure logical, easy understood by the team developers, as well as in
accordance with need users who have formulated in URS document. The use of UML ensures that system
development is based on the real needs of users (teachers, parents, administrators). This is crucial for
minimizing miscommunication between the technical team and non-technical users, ensuring the system is
truly usable and ready for functional testing. Clear diagrams also speed up the iteration and debugging
process during implementation.
Figure 3. System Design Using UML
3.2. Overview of the Developed System
The system developed is a web -based digital platform designed for helping teachers and parents in
monitor development child age early in real-time. System This built with Dynamic Systems Development
Method (DSDM) approach and integrated with machine learning models for support analysis predictive to
3594

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
aspect development child, Main features system covers student data management, development data input,
visualization graphs, reports development, as well as prediction development based on historical data. The
successful design and construction of a complete system demonstrates the effectiveness of the DSDM
approach in fostering user engagement throughout development. This increases the likelihood of the
system's acceptance and active use in early childhood education settings. The features provided also provide
a strong foundation for broader adoption and the development of advanced features such as data-driven
interventions.
Figure 4. Overview of the Developed System
3.3. Implementation of Machine Learning Model
Machine learning models are used for predict possibility delay development based on the data that
has been collected, Algorithm used is a Decision Tree, with a dataset consisting of over 150 entries
development child from Flamboyan PAUD, after preprocessing and data division into 80% training and
20% testing, the model produces accuracy of 89%, precision 85%, and recall 87%.
Figure 5. Implementation of Machine Learning Model
This outcome demonstrates that the model is sufficiently dependable to provide predictions to assist
parents' and teachers' decisions.
3595

Jurnal Teknik Informatika (JUTIF)    Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863    https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871    DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958

Table 1. PAUD Child Development Dataset
Student Age_Mo Fine Motor  Gross Motor  Cognit Langu Social_Emot Status_Per_ke
| _ID  | nths  | Skills  |     | Skills  | ive  age  | ional  |     | mbang     |
| ---- | ----- | ------- | --- | ------- | --------- | ------ | --- | --------- |
| 1    | 60    | 4       |     | 5       | 4  4      | 5      |     | Normal    |
| 2    | 62    | 5       |     | 5       | 5  4      | 5      |     | Normal    |
| 3    | 59    | 3       |     | 4       | 3  2      | 3      |     | Hampered  |
| 4    | 61    | 4       |     | 4       | 4  3      | 4      |     | Normal    |
| 5    | 58    | 2       |     | 3       | 3  2      | 3      |     | Hampered  |

Test Results System
Black box testing and usability testing techniques are used in the testing process. Black box testing
demonstrates that all major systems, including login, data input, display graphics, and print reports, operate
well and legitimately. The table below displays the summary findings of black box testing on a number of
key features :

Table 2. Blackbox Testing Results
|     | Tested Features  |     |     | Expected results  |     |     | Testing Status  |     |
| --- | ---------------- | --- | --- | ----------------- | --- | --- | --------------- | --- |
User Login  Login form appears and authenticate succeed  Valid
|     | Development Data  |     | Data is saved and displayed return  |     |     |     | Valid  |     |
| --- | ----------------- | --- | ----------------------------------- | --- | --- | --- | ------ | --- |
Report Development  Report can print according to filter  Valid
Visualization Chart  Chart come on stage based on development data  Valid
ML Prediction  Prediction come on stage according to input data  Valid

These results demonstrate that the model is quite reliable in detecting potential developmental delays
in children. Thus, the system is not merely administrative but also provides added value as a data-driven
decision-making tool (intelligent decision support). This is particularly relevant in the early childhood
education (ECE) sector, where predictive or analytical interventions are still limited. The successful
integration of the ML model also opens up opportunities for future expansion of predictive features.
3.4.  Usability Testing Results

Figure 6. Graph stem Usability Testing

|     |     |     |     | 3596  |     |     |     |     |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- |

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
Usability testing is performed against 10 users, consisting from 5 PAUD teachers and 5 parents, Test
results show that system to obtain average score 4.5 out of 5 for convenience usage, and 4.7 out of 5 for
utility information, Some bait return and suggest enhancements to the mobile device's speed access system
and design interface. This score indicates a high level of user acceptance, an early indicator that the system
is suitable for wider implementation. In the context of educational technology, high usability means users
have no difficulty understanding or operating the system, thus reducing barriers to technology adoption.
This strengthens the potential for sustainability and effectiveness of the system's use in everyday practice
in early childhood education.
3.5. Analysis Findings
Based on test results, system rated has fulfil need user from aspect function, convenience access, and
speed in give information development child, Machine learning integration is proven can give prediction
accurate development and assist teachers in compile appropriate interventions, The availability of visual
graphs and real-time reports also helps parents better understand how their children are developing. These
findings demonstrate that the system successfully bridges the communication gap between teachers and
parents in understanding child development objectively and visually. The availability of real-time
predictions also allows teachers to more quickly design interventions if delays are detected. The system is
not only technically efficient but also pedagogically meaningful, as it encourages collaboration and more
systematic monitoring of child development.
Table 3. Findings
Findings Description
Satisfaction High User The majority of users (parents and teachers) said the system was
informative and simple to use.
Communication Communication between teachers and parents helped with reports and
Features Effective visualizations development in real-time.
Identification Machine Learning Models are successful give prediction developments
Intervention Accurate approaching fact field,
Possible Development A number of feature additions and fixes interface proposed for version
Continues furthermore,
4. DISCUSSIONS
4.1. Main Findings
Examine is successfully creates a digital platform for tracking advancements. PAUD kids using the
DSDM method and integrating machine learning models, Features main such as development input
children, visual reports, and prediction development based on historical data has walk in accordance
expectations, According to test results, the system is operating well technically and is well-liked by users.
A machine learning model is used to provide a fair prediction with an accuracy of 89%.
4.2. Analysis of Results and Implications
The results of the study show that the DSDM approach is effective in developing systems in a step-
by-step manner and based on user feedback. Machine learning integration learning allows the system to
3597

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
provide added value in the form of predictions that can help in early detection of child development
problems. Users' positive feedback shows that the system satisfies their expectations in terms of usability,
functionality, and real-world advantages. Although this system is not directly used in a medical context, it
has the potential to support earlier and more targeted child development interventions. With digitally stored
data and predictive analytics capabilities, teachers and parents can take action more quickly when
indications of developmental delays are found. This is important to encourage preventive interventions
before child development problems become more complex.
One key limitation of the model is its limited generalizability. Since the training data came from
only one PAUD institution, the model may not perform as well in other schools with different contexts.
The small sample size and potential subjectivity in some indicators, such as socio-emotional scores, also
affect prediction accuracy. Future improvements should include data from multiple institutions to ensure
the model is more reliable and widely applicable.
4.3. Limitations
There are several limitations to this study, including the relatively small amount of data small so
machine learning models have not Can generalized to all over population PAUD children, in addition, the
trial system only done on one partner PAUD institutions, so that not yet reflect variation conditions in other
institutions, Limitations infrastructure and digital literacy of users also become challenge in implementation
system in a way wide.
4.4. Future Research Directions
Additionally, research can be conducted to strengthen the generalization of machine learning models
by expanding data coverage from multiple PAUD institutions. In addition, the integration features more
analytics complex, such as recommendation personalization learning based on profile development
children, can also developed, Addition feature interactive such as video conferences between teachers and
parents and a special dashboard psychologist or expert development child can become direction
development system to front.
Furthermore, the findings of this study are in line with recent literature that highlights both the
potential and the challenges of applying machine learning in early childhood education. For instance, [23]
demonstrated the effectiveness of machine learning models in predicting developmental risks in children
within social care environments, reporting high diagnostic accuracy in diverse populations [23]. Likewise,
showed the feasibility of mobile-based machine learning systems for tracking developmental progress in
under-resourced educational settings [18]. These studies affirm that intelligent systems can augment
traditional developmental monitoring with real-time predictive insights. However, other works have also
noted important implementation challenges. Emphasized the need for proper training among educators and
pediatric staff to understand and trust machine learning outputs, as well as the ethical considerations in
labeling young children based on algorithmic predictions [7]. In light of this, while the integration of
machine learning in the current study yielded high prediction performance and positive user reception, its
deployment must be contextually aware. Systems must ensure transparency, explainability, and alignment
with educational goals in PAUD institutions. Future system enhancements may consider embedding
interpretability features or providing educator support materials to improve the adoption and responsible
use of predictive analytics in early education.
3598

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
5. CONCLUSION
The findings of the study demonstrate that an efficient DSDM approach can be used to build systems
that are responsive to user needs and iterative. The ability to predict and identify potential delays in a child's
development is a significant benefit of integrating machine learning models. Teachers' and parents' positive
responses to the trial system using black box and usability testing techniques demonstrate that the system
is operating in compliance with the specifications that were designed and obtained. The accuracy level of
the model reached 89%, indicating sufficient performance Good in context monitoring development child,
In Overall, The system created is not only able to improve the monitoring process's efficiency, but also
supports interventions that are of a nature preventive in management grow flower child. Therefore, this
research not only contributes to improving the effectiveness of child development monitoring and early
interventions in PAUD institutions but also provides a practical reference for the integration of machine
learning into agile-based system development. Specifically, it advances the field of computer science and
information systems by demonstrating how predictive analytics can be embedded into real-time educational
platforms through an iterative and user-centered development approach. This study contributes to the field
of computer science and information systems by demonstrating the integration of machine learning into an
agile-based educational platform. Future research may explore hybrid ML models to improve prediction
accuracy and integrate smart reporting features to support automated recommendations and clearer
communication for PAUD stakeholders.
REFERENCES
[1] Suharsiwi and W. Pandia, “Description of Teachers’ and Parents’ Practices in Dealing with Young
Children’s Developmental Delay,” pp. 236–240, 2020, doi: 10.2991/assehr.k.200130.122.
[2] A. Lestariningrum, “Management and Sustainability Challenges of Early Childhood Education
Institutions in Pandemic Era,” pp. 18–23, 2021, doi: 10.2991/ASSEHR.K.211028.087.
[3] I. Kertati, “IMPLEMENTASI KEBIJAKAN PENYELENGGARAAN PENDIDIKAN USIA DINI
(PAUD) DI KOTA SEMARANG,” Mimb. Adm. FISIP UNTAG Semarang, 2021, doi:
10.56444/mia.v18i1.2163.
[4] I. Istiniah, L. P. Syakema, L. Susanti, M. Merlina, and S. H. Julianti, “Partisipasi 3 PAUD Kota
Palangka Raya atas APK dan Sisdiknas-RPJMN Tahun 2020-2024,” Real Kiddos J. Pendidik. Anak
Usia Dini, 2023, doi: 10.53547/realkiddos.v1i2.313.
[5] A. Salsabila and B. Budyanra, “Determinan status partisipasi pendidikan anak usia dini di Pulau
Jawa tahun 2019,” J. Kependud. Indones., 2022, doi: 10.14203/jki.v17i1.677.
[6] N. Wati, D. Brata, W. Firdaus, Y. C. Ummah, and R. A. K. Mahatmaharti, “THE ROLE OF
TEACHERS COMMUNICATION THROUGH THE PATTERN OF EARLY CHILDHOOD,”
Humanit. Soc. Sci., vol. 8, pp. 596–601, 2020, doi: 10.18510/hssr.2020.8171.
[7] B. Mardina et al., “Integration of Artificial Intelligence in Pediatric Education: Perspectives from
Pediatric Medical Educators and Residents,” Healthc. Inform. Res., vol. 30, pp. 244–252, 2024, doi:
10.4258/hir.2024.30.3.244.
[8] S. Rohajawati, S. Indria, P. Rahayu, H. Akbar, and D. Sensuse, “Implementing DSDM and OO
Method to Develop Billing in Mental Hospital,” J. Phys. Conf. Ser., vol. 1566, 2020, doi:
10.1088/1742-6596/1566/1/012059.
[9] M. Sobarnas, Iskandar, and A. Imamuddin, “The Development of a Software Tool for Improvement
Tracking System Using Dynamic Systems Development Methodology,” IOP Conf. Ser. Mater. Sci.
Eng., vol. 1156, 2021, doi: 10.1088/1757-899X/1156/1/012009.
[10] B. Pardamean, G. Elwirehardja, M. Isnan, R. Rahutomo, and F. Asadi, “Machine Learning
3599

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
Implementations in Childhood Stunting Research: A Systematic Literature Review,” 2023 Int. Conf.
Inf. Manag. Technol., pp. 229–234, 2023, doi: 10.1109/ICIMTech59029.2023.10277881.
[11] A. Pujitresnani et al., “Differences in syntactic and semantic analysis based on machine learning
algorithms in prodromal psychosis and normal adolescents.,” Asian J. Psychiatr., vol. 85, p. 103633,
2023, doi: 10.1016/j.ajp.2023.103633.
[12] Suparno and E. K. Ulni, “Developing a model of teaching patterns recognition based on sorting
predict-think discovery for children aged 5-6 years,” J. Phys. Conf. Ser., vol. 1511, 2020, doi:
10.1088/1742-6596/1511/1/012050.
[13] A. Permadi, A. N. Ismiatun, Andrisyah, B. Aditya, and A. R. Atika, “Digital disruption in early
childhood education: A qualitative research from teachers’ perspective,” Procedia Comput. Sci.,
2022, doi: 10.1016/j.procs.2021.12.169.
[14] R. Rohita, “The Ability of Ece Teachers to Use ICT in The Industrial Revolution 4.0,” vol. 4, pp.
502–511, 2020, doi: 10.31004/OBSESI.V4I2.339.
[15] I. Journal, O. Humanities, J. A. Lim, S. Chae, and C. Author, “LAKSA: The Digitally- Based
Realization of Tangerang City’s Community Public Service 1,2),” vol. 4, no. 5, pp. 2496–2507,
2025.
[16] M. C. D. Lestari, Ayu Citra Dewi, Sri Intan Wahyuni, Juliwis Kardi, Yendri Junaidi, and Alif Laini,
“Implementation of Stimulation, Early Detection, and Intervention Programs for Monitoring the
Growth and Development of Children Aged 2-3 Years,” JPUD - J. Pendidik. Usia Dini, vol. 18, no.
1, pp. 183–194, 2024, doi: 10.21009/jpud.181.13.
[17] U. Awan et al., “Detecting fake news and disinformation using artificial intelligence and machine
learning to avoid supply chain disruptions,” Ann. Oper. Res., pp. 1–25, 2022, doi: 10.1007/s10479-
022-05015-5.
[18] M. Nampijja, N. K. Langat, E. Kimani-Murage, E. Mwaniki, P. Kitsao-Wekulo, and K. Okelo,
“Development and feasibility testing of a mobile phone application to track children’s
developmental progression,” PLoS One, vol. 16, 2021, doi: 10.1371/journal.pone.0254621.
[19] . N., . T., T. Siswati, H. Widyawati, and M. P. Rialihanto, “The design of growth and development
children’s monitoring application: a user-centered approach,” Int. J. Community Med. Public Heal.,
2022, doi: 10.18203/2394-6040.ijcmph20223198.
[20] D. Mukherjee et al., “Scalable Transdiagnostic Early Assessment of Mental health (STREAM):
Study Protocol,” 2024, doi: 10.1101/2024.05.07.24306697.
[21] W. Chao and Weicong, “Structure-Behavior Coalescence Abstract State Machine for Metamodel-
Based Language in Model-Driven Engineering,” IEEE Syst. J., vol. 15, pp. 4105–4115, 2021, doi:
10.1109/jsyst.2020.3027195.
[22] S. Anvar, “Introduction to UML,” Prof. C++, 2021, doi: 10.1002/9781119695547.app4.
[23] K. Parkin et al., “Machine learning for prediction of childhood mental health problems in social
care,” BJPsych Open, vol. 11, 2024, doi: 10.1192/bjo.2025.32.
[24] F. Alfiyasin and G. Febriani, “Workshop Information System Design Using Dynamic System
Development Method,” J. Comput. &amp; Bisnis, 2024, doi: 10.56447/jcb.v18i1.296.
[25] E. Puspitasari, R. Pamungkas, and H. A. Mumtahana, “ANALISA DAN PERANCANGAN
PENGEMBANGAN E-LEARNING DENGAN METODE DSDM (STUDI KASUS SDN 01
MANISREJO KOTA MADIUN),” J. Inform. Dan Tekonologi Komput., 2023, doi:
10.55606/jitek.v3i3.2344.
[26] S. G. Tetteh, “Empirical Study of Agile Software Development Methodologies: A Comparative
Analysis,” Asian J. Res. Comput. Sci., 2024, doi: 10.9734/ajrcos/2024/v17i5436.
[27] S. Vuotto, L. Pulina, M. Narizzano, and A. Tacchella, “Automated Requirements-Based Testing of
Black-Box Reactive Systems,” pp. 153–169, 2020, doi: 10.1007/978-3-030-55754-6_9.
[28] B. Dai, W. Pan, and X. Shen, “Significance Tests of Feature Relevance for a Black-Box Learner,”
IEEE Trans. Neural Networks Learn. Syst., vol. 35, pp. 1898–1911, 2021, doi:
3600

Jurnal Teknik Informatika (JUTIF) Vol. 6, No. 5, October 2025, Page. 3587-3601
P-ISSN: 2723-3863 https://jutif.if.unsoed.ac.id
E-ISSN: 2723-3871 DOI: https://doi.org/10.52436/1.jutif.2025.6.5.4958
10.1109/TNNLS.2022.3185742.
[29] S. Houde, D. Gonz’alez, J. Richards, and D. Piorkowski, “Towards evaluating and eliciting high-
quality documentation for intelligent systems,” ArXiv, vol. abs/2011.0, 2020, [Online]. Available:
https://consensus.app/papers/towards-evaluating-and-eliciting-highquality-houde-
gonzalez/27e1a9aea63b5f449e986ece4ce6116b/
[30] H. Kazemi-Arpanahi, M. Shafiee, Z. Nassari, and M. Shanbehzadeh, “Development and evaluation
of an electronic nursing documentation system,” BMC Nurs., vol. 21, 2021, doi: 10.1186/s12912-
021-00790-1.
[31] P. Rachmadi, D. A. Wp, and P. K. Ayuningtyas, “Performance And Functional Testing With The
Black Box Testing Method,” Int. J. Progress. Sci. Technol., 2023, doi: 10.52155/ijpsat.v39.2.5471.
[32] M. F. Fiandhika, A. Riskinanto, B. Kelana, and M. Nasyiah, “Validation of System Usability Scale
From Expert and Ordinary User Perspective,” Proceeding Int. Conf. Sci. Heal. Technol., 2024, doi:
10.47701/icohetech.v5i1.4109.
3601