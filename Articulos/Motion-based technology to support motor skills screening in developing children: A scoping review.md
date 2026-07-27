ComputerMethodsandProgramsinBiomedicine240(2023)107715
Contents lists available at ScienceDirect
Computer Methods and Programs in Biomedicine
journal homepage: www.elsevier.com/locate/cmpb
Motion-based technology to support motor skills screening in developing
children: A scoping review
Benoit Bossavita,b,*, Inmaculada Arnedillo-Sa ´ ncheza
aSchool of Computer Science & Statistics, Trinity College Dublin, Ireland
bSchool of Computer Science & Programming Languages, Universidad de Ma´laga, Spain
A R T I C L E I N F O A B S T R A C T
Keywords: Background: Acquiring motor skills is fundamental for children’s development since it is linked to cognitive
Motor skills development. However, access to early detection of motor development delays is limited.
Developing Children Aim: This review explores the use and potential of motion-based technology (MBT) as a complement to support
Motor development
and increase access to motor screening in developing children.
Screening
Methods: Six databases were searched following the PRISMA guidelines to search, select, and assess relevant
Motion-based technology
works where MBT recognised the execution of children’s motor skills.
Results: 164 studies were analysed to understand the type of MBT used, the motor skills detected, the purpose of
using MBT and the age group targeted.
Conclusions: There is a gap in the literature aiming to integrate MBT in motor skills development screening and
assessment processes. Depth sensors are the prevailing technology offering the largest detection range for chil-
dren from age 2. Nonetheless, the motor skills detected by MBT represent about half of the motor skills usually
observed to screen and assess motor development. Overall, research in this field is underexplored. The use of
multimodal approaches, combining various motion-based sensors, may support professionals in the health
domain and increase access to early detection programmes.
Introduction positively impacting children’s development [18] that could also redi-
rect developmental trajectories and focus attention on tasks and
Throughout life, humans learn to use their muscles to perform motor sensory-motor performance [34,50,126]. In addition, it would support
skills. During childhood, typically developing (TD) children usually social and emotional development within the family circle [139], which
acquire the same skills at similar ages. Acquiring motor skills during can reduce the risk of health-related psychosocial complications [122].
childhood is fundamental for children’s development because it is However, inaction on early detection leads to delayed interventions,
associated with their cognitive and learning development. Some poor communication with the family [193] and performance at school
cognitive skills originate in the prontal cortex and the cerebellum, which [147], and risk of poor outcomes in the life course [143,187].
are also activated with the execution of motor skills [44,85]. Further- Despite the benefits of early detection, only an insignificant per-
more, cerebellum dysfunction is usually associated with (neuro)devel- centage of the population avails of it [119] due to its associated costs.
opmental disorders such as autism [47,124], speech disorders such as Early detection programmes require engagement with trained pro-
dyslexia [180] or learning disorders such as Developmental Coordina- fessionals over several sessions and rely on access to limited specialist
tion Disorder (DCD) [144]. centres or adequately staffed services [42,57]. Therapists’ time and
Theore, detecting potential delays in motor development is para- specific materials and activities make children’s monitoring expensive
mount. Currently, initial concerns regarding developmental delays are [155]. Additionally, cultural background, language barrier, low income,
commonly raised by parents observing problems with daily activities or insurance issues, and lack of information hinder access to these services
teachers noticing challenges with motor activities at school [117]. The [187].
American Academy of Paediatrics [141] recommends an early detection This scoping review adopts a multidisciplinary approach to search
programme for developmental delays leading to early interventions for technological complements that may support and increase access to
* Corresponding author at: School of Computer Science & Statistics, Trinity College Dublin, Ireland.
E-mail address: benoit.bossavit@uma.es (B. Bossavit).
https://doi.org/10.1016/j.cmpb.2023.107715
Received 20 May 2022; Received in revised form 6 July 2023; Accepted 7 July 2023
Availableonline8July2023
0169-2607/©2023TheAuthors.PublishedbyElsevierB.V.ThisisanopenaccessarticleundertheCCBYlicense(http://creativecommons.org/licenses/by/4.0/).

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
early detection of motor developmental delay by screening motor skills’
execution from an early stage. The field of Human-Computer Interaction
(HCI) has made much progress with sensors able to capture and detect
human movements through intuitive interaction with digital applica-
tions based on body motion. The combination of sensors and algorithms
that can recognise human movement patterns is called Motion-Based
Technology (MBT). Previous Systematic Literature Reviews (SLR) have
explored MBT as a tool to increase physical activity [128,130,142,152]
and support children’s therapy [67,87,125,149]. However, it remains
unclear which, for what purpose, and how MBT may be relevant to
screen motor skills in developing children to identify potential motor
developmental delays. To this end, this review examines the literature
through the lens of four research questions:
- RQ1: What type of MBT is being used to detect children’s motor
skills?
- RQ2: What motor skills are being detected with MBT?
- RQ3: For what purpose is MBT being used?
- RQ4: What motor development phases are being targeted by MBT?
These four RQs will inform the discussion regarding the relevance
and potential of MBT to support and increase access to motor skills
screening in developing children at an early stage. Fig. 1. PRISMA flow diagram.
Methods
Search strategy
12. design method (non-experimental, quasi-experimental, experi-
mental); 13. instrument (survey, standard framework, etc.); 14. main
Up to December 2020, with no domain and no year restrictions, a
outcomes. Due to the number of erences, the main characteristics of the
search was conducted on the following databases: Scopus, SpringerLink,
selected studies are accessible in Appendix A.
ACM Digital Library, IEEE Xplore, PubMed, and Web of Science. Details of
the search strings are shown in Table I.
Results
Eligibility criteria RQ1: Type of MBT used to detect children’s motor skills
To be included in this review, the publications had to: (1) involve MBT avails of sensors to capture motion data. The analysis of the
participants under 18 years of age, (2) use MBT to detect movements or studies in this review identified several types of sensors used to study
gestures, (3) conduct an evaluation study (studies focused on design children’s motion. They were classified into the following 6 clusters:
guidelines only were excluded), (4) be written in English and (5) have
the full-text available online or in the university’s library. - Inertial Measurement Unit (IMU): accelerometers and gyroscopes that
detect the angular variation and acceleration in movement. For
instance, the Nintendo Wiimote.
Search results
- Depth sensor: depth cameras that map the scene and provide 3D po-
sitions of humans’ joints. For example, the Microsoft Kinect and the
This scoping review was conducted following the PRISMA statement,
Leap Motion.
and its flow diagram is illustrated in Fig. 1. Besides the database search,
- Marker-based: sensors placed on the human body, which are tracked
the studies erenced in previous relevant SLRs were integrated individ-
by a set of high-resolution cameras to provide accurate 3D positions
ually into our list of works to review. Duplicated documents were
of the human’s joints. Such as the Vicon system.
removed, and the preliminary selection of works was obtained by
- Camera: video cameras that record the coloured scene and provide
reading the titles and the abstracts. Full papers were selected, observing
2D information about the human body. For instance, the Playstation
the eligibility criteria. Finally, 164 full texts were analysed and classified
Eye.
using the following categories: 1. erence; 2. year; 3. purpose (screening,
- Pressure mat: mats with force-plate cells that measure pressure and
assessment, intervention); 4. name of system; 5. device (depth sensor,
force. Their accuracy depends on the density of the cells. For
IMU, etc.); 6. motor skill (fine or gross); 7. the number of participants; 8.
example, the Wii Balanceboard and Dance Dance Revolution mat.
participants’ age; 9. type of participants (typically developing, autism,
- Others: touchscreens; goniometers and bending sensors, which cap-
cerebral palsy, etc.); 10. number of sessions; 11. duration of the sessions;
ture angles’ data and are usually embedded in clothing such as
gloves; dynamometers, such as mechanical arms that retrieve haptic
Table I information such as force, torque and power; and robots, amongst
Search strings.
others.
Scope String
Technology (“Motion-based” OR “gesture-based) AND Fig. 2 illustrates the use of these MBTs over the last few years. As
Motor skills ("motor skill" OR "locomotor" OR "balance" OR "stability" OR shown in the timeline (Fig. 2), research intensifies with the release of
"stationary" OR "manipulati*") AND commercial sensors. The first works examining the potential of IMUs and
Population ("child*" OR "adolescent" OR "teen*" AND NOT “adult”) Pressure mats, which sustained the research community’s interest for
MesH terms for ("Exercise"[Mesh] OR "Child Development"[Mesh] OR
almost a decade, emerged with the release of the Nintendo Wii and Wii
PubMed "Motor Skills"[Mesh])
2

B. Bossavit and I. Arnedillo-Sa´nchez                                                                                                                               C  o  m  p  u  t e r   M  e  t h  o d  s   a n  d   P  r o  g r  a m   s  i n   B  i o  m  e  d  i c i n  e  2  40(2023)107715
Fig. 2. Distribution of studies over time according to motion sensor used.
Table II
developmental motor skills developed during the rudimentary and fundamental phases identified in PDMS-2 [59], M-ABC2 [86], TGMD-2 [188] and BOT-2 [25].
| Type  |     | Dev. Phase  | Motor skill  | Device  | Nb       |
| ----- | --- | ----------- | ------------ | ------- | -------- |
CG  PS
| Gross Motor Skills  | Stationary    | Rudimentary  | Hold / turn head               |                    |          |
| ------------------- | ------------- | ------------ | ------------------------------ | ------------------ | -------- |
|                     |               | Rudimentary  | Sit                            | Other (cushion)    | 1        |
|                     |               | Rudimentary  | Stand up                       | DS                 | 1        |
|                     |               | Rudimentary  | Kneel                          |                    |          |
|                     |               | Rudimentary  | Squat                          | DS                 | 6  1     |
|                     |               | Fundamental  | Imitate movement               | DS                 | 3  3     |
|                     |               | Fundamental  | Stand on tiptoe                |                    |          |
|                     |               | Fundamental  | Stand one leg                  | PM                 | 16       |
|                     |               | Fundamental  | Touching opposite foot         |                    |          |
|                     |               | Fundamental  | Sit-up / Push-ups              |                    |          |
|                     | Locomotor     | Rudimentary  | Wiggle / Squirm                |                    |          |
|                     |               | Rudimentary  | Roll over                      |                    |          |
|                     |               | Rudimentary  | Crawl / scoot / cruise         |                    |          |
|                     |               | Rudimentary  | Step / walk                    | DS / IMU           | 33  3    |
|                     |               | Fundamental  | Walk on tiptoe                 |                    |          |
|                     |               | Fundamental  | Climb/Walk up/down steps       |                    |          |
|                     |               | Fundamental  | Walk line heel-toe             |                    |          |
|                     |               | Fundamental  | Run                            | DS / IMU / Camera  | 33  3    |
|                     |               | Fundamental  | Jump forward                   | DS / Camera        | 3        |
|                     |               | Fundamental  | Jump up / hurdles              | DS / trampoline    | 19  5    |
|                     |               | Fundamental  | Jump down                      |                    |          |
|                     |               | Fundamental  | Walk sideways                  | DS / PM / Camera   | 20       |
|                     |               | Fundamental  | Walk tiptoe                    |                    |          |
|                     |               | Fundamental  | Jump sideways                  | DS                 | 1        |
|                     |               | Fundamental  | Pedal                          | Other (Bike)       | 2        |
|                     |               | Fundamental  | Hop                            | DS / Camera        | 3        |
|                     |               | Fundamental  | Skip                           | Camera             | 1        |
|                     |               | Fundamental  | Gallop                         | DS / Camera        | 2        |
|                     |               | Fundamental  | Roll forward                   |                    |          |
|                     | Manipulative  | Rudimentary  | Push / pull                    | Other (Robot)      | 1        |
|                     |               | Rudi / Fund  | Kick a ball                    | Camera             | 1        |
|                     |               | Fundamental  | Dress / Undress                |                    |          |
|                     |               | Fundamental  | Throw an object                | Camera             | 1        |
|                     |               | Fundamental  | Catch an object                | Camera             | 1        |
|                     |               | Fundamental  | Clap hands with rhythm         |                    |          |
Fine motor skills  Manipulative  Rudimentary  Grasp fingers  DS / Others   3
|     |     | Rudimentary  | Touch face / mouth               | DS                    | 1    |
| --- | --- | ------------ | -------------------------------- | --------------------- | ---- |
|     |     | Rudimentary  | Hold toys                        | Other (FutureCube)    | 1    |
|     |     | Rudimentary  | Turn page                        |                       |      |
|     |     | Rudimentary  | Drink from cup                   |                       |      |
|     |     | Rudimentary  | Eat with spoon                   |                       |      |
|     |     | Rudi / Fund  | Pour                             |                       |      |
|     |     | Rudi / Fund  | Hold pencil                      |                       |      |
|     |     | Rudi / Fund  | Build tower                      | Other (FutureCube)    | 1    |
|     |     | Rudi / Fund  | Turn doorknob / screw lids       |                       |      |
|     |     | Rudi / Fund  | String small items               |                       |      |
|     |     | Rudi / Fund  | Draw a trail                     | DS / Camera / Other   | 3    |
|     |     | Rudi / Fund  | Placing coins / pegs             | DS / Camera           | 4    |
|     |     | Fundamental  | Thread a lace                    | DS / Camera           | 1    |
|     |     | Fundamental  | Build bridge/pyramid             |                       |      |
|     |     | Fundamental  | Touch body parts                 | DS                    | 2    |
|     |     | Fundamental  | Cut                              |                       |      |
|     |     | Fundamental  | Copy figures                     |                       |      |
|     |     | Fundamental  | Draw                             | DS                    | 2    |
|     |     | Fundamental  | Write                            |                       |      |
Dev: Development; DS: Depth sensor; PM: Pressure mat; NB: Number of studies; CG: Commercial games; PS: Personalised solutions.
3

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
Balanceboard (2008). Two years later, with the release of the Microsoft RQ3: Purpose for the use of MBT
Kinect (2011), the number of publications reporting the use of Depth
sensors experienced a solid increase, and they became the most popular A typical process to evaluate motor development, and identify po-
MBT to study children’s motion. Microsoft’s decision to release access to tential delays, encompasses 3 phases: Screening; Assessment; and Inter-
the Kinect sensor meta-data: the 3D position of the users’ skeleton, vention [17]. To keep the analogy with this process, we categorised the
significantly contributed to the adoption of this technology in the field studies according to the purpose for using MBT:
because it eased the development of personalised software and opened
novel research opportunities to develop customised digital tools. - Screening: detects the capacity for execution of specific motor skills
- Assessment: supports professionals in diagnosing potential develop-
RQ2: Motor skills detected by MBT mental delays/conditions
- Intervention: either treats or trains users through the execution of
This section analyses the motor skills detected by MBT in the 164 specific skills. This category encompassed 3 subcategories according
studies analysed. To understand the relevant skills in motor develop- to the objective of the intervention:
ment, we identified the skills used to assess motor functioning in chil- ■ Fitness: motivates and supports participants to do physical activ-
dren (Table II) [25,59,86,188]. ity. Participants in these studies were not necessarily assessed for
Most of the studies, 75 out of 164, made use of the following 8 impairments or underlying conditions. Two further sub-groups
commercial motion games: Kinect Adventure [51,89,115,138,163,204], were identified in the Fitness cluster:
Wii-fit [5,8,19,53,55,76,84,100,135,158,159,166,173,175,184,186], ○ Well-being: incorporates studies aimed at improving fitness
Eyepet [89], Eyeplay [9,98,108,120,129,140,168,182], Wii sport [2,38, levels and energy expenditure.
45,49,64,66,77,78,80,107,118,133,151,153,156,167,170,174,192,196, ○ Physical Education: includes studies aimed at integrating MBT in
197,199], Kinect sport [12,28,29,48,66,75,96,116,162,181,190], Dance school PE lessons.
Dance Revolution [2,11,37,54,58,65,78,108,121,123,148,172,173,189] ■ Therapy: supports therapies for children diagnosed as non-
and Kinems [104,105,161]. typically developing. This cluster is divided into two further
These commercial games detected 7 gross motor skills identified as sub-groups according to the aim of the therapy:
developmental motor skills (Table II). Of these, 4 were stationary skills: ○ Physical: encompasses studies aimed at working on specific
standing up (Kinect adventure, Kinect sport, Kinems); squatting (Kinect motor skills
adventure); imitating movement (Kinems) and standing on one leg (Wii-fit); ○ Cognitive: includes studies aimed at working on cognitive skills
and 3 were locomotor skills: running (Kinect adventure, Kinect sport, ■ Training: teaches, trains, or improves specific skills. This cluster is
Wii-fit); jumping up (Kinect adventures, Kinect sport, Kinems), and divided into two further sub-groups according to the training’s
walking sideways (Kinect adventures, Dance Dance Revolution). How- objective:
ever, it is fundamental to highlight that commercial games are not aimed ○ Physical: incorporates studies focusing on motor skills
at analysing the performance or correct execution of motor skills by
developing children. The detection is approximate since the aim of these Cognitive: includes studies focusing on cognitive skills
games is to entertain a broad audience of all ages. The above-mentioned A fourth category is added, which is called HCI, where the purpose of
commercial games were used to detect other motor skills such as change the studies is to provide guidelines for the use or development of MBT.
of body position (Kinect adventure, Kinect sport, Kinems, EyePlay), arm
movement (Kinect adventure, Kinect sport, Kinems, Wii-fit, Wii-sport, HCI
EyePet) and hand rotation (EyePet). However, the assessment frame- Out of 164 studies, 3 evaluated the interaction of MBT to provide
works do not define these three skills sets as developmental motor skills, guidelines for the HCI community [13,136,164]. 1 study developed a
and the studies involving them are not relevant to motor development protocol to recognise jumps and sidesteps while children play the Kinect
screening. Adventure game [163].
Using personalised solutions accounted for 72 studies, of which 28
detected developmental motor skills. There were 7 studies focused on Screening
stationary skills which recognised users’ sway movement while sitting Of 164 studies, 23 fell into the screening category, amongst which 19
[191] and standing [16], squatting [127], and imitating a posture [13,70, aimed to cluster motor differences. There were 14 studies which
154,194]. Another 7 studies looked at locomotor skills: jogging [22,102, measured the differences in body kinematics between TD children and
183], jumping (forward/up/sideways) [22,102,110,127,183], pedalling children with cerebral palsy [31,46,62,63,93,132], overweight [72,200,
with an indoor bike [1,82], hopping [22,102,183], skipping [183], and 201], down syndrome [36,113], scoliosis [198], hearing loss [10] or
galloping [102,183]. There were 2 studies focused on gross manipulative Williams syndrome [97]. Another 3 studies aimed to cluster kinematics
skills: push or pull [56] and kick, catch, strike, and throw objects [183]. differences of TD children manipulating different objects [60,101] or
Another 12 studies detected fine developmental motor skills: pinching performing dual tasks [73]. Additionally, 2 studies observed the quality
and grasping fingers [20,165,203], placing their hand on the face [99], of movement patterns between TD and children with DCD [75,178].
holding a toy [134], building a tower [134], drawing a trail [3,111,203], The remaining 4 studies aimed at screening the execution of specific
placing pegs [26,27,111,185], threading lace [111], touching specific parts motor skills such as grasping and building tower skills with TD children
of the body [23,24] and drawing [7,32]. The remaining 44 studies focused aged 7-9 years [134]; stereotypical gestures (hand in the face, hand
on detecting skills which are not considered developmental motor skills, flapping, hand behind back, body rocking, fingers flapping) in children
such as Arm movement [4,6,14,15,33,35,39,41,68,74,81,88,90,91,92, with ASD aged between 5 and 10 years [99]; jumping, hopping and jogging
106,109,131,137,138,145,146,160,164,171,179,195], body position with TD children aged 8 to 12 years [21]; run, gallop, jump forward, slide,
[39,40,41,43,71,79,90,91,137,164,169,195] and hand rotation [30,52, hop, skip, kick, catch, strike, throw up/down and dribble with TD children
69,83,94,95,103,112,136,150,157,202]. aged 4-6 years [183].
The last 17 studies used marker-based technology to analyse body
kinematics while children were walking [10,31,36,46,62,63,72,93,97, Assessment
113,132,198], performing dual tasks [73], stationary exercises [200,201] Out of the 164 studies, 3 aimed to support the assessment of motor or
or using hand tools [60,101]. These studies detected the range of motion, cognitive functioning in children by contrasting the results with
rotation and angular velocity of body joints but were not aimed at rec- assessment frameworks. Of these, 1 study assessed fine motor skills
ognising specific motor skills. (placing pegs, threading lace and drawing trails tasks) [111] with children
4

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
with and without DCD between 7 and 10 years using the assessment tool 138,145,154,185,194]. From the remaining studies, 6 studies fell in the
MABC-2 [86]. Another study assessed locomotor skills (jogging, jumping, Screening purpose [31,62,73,113,132] and 1 in the Assessing locomotor
hopping and galloping) [102] with TD children aged 3 to 8 years using the skills [102].
assessment tool TGMD-2 [188]. The last study assessed learning
disability [35] of children aged 7 to 11 years using a personalised so- Discussion
lution interacting with arm movements.
To understand the potential of MBT to screen motor skills in devel-
Intervention oping children, it was essential to understand the type of technology
The Intervention category was by far the largest, with 134 studies used to detect children’s motor skills (RQ1), the motor skills being
representing about 82% of the studies included in this review. Therapy detected by MBT (RQ2), the purpose for using MBT (RQ3) and which
was the most prolific by subcategories, with 68 studies, followed by motor development phase MBT was targeting (RQ4).
Fitness with 43, and Training with 23. In terms of the type of technology, excluding the Others category,
Further analysis highlights that within the Therapy cluster, MBT is which includes technology designed to recognise one specific skill [1,20,
predominantly used to support physical therapy with 53 studies [3,4,5,8, 56,82,92,103,110,134,136,203], Depth sensors provided the best range
9,15,16,19,20,27,28,29,33,38,40,51,52,53,55,68,77,84,88,92,96,98, detection of motor skills, followed by pressure mats as second best and
100,103,104,115,116,135,146,154,158,159,160,165,166,167,168, IMU as third. Cameras were limited to detecting upper limbs’ movements
170,174,175,179,181,184,185,186,191,199,203,204]. In contrast, which are not part of developmental motor skills. In addition to
there were only 15 studies in the cognitive therapy category [7,12,30,32, detecting upper limbs’ movements, IMUs were also used to recognise
41,69,70,81,138,157,161,169,171,194,202]. In terms of the Fitness locomotor skills such as stepping or running. Pressure mats detected sta-
cluster, 29 studies fell in the well-being group [1,37,54,56,76,78,79,80, tionary skills such as standing on one leg, swaying movement while
82,89,107,108,110,118,120,121,123,127,129,131,140,148,151,153, standing, or lateral steps. Depth sensors provide the broadest detection
162,182,189,196,197], and 14 studies in the physical education [2,11,45, range encompassing stationary skills: standing, standing on one leg,
48,49,58,64,65,66,133,156,172,192,195]. Finally, the Training cluster imitating posture; locomotor skills: stepping, running, jumping; and fine
consisted of 5 studies in the physical skills training group [26,43,71,173, motor skills: touching body parts, following a trail, placing an object. Mar-
190] and 18 in the cognitive one [6,14,23,24,39,74,83,90,91,94,95,105, ker-based technology is expensive but provides a very accurate measure
106,109,112,137,145,150]. of body detection. However, its use was limited to observing kinematics
with body joints’ range of motion, rotation, and angular velocity.
RQ4: Motor development phases targeted by MBT Mapping all the studies against their purpose and the MBT used
(Fig. 3), depth sensors also stand out as the only technology implemented
Motor development is defined by the lexive (in-utero to 1 year), across all purpose categories articulated in this review: screening,
Rudimentary (1 to 2 years), Fundamental (2 to 7 years) and Specialised assessment, intervention and HCI. For the Screening purpose of motor
(7+years) developmental phases [61]. While during the lexive (in-utero development skills (Table II), depth sensors were used to recognise jumps
– 1 year) phase, children perform involuntary movements, which turn forward/high/sideways, hop and jog [22]. Although the dominant tech-
into voluntary movements in the Rudimentary (1-2 years) phase, it is in nology used for Screening purposes was marker-based, it was limited to
the Fundamental (2-7 years) phase when they develop basic motor skills. observing body kinematics to cluster differences between children with
Once acquired, they become building blocks for children to develop and without disability. The remaining technology used for Screening
more complex movement patterns during the Specialised (7+ years) purposes to detect motor development skills were the smart toy Futur-
phase when children learn to combine basic motor skills for more eCube: to hold a cube and build a tower skill [134]; and a camera to
complex purposes and enter a lifelong utilisation stage [61]. The recognise run, gallop, jump forward, slide, hop, skip, kick, catch, strike,
development of motor skills is progressive and improves with age [176]. throw up/down and dribble [183]. In terms of Assessment, one study
Although fine and gross motor skills develop independently [176], once combined the depth sensor Leap Motion with an eye-tracking camera to
these are acquired, they become building blocks for children to develop support the assessment of the fine motor skills of placing pegs, threading
more complex movement patterns and are beneficial for their health lace and drawing trails [111], and one study used the depth sensor Kinect
[114]. to classify the execution of the locomotor skills jumps for-
2 studies fell within the Rudimentary movement phase. The first aimed ward/high/sideways, hop, gallop and jog [102].
to understand the differences between toddlers using a hammer with To understand whether MBT is suited for a young audience, we
and without a handle [60]. The second study examined how toddlers
(between 1- and 3 years old) manipulate objects according to their age
[101]. Both studies aimed at screening motor skills.
There were 19 studies involving children who fell under the Funda-
mental movement phase. Out of these, 6 studies [9,66,161,167,190,204]
used commercial games which are not explicitly aimed at analysing the
performance or correct execution of motor skills by developing children.
Another 11 studies [4,41,74,83,90,91,92,94,106,112,160] detected
skills not defined as motor development skills. Theore, only 2 studies
focused on developmental motor skills: placing a virtual coloured ball in
its corresponding box [26] and the execution of gross motor skills (run,
gallop, jump forward, slide, hop, skip, kick, catch, strike, throw up/down and
dribble) [183].
The remaining 143 studies involved children over 7 years old (Spe-
cialised movement phase). However, amongst those studies, 48 also
involved participants from the Fundamental movement phases with 20
studies that used commercial games [5,19,28,38,45,51,53,55,65,77,
100,105,115,116,168,170,174,175,184,186], 2 studies provided Fig. 3. Distribution of studies according to technologies & application purpose.
guidelines for the HCI field [13,164] and 19 used personalised solutions
for Intervention purposes [3,7,15,16,39,40,43,52,56,70,71,88,110,131,
5

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
analysed the studies considering the MBT used and the participants’ age.
We selected all the studies where the subjects fell under the Rudimentary
(1-2 years) and Fundamental (2 -7 years) movement phases (Fig. 4). The
results show that all motion-based technologies were evaluated with
children aged 4 years and older. Since the American Academy of Pae-
diatrics [141] recommends an early detection programme for develop-
mental delays from month 9 (lexive movement phase) to years 4-5
(Fundamental movement phase), we will focus on the use of MBT for
children aged 4 and under.
For the studies where the youngest participants were 4 years old, 7
studies used commercial games [9,16,66,116,138,170,174], 6 studies
detected skills not defined as motor development [39,40,41,71,92,106]
and 2 studies used marker-based technology to observe body kinematics
[73,132]. The remaining 2 studies with children aged 4 years old
detected the drawing trail with the depth sensor Leap motion [3] and the Fig. 4. Distribution of studies according to MBT (vertical axis) & children’s age
run, gallop, jump forward, slide, hop, skip, kick, catch, strike, throw up/down (horizontal axis) of the youngest participant.
and dribble motor skills with a camera (183).
At age 3, 2 studies used commercial games [28,167], and 3 studies developmental delays to support the screening and assessment of motor
detected skills that are not considered motor development [4,83,145]. skills in developing children. In this regard, the use of MBT in the
The depth sensor Microsoft Kinect was used in one study to assess the literature was examined to understand its potential and encourage the
jumps forward/high/sideways, hop, gallop and jog locomotor skills [102]. HCI community to contribute. Many studies (134 out of 164) focused on
Only 2 studies evaluated MBT with children aged 2 years old. Of Interventions (Fitness, Therapy and Training) that used MBT. Most studies
these, 1 study used the depth sensor Microsoft Kinect to provide guide- (143 out of 164) evaluated children in the Specialised development phase
lines for the HCI community but did not detect motor development skills when basic motor skills have already been acquired. Out of the 164
[164]. The other study used marker-based technology to observe the studies, only 26 (about 16%) focused on screening or assessing motor
body kinematics of children avoiding obstacles while walking [31]. skills in developing children (under the age of 7 years). This clearly il-
Finally, at age 1, 2 studies used marker-based technology to analyse lustrates that this domain remains underexplored.
the arms kinematics of toddlers manipulating objects [60,101]. Current MBT, particularly depth sensors, has shown great potential
Overall, depth sensors seem to be the prevailing technology in the in detecting relevant motor skills in the context of motor development.
range of detection, the field of application and the age range of partic- Although several motor skills were being recognised by MBT, the range
ipants starting at age 2. Thus, depth sensors could be considered the of skills detected represents only about half of those identified as
technology with the most potential for detecting and screening motor developmental motor skills (Table II). This suggests that future research
skills in developing children. However, no single technology detected all should design and implement multimodal approaches combining
the skills defined as developing motor skills. To this end, research on the different MBTs to increase the range and quality of detection. Work
design of multimodal technologies which combine different types of investigating the incorporation of technology in the screening and
sensors may offset the shortcomings of a single technology approach. assessment of motor skills development could support professionals and
For instance, depth sensors hardly detect bodies while lying on the increase access to early detection programmes, assessment, diagnosis,
ground, which hinders the detection of specific developmental skills and interventions when/if needed.
such as sit-ups or push-ups. On the other hand, low-cost pressure mats
would not know about the body posture while detecting pressure.
CRediT authorship contribution statement
Theore, combining both sensors would facilitate the detection of such
skills. Another example would be combining IMU with depth sensors to
Benoit Bossavit: Conceptualization, Methodology, Data curation,
improve head rotation and manipulative skills such as throwing/ Writing – original draft, Visualization, Investigation, Writing – review &
catching objects or even fine motor skills such as writing. editing. Inmaculada Arnedillo-Sa´nchez: Conceptualization, Supervi-
Although the literature supports the idea that MBT can be used to sion, Writing – review & editing.
recognise developmental motor skills, integrating the complete set of
motor skills into a digital screener could be tedious and complex due to
the variety of skills. Also, it would require combining different sensors Declaration of Competing Interest
and considering the different ages targeted to adapt the visual in-
structions to the respective cognitive stages [177]. Professionals use The authors have no conflicts of interest to disclose.
different frameworks for screening, ranging from very extensive [59] to
succinct ones [86,188]. The latter proposes a shorter list of 2-4 skills per Funding statement
group (stationary, locomotor, manipulative gross and fine) and could be
a good starting point for a digital screener. To this end, a recent study Benoît Bossavit receives funding from the EU H2020 under the Marie
developed a framework that detects and analyses developmental loco- Skłodowska-Curie Career-FIT fellowship (Co-fund grant No. 713654).
motor skills in children aged 4-6 with a depth sensor in real-time [22]. Funding for open access charge: Universidad de Ma´laga / CBUA.
This paper reviews a large number of studies (164) using MBT in
order to understand their use and their potential for early detection of
Supplementary materials
motor delay. Although this review is limited to scoping the literature and
does not include an assessment or risk of bias of the included articles, it
Supplementary material associated with this article can be found, in
identifies a new research direction with MBT.
the online version, at doi:10.1016/j.cmpb.2023.107715.
Conclusions
References
This scoping review highlights the lack of technological input, which
[1] K.B. Adamo, et al., Effects of interactive video game cycling on overweight and
could increase access to early detection and intervention of obese adolescent health, Appl Physiol Nutr Metab 35 (6) (2010) 805–815.
6

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
[2] M. Adkins, et al., Can dance exergaming contribute to improving physical activity [27] S. Cai, et al., A case study of gesture-based games in enhancing the fine motor
levels in elementary school children? African Journal for Physical Activity and skills and recognition of children with autism, Interactive Learning Environments
Health Sciences 19 (3) (2013) 576–585. (2018) 1–14, https://doi.org/10.1080/10494820.2018.1437048.
[3] I. Afyouni, et al., Motion-Based Serious Games for Hand Assistive Rehabilitation, [28] F.R. Camara Machado, et al., Motor Improvement Using Motion Sensing Game
in: Proceedings of the 22nd International Conference on Intelligent User Devices for Cerebral Palsy Rehabilitation, Journal of Motor Behavior 49 (3)
Interfaces Companion - IUI ’17 Companion, 2017, pp. 133–136, https://doi.org/ (2017) 273–280, https://doi.org/10.1080/00222895.2016.1191422.
10.1145/3030024.3040977. [29] J.C. Caˆndido Soares, et al., Influence of the Microsoft Kinect® games on the motor
[4] Q.U. Ain, et al., Impact of exergames and game elements on cerebral palsy and functional performance of a child with developmental coordination disorder,
children: Resistance and sound, Extended Abstracts - Proceedings of the 2020 Brazilian Journal of Occupational Therapy 27 (4) (2019) 710–717, https://doi.
ACM Interaction Design and Children Conference, IDC 2020 (2020) 163–168, org/10.4322/2526-8910.CTOAO1630.
https://doi.org/10.1145/3397617.3397827. [30] D.C. Capelo, et al., Multisensory Virtual Game with Use of the Device Leap
[5] A.A. AlSAif, S. Alsenany, Effects of interactive games on motor performance in Motion to Improve the Lack of Attention in Children of 7–12 Years with ADHD,
children with spastic cerebral palsy, Journal of Physical Therapy Science 27 Advances in Intelligent Systems and Computing 721 (Jan. 2018) 897–906,
(2015) 2001–2003. https://doi.org/10.1007/978-3-319-73450-7_85.
[6] G. Altanis, et al., Children with Motor Impairments Play a Kinect Learning Game : [31] X.G. Cappellini, et al., Locomotor patterns during obstacle avoidance in children
First Findings from a Pilot Case in an Authentic Classroom Environment, with cerebral palsy, J Neurophysiol 124 (2020) 574–590, https://doi.org/
Interaction Design and Architecture(s) Journal - IxD&A 19 (2013) 91–104. 10.1152/jn.00163.2020.-We.
[7] L.V. Amado Sanchez, et al., BeeSmart: A Gesture-Based Videogame to Support [32] K. Caro, et al., FroggyBobby: An exergame to support children with motor
Literacy and Eye-Hand Coordination of Children with Down Syndrome, problems practicing motor coordination exercises during therapeutic
International Conference on Games and Learning Alliance (2017) 43–53. interventions, Computers in Human Behavior 71 (2017) 479–498, https://doi.
[8] J. Andrysek, et al., Preliminary evaluation of a commercially available videogame org/10.1016/j.chb.2015.05.055.
system as an adjunct therapeutic intervention for improving balance among [33] K. Caro, et al., Using a Gesture-based videogame to support eye-hand
children and adolescents with lower limb amputations, Arch Phys Med Rehabil coordination and pre-literacy skills of children with down syndrome, Multimedia
93 (2) (2012) 358–366, https://doi.org/10.1016/j.apmr.2011.08.031. Tools and Applications 79 (45–46) (2020) 34101–34128, https://doi.org/
[9] T. Ashkenazi, et al., Effect of training children with Developmental Coordination 10.1007/s11042-020-09452-x.
Disorders in a virtual environment compared with a conventional environment, [34] J. Case-Smith, et al., A systematic review of sensory processing interventions for
International Conference on Virtual Rehabilitation (ICVR) (2013) 46–50. children with autism spectrum disorders, Autism 19 (2) (2015) 133–148, https://
[10] E. Azadian, et al., The impact of hearing loss on three-dimensional lower limb doi.org/10.1177/1362361313517762.
joint torques during walking in prepubertal boys, Journal of Bodywork and [35] E. Chatzidaki, et al., Let’s play a game! kin-LDD: A tool for assisting in the
Movement Therapies 24 (2) (Apr. 2020) 123–129, https://doi.org/10.1016/j. diagnosis of children with learning difficulties, Multimodal Technologies and
jbmt.2019.10.013. Interaction 3 (1) (Mar. 2019), https://doi.org/10.3390/mti3010016.
[11] L.B. Azevedo, et al., The effect of dance mat exergaming systems on physical [36] H.L. Chen, et al., Obstacle crossing in 7-9-year-old children with Down syndrome,
activity and health - Related outcomes in secondary schools: Results from a Research in Developmental Disabilities 48 (Jan. 2016) 202–210, https://doi.org/
natural experiment, BMC Public Health 14 (1) (2014) 1–13, https://doi.org/ 10.1016/j.ridd.2015.11.004.
10.1186/1471-2458-14-951. [37] A. Chin, et al., The motivation of children to play an active video game, J Sci Med
[12] L. Bartoli, et al., Designing and evaluating touchless playful interaction for ASD Sport 11 (2) (2008) 163–166, https://doi.org/10.1016/j.jsams.2007.06.001.
children, Proceedings of conference on Interaction design and children (2014) [38] H.C. Chiu, et al., Upper limb training using Wii Sports Resort for children with
17–26. hemiplegic cerebral palsy: a randomized, single-blind trial, Clinical
[13] L. Bartoli, et al., Exploring motion-based touchless games for autistic children’s rehabilitation. 28 (10) (Oct. 2014) 1015–1024, https://doi.org/10.1177/
learning, ACM International Conference Proceeding Series (2013) 102–111, 0269215514533709.
https://doi.org/10.1145/2485760.2485774. [39] M.I. Contreras, et al., Videogame-based tool for learning in the motor, cognitive
[14] A. Bhattacharya, et al., Designing Motion-Based Activities to Engage Students and socio- emotional domains for children with Intellectual Disability,
with Autism in Classroom Settings, Proceedings of conference on Interaction Entertainment Computing 30 (2019), 100301, https://doi.org/10.1016/j.
design and children (2015) 69–78. entcom.2019.100301.
[15] P.E. Bilde, et al., Individualized, home-based interactive training of cerebral palsy [40] R. Cornejo, et al., Indirect sensing surfaces to support Movement-Based Learning
children delivered through the Internet, BMC Neurol 11 (2011) 32, https://doi. therapy, Proceedings of the Latin American Conference on Human-Computer
org/10.1186/1471-2377-11-32. Interaction (2017), https://doi.org/10.1145/3151470.3151474.
[16] P.M. Bingham, B. Calhoun, Digital Posturography Games Correlate with Gross [41] C. Crowell, et al., Structuring collaboration : Multi-user full-body interaction
Motor Function in Children with Cerebral Palsy, Games for Health Journal 4 (2) environments for children with Autism Spectrum Disorder, Research in Autism
(2015) 145–148, https://doi.org/10.1089/g4h.2014.0096. Spectrum Disorders 58 (2019) 96–110, https://doi.org/10.1016/j.
[17] R. Blank, et al., International clinical practice recommendations on the definition, rasd.2018.11.003.
diagnosis, assessment, intervention, and psychosocial aspects of developmental [42] A.M. Daniels, et al., Approaches to enhancing the early detection of autism
coordination disorder, Developmental medicine and child neurology 61 (3) (Mar. spectrum disorders: A systematic review of the literature, Journal of the American
2019) 242–285, https://doi.org/10.1111/DMCN.14132. Academy of Child and Adolescent Psychiatry 53 (2) (2014) 141–152, https://doi.
[18] C.H. Blauw-Hospers, M. Hadders-Algra, A systematic review of the effects of early org/10.1016/j.jaac.2013.11.002.
intervention on motor development, Dev Med Child Neurol 47 (2005) 421–432. [43] R. van Delden, et al., A Thing of Beauty : Steering Behavior in an Interactive
[19] E. Bonney, et al., Learning better by repetition or variation? Is transfer at odds Playground, Chi (2017) 2462–2472, https://doi.org/10.1145/3025453.3025816.
with task specific training? PLoS ONE 12 (3) (2017) 1–17, https://doi.org/ [44] A. Diamond, Close interrelation of motor development and cognitive
10.1371/journal.pone.0174214. development and of the cerebellum and prontal cortex, Child Development 71 (1)
[20] I. Bortone, et al., Wearable Haptics and Immersive Virtual Reality Rehabilitation (2000) 44–56.
Training in Children With Neuromotor Impairments, IEEE Transactions on Neural [45] K. Dickinson, M. Place, A randomised control trial of the impact of a computer-
Systems and Rehabilitation Engineering 26 (7) (2018) 1469–1478, https://doi. based activity programme upon the fitness of children with autism, Autism Res
org/10.1109/TNSRE.2018.2846814. Treat 2014 (2014), 419653, https://doi.org/10.1155/2014/419653.
[21] B. Bossavit, I. Arnedillo-S´anchez, Designing digital activities to screen locomotor [46] P.C. Dixon, et al., The use of turning tasks in clinical gait analysis for children
skills in developing children, Lecture Notes in Computer Science (including with cerebral palsy, Clinical Biomechanics 32 (Feb. 2016) 286–294, https://doi.
subseries Lecture Notes in Artificial Intelligence and Lecture Notes in org/10.1016/j.clinbiomech.2015.10.010.
Bioinformatics) (2020) 416–420, https://doi.org/10.1007/978-3-030-57717-9_ [47] A.M. D’Mello, C.J. Stoodley, Cerebro-cerebellar circuits in autism spectrum
37. disorder, Frontiers in Neuroscience 9 (2015) 408, https://doi.org/10.3389/
[22] B. Bossavit, I. Arnedillo-S´anchez, Using motion capture technology to assess fnins.2015.00408.
locomotor development in children, Digital Health 8 (Jan. 2022), https://doi. [48] M.J. Duncan, et al., Physical activity levels during a 6-week, school-based, active
org/10.1177/20552076221144201/ASSET/IMAGES/LARGE/10.1177_ videogaming intervention us- ing the gamercize power stepper in British children,
20552076221144201-FIG6.JPEG. Med Sport 15 (2011) 81–87, https://doi.org/10.2478/v10036-011-0014-0.
[23] B. Bossavit, S. Parsons, Outcomes for design and learning when teenagers with [49] M.J. Duncan, V. Staples, The impact of a school-based active video game play
autism codesign a serious game: A pilot study, Journal of Computer Assisted intervention on children’s physical activity during recess, HumMov 11 (2010)
Learning (2018), https://doi.org/10.1111/jcal.12242. 95–99, https://doi.org/10.2478/V10038-009-0023-1.
[24] B. Bossavit, A. Pina, Designing educational tools, based on body interaction, for [50] Eikeseth, S. 2011. Intensive early intervention. International Handbook of Autism
children with special needs who present different motor skills, Proceedings - 2014 and Pervasive Developmental Disorders. J. L. Matson & P. Strumey (eds.), Springer
International Conference on Interactive Technologies and Games, iTAG 2014 New York. 321–338.
(2014). [51] B. Engel-Yeger, et al., Relationship between perceived competence and
[25] R. Bruininks, B. Bruininks, Bruininks-Oseretsky test of motor proficiency, 2nd ed., performance during real and virtual motor tasks by children with developmental
NCS Pearson, Minneapolis, MN, 2005. coordination disorder, Disability and Rehabilitation: Assistive Technology 12 (7)
[26] J.C. Cabrera Hidalgo, et al., Serious game to improve fine motor skills using Leap (2017) 752–757, https://doi.org/10.1080/17483107.2016.1261305.
Motion. Congreso Argentino de Ciencias de la Informatica y Desarrollos de [52] I. Escobar, et al., ine Motor Rehabilitation of Children Using the Leap Motion
Investigacion, (CACIDI), 2018. Device – Preliminary Usability Tests, World Conference on Information Systems
and Technologies (2018) 1030–1039.
7

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
[53] M. Esposito, et al., Effectiveness and safety of Nintendo Wii Fit PlusTM training in [79] R. Graf, et al., Igym: An interactive floor projection system for inclusive exergame
children with migraine without aura: a preliminary study, Neuropsychiatr Dis environments, in: CHI PLAY 2019 - Proceedings of the Annual Symposium on
Treat 9 (2013) 1803–1810, https://doi.org/10.2147/NDT.S53853. Computer-Human Interaction in Play, Oct. 2019, pp. 31–43, https://doi.org/
[54] S.G. Fawkner, et al., Adolescent girls’ energy expenditure during dance sim- 10.1145/3311350.3347161.
ulation active computer gaming, Journal of Sports Sciences 28 (2010) 61–65, [80] L.E. Graves, et al., The contribution of upper limb and total body movement to
https://doi.org/10.1080/02640410903369935. adolescents’ energy expenditure whilst playing Nintendo Wii, Eur J Appl Physiol
[55] G.D. Ferguson, et al., The efficacy of two task-orientated interventions for 104 (4) (2008) 617–623, https://doi.org/10.1007/s00421-008-0813-8.
children with Developmental Coordination Disorder: Neuromotor Task Training [81] R. Guarnieri, et al., Test-Retest Reliability and Clinical Feasibility of a Motion-
and Nintendo Wii Fit training, Research in Developmental Disabilities 34 (9) Controlled Game to Enhance the Literacy and Numeracy Skills of Young
(2013) 2449–2461, https://doi.org/10.1016/j.ridd.2013.05.007. Individuals with Intellectual Disability, Cyberpsychol Behav Soc Netw 22 (2)
[56] M. Ferraz, et al., Increasing Children’s Physical Activity Levels Through Biosymtic (2019) 111–121, https://doi.org/10.1089/cyber.2017.0534.
Robotic Devices, Proceedings of the 13th International Conference on Advances [82] B.L. Haddock, et al., The Addition of a Video Game to Stationary Cycling: The
in Computer Entertainment Technology - ACE2016 (2016) 1–14, https://doi.org/ Impact on Energy Expenditure in Overweight Children, Open Sports Sci J 2
10.1145/3001773.3001781. (2009) 42–46, https://doi.org/10.2174/1875399x00902010042.
[57] V.J. Fischer, et al., Developmental screening tools: Feasibility of use at primary [83] O. Halabi, et al., Immersive Virtual Reality in Improving Communication Skills in
healthcare level in low- and middle-income settings, Journal of Health, Children with Autism, International Journal of Interactive Mobile Technologies
Population and Nutrition 32 (2) (2014) 314–326, https://doi.org/10.3329/jhpn. (iJIM) 11 (2) (Apr. 2017) 146–158, https://doi.org/10.3991/IJIM.V11I2.6555.
v32i2.2625. [84] J. Hammond, et al., An investigation of the impact of regular use of the Wii Fit to
[58] V.A. Fogel, et al., The effects of exergaming on physical activity among inactive improve motor and psychosocial outcomes in children with movement
children in a physical education classroom, J Appl Behav Anal 43 (4) (2010) difficulties: A pilot study, Child: Care, Health and Development 40 (2) (2014)
591–600, https://doi.org/10.1901/jaba.2010.43-591. 165–175, https://doi.org/10.1111/cch.12029.
[59] M.R. Folio, R.R. Fewell, Peabody developmental motor scales (second edition), [85] T. Hanakawa, Rostral premotor cortex as a gateway between motor and cognitive
Pro-Ed, Austin, TX, 2000. networks, Neuroscience Research 70 (2) (2011) 144–154.
[60] D. Fragaszy, et al., Ontogeny of tool use: how do toddlers use hammers? [86] S.E. Henderson, et al., Movement assessment battery for children-2 second
Developmental Psychobiology 58 (6) (Sep. 2016) 759–772, https://doi.org/ edition, The Psychological Corporation, London, UK, 2007.
10.1002/dev.21416. [87] R. Hickman, et al., Use of active video gaming in children with neuromotor
[61] D.L. Gallahue, et al., Understanding Motor Development, McGraw-Hill, Boston, dysfunction : a systematic review, DEVELOPMENTAL MEDICINE & CHILD
2012. NEUROLOGY 59 (9) (2017) 903–911, https://doi.org/10.1111/dmcn.13464.
[62] M. Galli, et al., An examination of the relationship between dynamic knee joint [88] C.L. Hilton, et al., Effects of exergaming on executive function and motor skills in
stiffness and gait pattern of children with cerebral palsy, Journal of Bodywork children with autism spectrum disorder: a pilot study, Am J Occup Ther 68 (1)
and Movement Therapies 22 (3) (Jul. 2018) 747–751, https://doi.org/10.1016/j. (2014) 57–65, https://doi.org/10.5014/ajot.2014.008664.
jbmt.2017.11.009. [89] E.K. Howie, et al., Understanding why an active video game intervention did not
[63] M. Galli, et al., Kinematic analysis of upper limb during walking in diplegic improve motor skill and physical activity in children with developmental
children with Cerebral Palsy, European Journal of Paediatric Neurology 18 (2) coordination disorder: A quantity or quality issue? Research in Developmental
(2014) 134–139, https://doi.org/10.1016/j.ejpn.2013.09.007. Disabilities 60 (2017) 1–12, https://doi.org/10.1016/j.ridd.2016.10.013.
[64] Z. Gao, et al., A comparison of children’s physical activity levels in physical [90] H. Hsiao, J. Chen, Using a gesture interactive game-based learning approach to
education, recess, and exergaming, J Phys Act Health 12 (3) (2015) 349–354, improve preschool children ’ s learning performance and motor skills, Computers
https://doi.org/10.1123/jpah.2013-0392. & Education 95 (2016) 151–162, https://doi.org/10.1016/j.
[65] Z. Gao, et al., Effects of exergaming on motor skill competence, perceived compedu.2016.01.005.
competence, and physical activity in preschool children, Journal of Sport and [91] H.sheng Hsiao, et al., The influence of a gesture-based learning approach on
Health Science 8 (2) (2019) 106–113, https://doi.org/10.1016/j. preschoolers’ learning performance, motor skills, and motion behaviors,
jshs.2018.12.001. Interactive Learning Environments (2017) 1–13, https://doi.org/10.1080/
[66] Z. Gao, The impact of an exergaming intervention on urban school children’s 10494820.2017.1419498.
physical activity levels and academic outcomes, Asian J Exerc Sports Sci 10 [92] H.-C. Hsieh, et al., Upper-Limb Rehabilitation With Adaptive Video Games for
(2013) 1–10. Preschool Children With Developmental Disabilities, American Journal of
[67] S. García-Bravo, et al., Virtual reality and video games in cardiac rehabilitation Occupational Therapy July/August 69 (4) (2015) 1–5.
programs. A systematic review, Disability and Rehabilitation 43 (4) (2021) [93] B.J. Hsue, et al., The dynamic balance of the children with cerebral palsy and
448–457, https://doi.org/10.1080/09638288.2019.1631892. typical developing during gait. Part I: Spatial relationship between COM and COP
[68] N. Garcia-Hernandez, et al., Virtual body representation for rehabilitation trajectories, Gait and Posture 29 (3) (Apr. 2009) 465–470, https://doi.org/
influences on motor performance of cerebral palsy children, Virtual Reality 10.1016/j.gaitpost.2008.11.007.
(2020), https://doi.org/10.1007/s10055-020-00481-3. [94] X. Hu, et al., Comparing Computer-Assisted and Teacher-Implemented Visual
[69] B. Garcia-Zapirain, et al., Dual System for Enhancing Cognitive Abilities of Matching Instruction for Children with ASD and/or Other DD, Journal of Autism
Children with ADHD Using Leap Motion and eye-Tracking Technologies, Journal and Developmental Disorders 50 (7) (Jul. 2020) 2540–2555, https://doi.org/
of medical systems 41 (7) (Jul. 2017), https://doi.org/10.1007/S10916-017- 10.1007/S10803-019-03978-2/FIGURES/5.
0757-9. [95] Hu, X. and Han, Z.R. 2019. Effects of gesture-based match-to-sample instruction
[70] F. Garzotto, et al., Motion-based touchless interaction for ASD children: A case via virtual reality technology for Chinese students with autism spectrum
study, in: Proceedings of the Workshop on Advanced Visual Interfaces AVI, 2014, disorders. https://doi.org/10.1080/20473869.2019.1602350. 65, 5 (Oct. 2019),
pp. 117–120, https://doi.org/10.1145/2598153.2598197. 327–336. https://doi.org/10.1080/20473869.2019.1602350.
[71] K. Gerling, et al., Designing Interactive Manual Wheelchair Skills Training for [96] W. Ilg, et al., Video game-based coordinative training improves ataxia in children
Children, in: Proceedings of the 2019 on Designing Interactive Systems with degenerative ataxia, Neurology 79 (2012) 2056–2060, https://doi.org/
Conference, 2019, https://doi.org/10.1145/3322276. 10.1212/WNL.0b013e3182749e67.
[72] S.v. Gill, et al., Effects of singular and dual task constraints on motor skill [97] Y. Ito, et al., Gait characteristics of children with Williams syndrome with
variability in childhood, Gait and Posture 53 (Mar. 2017) 121–126, https://doi. impaired visuospatial recognition: a three-dimensional gait analysis study,
org/10.1016/j.gaitpost.2017.01.021. Experimental Brain Research 238 (12) (Dec. 2020) 2887–2895, https://doi.org/
[73] S.V. Gill, Y.C. Hung, Effects of overweight and obese body mass on motor 10.1007/s00221-020-05946-0.
planning and motor skills during obstacle crossing in children, Research in [98] M.J.A. Jannink, et al., A Low-Cost Video Game Applied for Training of Upper
Developmental Disabilities 35 (1) (Jan. 2014) 46–53, https://doi.org/10.1016/j. Extremity Function in Children with Cerebral Palsy: A Pilot Study,
ridd.2013.10.024. CyberPsychology & Behavior 11 (1) (2008) 27–32, https://doi.org/10.1089/
[74] M. Goffredo, et al., Evaluation of a motion-based platform for practicing cpb.2007.0014.
phonological awareness of preschool children, Journal of Educational Computing [99] M. Jazouli, et al., Automatic detection of stereotyped movements in autistic
Research 54 (5) (Sep. 2016) 595–618, https://doi.org/10.1177/ children using the Kinect sensor, International Journal of Biomedical Engineering
0735633115626881. and Technology 2 (3) (2019) 201–220, https://doi.org/10.1504/
[75] L. Gonsalves, et al., Children With Developmental Coordination Disorder Play IJBET.2019.097621.
Active Virtual Reality Games Differently Than Children With Typical [100] D. Jelsma, et al., The impact of Wii Fit intervention on dynamic balance control in
Development, American Physical Therapy Association 95 (3) (2015) 360–368, children with probable Developmental Coordination Disorder and balance
https://doi.org/10.2522/ptj.201.30227. problems, Human Movement Science 33 (1) (2014) 404–418, https://doi.org/
[76] C.S. Gonz´alez, et al., Learning healthy lifestyles through active videogames, 10.1016/j.humov.2013.12.007.
motor games and the gamification of educational activities, Computers in Human [101] W.P. Jung, et al., Manual action, fitting, and spatial planning: Relating objects by
Behavior 55 (2016) 529–551, https://doi.org/10.1016/j.chb.2015.08.052. young children, Cognition 134 (Jan. 2015) 128–139, https://doi.org/10.1016/j.
[77] C. Gordon, et al., Potential of the Nintendo WiiTM as a rehabilitation tool for cognition.2014.09.004.
children with cerebral palsy in a developing country: a pilot study, Physiotherapy [102] D.H. K Chow, et al., Video-Based Classification System for Assessing Locomotor
98 (3) (2012) 238–242, https://doi.org/10.1016/j.physio.2012.05.011. Skills in Children, 2020.
[78] D.L. Graf, et al., Playing active video games increases energy expenditure in [103] J.W. Keller, H.J.A. van Hedel, Weight-supported training of the upper extremity
children, Pediatrics 124 (2) (2009) 534–540, https://doi.org/10.1542/ in children with cerebral palsy: A motor learning study, Journal of
peds.2008-2851. NeuroEngineering and Rehabilitation 14 (1) (2017) 1–13, https://doi.org/
10.1186/s12984-017-0293-3.
8

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
[104] P. Kosmas, et al., Using embodied learning technology to advance motor [128] M. Mat Rosly, et al., Exergaming for individuals with neurological disability: a
performance of children with special educational needs and motor impairments, systematic review, Disability and Rehabilitation 39 (8) (2017) 727–735, https://
European Conference on Technology Enhanced Learning (2017) 1–14, https:// doi.org/10.3109/09638288.2016.1161086.
doi.org/10.1007/978-3-319-66610-5_9. [129] J. McDougall, M.J. Duncan, Children, video games and physical activity: An
[105] M. Kourakli, et al., Towards the improvement of the cognitive, motoric and exploratory study, International Journal on Disability and Human Development 7
academic skills of students with special educational needs using Kinect learning (1) (2008) 89–94, https://doi.org/10.1515/IJDHD.2008.7.1.89.
games, International Journal of Child-Computer Interaction 11 (2017) 28–39, [130] P. de Medeiros, et al., Exergames As a Tool for the Acquisition and Development
https://doi.org/10.1016/j.ijcci.2016.10.009. of Motor Skills and Abilities: a Systematic Review, Revista paulista de pediatria :
[106] N.K. Lai, et al., Learning through intuitive interface : A case study on preschool orgao oficial da Sociedade de Pediatria de Sao Paulo 35 (4) (2017) 464–471,
learning, Computers & Education 126 (August) (2018) 443–458, https://doi.org/ https://doi.org/10.1590/1984-0462/;2017;35;4;00013.
10.1016/j.compedu.2018.08.015. [131] R.R. Mellecker, A.M. McManus, Energy expenditure and cardiovascular responses
[107] L. Lanningham-Foster, et al., Activity-promoting video games and increased to seated and active gaming in children, Archives of pediatrics & adolescent
energy expenditure, J Pediatr 154 (6) (2009) 819–823, https://doi.org/10.1016/ medicine 162 (9) (Sep. 2008) 886–891, https://doi.org/10.1001/
j.jpeds.2009.01.009. ARCHPEDI.162.9.886.
[108] L. Lanningham-Foster, et al., Energy expenditure of sedentary screen time [132] P. Meyns, et al., Interlimb coordination during forward walking is largely
compared with active screen time for children, Pediatrics 118 (6) (2006) preserved in backward walking in children with cerebral palsy, Clinical
e1831–e1835, https://doi.org/10.1542/peds.2006-1087. Neurophysiology 125 (3) (Mar. 2014) 552–561, https://doi.org/10.1016/j.
[109] S. Lee-Cultura, et al., Children’s interaction with motion-based touchless games: clinph.2013.08.022.
Kinecting effectiveness and efficiency, in: CHI PLAY 2020 - Extended Abstracts of [133] T.A. Miller, et al., Can E-Gaming Be Useful for Achieving Recommended Levels of
the 2020 Annual Symposium on Computer-Human Interaction in Play, Nov. 2020, Moderate- to Vigorous-Intensity Physical Activity in Inner-City Children? Games
pp. 140–145, https://doi.org/10.1145/3383668.3419937. for health journal 2 (2) (Apr. 2013) 96–102, https://doi.org/10.1089/
[110] L. Lehtonen, et al., Movement empowerment in a multiplayer mixed-reality G4H.2012.0058.
trampoline game, in: CHI PLAY 2019 - Proceedings of the Annual Symposium on [134] S. Mironcika, et al., Smart Toys Design Opportunities for Measuring Children’s
Computer-Human Interaction in Play, Oct. 2019, pp. 19–29, https://doi.org/ Fine Motor Skills Development, in: Proceedings of the Twelfth International
10.1145/3311350.3347181. Conference on Tangible, Embedded, and Embodied Interaction - TEI ’18, 2018,
[111] R. Li, et al., Automated Fine Motor Evaluation for Developmental Coordination pp. 349–356, https://doi.org/10.1145/3173225.3173256.
Disorder, IEEE Transactions on Neural Systems and Rehabilitation Engineering 27 [135] R. Mombarg, et al., Effect of Wii-intervention on balance of children with poor
(5) (2019) 963–973, https://doi.org/10.1109/TNSRE.2019.2911303. motor performance, Research in developmental disabilities 34 (9) (Sep. 2013)
[112] H. Liang, et al., Exploitation of novel multiplayer gesture-based interaction and 2996–3003, https://doi.org/10.1016/J.RIDD.2013.06.008.
virtual puppetry for digital storytelling to develop children’s narrative skills, in: [136] C. Moser, M. Tscheligi, Physics-based Gaming: Exploring Touch vs. Mid-Air
Proceedings - VRCAI 2015: 14th ACM SIGGRAPH International Conference on Gesture Input Christiane, in: Proceedings of the 14th International Conference on
Virtual Reality Continuum and its Applications in Industry, Oct. 2015, pp. 63–72, Interaction Design and Children - IDC ’15, 2015, pp. 291–294.
https://doi.org/10.1145/2817675.2817680. [137] J.B. Mossmann, et al., Evaluation of the Usability and Playability of an Exergame
[113] H. Liang, et al., Transitioning from the level surface to stairs in children with and for Executive Functions Stimulation and Its Development Process, International
without Down syndrome: Motor strategy and anticipatory locomotor adjustments, Conference on Engineering Psychology and Cognitive Ergonomics (2017)
Gait and Posture 66 (Oct. 2018) 260–266, https://doi.org/10.1016/j. 164–179.
gaitpost.2018.09.010. [138] R. Muneer, et al., Virtual Reality Games as an Intervention for Children: A Pilot
[114] D.R. Lubans, et al., Fundamental movement skills in children and adolescents: Study, Disability, CBR & Inclusive Development 26 (3) (2015) 77–96, https://doi.
review of associated health benefits, Sports Med 40 (12) (2010) 1019–1035, org/10.5463/DCID.V26I3.456.
https://doi.org/10.2165/11536850-000000000-00000. [139] B.B. Nelson, et al., Strengthening families of children with developmental
[115] J. Luiza, et al., Complementary Therapies in Clinical Practice Effects of virtual concerns: Parent perceptions of developmental screening and services in head
reality in body oscillation and motor performance of children with cerebral palsy : start, Ethnicity and Disease 21 (3 SUPPL. 1) (2011) 1–8.
A preliminary randomized controlled clinical, Complementary Therapies in [140] C. Ni Mhurchu, et al., Couch potatoes to jumping beans: a pilot study of the effect
Clinical Practice 35 (December 2018) (2019) 189–194, https://doi.org/10.1016/ of active video games on physical activity in children, The international journal of
j.ctcp.2019.02.014. behavioral nutrition and physical activity 5 (Feb. 2008), https://doi.org/
[116] L. Luna-Oliva, et al., Kinect Xbox 360 as a therapeutic modality for children with 10.1186/1479-5868-5-8.
cerebral palsy in a school environment: a preliminary study, NeuroRehabilitation [141] G.H. Noritz, et al., Motor Delays: Early Identification and Evaluation, Pediatrics
33 (4) (Jan. 2013) 513–521, https://doi.org/10.3233/NRE-131001. 131 (6) (2013) e2016.
[117] J.M. Lust, et al., The diagnostic trajectory of developmental coordination disorder [142] E. Norris, et al., Active video games in schools and effects on physical activity and
in the Netherlands: Experiences of mothers, Child: Care, Health and Development health: A systematic review, Journal of Pediatrics 172 (2016), https://doi.org/
48 (1) (Jan. 2021) 139–149, https://doi.org/10.1111/CCH.12914. 10.1016/j.jpeds.2016.02.001, 40-46e5.
[118] M.O. Lwin, S. Malik, The efficacy of exergames-incorporated physical education [143] F. Oberklaid, et al., Children’s health and development: Approaches to early
lessons in influencing drivers of physical activity: A comparison of children and identification and intervention, Archives of disease in childhood 98 (12) (2013)
pre-adolescents, Psychology of Sport and Exercise 13 (6) (Nov. 2012) 756–760, 1008–1011, https://doi.org/10.1136/archdischild-2013-304091.
https://doi.org/10.1016/J.PSYCHSPORT.2012.04.013. [144] A. O’Hare, S. Khalid, The association of abnormal cerebellar function in children
[119] M. Macy, et al., Missed, Misused, or Mismanaged: Improving Early Detection with developmental coordination disorder and reading difficulties, Dyslexia 8 (4)
Systems to Optimize Child Outcomes, Topics in Early Childhood Special (2002) 234–248, https://doi.org/10.1002/dys.230.
Education 34 (2) (2014) 94–105, https://doi.org/10.1177/0271121414525997. [145] J.J. Ojeda-Castelo, et al., KiNEEt: application for learning and rehabilitation in
[120] R. Maddison, et al., Energy expended playing video console games: an special educational needs, Multimedia Tools and Applications (2018) 1–27,
opportunity to increase children’s physical activity? Pediatric exercise science 19 https://doi.org/10.1007/s11042-018-5678-1.
(3) (2007) 334–343, https://doi.org/10.1123/PES.19.3.334. [146] M.F. Ongun, et al., Recognition of occupational therapy exercises and detection of
[121] K.A. Madsen, et al., Feasibility of a dance videogame to promote weight loss compensation mistakes for Cerebral Palsy, Journal of Visual Communication and
among overweight children and adolescents, Archives of Pediatrics and Image Representation. 73 (August) (2020), 102970, https://doi.org/10.1016/j.
Adolescent Medicine (2007). jvcir.2020.102970.
[122] A. Majnemer, Benefits of early intervention for children with developmental [147] S. Ozonoff, Early detection of mental health and neurodevelopmental disorders:
disabilities, Seminars in Pediatric Neurology 5 (1) (1998) 62–69, https://doi.org/ the ethical challenges of a field in its infancy, J Child Psychol Psychiatry 56
10.1016/S1071-9091(98)80020-X. (2015) 933–935.
[123] A.E. Maloney, et al., A pilot of a video game (DDR) to promote physical activity [148] S. Paez, et al., Parental and environmental factors associated with physical
and decrease sedentary screen time, Obesity (Silver Spring, Md.) 16 (9) (Sep. activity among children participating in an active video game, Pediatric physical
2008) 2074–2080, https://doi.org/10.1038/OBY.2008.295. therapy : the official publication of the Section on Pediatrics of the American
[124] L. Mapelli, et al., The Cerebellar Involvement in Autism Spectrum Disorders: From Physical Therapy Association 21 (3) (Sep. 2009) 245–253, https://doi.org/
the Social Brain to Mouse Models, International Journal of Molecular Sciences 23 10.1097/PEP.0B013E3181B13A82.
(7) (Apr. 2022), https://doi.org/10.3390/ijms23073894. [149] Z.E. Page, et al., Do active video games benefit the motor skill development of
[125] N. Marotta, et al., Nintendo WiiTM versus Xbox KinectTM for functional non-typically developing children and adolescents: A systematic review, Journal
locomotion in people with Parkinson’s disease: a systematic review and network of Science and Medicine in Sport 20 (12) (2017) 1087–1100, https://doi.org/
meta-analysis, Disability and Rehabilitation (2020) 1–6, https://doi.org/ 10.1016/j.jsams.2017.05.001.
10.1080/09638288.2020.1768301. [150] D. Patole, et al., LeapLearn: A Gesture-Based Game, in: Proceedings - 2018 4th
[126] J. Marshall, L.M. Raffaele Mendez, Following Up on Community-Based International Conference on Computing, Communication Control and
Developmental Screening, Infants & Young Children 27 (4) (2014) 276–291, Automation, ICCUBEA 2018, Jul. 2018, https://doi.org/10.1109/
https://doi.org/10.1097/IYC.0000000000000019. ICCUBEA.2018.8697431.
[127] A.L. Martin-Niedecken, U. Go¨tz, Design and evaluation of a dynamically adaptive [151] S.J. Pedersen, et al., Caution regarding exergames: a skill acquisition perspective,
fitness game environment for children and young adolescents, in: CHI PLAY 2016 Physical Education and Sport Pedagogy 22 (3) (2017) 246–256, https://doi.org/
- Proceedings of the Annual Symposium on Computer-Human Interaction in Play 10.1080/17408989.2016.1176131.
Companion, Oct. 2016, pp. 205–212. [152] W. Peng, et al., Using Active Video Games for Physical Activity Promotion, Health
Education & Behavior 40 (2) (2013) 171–192, https://doi.org/10.1177/
1090198112444956.
9

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
[153] A.L. Penko, J.E. Barkley, Motivation and physiologic responses of playing a [177] V. Sorgente, et al., The Best of Two Different Visual Instructions in Improving
physically interactive video game relative to a sedentary alternative in children, Precision Ball-Throwing and Standing Long Jump Performances in Primary
Annals of behavioral medicine : a publication of the Society of Behavioral School Children, Journal of Functional Morphology and Kinesiology 7 (1) (Mar.
Medicine 39 (2) (May 2010) 162–169, https://doi.org/10.1007/S12160-010- 2022), https://doi.org/10.3390/jfmk7010008.
9164-X. [178] M.B. Speedtsberg, et al., Local dynamic stability during treadmill walking can
[154] A. Perez-mun˜oz, et al., An interactive tool based on serious games and fuzzy logic detect children with developmental coordination disorder, Gait and Posture 59
to support the motor development and rehabilitation of children with disabilities. (Jan. 2018) 99–103, https://doi.org/10.1016/j.gaitpost.2017.09.035.
2018 Congreso Argentino de Ciencias de la Inform´atica y Desarrollos de [179] S. Stansfield, C. Dennis, H. Larin, C. Gallagher, Movement-based VR gameplay
Investigacio´n (CACIDI), 2018. therapy for a child with cerebral palsy, Stud. Health Technol. Inform. 12 (219)
[155] S. Porter, et al., Developmental Surveillance and Screening Practices by Pediatric (2015) 153–157, https://doi.org/10.3233/978-1-61499-595-1-153.
Primary Care Providers, Infants & Young Children 29 (2) (2016) 91–101, https:// [180] C.J. Stoodley, J.F. Stein, Cerebellar function in developmental dyslexia,
doi.org/10.1097/IYC.0000000000000057. Cerebellum 12 (2) (2013) 267–276, https://doi.org/10.1007/s12311-012-0407-
[156] M. Quinn, Introduction of active video gaming into the middle school curriculum 1.
as a school-based childhood obesity intervention, Journal of pediatric health [181] L. Straker, et al., A crossover randomised and controlled trial of the impact of
care : official publication of National Association of Pediatric Nurse Associates & active video games on motor coordination and perceptions of physical ability in
Practitioners 27 (1) (Jan. 2013) 3–12, https://doi.org/10.1016/J. children at risk of Developmental Coordination Disorder, Human movement
PEDHC.2011.03.011. science 42 (Aug. 2015) 146–160, https://doi.org/10.1016/J.
[157] M. Rahmadiva, et al., A Design of Multipurpose Virtual Reality Game for Children HUMOV.2015.04.011.
with Autism Spectrum Disorder, in: 2019 International Biomedical [182] L. Straker, R. Abbott, Effect of screen-based media on energy expenditure and
Instrumentation and Technology Conference, IBITeC 2019, Oct. 2019, pp. 1–6, heart rate in 9- to 12-year-old children, Pediatric exercise science 19 (4) (2007)
https://doi.org/10.1109/IBITEC46597.2019.9091713. 459–471, https://doi.org/10.1123/PES.19.4.459.
[158] S.A.R.A. Rahman, Efficacy of Virtual Reality-Based Therapy on Balance in [183] S. Suzuki, et al., Enhancement of child gross-motor action recognition by
Children with Down Syndrome, World Applied Sciences Journal 10 (3) (2010) motional time-series images conversion, Proceedings of the 2020 IEEE/SICE
254–261. International Symposium on System Integration, SII 2020 (2020) 225–230,
[159] N. Ramstrand, F. Lygnegård, Can balance in children with cerebral palsy improve https://doi.org/10.1109/SII46433.2020.9025833.
through use of an activity promoting computer game? Technology and health [184] D. Tarakci, et al., Wii-based Balance Therapy to Improve Balance Function of
care : official journal of the European Society for Engineering and Medicine 20 (6) Children with Cerebral Palsy: A Pilot Study, Journal of Physical Therapy Science
(2012) 501–510, https://doi.org/10.3233/THC-2012-0696. 25 (9) (2013) 1123, https://doi.org/10.1589/JPTS.25.1123.
[160] G. Reifenberg, et al., Feasibility of pediatric game-based neurorehabilitation using [185] E. Tarakci, et al., Leap Motion Controller-based training for upper extremity
telehealth technologies: A case report, American Journal of Occupational Therapy rehabilitation in children and adolescents with physical disabilities : A
71 (3) (2017) 1–9, https://doi.org/10.5014/ajot.2017.024976. randomized controlled trial, Journal of Hand Therapy (2019) 1–9, https://doi.
[161] S. Retalis, et al., Empowering children with ADHD learning disabilities with the org/10.1016/j.jht.2019.03.012.
Kinems Kinect learning games, Proceedings of the European Conference on [186] S.K. Tatla, et al., Wii-habilitation as balance therapy for children with acquired
Games-based Learning 2 (2014) 469–477. brain injury, Developmental neurorehabilitation. 17 (1) (Feb. 2014) 1–15,
[162] J.E. Reynolds, et al., Does movement proficiency impact on exergaming https://doi.org/10.3109/17518423.2012.740508.
performance? Human Movement Science 34 (1) (2014) 1–11, https://doi.org/ [187] N.M. Tomasello, et al., Family-centered early intervention for infants and toddlers
10.1016/j.humov.2014.02.007. with disabilities, Journal of Family Social Work 13 (April) (2010) 163–172,
[163] M. Rosenberg, et al., Development of a kinect software tool to classify movements https://doi.org/10.1080/10522150903503010.
during active video gaming, PLoS ONE 11 (7) (2016) 1–14, https://doi.org/ [188] D.A. Ulrich, Test of gross motor development: examiner’s manual, 2nd ed., Pro-Ed
10.1371/journal.pone.0159356. publisher, Austin, 2000.
[164] E. Rubegni, et al., Child-Display Interaction: Exploring Avatar-based Touchless [189] V.B. Unnithan, et al., Evaluation of the energy cost of playing a dance simulation
Gestural Interfaces, in: Proceedings of the 8th ACM International Symposium on video game in overweight and non-overweight children and adolescents,
Pervasive Displays, 2019, pp. 1–7 (New York, NY, USA). International journal of sports medicine. 27 (10) (Oct. 2006) 804–809, https://
[165] A. Ruiz-rodriguez, et al., Gesture-based Video Games to Support Fine-Motor doi.org/10.1055/S-2005-872964.
Coordination Skills of Children with Autism, ACM Interaction Design Children [190] N. Vernadakis, et al., The impact of an exergame-based intervention on children’s
(IDC) (2019) 610–615. fundamental motor skills, Computers and Education 83 (2015) 90–102, https://
[166] M. Sabel, et al., Effects of physically active video gaming on cognition and doi.org/10.1016/j.compedu.2015.01.001.
activities of daily living in childhood brain tumor survivors: a randomized pilot [191] W. Wade, D. Porter, Sitting playfully: does the use of a centre of gravity computer
study, Neuro-Oncology Practice 4 (August 2016) (2016) 98–110, https://doi.org/ game controller influence the sitting ability of young people with cerebral palsy?
10.1093/nop/npw020. Disability and rehabilitation. Assistive technology 7 (2) (Mar. 2012) 122–129,
[167] Y. Salem, et al., Effectiveness of a low-cost virtual reality system for children with https://doi.org/10.3109/17483107.2011.589485.
developmental delay: A preliminary randomised single-blind controlled trial, [192] D. Wadsworth, et al., Elementary students’ physical activity and enjoyment
Physiotherapy (United Kingdom) 98 (3) (2012) 189–195, https://doi.org/ during active video gaming and a modified tennis activity, Journal of Physical
10.1016/j.physio.2012.06.003. Education and Sport ® (JPES) 14 (3) (2014) 311–316, https://doi.org/10.7752/
[168] M. Sandlund, et al., Training of goal directed arm movements with motion jpes.2014.03047.
interactive video games in children with cerebral palsy-A kinematic evaluation, [193] S.P. Walker, et al., Inequality in early childhood: risk and protective factors for
Developmental Neurorehabilitation 17 (5) (2014) 318–326, https://doi.org/ early child development, Lancet 378 (2011) 1325–1338.
10.3109/17518423.2013.776124. [194] J. Weerdmeester, et al., A Feasibility Study on the Effectiveness of a Full-Body
[169] C. Senette, et al., An Interactive Cognitive-Motor Training System for Children Videogame Intervention for Decreasing Attention Deficit Hyperactivity Disorder
with Intellectual Disability, International Conference on Universal Access in Symptoms, Games for health journal 5 (4) (Aug. 2016) 258–269, https://doi.org/
Human-Computer Interaction (2018) 571–582. 10.1089/G4H.2015.0103.
[170] D. Sharan, et al., Virtual reality based therapy for post operative rehabilitation of [195] S.T. West, K.A. Shores, Does HOPSports Promote Youth Physical Activity in
children with cerebral palsy, Work (Reading, Mass.). 41 (Suppl 1) (2012) Physical Education Classes? Physical Educator 71 (2014) 1.
3612–3615, https://doi.org/10.3233/WOR-2012-0667-3612. [196] K. White, et al., Energy expended by boys playing active video games, Journal of
[171] S. Sharma, et al., Promoting joint attention with computer supported science and medicine in sport 14 (2) (Mar. 2011) 130–134, https://doi.org/
collaboration in children with autism, Proceedings of the ACM Conference on 10.1016/J.JSAMS.2010.07.005.
Computer Supported Cooperative Work, CSCW 27 (Feb. 2016) 1560–1571, [197] G. Wittman, Video gaming increases physical activity, Journal of Extension 48 (2)
https://doi.org/10.1145/2818048.2819930. (2010) 1–4.
[172] R.K. Shayne, et al., The effects of exergaming on physical activity in a third-grade [198] K.W. Wu, et al., Postural adjustments in adolescent idiopathic thoracic scoliosis
physical education class, Journal of Applied Behavior Analysis 45 (1) (Mar. 2012) during walking, Gait and Posture 68 (Feb. 2019) 423–429, https://doi.org/
211–215, https://doi.org/10.1901/jaba.2012.45-211. 10.1016/j.gaitpost.2018.12.024.
[173] D.P. Sheehan, L. Katz, The effects of a daily, 6-week exergaming curriculum [199] Y.P. Wuang, et al., Effectiveness of virtual reality using Wii gaming technology in
onbalanceinfourthgrade children, Journal of Sport and Health Science 2 (3) children with Down syndrome, Research in developmental disabilities 32 (1)
(2013) 131–137, https://doi.org/10.1016/j.jshs.2013.02.002. (Jan. 2011) 312–321, https://doi.org/10.1016/J.RIDD.2010.10.002.
[174] J. Shin, et al., Effects of conventional neurological treatment and a virtual reality [200] M. Yaghoubi, et al., Kinematic comparison of aquatic- and land-based stationary
training program on eye-hand coordination in children with cerebral palsy, exercises in overweight and normal weight children, Pediatric Exercise Science 31
Journal of Physical Therapy Science 27 (7) (Jul. 2015) 2151, https://doi.org/ (3) (2019) 314–321, https://doi.org/10.1123/pes.2018-0188.
10.1589/JPTS.27.2151. [201] M. Yaghoubi, et al., Stationary exercise in overweight and normal weight
[175] B.C.M. Smits-Engelsman, et al., The effect of exergames on functional strength, children, Pediatric Exercise Science 31 (1) (Feb. 2019) 52–59, https://doi.org/
anaerobic fitness, balance and agility in children with and without motor 10.1123/pes.2018-0086.
coordination difficulties living in low-income communities, Human Movement [202] H. Zhao, et al., Design of a Haptic-Gripper Virtual Reality System (Hg) for
Science 55 (2017) 327–337, https://doi.org/10.1016/j.humov.2016.07.006. Analyzing Fine Motor Behaviors in Children with Autism, ACM Transactions on
[176] V. Sorgente, et al., Crosstalk between gross and fine motor domains during late
childhood: The influence of gross motor training on fine motor performances in
primary school children, International Journal of Environmental Research and
Public Health 18 (21) (Nov. 2021), https://doi.org/10.3390/ijerph182111387.
10

B. Bossavit and I. Arnedillo-Sa´nchez C o m p u t e r M e t h o d s a n d P r o g r a m s i n B i o m e d i c i n e 2 40(2023)107715
Accessible Computing (TACCESS) 11 (4) (Nov. 2018), https://doi.org/10.1145/ [204] L. Zoccolillo, et al., Video-game based therapy performed by children with
3231938. cerebral palsy: a cross-over randomized controlled trial a cross-sectional
[203] H. Zhao, et al., Hand-in-Hand: A Communication-Enhancement Collaborative quantitative measure of physical activity, European Journal of Physical and
Virtual Reality System for Promoting Social Interaction in Children with Autism Rehabilitation Medicine 51 (6) (2015) 669–676.
Spectrum Disorders, IEEE transactions on human-machine systems 48 (2) (Apr.
2018) 136, https://doi.org/10.1109/THMS.2018.2791562.
11