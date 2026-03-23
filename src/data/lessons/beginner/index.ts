import { LessonsByUnit } from '../types';

/**
 * BEGINNER LEVEL LESSONS
 *
 * Grammar-only lessons organized by unit (1-14)
 * Based on Headway Beginner Student's Book (5th ed.) contents/topics
 */

export const beginnerLessons: LessonsByUnit = {
  // Unit 1 Lessons
  1: [
    {
      id: 1,
      unitId: 1,
      title: 'am/is',
      description: 'Forms of be',
      icon: '🔤',
      slug: 'am-is',
      content: `
# am / is

## Use
Use **am** and **is** with the verb **be** to talk about identity, age, jobs, feelings, and where someone is.

## Subject + be
- **I am**
- **he is**
- **she is**
- **it is**

## Examples
- I am Maria.
- He is a teacher.
- She is happy.
- It is cold today.

## Negative
Add **not** after the verb:
- I am not tired.
- He is not at home.
- She isn't from Spain.

## Questions
Put the verb before the subject:
- Am I late?
- Is he English?
- Is she in class?

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
    {
      id: 2,
      unitId: 1,
      title: 'my/your',
      description: 'Possessive adjectives for I and you',
      icon: '👤',
      slug: 'my-your',
      content: `
# my / your

## Use
**my** and **your** are possessive adjectives. They show who something belongs to.

## Forms
- **my** = belongs to me
- **your** = belongs to you

## Examples
- My name is Alex.
- My book is new.
- Is your teacher nice?
- What is your phone number?

## Rule
A possessive adjective comes **before a noun**:
- my friend
- your bag
- your class

## Common mistake
Do not say:
- ❌ This is book my.
Say:
- ✅ This is my book.

      `,
      difficulty: 'easy',
      estimatedTime: 6,
    },
    {
      id: 3,
      unitId: 1,
      title: 'this-is',
      description: 'This is ... for introducing people and things',
      icon: '👉',
      slug: 'this-is',
      content: `
# This is ...

## Use
Use **This is ...** to introduce a person or identify a thing near you.

## Examples
- This is Anna.
- This is my friend.
- This is our classroom.
- This is my bag.

## Negative
- This isn't my pen.
- This isn't John.

## Questions
- Is this your teacher?
- Is this seat free?

## Short answers
- Yes, it is.
- No, it isn't.

      `,
      difficulty: 'easy',
      estimatedTime: 7,
    },
    {
      id: 4,
      unitId: 1,
      title: 'how-are-you',
      description: 'Questions with be about feelings and condition',
      icon: '💬',
      slug: 'how-are-you',
      content: `
# How are you?

## Use
Use **How are you?** to ask about a person's feelings or condition.

## Examples
- How are you?
- I'm fine, thanks.
- I'm very well.
- I'm tired today.

## More questions with be
- How is your mother?
- How is your class?
- How are the children?

## Answers
Use **be** in the answer:
- She's fine.
- They're OK.
- I'm not bad, thanks.

      `,
      difficulty: 'easy',
      estimatedTime: 6,
    },
  ],

  // Unit 2 Lessons
  2: [
    {
      id: 5,
      unitId: 2,
      title: 'he/she',
      description: 'Subject pronouns',
      icon: '👥',
      slug: 'he-she',
      content: `
# he / she

## Use
**he** and **she** are subject pronouns.

- **he** = a man or boy
- **she** = a woman or girl

## Examples
- He is from Brazil.
- She is a doctor.
- He works in an office.
- She lives in Rome.

## Why use pronouns?
Pronouns replace names:
- Mark is a student. **He** is 19.
- Emma is my friend. **She** is very funny.

      `,
      difficulty: 'easy',
      estimatedTime: 7,
    },
    {
      id: 6,
      unitId: 2,
      title: 'his/her',
      description: 'Possessive adjectives',
      icon: '👜',
      slug: 'his-her',
      content: `
# his / her

## Use
**his** and **her** are possessive adjectives.

- **his** = belongs to him
- **her** = belongs to her

## Examples
- His name is Leo.
- Her name is Sara.
- His car is old.
- Her house is beautiful.

## Rule
Put **his / her** before a noun:
- his job
- her sister
- his phone
- her country

      `,
      difficulty: 'easy',
      estimatedTime: 7,
    },
    {
      id: 7,
      unitId: 2,
      title: 'questions-with-be',
      description: 'Yes/No and Wh- questions with be',
      icon: '❓',
      slug: 'questions-with-be',
      content: `
# Questions with be

## Yes/No questions
Put **am / is / are** before the subject:
- Is he from Italy?
- Is she married?
- Are you tired?

## Short answers
- Yes, he is.
- No, she isn't.
- Yes, they are.
- No, I’m not.

## Wh- questions
Use a question word + be:
- Where is he from?
- What is her job?
- How old are you?
- Who is she?

## Rule
Question order:
**Question word + be + subject**
or
**Be + subject** for yes/no questions.

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
  ],

  // Unit 3 Lessons
  3: [
    {
      id: 8,
      unitId: 3,
      title: 'negatives-he-she-isnt',
      description: 'Negative sentences with he/she',
      icon: '🚫',
      slug: 'negatives-he-she-isnt',
      content: `
# Negatives - he/she isn't

## Use
Use **isn't** or **is not** to make negative sentences with **he / she / it**.

## Examples
- He isn't American.
- She isn't at work.
- It isn't new.

## Full and short forms
- He is not late. / He isn't late.
- She is not a student. / She isn't a student.

## Rule
After **isn't**, use:
- an adjective: She isn't tired.
- a noun: He isn't a teacher.
- a place: It isn't in the bag.

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
    {
      id: 9,
      unitId: 3,
      title: 'questions-short-answers',
      description: 'Questions and short answers with be',
      icon: '💭',
      slug: 'questions-short-answers',
      content: `
# Questions and short answers

## Yes/No questions
Put **be** before the subject:
- Is he married?
- Is she from Spain?
- Are they students?

## Short answers
- Yes, he is.
- No, he isn't.
- Yes, they are.
- No, they aren't.

## Rule
Do not repeat the whole sentence in the answer. Use a short answer:
- ✅ Is she nice? Yes, she is.
- ❌ Is she nice? Yes, she is nice.

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
    {
      id: 10,
      unitId: 3,
      title: 'negatives-im-not-theyre-arent',
      description: 'Negative forms with I, we, you, they',
      icon: '🙅',
      slug: 'negatives-im-not-theyre-arent',
      content: `
# Negatives - I'm not, they/we/you aren't

## Use
Use these negative forms with the verb **be**:
- **I'm not**
- **you aren't**
- **we aren't**
- **they aren't**

## Examples
- I'm not hungry.
- You aren't late.
- We aren't at home.
- They aren't teachers.

## Full forms
- I am not
- You are not
- We are not
- They are not

## Rule
Use **aren't** with **you / we / they**.

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
  ],

  // Unit 4 Lessons
  4: [
    {
      id: 11,
      unitId: 4,
      title: 'possessive-adjectives',
      description: 'my, your, his, her, our, their',
      icon: '🧩',
      slug: 'possessive-adjectives',
      content: `
# Possessive adjectives

## Use
Possessive adjectives show who something belongs to.

## Forms
- my
- your
- his
- her
- our
- their

## Examples
- My family is big.
- Your brother is funny.
- His job is interesting.
- Her children are young.
- Our house is small.
- Their car is new.

## Rule
Use a possessive adjective before a noun:
- our parents
- their friends
- his sister

      `,
      difficulty: 'easy',
      estimatedTime: 9,
    },
    {
      id: 12,
      unitId: 4,
      title: 'possessive-s',
      description: 'Possessive ’s',
      icon: '🔑',
      slug: 'possessive-s',
      content: `
# Possessive 's

## Use
Use **'s** to show possession with people.

## Examples
- Anna's book
- Tom's sister
- my father's car
- the teacher's desk

## Singular and plural
- one person: **John's**
- two people together: **my parents' room** (apostrophe after plural **s**)

## Compare
- **John's car** = the car of John
- **his car** = a possessive adjective form

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
    {
      id: 13,
      unitId: 4,
      title: 'common-verbs-have-has-love-like-work',
      description: 'Common verbs in the present simple',
      icon: '💼',
      slug: 'common-verbs-have-has-love-like-work',
      content: `
# Common verbs: have / has, love, like, work

## have / has
Use:
- **I/you/we/they have**
- **he/she/it has**

## Examples
- I have two sisters.
- She has a new job.
- They have a big house.

## love / like / work
- I like coffee.
- He loves football.
- She works in a bank.

## Rule
With **he / she / it**, add **-s** to most verbs:
- like → likes
- work → works
- love → loves

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
  ],

  // Unit 5 Lessons
  5: [
    {
      id: 14,
      unitId: 5,
      title: 'present-simple-positive',
      description: 'Present Simple positive with I/you/we/they',
      icon: '✅',
      slug: 'present-simple-positive',
      content: `
# Present Simple positive - I / you / we / they

## Use
Use the present simple for:
- routines
- likes and habits
- facts

## Form
**Subject + base verb**
- I like music.
- You live in Madrid.
- We speak English.
- They play tennis.

## Time expressions
- every day
- on Fridays
- in the morning

## Rule
With **I / you / we / they**, use the base form of the verb.

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
    {
      id: 15,
      unitId: 5,
      title: 'present-simple-negative',
      description: "Present Simple negative with don't",
      icon: '🚫',
      slug: 'present-simple-negative',
      content: `
# Present Simple negative

## Form
**Subject + don't + base verb**

## Examples
- I don't like tea.
- You don't work on Sundays.
- We don't live in London.
- They don't play golf.

## Rule
After **don't**, use the **base form** of the verb:
- ✅ don't like
- ❌ don't likes

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 16,
      unitId: 5,
      title: 'present-simple-questions',
      description: 'Questions with do',
      icon: '❓',
      slug: 'present-simple-questions',
      content: `
# Present Simple questions - I / you / we / they

## Form
**Do + subject + base verb?**

## Examples
- Do you like pizza?
- Do they live near here?
- Do we have class today?

## Short answers
- Yes, I do. / No, I don't.
- Yes, they do. / No, they don't.

## Rule
Use **do** to make questions with **I / you / we / they**.

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
  ],

  // Unit 6 Lessons
  6: [
    {
      id: 17,
      unitId: 6,
      title: 'present-simple-he-she',
      description: 'Present Simple with he/she/it',
      icon: '🧠',
      slug: 'present-simple-he-she',
      content: `
# Present Simple - he / she / it

## Form
With **he / she / it**, add **-s** or **-es** to the verb.

## Examples
- He works in a shop.
- She likes jazz.
- It rains a lot here.

## Spelling
- go → goes
- watch → watches
- study → studies

## Rule
The third person singular is special. It needs **-s / -es / -ies**.

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
    {
      id: 18,
      unitId: 6,
      title: 'adverbs-of-frequency',
      description: 'always, usually, sometimes, never',
      icon: '🔁',
      slug: 'adverbs-of-frequency',
      content: `
# Adverbs of frequency

## Common adverbs
- always
- usually
- often
- sometimes
- never

## Position
These adverbs usually come **before the main verb**:
- I usually get up at 7.
- She never drinks coffee.

With **be**, they come **after be**:
- He is always late.
- We are often tired.

## Use
Use them to say how often something happens.

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 19,
      unitId: 6,
      title: 'questions-negatives-he-she',
      description: "Questions and negatives with does/doesn't",
      icon: '🗣️',
      slug: 'questions-negatives-he-she',
      content: `
# Questions and negatives - he / she / it

## Negative form
**he/she/it + doesn't + base verb**
- He doesn't smoke.
- She doesn't work here.

## Question form
**Does + he/she/it + base verb?**
- Does he play tennis?
- Does she live with her parents?

## Short answers
- Yes, he does. / No, he doesn't.
- Yes, she does. / No, she doesn't.

## Important rule
After **does / doesn't**, use the **base verb**:
- ✅ Does she work?
- ❌ Does she works?

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
  ],

  // Unit 7 Lessons
  7: [
    {
      id: 20,
      unitId: 7,
      title: 'question-words',
      description: 'What, where, when, who, why, how',
      icon: '🧭',
      slug: 'question-words',
      content: `
# Question words

## Main question words
- **What** = thing / information
- **Where** = place
- **When** = time
- **Who** = person
- **Why** = reason
- **How** = method / condition

## Examples
- What is your name?
- Where do you live?
- When do you start work?
- Who is that?
- Why are you tired?
- How do you go to school?

      `,
      difficulty: 'easy',
      estimatedTime: 9,
    },
    {
      id: 21,
      unitId: 7,
      title: 'pronouns-subj-obj-poss',
      description: 'Subject, object, and possessive pronouns',
      icon: '👥',
      slug: 'pronouns-subj-obj-poss',
      content: `
# Pronouns - subject, object, possessive

## Subject pronouns
I, you, he, she, it, we, they

## Object pronouns
me, you, him, her, it, us, them

## Possessive adjectives
my, your, his, her, its, our, their

## Examples
- She likes him.
- They help us.
- This is my bag.
- Is that their house?

## Compare
- **She** is my friend. (subject)
- I know **her**. (object)
- **Her** car is blue. (possessive adjective)

      `,
      difficulty: 'medium',
      estimatedTime: 12,
    },
    {
      id: 22,
      unitId: 7,
      title: 'this-and-that',
      description: 'this/that and these/those',
      icon: '👉',
      slug: 'this-and-that',
      content: `
# this and that

## Singular
- **this** = near
- **that** = far

## Plural
- **these** = near
- **those** = far

## Examples
- This is my pen.
- That is your coat.
- These are my shoes.
- Those are their bags.

## Use
Use these words to point to people or things.

      `,
      difficulty: 'easy',
      estimatedTime: 8,
    },
  ],

  // Unit 8 Lessons
  8: [
    {
      id: 23,
      unitId: 8,
      title: 'there-is-there-are',
      description: 'Describing places with there is / there are',
      icon: '🏠',
      slug: 'there-is-there-are',
      content: `
# There is / There are

## Use
Use **there is** and **there are** to say that something exists.

## Forms
- **There is** + singular noun
- **There are** + plural noun

## Examples
- There is a sofa in the living room.
- There is an old church in the town.
- There are two bedrooms upstairs.
- There are lots of cafés near here.

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 24,
      unitId: 8,
      title: 'there-isnt-there-arent',
      description: 'Negative and question forms',
      icon: '🚪',
      slug: 'there-isnt-there-arent',
      content: `
# There isn't / There aren't

## Negative
- There isn't a TV in the kitchen.
- There aren't any shops near my house.

## Questions
- Is there a bank near here?
- Are there any parks in your town?

## Short answers
- Yes, there is. / No, there isn't.
- Yes, there are. / No, there aren't.

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 25,
      unitId: 8,
      title: 'prepositions-of-place',
      description: 'in, on, under, next to, between, opposite',
      icon: '📍',
      slug: 'prepositions-of-place',
      content: `
# Prepositions of place

## Common prepositions
- in
- on
- under
- next to
- between
- behind
- in front of
- opposite

## Examples
- The keys are on the table.
- The cat is under the chair.
- The bank is next to the supermarket.
- The pharmacy is opposite the café.

## Use
Prepositions of place show where a person or thing is.

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
  ],

  // Unit 9 Lessons
  9: [
    {
      id: 26,
      unitId: 9,
      title: 'was-were-born',
      description: 'Past forms of be and be born',
      icon: '👶',
      slug: 'was-were-born',
      content: `
# was / were born

## Past of be
- I / he / she / it **was**
- you / we / they **were**

## Examples
- I was tired yesterday.
- They were at home last night.
- She was born in 2004.
- We were born in different countries.

## Questions
- Where were you born?
- Was he born in May?

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 27,
      unitId: 9,
      title: 'past-simple-irregular',
      description: 'Common irregular verbs in the past',
      icon: '📅',
      slug: 'past-simple-irregular',
      content: `
# Past Simple - irregular verbs

## Use
Use the past simple for finished actions in the past.

## Irregular verbs
These verbs do not add **-ed**:
- go → went
- have → had
- see → saw
- do → did
- come → came
- eat → ate

## Examples
- I went to Rome last year.
- She had breakfast at 7.
- We saw a good film.
- They came home late.

## Rule
You must learn irregular past forms individually.

      `,
      difficulty: 'medium',
      estimatedTime: 14,
    },
  ],

  // Unit 10 Lessons
  10: [
    {
      id: 28,
      unitId: 10,
      title: 'past-simple-regular-and-irregular',
      description: 'Past Simple forms and usage',
      icon: '🕰️',
      slug: 'past-simple-regular-and-irregular',
      content: `
# Past Simple - regular and irregular verbs

## Use
Use the past simple for completed actions in the past.

## Regular verbs
Add **-ed**:
- work → worked
- play → played
- visit → visited

## Irregular verbs
- go → went
- have → had
- see → saw

## Examples
- I worked on Saturday.
- They visited Paris.
- She went out last night.

      `,
      difficulty: 'medium',
      estimatedTime: 14,
    },
    {
      id: 29,
      unitId: 10,
      title: 'past-simple-questions-negatives',
      description: 'Questions and negatives with did',
      icon: '❔',
      slug: 'past-simple-questions-negatives',
      content: `
# Questions and negatives in the past simple

## Negative
**Subject + didn't + base verb**
- I didn't go out.
- She didn't watch TV.

## Questions
**Did + subject + base verb?**
- Did you enjoy the party?
- Did he call you?

## Short answers
- Yes, I did. / No, I didn't.
- Yes, they did. / No, they didn't.

## Important rule
After **did / didn't**, use the **base form**:
- ✅ Did she go?
- ❌ Did she went?

      `,
      difficulty: 'medium',
      estimatedTime: 12,
    },
    {
      id: 30,
      unitId: 10,
      title: 'time-expressions-ago',
      description: 'Time expressions with the past',
      icon: '⌛',
      slug: 'time-expressions-ago',
      content: `
# Time expressions and ago

## Common past time expressions
- yesterday
- last night
- last week
- last year
- on Monday
- in 2020

## ago
Use **ago** to count back from now:
- two days ago
- a week ago
- ten years ago

## Examples
- I saw him yesterday.
- We moved here three months ago.

      `,
      difficulty: 'easy',
      estimatedTime: 9,
    },
  ],

  // Unit 11 Lessons
  11: [
    {
      id: 31,
      unitId: 11,
      title: 'can-cant',
      description: "Ability and possibility with can / can't",
      icon: '💪',
      slug: 'can-cant',
      content: `
# can / can't

## Use
Use **can** and **can't** to talk about ability, possibility, and permission.

## Examples
- I can swim.
- She can speak Spanish.
- He can't drive.
- Can you help me?

## Form
**Subject + can + base verb**
**Subject + can't + base verb**
**Can + subject + base verb?**

## Rule
After **can**, use the base verb:
- can swim
- can't play
- can come

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 32,
      unitId: 11,
      title: 'adverbs',
      description: 'Using adverbs to describe actions',
      icon: '⚡',
      slug: 'adverbs',
      content: `
# Adverbs

## Use
Adverbs describe how someone does something.

## Examples
- She speaks slowly.
- He works hard.
- They run fast.
- Please speak quietly.

## Common adverbs
- slowly
- quickly
- carefully
- well
- hard

## Form
Many adverbs are adjective + **-ly**:
- slow → slowly
- quiet → quietly
- careful → carefully

      `,
      difficulty: 'easy',
      estimatedTime: 9,
    },
    {
      id: 33,
      unitId: 11,
      title: 'requests-and-offers',
      description: 'Polite language with can',
      icon: '🤝',
      slug: 'requests-and-offers',
      content: `
# Requests and offers

## Requests
Use **Can you ... ?** to ask someone to do something.
- Can you open the window?
- Can you help me?

## Offers
Use **Can I ... ?** to offer help.
- Can I help you?
- Can I carry that for you?

## Other polite forms
- Can we start?
- Can you say that again?

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
  ],

  // Unit 12 Lessons
  12: [
    {
      id: 34,
      unitId: 12,
      title: 'would-like',
      description: 'would like for wants and polite offers',
      icon: '☕',
      slug: 'would-like',
      content: `
# would like

## Use
Use **would like** to talk about what you want in a polite way.

## Examples
- I'd like a coffee.
- She'd like some water.
- We'd like to order.
- Would you like a sandwich?

## Forms
- I would like = I'd like
- He would like = He'd like

## Structure
- would like + noun
- would like + to + verb

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
    {
      id: 35,
      unitId: 12,
      title: 'some-and-any',
      description: 'some and any with countable and uncountable nouns',
      icon: '🧺',
      slug: 'some-and-any',
      content: `
# some and any

## Use
Use **some** and **any** with plural and uncountable nouns.

## some
Usually in positive sentences:
- I have some money.
- There are some apples.

## any
Usually in negatives and questions:
- We don't have any milk.
- Are there any eggs?

## Note
You can also use **some** in offers and requests:
- Would you like some tea?

      `,
      difficulty: 'easy',
      estimatedTime: 11,
    },
    {
      id: 36,
      unitId: 12,
      title: 'like-and-would-like',
      description: 'Difference between like and would like',
      icon: '🔍',
      slug: 'like-and-would-like',
      content: `
# like and would like

## like
Use **like** for general preferences:
- I like coffee.
- She likes Italian food.

## would like
Use **would like** for a specific want now:
- I'd like a coffee.
- She'd like some pasta.

## Compare
- I like tea. = in general
- I'd like tea. = now / at this moment

      `,
      difficulty: 'easy',
      estimatedTime: 10,
    },
  ],

  // Unit 13 Lessons
  13: [
    {
      id: 37,
      unitId: 13,
      title: 'present-continuous',
      description: 'Actions happening now',
      icon: '🎬',
      slug: 'present-continuous',
      content: `
# Present Continuous

## Use
Use the present continuous for actions happening now or around now.

## Form
**Subject + am/is/are + verb-ing**

## Examples
- I am reading.
- She is wearing a red coat.
- They are playing outside.

## Negative
- He isn't working.
- We aren't watching TV.

## Questions
- Are you listening?
- Is she cooking?

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
    {
      id: 38,
      unitId: 13,
      title: 'present-simple-vs-present-continuous',
      description: 'Habits vs actions happening now',
      icon: '⚖️',
      slug: 'present-simple-vs-present-continuous',
      content: `
# Present Simple and Present Continuous

## Present Simple
Use for routines and facts:
- I go to work every day.
- She lives in Madrid.

## Present Continuous
Use for now / temporary actions:
- I am going to work now.
- She is staying with friends this week.

## Signal words
Present Simple:
- always, usually, every day

Present Continuous:
- now, at the moment, today

## Compare
- He works in London. (usual situation)
- He is working at home today. (temporary)

      `,
      difficulty: 'medium',
      estimatedTime: 12,
    },
  ],

  // Unit 14 Lessons
  14: [
    {
      id: 39,
      unitId: 14,
      title: 'future-plans-going-to-present-continuous',
      description: 'Talking about future plans',
      icon: '✈️',
      slug: 'future-plans-going-to-present-continuous',
      content: `
# Future plans - going to and Present Continuous

## going to
Use **going to** for plans and intentions:
- I'm going to visit my aunt.
- They're going to travel next month.

## Present Continuous for future
Use the present continuous for arranged future events:
- I'm meeting Sara tomorrow.
- We're flying on Friday.

## Compare
- I'm going to study tonight. (plan/intention)
- I'm studying with Mia at 7. (arrangement)

      `,
      difficulty: 'medium',
      estimatedTime: 13,
    },
    {
      id: 40,
      unitId: 14,
      title: 'grammar-revision',
      description: 'Review of key beginner grammar',
      icon: '📝',
      slug: 'grammar-revision',
      content: `
# Grammar revision

## Review topics
This unit reviews important beginner grammar:
- be: am / is / are
- present simple
- present continuous
- past simple
- there is / there are
- can / can't
- some / any
- going to

## Study tip
When you revise, compare forms:
- present vs past
- habits vs now
- positive vs negative vs questions

## Practice focus
Look at:
- word order
- verb forms
- short answers
- common time expressions

      `,
      difficulty: 'easy',
      estimatedTime: 12,
    },
  ],

};
