ReceivedOctober6,2019,acceptedOctober28,2019,dateofpublicationNovember4,2019,dateofcurrentversionNovember14,2019.
DigitalObjectIdentifier10.1109/ACCESS.2019.2951380
Proposal of a Conceptual Model for Serious
Games Design: A Case Study in Children
With Learning Disabilities
DIEGOAVILA-PESANTEZ 1,3,(Member,IEEE),ROSADELGADILLO1,ANDLUISA.RIVERA2
1FacultaddeIngenieríaenSistemaseInformática,UniversidadNacionalMayordeSanMarcos,Lima15081,Perú
2MathematicalScienceLaboratory,StateUniversityofNorteFluminenseRiodeJaneiro,
CamposDosGoytacazes28013-602,Brazil
3FacultaddeInformáticayElectrónica,EscuelaSuperiorPolitécnicadeChimborazo,Riobamba060155,Ecuador
Correspondingauthor:DiegoAvila-Pesantez(davila@espoch.edu.ec)
ABSTRACT Serious Games (SG) have a particular ability to motivate and engage in the therapeutic and
learningprocess.Therearemultipleapproachesbasedonmethodologies,frameworks,andmodelsforSG
design, which have been proposed based on a specific domain. However, the relationship between the
SoftwareEngineeringmethodologies,withtherequirementdescribedintheGameDesignDocument,and
the Instructional Design have not been discussed together. This paper proposes a conceptual model and
discusses their relations among those domains, that aims to fill this gap. In order to define the model,
those approaches available were analyzed and compared, then suggests several components needed for
gamedesign.ItdescribestheprimarystructurefocusonfourphasesAnalysis,Design,Development,and
Evaluation, which identifies and validates the roles of all components to achieve the desired educational
goals. SG maned ‘‘ATHYNOS’’ was developed to help children with learning disabilities. Finally, a case
studywiththreeunitsofanalysispointsoutthatATYHNOSaidedparticipantsinthelevelofconcentration,
hand-eyecoordination,motorskills,andcognitivereinforcement.
INDEXTERMS Seriousgames,conceptualmodelfordesign,game-basedlearning,ATHYNOS.
I. INTRODUCTION narrative [13]. In addition, a significant challenge is the
Serious Game (SG) is an umbrella term applicated for any development of SG with technology-enhanced learning
computer game-based which are designed for educational approaches, which should be able to quickly capture the
purposes [1], [2]. Currently, SG is the new trend used as player’s attention and improve the communication pro-
teaching and learning tools, since they are attractive to stu- cess[14],[15].Agamecanenhancetheexperimentationand
dents (digital natives) [3], [4]. Several benefits of SG have simulationmanipulatedbyphysicalmovementsusinganatu-
beenreportedindifferentcasestudieswithschoolers,suchas raluserinterfacethatallowsabalancebetweenentertainment
increasing students’ motivation and self-esteem, improving andeducationalobjectives.
cognitive function, and immediate feedback [5]–[12]. The There are several motivations in the area of SG design.
SG challenge is to expand innovations through powered by Mainly, they focus on providing a fun experience, an excit-
emergingtechnologieslikeAugmentedReality(AR)orVir- ing narrative, and an increase in player’s motivation.
tualReality(VR)thatfacilitatestheconstructivistapproach. It considers aspects as excellent visual effects and sounds,
These technologies motivate users to face new experiences also this material is comfortable and easy to remember;
accordingtotheindividualneedsofusers. furthermore,itdevelopsskillsthatgenerateinterestorcurios-
However,thecomplexityandsophisticationofSGgrowas ity. Also, gameplay into the SG can evoke challenge, sus-
a function of technological progress and requires new dig- pense,emotion,andempathywithcharactersthatencourage
ital and audiovisual resources, interaction mechanisms, and active engagement and sustain learning [16], [17]. Besides,
SGoffersimmediatefeedbackandadaptability,whereplay-
The associate editor coordinating the review of this manuscript and ers can directly assess their progress (anonymous system),
approvingitforpublicationwasDanielaCristinaMomete . with a less stressful perception. SG allows the adaptation
VOLUME7,2019 ThisworkislicensedunderaCreativeCommonsAttribution4.0License.Formoreinformation,seehttp://creativecommons.org/licenses/by/4.0/ 161017

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
to each player’s level of difficulty. As a result, SG will be decade of the ’70s in studies developed by Clark Abt and
abletoimprovecognitivefunctionsandemotional.Challenge his colleagues. Abt [33] defined SG as games that have an
could achieve a specific goal, integrating problem-solving expliciteducationalpurposeandarenotintendedtobeplayed
strategiesandincreasingtheirself-efficacyincaseofsuccess. mainlyforfun.
The complexity of the SG development has established This definition was partially supported by Michael and
several approaches, which involve Software Engineering Savill-Smith [34], who described SG as games whose pri-
methodologies [18], [19], design for commercial games mary purpose is not entertainment or fun. Meanwhile,
through Game Design Document (GDD) [20]–[22], and the thestudycarriedoutbyZyda,[35]describestheSGconcept,
environment of game-based learning focused on Instruc- as a mental competition played on a computer according to
tional Design (ID) [23], [24]. Each one of them establishes specific rules. It uses entertainment to promote training in
diverse activities that can be intertwined to analyze their severalareassuchasgovernment,education,health,andpub-
perspectives to generate a hybrid conceptual model for SG lic policy; defining objectives of strategic communication.
design. Furthermore, this topic has gained increasing atten- Additionally, it incorporates pedagogical aspects (activities
tion from researchers, who have reported several benefits that educate or instruct, imparting knowledge or skills) that
such as improving student’s motivation, immersive learning becomeanSG.
experiences,participation,andcollaborationinamoremean- Gametechnologyiswidelyavailableandcanincorporate
ingfullearningsetting[25]–[28]. elements of fun and entertainment. It, combined with con-
Consequently, the teamwork of SG development should ventionaltrainingandeducationalapproaches,couldprovide
includespecialistsfromdifferentscienceareassuchassoft- authoritative sources of knowledge transferred in various
wareengineers,designers,developers,programmers,artists, applicationdomains.Inthissense,SGhasbeenmainlyused
teachers,psychologists,pedagogues,andstudents.Multidis- as a tool that offers players a new way of interacting with
ciplinaryteamsdefinethespecificrolesthatintegrateeduca- games. It reinforces the learning process, skills, and knowl-
tionalinnovationtoaddresstheissuesinthisfield.Thegame edge;promotingphysicalactivities,supportsocial-emotional
shouldcombineepisodesofgamesinsynergywithlearning, development, and treatment for different educational and
whichallowscreatinganeffectiveSG. physicaldisorders[36].
Despite the contributions of researchers’ work on SG ThesuccessofSGineducationalsettingsisbasedonthe
design, there is still a gap between the approach of the combinationofaudiovisualmediawithimmersivetechnolo-
designer using GDD and the developers who use Software gies that prevail in games, which improves the absorption
engineeringmethodologiescommonly.Inthissense,thetra- of information in the student’s memory [37], [38]. Recent
ditional development methodologies could not guarantee studieshaverecognizedthebenefitsofusingSGinavariety
effective coordination and integration in all the related dis- ofcontexts[39]–[41].InworkdevelopedbydeFreitas[42],
ciplines and present difficulties in this process to achieve a the potential of SG to offer a paradigm in training and edu-
final artifact (SG) [29], [30]. Therefore, it is necessary to cationforthe21stcenturyisconsidered.Ontheotherhand,
establishmechanismstointerweavethetechnicalaspectsof SGhasalsocontributedtothedevelopmentofskillsandabil-
SoftwareEngineeringwiththecharacteristicsofcommercial itiesonstudents,suchaseye-handcoordination,rapidreac-
game design and elements of ID. So, they can coexist in tion, multiple attention capacities. Also, it can engage high
an educational environment. Notations and models that fill motivation to achieve critical thinking, relational aptitude,
thisgaparenecessarytofacilitatethedesignofasuccessful creativity,cooperation,highertolerancetofrustration,adapt-
SG [31]. In this way, a well-designed SG could contribute ability, ability to take risks, problem-solving, and decision-
significantlytochildrenwithlearningdisabilities,oritcould making[43]–[45].
serve as a therapeutic reinforcement mechanism in the edu-
cationalsetting. III. RELATEDWORKS
Therestofthepaperisstructuredasfollows.Afterreview- Formorethantwodecades,manytypesofcomputergames
ingthebackgroundinSection2,asummaryoftheliterature have been developed for educational and training purposes
review is presented in Section 3. The conceptual model in with various levels of success [46]. As technology has
Section 4 and the analysis results through a case study in evolved, the games have incorporated immersive learning
Section5.Finally,conclusionsandfutureworkaredescribed. experiencesbasedonadequatestrategies[47]–[50].However,
a poorly designed educational game would expose one or
II. BACKGROUND more elements of the gameplay. For instance, satisfy the
Costikyan[32]statesthatagameisanendogenousreciprocal entertainment objectives or sacrifice effective pedagogy to
structurethatrequiresplayerstoreachaspecificgoalthrough attemptortokeepthegameconvincing.Ontheotherhand,
challenges. This definition has been adapted to the advance severaleducationalinstitutionsareimmersedinaninnovation
of the digital age. In this sense, SG, as a branch of video process, that includes the introduction of digital games in
games,hasproposedtheconceptofcomputergamesdesigned the classroom, as a mechanism to reinforce the learning of
for a serious purpose that is not pure entertainment. The theirstudents.Inthisscenario,SGcanshowtheirpotentialto
first scientific work about SG appeared at the end of the achievesignificantresultsinthelearningprocess.
161018 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
Fullerton[25]andSchell[51]mentionedtheneedtoestab- Saavedra et al. [19] established a development process
lishmethodologies,models,frameworks,andauthortoolsto forSG,foundedontraditionalparadigmsofSoftwareEngi-
support the design phase of SG, to ensure its effectiveness neering (Requirements, Design, Development, Testing, and
in the educational environment through the ludic purpose. Post-mortem).Itisintegratedwithdigitallearningresources
Besides,thecomplexityofthedevelopmentofSGhasestab- based on pedagogical and technical aspects; that facilitate
lishedseveralapproachesthatinvolvevariousprocessesand the teaching-learning process for the students. Additionally,
activities.Next,severalproposalsarepresentedbasedonthe Szczesna et al. [55] developed a methodology for design-
literature analyzed since 2010 (Table 1). Seven methodolo- ingofSG,whereCognitive-behaviorproceduresareapplied
gies,fourframeworks,andsixmodelswereidentified,which by using psychological tools. It lets participants encounter
areappliedfortheSGdesign.Fromtheexaminedapproaches, newfeelingsandemotionsbythetimetheygetentertained.
fivestudiesconsideredpedagogicalaspects,whileonlytwo AnotherstudypresentedbyO’Haganetal.[56]specifiedthe
papers are based on therapeutic elements. Also, four works adequate procedures for developing games through a set of
used experimental design to validate their proposals, either modelsthathecreated.Itusedhybridandagilemodels,with
through the case studies or generation of game prototypes. thestandardtechniquesofSoftwareEngineering.
Moredetailsarepresentedbelow. Other researchers have presented results through frame-
works and models. For adequate SG designing, Ibrahin and
Jaafar [57] combined three factors: game design (usability,
A. SOFTWAREENGINEERINGAPPROACH multimodal and fun), learning content modeling (syllabus
Several contributions have been established from Software matching),andpedagogy(learningoutcomes,motivationthe-
Engineering. Connolly [52] and Saavedra et al. [19] ana- ory, self-learning, and problem-solving). Mariaisetal.[58]
lyzed how computer games evolved by means of the Soft- defined aspects in the design of Learning Role-Play
ware Engineering life cycle. Cano et al. [53] proposed the Game (LRPG) to validate the SG throughout three phases
MECONESIS methodology for the SG design for children (Initialdesign,Adjustmenttocontext,andExecution);based
with hearing disabilities using a Human-Computer Inter- onthecollection,thescenarioexchange,andcomponentsof
action (HCI) approach, which details four phases: analy- LRPG;consideringtheactors,rules,andfunctions.Klapztein
sis, pre-production, production, and post-production. It is andCipolla[27]describedaframeworkforgamificationser-
based on the unified process of software development, that vices.ItwasdevelopedthroughtheADR(Action,Design&
involves notations like CTT (Concurrent Task Trees) to Research)methodologythatestablishesfourstages:a)prob-
modeltheinteractions.UnifiedModellingLanguage(UML) lem formulation; b) building, intervention, and evaluation;
to prototype the class diagrams; as well as IMS-LD meta- c)reflectionandlearning;andd)formalizationofknowledge.
datatodescribescenarios,andBusinessProcessModeland The proposal focuses on the design of games and services.
Notation(BMPN)toexplainprocesses. Besides, this work describes an application implemented
Also,AlsanandBalci[18]presentedaGAMEDmethod- throughtheexposedframework.
ology that details the principles, strategies, and procedures Finally,Carvalhoetal.[59]presentedtheATMSGconcep-
that guide step by step the development of an educational tualmodelforeducationalgamesfoundedonthepedagogical
game integrated into the software lifecycle. It established objectivespointedoutintheTheoryofActivity.Itdescribes
4phases:a)GameDesign(Problemformulation,GameIdea how the game components are interrelated with gameplay,
andGameDesign);b)GameSoftwareDesign(Requirement aswellasthemechanicstoachievethedesiredpedagogical
development, Architecting, and Software Design; c) Game goals. Three evaluations of studies were implemented for
Implementation and Publishing (Programming, integration, validationwithfavorableresults.
andadvertising);andd)Game-basedLearningandfeedback.
All stages of each process are proposed for Quality Assur-
ance. These studies stated the benefits of applying SG in B. ARTANDDESIGNAPPROACH
learning, which led to positive outcomes in areas like cog- The ‘‘Game Design Document’’ (GDD) has been created
nition,behavior,affection,andmotivationinschoolenviron- fromtheArtandDesignfield.Itdetailsallthefeaturesand
ments.Nevertheless,thegamesneedtobeevaluatedbyusing elements of the game. However, the lack of clarity in this
appropriatetechniques. document affects how designers present their ideas. Many
Otherwork[54]includesamethodologybasedongraphic designers exhibit their works through illustrations or notes
notation and an interactive narrative for the development of without a consolidated structure, which hinders communi-
SG, which facilitates teamwork communication. The pro- cation between designers and other areas of SG develop-
posal points out a pre-phase where the design of the edu- ment [60]. Several researchers have proposed activities to
cational challenges is selected. It considers a type of game, documenttheideasofgamedesigners,makingthecommuni-
aninitialplanofthestory,andthemaincharacters.Sceneries, cationprocesseasyandpracticalfortheteamwork[20]–[22],
chapters, and scenes are designed, as well as educational [61],[62].Thegamedevelopmentstartswiththepreparation
challenges and assessments. Subsequently, the design and phase; followed by the design phase, and production phase
collaborativeworkarecarriedoutinthisstudy. (withseveraliterations);andfinally,postproduction.
VOLUME7,2019 161019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
TABLE1. AsummarymatrixofSGdesigncomponentsclassifiedbystages/authors(enhancedfrom[79]).
Inthepreparationphase(analysis),allinformationabout isthebasisforwritingtheGDD,andthefunctionalrequire-
thecharacteristics,needs,andinterestsofthetargetgroupis ments. The videogame genre is selected, then, a storyboard
collected.Thecentralconceptofthegameisdefined,which isbuiltbasedonthepreconceivedideaspreviouslydiscussed
161020 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
(e.g.,thecharactersstyle,theenvironment,themusic,among TherearefewmodelsforSG,whichintegratedtheIDwith
others). The functionality and acceptance of the game are thegamedevelopmentprocess[23],[24],[66].ThisIDaims
validatedthroughthefeedbackoftheend-usersidereceived theconsolidationofanadequate,competent,andinteractive
inthefirsttest,thisstageisknownpaperprototype[20],[25]. training within education that adapts to any situation, topic,
Inthedesignphase,theelementsthatmakeupthegameare andaudience.ThemostknownIDmodelisADDIE(Analyze,
defined. The story is developed; script sketches are created Design,Develop,Implement,andEvaluate),whichfacilitates
to determine the objectives and the context. The principal the complexity of the learning setting [23]. It begins with
charactersareselected,aswellastheoverallnarrative[20], analyzing the characteristics of students, the content, and
[63]. As a presentation mechanism, scenarios, and scripts theenvironment,aswellasidentifyrequiredresources.The
are used to create concepts of the game aspect (e. g., how result will describe a problem with a solution proposal that
the characters, the scenes, objects, and sound elements are evaluates the needs of the material and available resources
visualized). Finally, the programming design is established, for its application. The design phase includes the conduct a
which describes how the game will be implemented. The taskinventory,composeperformanceobjectivesandgenerate
programming language and the methodology for the imple- testing strategies. The development phase details the story-
mentationwillbeselected.Inclusivetasksdefinedabovewill board, the instructional activities, and the materials of the
aimtogeneratetheGDD. teacher and student (guidance). The implementation phase
Theproductionphase(development)issimilartothetra- prepares the learning environment, using the administration
ditionalprocessesoftheSoftwareEngineeringlifecycle.The system,contentreview,andtechnicalsupportforteachersand
GDD and the functional requirements are overlapped into students. The evaluation phase is considered a transversal
the game scenarios, using programming, interface develop- axis of this model since interpreting the results and review
ment,illustration,modeling,animation,anddevelopmentof of the activities in each phase. In the case of a proto-
sounds. type, the appropriate adjustments to the expected model are
Finally,inthepost-productionphase,thedistributionpro- developed[67].
cessconsistsofpublishingorgeneratingcopiesofthegame Another proposed model is 4C-ID (Four Components-
forsaleindifferentphysical/virtualstores.Onlineandoffline InstructionalDesign)[24]appliedineducationalgamesand
marketingisessentialtopublicizethegameandgetasmany sophisticated learning setting rest on the cognitive load
players as possible. The maintenance permits an update to basis[68].Themodelcontainsfournon-linearcomponents:
improvetask-basedonnewtechnologicaltrendsofhardware learning tasks, supportive information, part-task practices,
andsoftware. andjust-in-time(JIT)information.Theprincipaldesigngoal
is the development of reflective knowledge, which implies
theabilitytoapplyautomatedprocessestosolveconcurrent
C. INSTRUCTIONALDESIGNAPPROACH tasksandproblemsquicklyandeffectively.Thismodelalso
SG is based on learning theories, which are organized providesafundamentalapproachtotheanalysisofcognitive
with a set of principles. 1) Constructivism integrates sev- skillsandthedesignoftrainingtodirecttheseskills.
eral methods. It could be actor-network, activity, situated The methodologies, frameworks, and GDD analyzed for
learning, problem-based learning, discovery learning, cog- SGdesignarewidelyusedtostrengthenthedevelopmentof
nitiveapprenticeship,case-basedlearning,andsocialdevel- learningcompetencies,sincetheyallowtoimprovestudents‘
opment.2)Humanismisbasedonexperimentalknowledge. skills (motor, social, and emotional skills and intellectual
3) Cognitivism is founded on attribution theory, elaboration development aspects) [69]. Likewise, SG could provide an
theory, cognitive development, and condition of learning. attractiveandmotivatingenvironmentsinceitallowsstudents
4)Behaviorismisestablishedonsociallearningtheory,pro- tolearnfromtheirmistakes.Duetothechallengesestablished
grammed instruction, and direct instruction [64]. The SG accordingtotheirlevelofskillsandcompetenciesreceiving
designinvolvesseveralperspectivesonlearningtheories.The immediate feedback. It enhances the strengthening of skills
game components as well as the learning contents must be indecision-making,collaborativework,andleadership.
discussedregardingtheseviewpoints. Several researchers [55], [58], [70], [71] pointed out the
Another aspect to be considered in the ID is Gagne’s importance of specific components for the SG design, such
Nineevents,whichcanbeusedaccordingtothegamechar- ascleareducationalgoals,attractiveandfunelements,linear
acteristics [65]. These events are recursive and can vary. narrative,gender,andfeedbackprocesses.Thesecomponents
Sequence and frequency depend on the instructions stated allowtheplayertomeettheestablishedchallenges,according
inthegame.Forexample,gamesgaintheplayers’attention to the conceived gameplay. Additionally, the work devel-
through animations, sound effects, cut scenes, music, and opedbyCarvalhoandothers[59],[71]–[75]confirmedthat
characterspeech.Feedbackmustbeaconstant,intuitive,and the educational objective is the central aspect that should
adequateenvironment,andrarelydelayed.Oneoftheadvan- be considered in the initial phase (analysis). Antonaci and
tagesofincludingtheIDprocesswithintheSGdesignisthat Brezinka [76], [77] claimed that motivation is essential in
theresultscanbemeasuredwhichenablestheevaluationof the design of an SG. Nevertheless, a few considerations
theobjectives. aboutthepedagogicalfeaturesinthegamewereestablished.
VOLUME7,2019 161021

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
Theevidenceliesinthefewamountsofstudiesperformedon evaluation,reflection,andhypothesistesting.Therefore,itis
thiscriticalissue.KlapzteinandCipolla[27]alsopointedout essentialtoselectthegamegenrethatdetailsitscharacteris-
thatstudents’skillsandknowledgeareasoughttobecovered ticstobedesignedbasedonthegameplayinteraction.
foranappropriateSGanalysistoachievethestatedgoals. Later, the user profile characteristics should be known,
Inclusive approaches were analyzed, focusing on four based on questions such as: Who are the final users? What
stages: Analysis, Design, Development, and Evaluation knowledge, skills, and experiences do the students/users
(adapted of ADDIE model), they have been overlapped have? What learning styles do they use? Are they comfort-
dependingontheircharacteristicsasshowninTable1.Ingen- able using emerging technologies.? It allows analyzing the
eral,allapproachesestablishthatSGrequiresacommitment age segment, the level of education, experience with video
from stakeholders as well as active communication, which games,physicalandmentalconditions,skills,availabilityto
ensures a successful development. Another necessary com- play,personality,andthegeographicalscope(local,national,
ponentisamodelinglanguagetodetailtheSGrequirements or international) of the recipients of the game. It includes
forapracticaldesign.Itiscomplementedwiththeverification severallanguagesorculturalfeaturesoftheregion(LATAM,
ofcomplianceofeducationalobjectives. EU,USA,ASIA).
Aftercollectingthisinformation,thenextstepistoanalyze
the goals and expected results of the SG. Three categories
IV. PROPOSEDCONCEPTUALMODEL areconsideredbelow.i)Skills,whichdefinespecificactions
Allthestudiesanalyzedsofarleadtotheconclusion‘‘IfSG that the player can carry out, ii) Knowledge, focused on
design is not well-defined, it will not solve the challenges conceptuallearningandtheabilitytoanalyze,synthesizeand
and goals established.’’ Therefore, the SG design process is apply concepts, and iii) Dispositions, which lead the player
complex because it integrates various heterogeneous fields to a critical self-reflection on beliefs, understanding, and
of knowledge. Many game developers and Software engi- attitudes.Besides,thepedagogicalagendadescribesgeneral
neers know little about the Instructional Design, as well as objectivesandtheiraprioriconditioningfactors,theenviron-
Instructional designers unknown the aspect of the software ment, and the work team. Therefore, it must be established
developmentlifecycle(SDLC)andGDDdevelopment.How before beginning the development of the SG. This agenda
to combine these three approaches to optimize game-based is linked to the pedagogical curricula (e. g., Learning to
learningthroughSGisthechallenge.Withthisbackground, read,Math,History,Science,amongothers).Itcanpromote
this paper proposes a model to integrate these points of specific causes or values of social, humanitarian, or thera-
viewtocreateengaginglearningexperienceswithemerging peutic interest. For instance, to help refugees, how to act in
technologies. case of natural disasters, protection of animals in danger of
This model is designed to facilitate interactive learning, extinction,orsupportforlearningdisabilities.
whichincorporatesfunandentertainment.Itbasedonlearn- Within this agenda, the pedagogical objectives must be
ing theories, GDD, SDLC, and instructional processes to more granular to be associated with the challenges of the
meeteducationalgoalsconsideringthatSGisausefullearn- game. Learning strategies must be planned appropriately to
ingtool.Partofthechallengeistocreateimmersivelearning serve as a motivating axis within the SG. This process is
environments using new technologies like AR/VR. For this carried out in an active and critical environment. The con-
proposaloftheConceptualModelforSGdesign,fourmain struction of identity can be included through avatars in the
phases were established: Analysis, Design, Development, game, allowing roles to be assumed and decisions to be
and Evaluation, as shown in Fig. 1. The details of them are taken,consideringtheperspectiveoftheplayer,basedonthe
describedbelow. theoryofself-perception.Learningtheoriesareimmersedand
Analysis:Thisphasecouldbenefitfromsoftwarerequire- willbethecentralcolumnofgamemechanics.Forexample,
ment engineering procedures to reduce risks generated by Piaget’s concept of cognitive disequilibrium describes the
inadequate specifications. It begins with a concept or main experience game players through the process that leads to
idea and specifies the content area/skillset. The document questions-asking,whichcouldbethekeytopromoteengage-
defines (in a few lines) the basic idea of the game, the type mentandlearning[78].Inthesameway,Vygotsky’sconcept
or genre, the spectrum of available platforms, the audience, of scaffolding defines the game-designers method used to
and the risks. On the other hand, every kind of game genre helpplayerstogetsuccessfulgameplay[64].Anotheraspect
hasprocessesandconventionswiththeircharacteristicsand ofbeingconsideredistheconditionofthelearningneedsfor
strategies. For example, an arcade-genre is associated with theproblem-solvingusingacomplexrule/cognitivestrategy
puzzle-solving, strategy skills complex thinking, hand-eye thatmustbeembeddedwithinthegamenarrative.
coordination, andspeed of response. MassivelyMultiplayer Furthermore, learning strategies define the complexity of
Online Role-Playing Game (MMORPG) allows thousands thegameusingcognitiveflexibilityandmeaningfulactivities,
of players to enter a virtual world simultaneously. Support- whichareclosetotheplayer’srealenvironment.
ing social learning strategies, discovery-based learning, and Inthissense,levelsofdifficulty,activelearningdynamics,
shared goal setting. An adventure game tends to strengthen and the use of errors as possible sources of learning and
161022 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
FIGURE1. ProposedConceptualModelforSG.
collaborative work can be established. Subsequently, whole The environment defines where the game is intended to
pedagogicalaspectsareintegratedintotheinteractiondesign be played (classroom, in a space prepared for therapy, or at
andgamerules. home) with the possibility of intervention by the teacher,
VOLUME7,2019 161023

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
family members, or therapists. Also, it analyzes the game learningdisabilities.Inthissense,theotherfactorsthatcould
platform for mobile devices or desktop that interacts with bepointedouttodevelopthegamearedetails.Forinstance,
a single-user or multi-user, as well as the entertainment the application of computer-based activities will allow par-
accessories(sounds,video,2Dand3Dimages,effects,etc.) ticipantstoresolveconflicts,channelnegativeemotions,and
The rewards are established during the gameplay and ran- achievehighersocial-emotionalcapacity,providingimmedi-
domization of activities to provide the surprise effect. After atefeedback.Theactionattemptsatpersonaleventsaremore
that, a work team will be formed, which should include productive. Repetition is necessary during all interventions
specialists from different areas of science such as software sinceitcouldhelptoimprovethelearningprocess.Addition-
engineers, graphics and game designers, developers, pro- ally,fortheactivitytobesuccessful,thelearningcontentmust
grammers, artists, psychologists, pedagogues, teachers, and besegmented.
students.Altogether,identifythespecificrolesthatintegrate On the other hand, this setting allows determining the
educationalsettingswithgamesepisodesinsynergy. mainelementsinthedesignphase,thatinclude:Environment,
For an estimated budget, several factors that involve the Gamemechanic,Scenarios,Gameobjects,Learningsystem,
cost of developing the SG must be considered. For exam- and Architecture & Technical Specifications (Fig. 2). Here,
ple, the 2D or 3D graphics components needed, animation it is displayed how the educational objectives are related to
required;reusableornon-reusabletemplateswithscenesand the challenges of the game, which are developed implicitly.
scenarios in real environments, the levels of difficulty and Itsparticularitiesaredetailedbelow.
thenumberofplayers.Therefore,adjustmentsmustbemade •Environmentistheworldgame,whichcanhavephysical
basedonneedsandtrade-offthewayforward. orvirtualconstraintsoftheSG,anditispartofthegameplay
As a result of this phase, a specification document context. It promotes an emotional appeal that attracts the
(2to4pages) is described, which details the functional and attentionoftheplayers.Furthermore,itisnecessarytodefine
non-functionalrequirementsoftheSG(Table2). a genre, (e. g., puzzles, role play, racing simulation, flight
simulation,adventure,amongothers)thetargetaudience,and
the level of the design which could be defined through the
TABLE2. Maincomponentsthatarecollectedinthespecific
requirementsdocument. previousmarketanalysis.
•Gamemechanicsisanessentialelement,whichdescribes
theactionsthatlearners/playerscandotocompletethegame
goals.Itallowsbuildingmethodsandrulesdesignedforthe
player to interact through challenges, moving characters or
objects, rotation systems, and randomizer. Also, it defines
thescoringmethod,rewardsorpunishments,mobility,among
others. The Flow Game is a potent tool for creating content
that could become rewarding and engaging. For example,
using smart tricks to smoothly guide the player towards the
goalandkeepthemwelloriented.Finally,itcanbeconsidered
theimplementationofArtificialIntelligence(AI)algorithms
for the automation of internal processes. This component
involvesactivitiespreprogrammedthroughnon-playerchar-
acter(NPC)thataretriggeredbyactionsordialoguewiththe
playerwithintheSG.
• Scenario allows the designer to describe how the game
willlook.Itconsistsofthreelayers:representation,services,
and interaction. The first layer defines the elements of the
Design:Oncethemaincomponentshavebeenarticulated, scenes, characterization, and context. The scenes represent
the next phase specifies the design requirements needed to a setting (e. g., a laboratory, a castle, or a realistic or imag-
achieve the desired goals. It defines the context, behavior, inary representation) as well as establish a configuration
andrulesformasteringeachchallenge/skill.Theeducational that will require a complete workflow in the graphics envi-
objectivesmustbegroundedinthegamenarrative.Regarding ronment. Also, it is essential to analyze what the role of
learning activities, several criteria must be established. For the characters in the game is, this allows guide the player
example, a) Organizing the learning material, b) Providing duringtheperformance(idealformorblankslate).Thelast
feedback in a formative way of learning, c) Choosing an pieceisthecontext,whichincorporateselementsthatcould
appropriatelanguageforthegame,d)Analyzingtheconsis- be pictures, props, text, music, art, and so on. The second
tencyofthelearningpresentation,ande)Providinginterac- layer describes a set of services, these are tools that players
tivitytoincreasecommitment. can use to increase the possibility to play the game longer
In addition, some aspects will be considered as signifi- (e.g.,chatting,ranking,leaderboards,badgesthatprolongthe
cantwhenusedintherapeuticinterventionsthatwillhelpin game, among others). The last layer defines the interaction
161024 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
FIGURE2. ComponentsforDesignPhase.
andinterface.Itdescribeshowtheplayerrelatestothegame into the SG development.? What specifications does the
(physical and virtual), and how the game could respond to software-development environment need? What will be the
an intercommunication (commands, input interface through softwarespecificationsandarchitectureforSG?Whatgame
keyboard,mouse,ormotionsensors). engine, framework, and development tools will be used?
• Game objects represent a particular object or element What is the software development kit (SDK) required for
includedintheenvironment.Theycanbeabletomanipulate emerging/immersive technologies? In what platform will it
physically or virtually during the game. The game object is bereleased?Whichstandardsecurityfeatureswillbeimple-
expressedthroughcharacters,actions,GUIcomponents,and mented.?
events. Characters have a set of characteristics (an avatar, With the technological advancements, tools and appli-
appearance, state, functions, movement activities) and can cations are available to develop the SG with emerging
create actions that describe the aesthetic representation of technologies like AR/VR, that considering capture the user
them.Actionscouldbetheresultoftheplayerchangingthe context through the sensors. For this process, it performs
stateorattributeofanobject.GUIcomponentsareelements transformations, comparing this context with information
used to allow the player to interact through sounds, anima- stored in a database, and generating signals that present
tions,graphicstyles,andmotions. digitaldata(patternrecognition),whichproduces‘‘augmen-
•Thelearningsystemisacrucialpillarfortheconstruction tations.’’ The equipment/hardware will include video cam-
of knowledge within the SG, which is composed of educa- era/Webcam, storage space for objects, powerful processor,
tionalobjectivesandpedagogicalstrategies.Thefirstoneis among others. It allows associate real and virtual objects
anindispensabletoolforteaching,itcanbedefinedbyusing in real-time with a user interface to interact in this setting;
Bloom’s taxonomy. It allows engaging players to interact andsensorsinfrastructurecapableofidentifyingmovement,
activelyintheirlearning.Pedagogicalstrategiesdefineagen- position,anddirectionofplayers.
eral teaching method. It can influence instructional design. In the case of the SG uses a natural user interface (NUI)
The combination of both would create a useful educational based on sensors, some strategies for design must be
environmentfortheSG.Inthetherapistsetting,someintel- defined. For instance, learn the limits of the sensors
lectualandmotorskillscanbeconsidered,forinstance,motor (e. g., Sony PlayStation Move, Microsoft Kinect, Oculus),
coordination,reasoningoperations,oralexpression,concen- prevent game mechanics that require precise control about
tration, enhancing attention, memory capacity, autonomy, sensors. Also, the developer should consider the cogni-
balance,criticalthinking,andothers. tive load demanded by the player and elements for feed-
• Architecture and technical specifications describe the back systems (audio and haptics). Exercise previous and
components from a procedural perspective. It defines future movements can determine a rhythm in the player
the game architecture that manages the data generated by actions[80].Besides,itshouldbeconsideredwhethertheSG
the client or server. Here are some questions to consider: Is will use the web environment, a local area network (LAN),
there any new emerging technology that can be integrated orstand-alone.
VOLUME7,2019 161025

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
These elements will allow defining the functionality and (guide or instructions) to the player/learner. During the
featuresthatbecomepartofSG. hands-on validation process, the learner performs the train-
All these components of the SG design can be modeled ing (simulation with serious play measuring and feedback).
using UML (Unified Modeling Language) notation. Sim- Theinstructor/therapistisresponsibleforaccompanyingand
plified graphic representations of the concepts and objects assisting learners, who are responsible for generating the
highlight their main characteristics in the game. For this performance reports, evaluating, and providing feedback to
proposal,theUMLprofileknowsasUP EG(UMLProfilefor learnerstogetherwiththeSGteammanager.Finally,mainte-
4
EducationalGames)proposedbyRodriguesetal.[81]could nancewillallowmodifyingcomponentsofthegamesystem.
be selected, whose main elements are stereotypes, restric- ItsprimarypurposeistochangeandupdatetheSGtoexpand
tions, and tagged values. This profile works only with the performanceandgameplayortocorrectfaults.
classdiagrambecauseitisoneofthemostusedforsoftware
modeling [82]. In order to generate a UP 4 EG profile needs V. PROPOSALEVALUATION
to describe each component above and transform it into a ThewholeprocesstocreateofSGusedtheproposedmodel
package,whichhandlesthedifferentobjectsandclasses. as a structure into four phases, which defines a formal
Inthedevelopmentphase,taskplanningistheprocessof descriptionundertheneedsofalearningsettingortherapeu-
managingataskaswellastheabilitytotrackit.Thisactivity tic environment. For this situation, The SG ‘‘ATHYNOS’’
includes using a GANNT chart to ensure that the devel- was designed for therapeutic activities and cognitive
opment process is adequately organized. The requirements reinforcement.
describedinpreviousstagesbegintobecodifiedbytheteam Inthefirstphase,therequirementsconcerningtheanalysis
of programmers, developers, database analysts, artists, and were made. Table 3 shows in detail the components col-
designers(modelers,animators,soundproducers)supported lectedinthespecificdocument.Thefollowingstageincluded
bythetechnicalmanager.Itisthemostextendedphaseofthe design.ThearchitectureusedinATHYNOSconsistsofthree
SG,andwholedevelopmenttoolsmustbecarefullymanaged, mainelements:interface,gamemotor,andreport.Theinter-
based on the best programming approach. Software debug- faceprovidestheuser’soutput/inputinteraction,whichsends
gingisanecessaryprocessfordetectingandfixingproblems andreceivesinformationtobeusedbygamemotorthrougha
usingmethodsforcodecorrection.Finally,documentationis NUI.Thismotorisresponsibleforthegameplayandconnects
donetoexplaintheSGfunctionalityandtodiscussessential tothereportingelementusingadatabase.Thereportmanages
questionsarisingbetweendevelopersandstakeholders. theprocesstoobtaintheresults,whichareaccessibletothe
The evaluation phase is another component within the therapistsandexpertsviaanInternetconnection.Othercom-
modelforSGandmustbedonecontinuouslyineachoneto ponentsweredefinedliketheenvironment,gamemechanics,
ensurethatallelementsworkcorrectly.Inthetestingprocess, the scenarios, and game objects, that described the learning
two roles (the expert and end-user) can be used to validate systemtochildrenwiththislearningdisabilities.
theSG.Withtheexpert,thefirsttaskisthevalidationofthe In the development phase, a desktop platform (Microsoft
achievementgoals,whichmatchestheeducationalobjectives Windows) and Unity 3D as a powerful game engine were
withSGcontent,andthepresenceofstructuringknowledge. chosen. It combined the functional programming C# with
It will contribute to getting the learning/therapy outcomes. theVuforiaSoftwareDevelopmentKit(SDK)toimplement
Besides, it is necessary to check if the SG is based on one AR. In art and graphic design, Adobe Illustrator allowed
of the learning theories. Assessment can be organized with the creation of characters, scenes, settings, and environ-
short-termobjectivesandinthelong-term.Forinstance,solv- ments. Adobe After Effects software was used to generate
ingthechallengeandovercomingtheobstacle,fixingallthe theprototypesofanimationsandoptimizedthepresentation
trials, and achieving the final goal of the game. New forms ofresults.Moreover,AdobePremiereProhelpedtheediting
ofevaluationmustbedesigned,whichcanmeasureengage- of professional videos, and Ableton Live created a music
ment, fun, motivational feedback, summative/formative or sequence together with Adobe Audition for audio postpro-
individual/collective assessment, among others. After that, duction.Thesecomponentsinteractedthroughanaturaluser
Game quality can be evaluated according to the graphics, interfacewithKinect2.0forWindows.Allprocessesmustbe
sounds,andcodethatarecompiledintothegame.End-user thebestprogrammingpractices.Finally,theprototypegame
evaluation is based on the different aspects concerning the wasdebuggingandfixingproblems.
‘‘usability’’. For example, it can include cognitive evalua- FortheevaluationofATHYNOS,amultidisciplinaryteam
tion(challenge,skills,cleargoals,easeofdoing,innovative, was formed. They tested the usability and effectiveness of
meetsdemands,competences,amongothers)andemotional the game in several pilot tests. The feedback was evaluated
outcomes (enjoyment, boredom, anxiety, control, and inde- and incorporated into the prototypes. The minigames were
pendence). improvedandexpanded,untilreachingtheirfinalversion.
Forthegameimplementation-specifichardware,operating ATHYNOS has three minigames; each one was designed
system, plugins, devices, and other components are needed to help children with learning disabilities mentioned above.
to be well-installed and used in the best conditions to run Familiar places and attractions (The Child Pass Festival)
the SG. Also, it is necessary to provide installation support in Riobamba city will encourage the player to know about
161026 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
TABLE3. MaincharacteristicsoftheanalysisphaseinATHYNOS.
VOLUME7,2019 161027

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
TABLE3. (Continued)MaincharacteristicsoftheanalysisphaseinATHYNOS.
the culture local. This SG begins with a tutorial video, that PassFestival,thatisshownonthemonitor.Thechallengeisto
providesabriefdetailabouthowtoplayit.Thefollowingare checkhowmanycharactersarepresentedandfindoutwhich
generalcharacteristicsofeachgame. one(s)aremissing.Then,theplayerdragsanddrops.While
A. Match minigame created for children diagnosed with thechildiscompletingthequests,thegamesavesautomati-
Dyscalculia, which reinforces the basic arithmetic calcula- callythesuccesses/errorsobtained,andthetimespenttoend
tion, promotes the motor skills and improve the children’s theactivity(Fig.3).
motivation. It consists of a series of activities towards the Experimental research would reveal whether cognitive-
completion of arithmetic operations. The player chooses behavior therapies performed, and knowledge gained by
a balloon containing a calculation that must match with playing ATHYNOS was significant to improve their skills.
the corresponding result, which is showed using dominoes Itcouldbeevaluatedviaacasestudy.
cards. The gamer uses the movement hand to complete the
action. The minigame has three difficulty levels, each one A. DEFININGTHECASESTUDY
saved the time spent to solve the activity and the number This case study used the protocol described by Yin [83]
of successes and errors of each player. The global result as a research strategy. It allowed to explore the knowledge
is analyzed by the therapist to plan future activities. It is utilization process and define the appropriate design. This
essential to mention that the player passes automatically to studyinvolvedaseriesofthereunitsofanalysis(minigames)
the next level (beginner, intermediate, and advanced) and inlearningdisabilitiessettings.ThepurposeargueshowSG
eachonehasrewardsandfeedbackstoknowiftheactivityis usingtheproposedmodelcouldimprovethechildren’sskills.
goingwell(Fig.3). The case study design was selected specific multiple-case,
B.ShapeminigamewasdevelopedforchildrenwithDys- whichusedsmallexperimentaldesignstoanalyzeaparticular
praxia. It helps to improve the movement and coordination, phenomenon(experimentalandcontrolgroups).Itfollowed
fine and gross motor skills. The player looks in detail the asequentialreplicationdesign.Thefirstanalyzedminigame
figure of the character located in the center of the screen wascompletedbeforethenextonewasstarted.Thefindings
andmustmatchitwiththerespectiveformshowedasshape were included in the model to improve it. Each subsequent
(challengeaction).Ateachlevel,thechildmustfindthecor- minigamewasabletobuildupontheinterpretationofresults
rectwaytocompletetheactivity.Threevariables(successes, frompreviouscases.
errors, and time) for each quest are automatically recorded The data collection procedure included on-site observa-
intothedatabase(Fig.4). tion, face-to-face interviews with the key informants, and
C. Missing character minigame is based on cognitive- data saved in registers of SG. This type of evidence was
behavior therapies for kids with ADHD. It helps in inat- relevantandspecifiedtheminimumamountofdatatocollect.
tention, impulsive behavior, concentration difficulties, and The experts helped to validate proof and correct specific
workingmemory.Intheminigame,theplayerselectsagame facts. The next step was the analysis, which used an inter-
cardthatcontainsatagAR,whichisassociatedwithaland- active model that consists of quantitative and qualitative
scapeofRiobambacity,thatincludescharactersoftheChild tabulations.Thecase-comparisonmethodtookadvantageof
161028 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
FIGURE3. Screenshotofminigames.a.MissingCharacter,b.Math,c.Shape.
statistical techniques to compare with the explanation from partoftheresearchteam.Theydirectedandcoordinatedthe
otherfactsorcomponents. interventionsessions.
The experimental period was two months by each
B. EXPERIMENTDESIGN minigame, where the participants attended two weekly ses-
The psychologists identified candidates for this case study, sions through random selection. Each therapy meeting had
who are working in cognitive-behavior therapies for more a duration of about 15 minutes. The trial was conducted
than 20 years. These children are receiving therapies for with the use of a laptop (Windows environment), a projec-
specific learning difficulties (Dyscalculia, Dyspraxia, and tor, a tangible device to motion detection (Microsoft Kinect
ADHD) in public and private centers located in Riobamba 2.0 sensor), and AR cards. It permits more immersive and
city-Ecuador. Their parents wrote a consent for this interactiveactionswithlittleeffortbyplayers.Accordingto
experiment. specialists on learning disabilities, the smartphone was not
In order to make a comparison, in each unit of considered,becauseofitsadistractorforchildren.
analysis (minigame), two groups were classified. The Inthebeginning,allchildrenweredescribedindetailhow
first one was nominated as Control Group (CG), which to play ATHYNOS minigames. Then, the participants take
worked with a traditional therapy method. The second one part in the tangible SG to avoid errors in the experiment.
was called Experimentation Group (EG), which applied Throughoutthesessions,thetimesspenttosolvetheassigned
ATHYNOS minigames. Educators and therapists were also activities in the traditional method and using ATHYNOS
VOLUME7,2019 161029

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
FIGURE4. GraphicresultoftheTimeandPerformancevariablesbetweenCGandEG.a.MissingCharacter
minigame,b.Mathminigame,c.Shapeminigame.
were registered. Analogously, for each correct answer (suc- that played ATHYNOS developed the assigned activities
cess)isassignedavalueof1point;otherwise,ithadapenalty in less time compared with the CG. According to the evi-
(error).Thefollowingstepwastocalculatetheaveragescore denceshowed,thetimespentwiththeTraditionalmethodof
of each participant, considering the scale of 1 to 10 points Domino increases meaningfully in the activities’ execution.
defined by the Ministry of Education of Ecuador. For this A significant advance in the mathematical reasoning was
study,thisaverageisknownasperformance. confirmed in the EG through the analysis of their academic
Afterward, the statistical open-source software ‘‘R’’ was performance.(Fig.3a).
usedtoexamineindetail.Thedatadistributionwascalculated
byusingtheShapiro-Wilktest.Asaresult,thetimedistribu-
2) SHAPEMINIGAMEFORDYSPRAXIA
tionobtainedwithATHYNOSwasnotnormal;consequently,
According to Table 4, the p-value 1.085e-04 is less than
theWilcoxonmethodwasneeded.Theresultsarepresented
0.05.Thedescriptiveanalysiscorroboratesthattheexecution
inTable4.
time is longer when the players work with manual therapy
C. EXPERIMENTRESULTS activities. Meanwhile, children that used ATHYNOS were
1) MATCHMINIGAMEFORDYSCALCULIA animprovementintheirmotorlevelandhand-eyecoordina-
The result obtained in p-value 3.337e-05 for the one-tailed tion based on performance variable and learning activities.
is less than a significant level p-value. It confirms children (Fig.3b).
161030 VOLUME7,2019

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
TABLE4. Statisticalresultsobtainedbyparticipantsbasedonworksof[5],[6],[84].
3) MISSINGCHARACTERMINIGAMEFORADHD Engineering methodologies with Instructional design and
As the result, a p-value less than 0.05 is statistically signif- functionalrequirementsdescribedintheGameDesignDoc-
icant, it confirms that participants who played ATHYNOS ument.Inthissense,theproposedmodelpresentsacompre-
during the sixteen sessions improved significantly in their hensivewaytodesignanddevelopanSGthroughstructured
componentsthatarewell-definedintofourphases.
| daily life functioning | across | domains of time | management |     |     |     |     |
| ---------------------- | ------ | --------------- | ---------- | --- | --- | --- | --- |
andsocialskills,aswellasanimprovementintheirlevelof Compared to other approaches, this work offers a more
concentration (Fig. 3c). Also, it detected a homogeneity in precisemodelfortheanalysisoftheagendaeducationaland
bothgroupssincethevariabilityofthetimesandperformance elementsofInstructionaldesign.Itallowslinkingthesecom-
values obtained are similar, which points out that children ponentstowardtheoveralllearningobjectives,performinga
| havethesameabilities. |     |     |     | decompositionindetailasthegameunfolds. |     |     |     |
| --------------------- | --- | --- | --- | -------------------------------------- | --- | --- | --- |
This case study was a significant step forward, as it Then, an SG called ATHYNOS was developed based on
tested and compared the results of the implementa- theproposedmodel.Thisgameincludedanaturaluserinter-
|                 |             |               |              | face, based | on body movements | (use of sensors), | as well |
| --------------- | ----------- | ------------- | ------------ | ----------- | ----------------- | ----------------- | ------- |
| tion of ATHYNOS | in children | with learning | disabilities |             |                   |                   |         |
(Fig.4a,4b,4c). as AR assistive technology for the learning environment.
ATHYNOShelpsplayersincognitiveandmotorskillssuch
VI. CONCLUSION as motivation, eye-hand coordination, time management,
The attractiveness of videogames among the students interactivity, and problem-solving, improving selective and
younger has sparked many interests in the educational set- focused attention, which were evaluated through a case
ting.Manyempiricaltypesofresearchhavepointedoutthat study and statistical analysis using the local educational
| games increase | student motivation | and improve | the learn- | environment. |     |     |     |
| -------------- | ------------------ | ----------- | ---------- | ------------ | --- | --- | --- |
ing process. However, it is necessary to create a robust For future research, new tends for evaluation as Game
model for SG design, which integrates aspects of Software Learning Analytics [85] can provide information regarding
| VOLUME7,2019 |     |     |     |     |     |     | 161031 |
| ------------ | --- | --- | --- | --- | --- | --- | ------ |

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
the learning data inside of SG and determine which game [21] R.Rouse,III,andS.Ogden,GameDesign:TheoryandPractice,2nded.
components expose greater challenges for users, as well as Plano,TX,USA:Wordware,2005.
|     |     |     |     |     |     |     |     | [22] P.Schuytema,GameDesign:APracticalApproach.NeedhamHeights, |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
tracetheevolutionofsuccessfulplayers’activities.Thistask
MA,USA:CharlesRiverMedia,2007.
willimprovetheproposedmodel.
|     |     |     |     |     |     |     |     | [23] R. M. | Branch, | Instructional | Design: | The | ADDIE | Approach, | vol. 722. |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------- | ------------- | ------- | --- | ----- | --------- | --------- |
Springer,2009.
|     |     |     |     |     |     |     |     | [24] J.J.vanMerriënboer,R.E.Clark,andM.B.M.deCroock,‘‘Blueprints |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
REFERENCES
forcomplexlearning:The4C/ID-model,’’Educ.Technol.Res.Develop.,
[1] J.BreuerandG.Bente,‘‘Whysoserious?Ontherelationofseriousgames vol.50,no.2,pp.39–61,2002.
andlearning,’’J.Comput.GameCulture,vol.4,pp.7–24,Apr.2010. [25] T.Fullerton,GameDesignWorkshop:APlaycentricApproachtoCreating
InnovativeGames.BocaRaton,FL,USA:CRCPress,2008.
[2] T.MettlerandR.Pinto,‘‘Seriousgamesasameansforscientificknowl-
|     |     |     |     |     |     |     |     | [26] J.V.Hall,P.A.Wyeth,andD.Johnson,‘‘Instructionalobjectivestocore- |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
edgetransfer—Acasefromengineeringmanagementeducation,’’IEEE
Trans.Eng.Manag.,vol.62,no.2,pp.256–265,May2015. gameplay:Aseriousgamedesigntechnique,’’inProc.1stACMSIGCHI
[3] M.QianandK.R.Clark,‘‘Game-basedlearningand21stcenturyskills: Annu.Symp.Comput.-Hum.Interact.Play,2014,pp.121–130.
Areviewofrecentresearch,’’Comput.Hum.Behav.,vol.63,pp.50–58, [27] S. Klapztein and C. Cipolla, ‘‘From game design to service design:
|     |     |     |     |     |     |     |     | A framework |     | to gamify | services,’’ | Simul. | Gaming, | vol. | 47, no. 5, |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --------- | ----------- | ------ | ------- | ---- | ---------- |
Oct.2016.
pp.566–598,2016.
[4] T.Susi,M.Johannesson,andP.Backlund,SeriousGames:AnOverview.
|     |     |     |     |     |     |     |     | [28] M. W. | Martin | and Y. | Shen, ‘‘The | effects | of game | design | on learning |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------ | ------ | ----------- | ------- | ------- | ------ | ----------- |
Lund,Sweden:InstitutionenförKommunikationochInformation,2007.
[5] D. Avila-Pesantez, L. A. Rivera, L. Vaca-Cardenas, S. Aguayo, and outcomes,’’Comput.Schools,vol.31,nos.1–2,pp.23–42,2014.
L.Zuñiga,‘‘TowardstheimprovementofADHDchildrenthroughaug- [29] A.AmoryandR.Seagram,‘‘Educationalgamemodels:Conceptualization
andevaluation:Thepracticeofhighereducation,’’SouthAfr.J.Higher
mentedrealityseriousgames:Preliminaryresults,’’inProc.IEEEGlobal
Educ.,vol.17,no.2,pp.206–217,2003.
Eng.Educ.Conf.(EDUCON),Apr.2018,pp.843–848.
|                        |     |     |                |     |            |            |     | [30] K.Becker,‘‘Videogamepedagogy,’’inGames:PurposeandPotentialin |     |     |     |     |     |     |     |
| ---------------------- | --- | --- | -------------- | --- | ---------- | ---------- | --- | ----------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| [6] D. Avila-Pesantez, |     | L.  | Vaca-Cardenas, | L.  | A. Rivera, | L. Zuniga, | and |                                                                   |     |     |     |     |     |     |     |
Education.Boston,MA,USA:Springer,2009,pp.73–125.
| L.M.Avila, | ‘‘ATHYNOS: |     | Helping | children | with dyspraxia | through | an  |     |     |     |     |     |     |     |     |
| ---------- | ---------- | --- | ------- | -------- | -------------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
augmentedrealityseriousgame,’’inProc.Int.Conf.eDemocracyeGov- [31] M.Ahmad,L.A.Rahim,andN.I.Arshad,‘‘Areviewofeducationalgames
designframeworks:Ananalysisfromsoftwareengineering,’’inProc.Int.
ernment(ICEDEG),Apr.2018,pp.286–290.
Conf.Comput.Inf.Sci.(ICCOINS),Jun.2014,pp.1–6.
| [7] I. Bortone, |     | D. Leonardis, | M.  | Solazzi, | C. Procopio, | A.  | Crecchi, |                                                                       |     |     |     |     |     |     |     |
| --------------- | --- | ------------- | --- | -------- | ------------ | --- | -------- | --------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|                 |     |               |     |          |              |     |          | [32] G.Costikyan,‘‘IhavenowordsandImustdesign.Interactivefantasy#2,’’ |     |     |     |     |     |     |     |
L.Bonfiglio,andA.Frisoli,‘‘Integrationofseriousgamesandwearable
|     |     |     |     |     |     |     |     | Brit. | Roleplaying | J., to | be published. | [Online]. | Available: |     | http://www. |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | ----------- | ------ | ------------- | --------- | ---------- | --- | ----------- |
hapticinterfacesforneurorehabilitationofchildrenwithmovementdis-
orders:Afeasibilitystudy,’’inProc.Int.Conf.Rehabil.Robot.(ICORR), costik.com/nowords2002.pdf
|     |     |     |     |     |     |     |     | [33] C.C.Abt,SeriousGames:TheArtandScienceofGamesThatSimulate |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
Jul.2017,pp.1094–1099.
Life.NewYork,NY,USA:Viking,1970.
[8] M.A.CezarottoandA.L.Battaiola,‘‘Contribuiçõesdoaprendizadomul-
|     |     |     |     |     |     |     |     | [34] A.MitchellandC.Savill-Smith,TheUseofComputerandVideoGames |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
timídiaparajogoscomfoconasdificuldadesdamatemática,’’Tech.Rep.,
forLearning:AReviewoftheLiterature.2004.
2017,pp.80–92.
|     |     |     |     |     |     |     |     | [35] M.Zyda,‘‘Fromvisualsimulationtovirtualrealitytogames,’’Computer, |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
[9] M.D.Griffiths,D.J.Kuss,andA.B.O.deGortari,‘‘Videogamesas vol.38,no.9,pp.25–32,Sep.2005.
therapy:Anupdatedselectivereviewofthemedicalandpsychological
|     |     |     |     |     |     |     |     | [36] M.Ma,A.Oikonomou,andL.C.Jain,SeriousGamesandEdutainment |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
literature,’’Int.J.PrivacyHealthInf.Manage.,vol.5,no.2,pp.71–96,
Applications.Springer,2011.
2017.
|                 |     |              |          |            |                   |     |     | [37] A. D. | Baddeley, | ‘‘The | episodic | buffer: | A new component |     | of working |
| --------------- | --- | ------------ | -------- | ---------- | ----------------- | --- | --- | ---------- | --------- | ----- | -------- | ------- | --------------- | --- | ---------- |
| [10] J. Hamari, | D.  | J. Shernoff, | E. Rowe, | B. Coller, | J. Asbell-Clarke, |     | and |            |           |       |          |         |                 |     |            |
memory?’’TrendsCognit.Sci.,vol.4,no.11,pp.417–423,2000.
T.Edwards,‘‘Challenginggameshelpstudentslearn:Anempiricalstudy
onengagement,flowandimmersioningame-basedlearning,’’Comput. [38] C. Fadel and C. Lemke, ‘‘Multimodal learning through media: What
theresearchsays,’’Cisco,Syst.,SanJose,CA,USA,Tech.Rep.,2008,
Hum.Behav.,vol.54,pp.170–179,Jun.2016.
pp.1–24.
[11] N.ItenandD.Petko,‘‘Learningwithseriousgames:Isfunplayingthe
|     |     |     |     |     |     |     |     | [39] J. P. | Gee, What | Video | Games Have | to  | Teach Us | About Learning | and |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --------- | ----- | ---------- | --- | -------- | -------------- | --- |
gameapredictoroflearningsuccess?’’Brit.J.Educ.Technol.,vol.47,
Literacy.NewYork,NY,USA:Macmillan,2014.
no.1,pp.151–163,2016. E.Klopfer,S.Osterweil,andK.Salen,MovingLearningGamesForward.
[40]
[12] P. Torres-Carrión, C. Sarmiento-Guerrero, J. C. Torres-Diaz, and Cambridge,MA,USA:TheEducationArcade,2009.
| L.Barba-Guamán, |                     | ‘‘Educational |               | math game | for stimulation |         | of chil- |                                                                       |     |     |     |     |     |     |     |
| --------------- | ------------------- | ------------- | ------------- | --------- | --------------- | ------- | -------- | --------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|                 |                     |               |               |           |                 |         |          | [41] (2008).SeriousGamesinDefenceEducation.[Online].Available:http:// |     |     |     |     |     |     |     |
| dren            | with dyscalculia,’’ |               | in Proc. Int. | Conf.     | Inf. Theoretic  | Secur., | 2018,    |                                                                       |     |     |     |     |     |     |     |
www.caspianlearning.co.uk/MoD_Defence_Academy_Serious_games_
pp.614–623.
Report_04
[13] L.Shoukry,S.Göbel,andR.Steinmetz,‘‘Learninganalyticsandserious
|     |     |     |     |     |     |     |     | [42] R.D.D.Freitas,‘‘SMART:Systemofaugmentedrealityforteaching,’’ |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
games:Trendsandconsiderations,’’inProc.ACMInt.WorkshopSerious Univ.Madeira,Funchal,Portugal,Tech.Rep.,2008.
Games,2014,pp.21–26.
|                 |     |          |                |     |           |             |       | [43] I. Granic, | A.  | Lobel, and | R. C. | Engels, | ‘‘The benefits | of playing | video |
| --------------- | --- | -------- | -------------- | --- | --------- | ----------- | ----- | --------------- | --- | ---------- | ----- | ------- | -------------- | ---------- | ----- |
| [14] V. Ferrer, | A.  | Perdomo, | H. Rashed-Ali, | C.  | Fies, and | J. Quarles, | ‘‘How |                 |     |            |       |         |                |            |       |
games,’’Amer.Psychologist,vol.69,no.1,p.66,2014.
doesusabilityimpactmotivationinaugmentedrealityseriousgamesfor
|     |     |     |     |     |     |     |     | [44] C.S.GreenandD.Bavelier,‘‘Effectofactionvideogamesonthespatial |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
education?’’inProc.5thInt.Conf.GamesVirtualWorldsSeriousAppl.
distributionofvisuospatialattention,’’J.Exp.Psychol.,Hum.Perception
(VS-GAMES),Sep.2013,pp.1–8. Perform.,vol.32,no.6,pp.1465–1478,2006.
[15] F.LiarokapisandS.deFreitas,‘‘Acasestudyofaugmentedrealityserious [45] P.Wouters,C.vanNimwegen,H.vanOostendorp,andE.D.vanderSpek,
games,’’inLookingTowardtheFutureofTechnology-EnhancedEduca-
|     |     |     |     |     |     |     |     | ‘‘A meta-analysis |     | of the | cognitive | and | motivational | effects | of serious |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------- | --- | ------ | --------- | --- | ------------ | ------- | ---------- |
tion:UbiquitousLearningandtheDigitalNative.2010,pp.178–191.
games,’’J.Educ.Psychol.,vol.105,no.2,pp.249–265,2013.
[16] R.Dörner,S.Göbel,W.Effelsberg,andJ.Wiemeyer,Eds.‘‘Introduction
|     |     |     |     |     |     |     |     | [46] H. O | Neil, | Computer | Games | and Team | and | Individual | Learning. |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ----- | -------- | ----- | -------- | --- | ---------- | --------- |
toseriousgames,’’inSeriousGamesFoundations,ConceptsandPractice. Amsterdam,TheNetherlands:Elsevier,2007.
Cham,Switzerland:Springer,2016,pp.1–34. [47] C.Girard,J.Ecalle,andA.Magnan,‘‘Seriousgamesasneweducational
[17] S.TheodosiouandI.Karasavvidis,‘‘Seriousgamesdesign:Amapping tools:Howeffectivearethey?Ameta-analysisofrecentstudies,’’J.Com-
oftheproblemsnovicegamedesignersexperienceindesigninggames,’’
put.Assist.Learn.,vol.29,no.3,pp.207–219,2013.
J.e-Learn.Knowl.Soc.,vol.11,no.3,pp.133–148,2015.
|     |     |     |     |     |     |     |     | [48] V.Guillén-NietoandM.Aleson-Carbonell,‘‘Seriousgamesandlearning |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
[18] S.AslanandO.Balci,‘‘GAMED:Digitaleducationalgamedevelopment effectiveness: The case of it’s a deal!’’ Comput. Educ., vol. 58, no. 1,
methodology,’’Simulation,vol.91,pp.307–319,Mar.2015. pp.435–448,2012.
[19] A. B. Saavedra, F. J. Rodríguez, J. M. Arteaga, R. S. Salgado, and [49] T. S. Hussain and S. L. Coleman, Design and Development of Train-
C.A.C.Ordoñez,‘‘Aseriousgamedevelopmentprocessusingcompe- ing Games: Practical Guidelines from a Multidisciplinary Perspective.
tencyapproach:Casestudy:Elementaryschoolmath,’’inProc.15thInt.
Cambridge,U.K.:CambridgeUniv.Press,2014.
Conf.Hum.Comput.Interact.,2014,Art.no.99. [50] W.L.Johnson,N.Wang,andS.Wu,‘‘Experiencewithseriousgamesfor
[20] S.Rogers,LevelUp!TheGuidetoGreatVideoGameDesign.Hoboken, learningforeignlanguagesandcultures,’’inProc.SimTecTConf.,2007,
| NJ,USA:Wiley,2014. |     |     |     |     |     |     |     | pp.1–7. |     |     |     |     |     |              |     |
| ------------------ | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- | --- | ------------ | --- |
| 161032             |     |     |     |     |     |     |     |         |     |     |     |     |     | VOLUME7,2019 |     |

