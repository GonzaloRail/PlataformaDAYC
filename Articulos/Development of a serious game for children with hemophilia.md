Development of a Serious Game for children with
hemophilia
Roberta Mayumi Matsunaga, Regina Lúcia de Oliveira Márcia Aparecica Piccolotto Matta, Margareth Castro
Moraes, Marcos Augusto Francisco Borges Ozelo
Faculdade de Tecnologia IHTC ‘Cláudio L.P. Corrêa’, INCT do Sangue Hemocentro
Universidade Estadual de Campinas - Unicamp Universidade Estadual de Campinas - Unicamp
Limeira, Brazil Campinas, Brazil
robertamatsunaga@gmail.com marcia_apm@yahoo.com.br
{marcosborges, regina}@ft.unicamp.br margarethozelo@gmail.com
Abstract— This work describes the development process of This work describes the process of creating the interface of
the interface of an educational game that is aimed at children the educational game Hemotion. Hemotion intends to assist
with hemophilia. The development and evaluation process used children with the disease to obtain a better understanding
the dynamic Braindraw, Participatory Heuristic Evaluation and about hemophilia. The game will emphasize not only concepts
Beta Test and involved the end users of the game: children with about the nature of the disease, but also about how to deal with
hemophilia. The hypothesis is that children learn more about the risk situations that may aggravate the clinical state.
disease through the game, which motivates them in an interactive
practice. The experiments performed confirmed that the children The aim of this educational game is awareness, avoiding
with hemophilia learned more about the disease with the game. punishment for "errors". The game was consciously designed
that do not affect children negatively. Some important points
Keywords—Hemophilia; Serious Games; Braindaw; of the disease are discussed, such as practice of sports,
Participatory Heuristic Evaluation;Teste Beta. coagulation factors, presence of inhibitors, the importance of
the multidisciplinary team, etc.
Introduction
I. This is a multidisciplinary project that was developed in
the Laboratório de Informática, Aprendizagem e Gestão
Hemophilia is a disease that affects boys from birth, so it is
(Laboratory of Computer, Learning and Management) of The
fundamental that the child learns his limitation in order to
School of Technology along with the IHTC “Cláudio L. P.
have a healthy physical development. This requires special
Corrêa” from INCT do Sangue Hemocentro, both from the
care to avoid episodes of trauma that may compromise the
University of Campinas, in São Paulo, Brazil. The project
child when he becomes an adult. According to the Brazilian
developers have the assistance of the multidisciplinary team
Ministry of Healthy, there are more than 10,000 people with
from Hemocenter composed by doctors, physiotherapists,
hemophilia, registered in Brazil, and the country is the one
nurses, educators and psychologists.
with the third highest number of individuals with this disease
in the world [19]. The realization of the dynamics was approved by the
Ethics Committee in Research of the School of Medical
However, children who suffer from hemophilia do not
Sciences, UNICAMP (FCM / UNICAMP) in accordance with
have enough quality educational material on hemophilia and it
Resolution No. 196 /96 CONEP (National Committee for
is a problem to make these children conscious about their
Ethics in Research).
disease. In order to inform these children in a ludic and
motivational way, this project aimed to develop a prototype of This work is supported by a grant from the Novo Nordisk
an educational game, called Hemotion, with information about Haemophilia Foundation.
the disease. The purpose was to develop a game that could
work like an entertaining way to inform, enlighten and
HEMOPHILIA
encourage appropriate behaviors of children regarding to the II.
disease they will face throughout life.
Hemophilia is a hereditary bleeding disorder. Its recessive
Educational games should give to the player a critical inheritance is related to the X chromosome. As a consequence,
environment, providing a pleasant way to build their the disease affects almost exclusively males, while women
knowledge. The combination of computers with games has are, in most cases, asymptomatic carries of the gene that
become more efficient as it joins the benefits of educational causes hemophilia. The disease is caused by a deficiency of
games with the attractive power of computers [1]. the coagulation factor VIII or the factor IX. The lack of the
coagulation factor VIII characterizes the hemophilia and the
lack of the factor IX characterizes the hemophilia B [2].
978-1-4799-4823-9/14/$31.00 ©2014 IEEE
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore. Restrictions apply.

