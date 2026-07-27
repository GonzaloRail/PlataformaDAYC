EClinicalMedicine37(2021)100964
ContentslistsavailableatScienceDirect
EClinicalMedicine
journalhomepage:https://www.journals.elsevier.com/eclinicalmedicine
Researchpaper
The association of a novel digital tool for assessment of early childhood
cognitive development, ‘DEvelopmental assessment on an E-Platform
(DEEP)’, with growth in rural India: A proof of concept study
SupriyaBhavnania,b,DebaratiMukherjeec,SunilBhopald,e,KamalKantSharmaa,
JayashreeDasguptaa,GauriDivana,SeyiSoremekunf,g,ReetabrataRoya,d,BettyKirkwoodd,
VikramPatela,h,i,*
aChildDevelopmentGroup,Sangath,Goa,India
bCentreforChronicConditionsandInjuries,PublicHealthFoundationofIndia,Gurgaon,India
cIndianInstituteofPublicHealth-Hyderabad,BengaluruCampus,Bengaluru,Karnataka,India
dMaternal&ChildHealthInterventionResearchGroup,DepartmentofPopulationHealth,FacultyofEpidemiology&PopulationHealth,LondonSchoolofHygiene
&TropicalMedicine,London,UnitedKingdom
ePopulationHealthSciencesInstitute,NewcastleUniversity,UnitedKingdom
fDepartmentofClinicalResearch,FacultyofInfectiousandTropicalDisease,LondonSchoolofHygieneandTropicalMedicine,LondonUnitedKingdom
gObservationalandPragmaticResearchInstitute,Singapore
hDepartmentofGlobalHealth&SocialMedicine,HarvardMedicalSchool,UnitedStates
iDepartmentofGlobalHealthandPopulation,HarvardTHChanSchoolofPublicHealth,UnitedStates
A R T I C L E I N F O A B S T R A C T
ArticleHistory: Background:Thereisanurgentneedtofillthegapofscalablecognitiveassessmenttoolsforpreschoolchil-
Received8February2021 drentoenable identificationof children at-risk ofsub-optimal development and tosupport theirtimely
Revised21May2021 referralintointerventions.Wepresenttheassociationsbetweengrowthinearlychildhood,awell-estab-
Accepted28May2021
lishedmarkerofcognitivedevelopment,andscoresonanoveldigitalcognitiveassessmenttoolcalledDEvel-
Availableonline18June2021
opmentalAssessmentonanE-Platform(DEEP)onasampleof3-yearoldpre-schoolersfromaruralregionin
northIndia.
Keywords:
Methods:BetweenFebruary2018andMarch2019,1359childrenfromtheSustainableProgrammeIncorpo-
Earlychildhooddevelopment
ratingNutritionandGames(SPRING)programmewerefollowedupat3-yearsageanddataonDEEP,anthro-
Seriousgame
Cognitivedevelopment
pometryandaclinicaldevelopmentalassessment,theBayley’sScaleofInfantandToddlerDevelopment,3rd
Digitalassessment edition(BSID-III)wascollected.DEEPdatafrom200childrenwasusedtotrainamachinelearningalgorithm
topredicttheirscoreonthecognitivedomainofBSID-III.TheDEEPscoreoftheremaining1159childrenwas
thenpredictedusingthisalgorithmtoexaminethecross-sectionalandprospectiveassociationofgrowth
withtheDEEPscore.
Findings: The magnitude of the concurrent positive association between height-for-age and cognitive z-
scores in 3-year olds was similar when cognition was measured by BSID-III (0.20 standard deviations
increaseforeveryunitchangeinspecificallyage-adjustedheight(HAZ),95%CI=0.06(cid:1)0.35)andDEEP(0.26
CI, 0.11(cid:1)0.41). A similar positive prospective relationship was found between growth at 18 (0.21 CI,
0.17(cid:1)0.26)and12-months(0.18CI,0.13(cid:1)0.23)andDEEPscoremeasuredat3-years.Additionally,therela-
tionshipbetweengrowthandcognitivedevelopmentwasfoundtobedependantonsocioeconomicstatus
(SES).
Interpretation:Inthisstudy,wesuggesttheutilityofDEEP,ascalable,digitalcognitiveassessmenttool,to
measurecognitioninpreschoolchildren.Furthervalidationindifferentandlargerdatasetsisnecessaryto
confirmourfindings.
Funding:TheSPRINGProgrammewasfundedthroughaWellcomeTrustprogrammegrantandthefollow-up
studybytheCorporateSocialResponsibilityinitiativegrantfromMaduraMicrofinanceLtd.
©2021TheAuthor(s).PublishedbyElsevierLtd.ThisisanopenaccessarticleundertheCCBY-NC-NDlicense
(http://creativecommons.org/licenses/by-nc-nd/4.0/)
* Correspondingauthorat:HarvardMedicalSchool,641HuntingtonAve,Boston,
MA02115,USA
E-mailaddress:vikram_patel@hms.harvard.edu(V.Patel).
https://doi.org/10.1016/j.eclinm.2021.100964
2589-5370/©2021TheAuthor(s).PublishedbyElsevierLtd.ThisisanopenaccessarticleundertheCCBY-NC-NDlicense(http://creativecommons.org/licenses/by-nc-nd/4.0/)

| 2   |     |     |     |     | S.Bhavnanietal./EClinicalMedicine37(2021)100964 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- |
However,therearecurrentlynoscalablemethodsforsuchroutine
Researchincontext
assessmentofcognitiveabilitiesinearlychildhood.Existingassess-
|     |     |     |     |     |     | ments rely | on structured | observations |     | by highly | trained specialists |
| --- | --- | --- | --- | --- | --- | ---------- | ------------- | ------------ | --- | --------- | ------------------- |
Evidencebeforethisstudy
|     |     |     |     |     |     | likedevelopmental | paediatriciansorclinical |     |     | psychologists, | who are |
| --- | --- | --- | --- | --- | --- | ----------------- | ------------------------ | --- | --- | -------------- | ------- |
Thereisanurgentneedforscalabletoolsfortheassessmentof scarceandexpensiveresourcesinlowandmiddleincomecountries
cognitiveabilitiesinyoungchildrennotonlytoenableidentifi- (LAMIC).Further,themeasuresthemselves,suchastheBayley’sScale
cationofchildrenwhoneedinterventions,butalsotoofferan for Infant and Child Development (BSID), are not freely accessible,
|          |             |               |     |            |                 | need adaptation | for use | in diverse | contexts, | and | have a significant |
| -------- | ----------- | ------------- | --- | ---------- | --------------- | --------------- | ------- | ---------- | --------- | --- | ------------------ |
| approach | for routine | surveillance, |     | similar to | growth monitor- |                 |         |            |           |     |                    |
timeburdenforadministration[8].Thereisthusanurgentneedto
| ing. The | only | methods currently |     | available | either require |     |     |     |     |     |     |
| -------- | ---- | ----------------- | --- | --------- | -------------- | --- | --- | --- | --- | --- | --- |
lengthy parental interviews or observations of children by developlow-costscalabletoolsforassessmentofcognitivedevelop-
skilledproviders,theuseofproprietarydevelopmentalassess- mentthatcanbeusedbynon-specialistsindiversesettings[9].The
menttools,orusingproxyindicatorsrelatedtogrowth. development,validationanddeploymentoftoolslikeGuideforMon-
|     |     |     |     |     |     | itoring Child | Development | (GMCD) | and | Early | Child Development |
| --- | --- | --- | --- | --- | --- | ------------- | ----------- | ------ | --- | ----- | ----------------- |
Addedvalueofthisstudy Index (ECDI) which can be administered by non-specialists repre-
sentseffortsinthisdirection[10,11].However,theseparent-report
Thispaperextendstheproof-of-conceptofanovelassessment
questionnairesrelyonparents’(a)knowledgeofage-appropriatecog-
ofcognitivedevelopmentforpreschoolchildren,the“DEvelop-
|     |     |     |     |     |     | nitive milestones | in early | childhood, | (b) | abilities | to closely observe |
| --- | --- | --- | --- | --- | --- | ----------------- | -------- | ---------- | --- | --------- | ------------------ |
mentalAssessmentonanE-Platform”(DEEP)whichcomprises
theirownchildren’sbehavioursandrecognisefalteringdevelopment,
gamifiedage-appropriateneuropsychologicaltasks.Amachine
and(c)willingnesstoacknowledgeandreportmissedmilestones;all
learning derived algorithm was generated on 200 children to of which potentially contribute to lower sensitivity, especially in
| predict ascore |     | on thecognitive | domain | ofa | clinical develop- |     |     |     |     |     |     |
| -------------- | --- | --------------- | ------ | --- | ----------------- | --- | --- | --- | --- | --- | --- |
Bayley’s householdslivinginpoverty.Giventheemergingevidenceofmobile
| mental assessment, |     | the                 | Scale | of Infant     | and Toddler |              |                  |     |                 |     |                    |
| ------------------ | --- | ------------------- | ----- | ------------- | ----------- | ------------ | ---------------- | --- | --------------- | --- | ------------------ |
|                    |     |                     |       |               |             | devices like | tablet computers |     | and smartphones |     | penetrating health |
| Development,       | 3rd | edition (BSID-III). |       | The resulting | DEEP score  |              |                  |     |                 |     |                    |
systemsofmanycountries[12],toolsthatharnessthesetechnologies
wasappliedtoalargerpopulationsampleof1159childrenand
todirectlyassessthechildpresentpotentialsolutionstothesechal-
| a concurrent | positive | association | was | found | between height- |     |     |     |     |     |     |
| ------------ | -------- | ----------- | --- | ----- | --------------- | --- | --- | --- | --- | --- | --- |
lenges[13].
for-ageandDEEPscoresin3-yearoldsandapredictiveassocia-
Inordertoaddressthegapofscalablecognitiveassessmenttools
tionbetweengrowthat12and18monthsandtheDEEPscore
whichdirectlymeasurechildperformance,ourteamhasdevelopeda
at3-years.
|     |     |     |     |     |     | digital tool | called “DEvelopmental |     | Assessment |     | on an E-Platform” |
| --- | --- | --- | --- | --- | --- | ------------ | --------------------- | --- | ---------- | --- | ----------------- |
(DEEP)whichcomprisesgamifiedage-appropriateneuropsychologi-
Implicationsofalltheavailableevidence caltasksforpreschoolchildren[14].Thesetaskshavebeendesigned
|            |          |            |     |             |              | to be culturally-agnostic |     | through | the | use of | universally relatable |
| ---------- | -------- | ---------- | --- | ----------- | ------------ | ------------------------- | --- | ------- | --- | ------ | --------------------- |
| This study | presents | the degree | to  | which DEEP, | a tool which |                           |     |         |     |        |                       |
couldpotentiallyfillthisgapofscalablecognitivedevelopmen- first-person
|     |     |     |     |     |     | images, | and are woven | into a |     | narrative | story with the |
| --- | --- | --- | --- | --- | --- | ------- | ------------- | ------ | --- | --------- | -------------- |
talassessmentsforpreschoolchildreninglobalchildhealth,is moon and a child as protagonists. The DEEP games (see eFig.1 for
comparablewiththeBSID-III,agold-standardcognitiveassess- game snapshots and brief descriptions) assess multiple cognitive
ment. Further validation in additional datasets is required to skillsincludingmanualprocessingspeedandcoordination,attention,
confirmthesefindings. response inhibition, reasoning, visual form perception and integra-
tion,andmemory.DEEPhasbeenpilotedonacohortofchildrenina
ruralnorthIndianregionanddemonstratedtobehighlyengagingfor
childrenacrossgenders,acceptabletotheirparentsandfeasiblefor
1. Introduction delivery by trained non-specialist personnel in the comfort of the
|     |     |     |     |     |     | child’s home | [14]. A | proof-of-concept |     | study has | also demonstrated |
| --- | --- | --- | --- | --- | --- | ------------ | ------- | ---------------- | --- | --------- | ----------------- |
Thepreschoolyearsofchildhood,frombirthto6-yearsage,repre- thatitispossibletopredictchildren’sscoreonthecognitivedomain
sentsacriticaldevelopmentalperiodwhenthebrain’sstructuraland oftheBayley’sScaleforInfantandToddlerDevelopment(BSID(cid:1)IIIrd
functionaldevelopmentrateisatitspeak[1].Duringthisperiod,chil- edition), using metrics captured by DEEP [15]. This study used a
drenacquirecrucialcognitiveskillswhichincludeattention,inhibi- supervisedmachinelearningapproachbenchmarkedtotheBSID-III
torycontrol,visuo-motorcoordinationandmemory,thatallowthem cognitivescoretodevelopanalgorithmcomprisingacombinationof
toprocessinformation[2].Thesedevelopmentalprocessesaresensi- features extracted from a child’s performance on different DEEP
tivetoarangeofriskfactors,inparticularthoseassociatedwithpov- gamestoderivetheDEEPcognitivescore.
erty,leadingtodelaysincognitivedevelopmentwithadversehealth The study presented in this paper aims to extend the proof-of-
andeconomicconsequencesacrossthelifecourse.Theseriskfactors conceptofDEEP’sutilityasacognitiveassessmenttoolforpreschool
include inadequate nutrition and exposure to infectious diseases, children. Firstly, we compare the distribution of BSID-III cognitive
absenceofanenrichedenvironmentprovidingcognitivestimulation domainandDEEPscoresinasampleof3-yearoldchildren(N=200)
andpresenceofmaternalstressanddepression[3,4].Thepreschool fromaruralregioninnorthIndia.Secondly,weexaminetheassocia-
yearsarealsothetimeatwhichthebrainismostplasticandamena- tion between DEEP score and growth measures in early childhood,
specifically
bletochangeand therebyresponsive toeffective interventions [5]. age-adjusted height (HAZ), which is a well-established
[16(cid:1)19].
Theimportanceofinvestinginthisperiodofearlychildhoodisglob- marker of early childhood cognitive development Poor
allyrecognised,asdemonstratedthroughtheinclusionofSustainable physicalgrowthinuteroanduntil3-yearsofage,asaresultofexpo-
DevelopmentGoal(SDG)4intheframeworkoftheSDGs[6]andthe sure to infections and chronic poor nutrition, results in stunting
NurturingCareFrameworkrecentlypublished bytheWorldHealth which is defined as HAZ being two standard deviations below the
Organisation (WHO) and United Nations Children's Fund (UNICEF) WHOmedianvalues.HAZhasbeenconsistentlydemonstratedtobe
[7].Anessentialsteptoensuringthatallchildrenhavetheopportu- positivelyassociatedwithacademicperformance,withnon-stunted
nitytothriveandreachtheirfulldevelopmentalpotentialistheregu- childrenhavingmoreyearsineducationandhigherincomepotential
larmonitoring ofcognitiveabilitiestoenableearlyidentificationof [20].Ithasthusbeencommonlyusedasaproxyindicatorforgener-
those that are faltering in theirdevelopment so astosupport their atingglobalandregionalestimatesofchildrenat-riskfornotdevel-
timelyreferraltointerventionswhichwouldbemosteffectiveduring oping optimally [20,21]. To this end, we examine: (1) the cross-
thisage[5]. sectional association between HAZ and cognitive development as

|     |     |     |     |     | S.Bhavnanietal./EClinicalMedicine37(2021)100964 |     |     |     |     |     |     |     |     | 3   |
| --- | --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
meetingsbetweenthefieldsupervisorandallassessorswereusedto
| measured | by BSID-III | on  | a sub-sample | of this | population | of  | 3-year |     |     |     |     |     |     |     |
| -------- | ----------- | --- | ------------ | ------- | ---------- | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
olds(N=200),andcompareittoassociationswithDEEPonthesame provide peer support and regular feedback, and quarterly refresher
population(N=200)andwholesample(N=1356);and2)thepro- trainingswereconductedbyseniorresearchteammembers.
spectiveassociation betweenHAZat12and18monthsofage,and Written informed consent was taken from parents at enrol-
cognitivedevelopmentasmeasuredbyDEEPandBSID-IIIat3years. ment in SPRING, then prior to the 18-month assessment. Parents
Thirdly,weexaminedtheextenttowhichDEEPaddstothepredic- were also consented to be approached by the research team after
tionoftheBSIDcognitivedomainscorefromHAZalone. completion of the SPRING trial. Written informed consent was
|     |     |     |     |     |     |     |     | again obtained  | at the     | time of | the 3-year | follow-up | assessment. |        |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | ---------- | ------- | ---------- | --------- | ----------- | ------ |
|     |     |     |     |     |     |     |     | Ethics approval | for SPRING | was     | obtained   | from      | the London  | School |
2. Methods
|     |     |     |     |     |     |     |     | of Hygiene | & Tropical Medicine |     | (LSHTM) | research | ethics | commit- |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------------------- | --- | ------- | -------- | ------ | ------- |
2.1. Studydesignandparticipants tee (23 June 2011; approval number 5983) and the Sangath Insti-
|     |     |     |     |     |     |     |     | tutional | Review board | (IRB) | (19 February | 2014). | Approval | was |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------ | ----- | ------------ | ------ | -------- | --- |
Research’s
Participants in this study were recruited from 120 villages in also granted by the Indian Council of Medical Health
RewaridistrictinruralHaryana,India,thesitefortheSPRING(Sus- Ministry ScreeningCommittee(HMSC)(24November2014).Ethi-
|                 |             |                     |            |               |            |            |        | cal approval | for the study | which    | collected        | the     | data reported | in         |
| --------------- | ----------- | ------------------- | ---------- | ------------- | ---------- | ---------- | ------ | ------------ | ------------- | -------- | ---------------- | ------- | ------------- | ---------- |
| tainable        | Programme   | Incorporating       |            | Nutrition     | and Games) | trial,     | an     |              |               |          |                  |         |               |            |
|                 |             |                     |            |               |            |            |        | this paper   | was obtained  | from     | IRBs of Public   | Health  | Foundation    | of         |
| early childhood |             | development         | randomised | control       | trial,     | which      | has    |              |               |          |                  |         |               |            |
|                 |             |                     |            |               |            |            |        | India (PHFI) | (27 October   | 2017;    | 18 July 2018),   | Sangath |               | (23 August |
| been described  |             | in detail elsewhere |            | [22,23]. In   | brief,     | SPRING     | devel- |              |               |          |                  |         |               |            |
|                 |             |                     |            |               |            |            |        | 2018), and   | the LSHTM     | research | ethics committee |         | (11           | June 2020; |
| oped an         | innovative, | feasible,           | affordable | & sustainable |            | community- |        |              |               |          |                  |         |               |            |
approvalnumber9886(5983)(cid:1)6).
basedapproachtodeliveringahomevisitingprogrammeaimingto
| improve | child growth | &   | development | at-scale | in India | & Pakistan |     |     |     |     |     |     |     |     |
| ------- | ------------ | --- | ----------- | -------- | -------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
(registered with Clinical-Trials.gov, number NCT02059863). 7015 2.2. Datacollectionandpreparation
childrenwereenroledintoSPRING’ssurveillancesystem,with5117
born from 18 June 2015 when the SPRING intervention was fully Cognitionat3-yearsofage:TheBayley’sScaleofInfantandToddler
implementedandthereforeeligibleforrecruitmentintothetrial.Of Development,3rdEdition(BSID-III),adevelopmentalassessmentfor
these 1744 were identified for the child development assessment preschoolchildrenaged0(cid:1)42months[24],wasadministeredonthe
sub-sample with the aim of assessing at least 50 children in each 200participantsdescribedabove.AtranslatedversionoftheBSID-III
cluster at age 18 months. The loss to follow-up was less than adapted for administration by non-specialists was used following a
expected and 1443 children therefore received an anthropometric protocoldescribedpreviously[15,22].Rawscoreswerecomputedas
assessmentat18-monthsage. perthemanual,andusedtogenerateage-adjustedcompositescores.
Between February and May 2018, 100 3-year old children from DEEP (see eFig.1) was administered on Samsung Tab E Android
SPRING’s surveillance system were randomly selected and assessed tablets.AtthebeginningofeachofDEEP’s9games,assessorsdeliv-
as part of a DEEP pilot study which collected DEEP, BSID-III and ered standardised verbal instructions in the local language most
growthdata.Subsequently, between August2018 and March 2019, familiar to the child to teach them how to play the games (demo-
anadditional1259ofthe1443childrenwhoreceivedanassessment mode)[14].Toensurethatcomprehensionoflanguagewasnotalim-
ofanthropometryat18-monthsage,wereassessedwhentheywere iting factor in the child’s ability to understand the instructions, the
approximately3-yearsold.DEEPandgrowthdatawascollectedon assessorwouldfirstshowthechildhowtoplaythegame,andthen
all1259,whileBSID-IIIdatawascollectedonasubsetof100ofthese assistthechild tilltheywere abletoplay independently. Assessors
children.184childrenwerelosttofollowupduetothefollowingrea- were trained to proceed to play-mode only when a child could
sons:122hadmovedawayfromthestudyarea,40weretemporarily engage independently and correctly with the demo-mode without
| unavailable | during | the assessment |     | period, 12 | families | refused | con- | anyassistance. |     |     |     |     |     |     |
| ----------- | ------ | -------------- | --- | ---------- | -------- | ------- | ---- | -------------- | --- | --- | --- | --- | --- | --- |
sent,2childrenwereunabletoengagewiththetabletduetoaphysi- Anthropometry:WorldHealthOrganisation(WHO)protocolswere
cal disability and 3 had died. DEEP data did not save for another 5 usedtomeasurethechild’sheightusingtheSECA-417infantometer
children.Theentiresampleofthisstudyisconstitutedby1359chil- at12and18monthsandSeca213PortableStadiometerand3years.
dren (study samples summarised in Table1). A comparison of the Height was used to generate height-for-age (HAZ) z-scores using
socio-demographicprofileofstudychildrenwiththeremainingchil- WHOgrowthstandards.Stuntingwasdefinedastwostandarddevia-
dren enroled in the SPRING surveillance system (N = 5656) can be tionsbelowtheage-adjustedWHOgrowth-standardmedianvalues
foundineTable1. ofheight.Allchildrenwhoseage-adjustedanthropometricmeasure-
Allassessmentson3-yearoldchildrenfollowedupthroughthis mentswerebelowthreestandarddeviationsofWHOmedianvalues
studywereconductedbyeightnon-specialists(henceforthreferred werereferredforfollow-upassessmentstolocalclinics.
toas‘assessors’)inparticipants’householdsataconvenientdateand
|     |     |     |     |     |     |     |     | Socioeconomic | status: | Information | on  | socioeconomic |     | status was |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ------- | ----------- | --- | ------------- | --- | ---------- |
time.Theseassessorshadcompletedtheequivalentofapost-gradu- collectedfromfamiliesuponenrolmentintotheSPRINGstudy[22].
atedegree,andhadbeenpartoftheSPRINGevaluationteams.They Principalcomponentsanalysiswasusedtocalculateasocioeconomic
werethusembeddedwithinthecommunityandhadpriortraining status(SES)indexusingdataonhouseholddemographicsandanimal
andexperienceworkingwithyoungchildren.Approximately10%of &otherassetownership.Thisindexwasusedtocategorizethepopu-
all visits were supervised by a field supervisor. Weekly group lationintoSESquintiles.
Table1.
Sampledetails(source,Nnumber)andtypesofanalysesinthisstudy.HAZ=height-for-age.
Ageatmeasurement Analysistype DEEPscore BSID-IIIcognitivedomainscore
ofpredictor
SPRINGsurveillancearm SPRINGoutcomearm Total SPRINGsurveillancearm SPRINGoutcomearm Total
| 3-yearHAZ |     | (A)Concurrentassociation |     | 100 |     |     | 1259 |     | 1359 100 |     |     | 100 |     | 200 |
| --------- | --- | ------------------------ | --- | --- | --- | --- | ---- | --- | -------- | --- | --- | --- | --- | --- |
18-monthHAZ (B)Prospectiveassociation (cid:1) 1259 1259 (cid:1) 100 100
|             |     |                           |     | (cid:1) |     |     |      |     | (cid:1) |     |     |     |     |     |
| ----------- | --- | ------------------------- | --- | ------- | --- | --- | ---- | --- | ------- | --- | --- | --- | --- | --- |
| 12-monthHAZ |     | (B)Prospectiveassociation |     |         |     |     | 1122 |     | 1122    |     |     | 70  |     | 70  |

| 4                        |     |     | S.Bhavnanietal./EClinicalMedicine37(2021)100964 |     |         |     |     |     |     |
| ------------------------ | --- | --- | ----------------------------------------------- | --- | ------- | --- | --- | --- | --- |
| 2.3. Statisticalanalysis |     |     |                                                 |     | Table2. |     |     |     |     |
Socio-demographicandgrowthprofileofstudyparticipantsat3-yearsage.
ParentaleducationandSESdatawerecollectedatenrolmentintoSPRING.
2.3.1. PredictingBSID-IIIcognitivescorefromDEEPfeatures
Child performance during the play-mode of DEEP’s games were Characteristic N=1359
thefeaturesonwhichasupervisedmachinelearningapproachwas
|     |     |     |     |     | Female,n(%) |     |     |     | 623(45.9) |
| --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --------- |
appliedtoderivetheoptimalcombinationoffeaturesforthepredic-
|     |     |     |     |     | Age(months),mean(sd) |     |     |     | 38.7(1.1) |
| --- | --- | --- | --- | --- | -------------------- | --- | --- | --- | --------- |
tionofBSID-IIIcognitivedomainscores.Briefly,thisapproachutilised Mother’sageatdelivery,mean(sd)
22.3(3.8)
sevenfeatureselectionmethodsincombinationwithfiveprediction Mother’seducationlevel,n(%)
functionstoidentifythebestmodelusinga10-foldcross-validation Belowprimary(includingneverbeentoschool) 168(12.4)
|     |     |     |     |     | Primary/middleschoolcompleted |     |     |     | 350(25.8) |
| --- | --- | --- | --- | --- | ----------------------------- | --- | --- | --- | --------- |
procedure and ensemble modelling repeated 10 times for stability Secondary/highersecondaryschoolcompleted 525(38.6)
(refer to supplementary material for details). The metrics used to College&above 316(23.3)
assesstheperformanceofthismodelwere:(a)Pearson’scorrelation
Father’seducationlevel,n(%)
coefficientbetweenthepredicted(DEEPscore)andtrueBSID-IIIcog-
|                |             |                         |          |          | Belowprimary(includingneverbeentoschool) |     |     |     | 72(5.3)   |
| -------------- | ----------- | ----------------------- | -------- | -------- | ---------------------------------------- | --- | --- | --- | --------- |
|                |             |                         |          |          | Primary/middleschoolcompleted            |     |     |     | 268(19.7) |
| nitive domain  | raw score,  | (b) absolute agreement, | using    | two-way, |                                          |     |     |     |           |
|                |             |                         |          |          | Secondary/highersecondaryschoolcompleted |     |     |     | 613(45.1) |
| random effects | intra-class | coefficient [ICC(2,1)], | (c) mean | absolute |                                          |     |     |     |           |
|                |             |                         |          |          | College&above                            |     |     |     | 406(29.9) |
prediction error defined as DEEP score (cid:1) BSID-III cognitive domain SESquintile,n(%)
score and d) root mean square error. This algorithm was trained Q1(poorest) 282(20.8)
using the full sample of children with both BSID-III and DEEP data Q2 306(22.5)
available at 3-years (N = 200), and thenused togenerate theDEEP Q3 273(20.1)
|           |               |                |                  |          | Q4                                   |     |     |                                   | 264(19.4) |
| --------- | ------------- | -------------- | ---------------- | -------- | ------------------------------------ | --- | --- | --------------------------------- | --------- |
| score for | the remaining | 1159 children. | The distribution | of these |                                      |     |     |                                   |           |
|           |               |                |                  |          | Q5(wealthiest)                       |     |     |                                   | 234(17.2) |
|           |               |                |                  |          | Height-for-age(z-score),mean(95%CI)# |     |     | (cid:1)1.58((cid:1)3.5(cid:1)0.4) |           |
scoreswastestedfornormalityusingtheShapiroWilkWTestand
comparedusingatwo-wayKolmogorov(cid:1)Smirnovtest. Stunted,n(%) 439(32.4)
Preschoolenrolment,n(%)
|     |     |     |     |     | Privatepreschool |     |     |     | 330(24.3) |
| --- | --- | --- | --- | --- | ---------------- | --- | --- | --- | --------- |
2.3.2. Associationsbetweengrowthandcognitivedevelopment
|     |     |     |     |     | Anganwadicentres |     |     |     | 261(19.2) |
| --- | --- | --- | --- | --- | ---------------- | --- | --- | --- | --------- |
Three types of associations were conducted in this study (see None 768(56.5)
Table1):(a)cross-sectionalassociationsbetweenHAZandcognitive BSID-IIIcognitivedomainscore$
57(cid:1)88
| development, | assessed using  | BSID-III and             | DEEP, measured | concur- | Range       |     |     |     |             |
| ------------ | --------------- | ------------------------ | -------------- | ------- | ----------- | --- | --- | --- | ----------- |
|              |                 |                          |                |         | Mean(SD)    |     |     |     | 69.41(5.02) |
| rently at    | 3-years and (b) | prospective associations | between        | 12 and  |             |     |     |     |             |
|              |                 |                          |                |         | Median(IQR) |     |     |     | 69(7)       |
18-monthHAZwithcognitivedevelopmentmeasuredusingBSID-III
DEEPscore$
and DEEP at 3-years. To allow for comparison of results across the 61.72(cid:1)76.06
Range
twomeasuresofcognition,BSID-IIIandDEEPscoreswereconverted Mean(SD) 69.40(3.26)
|     |     |     |     |     | Median(IQR) |     |     |     | 69.23(4.93) |
| --- | --- | --- | --- | --- | ----------- | --- | --- | --- | ----------- |
tostandardz-scores.Allassociationsweretestedusingmixedeffects
DEEPscore
linear regression (xtmixed function) on Stata version 14, with the Range 60.45(cid:1)79.25
trial-clusterinwhichthechildresidesbeingusedasarandom-effect Mean(SD) 69.76(3.13)
fixed-effects.
and predictor variables being treated as Sex and SES Median(IQR) 69.87(4.84)
wereexploredforinteractionwithHAZ;theinteractiontermforSES, #n=1356$n=subsampleof200.
butnotforsex,wasfoundtobesignificant.Thussexwasincludedin
| the first model | for each | analysis (Model | 1) as a confounder, | along |     |     |     |     |     |
| --------------- | -------- | --------------- | ------------------- | ----- | --- | --- | --- | --- | --- |
withchildageatvisitandSPRINGtrialarmallocation.Inadditionto thegreaterproportionofbothmothersandfatherswereeducatedtill
these,SESwasincludedasaninteractionterminthesecondmodel secondary or higher secondary school, more fathers than mothers
(Model 2). For each regression model the mean cognitive z-score were educated up to this level. Consistent with prior reports from
(BSID-III or DEEP) at mean HAZ, and up to 2 standard deviations thispopulation,weobservedthat32.4%ofthechildrenwerestunted.
aboveandbelowthemeanHAZ(i.e.inordertoassessthespreadof Morethanhalfthechildren(56.5%)werenotattendinganypreschool
thepredictedscore),waspredictedforeverySESquintileleveland at3-yearsage.Participatingfamilieswerealmostequallydistributed
plotted using Microsoft Excel. Finally, a hierarchical regression was across SES quintiles, with slightly more (22.5%) and fewer (17.2%)
conductedinwhichtheLikelihood-RatioTestwasusedtocompare childreninquintiles2and5,respectively.Thestudysamplethushad
thegoodnessoffitofamodelinwhichBSID-IIIwaspredictedusing aslightoverrepresentationofchildrenfromthepoorerquintiles,as
3-yearHAZalonewithamodelwhichalsohadDEEPscoreasapre- seen in eTable 1 which compares it with children enroled in the
dictorvariable.Thenullhypothesisisthatthesmallermodelisthe SPRINGsurveillancesystembutnotfollowedupat3-years.
“best”modelwhichisrejectedwhentheteststatisticislarge.
3.2. PredictingBSID-IIIcognitivescorefromDEEPfeatures
2.3.3. Roleofthefundingsource
Thefundingagencieshadnoinvolvementinthecollection,analy- Ofthe1359childrenonwhomDEEPwasadministered,wefound
sis,andinterpretationofdata,writingofthereportandthedecision that1342(98.7%)attemptedallninegames.Thetimetakentocom-
pletetheDEEPassessmentdependsonthenumberofdifficultylevels
tosubmitthepaperforpublication.Allauthorshadfullaccesstothe
fulldatainthestudyandhadfinalresponsibilityforthedecisionto
|     |     |     |     |     | attempted | by each child; | we found that | on average | children spent |
| --- | --- | --- | --- | --- | --------- | -------------- | ------------- | ---------- | -------------- |
submitforpublication. justover20min(mean=23min18s;SD=3min52s)engagedwith
thetool.Thisdurationrangedfromunder3mininchildrenwhoonly
3. Results playedthefirstcoupleofgamestillover50minforthosewhosuc-
|                                     |     |     |     |     | cessfully | completed most | game levels (range | = 3 | min 39 s(cid:1)50 min |
| ----------------------------------- | --- | --- | --- | --- | --------- | -------------- | ------------------ | --- | --------------------- |
| 3.1. Descriptionofstudyparticipants |     |     |     |     | 40s).     |                |                    |     |                       |
Thedistributionofboththepredicted(DEEPscore)andtrueBSID-
The socio-demographic and growth profile of the children fol- III cognitive domain scores were found to be non-normal (BSID-III
lowedupat3-yearsageispresentedinTable2.Themeanageofchil- N=200z=3.05,p=0.001;DEEPN=200z=2.63,p=0.004;DEEP
N=1359z=6.17,p<0.001)andunequalasdeterminedbytheKS
| dren assessed | in the follow-up | study was | 38.7 months | (standard |     |     |     |     |     |
| ------------- | ---------------- | --------- | ----------- | --------- | --- | --- | --- | --- | --- |
deviation(SD)=1.1months),justunderhalf(45.8%)weregirls.While Test comparing BSID-III and DEEP on the sample of 200 children

