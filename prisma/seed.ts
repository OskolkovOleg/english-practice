import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Очистка
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.word.deleteMany();
  await prisma.userProgress.deleteMany();

  // === ТЕМЫ И УРОКИ ===

  // 1. Present Simple
  const presentSimple = await prisma.topic.create({
    data: {
      title: 'Present Simple',
      slug: 'present-simple',
      description: 'Настоящее простое время для регулярных действий и фактов.',
      icon: 'Clock',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Форма и правила',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Present Simple</h2>
<div class="space-y-4">
  <p><strong>Present Simple</strong> используется для:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Регулярных действий и привычек: <em>I drink coffee every morning.</em></li>
    <li>Общих истин и фактов: <em>The sun rises in the east.</em></li>
    <li>Расписаний: <em>The train leaves at 5 PM.</em></li>
  </ul>
  
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
    <h3 class="font-semibold mb-2">Формула</h3>
    <p><strong>Утверждение:</strong> I/You/We/They + V1 | He/She/It + V1 + s/es</p>
    <p><strong>Отрицание:</strong> I/You/We/They + do not (don't) + V1 | He/She/It + does not (doesn't) + V1</p>
    <p><strong>Вопрос:</strong> Do/Does + подлежащее + V1?</p>
  </div>
  
  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Окончания -s/-es</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Обычно: work → works, play → plays</li>
      <li>-s, -ss, -sh, -ch, -x, -z, -o: +es (go → goes, watch → watches)</li>
      <li>Согласная + y: y → ies (study → studies)</li>
      <li>Гласная + y: +s (play → plays)</li>
    </ul>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="font-semibold mb-2">Маркеры времени</h3>
    <p>always, usually, often, sometimes, seldom, rarely, never, every day/week/month, on Mondays</p>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'translation', question: 'Я работаю в офисе.', correctAnswer: 'I work in an office.', hint: 'Work — работать. Обратите внимание на артикль.', difficulty: 1 },
                { type: 'translation', question: 'Она не любит кофе.', correctAnswer: "She doesn't like coffee.", hint: 'Отрицание с does not (doesn\'t).', difficulty: 1 },
                { type: 'translation', question: 'Они обычно завтракают в 8 утра.', correctAnswer: 'They usually have breakfast at 8 a.m.', hint: 'Usually — обычно, ставится перед основным глаголом.', difficulty: 2 },
                { type: 'quiz', question: 'Какое предложение составлено правильно?', correctAnswer: 'She goes to school every day.', options: JSON.stringify(['She go to school every day.', 'She goes to school every day.', 'She going to school every day.']), explanation: 'С he/she/it глагол берёт окончание -es.', difficulty: 1 },
                { type: 'fillblank', question: 'He ___ (not/watch) TV in the evening.', correctAnswer: "doesn't watch", hint: 'Отрицание для he/she/it.', difficulty: 1 },
                { type: 'fillblank', question: '___ you ___ (play) football?', correctAnswer: 'Do you play', hint: 'Вопрос в Present Simple начинается с Do/Does.', difficulty: 1 },
              ],
            },
          },
        ],
      },
    },
  });

  // 2. Past Simple
  const pastSimple = await prisma.topic.create({
    data: {
      title: 'Past Simple',
      slug: 'past-simple',
      description: 'Прошедшее простое время для завершённых действий.',
      icon: 'History',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Правильные и неправильные глаголы',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Past Simple</h2>
<div class="space-y-4">
  <p><strong>Past Simple</strong> используется для действий, которые завершились в прошлом:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Однократные действия: <em>I visited Paris last year.</em></li>
    <li>Последовательность действий: <em>She woke up, had breakfast and left.</em></li>
  </ul>

  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
    <h3 class="font-semibold mb-2">Формула</h3>
    <p><strong>Утверждение:</strong> подлежащее + V2 (правильные: +ed, неправильные: 2-я форма)</p>
    <p><strong>Отрицание:</strong> did not (didn't) + V1</p>
    <p><strong>Вопрос:</strong> Did + подлежащее + V1?</p>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Правильные глаголы: -ed</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>work → worked</li>
      <li>play → played</li>
      <li>study → studied (y → ied)</li>
      <li>stop → stopped (ударная согласная удваивается)</li>
    </ul>
  </div>

  <div class="bg-red-50 p-4 rounded-lg border border-red-200">
    <h3 class="font-semibold mb-2">Частоупотребляемые неправильные глаголы</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>go — went — gone</li>
      <li>eat — ate — eaten</li>
      <li>see — saw — seen</li>
      <li>do — did — done</li>
      <li>come — came — come</li>
      <li>take — took — taken</li>
    </ul>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="font-semibold mb-2">Маркеры времени</h3>
    <p>yesterday, last week/month/year, ago, in 2020, when I was young</p>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'translation', question: 'Вчера я посмотрел интересный фильм.', correctAnswer: 'Yesterday I watched an interesting film.', hint: 'Yesterday — вчера, watched — смотреть (правильный глагол).', difficulty: 1 },
                { type: 'translation', question: 'Они не пошли в школу в прошлый понедельник.', correctAnswer: "They didn't go to school last Monday.", hint: 'Go — неправильный глагол, в отрицании используется did + V1.', difficulty: 2 },
                { type: 'fillblank', question: 'She ___ (buy) a new dress yesterday.', correctAnswer: 'bought', hint: 'Buy — неправильный глагол.', difficulty: 2 },
                { type: 'quiz', question: 'Выберите правильную форму:', correctAnswer: 'Did he eat breakfast?', options: JSON.stringify(['Did he ate breakfast?', 'Did he eat breakfast?', 'Does he eat breakfast?']), explanation: 'После Did всегда идёт глагол в первой форме.', difficulty: 1 },
                { type: 'translation', question: 'Когда ты приехал в Москву?', correctAnswer: 'When did you come to Moscow?', hint: 'Come — неправильный глагол, вопрос с Did.', difficulty: 2 },
              ],
            },
          },
        ],
      },
    },
  });

  // 3. Future Simple
  const futureSimple = await prisma.topic.create({
    data: {
      title: 'Future Simple',
      slug: 'future-simple',
      description: 'Будущее простое время для предсказаний и решений.',
      icon: 'Rocket',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Will и shall',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Future Simple</h2>
<div class="space-y-4">
  <p><strong>Future Simple</strong> используется для:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Предсказаний: <em>It will rain tomorrow.</em></li>
    <li>Спонтанных решений: <em>I\'ll help you!</em></li>
    <li>Обещаний и угроз: <em>I will always love you.</em></li>
  </ul>

  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
    <h3 class="font-semibold mb-2">Формула</h3>
    <p><strong>Утверждение:</strong> подлежащее + will/shall + V1</p>
    <p><strong>Отрицание:</strong> will not (won\'t) + V1</p>
    <p><strong>Вопрос:</strong> Will + подлежащее + V1?</p>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Will vs. Shall</h3>
    <p>Shall используется редко, в основном с I/We в официальной речи: <em>Shall we go?</em></p>
    <p>В современном английском will используется со всеми лицами.</p>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="font-semibold mb-2">Маркеры времени</h3>
    <p>tomorrow, next week/month/year, soon, in a few days, later</p>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'translation', question: 'Завтра я буду работать дома.', correctAnswer: 'Tomorrow I will work at home.', hint: 'Tomorrow — завтра, will + V1.', difficulty: 1 },
                { type: 'translation', question: 'Они не придут на вечеринку.', correctAnswer: "They won't come to the party.", hint: 'Will not = won\'t.', difficulty: 1 },
                { type: 'quiz', question: 'Какое предложение верное?', correctAnswer: 'I think it will be sunny.', options: JSON.stringify(['I think it will be sunny.', 'I think it is be sunny.', 'I think it will sunny.']), explanation: 'После will всегда идёт инфинитив без to.', difficulty: 1 },
                { type: 'fillblank', question: '___ you ___ (help) me with this task?', correctAnswer: 'Will you help', hint: 'Вопрос в Future Simple начинается с Will.', difficulty: 1 },
              ],
            },
          },
        ],
      },
    },
  });

  // 4. Present Continuous
  const presentContinuous = await prisma.topic.create({
    data: {
      title: 'Present Continuous',
      slug: 'present-continuous',
      description: 'Настоящее длительное время для действий в момент речи.',
      icon: 'Activity',
      order: 4,
      lessons: {
        create: [
          {
            title: 'Форма и использование',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Present Continuous</h2>
<div class="space-y-4">
  <p><strong>Present Continuous</strong> используется для:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Действий в момент речи: <em>I am reading now.</em></li>
    <li>Временных ситуаций: <em>I\'m living with my parents this month.</em></li>
    <li>Изменяющихся ситуаций: <em>Your English is getting better.</em></li>
    <li>Планов на будущее: <em>We\'re meeting at 5.</em></li>
  </ul>

  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
    <h3 class="font-semibold mb-2">Формула</h3>
    <p><strong>Утверждение:</strong> am/is/are + V-ing</p>
    <p><strong>Отрицание:</strong> am/is/are + not + V-ing</p>
    <p><strong>Вопрос:</strong> Am/Is/Are + подлежащее + V-ing?</p>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Правописание -ing</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>Обычно: read → reading</li>
      <li>e → ing (make → making, но see → seeing)</li>
      <li>Ударная согласная удваивается: run → running, swim → swimming</li>
    </ul>
  </div>

  <div class="bg-red-50 p-4 rounded-lg border border-red-200">
    <h3 class="font-semibold mb-2">Глаголы-исключения</h3>
    <p>Некоторые глаголы обычно НЕ используются в Continuous: like, love, hate, want, need, know, think (мнение), believe, understand, remember, forget, belong, consist, contain.</p>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="font-semibold mb-2">Маркеры времени</h3>
    <p>now, at the moment, right now, currently, today, these days</p>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'translation', question: 'Она сейчас готовит ужин.', correctAnswer: 'She is cooking dinner now.', hint: 'Now — сейчас, cook → cooking.', difficulty: 1 },
                { type: 'translation', question: 'Мы смотрим фильм в данный момент.', correctAnswer: 'We are watching a film at the moment.', hint: 'At the moment — в данный момент.', difficulty: 1 },
                { type: 'fillblank', question: 'Look! The children ___ (play) in the garden.', correctAnswer: 'are playing', hint: 'Look! — сигнал к действию прямо сейчас.', difficulty: 1 },
                { type: 'quiz', question: 'Выберите правильный вариант:', correctAnswer: 'I do not understand this word.', options: JSON.stringify(['I am not understanding this word.', 'I do not understand this word.', 'I not understand this word.']), explanation: 'Understand — глагол состояния, обычно не используется в Continuous.', difficulty: 2 },
                { type: 'translation', question: 'Они не работают сегодня.', correctAnswer: "They aren't working today.", hint: 'Today — сегодня.', difficulty: 1 },
              ],
            },
          },
        ],
      },
    },
  });

  // 5. Articles
  const articles = await prisma.topic.create({
    data: {
      title: 'Articles',
      slug: 'articles',
      description: 'Артикли a, an, the и их отсутствие.',
      icon: 'Text',
      order: 5,
      lessons: {
        create: [
          {
            title: 'A/An, The и Zero Article',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Артикли в английском языке</h2>
<div class="space-y-4">
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <h3 class="font-semibold mb-2">Неопределённый артикль: a / an</h3>
    <p>Используется, когда говорим о чём-то впервые или не конкретизируем:</p>
    <ul class="list-disc pl-5 space-y-1">
      <li><em>I saw <strong>a</strong> dog in the park.</em></li>
      <li><em>She is <strong>an</strong> engineer.</em></li>
    </ul>
    <p class="mt-2"><strong>a</strong> перед согласными, <strong>an</strong> перед гласными звуками: <em>a university, an hour</em></p>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Определённый артикль: the</h3>
    <p>Используется, когда предмет уже упоминался или уникален:</p>
    <ul class="list-disc pl-5 space-y-1">
      <li><em>The dog that I saw was big.</em></li>
      <li><em>The sun, the moon, the earth</em></li>
      <li><em>The tallest building, the first time</em></li>
    </ul>
  </div>

  <div class="bg-green-50 p-4 rounded-lg border border-green-200">
    <h3 class="font-semibold mb-2">Zero Article (отсутствие артикля)</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>С неисчисляемыми существительными в общем значении: <em>I love music.</em></li>
      <li>С названиями языков, спортивных игр, еды: <em>English, football, breakfast</em></li>
      <li>С собственными именами: <em>London, John</em></li>
    </ul>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'fillblank', question: 'She is ___ honest person.', correctAnswer: 'an', hint: 'Honest читается с гласного звука [ɒnɪst].', difficulty: 1 },
                { type: 'fillblank', question: 'I want to buy ___ new car. ___ car must be red.', correctAnswer: 'a; The', hint: 'Первое упоминание — a, второе — the.', difficulty: 2 },
                { type: 'quiz', question: 'Выберите правильный вариант:', correctAnswer: 'I go to school every day.', options: JSON.stringify(['I go to the school every day.', 'I go to school every day.', 'I go to a school every day.']), explanation: 'School как занятие — без артикля.', difficulty: 2 },
                { type: 'fillblank', question: '___ Pacific Ocean is the largest ocean.', correctAnswer: 'The', hint: 'Океаны, моря, реки — с определённым артиклем.', difficulty: 2 },
              ],
            },
          },
        ],
      },
    },
  });

  // 6. Modal Verbs
  const modals = await prisma.topic.create({
    data: {
      title: 'Modal Verbs',
      slug: 'modal-verbs',
      description: 'Модальные глаголы: can, could, may, might, must, should.',
      icon: 'Key',
      order: 6,
      lessons: {
        create: [
          {
            title: 'Can, Must, Should',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Модальные глаголы</h2>
<div class="space-y-4">
  <p>Модальные глаголы выражают отношение к действию (возможность, необходимость, совет).</p>

  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <h3 class="font-semibold mb-2">Can / Could</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Can</strong> — физическая или умственная способность: <em>I can swim.</em></li>
      <li><strong>Could</strong> — прошлая способность или более вежливая просьба: <em>I could run faster when I was young. Could you help me?</em></li>
    </ul>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">Must / Have to</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Must</strong> — сильная необходимость, запрет (must not), логическое заключение: <em>You must stop. He must be tired.</em></li>
      <li><strong>Have to</strong> — внешняя необходимость, правила: <em>I have to wear a uniform.</em></li>
    </ul>
  </div>

  <div class="bg-green-50 p-4 rounded-lg border border-green-200">
    <h3 class="font-semibold mb-2">Should / Ought to</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Should</strong> — совет, рекомендация: <em>You should see a doctor.</em></li>
      <li><strong>Ought to</strong> — синоним should (менее употребляем): <em>You ought to apologize.</em></li>
    </ul>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="font-semibold mb-2">May / Might</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>May</strong> — разрешение, вероятность: <em>You may leave. It may rain.</em></li>
      <li><strong>Might</strong> — меньшая вероятность, чем may: <em>It might be true.</em></li>
    </ul>
  </div>

  <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
    <h3 class="font-semibold mb-2">Особенности</h3>
    <p>Модальные глаголы:</p>
    <ul class="list-disc pl-5 space-y-1">
      <li>Не меняются по лицам и числам</li>
      <li>После них всегда инфинитив без to (кроме ought to)</li>
      <li>Вопросы образуются без вспомогательного глагола: <em>Can you swim?</em></li>
      <li>Отрицания — частица not: <em>I cannot (can\'t) swim.</em></li>
    </ul>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'translation', question: 'Я должен закончить эту работу сегодня.', correctAnswer: 'I must finish this work today.', hint: 'Must — должен (сильная необходимость).', difficulty: 1 },
                { type: 'translation', question: 'Ты должен посмотреть этот фильм. (совет)', correctAnswer: 'You should watch this film.', hint: 'Should — совет, рекомендация.', difficulty: 1 },
                { type: 'quiz', question: 'Выберите правильный модальный глагол:', correctAnswer: 'She can speak three languages.', options: JSON.stringify(['She can speaks three languages.', 'She can speak three languages.', 'She cans speak three languages.']), explanation: 'После модального глагола идёт инфинитив без to, без окончания -s.', difficulty: 1 },
                { type: 'fillblank', question: 'You ___ (not/smoke) here. It is forbidden.', correctAnswer: 'must not', hint: 'Запрет — must not (mustn\'t).', difficulty: 1 },
                { type: 'translation', question: 'Можно мне открыть окно?', correctAnswer: 'May I open the window?', hint: 'May I...? — вежливая просьба о разрешении.', difficulty: 2 },
              ],
            },
          },
        ],
      },
    },
  });

  // 7. Conditionals
  const conditionals = await prisma.topic.create({
    data: {
      title: 'Conditionals',
      slug: 'conditionals',
      description: 'Условные предложения: Zero, First, Second, Third.',
      icon: 'GitBranch',
      order: 7,
      lessons: {
        create: [
          {
            title: 'If-clauses',
            order: 1,
            content: `
<h2 class="text-2xl font-bold mb-4">Условные предложения</h2>
<div class="space-y-4">
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <h3 class="font-semibold mb-2">Zero Conditional — универсальные истины</h3>
    <p><strong>If + Present Simple, Present Simple</strong></p>
    <p><em>If you heat water to 100°C, it boils.</em></p>
  </div>

  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="font-semibold mb-2">First Conditional — реальное будущее</h3>
    <p><strong>If + Present Simple, will + V1</strong></p>
    <p><em>If it rains tomorrow, I will stay at home.</em></p>
  </div>

  <div class="bg-green-50 p-4 rounded-lg border border-green-200">
    <h3 class="font-semibold mb-2">Second Conditional — маловероятное настоящее/будущее</h3>
    <p><strong>If + Past Simple, would + V1</strong></p>
    <p><em>If I were rich, I would travel around the world.</em></p>
    <p>Все лица: <em>I were, he were, they were</em> (в формальном английском)</p>
  </div>

  <div class="bg-red-50 p-4 rounded-lg border border-red-200">
    <h3 class="font-semibold mb-2">Third Conditional — нереальное прошлое</h3>
    <p><strong>If + Past Perfect, would have + V3</strong></p>
    <p><em>If I had studied harder, I would have passed the exam.</em></p>
  </div>
</div>
            `.trim(),
            exercises: {
              create: [
                { type: 'fillblank', question: 'If I ___ (have) enough money, I will buy a new car.', correctAnswer: 'have', hint: 'First Conditional: If + Present Simple.', difficulty: 1 },
                { type: 'fillblank', question: 'If I ___ (be) you, I would accept the offer.', correctAnswer: 'were', hint: 'Second Conditional: If + Past Simple. Все лица — were.', difficulty: 2 },
                { type: 'translation', question: 'Если бы я знал об этом раньше, я бы тебе сказал.', correctAnswer: 'If I had known about it earlier, I would have told you.', hint: 'Third Conditional: If + Past Perfect, would have + V3.', difficulty: 3 },
                { type: 'quiz', question: 'Выберите правильное условное предложение:', correctAnswer: 'If you mix blue and yellow, you get green.', options: JSON.stringify(['If you mix blue and yellow, you will get green.', 'If you mix blue and yellow, you get green.', 'If you mixed blue and yellow, you get green.']), explanation: 'Zero Conditional — универсальная истина, обе части в Present Simple.', difficulty: 2 },
                { type: 'translation', question: 'Если пойдёт дождь, мы не пойдём на пикник.', correctAnswer: "If it rains, we won't go for a picnic.", hint: 'First Conditional: If + Present Simple, will + not.', difficulty: 2 },
              ],
            },
          },
        ],
      },
    },
  });

  // === СЛОВА ===
  const wordsData = [
    { english: 'achieve', russian: 'достигать', transcription: '/əˈtʃiːv/', example: 'She worked hard to achieve her goals.', category: 'verbs', difficulty: 2 },
    { english: 'advantage', russian: 'преимущество', transcription: '/ədˈvɑːntɪdʒ/', example: 'The main advantage is the low price.', category: 'nouns', difficulty: 2 },
    { english: 'approach', russian: 'подход', transcription: '/əˈprəʊtʃ/', example: 'We need a new approach to this problem.', category: 'nouns', difficulty: 2 },
    { english: 'assume', russian: 'предполагать', transcription: '/əˈsjuːm/', example: 'I assume you are busy right now.', category: 'verbs', difficulty: 2 },
    { english: 'available', russian: 'доступный', transcription: '/əˈveɪləbl/', example: 'Is this room available tonight?', category: 'adjectives', difficulty: 1 },
    { english: 'benefit', russian: 'выгода, польза', transcription: '/ˈbenɪfɪt/', example: 'Exercise has many health benefits.', category: 'nouns', difficulty: 1 },
    { english: 'challenge', russian: 'вызов, сложная задача', transcription: '/ˈtʃælɪndʒ/', example: 'Learning a language is a real challenge.', category: 'nouns', difficulty: 1 },
    { english: 'claim', russian: 'утверждать', transcription: '/kleɪm/', example: 'He claims to have seen a UFO.', category: 'verbs', difficulty: 2 },
    { english: 'conclusion', russian: 'вывод, заключение', transcription: '/kənˈkluːʒn/', example: 'In conclusion, I would like to thank everyone.', category: 'nouns', difficulty: 2 },
    { english: 'confident', russian: 'уверенный', transcription: '/ˈkɒnfɪdənt/', example: 'She is confident about the exam.', category: 'adjectives', difficulty: 1 },
    { english: 'contribute', russian: 'вносить вклад', transcription: '/kənˈtrɪbjuːt/', example: 'Everyone should contribute to society.', category: 'verbs', difficulty: 2 },
    { english: 'convince', russian: 'убеждать', transcription: '/kənˈvɪns/', example: 'I managed to convince him to stay.', category: 'verbs', difficulty: 2 },
    { english: 'create', russian: 'создавать', transcription: '/kriˈeɪt/', example: 'The artist creates beautiful paintings.', category: 'verbs', difficulty: 1 },
    { english: 'decision', russian: 'решение', transcription: '/dɪˈsɪʒn/', example: 'It was a difficult decision to make.', category: 'nouns', difficulty: 1 },
    { english: 'demand', russian: 'требовать, спрос', transcription: '/dɪˈmɑːnd/', example: 'The workers demand higher wages.', category: 'verbs', difficulty: 2 },
    { english: 'describe', russian: 'описывать', transcription: '/dɪˈskraɪb/', example: 'Can you describe what happened?', category: 'verbs', difficulty: 1 },
    { english: 'determine', russian: 'определять', transcription: '/dɪˈtɜːmɪn/', example: 'The test will determine your level.', category: 'verbs', difficulty: 2 },
    { english: 'develop', russian: 'развивать, разрабатывать', transcription: '/dɪˈveləp/', example: 'We need to develop a new strategy.', category: 'verbs', difficulty: 1 },
    { english: 'difference', russian: 'разница', transcription: '/ˈdɪfrəns/', example: 'What is the difference between these two?', category: 'nouns', difficulty: 1 },
    { english: 'difficult', russian: 'трудный', transcription: '/ˈdɪfɪkəlt/', example: 'This task is very difficult.', category: 'adjectives', difficulty: 1 },
    { english: 'discover', russian: 'открывать, обнаруживать', transcription: '/dɪˈskʌvə(r)/', example: 'Columbus discovered America in 1492.', category: 'verbs', difficulty: 1 },
    { english: 'effective', russian: 'эффективный', transcription: '/ɪˈfektɪv/', example: 'This medicine is very effective.', category: 'adjectives', difficulty: 2 },
    { english: 'effort', russian: 'усилие', transcription: '/ˈefət/', example: 'Learning English requires effort.', category: 'nouns', difficulty: 1 },
    { english: 'encourage', russian: 'поощрять, поддерживать', transcription: '/ɪnˈkʌrɪdʒ/', example: 'Teachers should encourage students.', category: 'verbs', difficulty: 2 },
    { english: 'environment', russian: 'окружающая среда', transcription: '/ɪnˈvaɪrənmənt/', example: 'We must protect the environment.', category: 'nouns', difficulty: 2 },
    { english: 'establish', russian: 'устанавливать, основывать', transcription: '/ɪˈstæblɪʃ/', example: 'The company was established in 1990.', category: 'verbs', difficulty: 2 },
    { english: 'estimate', russian: 'оценивать', transcription: '/ˈestɪmeɪt/', example: 'We estimate the cost at $5000.', category: 'verbs', difficulty: 2 },
    { english: 'evidence', russian: 'доказательство', transcription: '/ˈevɪdəns/', example: 'There is no evidence of a crime.', category: 'nouns', difficulty: 2 },
    { english: 'exist', russian: 'существовать', transcription: '/ɪɡˈzɪst/', example: 'Do aliens exist?', category: 'verbs', difficulty: 1 },
    { english: 'expect', russian: 'ожидать', transcription: '/ɪkˈspekt/', example: 'I expect you to be on time.', category: 'verbs', difficulty: 1 },
    { english: 'experience', russian: 'опыт, переживание', transcription: '/ɪkˈspɪəriəns/', example: 'She has a lot of experience.', category: 'nouns', difficulty: 1 },
    { english: 'explain', russian: 'объяснять', transcription: '/ɪkˈspleɪn/', example: 'Can you explain this word?', category: 'verbs', difficulty: 1 },
    { english: 'express', russian: 'выражать', transcription: '/ɪkˈspres/', example: 'It is hard to express my feelings.', category: 'verbs', difficulty: 1 },
    { english: 'familiar', russian: 'знакомый', transcription: '/fəˈmɪliə(r)/', example: 'This place looks very familiar.', category: 'adjectives', difficulty: 2 },
    { english: 'feature', russian: 'особенность, характеристика', transcription: '/ˈfiːtʃə(r)/', example: 'The main feature is the battery life.', category: 'nouns', difficulty: 2 },
    { english: 'focus', russian: 'фокусироваться, сосредоточиться', transcription: '/ˈfəʊkəs/', example: 'You need to focus on your studies.', category: 'verbs', difficulty: 1 },
    { english: 'function', russian: 'функция', transcription: '/ˈfʌŋkʃn/', example: 'What is the function of this button?', category: 'nouns', difficulty: 2 },
    { english: 'generate', russian: 'генерировать, производить', transcription: '/ˈdʒenəreɪt/', example: 'The wind turbines generate electricity.', category: 'verbs', difficulty: 2 },
    { english: 'identify', russian: 'определять, распознавать', transcription: '/aɪˈdentɪfaɪ/', example: 'Can you identify this plant?', category: 'verbs', difficulty: 2 },
    { english: 'illustrate', russian: 'иллюстрировать', transcription: '/ˈɪləstreɪt/', example: 'The chart illustrates the data.', category: 'verbs', difficulty: 2 },
    { english: 'impact', russian: 'влияние', transcription: '/ˈɪmpækt/', example: 'The Internet has a huge impact on society.', category: 'nouns', difficulty: 2 },
    { english: 'imply', russian: 'подразумевать', transcription: '/ɪmˈplaɪ/', example: 'Are you implying that I am wrong?', category: 'verbs', difficulty: 3 },
    { english: 'improve', russian: 'улучшать', transcription: '/ɪmˈpruːv/', example: 'I want to improve my English.', category: 'verbs', difficulty: 1 },
    { english: 'indicate', russian: 'указывать', transcription: '/ˈɪndɪkeɪt/', example: 'The arrow indicates the direction.', category: 'verbs', difficulty: 2 },
    { english: 'individual', russian: 'индивидуальный', transcription: '/ˌɪndɪˈvɪdʒuəl/', example: 'Each individual has unique talents.', category: 'adjectives', difficulty: 2 },
    { english: 'influence', russian: 'влияние, влиять', transcription: '/ˈɪnfluəns/', example: 'Parents have a strong influence on children.', category: 'nouns', difficulty: 2 },
    { english: 'intend', russian: 'намереваться', transcription: '/ɪnˈtend/', example: 'I intend to finish this by Friday.', category: 'verbs', difficulty: 2 },
    { english: 'invest', russian: 'инвестировать', transcription: '/ɪnˈvest/', example: 'It is wise to invest in education.', category: 'verbs', difficulty: 2 },
    { english: 'involve', russian: 'включать, вовлекать', transcription: '/ɪnˈvɒlv/', example: 'The job involves a lot of travel.', category: 'verbs', difficulty: 2 },
    { english: 'issue', russian: 'проблема, вопрос', transcription: '/ˈɪʃuː/', example: 'Climate change is a serious issue.', category: 'nouns', difficulty: 1 },
    { english: 'lack', russian: 'недостаток, отсутствие', transcription: '/læk/', example: 'The project failed due to lack of funding.', category: 'nouns', difficulty: 2 },
    { english: 'maintain', russian: 'поддерживать, сохранять', transcription: '/meɪnˈteɪn/', example: 'It is important to maintain good health.', category: 'verbs', difficulty: 2 },
    { english: 'major', russian: 'основной, крупный', transcription: '/ˈmeɪdʒə(r)/', example: 'The major problem is the cost.', category: 'adjectives', difficulty: 1 },
    { english: 'method', russian: 'метод', transcription: '/ˈmeθəd/', example: 'What method do you use to learn words?', category: 'nouns', difficulty: 1 },
    { english: 'occur', russian: 'происходить', transcription: '/əˈkɜː(r)/', example: 'The accident occurred last night.', category: 'verbs', difficulty: 2 },
    { english: 'participate', russian: 'участвовать', transcription: '/pɑːˈtɪsɪpeɪt/', example: 'Everyone can participate in the discussion.', category: 'verbs', difficulty: 2 },
    { english: 'particular', russian: 'конкретный, особый', transcription: '/pəˈtɪkjələ(r)/', example: 'I have a particular reason for asking.', category: 'adjectives', difficulty: 2 },
    { english: 'perform', russian: 'выполнять, выступать', transcription: '/pəˈfɔːm/', example: 'The band will perform tomorrow.', category: 'verbs', difficulty: 1 },
    { english: 'persuade', russian: 'убеждать', transcription: '/pəˈsweɪd/', example: 'She persuaded me to join the club.', category: 'verbs', difficulty: 2 },
    { english: 'predict', russian: 'предсказывать', transcription: '/prɪˈdɪkt/', example: 'It is hard to predict the future.', category: 'verbs', difficulty: 2 },
    { english: 'prevent', russian: 'предотвращать', transcription: '/prɪˈvent/', example: 'Vaccines help prevent disease.', category: 'verbs', difficulty: 2 },
    { english: 'priority', russian: 'приоритет', transcription: '/praɪˈɒrəti/', example: 'Safety is our top priority.', category: 'nouns', difficulty: 2 },
    { english: 'procedure', russian: 'процедура', transcription: '/prəˈsiːdʒə(r)/', example: 'What is the standard procedure?', category: 'nouns', difficulty: 2 },
    { english: 'process', russian: 'процесс', transcription: '/ˈprəʊses/', example: 'Learning is a gradual process.', category: 'nouns', difficulty: 1 },
    { english: 'produce', russian: 'производить', transcription: '/prəˈdjuːs/', example: 'This factory produces cars.', category: 'verbs', difficulty: 1 },
    { english: 'purpose', russian: 'цель', transcription: '/ˈpɜːpəs/', example: 'What is the purpose of this meeting?', category: 'nouns', difficulty: 1 },
    { english: 'range', russian: 'диапазон, ассортимент', transcription: '/reɪndʒ/', example: 'The store offers a wide range of products.', category: 'nouns', difficulty: 2 },
    { english: 'react', russian: 'реагировать', transcription: '/riˈækt/', example: 'How did he react to the news?', category: 'verbs', difficulty: 1 },
    { english: 'recommend', russian: 'рекомендовать', transcription: '/ˌrekəˈmend/', example: 'I recommend this restaurant.', category: 'verbs', difficulty: 1 },
    { english: 'reduce', russian: 'уменьшать', transcription: '/rɪˈdjuːs/', example: 'We need to reduce pollution.', category: 'verbs', difficulty: 1 },
    { english: 'refer', russian: 'ссылаться, относиться', transcription: '/rɪˈfɜː(r)/', example: 'I am referring to your last email.', category: 'verbs', difficulty: 2 },
    { english: 'reflect', russian: 'отражать, размышлять', transcription: '/rɪˈflekt/', example: 'The mirror reflects light.', category: 'verbs', difficulty: 2 },
    { english: 'relevant', russian: 'уместный, относящийся', transcription: '/ˈreləvənt/', example: 'Your experience is relevant to this job.', category: 'adjectives', difficulty: 2 },
    { english: 'rely', russian: 'полагаться', transcription: '/rɪˈlaɪ/', example: 'You can rely on me.', category: 'verbs', difficulty: 2 },
    { english: 'require', russian: 'требовать', transcription: '/rɪˈkwaɪə(r)/', example: 'This job requires patience.', category: 'verbs', difficulty: 1 },
    { english: 'resource', russian: 'ресурс', transcription: '/rɪˈsɔːs/', example: 'Time is a valuable resource.', category: 'nouns', difficulty: 1 },
    { english: 'respond', russian: 'отвечать, реагировать', transcription: '/rɪˈspɒnd/', example: 'Please respond by Friday.', category: 'verbs', difficulty: 1 },
    { english: 'responsible', russian: 'ответственный', transcription: '/rɪˈspɒnsəbl/', example: 'Who is responsible for this?', category: 'adjectives', difficulty: 1 },
    { english: 'result', russian: 'результат', transcription: '/rɪˈzʌlt/', example: 'The result was surprising.', category: 'nouns', difficulty: 1 },
    { english: 'reveal', russian: 'раскрывать', transcription: '/rɪˈviːl/', example: 'The report reveals new facts.', category: 'verbs', difficulty: 2 },
    { english: 'seek', russian: 'искать, стремиться', transcription: '/siːk/', example: 'We seek to improve our services.', category: 'verbs', difficulty: 2 },
    { english: 'select', russian: 'выбирать', transcription: '/sɪˈlekt/', example: 'Please select an option.', category: 'verbs', difficulty: 1 },
    { english: 'significant', russian: 'значительный', transcription: '/sɪɡˈnɪfɪkənt/', example: 'There is a significant difference.', category: 'adjectives', difficulty: 2 },
    { english: 'similar', russian: 'похожий', transcription: '/ˈsɪmɪlə(r)/', example: 'The two cases are very similar.', category: 'adjectives', difficulty: 1 },
    { english: 'situation', russian: 'ситуация', transcription: '/ˌsɪtʃuˈeɪʃn/', example: 'The economic situation is improving.', category: 'nouns', difficulty: 1 },
    { english: 'source', russian: 'источник', transcription: '/sɔːs/', example: 'What is the source of this information?', category: 'nouns', difficulty: 1 },
    { english: 'specific', russian: 'конкретный', transcription: '/spəˈsɪfɪk/', example: 'Do you have a specific question?', category: 'adjectives', difficulty: 2 },
    { english: 'structure', russian: 'структура', transcription: '/ˈstrʌktʃə(r)/', example: 'The building has an unusual structure.', category: 'nouns', difficulty: 1 },
    { english: 'succeed', russian: 'преуспевать', transcription: '/səkˈsiːd/', example: 'If you work hard, you will succeed.', category: 'verbs', difficulty: 1 },
    { english: 'suggest', russian: 'предлагать', transcription: '/səˈdʒest/', example: 'I suggest we take a break.', category: 'verbs', difficulty: 1 },
    { english: 'supply', russian: 'поставка, снабжать', transcription: '/səˈplaɪ/', example: 'We need to ensure a steady supply.', category: 'nouns', difficulty: 2 },
    { english: 'survey', russian: 'опрос', transcription: '/ˈsɜːveɪ/', example: 'We conducted a survey among students.', category: 'nouns', difficulty: 2 },
    { english: 'task', russian: 'задание', transcription: '/tɑːsk/', example: 'This task requires creativity.', category: 'nouns', difficulty: 1 },
    { english: 'technique', russian: 'техника, метод', transcription: '/tekˈniːk/', example: 'He uses a special technique.', category: 'nouns', difficulty: 2 },
    { english: 'technology', russian: 'технология', transcription: '/tekˈnɒlədʒi/', example: 'Technology changes rapidly.', category: 'nouns', difficulty: 1 },
    { english: 'theory', russian: 'теория', transcription: '/ˈθɪəri/', example: 'This theory has not been proven.', category: 'nouns', difficulty: 2 },
    { english: 'transfer', russian: 'передавать, переводить', transcription: '/trænsˈfɜː(r)/', example: 'Please transfer the money to my account.', category: 'verbs', difficulty: 2 },
    { english: 'unique', russian: 'уникальный', transcription: '/juˈniːk/', example: 'Each person is unique.', category: 'adjectives', difficulty: 1 },
    { english: 'vary', russian: 'варьироваться, различаться', transcription: '/ˈveəri/', example: 'Prices vary from store to store.', category: 'verbs', difficulty: 2 },
    { english: 'vehicle', russian: 'транспортное средство', transcription: '/ˈviːəkl/', example: 'Cars are the most common vehicle.', category: 'nouns', difficulty: 1 },
    { english: 'volume', russian: 'объём, громкость', transcription: '/ˈvɒljuːm/', example: 'Turn down the volume, please.', category: 'nouns', difficulty: 2 },
    { english: 'widespread', russian: 'широко распространённый', transcription: '/ˈwaɪdspred/', example: 'The disease is widespread in this region.', category: 'adjectives', difficulty: 2 },
    { english: 'worth', russian: 'стоящий, стоимость', transcription: '/wɜːθ/', example: 'This book is worth reading.', category: 'adjectives', difficulty: 2 },
    { english: 'abandon', russian: 'покидать, отказываться', transcription: '/əˈbændən/', example: 'They had to abandon the project.', category: 'verbs', difficulty: 2 },
    { english: 'ability', russian: 'способность', transcription: '/əˈbɪləti/', example: 'She has the ability to solve problems.', category: 'nouns', difficulty: 1 },
    { english: 'absence', russian: 'отсутствие', transcription: '/ˈæbsəns/', example: 'His absence was noticed.', category: 'nouns', difficulty: 2 },
    { english: 'absolute', russian: 'абсолютный', transcription: '/ˈæbsəluːt/', example: 'I have absolute confidence in you.', category: 'adjectives', difficulty: 2 },
    { english: 'absorb', russian: 'поглощать, усваивать', transcription: '/əbˈzɔːb/', example: 'Plants absorb carbon dioxide.', category: 'verbs', difficulty: 2 },
    { english: 'abstract', russian: 'абстрактный', transcription: '/ˈæbstrækt/', example: 'The painting is very abstract.', category: 'adjectives', difficulty: 2 },
    { english: 'abundant', russian: 'обильный', transcription: '/əˈbʌndənt/', example: 'The region has abundant natural resources.', category: 'adjectives', difficulty: 3 },
    { english: 'academic', russian: 'академический', transcription: '/ˌækəˈdemɪk/', example: 'She has a strong academic background.', category: 'adjectives', difficulty: 2 },
    { english: 'accept', russian: 'принимать', transcription: '/əkˈsept/', example: 'I accept your apology.', category: 'verbs', difficulty: 1 },
    { english: 'access', russian: 'доступ', transcription: '/ˈækses/', example: 'Do you have access to the Internet?', category: 'nouns', difficulty: 1 },
  ];

  for (const word of wordsData) {
    await prisma.word.create({ data: word });
  }

  console.log('✅ Seed completed successfully!');
  console.log(`   Topics: 7`);
  console.log(`   Words: ${wordsData.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