The main characteristic of hemophilia is bleeding, who suffered burns is immersed in a virtual reality while
especially in the joints and muscles, usually occasioned by receiving treatments. The aim of that game is to distract the
traumas. These bleedings, in several times, may cause muscle patient in this procedure that causes pain and discomfort;
and bones impairment, pain, osteoporosis, structural Packy And Marlon [7], Bronkie the Bronchiasaurus [8] and
deformities, functional limitation and, as a consequence, Re-Mission [5] are games developed to help childreen with
disability. In order to avoid bleedings, people who suffer from diabetes, asthma and cancer, respectively. These games help
hemophilia have many physical activity restrictions. children to understand the need of a serious self care and
provide knowledge to manage the self care in the treatment
As consequence, boys with hemophilia face many
routine. HemoAction Cards [9], HemoAction Games [10] and
difficulties due to their limitation in physical and recreational
MedPro Kids [11] are computational approaches to help
activities. There is also a need for frequent intravenous
children with hemophilia to know more about the disease and
administrations of the deficient coagulation factor, and this
its consequences.
procedure causes discomfort and pain.
Some of the games discussed above were evaluated and
Children with hemophilia need educational material to deal
they brought strong evidences that they are good approaches
with the questions concerning the disease. The game described
when the objective is to help patients to know more about the
in this paper, will teach properly behaviors and self-care
disease and the treatment. These evaluation studies show that
management to those who suffer from hemophilia. This
the children were able to learn more about the diseases by
category of games, which intends to support learning, is called
playing these educational games.
Serious Games. The development of educational materials,
especially in a playful and interactive way, can be an
construction of the interface -
important tool to help the patient to understand, accept and IV.
participate in issues related to the disease.
implementation of dynamics
SERIOUS GAMES AND The original idea of having a game for children with
III.
hemophilia came from a child having this disease. At the start
RELATED WORKS of the game development process, developers have identified
the need to involve end users - children with hemophilia,
Ludic has lots of influence upon the growth of a child.
including the mastermind in the construction and evaluation of
There are many benefits, such as: learn, make decisions,
the interface. The involvement of end users in the
stimulate the curiosity, increase pro-activeness and self-
development of the design of a computer system is called
reliance, verbal and corporal language development, and
Participatory Design [12]. Participatory Design is a
increase of the concentration [3]. Due to its characteristics and
methodology that includes end users of a computer system in
benefits, games can be considered a powerful educational tool. the process of developing the interface [12]. It is a set of
theories, practices and studies that aim to support direct end
Games with goals of entertain and educate are called
user involvement in different stages of preparation of the
Serious Games [4]. Although there is no precise definition for
design. It is based on a democratic work environment and it is
it, Serious Games aim to stimulate practical day-by-day
seen as a potentially positive approach to improve the
situations. This kind of game intends to provide the training of
inclusive design [13].
professionals, making decision in critical situations as well as
the awareness of children, youth and adults, in the education As described above, Participatory Design can be used at
of specific topics. Serious Games use the well-known strategy different times of a project from problem identification to
of the game industry to turn the everyday simulations more design detailing [14]. Throughout the project, participatory
attractive. At the same time it aims to stimulate the learning design techniques can be used to help the project developers to
and the construction of concepts. know the desires and needs of the user. Moreover, users have
the opportunity to rethink on their work process. There are
The medical field, since the 80s, makes use of games to get
many techniques that promote participatory design. Each
better results in physical rehabilitation and patient adherence
project has its particularity and specificity: it is up to the
to treatment [5]. Some patients might be reckless during the
project developers to study the need, or not, of using
treatment; therefore, according to Kato [5], games can be used
participatory design techniques.
strategically to help them out to become more aware about the
treatment. The patient may fail to correctly perform the In this project we chose to perform three dynamics with
treatment for different reasons. The most commons ones are the involvement of children with hemophilia in school and
pain and discomfort (for example: chemotherapy) and not preschool age. The dynamics were designed to bring the child
motivating performing tasks (as examples: taking pills and
with hemophilia for the development of the game interface
doing physical exercise at pre-determined schedules). To
and catch their wishes related to the game. The dynamics were
properly perform the procedures prescribed, the patient has to
entitled Braindraw, Participatory Heuristic Evaluation (AHP)
be motivated and engaged in the treatment. The Hemotion,
and Beta Test, and all of them were attended with the
game presented in this text, was designed to motivate and
participation of children with hemophilia who were observed
engage the children in the treatment.
by a multidisciplinary group involving professionals of
There are many games developed to help patients in the Health, Education and Computing Science.
self care process. SnowWorld [6] is an example: the individual
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore. Restrictions apply.

