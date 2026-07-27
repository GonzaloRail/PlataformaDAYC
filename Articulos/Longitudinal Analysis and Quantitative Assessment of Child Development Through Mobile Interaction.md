Received12June2024,accepted8August2024,dateofpublication19August2024,dateofcurrentversion2September2024.
DigitalObjectIdentifier10.1109/ACCESS.2024.3446455
| Longitudinal |        | Analysis |                 | and         | Quantitative          |     |     |     |     |     |
| ------------ | ------ | -------- | --------------- | ----------- | --------------------- | --- | --- | --- | --- | --- |
| Assessment   |        | of       | Child           | Development |                       |     |     |     |     |     |
| Through      | Mobile |          | Interaction     |             |                       |     |     |     |     |     |
|              |        |          | 1,RUBENTOLOSANA |             | 1,RUBENVERA-RODRIGUEZ |     |     | 1,  |     |     |
JUANCARLOSRUIZ-GARCIA
| AYTHAMIMORALES |     | 1,JULIANFIERREZ |     |     | 1,(Member,IEEE), |     |     |     |     |     |
| -------------- | --- | --------------- | --- | --- | ---------------- | --- | --- | --- | --- | --- |
1,(Fellow,IEEE),
JAVIERORTEGA-GARCIA
| ANDJAIMEHERREROS-RODRIGUEZ |     |     |     | 2   |     |     |     |     |     |     |
| -------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
1BiometricsandDataPatternAnalytics—BiDALaboratory,EscuelaPolitecnicaSuperior,UniversidadAutonomadeMadrid,28049Madrid,Spain
2HospitalUniversitarioInfantaLeonor,28031Madrid,Spain
Correspondingauthor:JuanCarlosRuiz-Garcia(juanc.ruiz@uam.es)
ThisworkwassupportedinpartbytheProjectINTER-ACTIONunderGrantPID2021-126521OB-I00MICINN/FEDER;inpartby
HumanCAICunderGrantTED2021-131787BI00MICINN;andinpartbytheOn-GoingProjectwiththecollaborationofthe
GSDLasSuertesSchool,Madrid,Spain.
ABSTRACT This article provides a comprehensive overview of recent research in the area of
Child-Computer Interaction (CCI). The main contributions of the present article are two-fold. First,
wepresentanovellongitudinalCCIdatabasenamedChildCIdbLong,whichcomprisesover600children
aged 18 months to 8 years old, acquired continuously over 4 academic years (2019-2023). As a result,
ChildCIdbLong comprises over 12K test acquisitions over a tablet device. Different tests are considered
in ChildCIdbLong, requiring different touch and stylus gestures, enabling the evaluation of praxical
and cognitive skills such as attentional, visuo-spatial, and executive, among others. In addition to the
ChildCIdbLong database, we propose a novel quantitative metric called Test Quality (Q), designed to
measure the motor and cognitive development of children through their interaction with a tablet device.
In order to provide a better comprehension of the proposed Q metric, popular percentile-based growth
representations are introduced for each test, providing a two-dimensional space to compare children’s
developmentwithrespecttothetypicalageskillsofthepopulation.Theresultsachievedinthepresentarticle
highlightthepotentialofthenovelChildCIdbLongdatabaseinconjunctionwiththeproposedQmetricto
measurethemotorandcognitivedevelopmentofchildrenastheygrowup.Theproposedframeworkcould
beveryusefulasanautomatictooltosupportchildexperts(e.g.,paediatricians,educators,orneurologists)
forearlydetectionofpotentialphysical/cognitiveimpairmentsduringchildren’sdevelopment.
INDEX TERMS Child-computer interaction, ChildCIdb, drawing test, longitudinal analysis, Q-Metric,
e-Health,e-Learning.
|     |     |     |     |     |     | 2 years | old has doubled | between 1997 | and 2014 | [2], and |
| --- | --- | --- | --- | --- | --- | ------- | --------------- | ------------ | -------- | -------- |
I. INTRODUCTION
Nowadays,theexposureofyoungchildrentomobiledevices in children up to 8 years old has increased more than
has become nearly universal, with a high percentage of 11 times between 2011 and 2020 [3]. This aspect has been
| children having | access | to mobile | devices | before | the age |             |                 |             |     |            |
| --------------- | ------ | --------- | ------- | ------ | ------- | ----------- | --------------- | ----------- | --- | ---------- |
|                 |        |           |         |        |         | exacerbated | by the outbreak | of COVID-19 | in  | 2020, with |
of 1 or even having their own device by the age of studies reporting an alarming increase in the use of digital
4 [1]. In particular, screen exposure in children aged 0 to mediabychildren[4].Mobiledeviceusebyyoungchildren
|     |     |     |     |     |     | is pervasive | and increasing, | so the | relationship | between |
| --- | --- | --- | --- | --- | --- | ------------ | --------------- | ------ | ------------ | ------- |
The associate editor coordinating the review of this manuscript and children’suseofmobiledevicesandtheirdevelopmentisonly
beginningtoemerge.Forthisreason,parentsshouldregulate
| approvingitforpublicationwasAntonioPiccinno |     |     |     | .   |     |     |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