S.Bhavnanietal./EClinicalMedicine37(2021)100964 5
Fig.1. Distributionofscoresofcognitiveassessments.Distributionof(A)theBSIDcognitivescore(blue)andDEEPscore(orange)of200childrenonwhomthemachinelearning
algorithmwastrainedand(B)theDEEPscoreofthefullsampleof1359childrenforwhomtheitwasderived(Forinterpretationofthereferencestocolorinthisfigurelegend,the
readerisreferredtothewebversionofthisarticle.).
(p = 0.02) (Fig. 1A). The BSID-III cognitive domain score of 200 SD unit increase in DEEP z-score for the same population (Model
children ranged from 57 to 88 (mean = 69.41, SD = 5.02; 1 slope represented as black dotted line in Fig. 2A and B, respec-
median = 69, IQR = 7), while the DEEP score of the samechildren tively, see eTable3). SES modified this relationship with the slope
had a smaller range of 61.72 to 76.06 (mean = 69.40, SD = 3.26; ofthe regression line highest in the poorest quintileanddecreas-
median = 69.23, inter-quartile range (IQR) = 4.93) (see Table 2). ing as the SES quintile increased. Thus, while there was a strong
We found that the performance, including limitations, of the positive association between HAZ and cognitive development in
machinelearning algorithm derived in this study was comparable low SES quintiles (1, 2 and 3), this relationship was not present
to the previously published algorithm (eTable2). For instance, in the wealthier SES quintiles (4 and 5) (see Fig. 2 and eTable3).
whiletheoverall correlation betweentheDEEP scoreand BSID-III This effect was observed irrespective of whether cognition was
cognitive domain score (Pearson’s correlation coefficient measured using BSID-III (N = 200) or DEEP (N = 200 and
r = 0.673) (eFig.2A) and absolute agreement were moderate (ICC N = 1356). Additionally, using hierarchical regression, we found
(2,1) = 0.62, 95% CI = 0.52(cid:1)0.70), DEEP tended to overestimate that including DEEP as a predictor in associations between 3-year
low BSID scorers and underestimate high scorers (eFig.2B). The HAZ and BSID-III cognitive domain score significantly improved
mean absolute prediction error of the ML algorithm was 2.91 themodel(LRchi2(1)=69.71,p<0.001).
(SD = 2.31) and root mean square error was 3.71 (SD = 4.71). The
DEEP score of the entire population (Fig. 1B), predicted using this
3.4. PredictiveassociationsbetweenHAZ12and18monthsand
algorithm, ranged from 60.45 to 79.25 (mean = 69.76, SD = 3.13; cognitivedevelopmentat3-yearsage
median=69.87,IQR=4.84).
The relationship between HAZ, measured in the first 2 years of
3.3. AssociationsbetweenHAZandcognitivedevelopmentmeasured life,andcognitivedevelopmentmeasuredbyDEEPandBSID-IIIat3-
concurrentlyat3-yearsage yearsage,wassimilartothatwithconcurrentlymeasuredHAZ(see
eTables4and5).Childrenwhoweretallestat12-and18-monthsage
A positive relationship was observed between HAZ and cogni- had the highest cognitive z-scores at 3-years (DEEP Model 1 slope
tive development as measured by BSID-III (N = 200) and DEEP represented as black dotted line in Fig. 3A and B). This association
(N = 200 and N = 1356) (see eFig.3); for every unit change in wasalsomodifiedbySES,suchthattherewasastrongpositiveasso-
HAZ,theBSIDcognitivez-scoreincreasedby 0.20standarddevia- ciationinlowSESquintiles(1,2and3)butnoneinthewealthierSES
tions (95% CI = 0.06(cid:1)0.35), comparable to the 0.26 (0.11(cid:1)0.41) quintiles(4and5)(seeFig.3andeTables4and5).
Fig.2. Associationsbetweenheight-for-age(HAZ)andcognitivedevelopmentconcurrentlymeasuredat3yearsofage.AssociationbetweenHAZand(A)BSID-IIIcognitivez-score
(N=200);(B)DEEPz-score(N=200);C)DEEPz-score(N=1359)stratifiedbysocioeconomicstatusquintilewithQ1(darkestgreen)andQ5(lightestgreen)beingthelowestand
highestquintiles,respectively.Unadjustedmodelsarerepresentedasdashedlines(Forinterpretationofthereferencestocolorinthisfigurelegend,thereaderisreferredtothe
webversionofthisarticle.).