The following subsections present the first dynamic based
on Braindraw (Subsection A), the second dynamic based on
AHP (Subsection B) and, finally, the last dynamic based on
Beta Testing (Subsection C).
A. Braindraw
BrainDraw is a participatory prototyping dynamic. This is
| a  dynamic    | made         | in   | molds  of    | brainstorming  |     | round-robin        |           |     |
| ------------- | ------------ | ---- | ------------ | -------------- | --- | ------------------ | --------- | --- |
| system        | (tournament  | or   | competition  | where          |     | each  participant  |           |     |
| faces  every  | other        | for  | the  same    | number         | of  | times).            | In  this  |     |
technique, the user can draw what is on his mind without
receiving criticism [15]. The need for conducting dynamic
| structure  | is  simple.  | Pencils,  | pens,  | paper,  | etc  | are  | required.  |     |
| ---------- | ------------ | --------- | ------ | ------- | ---- | ---- | ---------- | --- |
Tables or seats placed in a circle can be used, so the users can
change seats or change the paper sheets.

| The  | Braindraw  | dynamic  | was  | made  | as  | follows:  | each  |     |
| ---- | ---------- | -------- | ---- | ----- | --- | --------- | ----- | --- |
participant performed an initial design on a blank sheet. After  Fig. 1.  Selection of some dynamic elements to build the main character.
a predetermined period of time, each participant passed along

their sheet to the participant on his left and, in return, received
the drawing of the participant on his right. The participant  The drawing in the center of the Fig. 2 is the element that
should then complement the design received. At the end of a  inspired the coagulation factor, mostly the drop format and the
| set period of time, the participant repeated the transition of  |     |     |     |     |     |     |     | belt.  |
| --------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------ |
sheets. This procedure is repeated until all participants had
In Fig. 3, we see another example of children contribution.
drawn on all sheets, which characterizing the round-robin. At
The contribution came from the round scenario: the children
the end, all participants selected democratically the drawing
were asked to imagine how would be the game scenario. One
that most pleases them. With the selected drawing in hand,
of the children drew the scenarios based on a blood vessel,
participants performed a final version.
including other elements such as the Coagulation Factor and
The dynamics was performed in a treatment center for  Inhibitor. This scenario has being used at some stages of the
| blood disorders, including hemophilia. Ten children attended   |     |     |     |     |     |     |     | game.  |
| -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------ |
the dynamic and they were divided into two groups. The first

| group,  included  |     | five  | children  | aged  | between  | 9  to13  | years  |     |
| ----------------- | --- | ----- | --------- | ----- | -------- | -------- | ------ | --- |
(mean age 10.8 years). The second one included five children
aged between 5 to 8 years (mean age 6.4 years) [16].
| To  | contextualize  |     | the  children  |     | with  | hemophilia,  | the  |     |
| --- | -------------- | --- | -------------- | --- | ----- | ------------ | ---- | --- |
developers proposed the following situation : " You are in
front of a computer. On the screen you have a game with a
character with hemophilia. You can move your character and
help him to make the right decisions. The character will face
problems related to the disease throughout the game. You
should guide him to choose the best way. "
| After     | contextualizing  |           | the  dynamic,  |          | and    | holding   | all  the  |     |
| --------- | ---------------- | --------- | -------------- | -------- | ------ | --------- | --------- | --- |
| material  | available        | (sheet    | of  white      | paper,   |        | pencils,  | colored   |     |
| pencils,  | crayons,         | eraser),  | the            | dynamic  | began  | and       | it  was   |     |
divided into four rounds: Main Character, the Coagulation

| Factor,  | the  Inhibitor  |     | and  Game’s  | Scenario.  |     | Each  | round  |     |
| -------- | --------------- | --- | ------------ | ---------- | --- | ----- | ------ | --- |
provided elements that were considered for the development  Fig. 2.  Compilation of some results for the dynamic formation of Coagulation
| of  the  whole  |     | game  | interface  [16].  | Fig.  | 1,  | 2  and  | 3  show  | Factor.  |
| --------------- | --- | ----- | ----------------- | ----- | --- | ------- | -------- | -------- |
examples of contributions made in the dynamics.