2024TheAuthors.ThisworkislicensedunderaCreativeCommonsAttribution-NonCommercial-NoDerivatives4.0License.
117436 Formoreinformation,seehttps://creativecommons.org/licenses/by-nc-nd/4.0/ VOLUME12,2024

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
FIGURE1. GraphicalrepresentationofthedifferentinterfacesdesignedinChildCIdbLong,whichcomprises6differentdataacquisitionsfromJanuary
2020toOctober2022.Twomainacquisitionblocksareconsidered:i)touch,andii)stylus.
their children’s exposure to mobile devices to enhance largest publicly available longitudinal database to date
their development through educational digital activities and for research in this area. ChildCIdbLong comprises
potential bonding through joint use [5]. However, parent- over 600 children aged 18 months to 8 years old,
reported duration of mobile device use in young children acquired continuously over 4 academic years (2019/20
has been found to have low accuracy, highlighting the need to 2022/23). As a result, ChildCIdbLong is composed
for objective measures in future research [6]. In addition, of over 12K test acquisitions over a tablet device,
parentstendtolettheirchildrenusemobiledevicesinmany usingbothtouchandstylusinteractions.Fig.1provides
situations, such as before going to sleep, after homework, a graphical representation of the tests considered in
ortokeepthemcalminpublicplaces,amongmanyothers[1]. ChildCIdbLong.
Despite this massive interaction of children with mobile • TheproposalofaquantitativemetriccalledTestQuality
devices, further research is needed to better understand the (Q) to automatically measure the motor and cognitive
impact of mobile device use on young children’s learning development of children through their interaction with
and development. In this regard, Herodotou analysed in [7] a tablet device over time. In order to provide a better
|     |     |     |     |     |     | comprehension |     |     | of the | proposed | Q   | metric, popular |     |
| --- | --- | --- | --- | --- | --- | ------------- | --- | --- | ------ | -------- | --- | --------------- | --- |
atotalof19studiesthatreportedlearninganddevelopment
effects on children aged 2 to 5 years old. Most studies percentile-basedgrowthfiguresareintroducedforeach
reported positive effects on mathematics, problem-solving, test, providing a two-dimensional space to compare
literacy development, and self-learning [8]. However, more children’s development with respect to the typical age
longitudinal studies are needed to analyse the evolution of skillsofthepopulation.
|               |     |           |         |               |           | A complete |     | experimental |     | analysis | of  | the potential | of  |
| ------------- | --- | --------- | ------- | ------------- | --------- | ---------- | --- | ------------ | --- | -------- | --- | ------------- | --- |
| other aspects | of  | children, | such as | their correct | motor and | •          |     |              |     |          |     |               |     |
cognitivedevelopment[9]. ChildCIdbLong database to measure the motor and
ThepresentarticleaimstoadvanceintheChild-Computer cognitive development of children as they grow up,
Interaction (CCI) research line by proposing a quantitative divided into two approaches: i) a general analysis, and
metricabletoautomaticallymeasurethemotorandcognitive ii)alongitudinalanalysis.
Theremainderofthearticleisorganisedasfollows.Sec.II
| development | of  | children | through | their interaction | with |     |     |     |     |     |     |     |     |
| ----------- | --- | -------- | ------- | ----------------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
the different tests presented in our unique ChildCIdbLong summarises an overview of recent studies on children’s
database.Inparticular,themaincontributionsofthepresent mobile device interaction and their proper development.
Sec.IIIdescribesallthedetailsofthenovelChildCIdbLong
articleare:
• An in-depth analysis of the state of the art in topics database. Sec. IV describes the proposed Q metric and how
|     |     |     |     |     |     | to calculate | it  | for each | ChildCIdbLong |     |     | test. In Sec. | V,  |
| --- | --- | --- | --- | --- | --- | ------------ | --- | -------- | ------------- | --- | --- | ------------- | --- |
relatedto:i)theinteractionofchildrenofdifferentages
withmobiledevices;ii)theexistinglongitudinalstudies wecomputethepotentialoftheQmetricformeasuringthe
and public databases related to children’s exposure to correct motor and cognitive development of children over
|                                                   |         |     |               |              |          | time. Finally, | Sec. | VI  | presents | the | conclusions | and | future |
| ------------------------------------------------- | ------- | --- | ------------- | ------------ | -------- | -------------- | ---- | --- | -------- | --- | ----------- | --- | ------ |
| mobile                                            | devices | and | their correct | development; | iii) the |                |      |     |          |     |             |     |        |
| varietyofgesturesthatchildrencanperformwithmobile |         |     |               |              |          | research.      |      |     |          |     |             |     |        |
devicesdependingontheirage;andiv)themostpopular
tools for measuring the correct motor and cognitive II. RELATEDWORKS
developmentofchildrenduringtheirgrowth. A. CHILD-COMPUTERINTERACTION(CCI)
Inrecentyears,severalstudieshaveanalysedtheinteraction
| • The | release | of a | novel longitudinal | database | named |     |     |     |     |     |     |     |     |
| ----- | ------- | ---- | ------------------ | -------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
ChildCIdbLong1. As far as we know, this is the of children with different mobile devices and interaction
|     |     |     |     |     |     | tools (e.g., | fingers, | keyboard, |     | voice, | and pen | stylus). | In the |
| --- | --- | --- | --- | --- | --- | ------------ | -------- | --------- | --- | ------ | ------- | -------- | ------ |
1https://github.com/BiDAlab/ChildCIdbLong
|               |     |     |     |     |     | present | article, | we focus | on  | studies | on  | works in | which  |
| ------------- | --- | --- | --- | --- | --- | ------- | -------- | -------- | --- | ------- | --- | -------- | ------ |
| VOLUME12,2024 |     |     |     |     |     |         |          |          |     |         |     |          | 117437 |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE1. Comparisonofdifferentlongitudinalstudiesfocusedontheinteractionofthechildrenwithmobiledevices.
children interact using: i) their own fingers, and ii) a pen performance of children improved as they grow, suggesting
stylus. Regarding the studies focused on finger interaction, the designing of touch interfaces adapted to children’s
Crescenzi and Grané presented in [18] an analysis of the limited motor and cognitive skills. The same dataset was
unstructured interaction of children with a tablet device. considered in other related works [20], [21]. In [20],
Inparticular,27childrenagedfrom14monthsto3yearsold through an approach based on the lognormality principle,
interact with 2 apps that allow free drawing and colouring Vera-Rodriguezetal. proposed an automatic system able to
with a small number of interactive screen elements (e.g., detect children from adults obtaining over 96% accuracy.
colourpalette).Theresultsobtainedhighlighttheimportance Similar results were obtained by Acien et al. in [21], where
of improving the design of interactive content regarding theauthorsproposedanactivedetectionapproachtoclassify
the mental models and fine motor skills development of children from adults based on the global characterisation
children under 3 years old. An interesting article in this of touchscreen interaction. Another article contributing to
research line is the work presented by Kabali et al. in [1]. theunderstandingofchildren’sinteractionwithtouchscreen
In that work, the authors analysed the use and exposure to devices was presented by Nacher et al. [22]. The authors
mobile devices by 350 children aged 6 months to 4 years. assessed the interaction skills of 55 children with Down
Almostallchildren(96%)startedusingmobiledevicesbefore Syndrome (DS), aged 5-10 years, in the use of multi-touch
the age of 1, as well as the most popular apps for them gesturesontouchscreendevices.Despitetheirlimitedmotor
are multimedia content applications, such as YouTube and skills, the results showed how DS children were able to
Netflix. For this reason, understanding children’s patterns performmostoftheevaluatedmulti-touchgestureswithhigh
of mobile device usage is crucial to ensure their correct success.
development and behaviour. Similar conclusions have been Regarding the use of a pen stylus as an interaction tool
obtained by Radesky et al. [6]. In that work, 346 parents with mobile devices, many studies have focused on this
and guardians of children aged 3 to 5 years were recruited researcharea.Yadavetal.analysedthedrawing350children
to participate in a study for assessing mobile device usage aged 2-12years using drawing apps and traditional meth-
(tablets and smartphones) in children. Statistics show that ods (crayons and watercolours) in [23]. They found that:
35% of the children had their own device at that age, again i) children between 2 and 3 years preferred drawing apps
mostlyusingitformultimediaapps(e.g.,YouTube,YouTube with a simpler interface for scribbling and using glowing
Kids, and Netflix, among others) and with an average daily colours;ii)childrenagedfrom4to6yearslikedtohavean
usageofabout2hoursperday. eraserfeaturetocorrecttheirdrawing;andiii)childrenaged
Averyinterestingarticleinthisresearchlinewaspresented from 7 to 8 years showed significant progress compared to
byVatavuetal.[19].Thestudyanalysedtouchinteractionin previous age ranges (i.e., use the undo feature, open saved
adatasetwith89childrenaged3to6yearsold,aswellasits drawings,usedifferentthicknesses,etc.)In[24],Mayeretal.
relationshiptomotorskills.Theresultsshowedhowthetouch analysedtheeffectsofchildren’shandwritingwithpaperand
117438 VOLUME12,2024

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
pencil,withastylusonatabletscreen,andtypingonavirtual TABLE2. Summaryoftouchgesturesperformedbychildrenaged
keyboard.Adatasetwith145childrenagedfrom4to6years from2to7yearsold.Thegestureshighlightedinboldarethose
consideredinthepresentstudy.ASrefersto‘‘AdultSupervision’’.
wascapturedanddividedintothreegroups:thepencil,stylus, Tablecontentisadaptedfrom[29].
and keyboard groups. The results highlighted that, although
the stylus requires higher motor control, the performance
of the stylus group did not differ significantly from either
the keyboard or the pencil group. A similar article in this
research line was presented by Patchan and Puranik [25].
The effectiveness of using tablets as a teaching tool for
preschool children (54 participants aged 3 to 5 years) to
learn letter-writing skills was investigated by the authors.
Inparticular,thestudyfocusedontheimpactofextrinsicand
intrinsic feedback on children’s learning outcomes through
3 ways of interacting: paper and pencil, tablet and finger,
or tablet and stylus. The findings indicated that tablet (typically completed by parents/caregivers). For example,
interactionscanbebeneficialinteachingpreschoolchildren McHargetal.[11]analysedtherelationshipbetweenscreen
towriteletters,regardlessofthetypeoffeedbackprovided. exposure (i.e., television, touchscreens, and computers) and
Stylus has also been considered by Remi et al. [26] to executivefunction(EF)inchildren(i.e.,EFreferstocognitive
analysethechildren’smotordevelopmentthroughtheirstylus processes that involve inhibitory control, working memory,
scribbling skills. For this purpose, the authors considered andcognitiveflexibility).Parentsof179childrencompleted
60 children aged 3-6 years and the Sigma-Lognormal similar questionnaires about their children’s technology use
writing generation model [20], concluding that there are when they were 2 and 3 years old. Results highlighted how
significant differences in the model parameters between the increased screen time in early childhood may have adverse
ages of children. A different approach was presented by effects on EF development, as well as the need for further
Tabatabaeyetal.toevaluatechildren’sdevelopmentthrough research in this area. A similar study was carried out by
drawing tasks on tablet devices [27]. Drawing data from Radesky et al. [14], exploring the relationship between the
631 children aged 6-7 years were analysed to find the useofmobiledevicesforcalmingpurposes,theEF,andthe
relationshipbetweenpolygonalshapedrawingstrategiesand emotional reactivity of children aged from 3 to 5 years old.
handwritingperformance.Theresultsshowedhowdifferent In particular, 422 children were assessed by their parents
drawing strategies influence children’s handwriting skills, through questionnaires completed once every three months.
as well as demonstrated the importance of understanding Thefindingsconcludedthattherewerebidirectionalassoci-
theserelationshipsforeducationalpurposes.Finally,inorder ations, i.e., higher emotional reactivity was associated with
todetectproblemsinmotorskillsduringchildren’sdevelop- increased device use for calming, and higher device use for
ment,Lanieletal.presentedthePenStrokeTest(PST)[28], calmingwasassociatedwithlowerEFscores.Aninteresting
a new measure of fine motor skills able to discriminate articleinthislineistheworkpresentedbyMcNeilletal.[15].
between children with attention-deficit/hyperactivity disor- This work studied the relationship betweenusing electronic
der (ADHD) and typically developing children. The study applicationsandmediaprogramviewinginpreschoolersand
provided preliminary evidence that PST may be useful as a theircognitiveandpsychosocialdevelopment.Questionnaire
toolforearlydetectionofADHD. datawerecollectedfrom185preschoolchildren(3-6years)
bytheir parents,concludingthatexcessive useofelectronic
applicationscanhavenegativeeffectsonchildren’scognitive
B. CCILONGITUDINALSTUDIES and psychosocial development. Similar conclusions have
Despitetheincreasedpopularityofchildreninteractingwith beenobtainedinotherstudiesintheliterature[12],[16],[17].
mobile devices, most studies in the literature are based on Finally, for completeness, we include in Table 1 the
a single data acquisition in time. As a result, this lack of descriptionofournovelChildCIdbLongdatabase,presented
longitudinalstudiesdoesnotallowforaproperanalysisofthe inthisstudy.Oneofthemaincontributionsofthisdatabase
correctchildren’sdevelopmentduringtheirgrowthbasedon with respect to other longitudinal studies in the literature
theinformationcapturedthroughtheinteractionwithmobile is: i) we acquire the complete interaction process of the
devices [7], [9]. Table 1 shows a comparison of the most children with the tablet while performing different tests.
relevantlongitudinalstudiesintheliterature,orderedbythe This allows an in-depth and quantitative analysis of the
ageofparticipants,includinginformationsuchasthenumber children, unlike previous approaches in the literature where
ofchildrenconsideredineachstudy,thegenderbalance,and theonlyinformationavailableisthequestionnairesdoneby
thedataacquisitionintervalsandperiodicity,amongothers. parents,whicharemanualandqualitative;andii)weacquire
In general, most studies focus on whether there is children aged from 18 months to 8 years old, considering
a relationship between children’s media exposure and several stages of the children’s development. Also, it is
future behavioural difficulties by analysing questionnaires important to highlight that the same children are acquired
VOLUME12,2024 117439

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE3. RelationshipbetweeneducationallevelsandagerangesaccordingtotheSpanisheducationsystem.
over time (6 acquisition sessions in total), from January Regarding the procedure followed to measure the correct
2020 to October 2022, providing a unique CCI database motor and cognitive development of children as they grow,
with 615 different children. Sec. III provides more details different tools have been proposed in recent years. Most of
regardingtheChildCIdbLongdatabase. them are used by therapists, early intervention specialists,
adapted physical education teachers, psychologists, and
others who are interested in examining the development
C. CHILDRENDEVELOPMENTANDMETRICS of children. One example of these tools is the Bayley-III
In1973,JeanPiagetdefinedhumandevelopmentascompris- test kit [33]. Currently, this third edition is considered
ingasequenceofdistinctdevelopmentalstages,rangingfrom the gold standard and is the most widely used tool to
infancy to adulthood [30]. These developmental stages are identifydevelopmentaldelaysinchildrenaged1-42months
basedontheevolutionofcognitive,physicalandsocialskills. and to provide information for intervention planning. With
Focusing on physical development, children must acquire this aim, this tool includes 5 different scales related to
rudimentary skills, related to fundamental functions (e.g., cognitive, language, motor, social-emotional, and receptive
walking,running,jumping,etc.),andfinemotorskills,related languageskills.Applyingthistoolcantakeupto90minutes.
to the execution of complex tasks involving smaller muscle In [34], the authors provided a review of the Movement
groups,suchasmanipulatingsmallobjects,usingscissorsor AssessmentBatteryforChildren-SecondEdition(MABC-2).
a pencil to write or draw, and performing touch gestures on The MABC-2 is a tool, typically comprising 8 different
mobiledevices,amongmanyothers. tests for each age range, used to assess and evaluate motor
Children’s physical development is a long process in performance in children and adolescents aged from 3 to
which their motor and cognitive skills constantly improve, 16 years old (in 3 age ranges), including manual dexterity,
enabling them to perform more demanding and complex postural balance, and aiming and catching. The study
tasks as they get older. This affects how children interact provided valuable insights into the use and effectiveness of
with mobile devices, as they do not have the same fine the MABC-2 in assessing motor skills disorders and child
motor skills as adults and are not able to perform the development. The application time for this tool is around
same type of interaction. Analysing the finger interaction 30minutes.Anotherinterestingassessmenttoolforchildren’s
through touch gestures, there is a wide range of possible gross and fine motor development from birth to 5 years
gesturesthatcanbeperformedonscreendevices,suchastap, old is the Peabody Developmental Motor Scales (PDMS-3)
drag, pinch, double tap, and drag-and-drop, among others. test kit [35]. It contains 6 different tests related to body
In [29], the authors conducted a meta-analysis to analyse control and transport, object control, hand manipulation,
previous researches on touch and multi-touch gestures by eye-hand coordination, and physical fitness. Applying this
children aged from 2 to 7 years old. The study provided tool takes around 60-90 minutes. Results are provided in
valuableinsightstodeterminethecapabilitiesandlimitations 3 composite scores: Gross Motor Index, Fine Motor Index,
of children in using tactile gestures in the context of and Total Motor Index. The reporting system also provides
CCI. Table 2 provides an overview of the touch gestures age equivalents, percentile ranks, scaled test scores and
performed by children on screen devices, from 2to7years composite index scores. As can be observed, most popular
old [29]. As can be seen, there is a constant improvement toolsaretime-consumingandtheobtainedresultsarehighly
in children’s execution of tactile gestures with increasing dependentontheexperienceandinterpretationoftheexperts
age. The youngest children (2-3years) can only perform using them. For this reason, turns crucial the proposal of
4basicgestures:tap,drag,slide,andpinch(i.e.,lowerlevel automaticandquantitativemetricsabletomeasurethecorrect
of cognitive and fine motor skills). Children aged 3-5 years motor and cognitive development of children through the
showanimprovementcomparedto2-3yearsbutsometimes use of mobile devices, which is the main purpose of the
stillneedadultsupervisionwhenperformingsomecomplex proposed study. This could be very valuable for therapists
gestures.Childrenolderthan5yearscanperformallgestures and specialists in the area to reduce time and achieve more
withoutsupervision.Focusingonpenstylusinteractionwith accurateresults.
mobiledevices,children’sabilitytouseitdependsonsome
factors, such as age, motor skills and visual perception. III. CHILDCIDBLONGDATABASE
Several studies have focused on this research line and A. GENERALDESCRIPTION
haveprovidedinformationonthedevelopmentalmilestones As far as we know, ChildCIdbLong is the largest publicly
associatedwithchildren’spenstylususe[25],[31],[32]. available database to date for research in CCI area. This is
117440 VOLUME12,2024

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE4. StatisticsofChildCIdbLongregardingthenumberofchildrenthatparticipatedineachgroupanddataacquisition.
an on-going database collected yearly in collaboration with 2 fingers and 1 tap/pinch are needed to complete
theschoolGSDLasSuertesinMadrid(Spain).Itcomprises it(30secondsmax).
childrenaged18monthsto8yearsgroupedinto7different • Block2:StylusAnalysis
educational levels (Groups 2 to 8) according to the Spanish – Test 5 - Spiral Test: using a pen stylus, children
education system (see details in Table 3). In the proposed must go across the inner part of the black spiral,
framework,childreninteractwithatabletdeviceusingboth from the central to the outer part (30 seconds
fingerandstylusasanacquisitiontoolbyperforming6dif- max).Inthebestscenario,only1strokeisneeded
ferenttestsgroupedin2mainblocks:i)touch,andii)stylus. to complete the test. It requires precise hand-eye
Fig. 1 provides a graphical representation of the acquisition coordination,finemotorskillstocontrolthestylus
movementandfollowalinewithoutgettingoffthe
process.Firstofall,theemotionalstateofthechildreniscap-
tured.Inthemiddleofthescreendevice,thereare3faceswith path,andvisualtracking.
different colours (green, yellow, and red) and expressions – Test6-DrawingTest:theoutlineofatreeappears
(happy, normal, and sad). The children must tap one with a on the screen. Children must colour the whole
fingeraccordingtotheiremotionalstate.Afterthat,wecon- tree using a pen stylus (2 minutes max). This test
involveshand-eyecoordination,finemotorskillsto
| sider | two different | test | blocks. | Each | test | requires | different |     |     |     |     |     |     |     |
| ----- | ------------- | ---- | ------- | ---- | ---- | -------- | --------- | --- | --- | --- | --- | --- | --- | --- |
motor and cognitive skills to be completed correctly within controlthestylusandstaywithintheoutlineofthe
atimerange.Next,webrieflydescribeeachofthetests: tree,aswellasplanningandorganisationtocolour
|     | Block1:TouchAnalysis |     |     |     |     |     |     |     |     | itproperlyandfast. |     |     |     |     |
| --- | -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | --- | --- | --- |
•
Alltestsweredesignedconsideringmanyofthecognitive
– Test 1 - Tap and Reaction Time: there are and neuromuscular aspects highlighted in the state of the
|     | 6 burrows |       | and 1 | mole.       | Children | must | tap           | the |              |               |               |           |          |             |
| --- | --------- | ----- | ----- | ----------- | -------- | ---- | ------------- | --- | ------------ | ------------- | ------------- | --------- | -------- | ----------- |
|     |           |       |       |             |          |      |               |     | art, e.g.,   | the evolution | of children’s |           | gestures | with age.   |
|     | mole      | using | only  | one finger. |          | Then | it disappears |     |              |               |               |           |          |             |
|     |           |       |       |             |          |      |               |     | In addition, | all tests     | were          | discussed | and      | approved by |
and reappears in another burrow up to 4 times neurologists,childpsychologists,andeducatorsoftheGSD
|     | (30 seconds |     | max). | At least | 4   | taps are | needed | to  |            |                      |     |       |     |              |
| --- | ----------- | --- | ----- | -------- | --- | -------- | ------ | --- | ---------- | -------------------- | --- | ----- | --- | ------------ |
|     |             |     |       |          |     |          |        |     | school and | their discriminative |     | power | was | validated in |
completethe test.It requiresfinemotor skills(tap previous experiments [36], [37], [38]. For completeness,
inasmallarea)andhand-eyecoordination.
otherchildren’sinterestingmetadataisalsocollectedsuchas
|     | – Test | 2 - Drag | and | Drop: | there | is a | carrot | and a |     |     |     |     |     |     |
| --- | ------ | -------- | --- | ----- | ----- | ---- | ------ | ----- | --- | --- | --- | --- | --- | --- |
thepreviousexperienceofthechildrenusingmobiledevices,
rabbit on the screen. Children must tap the carrot prematurity(<37weeksgestation),cognitivedisorders(e.g.,
|     | and swipe | it  | to the | rabbit | using | only | one | finger |               |              |     |          |           |             |
| --- | --------- | --- | ------ | ------ | ----- | ---- | --- | ------ | ------------- | ------------ | --- | -------- | --------- | ----------- |
|     |           |     |        |        |       |      |     |        | developmental | delay, ADHD, |     | language | disorder, | etc.), date |
(30secondsmax).Only1tapisneededtocomplete
|     |     |     |     |     |     |     |     |     | of birth, | gender, handedness, |     | and academic |     | grades, among |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --------- | ------------------- | --- | ------------ | --- | ------------- |
thetest.Itcombinesfinemotorskills(tapinasmall
others.Allthisinformationisalwayscollectedwithinformed
area),pressurecontrol,hand-eyecoordination,and
|     |                     |          |           |        |          |         |              |     | parental                       | consent for children’s |     | participation | in  | the research |
| --- | ------------------- | -------- | --------- | ------ | -------- | ------- | ------------ | --- | ------------------------------ | ---------------------- | --- | ------------- | --- | ------------ |
|     | trackingofmovement. |          |           |        |          |         |              |     | project.                       |                        |     |               |     |              |
|     | – Test              | 3 - Zoom | In:       | there  | is       | a small | rabbit       | and |                                |                        |     |               |     |              |
|     | 2 circles           | of       | different | sizes. | Children |         | must enlarge |     |                                |                        |     |               |     |              |
|     |                     |          |           |        |          |         |              |     | B. LONGITUDINALDATAACQUISITION |                        |     |               |     |              |
therabbitandputitbetweencirclesusing2fingers
|     |             |     |       |      |             |     |           |     | A preliminary | version        | of ChildCIdbLong |               |     | database was |
| --- | ----------- | --- | ----- | ---- | ----------- | --- | --------- | --- | ------------- | -------------- | ---------------- | ------------- | --- | ------------ |
|     | (30 seconds |     | max). | Only | 1 tap/pinch |     | is needed | to  |               |                |                  |               |     |              |
|     |             |     |       |      |             |     |           |     | presented     | in [36], known | as               | ChildCIdb_v1. |     | This version |
completethetest.Itinvolvesfinemotorskills(put was collected in January 2020 (just before the COVID-19
|     | the rabbit | inside   | two   | circles), |           | coordination |     | of the |           |               |          |      |              |       |
| --- | ---------- | -------- | ----- | --------- | --------- | ------------ | --- | ------ | --------- | ------------- | -------- | ---- | ------------ | ----- |
|     |            |          |       |           |           |              |     |        | outbreak) | and comprised | a single | data | acquisition. | Since |
|     | fingers    | (usually | thumb |           | and index | finger)      | for | the    |           |               |          |      |              |       |
then,5moredataacquisitionshavebeencollectedovertime,
|     | pinchmovement,andaccurateforceperception. |          |      |     |         |         |         |     |            |              |               |     | database2. |         |
| --- | ----------------------------------------- | -------- | ---- | --- | ------- | ------- | ------- | --- | ---------- | ------------ | ------------- | --- | ---------- | ------- |
|     |                                           |          |      |     |         |         |         |     | generating | the proposed | ChildCIdbLong |     |            | Table 4 |
|     | – Test                                    | 4 - Zoom | Out: | it  | is very | similar | to Test | 3,  |            |              |               |     |            |         |
2https://github.com/BiDAlab/ChildCIdbLong
|               | but this | time | the | rabbit | must | be reduced. |     | Only |     |     |     |     |     |        |
| ------------- | -------- | ---- | --- | ------ | ---- | ----------- | --- | ---- | --- | --- | --- | --- | --- | ------ |
| VOLUME12,2024 |          |      |     |        |      |             |     |      |     |     |     |     |     | 117441 |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE5. StatisticsoftheChildCIdbLongdatabaseregardingthegender,handedness,andemotionalstateinformation.
provides the details of each acquisition session, including children under 3 years old may recognise and label some
the number of children acquired in each educational level emotionsincorrectly[18].Therefore,wecannotassumethat
as well as the number of tests completed in total (i.e., each the youngest children were fully aware of their emotional
child has to perform 6 tests, as described before). In total, statewhenselectingoneofthe3emotionalstateoptions.
ChildCIdbLongcomprisesover2.1Kchildren’ssessionsand
over12.6Kchildren’stestsperformedandcollectedinthelast C. ADULTS:CONTROLGROUP
4academicyears(from2019/20to2022/23).Itisimportant As we have described in Sec. II, children are not able to
tohighlightthatasChildCIdbLongisalongitudinaldatabase, perform the same type of screen interaction (touch/stylus)
thesamechildrenwereacquiredduringthe4academicyears as adults due to the different levels of motor and cognitive
in order to study the motor and cognitive evolution of the development.Forthisreason,andtoallowdirectcomparisons
childrenovertime.Asaresult,those2.1Kchildren’ssessions betweenthemotorandcognitiveskillsofchildren(indevel-
were performed by 615 different children, incorporating in opment)andadults(fullydeveloped),adatasetcomposedof
every acquisition new children from the youngest groups 77adultswascollectedasacontrolgroupinJune2021,ina
(Groups 2 to 4) as they were more underrepresented. Also, singledataacquisition.Adultsagedfrom25to65yearsold
according to the Spanish education system, an academic interactedwiththetabletdevicebyperformingthe6different
yearcomprises9months,fromSeptembertoJune.Between tests proposed in ChildCIdbLong. All adults are school
these months, children are assessed at school in 3 main workers (e.g. educators, paediatricians, administrators, etc.)
academic evaluations (first, second, and third trimesters). withoutdeficitsandwithnormalactivity.
For this reason, our tentative idea was to carry out a new
dataacquisitionevery3months,thuscapturingtheevolution IV. PROPOSEDMETHOD:TESTQUALITY(Q)
of children after each academic evaluation. However, due AswementionedinSec.II-C,thereisalackofautomaticand
to the COVID-19 pandemic, this acquisition protocol could quantitativemetricsthatallowtomeasurethecorrectmotor
notbeimplementeduntilthe3rdacquisition(academicyear and cognitive development of children through the use of
2021/22). mobiledevices.Currenttoolsareingeneraltime-consuming,
In Table 5, we can observe the statistics about gender, manual, and qualitative as it depends on the experience and
handedness, and emotional state associated with each data pointofviewofthespecialist.Inordertoshedsomelighton
acquisition. Regarding gender, for all acquisitions, approx- thisaspect,inthisstudywepresentanewquantitativemetric
imately 50% of the children were male/female. In the case called Test Quality (Q). This metric measures the global
of handedness, around 90% of the world’s population is quality in which each test is performed, taking into account
right-handed[39].Left-handedandambidextrouspeopleare factorssuchastheamountoftimetakentocompletethetest
less common, around 10% [40] and 1% [41] respectively. and the way of interacting (e.g., number of touches/strokes
As can be seen in Table 5, on average more than 80% of used, whether the child draws outside the margins or not,
the children were right-handed, although this is not fully etc.).TheQvalueisapercentage(%)from0to100,where
defined until the age of 4-6 [42]. In addition, regarding the 100indicatesthatthetestisperformedperfectlyand0isthe
emotionalstateofchildren,atthebeginningoftheacquisition opposite.DuetoeachofthetestsdesignedinChildCIdbLong
most children (over 75%) were in a good mood. However, requires different motor and cognitive skills and different
117442 VOLUME12,2024

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE6. EquationsdefinedtocalculateptimeandptapsforTests1to4.
tmax:maximumtesttime;treal:timetakentoperformthetest;intapsand
outtaps:numberoftapsonandoffthemole,respectively;ntaps:total
numberoffingertapsused.
FIGURE2. Regionsdefinedin‘‘Test6:DrawingTest’’inordertocalculate it in the black line. However, in our experience,
theproposedQvalue.R0,R1,R2,R3,andR4refertothedifferentareas
ofthepicturehighlightedinblack,red,green,blue,andorangeregions, children usually perform the spiral in 4 different
respectively. ways: from the inner to the outer part, or vice
acquisition tools (touch and stylus), we describe next how versa, and across the black line or the white line.
to calculate the Q metric for each of the tests presented In all cases, the motor and cognitive skills needed
in ChildCIdbLong. For completeness and reproducibility are the same regardless of the way in which the
reasons,thecodeisalsoavailableinGitHub3.
spiralisperformed.Asaresult,weconsider4spiral
• Block1:TouchAnalysis(Tests1to4) templates (one for each case) to calculate the
| The | calculation | of Q | for these | tests | is indicated | by the |         |          |       |       |                  |     |      |
| --- | ----------- | ---- | --------- | ----- | ------------ | ------ | ------- | -------- | ----- | ----- | ---------------- | --- | ---- |
|     |             |      |           |       |              |        | Q value | for this | test. | The 4 | spiral templates |     | have |
followingequation: been performed by an adult with fully developed
|     | p  |     |     |     |     |     | motorandcognitiveskillsbyusingasinglestroke. |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------------- | --- | --- | --- | --- | --- | --- |
+p
|     |    | time taps, | Iftestiscompleted |     |     |     |          |        |                |       |           |        |         |
| --- | --- | ---------- | ----------------- | --- | --- | --- | -------- | ------ | -------------- | ----- | --------- | ------ | ------- |
| Q=  |     |            |                   |     |     |     | Given a  | spiral | test performed |       | by a      | child, | this is |
|     |     | 2          |                   |     |     | (1) |          |        |                |       |           |        |         |
|     | 0, |            |                   |     |     |     | compared | with   | the 4          | adult | templates | using  | the     |
Otherwise
|     |     |     |     |     |     |     | Dynamic | Time | Warping | (DTW) | algorithm |     | [43], |
| --- | --- | --- | --- | --- | --- | --- | ------- | ---- | ------- | ----- | --------- | --- | ----- |
TheQvalueisdifferentto0incasethetestiscompleted
|     |     |     |     |     |     |     | [44]. DTW | is  | an algorithm |     | used | to measure |     |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | ------------ | --- | ---- | ---------- | --- |
bythechild.Inotherwords,forTest1the4molesmust the similarity between time series, returning a
| be touched, |     | for Test | 2 the carrot | must | be  | moved and |           |       |         |     |              |         |     |
| ----------- | --- | -------- | ------------ | ---- | --- | --------- | --------- | ----- | ------- | --- | ------------ | ------- | --- |
|             |     |          |              |      |     |           | numerical | value | related | to  | the distance | between |     |
touchtherabbit,andforTest3and4therabbitmustbe
|     |     |     |     |     |     |     | them. The | lower | the DTW | value | is (d), | the | higher |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----- | ------- | ----- | ------- | --- | ------ |
placedbetweenthetworedcircles.Theamountoftime
|                         |     |     |      |                       |     |     | thesimilarity | betweenthe |           | timeserieswill |                 |     | be.The |
| ----------------------- | --- | --- | ---- | --------------------- | --- | --- | ------------- | ---------- | --------- | -------------- | --------------- | --- | ------ |
| takentoperformthetest(p |     |     |      | )andthenumberoffinger |     |     |               |            |           |                |                 |     |        |
|                         |     |     | time |                       |     |     | following     | equation   | indicates |                | the calculation |     | of the |
tapsused(p taps )areconsideredinthecalculationofthe QvalueusingDTW:
Qvalue.Thelongerittakestoperformthetest,thelower
− d
| theQvaluewillbe.Thesameappliestop |     |     |     |     | ,theQvalue |     |     |     | Q=e | ·100 |     |     | (2) |
| --------------------------------- | --- | --- | --- | --- | ---------- | --- | --- | --- | --- | ---- | --- | --- | --- |
|                                   |     |     |     |     | taps       |     |     |     |     | k    |     |     |     |
willbelowerwiththenumberoftapsneededtocomplete
wheredrepresentsthedistancebetweentimeseries
thetest.AscanbeseenintheQvalueequation,wegive
usingDTWandkreferstothelengthoftheoptimal
| thesameimportancetotime(p |                                |     |     | time )andnumberoftaps |     |      |              |     |         |        |     |              |     |
| ------------------------- | ------------------------------ | --- | --- | --------------------- | --- | ---- | ------------ | --- | ------- | ------ | --- | ------------ | --- |
|                           |                                |     |     |                       |     |      | path between | the | aligned | points | of  | the compared |     |
| (p                        | )intheequation.Table6showshowp |     |     |                       |     | andp |              |     |         |        |     |              |     |
taps time taps time series. This value is finally multiplied by
| are        | calculated | for each    | of the   | tests (Tests | 1       | to 4). Both |        |        |           |     |       |               |     |
| ---------- | ---------- | ----------- | -------- | ------------ | ------- | ----------- | ------ | ------ | --------- | --- | ----- | ------------- | --- |
|            |            |             |          |              |         |             | 100 to | obtain | a Q value | in  | terms | of percentage |     |
| parameters |            | are defined | in order | to           | provide | percentage  |        |        |           |     |       |               |     |
(between0and100).
| values | (between | 0 and | 100). | Regarding | the | definition |     |     |     |     |     |     |     |
| ------ | -------- | ----- | ----- | --------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
– Test6:DrawingTest
| of the | p taps | value, for | Test 1 | this value | increases | (25) |     |     |     |     |     |     |     |
| ------ | ------ | ---------- | ------ | ---------- | --------- | ---- | --- | --- | --- | --- | --- | --- | --- |
Intheproposedtest,childrenmustcolouratreein
| withthenumberofmolescorrectlytouched(in |                          |          |        |                         |        | )and     |                                             |     |          |              |     |         |     |
| --------------------------------------- | ------------------------ | -------- | ------ | ----------------------- | ------ | -------- | ------------------------------------------- | --- | -------- | ------------ | --- | ------- | --- |
|                                         |                          |          |        |                         |        | taps     | thebestpossiblewayusingapenstylus.Wepropose |     |          |              |     |         |     |
| decreases                               | (5)                      | with the | number | of taps                 | out of | the mole |                                             |     |          |              |     |         |     |
|                                         |                          |          |        |                         |        |          | the following                               |     | equation | to calculate |     | Q based | on  |
| (out                                    | taps ).ForTests2to4,thep |          |        | taps valuedecreaseswith |        |          |                                             |     |          |              |     |         |     |
5differentregionsofthepicture(seeFig.2):
| thenumberoftapsperformed(n |     |     |     | ),asitonlyrequires |     |     |     |     |     |     |     |     |     |
| -------------------------- | --- | --- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
taps
Q=R0−(R1+R2+R3+R4)
| onetaptocompletethetest. |     |     |     |     |     |     |     |     |     |     |     |     | (3) |
| ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
• Block2:StylusAnalysis(Tests5to6)
whereRxisrelatedtotheareapaintedinthatpar-
| In the | following, | we  | describe | how | to calculate | the |                |     |              |     |            |            |     |
| ------ | ---------- | --- | -------- | --- | ------------ | --- | -------------- | --- | ------------ | --- | ---------- | ---------- | --- |
|        |            |     |          |     |              |     | ticular region | of  | the picture. |     | R0 (black) | represents |     |
Qvalueforeachofthetestsperformedusingthestylus:
|     |     |     |     |     |     |     | the inner | region | of the | tree, | i.e., all | pixels | within |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------ | ------ | ----- | --------- | ------ | ------ |
– Test5:SpiralTest
According to the definition of the test, children the tree outline. It is a percentage value between
|     |        |         |           |      |             |        | 0-100%, | where | 100% | means | all pixels | of  | R0 are |
| --- | ------ | ------- | --------- | ---- | ----------- | ------ | ------- | ----- | ---- | ----- | ---------- | --- | ------ |
|     | should | go from | the inner | part | of a spiral | to the |         |       |      |       |            |     |        |
coloured(fullycolouredtree)and0%meansnone
outerpartusingapenstylus,alwaystryingtokeep
(uncolouredtree).R1(red),R2(green),R3(blue),
3https://github.com/BiDAlab/ChildCIdbLong and R4 (orange) represent the outer regions of the
| VOLUME12,2024 |     |     |     |     |     |     |     |     |     |     |     |     | 117443 |
| ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------ |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
TABLE7. AverageQvalueachievedineachtestandagegroupoftheChildCidbLongdatabase,includingthecontrolgroup(Adults).Forcompleteness,
wealsospecifythehandorstylusgesturerequiredtocompleteeachtest,asdescribedinSec.III-A.TheQvaluesofGroups6to8areshowntogetheras
similaraverageresultsareachievedbetweenthem.
quantitativelymeasurethemotorandcognitivedevelopment
|     |     |     |     | of children  | through             | the        | use of  | mobile               | devices. | An example |        |
| --- | --- | --- | --- | ------------ | ------------------- | ---------- | ------- | -------------------- | -------- | ---------- | ------ |
|     |     |     |     | of this can  | be observed         |            | in Fig. | 3, where             | we       | represent  | the    |
|     |     |     |     | proposed     | Q value             | in terms   | of      | the percentile-based |          |            | growth |
|     |     |     |     | for Test     | 6 of ChildCIdbLong. |            | For     | example,             | for      | the Group  | 3      |
|     |     |     |     | (2Y-3Y),     | the 10th            | Percentile |         | curve                | means    | that the   | 10%    |
|     |     |     |     | of the child | population          |            | at that | age (2-3             | years)   | achieve    | a      |
Qvaluebelow17%whereastheremainder90%ofthechild
populationobtainsahigherQvalue.
|     |     |     |     | V. EXPERIMENTALFRAMEWORK |     |     |     |     |     |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- | --- | --- | --- | --- | --- |
ThissectionanalysesthepotentialoftheproposedQmetric
|     |     |     |     | using the | novel | ChildCIdbLong |     | database. |     | In particular, |     |
| --- | --- | --- | --- | --------- | ----- | ------------- | --- | --------- | --- | -------------- | --- |
FIGURE3. Percentile-basedgrowthrepresentationintermsofthe
wefocusontwodifferentanalyses:i)ageneralanalysisofthe
proposedQmetricfor‘‘Test6:DrawingTest’’oftheChildCIdbLong.
Q-valuesdistributionsforeachofthe6testsandeducational
levels(Group2to8)consideredinChildCIdbLong,andii)a
tree. If children colour in any of these regions, longitudinalanalysisoftheQvalueswhilethechildrengrow
apenaltyisapplied.Inparticular,thepenaltyvalue
|     |     |     |     | up, analysing | their | motor | and | cognitive | development |     | over |
| --- | --- | --- | --- | ------------- | ----- | ----- | --- | --------- | ----------- | --- | ---- |
is higher according to the distance with respect to timeusingthesamplescollectedateachdataacquisitionfor
| theR0region:R4upto40%,R3upto30%,R2up |     |     |     | thelast4academicyears. |     |     |     |     |     |     |     |
| ------------------------------------ | --- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- | --- |
to20%,andR1upto10%.IftheQvalueobtained
| is negative (i.e., | more area | is coloured outside | the |                    |     |     |     |     |     |     |     |
| ------------------ | --------- | ------------------- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- |
|                    |           |                     |     | A. GENERALANALYSIS |     |     |     |     |     |     |     |
treethaninside),thevalueissetto0%.
|     |     |     |     | Fig. 4 provides |     | a graphical | representation |     | of  | the Q | values |
| --- | --- | --- | --- | --------------- | --- | ----------- | -------------- | --- | --- | ----- | ------ |
In addition to the proposed Q metric designed for each achieved in each of the tests and age groups considered in
test of ChildCIdbLong, we also consider percentile-based ChildCIdbLong. Each box plot contains boxes, whiskers,
growthrepresentationsthatcanhelptherapistsandspecialists and points. The inner horizontal line of the box repre-
in the field to assess whether a child’s motor and cognitive sents the median value, and the lower and upper ends
development is correct or not along time. According to the representtheQ1andQ3quartiles,respectively.Thewhiskers
World Health Organization (WHO), it’s critical the use of refer to the outliers (i.e., values over the Q3 quartile and
3rd,10th,50th,90th,and97thpercentilestodefineoptimal undertheQ1quartile).Eachpointreferstoonesample(i.e.,
growth values (e.g., height-, length-, weight-, and body atestperformedbyachild).Blackpointsrepresentchildren
mass index-for-age) as standards based on worldwide data withTypicalDevelopment(TD)whereasredpointsrepresent
of healthy children [45]. For this reason, in the proposed childrenwithNon-TypicalDevelopment(NTD),i.e.,children
study we calculate the 15th, 50th, and 90th percentiles of without/withdevelopmentaldisorderssuchasdevelopmental
the proposed Q metric to generate a growth representation delay,ADHD,languagedisorder,etc.
for each ChildCIdbLong test. The 3rd and 97th percentiles As we mentioned in Sec. III-A, each test proposed in
are not considered so far as we do not have enough data to ChildCIdbLong requires different gestures (tap, drag-and-
givearobustgrowthchartattheselimits.Theproposalofthe drop,pinch,line-following,anddrawing)anddifferentmotor
Q value for each test, together with the proposed graphical and cognitive skills to be completed correctly. This aspect
representationintermsofpercentile,canbeverybeneficialto canbeobservedinFig.4,astheproposedQvalueincreases
| 117444 |     |     |     |     |     |     |     |     |     | VOLUME12,2024 |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
FIGURE4. GraphicalrepresentationoftheQvaluesachievedineachofthetestsandagegroupsconsideredinChildCIdbLong.Redpointsreferto
childrenwithNon-TypicalDevelopment(NTD).Theinnerhorizontallineoftheboxrepresentsthemedianvalue.Thelowerandupperendsofthebox
representtheQ1andQ3quartiles,respectively.Whiskersrepresenttheoutliers.
inalltestsaschildrengetolderanddeveloptheirmotorand gesture(Test1)ordrawingwiththestylus(Test6).However,
cognitiveskills.Inaddition,forcompleteness,weincludein they are not able to perform correctly more complex fine
Table7theaverageresultsoftheproposedQmetricforeach motor gestures yet, such as the pinch with two fingers
testandagegroupofChildCIdbLong,includingthecontrol (Tests 3 and 4) or following a line with the stylus without
group (Adults). In general, these results prove the correct getting off the path (Test 5), achieving Q values lower than
definition of the tests considered in ChildCIdbLong as well 30%onaverage.
astheproposedQmetrictoevaluatethemotorandcognitive Analysingchildrenaged3to5yearsold(Groups4and5),
skillsofthechildrenastheygrowup. there is a considerable improvement in both touch and
Before analysing the results obtained by the different stylus gestures. Focusing on stylus gestures, children begin
groupsofchildren,itisimportanttonotethattheQmetric, to develop more precise fine motor skills around this age,
as described in Sec. IV, takes into account 2 factors: i) the whichallowthemtoperformmoreaccuratestrokesandeven
amount of time taken to complete the test, and ii) the way begin to write [46]. This fact is demonstrated in Fig. 4 and
children interact with the test (number of taps/strokes, the Table7,astheQvaluesforTest5(line-followinggesture)and
child colours inside the spiral/tree or not, etc.). This means Test 6 (drawing gesture) improve significantly with respect
that children may not be able to complete the test in the topreviousagegroups,reachingaverageQvaluesof73.9%
required time due to the lack of comprehension to do it and 87.63%, respectively. These results indicate that at this
properlyorjustbecausetheircognitiveandmotorskillsare age the motor and cognitive skills of the children are more
not developed yet. From the results observed in Fig. 4 and developed, being able to follow the spiral line and colour
Table 7, it is evident that most children between 18 months the tree in less time and without going out of outline as
and 2 years old (Group 2) are not able to complete any often.Focusingontouchgestures,ontheonehand,children
tests correctly (i.e., average Q values below 20% and 30% obtain average Q values over 65% in gestures such as tap
forthetouchandstylustests,respectively).Wehypothesise (Test 1) or drag-and-drop (Test 2), which also means a
that children at this age are still in the early stages of both higher motor and cognitive capacity to perform the tests
cognitiveandmotordevelopment.Nevertheless,theyseemto relatedtotouchgestures.Ontheotherhand,gesturessuchas
beabletoperformsomehowthetapgestureusingthefinger pinch(Test3and4)stillremainachallengeatthisage,with
(Test 1) and drawing (or at least scrawling) with the stylus averageQvaluesbelow38%.
(Test6),beingtheteststhatobtainthebestQvalues,although Finally, focusing on children aged 5 to 8 years old
farfromthecontrolgroup(i.e.,20-30%vs.90-95%Qvalues). (Groups6to8), we can observe similar trends in most tests
Regardingchildrenaged2to3yearsold(Group3),wecan ofChildCIdbLong.TheaverageQvaluesforthetestswhere
observesomeimprovementscomparedtochildreninGroup2 thepenstylusisused(Tests5and6)areclosertotheonesof
whenperformingthedrag-and-dropgesture(Test2)withthe adults(80.6%vs.94.7%and91.2%vs.95.6%,respectively).
finger, as well as improving their performance in the tap Thisindicatesthatatthisagechildrenhavesimilarmotorand
VOLUME12,2024 117445

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
FIGURE5. ExamplesoftheevolutionoftheproposedQvaluesachievedinTest6fortwodifferentchildren:i)aTDchildwithoutapparent
physical/cognitiveimpairment,andii)aNTDchildwithspecialeducationalneedsandanexpressivelanguagedisorder.Wealsoincludeontop/bottom
ofthefigurethe6graphicaltree’sexecutions,eachcorrespondingwithoneacquisitionintime.
cognitive skills as adults to perform stylus gestures such as is difficult to fit the rabbit between the red circles using a
following a line and drawing the tree without going out of singletapandinashortperiodoftime,evenforadultswith
theoutline.However,thistrendisnotobservedforthecase fullymotorandcognitivedevelopedskills.
of tests involving touch gestures (Tests 1 to 4). In Tests 1
and 2, children achieve an average Q value of around 70%,
compared to almost 90% for adults. We hypothesise this B. LONGITUDINALANALYSIS
mightbeproducednotbythemotorfactor,aschildrenhave As we commented in Sec. II-B, nowadays there is a lack
thenecessarymotorskillstoperformtapanddrag-and-drop oflongitudinalstudiesthatautomaticallyanalysethecorrect
gestures at this age, but by the cognitive factor involving children’s development as they grow up, using quantitative
aspects such as reasoning and reaction time. Regarding information captured through the interaction with mobile
Tests3and4,wecanseethattheaverageQvalueforchildren devices. In order to shed some light on this aspect, in this
is around 45%, much better than previous age groups (i.e., sectionweanalysehowtheproposedQmetricandthetests
around30%).However,adultsstillobtainanaverageQvalue includedinChildCIdbLongcanbeusedtomeasurethemotor
ofaround70%.Theseresultsindicatethatevenforthecontrol andcognitiveskillsofthechildren.Forabetterunderstanding
groupitisdifficulttoachievearesultcloseto100%(i.e.,ideal of the results, we propose to use percentile-based growth
case).Thismaybeproducedduetothedesignofthetestsas: representations, as indicated in Sec. IV. This will allow an
i) the pinch gesture requires greater fine motor skills, high interestingcomparisonoftheQvalueforaspecificchildwith
fingercoordination,andpreciseperceptionofforce,andii)it thegeneralpopulationattheirage.
117446 VOLUME12,2024

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
Fig.5showsanexampleoftheevolutionoftheQvalues in the Children-Computer Interaction (CCI) area. Each test
achieved in Test 6 for two different children: i) a TD requires different touch/stylus gestures and different motor
childwithoutapparentphysical/cognitiveimpairments(blue andcognitiveskillstobecompletedcorrectly.Thereforethe
diamonds), and ii) a NTD child with special educational Q metric quantitatively measures different abilities such as
needsandanexpressivelanguagedisorder(redcircles).Inthe praxicalskillsrelatedtovisualrecognitionaspectsandfrontal
middleofthefigure,wecanseethepercentile-basedgrowth executivepatterns,amongothers.
representationassociatedwithTest6withitscorresponding Along with the Q metric, percentile-based growth repre-
10th, 50th, and 90th percentile limits. The analysis of both sentations are defined for each test, allowing to compare
children is carried out for the 6 longitudinal acquisitions children in a two-dimensional space according to their
includedinChildCIdbLong.Inparticular,bothchildrenhad development with respect to the typical age skills of the
theirfirstinteractionwiththetestsat2-3yearsold(Group3) population(similartothestandardsgrowthvaluesforheight,
in the academic year 2019/20 and their last interaction at length,weight,andbodymassindex-for-agebasedonworld-
5-6yearsold(Group6)intheacademicyear2022/23,3years wide data of healthy children). The results obtained show
later.Intheproposedrepresentationwecanobservehowthe the potential of the longitudinal database ChildCIdbLong
Q value of the children evolves over time, extracting very in conjunction with the Q metric to measure whether the
interesting conclusions related to the motor and cognitive motor and cognitive development of children is correct or
skills of the children. For completeness, at the top and not over time. In addition, this metric could be useful for
bottom of Fig. 5 we can also see from left to right the child experts (e.g., paediatricians, educators, psychologists,
6 graphical executions of the tree, each corresponding with or neurologists) as a support tool to detect quickly and
oneacquisitionintime.Eachrepresentationhasitsassociated easily possible physical/cognitive impairments in children’s
| Q value | (% visible | in the | lower | right | corner) | along with | an  | development. |     |     |     |
| ------- | ---------- | ------ | ----- | ----- | ------- | ---------- | --- | ------------ | --- | --- | --- |
identifier number to position it on the growth chart. Due to Future work will be oriented to: i) identify whether there
thelackofspace,similarrepresentationswillbeincludedin is any relationship between children’s motor and cognitive
thecorrespondingGitHubrepository4. development, their interaction with mobile devices and
On the one hand, focusing on the evolution of the TD children’s metadata (grades, prematurity, etc.), ii) consider
child (blue diamonds) we can observe that the Q value theChildCIdbLonginotherresearchareasrelatedtoe-Health
has an increasing trend, being at all times above the 50th and e-Learning, iii) expand ChildCIdbLong with more
percentile and even above the 90th percentile when he was participantsandacquisitiondata,andiv)definenewvariables
3-5yearsold(Group4).Thisindicates,asconfirmedbythe associatedwithclassicalcognitivedomainsinordertoassess
specialists at the school, that their hand-eye coordination, children’sattentional,visuo-spatial,andexecutiveskills.
| fine motor | skills, | planning | and | organisation |     | for colouring |     |     |     |     |     |
| ---------- | ------- | -------- | --- | ------------ | --- | ------------- | --- | --- | --- | --- | --- |
seemtobedevelopingwell.Ontheotherhand,regardingthe
REFERENCES
evolutionoftheNTDchild(redcircles),wecanobservethat [1] H. K. Kabali, M. M. Irigoyen, R. Nunez-Davis, J. G. Budacki,
most of the time the Q value is below the 50th percentile. S.H.Mohanty,K.P.Leister,andR.L.Bonner,‘‘Exposureanduseof
This may be normal, as each child develops faster in some mobile media devices by young children,’’ Pediatrics, vol. 136, no. 6,
pp.1044–1050,Dec.2015.
areas than in others. However, in the 5th data acquisition [2] W. Chen and J. L. Adler, ‘‘Assessment of screen exposure in young
(Group 5), the Q value is below the 10th percentile, which children,1997to2014,’’J.Amer.Med.Assoc.Pediatrics,vol.173,no.4,
pp.391–393,Apr.2019.
couldindicatethatsomeaspectsoftheirmotorandcognitive
|            |     |           |            |     |              |     |     | [3] V.RideoutandM.B.Robb,TheCommonSenseCensus:MediaUseby |     |     |     |
| ---------- | --- | --------- | ---------- | --- | ------------ | --- | --- | -------------------------------------------------------- | --- | --- | --- |
| skills are | not | developed | correctly, |     | as confirmed | by  | the |                                                          |     |     |     |
KidsAgeZerotoEight.SanFrancisco,CA,USA:CommonSenseMedia,
| specialist | of the | school. | In our | opinion, | the | proposed | tests |     |     |     |     |
| ---------- | ------ | ------- | ------ | -------- | --- | -------- | ----- | --- | --- | --- | --- |
2020.
|          |                   |     |          |     |          |          |     | [4] A.S.M.Venigalla,D.Vagavolu,andS.Chimalakonda,‘‘SurviveCOVID- |     |     |     |
| -------- | ----------------- | --- | -------- | --- | -------- | -------- | --- | ---------------------------------------------------------------- | --- | --- | --- |
| included | in ChildCIdbLong, |     | together |     | with the | proposed | Q   |                                                                  |     |     |     |
19—Aneducationalgametofacilitatehabituationofsocialdistancingand
| metric, could | be  | used as | an automatic |     | and quantitative |     | tool |     |     |     |     |
| ------------- | --- | ------- | ------------ | --- | ---------------- | --- | ---- | --- | --- | --- | --- |
otherhealthmeasuresforCOVID-19pandemic,’’Int.J.Hum.-Comput.
| for paediatricians, |     | therapists, |     | and specialists |     | in schools | to  |     |     |     |     |
| ------------------- | --- | ----------- | --- | --------------- | --- | ---------- | --- | --- | --- | --- | --- |
Interact.,vol.38,no.16,pp.1563–1575,Oct.2022.
allowearlydetectionofpotentialimpairments,enablingearly [5] D.Floegel,N.Elias,andD.Lemish,‘‘Youngchildren’smobiledevice
actionandimprovingthequalityoftherestofthechild’slife. use in public places: Immersion, distraction, and co-use,’’ Stud. Media
Commun.,vol.9,no.1,p.30,May2021.
|     |     |     |     |     |     |     |     | [6] J. S. Radesky, | H. M. Weeks, | R. Ball, A. Schaller, | S. Yeo, J. Durnez, |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------ | ------------ | --------------------- | ------------------ |
VI. CONCLUSIONANDFUTUREWORK M.Tamayo-Rios,M.Epstein,H.Kirkorian,S.Coyne,andR.Barr,‘‘Young
|            |          |     |       |           |              |     |        | children’s | use of smartphones | and tablets,’’Pediatrics, | vol. 146, no. 1, |
| ---------- | -------- | --- | ----- | --------- | ------------ | --- | ------ | ---------- | ------------------ | ------------------------- | ---------------- |
| This study | proposed | a   | novel | automatic | quantitative |     | metric |            |                    |                           |                  |
Jul.2020,Art.no.e20193518.
| called Test | Quality | (Q) | designed | to  | measure | the motor | and |                                                                      |     |     |     |
| ----------- | ------- | --- | -------- | --- | ------- | --------- | --- | -------------------------------------------------------------------- | --- | --- | --- |
|             |         |     |          |     |         |           |     | [7] C.Herodotou,‘‘Youngchildrenandtablets:Asystematicreviewofeffects |     |     |     |
cognitive development of children through their interaction onlearninganddevelopment,’’J.Comput.Assist.Learn.,vol.34,no.1,
pp.1–9,Feb.2018.
| with a tablet | device. | In      | particular, |          | children | aged between    |     |                  |                |           |                       |
| ------------- | ------- | ------- | ----------- | -------- | -------- | --------------- | --- | ---------------- | -------------- | --------- | --------------------- |
|               |         |         |             |          |          |                 |     | [8] A. M. Moosa, | N. Al-Maadeed, | M. Saleh, | S. A. Al-Maadeed, and |
| 18 months     | and     | 8 years | old         | interact | with     | the 6 different |     |                  |                |           |                       |
J.M.Aljaam,‘‘Designingamobileseriousgameforraisingawarenessof
tests presented in our ChildCIdbLong database, the largest diabeticchildren,’’IEEEAccess,vol.8,pp.222876–222889,2020.
publicly available longitudinal database to date for research [9] M. Danet, A. L. Miller, H. M. Weeks, N. Kaciroti, and J. S. Radesky,
‘‘Childrenaged3–4yearsweremorelikelytobegivenmobiledevices
forcalmingpurposesiftheyhadweakeroverallexecutivefunctioning,’’
4https://github.com/BiDAlab/ChildCIdbLong
ActaPaediatrica,vol.111,no.7,pp.1383–1389,Mar.2022.
| VOLUME12,2024 |     |     |     |     |     |     |     |     |     |     | 117447 |
| ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------ |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
[10] V.Brauchli,P.Edelsbrunner,R.PazCastro,R.Barr,A.vonWyl,P.Lannen, [29] U.Samarakoon,H.Usoof,andT.Halloluwa,‘‘Whattheycanandcannot:
andF.Sticca,‘‘Screentimevs.Screamtime:Developmentalinterrelations A meta-analysis of research on touch and multi-touch gestures by two
between young children’s screen time, negative affect, and effortful toseven-year-olds,’’Int.J.Child-Comput.Interact.,vol.22,Dec.2019,
| control,’’Comput.Hum.Behav.,vol.154,May2024,Art.no.108138. |     |     |     |     |     |     |     | Art.no.100151. |     |     |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | --- | --- | --- | --- | --- |
[11] G.McHarg,A.D.Ribner,R.T.Devine,andC.Hughes,‘‘Screentime [30] J. Piaget, The Child and Reality: Problems of Genetic Psychology.
NewYork,NY,USA:Grossman,1973.
andexecutivefunctionintoddlerhood:Alongitudinalstudy,’’Frontiers
Psychol.,vol.11,Oct.2020,Art.no.570392. [31] B.CassidyandL.McKnight,‘‘Children’sinteractionwithmobiletouch-
[12] T. Poulain, M. Vogel, M. Neef, F. Abicht, A. Hilbert, J. Genuneit, screen devices: Experiences and guidelines for design,’’ Int. J. Mobile
A. Körner, and W. Kiess, ‘‘Reciprocal associations between electronic Hum.Comput.Interact.,vol.2,no.2,pp.1–18,Apr.2010.
mediauseandbehavioraldifficultiesinpreschoolers,’’Int.J.Environ.Res. [32] A. S. Arif and C. Sylla, ‘‘A comparative evaluation of touch and pen
gesturesforadultandchildusers,’’inProc.12thInt.Conf.Interact.Design
PublicHealth,vol.15,no.4,p.814,Apr.2018.
Children.NewYork,NY,USA:AssociationforComputingMachinery,
| [13] T. Poulain, | R.  | Baber, | M. Vogel, | D. Pietzner, | T. Kirsten, |     | A. Jurkutat, |     |     |     |     |     |     |     |
| ---------------- | --- | ------ | --------- | ------------ | ----------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
Jun.2013,pp.392–395.
| A.Hiemisch, |     | A. Hilbert, | J. Kratzsch, | J. Thiery, | M.  | Fuchs, | C. Hirsch, |     |     |     |     |     |     |     |
| ----------- | --- | ----------- | ------------ | ---------- | --- | ------ | ---------- | --- | --- | --- | --- | --- | --- | --- |
F.G.Rauscher, M. Loeffler, A. Körner, M. Nüchter, and W. Kiess, [33] L.G.Weiss,T.Oakland,andG.P.Aylward,Bayley-IIIClinicalUseand
‘‘The LIFE child study: A population-based perinatal and pediatric Interpretation.SanDiego,CA,USA:Academic,2010.
|     |     |     |     |     |     |     |     | [34] T.BrownandA.Lalor,‘‘Themovementassessmentbatteryforchildren- |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
cohortinGermany,’’Eur.J.Epidemiology,vol.32,no.2,pp.145–158,
|     |     |     |     |     |     |     |     | second | edition | (MABC-2): | A review | and critique,’’ | Phys. | Occupat. |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------- | --------- | -------- | --------------- | ----- | -------- |
Feb.2017.
TherapyPediatrics,vol.29,no.1,pp.86–103,2009.
[14] J.S.Radesky,N.Kaciroti,H.M.Weeks,A.Schaller,andA.L.Miller,
|                |     |              |         |        |        |         |             | [35] M.R.FolioandR.R.Fewell.(May2023).PeabodyDevelopmentalMotor |     |     |     |     |     |     |
| -------------- | --- | ------------ | ------- | ------ | ------ | ------- | ----------- | --------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| ‘‘Longitudinal |     | associations | between | use of | mobile | devices | for calming |                                                                 |     |     |     |     |     |     |
andemotionalreactivityandexecutivefunctioninginchildrenaged3to Scales(PDMS-3).[Online].Available:https://www.pearsonassessments.
com/store/usassessments/en/Store/Professional-Assessments/Motor-
5years,’’J.Amer.Med.Assoc.Pediatrics,vol.177,no.1,p.62,Jan.2023.
Sensory/Peabody-Developmental-Motor-Scales
| [15] J. McNeill, | S.  | J. Howard, | S. A.       | Vella, and | D. P.     | Cliff, ‘‘Longitudinal |         |                                                                        |     |     |     |     |     |     |
| ---------------- | --- | ---------- | ----------- | ---------- | --------- | --------------------- | ------- | ---------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
|                  |     |            |             |            |           |                       |         | [36] R.Tolosana,J.C.Ruiz-Garcia,R.Vera-Rodriguez,J.Herreros-Rodriguez, |     |     |     |     |     |     |
| associations     | of  | electronic | application | use        | and media | program               | viewing |                                                                        |     |     |     |     |     |     |
S.Romero-Tapiador,A.Morales,andJ.Fierrez,‘‘Child-computerinterac-
withcognitiveandpsychosocialdevelopmentinpreschoolers,’’Academic
tionwithmobiledevices:Recentworks,newdataset,andagedetection,’’
Pediatrics,vol.19,no.5,pp.520–528,Jul.2019. IEEE Trans. Emerg. Topics Comput.,
|                            |     |           |                   |     |              |            |            |            |              |              |     | vol. 10,        | no. 4, pp.2042–2054, |     |
| -------------------------- | --- | --------- | ----------------- | --- | ------------ | ---------- | ---------- | ---------- | ------------ | ------------ | --- | --------------- | -------------------- | --- |
| [16] V. Konok              | and | R. Szőke, | ‘‘Longitudinal    |     | associations | of         | children’s | Oct.2022.  |              |              |     |                 |                      |     |
| hyperactivity/inattention, |     |           | peer relationship |     | problems     | and mobile | device     |            |              |              |     |                 |                      |     |
|                            |     |           |                   |     |              |            |            | [37] J. C. | Ruiz-Garcia, | R. Tolosana, | R.  | Vera-Rodriguez, | J. Fierrez,          | and |
use,’’Sustainability,vol.14,no.14,p.8845,Jul.2022.
|            |          |           |       |             |       |       |            | J.Herreros-Rodriguez, |     | ‘‘ChildCI | framework: | Analysis | of  | motor and |
| ---------- | -------- | --------- | ----- | ----------- | ----- | ----- | ---------- | --------------------- | --- | --------- | ---------- | -------- | --- | --------- |
| [17] Y.-H. | Byun, M. | Ha, H.-J. | Kwon, | Y.-C. Hong, | J.-H. | Leem, | J. Sakong, |                       |     |           |            |          |     |           |
cognitivedevelopmentinchildren-computerinteractionforagedetection,’’
S.Y.Kim,C.G.Lee,D.Kang,H.-D.Choi,andN.Kim,‘‘Mobilephone Cognit.Syst.Res.,vol.86,Aug.2024,Art.no.101230.
use, blood lead levels, and attention deficit hyperactivity symptoms in [38] J.C.Ruiz-Garcia,C.Hojas,R.Tolosana,R.Vera-Rodriguez,A.Morales,
children: A longitudinal study,’’ PLoS ONE, vol. 8, no. 3, Mar. 2013, J. Fierrez, J. Ortega-Garcia, and J. Herreros-Rodriguez, ‘‘Children age
Art.no.e59742.
|     |     |     |     |     |     |     |     | group | detection | based on | human–computer | interaction | and | time series |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --------- | -------- | -------------- | ----------- | --- | ----------- |
[18] L.C.LannaandM.GranéOro,‘‘Touchgestureperformedbychildren
analysis,’’Int.J.DocumentAnal.Recognit.,pp.1–11,Mar.2024.
under3yearsoldwhendrawingandcoloringonatablet,’’Int.J.Hum.-
|     |     |     |     |     |     |     |     | [39] M.Papadatou-Pastou,E.Ntolka,J.Schmitz,M.Martin,M.R.Munafò, |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
Comput.Stud.,vol.124,pp.1–12,Apr.2019. S.Ocklenburg,andS.Paracchini,‘‘Humanhandedness:Ameta-analysis,’’
[19] R.-D.Vatavu,G.Cramariuc,andD.M.Schipor,‘‘Touchinteractionfor Psychol.Bull.,vol.146,no.6,pp.481–524,Apr.2020.
childrenaged3to6years:Experimentalfindingsandrelationshiptomotor [40] K.DennyandV.O.Sullivan,‘‘Theeconomicconsequencesofbeingleft-
skills,’’Int.J.Hum.-Comput.Stud.,vol.74,pp.54–76,Feb.2015. handed,’’J.Hum.Resour.,vol.42,no.2,pp.353–374,Mar.2007.
[20] R. Vera-Rodriguez, R. Tolosana, J. Hernandez-Ortega, A. Acien, [41] M.C.Corballis,J.Hattie,andR.Fletcher,‘‘Handednessandintellectual
A.Morales,J.Fierrez,andJ.Ortega-Garcia,‘‘Modelingthecomplexityof achievement:Aneven-handedlook,’’Neuropsychologia,vol.46,no.1,
signatureandtouch-screenbiometricsusingthelognormalityprinciple,’’in pp.374–378,Jan.2008.
TheLognormalityPrincipleandItsApplicationsinE-Security,E-Learning [42] D. W. Johnston, M. E. R. Nicholls, M. Shah, and M. A. Shields,
andE-Health.Singapore:WorldScientific,2020,ch.3,pp.65–86. ‘‘Nature’s experiment? Handedness and early childhood development,’’
[21] A.Acien,A.Morales,J.Fierrez,R.Vera-Rodriguez,andJ.Hernandez- Demography,vol.46,no.2,pp.281–301,May2009.
|     |     |     |     |     |     |     |     | [43] J. Fierrez | and | J. Ortega-Garcia, | ‘‘On-line | signature | verification,’’ | in  |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ----------------- | --------- | --------- | --------------- | --- |
Ortega,‘‘Activedetectionofagegroupsbasedontouchinteraction,’’IET
Biometrics,vol.8,no.1,pp.101–108,Jan.2019. HandbookofBiometrics.Boston,MA,USA:Springer,2008,pp.189–209.
[22] V.Nacher,D.Cáliz,J.Jaen,andL.Martínez,‘‘Examiningtheusability [44] R. Tolosana, R. Vera-Rodriguez, J. Fierrez, and J. Ortega-Garcia,
oftouchscreengesturesforchildrenwithdownsyndrome,’’Interacting ‘‘Reducingthetemplateageingeffectinon-linesignaturebiometrics,’’IET
Comput.,vol.30,no.3,pp.258–272,May2018. Biometrics,vol.8,no.6,pp.422–430,Nov.2019.
[23] S. Yadav, P. Chakraborty, and P. Mittal, ‘‘Designing drawing apps [45] M.deOnis,‘‘WHOchildgrowthstandardsbasedonlength/height,weight
andage,’’ActaPaediatrica,vol.95,no.S450,pp.76–85,Apr.2006.
| for children: | Artistic | and | technological | factors,’’ | Int. | J. Hum.-Comput. |     |                                                                    |     |     |     |     |     |     |
| ------------- | -------- | --- | ------------- | ---------- | ---- | --------------- | --- | ------------------------------------------------------------------ | --- | --- | --- | --- | --- | --- |
|               |          |     |               |            |      |                 |     | [46] C.S.PuranikandC.J.Lonigan,‘‘Fromscribblestoscrabble:Preschool |     |     |     |     |     |     |
Interact.,vol.38,no.2,pp.103–117,Jan.2022.
children’sdevelopingknowledgeofwrittenlanguage,’’ReadingWriting,
| [24] C. Mayer, | S.  | Wallner, | N. Budde-Spengler, |     | S. Braunert, | P.  | A. Arndt, |     |     |     |     |     |     |     |
| -------------- | --- | -------- | ------------------ | --- | ------------ | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
vol.24,no.5,pp.567–589,May2011.
andM.Kiefer,‘‘Literacytrainingofkindergartenchildrenwithpencil,
| keyboard | or tabletstylus: |     | The influence | of  | the writingtool |     | on reading |     |     |     |     |     |     |     |
| -------- | ---------------- | --- | ------------- | --- | --------------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
andwritingperformanceattheletterandwordlevel,’’FrontiersPsychol.,
vol.10,p.3054,Jan.2020.
|            |           |             |                |           |        |                  |            |     |     | JUAN                                      | CARLOS          | RUIZ-GARCIA | received            | the       |
| ---------- | --------- | ----------- | -------------- | --------- | ------ | ---------------- | ---------- | --- | --- | ----------------------------------------- | --------------- | ----------- | ------------------- | --------- |
| [25] M. M. | Patchan   | and C.      | S. Puranik,    | ‘‘Using   | tablet | computers        | to teach   |     |     |                                           |                 |             |                     |           |
|            |           |             |                |           |        |                  |            |     |     | B.Sc.                                     | degree in       | computer    | science engineering |           |
| preschool  | children  | to          | write letters: | Exploring | the    | impact           | of extrin- |     |     |                                           |                 |             |                     |           |
|            |           |             |                |           |        |                  |            |     |     | from                                      | the Universidad | de Granada, | in                  | 2019, and |
| sic and    | intrinsic | feedback,’’ | Comput.        | Educ.,    | vol.   | 102, pp.128–137, |            |     |     |                                           |                 |             |                     |           |
| Nov.2016.  |           |             |                |           |        |                  |            |     |     | theM.Sc.degreeinresearchandinnovationfrom |                 |             |                     |           |
[26] C.Rémi,J.Vaillant,R.Plamondon,L.Prevost,andT.Duval,‘‘Exploring the Universidad Autonoma de Madrid, in 2021,
thekinematicdimensionsofkindergartenchildren’sscribbles,’’inProc. where he is currently pursuing the Ph.D. degree
incomputerandtelecommunicationengineering.
Conf.Int.GraphonomicsSoc.,2015,pp.79–82.
Inaddition,inApril2020,hejoinedtheBiometrics
| [27] N. Tabatabaey-Mashadi, |     |     | R. Sudirman, | R.  | M. Guest, | and | P. I. Khalid, |     |     |     |     |     |     |     |
| --------------------------- | --- | --- | ------------ | --- | --------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- |
andDataPatternAnalytics—BiDALaboratoryas
| ‘‘Analyses | of  | pupils’ | polygonal | shape drawing | strategy |     | with respect |     |     |     |     |     |     |     |
| ---------- | --- | ------- | --------- | ------------- | -------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
Pattern Anal. Appl., a Pre-Doctoral Researcher with the Universidad
| to handwriting |     | performance,’’ |     |     |     | vol. | 18, no. 3, |     |     |     |     |     |     |     |
| -------------- | --- | -------------- | --- | --- | --- | ---- | ---------- | --- | --- | --- | --- | --- | --- | --- |
pp.571–586,Aug.2015. Autonoma de Madrid. His research interests include the use of machine
[28] P.Laniel,N.Faci,R.Plamondon,M.H.Beauchamp,andB.Gauthier, learningfore-Learning,e-Health,human–computerinteraction(HCI),and
‘‘KinematicanalysisoffastpenstrokesinchildrenwithADHD,’’Appl. automatic fall detection systems (FDS). He also received the award of
Neuropsychol.,Child,vol.9,no.2,pp.125–140,Apr.2020. excellencefortheM.Sc.degree.
| 117448 |     |     |     |     |     |     |     |     |     |     |     |     | VOLUME12,2024 |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- |