6 S.Bhavnanietal./EClinicalMedicine37(2021)100964
Fig.3. Prospectiveassociationsbetweenheight-for-age(HAZ)andcognitivedevelopment.AssociationsbetweenDEEPz-scoresof3-yearoldchildrenandHAZmeasuredat(A)18-
monthsand(B)12-monthsofagestratifiedbysocioeconomicstatusquintilewithQ1(darkest)andQ5(lightest)beingthelowestandhighestquintiles,respectively.Unadjusted
modelsarerepresentedasdashedlines(Forinterpretationofthereferencestocolorinthisfigurelegend,thereaderisreferredtothewebversionofthisarticle.).
4. Discussion Ourresultsindicatethatwhilethereisapositivecross-sectional
andprospectiverelationshipbetweenheightinearlychildhoodand
Inthisstudy,weusedthewell-documentedrelationshipbetween cognition at 3-years, measured either by the clinical assessment
physical growth and cognitive development to provide a proof-of- BSID-III or DEEP, this relationship is more pronounced in the most
conceptofthepotentialutilityofDEvelopmentalAssessmentonan deprived socio-economic groups. Other studies have also reported
E-Platform (DEEP), a scalable tablet-based neurodevelopmental suchdifferentialeffectsoffamilySES.Ofparticularrelevancearetwo
assessment tool, to index cognition in preschool children. We also studieswhichhaveusedthecaregiver-reporttool,EarlyChildDevel-
revealacomplexrelationshipbetweengrowthandcognitivedevel- opmentIndex(ECDI),toevaluatecognitiveorsocioemotionaldevel-
opment,whichismodifiedbythefamily’ssocioeconomicstatus.We opment in early childhood and examine associations with physical
discusstheseresultsinthecontextoftheneedtofillthegapofscal- growth. Both studies have demonstrated that the association
ablecognitivedevelopmentalassessmentsforpreschoolchildren. betweenphysicalgrowthandchilddevelopmenta)reducedsignifi-
Inthis studynon-specialists administered DEEP toassess cogni- cantlywhenadjustingforhouseholdSESandb)ismoderateincoun-
tivedevelopmentonover1350youngchildreninruralhouseholds. trieswithlowhumandevelopmentindex(HDI),withnoassociation
The socio-demographic profile of the children who participated in inhighHDIcountries[29,30].
thisstudywasfoundtobecomparabletotheSPRINGstudysample These findings suggest that while both undernourishment and
from which they were drawn, with a slight over-representation of poor cognitive development in early childhood are caused by pov-
the poorest socio-economic status quintiles. Also, importantly, key erty, likely due to risk factors for both commonly co-occurring in
indicatorsofrateofstuntinginchildrenunder5yearsandpercent- poorhouseholds[3,4],theassociationbetweenthetwoismoderated
ageofwomenwith10ormoreyearsofschoolinginpopulation-wide byotherfactors.Wespeculatethatthemostlikelyalternativefactor
surveys conducted in thisdistrict [25]are comparable toour study isanenrichedenvironmentwithgreateravailabilityofplaymaterials
sample,suggestingthatitcanbeconsideredtoberepresentativeof and more responsive interactions between caregivers and children,
thisregion. which may be more common in households with higher SES, and
In this study we take our previous proof of concept of using a whichmightbeabletocompensatefortheimpactofchronicunder-
machine learning approach to predict children’s BSID-III cognitive nutrition impacting brain growth. The central role of a stimulating
domainscorethroughtheirperformanceonDEEP[15]astepfurther homeenvironmentonthedevelopmentofchildren’scognitiveabili-
by refining our algorithm by using a slightly larger (200 children ties[5,31]issupportedbynumerousrandomisedcontroltrialswhich
comparedto140inthepreviousstudy)trainingdataset,albeitwith have shown that psychosocial interventions targeting responsive
thelimitationofnothavinganindependentvalidationdataset. parentingandcognitivestimulationhavealargerimpactoncognitive
Inthisstudypopulation,usingthispredictionalgorithm,wedem- outcomesthannutritionalinterventions,andoutcomesareenhanced
onstrateapositivecross-sectionalassociationbetweenHAZandcog- whenthesetwocomponentsareprovidedtogether[32,33].
nitive development measured by BSID-III, a widely used clinical The complexity of the relationship between anthropometry and
developmental assessment replicating the findings of other studies cognitivedevelopmentservesasareminderoftheneedtousespe-
[18,19,26,27]. Importantly, we also observed that the coefficient of cificmeasurestoassesschildren’sdevelopmentalstatusratherthan
the concurrent association between HAZ and cognitive z-scores is dependingonproxiesbasedongrowthoutcomes[27,29,30].Indeed,
similar when cognition is measured by BSID-III and by our novel authors of studies using stunting as a proxy indicator of cognitive
DEEPassessment.Wealso demonstrate apositiveprospective rela- developmentthemselvessuggestthatthismightbeunderestimating
tionshipbetweenHAZat12and18-months-ageandDEEPscoreat3- thetruemagnitudeofthenumberofchildrennotbeingabledevelop
years.Theseresultsprovideevidenceofthecomparabilityoftheper- optimally [20,21]. In support of this speculation, the results in this
formance of DEEP with the BSID-III as a cognitive assessment tool study also demonstrate that adding DEEP score as a predictor
[3,28].However, weacknowledge that these results are based on a improvestheassociationbetweenHAZandcognition.Realisticesti-
machinelearningalgorithmwhichhasnotbeenvalidatedonaninde- matesofchildrenatriskofnotbeingabletoattaintheirfulldevelop-
pendentdataset(see‘Strengthsandlimitationsofthestudy’section mental potential can thus only be achieved if the barrier of lack of
ofDiscussion). availabilityofeffectiveandscalabletoolsforcognitiveassessmentsin