| Fig. 1 illustrates the proposed elements for the construction  |       |             |      |                 |     |              |     |     |
| -------------------------------------------------------------- | ----- | ----------- | ---- | --------------- | --- | ------------ | --- | --- |
| of  the                                                        | Main  | Character.  | The  | characteristic  |     | of  element  | 1   |     |
provided the skin color of the character - the constructed
character (element 5) has dark skin. The element 2, provided
the shape of the rounded eyes. From the element 3 it was
inspired the model and color of clothing, green shirt and blue
shorts. Finally, from the element 4 it was inspired the physical
type.

Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore.  Restrictions apply.

sequence of the game, which was only detected in the dynamic
AHP. In the analyzed version of the game, if the child did not
choose to take the Coagulation Factor, and then choose to play
football or play catch-up, the main character get hurt and he is
directed to the Factor Game, a game in which the Coagulation
Factor enters in action to treat bleeding. This sequence of the
game can be viewed in Fig. 4.
When one child realized that if he chose not to take factor
and even so chose to play football, he would be directed to the
factor’s game, he told the others to do the same: “Cool, do not
take factor and play football. You will play the factor’s
game!”. And so it was. All the others followed that example
and considered funny and commented: “I want to do it, too.”
The game developers concluded that the sequence shown led
to an inappropriate conclusion. They felt “rewarded” by not
following a proper attitude.
When the character takes no factor and plays football /
catch-up the game displays the image in Fig. 5. Children, in
general, expressed feelings of shame and apologized to the
Fig. 3. Compilation of some results for the dynamic formation of a Game
Scenario. character. One child was sad and scared to see the image. The
other children used phrases like, "Poor", "Sorry".
B. Participatory Heuristic Evaluation
The development of the first version of the interface was
performed with the aid of end users of the game. Similarly, the
developers chose to follow the same approach evaluate the
game. Another dynamic was carried out with children that
allowed developers to know how friendly and usable the game
interface was.
The methodology used was the Participatory Heuristic
Evaluation (AHP). AHP can measure the usability of a system
through the use of specific rules with the participation of end
users. It's a cheap, quick and effective technique to evaluate
the interface of a system [13]. It is noteworthy that usability is
the term used to define the practicality and convenience with
which people access a system, service or product [17]. The
evaluation is based on recognized principles of systems
interfaces. These principles are called heuristics.
Muller [13] defined a list of heuristics that are subject to
review during the Heuristic Evaluation. The titles of the
selected group of heuristics is ' System Status ', ' User control
and freedom ', ' Consistency and relevance ', ' Tasks and Fig. 4. Following the game performed incorrectly.
supporting the work '.
Six children from 5 to 10 years old participated in the AHP
dynamic (mean age 7.1 years) [16]. To conduct the dynamic
AHP, the project developers gave the same context that was
used in the dynamic Braindraw. Following the explanations,
each children had access to the game Hemotion in a laptop.
During the dynamic, the observers analyzed the interaction
of the children with the game and were able to make notes on
behaviors observed. Another positive point of the dynamic
was a questionnaire completed at the end. In this
questionnaire, the children that were part of the dynamic could
give their opinion about what they liked and did not like in the
game.
This work shows two major points observed during the
second dynamic. The first is an unexpected behavior in the
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore. Restrictions apply.

assure their quality, reliability, compliance, etc. Some of this
tests are: Unit Testing, Integration Testing, Validation Testing,
Systemic tests, and others. At this stage of the game validation
|     |     |     |     | process  | with  | the  users,  | the  | project  | considered  |     | the  most  |
| --- | --- | --- | --- | -------- | ----- | ------------ | ---- | -------- | ----------- | --- | ---------- |
appropriate is the Validation Testing. According to Pressman
[18], validation tests are those performed to confirm that the
system complies with the user requirements.
When performing validation tests, one can perform two
|     |     |     |     | types  of  | tests:  | alpha  | and  beta  | testing.  | The         | alpha  | test  is   |
| --- | --- | --- | --- | ---------- | ------- | ------ | ---------- | --------- | ----------- | ------ | ---------- |
|     |     |     |     | conducted  | where   | the    | software   | was       | developed,  |        | with  the  |
participation of the developer. The beta test is conducted in the
user place and without the participation of the developer. Due
to restrictions on attendance of end users, the project only
made use of the Beta testing.