J.C.Ruiz-Garciaetal.:LongitudinalAnalysisandQuantitativeAssessmentofChildDevelopment
RUBEN TOLOSANA receivedtheM.Sc.degree JULIAN FIERREZ (Member,IEEE)receivedthe
intelecommunicationengineeringandthePh.D. M.Sc. and Ph.D. degrees from the Universidad
degree in computer and telecommunication PolitecnicadeMadrid,Spain,in2001and2006,
engineering from the Universidad Autonoma respectively. Since 2004, he has been with the
de Madrid, in 2014 and 2019, respectively. Universidad Autonoma de Madrid, where he
In 2014, he joined the Biometrics and Data has been an Associate Professor, since 2010.
Pattern Analytics—BiDA Laboratory, Universi- His research interests include signal and image
dadAutonomadeMadrid,whereheiscurrently processing, AI fundamentals and applications,
collaboratingasaPostdoctoralResearcher.Since HCI, forensics, and biometrics for security and
then, he has been granted with several awards, humanbehavioranalysis.Since2020,hehasbeen
suchastheFPUResearchFellowshipfromSpanishMECD,in2015,and a member of the ELLIS Society. He has received best papers awards at
EuropeanBiometricsIndustryAward,in2018.Heistheauthorofseveral AVBPA, ICB, IJCB, ICPR, ICPRS, and Pattern Recognition Letters; and
publicationsandalsocollaboratesasaReviewerinhigh-impactconferences severalresearchdistinctions,includingEBFEuropeanBiometricIndustry
(WACV, ICPR, ICDAR, and IJCB) and journals [IEEE TRANSACTIONSON Award, in 2006, EURASIP Best Ph.D. Award, in 2012, Miguel Catalan
PATTERN ANALYSIS AND MACHINE INTELLIGENCE (IEEE TPAMI), IEEE AwardtotheBestResearcherunder40intheCommunityofMadridinthe
TRANSACTIONSONCYBERNETICS(TCYB),IEEETRANSACTIONSONINFORMATION GeneralAreaofScienceandTechnology,andtheIAPRYoungBiometrics
FORENSICS AND SECURITY (IEEE TIFS), IEEE TRANSACTIONS ON IMAGE InvestigatorAward,in2017.HeisalsoanAssociateEditorofInformation
PROCESSING (IEEE TIP), and ACM CSUR]. His research interests include Fusion, IEEE TRANSACTIONSON INFORMATION FORENSICSAND SECURITY, and
signal and image processing, pattern recognition, and machine learning, IEEETRANSACTIONSONIMAGEPROCESSING.
particularlyintheareasofDeepFakes,HCI,andbiometrics.Finally,heis
alsoactivelyinvolvedinseveralnationalandEuropeanprojects.
RUBENVERA-RODRIGUEZreceivedtheM.Sc.
degree in telecommunications engineering from JAVIER ORTEGA-GARCIA (Fellow, IEEE)
theUniversidaddeSevilla,Spain,in2006,andthe receivedtheM.Sc.degreeinelectricalengineering
Ph.D.degreeinelectricalandelectronicengineer- and the Ph.D. degree (cum laude) in electrical
ingfromSwanseaUniversity,U.K.,in2010.Since engineeringfromtheUniversidadPolitecnicade
2010, he has been affiliated with the Biometric Madrid, Spain, in 1989 and 1996, respectively.
Recognition Group, Universidad Autonoma de He is currently a Full Professor with the Signal
Madrid, Spain, where he has been an Associate Processing Chair, Universidad Autonoma de
Professor, since 2018. He has published over Madrid, Spain, where he holds courses on bio-
100 scientific articles published in international metric recognition and digital signal processing.
journals and conferences. He is actively involved in several national and He is also the Founder and the Director of
European projects focused on biometrics. His research interests include the BiDA-Laboratory, Biometrics and Data Pattern Analytics Group.
signalandimageprocessing,patternrecognition,HCI,andbiometrics,with He has authored over 300 international contributions, including book
anemphasisonsignature,face,gaitverification,andforensicapplications chapters, refereed journals, and conference papers. His research interests
ofbiometrics.HewastheProgramChairfortheIEEE51stInternational include biometric pattern recognition (on-line signature verification,
Carnahan Conference on Security and Technology (ICCST), in 2017; speakerrecognition,andhuman-deviceinteraction)forsecurity,e-Health,
the 23rd Iberoamerican Congress on Pattern Recognition (CIARP 2018), and user profiling applications. He chaired Odyssey-04, the Speaker
in 2018; and the International Conference on Biometric Engineering and RecognitionWorkshop,ICB-2013,theSixthIAPRInternationalConference
Applications(ICBEA2019),in2019. on Biometrics, and ICCST2017, the 51st IEEE International Carnahan
ConferenceonSecurityTechnology.
AYTHAMIMORALESreceivedtheM.Sc.degree
intelecommunicationengineeringandthePh.D.
degreefromULPGC,in2006and2011,respec-
tively.HeperformshisresearchworksintheBiDA
Laboratory, Universidad Autonoma de Madrid, JAIME HERREROS-RODRIGUEZ received
where he is currently an Associate Professor. the degree in medicine from the Universidad
HehasperformedresearchstayswiththeBiomet- Autonoma de Madrid, in 2006, and the Doctor
ricResearchLaboratory,MichiganStateUniver- degree (cum laude) in medicine from the Uni-
sity; the Biometric Research Center, The Hong versidadComplutensedeMadrid,in2019,given
KongPolytechnicUniversity;theBiometricSys- unanimouslyforhisdoctoralthesisonmigraine.
tem Laboratory, University of Bologna; and Schepens Eye Research HealsoreceivedthetittleofaNeurologist,in2010.
Institute. He is the author of more than 100 scientific articles published He is also the author of several publications in
in international journals and conferences and four patents. His research migraine and parkinsonism. He has collaborated
interestsincludepatternrecognition,machinelearning,trustworthyAI,and with different research projects related to many
biometrics. He has received awards from ULPGC, La Caja de Canarias, neurologicaldisorders,mainlyAlzheimerandParkinson’sdisease.Hehas
SPEGC,andCOIT.HehasparticipatedinseveralnationalandEuropean been a Neurology and Neurosurgery Professor with the CTO Group,
projectsincollaborationwithotheruniversitiesandprivateentities,suchas since2008.
ULPGC,UPM,EUPMt,Accenture,UninFenosa,Soluziona,andBBVA.
VOLUME12,2024 117449