|     |     |     |     |     | S.Bhavnanietal./EClinicalMedicine37(2021)100964 |     |     |     |     |     |     |     |     | 7   |
| --- | --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
preschoolchildrenisovercome[9].Thisstudypresentsthedegreeto DM,SBhopal,RRandSS,visualisedthedataandpreparedtheorigi-
whichDEEP,atoolwhichcouldpotentiallyfillthisgapinglobalchild
|     |     |     |     |     |     |     |     | nal draft. | All co-authors | reviewed |     | and edited | the manuscript | and |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | -------------- | -------- | --- | ---------- | -------------- | --- |
health, is comparable with the BSID-III, a gold-standard cognitive agreeduponitsfinalversion.
assessment.Wedemonstratethateventhoughinitscurrentversion
which3-yearoldchildrenrequirealmost25mintocomplete,DEEP
DeclarationofCompetingInterest
| is highly | engaging | to them | as almost | all children |     | attempted | every |     |     |     |     |     |     |     |
| --------- | -------- | ------- | --------- | ------------ | --- | --------- | ----- | --- | --- | --- | --- | --- | --- | --- |
game.Ahighlevelofacceptabilitytotheend-user,inthiscasepre- Microfinance
|                 |             |         |             |           |      |            |            | Dr Sharma | reports | grants     | from    | Madura |            | Ltd and  |
| --------------- | ----------- | ------- | ----------- | --------- | ---- | ---------- | ---------- | --------- | ------- | ---------- | ------- | ------ | ---------- | -------- |
| school children |             | who are | notoriously | difficult | to   | engage     | in assess- |           |         |            |         |        |            |          |
|                 |             |         |             |           |      |            |            | Wellcome  | Trusts, | during the | conduct | of the | study. Dr. | Kirkwood |
| ments, is       | an integral | barrier | to          | overcome  | when | developing | tools      |           |         |            |         |        |            |          |
reportsgrantsfromWellcomeTrust,duringtheconductofthestudy;
intended to be used at scale. We are now testing DEEP with larger Dr. Roy reports grants from Madura Microfinance Ltd, grants from
samples in diverse populations to further evaluate its convergent, Wellcome Trust, during the conduct of the study; Dr. Soremekun
construct and cross-cultural validity, along with its test-retest reli- reportsgrantsfromWellcomeTrust,duringtheconductofthestudy;
ability of DEEP, in accordance with the COSMIN guidelines [34] Dr.BhopalreportsgrantsfromWellcomeTrust,duringtheconduct
(https://research.reading.ac.uk/stream/). We also intend to use this ofthestudy;Dr.BhavnanireportsgrantsfromMaduraMicrofinance
data to make the administration of DEEP age-contingent, so as to Ltd,grantsfromWellcomeTrust,duringtheconductofthestudy;Dr.
reducetheburdenoftheassessmentwithoutcompromisingitsvalid- Microfinance
|     |     |     |     |     |     |     |     | Patel reports | grants | from | Madura |     | CSR, | grants from |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ------ | ---- | ------ | --- | ---- | ----------- |
ity.
|     |     |     |     |     |     |     |     | Wellcome | Trust, during | the | conduct | of the | study. All | the other |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------- | --- | ------- | ------ | ---------- | --------- |
Thelargestudysamplebeingcommunity-basedandrepresenta- authorsreportnonconflicts.
| tive of the | population |                 | from which | they           | were | drawn     | serve as |     |     |     |     |     |     |     |
| ----------- | ---------- | --------------- | ---------- | -------------- | ---- | --------- | -------- | --- | --- | --- | --- | --- | --- | --- |
| strengths   | of this    | study. Further, | being      | a longitudinal |      | follow-up | ofa      |     |     |     |     |     |     |     |
Acknowledgments
| birth cohort,it | has            | allowedus  | to      | examineboth | cross-sectional |           | and      |          |      |                |     |                   |     |            |
| --------------- | -------------- | ---------- | ------- | ----------- | --------------- | --------- | -------- | -------- | ---- | -------------- | --- | ----------------- | --- | ---------- |
| prospective     | associations   |            | between | growth      | and cognitive   |           | develop- |          |      |                |     |                   |     |            |
|                 |                |            |         |             |                 |           |          | We would | like | to acknowledge |     | the contributions | of  | Ms Deepali |
| ment. A         | methodological | limitation |         | of this     | study is        | that DEEP | score    |          |      |                |     |                   |     |            |
VermaandMsDivyaKumartothecollectionofdataontheSPRING
hasbeenpredictedfromanMLalgorithmhasbeentrainedonarela-
studyanditsfollow-upcontributingtothismanuscript,andDrSid-
tivelysmallsamplesizeof200children.Further,unlikeinourprevi-
dharthaMandalforadviceonthestatisticalanalysismethods.
ousstudywhichhadsplitthissampleintoatrainingandtestdataset,
thistimewehaveusedtheentiresampletotrainthemodelanddo
notpresentanindependenttestdataset.Ourpredictionsareoveresti- Supplementarymaterials
| mating and | underestimating |     | poor | and good | BSID-III | performers |     |     |     |     |     |     |     |     |
| ---------- | --------------- | --- | ---- | -------- | -------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
respectivelywhichhasresultedinthemhavingunequaldistributions Supplementarymaterialassociatedwiththisarticlecanbefound
oftheircognitivescores.Despitetheselimitationsofasmallsample intheonlineversionatdoi:10.1016/j.eclinm.2021.100964.
| size for                                                   | the training | set | and lack | of an independent |     | test | set, our |            |     |     |     |     |     |     |
| ---------------------------------------------------------- | ------------ | --- | -------- | ----------------- | --- | ---- | -------- | ---------- | --- | --- | --- | --- | --- | --- |
| approachtousingMLtoanalysedatafromgamifiedcognitiveassess- |              |     |          |                   |     |      |          | References |     |     |     |     |     |     |
mentsremainsnovelandourongoingendeavourtoexpandthesize
and diversity of our sample, alongside gold-standard assessments, [1] EstrinGL,BhavnaniS.Braindevelopment:structureeditor.In:BensonJB,editor.
Encyclopediaofinfantandearlychildhooddevelopment.(2ndEd.)Oxford:Elsev-
willallowustoderivemoreaccurateandgeneralizablealgorithms. ier;2020.p.205–14.
Otherstudylimitationsinclude:(1)asmallproportionoftheSPRING [2] JohnsonMH,deHaanM.Developmentalcognitiveneuroscience:anintroduction.
sample(12.3%)waslosttofollow-up,mostlyduetothefamilymov- 4thEd.Wiley-Blackwell;2015.p.332..
ingtoanotherlocationwhichwasoutsideofthestudyarea,(2)some [3] BlackMM,WalkerSP,FernaldLCH,AndersenCT,DiGirolamoAM,LuC,etal.Early
childhooddevelopmentcomingofage:sciencethroughthelifecourse.Lancet
ofthechildrenfollowedupinthisstudyhadmissingdataintheir12- 2017;389:77–90.
monthphysicalgrowthmeasures,and(3)householdsocio-economic [4] NelsonCA,Gabard-DurnamLJ.Earlyadversityandcriticalperiods:neurodevelop-
status was calculated at enrolment to SPRING, and this may have mentalconsequencesofviolatingtheexpectableenvironment.TrendsNeurosci
2020;43:133–43.
changedpriortothe3-yearassessment.Despitetheselimitations,to [5] BrittoPR,LyeSJ,ProulxK,YousafzaiAK,MatthewsSG,VaivadaT,etal.Nurturing
ourknowledge,thisisthefirstpublishedstudycomparingtheperfor- care:promotingearlychildhooddevelopment.TheLancet2017;389:91–102.
[6] SustainableDevelopmentGoals[Internet].UNDP.[cited2020Dec21].Available
manceofascalable,digitalassessmenttoolwhichhasthepotentialto
contributetofillingthegapofglobaldataoncognitivedevelopment from: https://www.undp.org/content/undp/en/home/sustainable-development-
goals.html
in preschool years, with a gold-standard cognitive assessment tool [7] UNICEF,WorldBank,WorldHealthOrganization.Nurturingcareforearlychild-
throughassociationswithanestablishedproxymeasureofcognition. hooddevelopmentaframeworkforhelpingchildrensurviveandthrivetotrans-
|     |     |     |     |     |     |     |     | formhealthand | humanpotential. |     | Geneva:WorldHealthOrganization; |     |     | 2018. |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --------------- | --- | ------------------------------- | --- | --- | ----- |
[Internet][cited2019Nov15].Availablefrom:https://www.who.int/maternal_-
Funding child_adolescent/documents/nurturing-care-early-childhood-development/en.
[8] MarlowM,ServiliC,TomlinsonM.Areviewofscreeningtoolsfortheidentifica-
These studies were funded through two awards: a Wellcome tionofautismspectrumdisordersanddevelopmentaldelayininfantsandyoung
children:recommendationsforuseinlow-andmiddle-incomecountries.Autism
TrustprogrammegrantfortheSPRINGProgrammeandaCorporate
Res2019;12:176–99.
SocialResponsibility(CSR)initiativegrantfromMaduraMicrofinance [9] BoggsD,MilnerKM,ChandnaJ,BlackM,CavalleraV,DuaT,etal.Ratingearly
childdevelopmentoutcomemeasurementtoolsforroutinehealthprogramme
| Ltdforthefollow-upstudy. |     |     |     |     |     |     |     | use.ArchDisChild2019;104:S22–33.                                      |     |     |     |     |     |     |
| ------------------------ | --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
|                          |     |     |     |     |     |     |     | [10] ErtemIO,DoganDG,GokCG,KizilatesSU,CaliskanA,AtayG,etal.Aguidefor |     |     |     |     |     |     |
Datasharingstatement monitoringchilddevelopmentinlow-andmiddle-incomecountries.Pediatrics
2008;121:e581–9.
|     |     |     |     |     |     |     |     | [11] LoizillonA,PetrowskiN,BrittoP,CappaC.Developmentoftheearlychildhood |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------------------ | --- | --- | --- | --- | --- | --- |
Thedatasetsgeneratedforthisstudyareavailableonrequestto
developmentindexinMICSsurveys.UNICEF;2017MICSMethodologicalPapers,
thecorrespondingauthor. No.6,DataandAnalyticsSection,DivisionofDataResearchandPolicy.
|     |     |     |     |     |     |     |     | [12] eHealthwgofor.mHealth:newhorizonsforhealththroughmobiletechnologies: |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
secondglobalsurveyoneHealth.WorldHealthOrganization;2011.[Internet]
Authorcontributions
[cited2021Apr1].Availablefrom:https://apps.who.int/iris/handle/10665/44607.
|     |     |     |     |     |     |     |     | [13] McHenryM.S.,MukherjeeD.,BhavnaniS.,KirolosA.,PiperJ.D.,Crespo-LladoM., |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
SB, DM, S Bhopal, GD, VP and BK conceptualised the study. KKS etal.Thefutureoftablet-basedassessmentstomeasurefortheevaluationof
pediatriccognitioninlowresourcedsettings.Submitted.
coordinated and supervised all data collection while JD supervised [14] BhavnaniS,MukherjeeD,DasguptaJ,VermaD,ParameshwaranD,DivanG,etal.
BSIDadministration.SBconductedtheformalanalysis,supportedby Development,feasibilityandacceptabilityofagamifiedcognitiveDEvelopmental

8 S.Bhavnanietal./EClinicalMedicine37(2021)100964
assessmentonanE-Platform(DEEP)inruralIndianpre-schoolers(cid:1)apilotstudy. [25] Nationalfamily healthsurvey[internet].[cited2020Dec21].Availablefrom:
GlobHealthAction2019;12:1548005.doi:10.1080/16549716.2018.1548005. http://rchiips.org/nfhs/HR.shtml
[15] MukherjeeD,BhavnaniS,SwaminathanA,VermaD,ParameshwaranD,DivanG, [26] SudfeldCR,McCoyDC,FinkG,MuhihiA,BellingerDC,MasanjaH,etal.Malnutri-
etal.ProofofconceptofagamifieddevelopmentalassessmentonanE-platform tionanditsdeterminantsareassociatedwithsuboptimalcognitive,communica-
(DEEP)tooltomeasurecognitivedevelopmentinruralIndianpreschoolchildren. tion,andmotordevelopmentinTanzanianchildren.JNutr2015;145:2705–14.
FrontPsychol2020;11:1202. [27] ScharfRJ,RogawskiET,Murray-KolbLE,MaphulaA,SvensenE,TofailF,etal.Early
[16] WalkerSP,WachsTD,Grantham-McGregorS,BlackMM,NelsonCA,HuffmanSL, childhood growth and cognitive outcomes: findings from the MAL-ED study.
etal.Inequalityinearlychildhood:riskandprotectivefactorsforearlychild MaternChildNutr2018;14:e12584.
development.TheLancet2011;378:1325–38. [28] KangY,AguayoVM,CampbellRK,WestKP.Associationbetweenstuntingand
[17] CrookstonBT,SchottW,CuetoS,DeardenKA,EngleP,GeorgiadisA,etal.Postin- earlychildhooddevelopmentamongchildrenaged36-59monthsinSouthAsia.
fancygrowth,schooling,andcognitiveachievement:youngLives.AmJClinNutr MaternChildNutr2018;14(Suppl4):e12684.
2013;98:1555–63. [29] McCoyDC,PeetED,EzzatiM,DanaeiG,BlackMM,SudfeldCR,etal.Earlychild-
[18] MillerAC,MurrayMB,ThomsonDR,ArbourMC.Howconsistentareassociations hood developmental status in low- and middle-income countries: national,
betweenstuntingandchilddevelopment?Evidencefromameta-analysisofasso- regional,andglobalprevalenceestimatesusingpredictivemodeling.PLoSMed
ciations between stunting and multidimensional child development infifteen 2016;13:e1002034.
low-andmiddle-incomecountries.PublicHealthNutr2016;19:1339–47. [30] TranTD,HoltonS,NguyenH,FisherJ.Physicalgrowth:isitagoodindicatorof
[19] SudfeldCR,McCoyDC,DanaeiG,FinkG,EzzatiM,AndrewsKG,etal.Linear development in early childhood in low- and middle-income countries? BMC
growthandchilddevelopmentinlow-andmiddle-incomecountries:ameta- Pediatr2019;19:276.
analysis.Pediatrics2015;135:e1266–75. [31] Rubio-CodinaM,AttanasioO,Grantham-McGregorS.Mediatingpathwaysinthe
[20] Grantham-McGregorS,CheungYB,CuetoS,GlewweP,RichterL,StruppB,etal. socio-economic gradient of child development: evidence from children 6-42
Developmentalpotentialinthefirst5yearsforchildrenindevelopingcountries. monthsinBogota.IntJBehavDev2016;40:483–91.
Lancet2007;369:60–70. [32] WalkerSP,ChangSM,PowellCA,Grantham-McGregorSM.Effectsofearlychild-
[21] LuC,BlackMM,RichterLM.Riskofpoordevelopmentinyoungchildreninlow- hoodpsychosocialstimulationandnutritionalsupplementationoncognitionand
incomeandmiddle-incomecountries:anestimationandanalysisattheglobal, educationingrowth-stuntedJamaicanchildren:prospectivecohortstudy.Lancet
regional,andcountrylevel.LancetGlobHealth2016;4:e916–22. 2005;366:1804–7.
[22] BhopalS,RoyR,VermaD,KumarD,AvanB,KhanB,etal.Impactofadversityon [33] YousafzaiAK,Obradovi(cid:1)cJ,RasheedMA,RizviA,PortillaXA,Tirado-StrayerN,
earlychildhoodgrowth&developmentinruralIndia:findingsfromtheearlylife etal.Effectsofresponsivestimulationandnutritioninterventionsonchildren’s
stresssub-studyoftheSPRINGclusterrandomisedcontrolledtrial(SPRING-ELS). developmentandgrowthatage4yearsinadisadvantagedpopulationinPaki-
PLoSONE2019;14:e0209122.doi:10.1371/journal.pone.0209122. stan:alongitudinalfollow-upofacluster-randomisedfactorialeffectivenesstrial.
[23] LondonSchoolofHygieneandTropical Medicine.Spring(for themillennium LancetGlobHealth2016;4:e548–58.
developmentgoals):sustainableprogrammeincorporatingnutritionandgames [34] MokkinkLB,TerweeCB,PatrickDL,AlonsoJ,StratfordPW,KnolDL,etal.The
(formaximisingdevelopment,growthandsurvival)[Internet].clinicaltrials.gov; COSMINchecklistforassessingthemethodologicalqualityofstudiesonmeasure-
2017Aug[cited2020Dec19].ReportNo.:NCT02059863.Availablefrom:https:// mentpropertiesofhealthstatusmeasurementinstruments:aninternationalDel-
clinicaltrials.gov/ct2/show/NCT02059863 phistudy.QualLifeRes2010;19:539–49.
[24] BayleyBayleyN.Scalesofinfantandtoddlerdevelopment—thirdedition.Pearson
Clinical;2006.