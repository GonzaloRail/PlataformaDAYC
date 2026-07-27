CogInfoCom 2025 • IEEE 16th International Conference on Cognitive Infocommunications • 8-9 September, 2025 • Vienna, Austria
Enhancing Occupational Therapy Through
Automated Gamification of MABC-2
Barbora Koudelková and David Sedlácˇek and Jiˇrí Žára
Department of Computer Graphics and Interaction, Faculty of Electrical Engineering,
Czech Technical University in Prague, Czech Republic
Email: koudebar@fel.cvut.cz and sedlad1@fel.cvut.cz and zara@fel.cvut.cz
Abstract—The Movement Assessment Battery for Children,
Second Edition (MABC-2), is a standard tool in occupational
therapy used to diagnose dyspraxia in young children. Despite
its clinical relevance, the test is often cumbersome, requiring
significant time and effort from therapists and children. The
manualnatureoftheassessmentprocessintroducesinefficiencies
that can affect its effectiveness and consistency. By automating
theevaluationprocess,reducingtheneedformanualintervention,
andenhancingpatientengagement,weaimtodevelopatoolthat
streamlines MABC-2 testing. The aim is to investigate whether
digitalization and playful design can improve engagement and
simplifythemotorassessmentprocedure.Inthiswork,weadapt
Fig.1. Examplefromusertesting:achildperformingtheAC2“aimingand
selected exercises into an interactive, gamified format tailored
catching”taskinourinteractive,game-basedsystem.
for early childhood. Preliminary testing, conducted with seven
typicallydevelopingchildrenaged6–7years,significantlyreduced
proceduretimeandimprovedchildparticipationduringmotoric
cognitive abilities in children aged 3 to 16, with separate test
evaluation.
item sets for three age bands: 3–6 years (AB1), 7–10 years Keywords—MABC-2,Ergotherapy,OccupationalTherapy,Dys-
(AB2),and11–16years(AB3).Foreacholdergroup,thetasks
praxia, Gamification, Markerless motion capture, LiDAR, Medi-
aPipe getmorecomplex.Itfollowsabehavioralassessmentapproach
—assumingthatfundamentalmotorcapacitiesmanifestintask
I. INTRODUCTION
performance[6],andconsistsofeighttasks,dividedintothree
The integration of modern technology into the medical thematic types of assessments for each age group, targeting
fieldhasbeensteadilyincreasing,offeringinnovativesolutions key components of motor ability.
for diagnosis, treatment, and rehabilitation. The convergence
The MABC-2 test battery consists of:
of medicine and technology is becoming increasingly ev-
ident, whether through the application of computer vision • MD - Manual dexterity, fine motor skills relevant to
and artificial intelligence in medical procedures [1] or the
hand coordination and object manipulation.
incorporation of gamification principles to enhance patient
engagement and facilitate better subsequent recovery [2], [3]. • AC-Aimingandcatching,grossmotorskillsinvolv-
By leveraging these advancements, healthcare providers can ing object control, essential for tasks requiring hand-
improve diagnostic efficiency and create more interactive and eye coordination.
motivating therapeutic experiences for patients. One area that • BAL - Static and dynamic balance, postural control
particularly benefits from these advances is occupational ther-
and balance tasks.
apy (OT) [4], which focuses on helping individuals maintain
and develop their ability to perform daily activities despite Despite its clinical usefulness, the MABC-2 assessment
physical, sensory, psychological, or cognitive impairments. In processpresentsseveralpracticallimitations.Basedoninsights
our work, we are applying these ideas through an interactive, from the Department of Occupational Therapy at the Faculty
game-based approach to motor assessment. Figure 1 shows an of Health Studies, Jan Evangelista Purkyneˇ University in Ústí
example from user testing of the AC2 “aiming and catching” nad Labem (UJEP), and findings from a survey conducted
task in our system. by Hadwin et al. [8], one of the key concerns identified in
clinical practice is the significant time burden associated with
In pediatric OT, a significant challenge is the assessment
conducting the assessment.
and treatment of dyspraxia [5] (developmental coordination
disorder, DCD). Dyspraxia affects the development of mo- Identified limitations include:
tor skills in children, often persisting into adolescence and High time consumption: Therapists must either set up
adulthood. Early identification and intervention are critical, as multiple testing stations in advance or arrange each task
timely therapy can substantially improve a child’s functional sequentially, significantly prolonging the overall testing time.
abilities [6]. A widely used tool for diagnosing DCD is the
Loss of child’s focus: Interruptions due to setup adjust-
Movement Assessment Battery for Children, Second Edition
mentscandisruptthechild’sengagementandfocus,potentially
(MABC-2) [7]. This standardized test evaluates motor and
impacting performance and result reliability.
979-8-3503-5692-2/25/$31.00 ©2025 IEEE 000025
42600211.5202.91866moCofnIgoC/9011.01
:IOD
|
EEEI
5202©
00.13$/52/2-2965-3053-8-979
| )moCofnIgoC(
snoitacinummocofnI
evitingoC
no
ecnerefnoC
lanoitanretnI
ht61
EEEI
5202
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore. Restrictions apply.

B. Koudelková et al. • Enhancing Occupational Therapy Through Automated Gamification of MABC-2
Manual scoring burden: Therapists are required to ob- on game-like tasks; using machine learning on the sensor
serve and score performance in real-time, which is often data, they could predict children’s MABC-2 scores without
impractical. a human examiner. Notably, their approach was found to
Dependence on memory or recordings: Therapists are be “less time-consuming and more playful and motivating
expected to observe and score performance in real-time, an than the current assessment methods” while still yielding a
impractical expectation that often forces them to rely on classification accuracy of about 76% for identifying motor
memory or video recordings. impairment. This demonstrates the promise of translating a
Excessiveassessmentduration: Duetotheabovefactors, formal motor test into a fun, interactive experience – the child
theevaluationoftenexceedstherecommended20–40minutes, essentially plays a game, and the system infers their motor
sometimes lasting up to two hours. proficiency. The trade-off is that such systems are still in the
early stages: the authors acknowledge the need for further
Given these limitations, this paper explores the potential
refinement to ensure the tool is fully reliable and valid before
of motion-tracking technologies and gamification principles to
it can replace the standard MABC-2 administration.
improve the precision and efficiency of DCD assessment in
OT. Grounded in the principles of cognitive infocommunica- Another recent review by Bossavit and Arnedillo-Sánchez
tions [9], [10], which emphasize the co-evolution of human [15] surveyed motion-based technologies (like camera-based
cognitive processes with technology, our approach seeks to tracking and depth sensors) for child motor assessments.
modernize traditional assessment methods by incorporating Similarly, these automated methods can capture many (though
interactive and automated elements. not all) relevant skills. For instance, affordable depth cameras
(e.g., Microsoft Kinect) were the most common tools. They
II. RELATEDWORK can monitor gross motor movements in young children, but
current setups cover only about half of the skill spectrum
The pediatric therapy domain is especially receptive to that traditional assessments examine. The review highlights a
gamificationsincechildrennaturallylearnandengagethrough clear gap in fully replicating comprehensive tests like MABC-
play. A systematic review by Pimentel-Ponce et al. [11] 2. Yet, it also points to opportunities: combining multiple
analyzed clinical trials using gamification for pediatric neu- sensors and improving software could broaden the range of
romotor rehabilitation (covering conditions like cerebral palsy measurable skills and increase the fidelity of gamified screen-
and DCD) and found a universally positive trend. Across ing tools. Complementary single-sensor (Microsoft Kinect)
these studies, adding game elements to conventional therapy studies report acceptable validity for selected gait and balance
increased children’s motivation and adherence. This was the measures in pediatric cohorts, while also noting outcome-
most consistently reported benefit. Several trials also docu- dependent reliability and sensitivity to camera placement and
mentedimprovementsinphysicalfunctions(strength,balance, occlusions [16]–[18]. These findings contextualize our task-
coordination, gait) when therapy was delivered in a game-like specific design (RGB pose estimation for balance; LiDAR-
format. based floor-interaction tracking) as an alternative to single-
sensor setups rather than a sensor-fusion approach.
Despite these promising findings, the literature also high-
lights the challenges and limitations of gamification in rehab.
Many studies have been small or short-term, so the evidence III. TECHNICALSPECIFICATION
base is still maturing – several reviewers note a need for more
Developinganautomatedassessmentsystemrequirescare-
extensive trials and more robust longitudinal data to confirm
ful consideration of technological approaches to ensure ac-
sustainedbenefits [12].Thereisalsoalackofstandardization
curacy, efficiency, and ease of use. The primary goal was
in how gamified interventions are developed and evaluated,
simplifying the measurement process while maintaining high
which makes it difficult to compare results across studies
diagnostic reliability. One of the key challenges in designing
and draw general conclusions. In practice, not all “serious
thesystemwasbalancingmeasurementprecisionwithpractical
games”aredesignedequallywell:ifarehabgamelacksproper
usability in clinical settings - given that children referred
feedback or fails to engage the patient meaningfully, it may
for this type of evaluation are often already suspected of
leadtopoorcomplianceorevenhinderprogress [13].Indeed,
dyspraxia or associated neurodevelopmental conditions, the
someresearchwarnsthatwithoutcarefuldesign,gamification’s
use of physical markers posed a risk of increasing stress and
impact might be limited – for instance, one study found no
influencing test outcomes [19]. While marker-based motion
significant differences in standard motor outcomes (MABC-
tracking could offer higher accuracy, it would also introduce
2, BOT-2 tests) between a gamified exercise program and
additional complexity, requiring more setup time, specialized
conventionaltherapy,eventhoughchildrenenjoyedthegaming
personnel, and training. This complexity would counteract the
experience [11].
goal of easing the examination process.
Therefore, while gamification offers clear advantages (mo-
We chose to implement tasks from the AB1 category, not
tivation, engagement, adherence, and accessible home-based
to evaluate performance within this age group, but because
practice in some cases), it also poses challenges such as
its exercises represent the most fundamental level of motor
inconsistent effectiveness, uneven design quality, and the need
assessment.ThesetasksformthebasisuponwhichtheMABC-
forempiricaltuningof“whatworks”fordifferentpopulations.
2 test builds increasing complexity for older children, making
Gamified Assessment Tools in MABC-2: Initial studies in AB1 the most suitable entry point for initial system develop-
thisdirectionareencouraging.DeKlerketal. [14]introduced ment. Due to the technical challenges of accurately tracking
a system where children play with sensor-augmented toys fine motor skills [20] — such as precise hand movements
(for example, an electronic cube) that record performance required for tasks like stringing beads — the decision was
000026
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore. Restrictions apply.

CogInfoCom 2025 • IEEE 16th International Conference on Cognitive Infocommunications • 8-9 September, 2025 • Vienna, Austria
Fig.3. InteractiondesignforBAL1usingavisualmetaphorofafillingwell.
• Each position - floor-based, individual joints, scene,
andtimestampisthenloggedintoaseparateCSVfile
for further analysis.
• Based on calculated positions, the correctness of each
exerciseisanalyzedandtransformedintoapercentile-
Fig.2. Hardwareandspatialconfigurationofthesystem.
based Performance Score (PS) according to the origi-
nal MABC-2 test directive.
madetoexcludetheseassessmentsandconcentrateonmotion-
Eachassessmentfollowsaunifiedapplicationarchitecture.
based evaluations that align better with the current system’s
Detection is based on whether a person matches the (virtual)
capabilities.
test mats, identical shapes and sizes to those in the original
A. System Architecture MABC-2 test in predefined areas.
TheproposedsystemintegratesLiDARtechnology,entity- The assessment took place in a 1.6m×2.7m space (see
tracking software Pharus, floor projection, and real-time pos- Figure2)withaglossylinoleumfloor,whichrequiredawhite
ture detection through MediaPipe Pose landmark detection. cottonsheet overthe projectionarea toprevent lightreflection
These technologies enable sufficient motion capture accuracy issues that could interfere with sensor accuracy.
without requiring physical markers [21]. Pharus is a low-
latency LiDAR tracking software by ArsElectronica Future- B. Tasks and interaction design
Lab, designed for real-time position tracking of people in
Indesigningtheinterfaceforthisapplication,it’scrucialto
crowded environments. This software was chosen for 2D xy-
acknowledgethattheprimaryusersmaynotyetbeabletoread
coordinatefeettracking,bettersuitedforfloorprojectionsthan
andoftendonotunderstandabstractconcepts[23]suchasgeo-
overhead depth sensors [22].
metricshapeslikesquaresandrectangles,whicharefrequently
The system operates on a Host PC running a Unity-based usedinthetest.FollowingbestpracticesfromInclusiveSchool
master application, which processes data from sensors and Principles [24], it incorporates familiar objects and real-world
cameras. Skeletal data from the RGB camera is analyzed scenarios to facilitate better comprehension of tasks, as seen
independently by a pre-trained pose recognition model. The in Figure 3. For the BAL1 assessment, the interface uses a
system can be controlled via an operator interface on a visual metaphor of a well that progressively fills with water.
tabletdevice,allowingreal-timeadjustmentstoscenesettings, This representation makes the duration concept accessible for
recording parameters, and verbal instructions and enabling children who cannot yet read a clock, while engaging them to
therapists to switch between assessment tasks and modify maintain balance by focusing on the animated well.
logging parameters.
Prior to testing, children are encouraged to explore the
Data flow within the system: virtual environment to reduce anxiety and improve task com-
prehension. The interaction design focuses on creating an
• The LiDAR sensor collects spatial data and transmits accessibleandengagingexperienceforchildrenaged3-6.The
it to the Host PC. interface is designed in a fairy-tale, cartoon-like style within
a familiar and child-friendly environment. This approach aims
• Pharus Software processes and forwards real-time
to create a friendly and engaging atmosphere that encourages
entity foot-tracking data to the Unity interactive pro-
participation.
jected application, which responds accordingly.
FollowingMABC-2guidelines,verbalfeedbackisminimal
• The RGB camera captures pose data, which is ana-
duringtesting.Instead,theapplicationusesvisualandauditory
lyzed using MediaPipe-based detection.
cuestoindicatetaskcompletionandcorrectness.Soundeffects
• The operator interface provides remote control over are deliberately designed to be gentle, ensuring a stress-free
assessmentsettings,sceneselection,anddatalogging. experience for the child while reinforcing their performance.
000027
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore. Restrictions apply.

B. Koudelková et al. • Enhancing Occupational Therapy Through Automated Gamification of MABC-2
The application features two operational modes, both in- interaction logic is available in the supplementary video ma-
corporating animations, gamified elements, and an interactive terial1.
environment with which to engage. The operator can switch
between these modes based on the testing requirements:
IV. USERTESTING
Standard Mode: This mode follows the traditional The system underwent preliminary evaluation in a con-
MABC-2 assessment protocol, where the operator manually trolled setting with a minor participant group to assess the
guides the child through the test, explaining tasks as needed feasibility of the automated MABC-2 test. This initial testing
and ensuring adherence to standard procedures. phase was designed to examine the system’s functionality and
Fully Automated Mode: The operator can activate the interaction design rather than to validate performance against
"Explain Assessment" function via the controller app in this standardized age group criteria through two key objectives:
mode. Each assessment includes brief verbal narration detail-
1) Assess whether the interactive methodology benefits
ing the expected actions of the child, a set of tutorial anima-
occupational therapy practices.
tionsshowingthecorrectexecutionofthetask,andautomated
2) Determine whether the tests can be fully automated.
feedback indicating whether the child’s actions meet the pre-
scribed guidelines. These verbal instructions and feedback are
ThetestingwasconductedonMay17thinakindergartenin
generated using a publicly available text-to-speech generator,
Prague,involvingchildrenaged6to7years,allpresumedtobe
ensuring standardized and repeatable task explanations. Once
typically developing without known indications of dyspraxia.
activated,thesystemautomaticallydeliversverbalexplanations
While 20 participants were initially expected, only seven
and begins recording movement data immediately.
children were included due to limited parental consent. While
The application features five distinctive visual environ- the selected tasks were initially designed for younger age
ments, each brightly colored and hand-painted to capture and bands within the MABC-2 framework, their simplicity made
maintain children’s attention. All objects feature bold outlines them suitable for evaluating system performance and child
inspired by children’s cartoons for improved clarity. interaction across a slightly older group. Additionally, it is
important to note that the assessments were conducted by
Implemented Tasks technically qualified personnel rather than licensed occupa-
AC1: The child steps into a designated area marked by tionaltherapists.Giventheseconstraints,thefindingsshouldbe
an animated circle and attempts to catch a beanbag thrown interpreted as preliminary insights, identifying areas requiring
by the therapist. The therapist then steps one foot out of the furthervalidationthroughlarger-scale,clinicallyrepresentative
designated area to log the successful/unsuccessful throw. At studies.
present, this manual step is necessary because automatically
The testing followed fixed session guidelines. Before the
evaluating the child’s overall catching posture is highly com-
testbegan,abrieffamiliarizationwiththechildwasconducted,
plex. Annotated datasets required for training such a model
and the child’s age and laterality were written down. It was
are not currently available, but in future iterations this process
explained to each child that several small games would be
could potentially be automated.
played.Theparticipantsweredividedintotwogroups,asseen
AC2: In this task, the child throws a beanbag onto a des- in Table I:
ignatedtarget,trackedthroughLiDAR-basedspatialdetection.
Visual feedback is instantly provided on the floor if the throw • Group A was assigned the Standard MABC-2 Mode,
is successful and the position of the throw is logged. as mentioned in III-A, where the test was conducted
BAL1: This task assesses a child’s ability to balance according to the traditional methodology. This in-
on one leg for up to 30 seconds, testing motor control cluded a detailed explanation of each task, a prac-
and stability. The animated tutorial demonstrates correct and tice session, and the actual, recorded assessment, all
incorrectposturestothechild.Onceinposition,thechildsees guided by a test administrator.
visual feedback, a growing magical forest, and a water well
• Group B followed the Fully Automated Mode, where
filling up, as mentioned in Figure 3. This assessment uses a
no prior explanation or practice trials were given, and
trained MediaPipe model that recognizes and logs four poses:
staff members did not actively participate in the test
correct/incorrect standing on the left or right foot.
execution. Instead, the system automatically provided
BAL2: A tightrope-walking task invites the child to tiptoe verbalinstructionsandrespondedtothechild’sactions
along a straight path, simulating a rope over a shark-infested in real-time.
reef. The system tracks step count and evaluates whether the
childmaintainsastraighttrajectoryordeviatesintopredefined This was followed by a debriefing of the participants,
side zones, indicating a loss of balance. gathering participants’ insights, and asking a few questions
from the questionnaire part of the Session Guide.
BAL3: This balance assessment uses a series of six mats
projected as ice floes. Children hop between neighboring tiles
towardafinal"solidground"tile,andeachcorrecthoptriggers A. Findings
a brief animation where the previous tile appears to sink. It
is measured whether the child jumps with both feet together The overall average test duration was 9.38 minutes, with
(correctly executed) or with the other foot later, the cadence Group A averaging 11.31 minutes and Group B 7.92 minutes,
betweenjumps,andwhetherthechildjumpsoverseveraltiles. which is half the time compared to classical testing of the
A short demonstration of the implemented tasks and their 1https://youtu.be/Gjtm2pu2NWs
000028
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore. Restrictions apply.

