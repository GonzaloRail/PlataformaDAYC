2023 31st Mediterranean Conference on Control and Automation (MED)
June 26 - 29, 2023. Limassol, Cyprus
Behavioural Cloning for Serious Games in Support of Pediatric
Neurorehabilitation
43758101.3202.49995DEM/9011.01 :IOD | EEEI 3202© 00.13$/32/1-3451-3053-8-979 | )DEM( noitamotuA dna lortnoC no ecnerefnoC naenarretideM ts13 3202
Federico Baldisseri1,3,*, Edoardo Montecchiani2, Arturo Maiani1, Danilo Menegatti1,
Alessandro Giuseppi1,3,*, Antonio Pietrabissa1, Vincenzo Fogliati2, and Francesco Delli Priscoli1
Abstract—Behavioural Cloning is a Machine Learning Rhythmic Auditory Stimulation, that supports recovery and
method concerning how a machine attempts to autonomously training of motor coordination by means of synchronizing
mimic the actions of a human, or in general a complex movementswiththerhythmicaccentsofmusic[5].Thework
| controller, | performing |     | a given | task. | This | work | innovatively |               |     |               |     |           |        |         |
| ----------- | ---------- | --- | ------- | ----- | ---- | ---- | ------------ | ------------- | --- | ------------- | --- | --------- | ------ | ------- |
|             |            |     |         |       |      |      |              | was developed | in  | three phases. | In  | the first | phase, | a beta- |
exploitsBehaviouralCloninginsupportofPediatricNeuroreha-
|     |     |     |     |     |     |     |     | version of | the app | was released, |     | in order | to collect | data, |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------- | ------------- | --- | -------- | ---------- | ----- |
bilitation.Inparticular,anArtificialNeuralNetworkClassifier
|          |             |     |                 |     |       |     |             | where the | difficulty | of the | game | is adapted | by  | following |
| -------- | ----------- | --- | --------------- | --- | ----- | --- | ----------- | --------- | ---------- | ------ | ---- | ---------- | --- | --------- |
| has been | implemented |     | to autonomously |     | adapt | the | difficulty, |           |            |        |      |            |     |           |
through a set of tunable parameters, of a Serious Game that conventional static threshold-based rules, i.e., the difficulty
was specifically developed to stimulate some relevant cognitive of the next match is set based on the score of the last match
| capabilities | of the             | patient.        | Data         | augmentation |      | via           | Behavioural |                  |            |                   |            |               |               |          |
| ------------ | ------------------ | --------------- | ------------ | ------------ | ---- | ------------- | ----------- | ---------------- | ---------- | ----------------- | ---------- | ------------- | ------------- | -------- |
|              |                    |                 |              |              |      |               |             | via simple       | comparison | to                | predefined | thresholds.   |               | Then, in |
| Cloning      | allows             | such autonomous |              | difficulty   |      | adaptation    | system      |                  |            |                   |            |               |               |          |
|              |                    |                 |              |              |      |               |             | the second       | phase,     | data augmentation |            | via BC        | was performed |          |
| to improve   | its classification |                 | performances |              | and, | thus,         | to enforce  |                  |            |                   |            |               |               |          |
|              |                    |                 |              |              |      |               |             | on the collected | gameplay   |                   | dataset;   | the resulting | augmented     |          |
| a control    | logic              | that, in        | turn,        | improves     | the  | effectiveness | of          |                  |            |                   |            |               |               |          |
the cognitive training. The system is validated through an dataset was used to train a NN Classifier for autonomous
experimental assessment on a Serious Game that trains motor difficulty adaptation. Finally, in the third step, a new version
| coordination: | experimental |     | results | of  | children | gameplay | are |     |     |     |     |     |     |     |
| ------------- | ------------ | --- | ------- | --- | -------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
oftheappwasreleased,wherethetrainedNNisexploitedto
| analyzed | and discussed. |     |     |     |     |     |     |     |     |     |     |     |     |     |
| -------- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
automaticallydeploycontrolactionsonlineaimedatadapting
| Index       | Terms—Behavioural |     |         | Cloning, | Artificial |            | Neural Net- |                  |     |              |     |              |     |          |
| ----------- | ----------------- | --- | ------- | -------- | ---------- | ---------- | ----------- | ---------------- | --- | ------------ | --- | ------------ | --- | -------- |
|             |                   |     |         |          |            |            |             | difficulty based | on  | the player’s |     | performances | in  | order to |
| works, Data | Augmentation,     |     | Serious |          | Games,     | Autonomous | Dif-        |                  |     |              |     |              |     |          |
ficulty Adaptation, Pediatric Neurorehabilitation, Rhythmic achieve a stronger cognitive training.
Auditory Stimulation. The main contributions of this work are outlined in the
following:
|     |     | I.  | INTRODUCTION |     |     |     |     |           |      |               |     |                     |     |     |
| --- | --- | --- | ------------ | --- | --- | --- | --- | --------- | ---- | ------------- | --- | ------------------- | --- | --- |
|     |     |     |              |     |     |     |     | a Serious | Game | for pediatric |     | neurorehabilitation |     | was |
•
One of the main limitations of Neural Networks (NN) developed from scratch under the guidance of pediatric
in automatic control applications relies in the fact that the doctors and psychologists;
|          |       |          |       |         |     |       |          | a NN | architecture | was | implemented | for | developing | an  |
| -------- | ----- | -------- | ----- | ------- | --- | ----- | -------- | ---- | ------------ | --- | ----------- | --- | ---------- | --- |
| training | phase | requires | large | amounts | of  | data. | However, | •    |              |     |             |     |            |     |
in practical applications, the problem of data paucity is autonomous difficulty adaptation system;
often experienced, as in the context of neurorehabilitation a BC method for data augmentation was designed to
•
[1], [2]. To overcome such issue, synthetic data can be enable an effective training of the NN.
generated through Behavioural Cloning (BC), that is a sub- The proposed system was validated through analysis and
classofMachineLearningconcerninghowamachinelearns discussion of experimental results.
to perform a task by attempting to imitate a human, or The docuement is organized as follows: section II reports
in general a complex controller, performing it [3]. BC is some related literature works on the use of BC for data
then a type of supervised learning where the training data augmentationinvideogames;sectionIIIintroducestheorigi-
consists of recorded samples of the performed actions of a nallyconceivedrehabilitationSeriousGame,presentstheNN
human/controller in certain situations/states. architectureforautonomousdifficultyadaptationviasuitable
ThisstudyaimsatimplementingBCtotackletheproblem controlactionsanddescribestheBCimplementation;section
of data paucity in a specific application in the neurorehabili- IV analyzes and discusses the experimental validation of the
tation domain. An app for mobile devices was implemented proposed system; finally, section V draws conclusions and
consisting of an ad-hoc Serious Game, i.e., a game de- suggests some future works.
signedforeducationaland/orrehabilitationpurposes[4].The
II. RELATEDWORKS
| game is | based | on a musical |     | rehabilitation |     | technique, | named |        |            |        |         |          |       |       |
| ------- | ----- | ------------ | --- | -------------- | --- | ---------- | ----- | ------ | ---------- | ------ | ------- | -------- | ----- | ----- |
|         |       |              |     |                |     |            |       | BC can | be applied | in the | context | of video | games | so as |
This work has been partially funded by Lazio Region in the scope of to train a computer to play the game by mimicking human
projectMusicalMente,throughtheVITAMINA-Gprogram.
|            |           |          |     |            |     |             |         | gameplay samples. |            |       |            |      |               |     |
| ---------- | --------- | -------- | --- | ---------- | --- | ----------- | ------- | ----------------- | ---------- | ----- | ---------- | ---- | ------------- | --- |
| 1 Dept. of | Computer, | Control, | and | Management |     | Engineering | (DIAG), |                   |            |       |            |      |               |     |
|            |           |          |     |            |     |             |         | BC may            | outperform | other | techniques | such | as Reinforce- |     |
SapienzaUniversityofRome,Italy
| 2          |     |              |     |            |     |                   |     | ment Learning | (RL) | [6], that | also | has been | successfully |     |
| ---------- | --- | ------------ | --- | ---------- | --- | ----------------- | --- | ------------- | ---- | --------- | ---- | -------- | ------------ | --- |
| Consortium | for | the Research | in  | Automation | and | Telecommunication |     |               |      |           |      |          |              |     |
(CRAT),Rome,Italy
|     |     |     |     |     |     |     |     | applied to | generate | excellent | synthetic | players | [7], | even if |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | -------- | --------- | --------- | ------- | ---- | ------- |
3 4You–AssociationforSocialAdvancement,Rome,Italy
|     |     |     |     |     |     |     |     | it often requires | unpractical |     | training | time | [8]. Indeed, | the |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------- | ----------- | --- | -------- | ---- | ------------ | --- |
*Correspondence:baldisseri@diag.uniroma1.it;giuseppi@diag.uniroma1.it
mainadvantageofBCistheeaseofdatacollection,whereas
| 979-8-3503-1543-1/23/$31.00 ©2023 IEEE |     |     |     |     |     |     |     | 487 |     |     |     |     |     |     |
| -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore.  Restrictions apply.

RL requires the costly creation of a learning environment
for training the agent. On the other hand, BC results more
sensitive to the quality of the collected data with respect to
RL solutions.
Several additional alternative methods exist, working
on demonstration data provided by a human. These in-
clude Generative Adversarial Imitation Learning [9], Batch-
Constrained Q-Learning [10], and Inverse Reinforcement
Learning [11]. Some of these methods have been success-
fully used to achieve better performance than simpler BC
algorithms, at the price of a more complex implementation
Fig. 1. Gameplay screenshot of the game RhythmRun. The player shall
and data collection. This work focuses on the BC approach,
execute movements according to the rhythmical structure of the piece of
since it is a proof of concept, disposing of little data, for music,whichismadeevidentalsobysomeobstaclestobedodged.
a following project that will be developed for the actual
validationofthesystemwithpediatricpatientsinanhospital,
disposingofmoredata.Thus,atthisstagethemainobjective
is not to fully optimize performances, but to preliminarly
The auditory stimuli can be either a basic sequence of
show the efficacy of the proposed system. Further develop-
rhythmic sounds or a piece of music with clear temporal
ments shall be considered in the future when more elaborate
pattern elements. It has been shown that some patients who
games will be involved and larger data collection campaigns
are not able to perform a movement voluntarily, may be
will be conceived.
able to perform the same movement as a response to an
In the context of games and Serious Games, in [8],
auditory stimulus [15]. Indeed, musical activity has proven
the authors demonstrated that BC in a real-time strategy
to be a powerful stimulus for brain plasticity, that is the
game was able to match in-game rating of 84% of human
ability of neuronal networks to evolve through growth and
players. In [13] it is shown that a BC agent is able to reach
reorganization[16].The gameisintendedfor supportingthe
67% of human players’ score for item collection tasks, but
rehabilitation of children with motor impairments, such as
cannotmimicadequatelynavigationtasks.In[14],theauthor
paresis, which is often caused by stroke, by training timing
conducted an experiment, in which expert human players
functionsandenhancingmotorplanningandexecution,since
were required to watch recorded gameplays and to guess
it requires spatial and temporal control. The investigation
whethertheyhadbeenplayedbyahumanorbyaBCagent:
of music rehabilitation game techniques, that constitutes the
48% of the experts found the BC agent to be human-like.
basis of the game design, can be found in the previous work
In scenarios where data scarcity is particularly severe,
[17].
Dataset Aggregation [12] is an iterative algorithm that can
A side-scrolling game is proposed: the player shall dodge
improve the performance of BC agents. Firstly, an agent is
some obstacles, whose presence is anticipated by the rhyth-
trained with a supervised learning method based on human
mic structure of the backing music, i.e., the piece of music
demonstration data. Then, the agent collects more samples
thatisplayedinthebackgroundofthegame.Thus,thechild
byimitatingthehumanbehaviourandeachofsuchcollected
must understand the temporal pattern of the backing music
samplesislabelledbyahumanexpertinordertovalidateor
in order to predict and dodge the obstacles from above or
disconfirmtheconvenienceofintegratingsuchnewsamples.
from below.
This procedure is repeated iteratively. Manual labelling is a
laboriousprocesscompared tothestandardBC procedureto
The player controls the position of a virtual character
collecttrainingdata,andthereforesuchmethodisnotagood
by touching commands on the screen. The character can
choice for this work, since it can be assumed that doctors in
jump or slide and is constrained to move in the horizontal
the rehabilitationcontext wouldhardly have timeto perform
direction with a fixed speed. The action is viewed from
labelling.
a side-view camera angle. The difficulty depends on two
parameters, namely the speed and complexity of the music
III. ADAPTIVESERIOUSGAMEDESIGNBASEDON
piece, and consequently on the number and the interchange
NEURALNETWORKSANDBEHAVIOURALCLONING
of the obstacles. Fig. 1 shows a gameplay screenshot.
For this study, a Serious Game for supporting Pediatric
Rehabilitation, named RhythmRun [17], has been originally InthefollowingsectionIII-A,itisintroducedtheproposed
conceived and implemented by the authors employing Unity system for autonomous difficulty adaptation, that automati-
Game Engine. The game design is based on Rhythmic cally modifies the game parameters in real-time based on
Auditory Stimulation [5], a music rehabilitation technique theplayer’scognitivecapabilities,throughaNeuralNetwork
used for supporting the rehabilitation of movements that are Classifier, denoted in the following as NNC [17]. Section
naturally rhythmic, such as gait. It consists of presenting III-B describes the BC implementation used for data aug-
a series of auditory stimuli at a fixed cadence, and move- mentation, through a second distinct Neural Network for
ments have to be synchronized to such rhythmic cadence. Behavioural Cloning, denoted in the following as NNBC.
488
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore. Restrictions apply.

|     |     |     |     |     |     |     | optimizer, | Cross-entropy |     | loss | function | and | a learning | rate |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------------- | --- | ---- | -------- | --- | ---------- | ---- |
equal to 0.001.
|     |     |     |     |     |     |     | As shown | in  | the outer | loop | of  | Fig. 2, | the NNC | model |
| --- | --- | --- | --- | --- | --- | --- | -------- | --- | --------- | ---- | --- | ------- | ------- | ----- |
autonomouslyupdatesonlinethedifficultylevelofthegame:
|     |     |     |     |     |     |     | on the basis | of        | past | gameplay      | data | from    | a specific | player, |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --------- | ---- | ------------- | ---- | ------- | ---------- | ------- |
|     |     |     |     |     |     |     | it returns   | as output |      | the estimated |      | optimal | choice     | for the |
valuesofthedifficultyparametersofthegameforthatplayer.
|     |     |     |     |     |     |     | The output | of             | the NNC | is a       | control     | action     | indicating | if the      |
| --- | --- | --- | --- | --- | --- | --- | ---------- | -------------- | ------- | ---------- | ----------- | ---------- | ---------- | ----------- |
|     |     |     |     |     |     |     | values of  | the difficulty |         | parameters | have        | to         | be set     | in order to |
|     |     |     |     |     |     |     | maintain,  | increase       | or      | reduce     | the current | difficulty |            | level.      |
Inthefirsttrainingphasefordatagathering,onlytheinner
|     |     |     |     |     |     |     | loop of | Fig. 2 | is activated, |     | whereas | the control |     | actions that |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------ | ------------- | --- | ------- | ----------- | --- | ------------ |
shallderivefromtheouterlooparereplacedbyclassicaland
Fig. 2. Neural Network architecture. The outer loop (denoted in red) simple threshold-based rules that are conventionally used in
| represents    | the online | autonomous       | difficulty   | adaptation, | whereas  | the inner     |              |     |      |          |       |      |           |          |
| ------------- | ---------- | ---------------- | ------------ | ----------- | -------- | ------------- | ------------ | --- | ---- | -------- | ----- | ---- | --------- | -------- |
|               |            |                  |              |             |          |               | video games. | In  | this | way, the | outer | loop | is closed | and data |
| loop (denoted | in         | blue) represents | the training | and         | updating | of the Neural |              |     |      |          |       |      |           |          |
NetworkClassifiermodel. for the training of the NNC is gathered. However, since a
|     |     |     |     |     |     |     | large amount |     | of data | is needed | to  | train | the NNC, | a data |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ------- | --------- | --- | ----- | -------- | ------ |
augmentationmethodbasedonBCisappliedtoperformthe
| A. Adaptive | Serious | Game | via | Neural | Networks |     |     |     |     |     |     |     |     |     |
| ----------- | ------- | ---- | --- | ------ | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
datagatheringtask(i.e.,theinnerloopofFig.2,asdescribed
| The | objective | of the | rehabilitation | game | is  | to keep the | in section | III-B. |     |     |     |     |     |     |
| --- | --------- | ------ | -------------- | ---- | --- | ----------- | ---------- | ------ | --- | --- | --- | --- | --- | --- |
player engaged throughout the entire game duration, provid- Pediatric doctors and psychologists are in charge of pro-
inganenjoyableandyetchallengingexperience.Indeed,the viding the logic to perform data labeling, i.e., to specify
creationofanadequatelevelofchallengeisnotatrivialtask the most appropriate control action to be executed after the
when the game is proposed to players having varying capa- initial data collection, so that the algorithm shall adapt to
bilities. This is a notably important aspect to consider in a such specifications and learn to perform choices following a
clinicalsettingwheretheplayersarechildrenofvariousages reasoningascloseaspossibletotheoneofdoctorsandpsy-
and bear different specific pathologies, thus having different chologists.Inparticular,inordertodeterminetheparameters
cognitive capabilities. To tackle such problem, this paper aboutpatientsandaboutthegamethatarerelevantinputsfor
proposes to relay on a NNC architecture to automatically the NN, the Griffiths Scales of Mental Development were
adapt the game difficulty level. used to identify the neural correlates of game activities [18],
Fig. 2 shows a high-level block scheme of the proposed as reported in TABLE I. Moreover, the NNC is built so
NNC architecture. The outer loop (denoted in red) has the as to return as output a control action in the action space
task of adapting online the difficulty level of the game, A = {downgrade,maintain,upgrade} which shall adapt
whereas the inner loop (denoted in blue) represents the the difficulty of the game, that depends on the speed and
training and updating of the NNC model. complexityofthebackingpieceofmusicandonthenumber
Patients play the game on mobile devices (i.e., tablets), and interchange of the obstacles.
that upload the gameplay data via Internet connection on In summary, for each played match, the NNC estimates
a cloud server in Google Firebase (if a device is not con- a function that takes as input the past gameplay data of the
| nected, | data is | stored | locally and | then | uploaded | once the |           |         |     |        |             |        |      |         |
| ------- | ------- | ------ | ----------- | ---- | -------- | -------- | --------- | ------- | --- | ------ | ----------- | ------ | ---- | ------- |
|         |         |        |             |      |          |          | child and | returns | as  | output | the control | action | that | changes |
connection is restored); in the figure, the data collection is thedifficultyofthenextmatch.Theaimofthecontrolaction
represented by the Data Storage block. On the data that is is to set the difficulty parameters of the next match so that
gathered and aggregated from all patients, it is performed the difficulty of the next match is the most suitable to the
Behavioural Cloning for augmenting the dataset dimension, actual patient’s level. In the context of rehabilitation, the
| through | the second | distinct | NNBC | specifically |     | built for this |         |          |     |          |        |        |      |            |
| ------- | ---------- | -------- | ---- | ------------ | --- | -------------- | ------- | -------- | --- | -------- | ------ | ------ | ---- | ---------- |
|         |            |          |      |              |     |                | medical | outcomes | are | twofold: | first, | if the | game | difficulty |
purpose. Data processing, executed by the Preprocessing fits the current cognitive capabilities of the patient, he/she
and Labelling block, is performed in Google Colab: the is encouraged to play and train; secondly, thanks to the
augmented dataset is labelled, used for generating statistics, training, the patient improves future performances on the
and preprocessed so as to derive the suitable inputs to the game, leading to improvements in cognitive capabilities.
| NNC for   | training, | by selecting | the          | parameters | about   | patients   |                |     |         |                |     |     |     |     |
| --------- | --------- | ------------ | ------------ | ---------- | ------- | ---------- | -------------- | --- | ------- | -------------- | --- | --- | --- | --- |
|           |           |              |              |            |         |            | B. Behavioural |     | Cloning | Implementation |     |     |     |     |
| and about | the       | game that    | are relevant |            | for the | autonomous |                |     |         |                |     |     |     |     |
adaptation, as further discussed in the following. Such data A challenging issue of the framework proposed in section
preprocessing is analogously executed in the Preprocessing III-A relies in the difficulty of obtaining a sufficiently large
block of the outer loop. The NNC is updated regularly at training dataset, a common problem in the context of neu-
successiveiterationsinthesameway.TheNNCisstructured rorehabilitation [1]. To tackle this problem of data scarcity,
soastohave1inputlayer,3hiddenlayers,of64,128and64 BC is applied for data augmentation.
neurons, and an output layer with a single sigmoid neuron. Fig. 3 depicts the BC framework. BC can be defined
The ReLu activation function was selected, with Adam as as a special case of Reinforcement Learning (RL) [6], a
489
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore.  Restrictions apply.

TABLEI
INPUTSTOTHENNCLASSIFIER
|     | GAME |     | GRIFFITHSSCALES |     |     | COGNITIVEFACULTIES |     |     | NNINPUTS |     |     |     |     |
| --- | ---- | --- | --------------- | --- | --- | ------------------ | --- | --- | -------- | --- | --- | --- | --- |
Age,Difficultyleveloflastmatch,
Hand-eyeCoordination,LargeMo-
RhythmRun MotorCoordination,Rhythm. Hit obstacles, Error mean, Level
torSkills.
repetitions.
subclass of Machine Learning where an agent interacts with As already illustrated, at first the game is programmed so
an environment. The RL agent observes the current state as to adapt difficulty by following conventional static and
s of the environment, performs an action a and observes simple threshold-based rules. Specifically, the difficulty of
| t   |     |     |     |     | t   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
the new state s . The transition from a state to the next the next match is selected base on the score of the last
t+1
one depends on the action. In RL, the agent also receives match:thedifficultyischosentobedowngraded,maintained
a numerical reward signal r associated to the performed or upgraded if the game score, expressed in percentage of
t
action and the next state. Differently, reward signals are not avoided obstacles, is lower than or equal to 30%, between
available to BC agents, and r is ignored [19]. 30% and 60% or larger than or equal to 60%, respectively.
The BC problem is formulated as follows: given a dataset Forthescopeofthepresentproofofconcept,theappwas
D, originated from human gameplay data and consisting of providedtoatestgroupof27healthychildrenagedbetween
tuples (s,a), learn an imitation model M = P(a|s), i.e., 5and14,yieldingagameplaydatasetof307playedmatches.
a conditional probability distribution, where P(a|s) denotes Larger sample sizes will be involved in future works. The
theprobabilitythatahumanperformsactionawheninstate dataset was handled as follows: 10% of the original dataset
s.M =P(a|s)ismodelledusingtheNNBCthatminimizes was allocated to testing; on the remaining 90% part, data
the cross-entropy between predictions and real values of the augmentation via BC was applied to increase the dataset
dataset. After learning the model, the BC agent plays the dimension;80%oftheresultingaugmenteddatasetwasused
game by selecting the predicted action a∼(a|s) for a given for training, whereas the remaining 20% for validation.
state s. The application of BC yielded a larger number of played
In the proposed RhythmRun game, the states and actions matcheswhilepreservingthefeaturesoftheoriginaldataset,
| are | defined as  | follows: |                   |     |        |     |          |                |          |                    |              |                  |          |
| --- | ----------- | -------- | ----------------- | --- | ------ | --- | -------- | -------------- | -------- | ------------------ | ------------ | ---------------- | -------- |
|     |             |          |                   |     |        |     | as it is | shown          | in TABLE | II, that           | also reports | in               | the last |
|     |             |          |                   |     |        |     | column   | the statistics | that     | will be introduced |              | in the following |          |
|     |             |          |                   |     |        |     | section  | IV.            |          |                    |              |                  |          |
|     | s=(Obstacle |          | Distance,Obstacle |     | Type), | (1) |          |                |          |                    |              |                  |          |
Fig.4showsacomparisonoftheaverageerrorpercentage
|     |     | a=(Idle,Jump,Slide), |     |     |     | (2) |           |        |           |        |              |     |        |
| --- | --- | -------------------- | --- | --- | --- | --- | --------- | ------ | --------- | ------ | ------------ | --- | ------ |
|     |     |                      |     |     |     |     | per level | in the | two cases | of the | real dataset | and | of the |
whereObstacleDistanceisthetimedistancefromthenext augmented dataset.
obstacle and Obstacle Type indicates whether the obstacle Note that, as it was desirable, the error percentages are
|       |           |     |         |             |                |     | very similar | -   | in some | levels the average | errors | percentage |     |
| ----- | --------- | --- | ------- | ----------- | -------------- | --- | ------------ | --- | ------- | ------------------ | ------ | ---------- | --- |
| shall | be dodged | by  | jumping | or sliding. | State sampling | is  |              |     |         |                    |        |            |     |
executed at a constant cadence, i.e., in this implementation, is higher in the case of the real dataset, whereas in other
|       | 100           |     |     |     |     |     | levels the | opposite | result | is observed. |     |     |     |
| ----- | ------------- | --- | --- | --- | --- | --- | ---------- | -------- | ------ | ------------ | --- | --- | --- |
| every | milliseconds. |     |     |     |     |     |            |          |        |              |     |     |     |
The NNBC is structured so as to have 1 input layer, 3 Inordertoevaluatetheeffectivenessofdataaugmentation
hidden layers, with dimensions 256, 528, 256, and 1 output via BC, it was executed a comparison on performances in
|        |          |            |     |              |                |     | terms of | validation | accuracy | between | the | cases with | and |
| ------ | -------- | ---------- | --- | ------------ | -------------- | --- | -------- | ---------- | -------- | ------- | --- | ---------- | --- |
| layer. | The ReLu | activation |     | function was | selected, with | SGD |          |            |          |         |     |            |     |
asoptimizer,Cross-entropylossfunction,learningrateequal withoutdataaugmentation.AsshowninFig.5,thevalidation
to 0.005 and momentum equal to 0.9. accuracy exhibits a faster transient with data augmentation
|     |                    |                            |        |                  |      |          | and reaches | an  | higher value | of 0.94, | while | in the other | case |
| --- | ------------------ | -------------------------- | ------ | ---------------- | ---- | -------- | ----------- | --- | ------------ | -------- | ----- | ------------ | ---- |
|     |                    | IV. EXPERIMENTALVALIDATION |        |                  |      |          |             |     |              |          |       |              |      |
|     | A 1.0 beta-version |                            | of the | app MusicalMente | [17] | with the |             |     |              |          |       |              |      |
first 10 levels of the game RhythmRun was developed in TABLEII
COMPARISONOFDATASETSTATISTICS
Unity.
|     |     |     |     |     |     |     |     |     |     |     |     | Adaptive | Se- |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | --- |
StandardSeriousGame
riousGame
|     |     |     |     |     |     |     |                        |     |     | BeforeBC | AfterBC |      |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------------- | --- | --- | -------- | ------- | ---- | --- |
|     |     |     |     |     |     |     | Nr.ofplayers           |     |     | 27       | 127     | 8    |     |
|     |     |     |     |     |     |     | Averageageofplayers    |     |     | 9.3      | 9.1     | 8.6  |     |
|     |     |     |     |     |     |     | Totalnr.ofmatches      |     |     | 307      | 1728    | 111  |     |
|     |     |     |     |     |     |     | Averageerrorpercentage |     |     | 0.24     | 0.26    | 0.28 |     |
Fig.3. BehaviouralCloningframework. Errorpercentagest.dev. 0.28 0.17 0.30
490
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore.  Restrictions apply.

the accuracy stops at value 0.87.
Finally, the performances of the proposed system were
evaluated on the test set: Fig. 6 shows the classification
performances when the game difficulty is adapted following
classical threshold-based rules while Fig. 7 shows to the
performances of the proposed system, exhibiting significant
improvements.
An additional benchmark comparison was performed us-
ing Support Vector Machines (SVM) [20], a model for
classificationthattakesdataasinputandreturnsasoutputan
Fig. 5. The lower red plot shows the validation accuracy obtained with
hyperplaneseparatingdataintoclasses.AnSVMmodelwith
the NNC trained without data augmentation; the upper green plot shows
polynomial kernel of third-degree was trained on the aug- the validation accuracy obtained with the NNC trained on the augmented
mented dataset. This method does outperform the difficulty dataset.
adaptation via simple threshold-based rules, but still yields
TABLEIII
lower performances with respect to the proposed method, as
COMPARISONOFCLASSIFICATIONPERFORMANCES
it is summarized in TABLE III.
Finally, a 2.0 beta-version of the app was implemented, Threshold Proposed
SVM
where the game is autonomously adapted online by exploit- basedrules system
ing the trained NNC. For the scope of this proof of concept, Accuracy 0.74 0.76 0.90
a different test group of 8 healthy children played the game
F-1Score 0.70 0.72 0.89
and provided a new gameplay dataset, whose main statistics
arereportedinthelastcolumnofTABLEII.Largersamlple
sizes will be involved in future works.
Neural Networks trained over datasets that are obtained via
Consideringthissecondgroupofplayers,Fig.8compares
Behavioural Cloning data augmentation.
theirperformancesinthecasewherethegamedifficultylevel
The outcomes provided by this work are outlined in the
was adapted by the NNC with respect to the case where
folowing list:
difficulty would have been adapted by simple threshold-
• A Serious Game aimed at supporting pediatric neurore-
based rules: a different action with respect to the threshold-
habilitation via musical rehabilitative techniques was
based reasoning was selected in a percentage of cases equal
developed; the proposed rehabilitation game was origi-
to 27%.
nallyconceivedbasedonfindingsinpediatricacademic
Note that, even if in the first levels the performances are
literature;
similar or even worse, in the last levels the children who
• A NN-based approach was conceived to improve the
playedthegameversionthatisadaptedbytheNNCachieve
effectiveness of the rehabilitation game by adapting
better performances with the respect to the children who
the difficulty level of the game to the current child’s
playedthegameversionthatisadaptedbysimplethreshold-
cognitive conditions; the effectiveness of the NNC ap-
based rules. Therefore, the proposed method has shown to
proach was validated against standard threshold-based
provide a difficulty adjustment which enables children to
strategies and a simpler Artificial Intelligence method
achieve higher scores over time and, consequently, a more
such as Support Vector Machines;
effective cognitive training.
• Behavioural Cloning for data augmentation was imple-
mented in order to enable the NNC training under data
V. CONCLUSIONS
paucity (a severe problem in the considered children
This paper presented a Serious Game with a system for rehabilitation task); to our knowledge, this is first the
deploying autonomous difficulty adaptation by means of application of Behavioural Cloning techniques in the
Fig.4. Comparisonoftheaverageerrorpercentageperlevelinthecase Fig. 6. Classification performances when the game difficulty is adapted
oftherealdataset,andinthecaseoftheaugmenteddataset. followingclassicalthreshold-basedrules.
491
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore. Restrictions apply.

• Extension of the app usage with digital music instru-
ments, in order to make the playing experience even
more engaging. Moreover, activities involving collabo-
ration of multiple children shall be included.
• Study of possible applications of the system in support
of neurorehabilitation for different conditions.
REFERENCES
[1] S. Moon, et al., “Artificial neural networks in neurorehabilitation: A
scoping review,” NeuroRehabilitation, vol. 46, no. 3, pp. 259-269,
2020.
Fig. 7. Classification performances when the game difficulty is adapted
[2] F.Sciancaleporeetal.,“Computer-BasedCognitiveTraininginChil-
withtheproposedsystem.
dren with Primary Brain Tumours: A Systematic Review,” Cancers,
vol.14,no.16,p.3879,2022.
[3] C. S. M. Bain, “A Framework for Behavioural Cloning,” University
context of Serious Games. ofNewSouthWales:Sydney,Australia,pp.1-37,2001.
[4] T. Susi, M. Johannesson, and P. Backlund, “Serious games – an
The key research objectives of this study have been overview,”TechnicalReportHS-IKI-TR,pp.1-21,2007.
accomplished: [5] M.Thaut,A.Leins,R.Rice,H.Argstatter,andG.Kenyon,“Rhythmic
auditory stimulation improves gait more than NDT training in near-
• The proposed Behavioural Cloning approach for data ambulatory patients early post-stroke,” Neural Repair 2017, 21, pp.
augmentation has proven to yield higher classification 455-459,2017.
[6] R.S.SuttonandA.G.Barto,“Reinforcementlearning:Anintroduc-
performances with respect to the case with the non-
tion,”MITpress,2018.
augmented dataset. [7] V. Mnih, et al., “Human-level control through deep reinforcement
• TheproposedNeuralNetworkClassificationmethodfor learning,”Nature,vol.518,no.7540,p.529,2015.
[8] O.Vinyals,I.Babuschkin,W.M.Czarneckietal.,“Grandmasterlevel
autonomous difficulty adaptation has proven to yield
inStarCraftIIusingmulti-agentreinforcementlearning,”Nature,vol.
higher children performances, and thus stronger cogni- 575,no.7782,pp.350-354,2019.
tiveimprovements,withrespecttothecaseofdifficulty [9] J. Ho and S. Ermon, “Generative Adversarial Imitation Learning,”
CoRR,vol.1606,no.3476,pp.1-8,2016.
adaptation via conventional and simple threshold-based
[10] S.Fujimoto,E.Conti,M.Ghavamzadeh,andJ.Pineau,“Benchmark-
rules,mand also with respect to SVM. ingbatchdeepreinforcementlearningalgorithms,”CoRR,vol.1910,
no.1708,pp.1-8,2019.
Future works shall involve:
[11] A. Y. Ng and S. J. Russel, “Algorithms for inverse reinforcement
• Actual testing and validation of the proposed system learning,”ICML2000,vol.1,2000.
[12] S. Ross, G. J. Gordon, and J. A. Bagnell, “A reduction of imitation
in a pediatric hospital, with larger sample sizes for
learningandstructuredpredictiontono-regretonlinelearning,”CoRR,
the experimental validation. As a matter of fact, the vol.1011,no.686,pp.1-8,2011.
project has already been presented to the pertinent [13] W. H. Guss, B. Houghton, N. Topin, . Wang, C. Codel, M. Veloso,
and R. Salakhutdinov, “MineRL: A large-scale dataset of Minecraft
medicalstaffofapediatrichospital,whohaveexpressed
demonstrations,”IJCAI,vol.1907,no.13440,pp.4-6,2019.
strong interest in the topic and availability to test its [14] C. Renman, “Creating Human-like AI Movement in Games Using
effectiveness on patients. ImitationLearning,”KTH,SchoolofComputerScienceandCommu-
nication,pp.42-46,2017.
• Experimental validation of additional Serious Games [15] M. H. Thaut, G. C. McIntosh, R. R. Rice, “Rhythmic facilitation of
thattraindifferentcognitivefaculties,suchasattention, gaittraininginhemipareticstrokerehabilitation,”J.Neurol.Sci.,vol.
verbal fluency, empathy and collaboration [17]. 151,no.2,pp.1-5,2003.
[16] C.Y.WanandG.Schlaug,“MusicMakingasaToolforPromoting
• ApplicationofFederatedLearning,thatenablestoshare BrainPlasticityacrosstheLifeSpan,”Neuroscientist,vol.16,no.5,
useful data between hospitals without the need of shar- pp.566–577,2010.
ingsensitiveinformationprotectedbyprivacy[21],[22]. [17] F. Baldisseri, A. Maiani, E. Montecchiani, F. Delli Priscoli, A.
Giuseppi,D.Menegatti,V.Fogliati,“AnIntegratedMusicandArtifi-
cialIntelligenceSysteminSupportofPediatricNeurorehabilitation,”
Healthcare,vol.10,no.2014,pp.1–10,2022.
[18] R. Giffiths, “The Abilities of Young Children: A Comprehensive
System of Mental Measurement for the First Eight Years of Life,”
ChildDevelopmentResearchCentre:Lubbock,TX,USA,pp.24–80,
1970.
[19] J. Pussinen, “Behavioural Cloning in Video Games,” University of
EasternFinland:Kuopio,Finland,pp.1–43,2021.
[20] M. A. Hearst, S. T. Dumais, E. Osuna, J. Platt, and B. Scholkopf,
“Supportvectormachines,”IEEEIntelligentSystemsandtheirAppli-
cations,vol.13,no.4,pp.18-28,1998.
[21] A. Giuseppi, S. Manfredi, D. Menegatti, C. Poli, and A. Pietrabissa,
“Decentralised Federated Learning for Hospital Networks With Ap-
plicationtoCOVID-19Detection,”IEEEAccess,vol.10,pp.92681-
92691,2022.
[22] A. Giuseppi, S. Manfredi and A. Pietrabissa, “A Weighted Average
ConsensusApproachforDecentralizedFederatedLearning,”Machine
Fig.8. Comparisonoftheaverageerrorpercentageinthecaseofadaptation IntelligenceResearch,vol.19,pp.319–330,2022.
via online NN classification, with respect to the case of adaptation via
threshold-basedrules.
492
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:24:47 UTC from IEEE Xplore. Restrictions apply.