The latest dynamic required a different approach, counting
Fig. 5.  Character with a bruised knee.  on children with and without hemophilia. A total of 18 kids
aged 5 to 8 years old participated on Beta Test, but just three

|     |     |     |     | of  them  | had  hemophilia.  |     | The  | result  | of  this  | dynamic  | was  |
| --- | --- | --- | --- | --------- | ----------------- | --- | ---- | ------- | --------- | -------- | ---- |
Children emphasized in the AHP that the game becomes  crucial to the project because it was possible to check what is
more interesting the more mini-games it has. Fig. 6 shows  the  understanding  that  a  child  who  is  not  a  carrier  of
some  of  the  mini-games  built  to  make  the  game  more  hemophilia had on the disease after playing Hemotion.
interesting and motivating.
|     |     |     |     | Beta  | Test  | aimed  | at  detecting  | faults  | and  | errors  | while  |
| --- | --- | --- | --- | ----- | ----- | ------ | -------------- | ------- | ---- | ------- | ------ |
Some other points were identified and were corrected by  running the game. The observers were also able to check on
the development team. A new version of the game was built  the child's interaction with the game. Such dynamics showed
trying to solve the questions of the dynamic. This new version  that children learned the necessary care for hemophilia and the
was evaluated in dynamic Beta test. Fig. 6 shows some of the  need  for  factor  infusion  to  prevent  and/or  treat  bleeding
| mini-games  | built  to  make  | the  game  more  | interesting  and  | episodes.  |     |     |     |     |     |     |     |
| ----------- | ---------------- | ---------------- | ----------------- | ---------- | --- | --- | --- | --- | --- | --- | --- |
motivating.

All items observed were analyzed by the multidisciplinary
development team and some functionalities of the game were  D. The Hemotion Screenplay
restructured.
|     |     |     |     | A  child     | with  | hemophilia   |      | who  uses  | the  | game,      | will  be  |
| --- | --- | --- | --- | ------------ | ----- | ------------ | ---- | ---------- | ---- | ---------- | --------- |
|     |     |     |     | responsible  | for   | the  health  | and  | welfare    | of   | character  | with      |

hemophilia. The child with hemophilia should assume the role
|     |     |     |     | of  'caregiver'  |     | of  the  | character  | with  | hemophilia.  |     | It  is  not  |
| --- | --- | --- | --- | ---------------- | --- | -------- | ---------- | ----- | ------------ | --- | ------------ |
intended that the player feel like a "player in first-person",
thinking the character as himself. During the game, the player
|     |     |     |     | will  have  | to  | help  the  | main  | character  | to  | take  | the  most  |
| --- | --- | --- | --- | ----------- | --- | ---------- | ----- | ---------- | --- | ----- | ---------- |
appropriate action, playing the role of 'guardian'. The player
will help the character as a tutor, showing the best way in
|     |     |     |     | making  | decisions  | among  | the  | ones  | displayed.  | Each  | stage  |
| --- | --- | --- | --- | ------- | ---------- | ------ | ---- | ----- | ----------- | ----- | ------ |
represents a day of the week in the life of the character, in
order to conduct primary prophylaxis in three days of the
week. The player will decide whether or not the character will
take clotting factor and the course of the game depends on the
attitude taken by the character.
|     |     |     |     | Some  | mini-games  |     | are  included  | in  | the  | Hemotion.  | The  |
| --- | --- | --- | --- | ----- | ----------- | --- | -------------- | --- | ---- | ---------- | ---- |
player has a stronger interaction with the system in those mini-
|     |     |     |     | games.  | Examples  | of  | mini-games  | are:  | Puzzle,  | swimming,  |     |
| --- | --- | --- | --- | ------- | --------- | --- | ----------- | ----- | -------- | ---------- | --- |
soccer and marbles (Fig. 6).

| Fig. 6.  Mini Games of Hemotion  |     |     |     |     |     |     | Conclusion  |     |     |     |     |
| -------------------------------- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- |
V.

As described in previous sections, the game design was
based on drawings made by children with hemophilia during
C. Beta Test
dynamic Braindraw and were evaluated by dynamic AHP and
| Within the concepts of  |     | software engineering, there are  |     |     |     |     |     |     |     |     |     |
| ----------------------- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Beta Testing. It is expected that children have identification
many types of tests that are performed on a product in order to  with the design, since they participate in the software design.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore.  Restrictions apply.