CogInfoCom 2025 • IEEE 16th International Conference on Cognitive Infocommunications • 8-9 September, 2025 • Vienna, Austria
Participant Group Duration (min) Since the original MABC-2 method is not entirely holis-
P1 A 11:55 tic [8], the final interpretation of results remains at the thera-
P2 B 8:12 pist’s discretion. This highlights the limitations of full test au-
P3 A 11:37 tomation, particularly in grading a child’s performance solely
based on measured values and calculating the Performance
P4 B 6:26
Scorewithouthumanoversight.Whileautomationcanassistin
P5 A 10:24
data collection, unbiased measurement, and preliminary anal-
P6 B 10:00
ysis, the therapist’s expertise remains crucial for monitoring,
P7 B 7:04
interpreting, and contextualizing the child’s engagement and
TABLEI. PARTICIPANTGROUPSANDASSESSMENTDURATION
behavior throughout the assessment.
V. FUTUREWORKREFINEMENTS
motoric component. Based on insights from UJEP, the mea- A. Expanding Clinical Validity
sured duration for the motoric component of AB1 on non-
dyspraxic children in traditional assessments is approximately Whilethisstudydemonstratesthepotentialofgamifiedand
15 minutes when administered by two people—typically a automated assessment methodologies in occupational therapy,
therapistworkingwiththechildandanotherpersonresponsible furtherresearchisnecessarytoensurereal-worldapplicability.
for scoring. This does not include the additional time required The following directions will guide future improvements:
for physical setup of testing stations (around 20 minutes)
• Clinical Validation with Dyspraxic Children: To
and manual post-evaluation, which may require up to 30
fully evaluate the system’s efficacy, trials must in-
minutes. In contrast, our system automates the majority of the
clude children with diagnosed DCD. The application
quantitative measurement.
couldthenmeasureitseffectivenessagainsttraditional
The results shown in Table I suggest that participants in MABC-2 assessments in a clinically relevant setting.
Group B generally required less time to complete the tests
• Larger Sample Studies: Expanding participant num-
than Group A participants. However, given the small sample
bers will provide more statistically reliable data, ad-
sizeofonlysevenparticipants,itisimpossibletoconcludethat
dressing the current study’s sample size limitations.
GroupBperformedbetterthanGroupA.Instead,theseresults
shouldindicatepotentialtendencieswithinthedataratherthan • Real-World Implementation in Therapy Settings:
conclusive findings. Thesystemmustbetestedinclinicalenvironmentsby
expert therapists, same as original MABC-2 method.
B. Observations and Expert Feedback
• Quantitative Agreement Beyond Time: In the next
Occupational therapists from UJEP reviewed the testing study we will quantify agreement with therapist scor-
recordingsandprovidedkeyinsights.Verbalinstructionsgiven ing. These metrics are not available for the current
in automated testing proved beneficial in maintaining test pilot and will be collected prospectively.
consistency and reducing therapist bias. A key benefit is
B. Technical improvements
the motivation and gameplay. In conventional MABC-2
assessments, which lack a game element, it is common for • The current single-projector setup presents occlu-
children to sabotage the testing because it is tedious and sion issues affecting assessment visibility. A multi-
unengaging.Thesefindingsalignwiththeconclusionsfromthe projector system or an LED floor display could en-
review by Pimentel-Ponce et al. [11], discussed in Section I. hance projection and reduce visual obstructions.
• ThedetectionsystemreliesonasingleLiDARsensor,
Furthermore, the automated test version introduces several
which is insufficient for comprehensive tracking. To
noteworthy aspects of therapist observation. In this mode, the
achieve full coverage of the detection area without
child interacts independently with the system, with minimal
blind spots, at least two LiDAR units should be used.
therapist intervention. Except for the AC1, the entire assess-
Another promising direction could be investigating
ment runs autonomously, allowing the child to complete tasks
simpleformsofcombining(orfusing)trackingmodal-
without guidance. Specific tasks, such as AC2 or BAL1, in-
ities, such as the positioning of a person in space
corporateshortanimationsasrewards,reinforcingengagement.
measured by LiDAR + RGB camera together.
However,thedecisiontocontinueandpersistintasksisdriven
by the child’s intrinsic motivation [25] rather than external • To fully measure the effectiveness against the original
therapist encouragement. method, it would be useful to implement the three
remaining MD exercises from AB1: path drawing,
Although MABC-2 does not explicitly assess internal
bead stringing,and coin insertion. Infuture iterations,
motivation, this observation offers therapists an additional
we plan to explore different approaches for captur-
diagnostic dimension—the child’s reaction to success, failure,
ing fine-motor actions, such as camera-based finger
and self-driven effort. Additionally, this motivation allows for
tracking (e.g., MediaPipe), depth-based sensors (e.g.,
observing other character traits in children. For instance, it
LeapMotion), or even virtual-reality interfaces.
helped identify several problematic personality traits in partic-
ipant P6, which, although possibly noticeable in conventional • Anthropometric differences between children and
testing,wouldnothavebeenasevident.Thesebehaviorsmight adults [26] affected pose detection models, requiring
otherwise be overlooked in a fully guided assessment. dataset expansion and specialized training.
000029
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore. Restrictions apply.