D.Avila-Pesantezetal.:ProposalofaConceptualModelforSGDesign:CaseStudyinChildrenWithLearningDisabilities
[51] J.Schell,TheArtofGameDesign:ABookofLenses.BocaRaton,FL, [68] B.SamruayruenandG.Jones,‘‘Learningexperiencewiththeworldof
USA:CRCPress,2014. warcraft(WoW)accordingtothe4C/IDmodel,’’inProc.E-Learn,World
[52] T.M.Connolly,E.A.Boyle,E.MacArthur,T.Hainey,andJ.M.Boyle, Conf.E-Learn.Corporate,Government,Healthcare,HigherEduc.,2009,
‘‘Asystematicliteraturereviewofempiricalevidenceoncomputergames pp.1906–1910.
andseriousgames,’’Comput.Educ.,vol.59,no.2,pp.661–686,2012. [69] D. Céspedes-Hernández, J. L. Pérez-Medina, J. M. González-Calleros,
[53] S.Cano,J.M.Arteaga,C.A.Collazos,C.S.Gonzalez,andS.Zapata, F.J.Rodríguez,andJ.Muñoz-Arteaga,‘‘SEGA-ARM:Ametamodelfor
‘‘Toward a methodology for serious games design for children with thedesignofseriousgamestosupportauditoryrehabilitation,’’inProc.
auditory impairments,’’ IEEE Latin America Trans., vol. 14, no. 5, 16thInt.Conf.Hum.Comput.Interact.,2015,p.10.
pp.2511–2521,May2016. [70] S.Arnab,T.Lim,M.B.Carvalho,F.Bellotti,S.deFreitas,S.Louchart,
[54] R. P. de Lope, J. R. L. Arcos, N. Medina-Medina, P. Paderewski, N.Suttie,andR.B.A.DeGloria,‘‘Mappinglearningandgamemechan-
and F.L.Gutiérrez-Vela, ‘‘Design methodology for educational games ics for serious games analysis,’’ Brit. J. Edu. Technol., vol. 46, no. 2,
basedongraphicalnotations:DesigningUrano,’’EntertainmentComput., pp.391–411,Mar.2015.
vol.18,pp.1–14,Jan.2017. [71] A. F. S. Barbosa, P. N. M. Pereira, J. A. F. F. Dias, and
[55] A. Szczesna, M. Tomaszek, and A. Wieteska, ‘‘The methodology of F. G. M. Silva, ‘‘A new methodology of design and development of
designing serious games for children and adolescents focused on psy- seriousgames,’’Int.J.Comput.GamesTechnol.,vol.2014,Jan.2014,
chologicalgoals,’’inInformationTechnologiesinBiomedicine.Springer, Art.no.8.
2012,pp.245–255. [72] L.DoucetandV.Srinivasan,‘‘Designingentertainingeducationalgames
[56] A.O.O’Hagan,G.Coleman,andR.V.O’Connor,‘‘Softwaredevelopment usingproceduralrhetoric:Acasestudy,’’inProc.5thACMSIGGRAPH
processesforgames:Asystematicliteraturereview,’’inProc.Eur.Conf. Symp.VideoGames,2010,pp.5–10.
Softw.ProcessImprovement,2014,pp.182–193. [73] J.T.KimandW.H.Lee,‘‘Dynamicalmodelforgamificationoflearn-
[57] R.IbrahimandA.Jaafar,‘‘Educationalgames(EG)designframework: ing(DMGL),’’MultimediaToolsAppl.,vol.74,no.19,pp.8483–8493,
Combinationofgamedesign,pedagogyandcontentmodeling,’’inProc. Oct.2015.
Int.Conf.Elect.Eng.Inform.(ICEEI),Aug.2009,pp.293–298. [74] F.Laamarti,M.Eid,andA.ElSaddik,‘‘Anoverviewofseriousgames,’’
[58] C.Mariais,F.Michau,andJ.-P.Pernin,‘‘Adescriptiongridtosupport Int.J.Comput.GamesTechnol.,vol.2014,p.11,Jan.2014.
thedesignoflearningrole-playgames,’’Simul.Gaming,vol.43,no.1, [75] L. Qingtang, W. Yang, W. Linjing, H. Jingxiu, and W. Peng,
pp.23–33,2012. ‘‘Design and implementation of a serious game based on Kinect,’’
[59] M. B. Carvalho, F. Bellotti, R. Berta, A. De Gloria, C. I. Sedano, in Proc. Int. Conf. Educ. Innov. Through Technol. (EITT), Oct. 2015,
J.B.Hauge,J.Hu,andM.Rauterberg,‘‘Anactivitytheory-basedmodel pp.13–18.
forseriousgamesanalysisandconceptualdesign,’’Comput.Educ.,vol.87, [76] A.Antonaci,R.Klemke,andM.Specht,‘‘Towardsdesignpatternsfor
pp.166–181,Sep.2015. augmentedrealityseriousgames,’’inProc.Int.Conf.MobileContextual
[60] W.K.Hira,M.V.P.Marinho,F.B.Pereira,andA.T.Barboza,Jr.,‘‘Criação Learn.,2015,pp.273–282.
deummodeloconceitualparadocumentaçãodegamedesign,’’inProc. [77] V.Brezinka,‘‘Computergamessupportingcognitivebehaviourtherapyin
SGGames,2016,pp.329–336. children,’’Clin.childPsychol.Psychiatry,vol.19,no.1,pp.100–110,
[61] P.daSilvaLeiteandV.G.deMendonça,‘‘Diretrizesparagamedesign 2014.
de JOGOS educacionais,’’ in Proc. SBGames, Art Design Track, 2013, [78] J.Piaget,Play,DreamsandImitationinChildhood,vol.25.Evanston,IL,
pp.132–141. USA:Routledge,2013.
[62] L.MottaandJ.Trigueiro,‘‘Shortgamedesigndocument(SGDD):Docu- [79] D.Ávila-Pesántez,L.A.Rivera,andM.S.Alban,‘‘Approachesforserious
mentodegamedesignaplicadoajogosdepequenoporteeadvergames,’’ gamedesign:Asystematicliteraturereview,’’ASEEComput.Educ.J.,
inProc.ArtDesignTrack-FullPapers/SBC-SBGames,2013,pp.1–7. vol.8,no.3,pp.1–11,2017.
[63] R.L.MottaandJ.T.Junior,‘‘Shortgamedesigndocument(SGDD):Doc- [80] K.IsbisterandF.Mueller,‘‘Guidelinesforthedesignofmovement-based
umentodegamedesignaplicadoajogosdepequenoporteeadvergames games and their relevance to HCI,’’ Hum.-Comput. Interact., vol. 30,
UmestudodecasodoadvergameRockergirlBikeway,’’inProc.Campinas nos.3–4,pp.366–399,2015.
Grande,FaculdadedeCiênciasSociaisAplicadasFACISA,2013. [81] L.Rodrigues,H.Costa,P.P.Júnior,andA.C.Inocêncio,‘‘Up4eg:Umper-
[64] L.S.Vygotsky,R.W.Rieber,andM.J.Hall,TheCollectedWorksofL.S. filumlparamodelagemdejogoseducacionaisdigitais,’’inProc.Brazilian
Vygotsky,vol.5.NewYork,NY,USA:PlenumPress,1998. Symp.Comput.Educ.(SimpósioBrasileiroInformáticaEducação-SBIE),
[65] R.Sreelakshmi,M.L.McLain,A.Rajeshwaran,B.Rao,R.Jayakrishnan, vol.27,no.1,p.120,2016.
andK.Bijlani,‘‘GamificationtoenhancelearningusingGagne’slearning [82] I.Sommerville,SoftwareEngineering,vol.10,10thed.2018.
model,’’inProc.6thInt.Conf.Comput.,Commun.Netw.Technol.(ICC- [83] R.K.Yin,CaseStudyResearchandApplications:DesignandMethods.
CNT),2015,pp.1–6. NewburyPark,CA,USA:SAGE,2017.
[66] R.J.Nadolski,H.G.Hummel,H.J.VanDenBrink,R.E.Hoefakker, [84] D.F.Avila-Pesantez,L.A.Vaca-Cardenas,R.D.Avila,N.P.Padilla,and
A.Slootmaker,H.J.Kurvers,andJ.Storm,‘‘EMERGO:Amethodology L.A.Rivera,‘‘Designofanaugmentedrealityseriousgameforchildren
and toolkit for developing serious games in higher education,’’ Simul. withdyscalculia:Acasestudy,’’inProc.Int.Conf.Technol.Trends,2018,
Gaming,vol.39,no.3,pp.338–352,2008. pp.165–175.
[67] P.Williams,L.Schrum,A.Sangrá,andL.Guárdia.(2001).Fundamentos [85] R.Thomas,S.Sanders,J.Doust,E.Beller,andP.Glasziou,‘‘Prevalence
Del Diseño Técnico Pedagógico En e-Learning. [Online]. Available: ofattention-deficit/hyperactivitydisorder:Asystematicreviewandmeta-
http://aulavirtualkamn.wikispaces.com/file/view/2.+MODELOS+DE+ analysis,’’Pediatrics,vol.135,no.4,pp.e994–e1001,2015.
DISEOÑ+INSTRUCCIONAL.pdf
VOLUME7,2019 161033