The experience of using dynamics involving children with [8] LIEBERMAN, D. A. “Management of chronic pediatric diseases with
hemophilia during the development of the game was positive. interactive health games: Theory and research findings”. Journal of
Ambulatory Care Management, v. 24, n. 1, p. 26–38. 2001.
The use of three dynamic, in the same project, was an original
[9] WORLD FEDERATION OF HEMOPHILIA. Available in:
proposal of this work. The results were interesting, and may
http://www.wfh.org/en/page.aspx?pid=899. Last Access
be adopted as a framework for other development projects of
september/2012a
educational games for children with various diseases.
[10] WORLD FEDERATION OF HEMOPHILIA. Available in:
http://www.wfh.org/en/page.aspx?pid=899. Last Access
september/2012b
References
[11] MEDPRO. Available in http://www.medprokids.com/index-flash.html.
Last Access em november/2012.
[1] Moratori, P. B. “Por que utilizar jogos educativos no processo de ensino [12] Walsh, G. (2010) “Developing DisCo: A distributed co-design, on-line
aprendizagem?” UNIVERSIDADE FEDERALDO RIO DE JANEIRO. tool”, HCIL-2010-18 [Relatório Técnico]. College Park, MD: Human-
2003. Computer Interaction Lab.
[2] Nunes, A. A. et al.. (2009) “Qualidade de vida de pacientes hemofílicos [13] Muller, M. J.; Matheson, L.; Page, C.; Gallup, R. “Methods & tools:
acompanhados em ambulatório de hematologia”. Revista Brasileira de participatory heuristic evaluation”. Interactions, v.5, n.5, p.13-18. 1998.
Hematologia e Hemoterapia. v.31, n.6, p. 406-407. [14] Melo, A. M.; Baranauskas, M.C.C. “Design para a Inclusão: Desafios e
[3] VYGOTSKY, L. S., 1989. “O papel do brinquedo no desenvolvimento. Proposta”. Anais do IHC. Natal, RN. p. 19-22. 2006.
In: A formação social da mente”. Ed. Martins Fontes, São Paulo, Brazil. [15] Landauer, T. K. and Prabhu, P. V. (1998) “Handbook of Human-
[4] SUSI, T., JOHANNESON, M., BACKLUND, P., 2007. “Serious games Computer Interaction”, New York, NY, USA: Elsevier Science Inc.,
– An overview”. Technical report: HIS-IKI-TR-07-001, University of 1998.
Skövde, Sweden. [16] Matsunaga, R. M. ;Matta, M. A. P.;Ozelo, M. C. ;Borges, M. A. F.
[5] KATO, P. M. et al., 2008. “A video game improves behavioral outcomes “Developing a serious game for children with hemophilia”. IADIS
in adolescents and young adults with cancer: A randomized tria”l. In International Journal on WWWInternet, v. 11, p. 12-29, 2013.
Pediatrics. Vol. 122, pp. 305–317. [17] Chen, S. Y., & Macredie R. D. (2005) “The assessment of usability of
[6] HOFFMAN, H. G. et al. “Virtual reality as an adjunctive non- electronic shopping: A heuristic evaluation”. International journal of
pharmacologic analgesic for acute burn pain during medical Information Management, 25, 516-32.
procedures”. Annals of Behavioral Medicine. v. 41, n. 2, p. 183–191. [18] Pressman, R. S. “Software Engineering: A Practitioner’s Approach”.
2011. MacGraw-Hill Higher Education. Quinta edição. p. 482 - 483. 2000.
[7] LIEBERMAN D. A. “Health Education Video Games for Children and [19] Ministério da Saúde. “Perfil das Coagulopatias Hereditárias no Brasil
Adolescents: Theory, Design and Research Findings”. International 2009-2010 Série G”. Estatística e Informação em Saúde. Available in:
Communications Association. Jerusalem, 1998. http://www.saude.gov.br/editora. Last Access: march/2013.
Authorized licensed use limited to: Universidad Internacional de La Rioja (UNIR). Downloaded on May 26,2026 at 22:22:30 UTC from IEEE Xplore. Restrictions apply.