B. Koudelková et al. • Enhancing Occupational Therapy Through Automated Gamification of MABC-2
|     |     | VI. | CONCLUSION |     |     |     |     |                                                                  |     |              |     |              |        |            |         |     |
| --- | --- | --- | ---------- | --- | --- | --- | --- | ---------------------------------------------------------------- | --- | ------------ | --- | ------------ | ------ | ---------- | ------- | --- |
|     |     |     |            |     |     |     |     | [10] I.Horváth,A.Csapo,B.Berki,A.Sudár,andP.Baranyi,“Definition, |     |              |     |              |        |            |         |     |
|     |     |     |            |     |     |     |     | Background                                                       |     | and Research |     | Perspectives | Behind | ‘Cognitive | Aspects | of  |
This study explored the integration of markerless mo- Virtual Reality’ (cVR),” Infocommunications journal, Special Issue:
tion capture technologies into pediatric occupational therapy, InternetofDigital&Cognitiverealities,vol.15,pp.9–14,012023.
focusing on the automation and gamification of movement [11] M.Pimentel-Ponce,R.Romero-Galisteo,R.Palomo-Carrión,E.Pinero-
|              |     |          |        |              |     |             |     | Pinto, | J.                   | A. Merchán-Baeza, |     | M.            | Ruiz-Muñoz, |                  | J. Oliver-Pece, |       |
| ------------ | --- | -------- | ------ | ------------ | --- | ----------- | --- | ------ | -------------------- | ----------------- | --- | ------------- | ----------- | ---------------- | --------------- | ----- |
| assessments. | The | proposed | system | successfully |     | implemented |     |        |                      |                   |     |               |             |                  |                 |       |
|              |     |          |        |              |     |             |     | and    | M. González-Sánchez, |                   |     | “Gamification |             | and neurological |                 | motor |
componentsoftheMABC-2methodologyusingLiDARtrack-
|                 |     |          |             |     |                |     |          | rehabilitation |     | in children |     | and adolescents: |     | a systematic |     | review,” |
| --------------- | --- | -------- | ----------- | --- | -------------- | --- | -------- | -------------- | --- | ----------- | --- | ---------------- | --- | ------------ | --- | -------- |
| ing, projection |     | mapping, | and machine |     | learning-based |     | skeletal |                |     |             |     |                  |     |              |     |          |
Neurología(EnglishEdition),vol.39,no.1,pp.63–83,2024.[Online].
tracking. While full automation replacing therapists was not Available:https://doi.org/10.1016/j.nrleng.2023.12.006
achieved,thesystemprovedtobeavaluabletoolforenhancing
|     |     |     |     |     |     |     |     | [12] F.M.Alfieri,C.daSilvaDias,N.C.deOliveira,andL.R.Battistella, |     |                    |     |     |                  |         |         |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------------------------------------------- | --- | ------------------ | --- | --- | ---------------- | ------- | ------- | --- |
|     |     |     |     |     |     |     |     | “Gamification                                                     |     | in musculoskeletal |     |     | rehabilitation,” | Current | reviews | in  |
andspeedingupassessments,significantlyreducingevaluation
musculoskeletalmedicine,vol.15,no.6,pp.629–636,2022.
| time and | providing | additional |     | insights | into | motor responses. |     |                        |     |     |               |     |                |     |          |       |
| -------- | --------- | ---------- | --- | -------- | ---- | ---------------- | --- | ---------------------- | --- | --- | ------------- | --- | -------------- | --- | -------- | ----- |
|          |           |            |     |          |      |                  |     | [13] R. Damaševicˇius, |     | R.  | Maskeliu¯nas, | and | T. Blažauskas, |     | “Serious | games |
The developed application demonstrated its potential to and gamification in healthcare: a meta-review,” Information, vol. 14,
no.2,p.105,2023.
| streamline    | testing. | Based          | on consultations |             | with          | therapists, | it is    |                |                  |              |        |               |            |            |              |        |
| ------------- | -------- | -------------- | ---------------- | ----------- | ------------- | ----------- | -------- | -------------- | ---------------- | ------------ | ------ | ------------- | ---------- | ---------- | ------------ | ------ |
|               |          |                |                  |             |               |             |          | [14] A. Brons, | A.               | de Schipper, |        | S. Mironcika, | H.         | Toussaint, | B. Schouten, |        |
| suggested     | that     | the system     | could            | also        | be beneficial | for         | children |                |                  |              |        |               |            |            |              |        |
|               |          |                |                  |             |               |             |          | S. Bakkes,     |                  | and B.       | Kröse, | “Assessing    | children’s |            | fine motor   | skills |
| on the autism |          | spectrum,      | as its           | interactive | nature        | may         | enhance  |                |                  |              |        |               |            |            |              |        |
|               |          |                |                  |             |               |             |          | with           | sensor-augmented |              | toys:  | Machine       | learning   | approach,” | Journal      | of     |
| engagement    | and      | participation. |                  | However,    | further       | research    | and      |                |                  |              |        |               |            |            |              |        |
MedicalInternetResearch,vol.23,no.4,p.e24237,2021.
| testing are | required | to  | validate | these | assumptions. | The | ability |                  |     |        |                    |     |               |     |            |     |
| ----------- | -------- | --- | -------- | ----- | ------------ | --- | ------- | ---------------- | --- | ------ | ------------------ | --- | ------------- | --- | ---------- | --- |
|             |          |     |          |       |              |     |         | [15] B. Bossavit |     | and I. | Arnedillo-Sánchez, |     | “Motion-based |     | technology | to  |
to collect and store motion data also opens opportunities for support motor skills screening in developing children: A scoping
refining assessment methodologies and guiding future studies. review,” Computer Methods and Programs in Biomedicine, vol. 240,
p.107715,2023.
|     |     |     |     |     |     |     |     | [16] L. Yeung, |     | K. C. | Cheng, | C. Fong, | W. C. | Lee, | and K.-Y. | Tong, |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ----- | ------ | -------- | ----- | ---- | --------- | ----- |
ACKNOWLEDGMENT
|     |     |     |     |     |     |     |     | “Evaluation |     | of the | microsoft | kinect | as a clinical | assessment |     | tool of |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ------ | --------- | ------ | ------------- | ---------- | --- | ------- |
bodysway,”Gait&posture,vol.40,no.4,pp.532–538,2014.
| This | work | has been | partially | supported |     | by the | Grant |     |     |     |     |     |     |     |     |     |
| ---- | ---- | -------- | --------- | --------- | --- | ------ | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Agency of the Czech Technical University in Prague, grant [17] Y. Ma, K. Mithraratne, N. Wilson, Y. Zhang, and X. Wang, “Kinect
|     |     |     |     |     |     |     |     | v2-based | gait | analysis | for | children | with cerebral | palsy: | Validity | and |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ---- | -------- | --- | -------- | ------------- | ------ | -------- | --- |
no. SGS25/150/OHK3/3T/13 - Research of Modern Computer reliability of spatial margin of stability and spatiotemporal variables,”
| Graphics | Methods | 2025-2027. |     | The author | also | acknowledges |     | Sensors,vol.21,no.6,p.2104,2021. |     |     |     |     |     |     |     |     |
| -------- | ------- | ---------- | --- | ---------- | ---- | ------------ | --- | -------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
the support of the Czech Olympic Committee funded project [18] L. Cai, D. Liu, and Y. Ma, “Placement recommendations for single
Scientific and research support of the Czech sports represen- kinect-basedmotioncapturesysteminunilateraldynamicmotionanal-
tation within the Project No. 5 - Acquisition and digitization ysis,”inHealthcare,vol.9,no.8. MDPI,2021,p.1076.
|                   |     |       |     |     |     |     |     | [19] K.      | Banátová     | and R.     | Psotta, | “The | MABC-2       | checklist: | A review          | of  |
| ----------------- | --- | ----- | --- | --- | --- | --- | --- | ------------ | ------------ | ---------- | ------- | ---- | ------------ | ---------- | ----------------- | --- |
| of proprioception |     | data. |     |     |     |     |     |              |              |            |         |      |              |            |                   |     |
|                   |     |       |     |     |     |     |     | the          | psychometric | properties |         | of a | screening    | tool       | for developmental |     |
|                   |     |       |     |     |     |     |     | coordination |              | disorder,” | Journal | of   | Occupational | Therapy,   | Schools,          | &   |
REFERENCES
EarlyIntervention,vol.15,no.1,pp.72–89,2022.[Online].Available:
https://doi.org/10.1080/19411243.2021.1934228
| [1] H. | Lindroth, | K. Nalaie, | R.  | Raghu, | I. N. | Ayala, C. | Busch, |     |     |     |     |     |     |     |     |     |
| ------ | --------- | ---------- | --- | ------ | ----- | --------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
A.Bhattacharyya,P.MorenoFranco,D.A.Diedrich,B.W.Pickering, [20] G.Amprimo,G.Masi,G.Pettiti,G.Olmo,L.Priano,andC.Ferraris,
|     |                |          |     |            |              |                |     | “Hand     | tracking | for        | clinical | applications:      |     | validation | of the       | google |
| --- | -------------- | -------- | --- | ---------- | ------------ | -------------- | --- | --------- | -------- | ---------- | -------- | ------------------ | --- | ---------- | ------------ | ------ |
| and | V. Herasevich, | “Applied |     | artificial | intelligence | in healthcare: | a   |           |          |            |          |                    |     |            |              |        |
|     |                |          |     |            |              |                |     | mediapipe |          | hand (gmh) | and      | the depth-enhanced |     | gmh-d      | frameworks,” |        |
reviewofcomputervisiontechnologyapplicationinhospitalsettings,”
Journal of Imaging, BiomedicalSignalProcessingandControl,vol.96,p.106508,2024.
|     |     | vol. | 10, no. | 4, p. | 81, 2024. | [Online]. | Available: |     |     |     |     |     |     |     |     |     |
| --- | --- | ---- | ------- | ----- | --------- | --------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
https://doi.org/10.3390/jimaging10040081 [21] L. Ceriola, J. Taborri, M. Donati, S. Rossi, F. Patanè, and I. Mileti,
“Comparativeanalysisofmarkerlessmotioncapturesystemsformea-
| [2] N.                                                                | Norouzi-Gheidari, |     | M. F. Levin, | J.  | Fung, | and P. Archambault, |     |                                                 |     |     |     |     |     |     |     |     |
| --------------------------------------------------------------------- | ----------------- | --- | ------------ | --- | ----- | ------------------- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| “Interactivevirtualrealitygame-basedrehabilitationforstrokepatients,” |                   |     |              |     |       |                     |     | suringhumankinematics,”IEEESensorsJournal,2024. |     |     |     |     |     |     |     |     |
in 2013 International Conference on Virtual Rehabilitation (ICVR). [22] O. Naderer, “Crowd tracking and movement pattern recognition,”
IEEE,2013,pp.220–221. Master’s Thesis, Johannes Kepler Universität Linz, 2015. [Online].
| [3] S.Adlakha,D.Chhabra,andP.Shukla,“Effectivenessofgamification |     |     |     |     |     |     |     | Available:https://epub.jku.at/urn:nbn:at:at-ubl:1-2879 |     |     |     |     |     |     |     |     |
| ---------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
for the rehabilitation of neurodegenerative disorders,” Chaos, Solitons [23] W. J. Friedman, “Development of time concepts in children,” ser.
& Fractals, vol. 140, p. 110192, 2020. [Online]. Available: AdvancesinChildDevelopmentandBehavior,H.W.ReeseandL.P.
https://doi.org/10.1016/j.chaos.2020.110192 Lipsitt, Eds. JAI, 1978, vol. 12, pp. 267–298. [Online]. Available:
https://www.sciencedirect.com/science/article/pii/S0065240708600403
| [4] L. | Liu, “Occupational |     | therapy | in the | fourth | industrial revolution,” |     |     |     |     |     |     |     |     |     |     |
| ------ | ------------------ | --- | ------- | ------ | ------ | ----------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Canadian Journal of Occupational Therapy, vol. 85, no. 4, pp. 272– [24] “Principy práce s deˇtmi v mš,” Online, 2023, ac-
283,2018. cessed 22-05-2024. [Online]. Available: https://inkluzivniskola.cz/
principy-prace-s-detmi-s-omj-v-ms
| [5] P. Kolar, | J.  | Smrzova, | and A. Kobesova, |     | “Developmental | coordination |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | -------- | ---------------- | --- | -------------- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
disorder-developmental dyspraxia,” Ceska a Slovenska Neurologie a [25] M. J. Habgood and S. E. Ainsworth, “Motivating children to learn
|     |     |     |     |     |     |     |     | effectively: |     | Exploring | the value | of  | intrinsic | integration | in educational |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------ | --- | --------- | --------- | --- | --------- | ----------- | -------------- | --- |
Neurochirurgie,vol.74,no.5,pp.533–538,2011.
games,”TheJournaloftheLearningSciences,vol.20,no.2,pp.169–
| [6] S. Cermak, |     | “Developmental | dyspraxia,” |     | ser. Advances | in Psychology, |     |     |     |     |     |     |     |     |     |     |
| -------------- | --- | -------------- | ----------- | --- | ------------- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
206,2011.
| E.A.Roy,Ed.  |     | North-Holland,1985,vol.23,pp.225–248. |           |          |            |                     |           |               |           |         |               |        |                   |           |                 |     |
| ------------ | --- | ------------------------------------- | --------- | -------- | ---------- | ------------------- | --------- | ------------- | --------- | ------- | ------------- | ------ | ----------------- | --------- | --------------- | --- |
|              |     |                                       |           |          |            |                     |           | [26] L. Jahn, | S.        | Flügge, | D. Zhang,     | L.     | Poustka,          | S. Bölte, | F. Wörgötter,   |     |
| [7] T. Brown | and | A. Lalor,                             | “The      | movement | assessment | battery             | for chil- |               |           |         |               |        |                   |           |                 |     |
|              |     |                                       |           |          |            |                     |           | P. B.         | Marschik, | and     | T. Kulvicius, |        | “Comparison       |           | of marker-less  | 2d  |
| dren—second  |     | edition                               | (MABC-2): | a review | and        | critique,” Physical | &         |               |           |         |               |        |                   |           |                 |     |
|              |     |                                       |           |          |            |                     |           | image-based   |           | methods | for           | infant | pose estimation,” |           | 2024. [Online]. |     |
occupationaltherapyinpediatrics,vol.29,no.1,pp.86–103,2009.
Available:https://arxiv.org/abs/2410.04980
| [8] K.     | J. Hadwin, | G. Wood,       | S. Payne, | C.         | Mackintosh, | and          | J. V. Parr, |     |     |     |     |     |     |     |     |     |
| ---------- | ---------- | -------------- | --------- | ---------- | ----------- | ------------ | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| “Strengths |            | and weaknesses | of        | the MABC-2 | as          | a diagnostic | tool for    |     |     |     |     |     |     |     |     |     |
developmentalcoordinationdisorder:anonlinesurveyofoccupational
therapistsandphysiotherapists,”PLoSOne,vol.18,no.6,2023.
| [9] P. Baranyi |     | and A. Csapo, | “Definition |     | and Synergies | of  | Cognitive |     |     |     |     |     |     |     |     |     |
| -------------- | --- | ------------- | ----------- | --- | ------------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Infocommunications,”ActaPolytechnicaHungarica,vol.9,pp.67–83,
012012.
000030
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:21:08 UTC from IEEE Xplore.  Restrictions apply.