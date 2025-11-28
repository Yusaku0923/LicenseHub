import { createError } from 'h3'
import {
  DailyFeedbackGenerateResponse,
  DailyFeedbackTodayResponse,
  DailyPlanItemCompleteResponse,
  DailyPlanTodayResponse,
  FlashcardReviewRequest,
  FlashcardReviewResponse,
  FlashcardsTodayResponse,
  MeResponse,
  PracticeQuestion,
  PracticeSessionAnswerResponse,
  PracticeSessionResponse,
  StartPracticeSessionRequest,
  SubmitAnswerRequest,
  SectionDetailResponse,
} from '~/types/academy'

const today = new Date()
const todayDateStr = today.toISOString().slice(0, 10)

const me: MeResponse = {
  user: {
    id: 1,
    email: 'student@example.com',
  },
  profile: {
    displayName: '模擬 受験生',
    prefectureCode: 13,
    targetExamRegionId: 1,
    targetExamYearId: 2025,
    dailyStudyMinutes: 30,
    examDate: '2025-09-01',
  },
}

let dailyPlanToday: DailyPlanTodayResponse = {
  date: todayDateStr,
  estimatedMinutes: 30,
  completedMinutes: 10,
  tasks: [
    {
      id: 1,
      type: 'study',
      title: '第1章 2-1：かぜの諸症状',
      description: 'テキスト 1 セクション分を読み進めましょう。',
      estimatedMinutes: 10,
      status: 'in_progress',
      progressPercent: 50,
      link: {
        kind: 'section',
        sectionSlug: 'chapter1-section2-1',
      },
    },
    {
      id: 2,
      type: 'practice',
      title: '症状問題 演習 5問',
      description: '基本問題でウォームアップしましょう。',
      estimatedMinutes: 10,
      status: 'planned',
      progressPercent: 0,
      link: {
        kind: 'practice_session',
        practiceSessionId: 101,
      },
    },
    {
      id: 3,
      type: 'flashcard',
      title: '暗記カード 10枚',
      description: '復習が必要なカードを重点的に出します。',
      estimatedMinutes: 10,
      status: 'planned',
      progressPercent: 0,
      link: {
        kind: 'flashcard_batch',
      },
    },
  ],
}

const sectionDetails: Record<string, SectionDetailResponse> = {
  'chapter1-section2-1': {
    id: 1,
    slug: 'chapter1-section2-1',
    chapterTitle: '第1章 医薬品に共通する特性と基本的な知識',
    sectionTitle: '2-1 かぜの諸症状',
    summary: 'かぜの主な症状と一般用医薬品の対応を整理します。',
    bodyMarkdown: `# かぜの諸症状

- 鼻症状、咳、発熱などの代表的な症状
- 緩和を目的とした一般用医薬品の位置づけ

> 赤シートポイント: 発熱は **体温上昇** のみに限定されず、悪寒などの全身症状を伴うことが多い。`,
    estimatedMinutes: 10,
  },
}

type PracticeQuestionInternal = PracticeQuestion & {
  correctChoiceId: number
  explanation?: string
}

const practiceQuestions: PracticeQuestionInternal[] = [
  {
    id: 9001,
    text: '一般用かぜ薬に含まれる成分のうち、解熱鎮痛作用を担うものはどれか。',
    choices: [
      { id: 1, label: 'ア', text: 'アセトアミノフェン' },
      { id: 2, label: 'イ', text: 'クレマスチン' },
      { id: 3, label: 'ウ', text: 'デキストロメトルファン' },
      { id: 4, label: 'エ', text: 'dl-メチルエフェドリン' },
    ],
    correctChoiceId: 1,
    explanation: 'アセトアミノフェンは解熱鎮痛薬で、かぜ薬の中核成分です。',
  },
  {
    id: 9002,
    text: '成人における一般用かぜ薬の服用について正しいものはどれか。',
    choices: [
      { id: 5, label: 'ア', text: '食後すぐに服用する' },
      { id: 6, label: 'イ', text: '空腹時にも服用してよい' },
      { id: 7, label: 'ウ', text: '用量は症状に応じて増減してよい' },
      { id: 8, label: 'エ', text: '症状が改善しなくても1週間以上継続する' },
    ],
    correctChoiceId: 5,
    explanation: '胃部不快感を防ぐため、原則として食後に服用します。',
  },
  {
    id: 9003,
    text: '一般用かぜ薬の連用で注意すべき症状として適切なのはどれか。',
    choices: [
      { id: 9, label: 'ア', text: '鼻閉' },
      { id: 10, label: 'イ', text: '咽頭痛' },
      { id: 11, label: 'ウ', text: '発疹' },
      { id: 12, label: 'エ', text: '鼻汁' },
    ],
    correctChoiceId: 11,
    explanation: '発疹などのアレルギー症状が出た場合は服用を中止し、医療機関へ。',
  },
]

type PracticeSessionState = {
  sessionId: number
  mode: StartPracticeSessionRequest['mode']
  questionCount: number
  answeredCount: number
  correctCount: number
  currentIndex: number
  questions: PracticeQuestionInternal[]
}

const practiceSessions = new Map<number, PracticeSessionState>()
let practiceSessionCounter = 101

const flashcardsToday: FlashcardsTodayResponse = {
  date: todayDateStr,
  totalCount: 5,
  reviewedCount: 0,
  cards: [
    { id: 3001, frontText: 'PMDA', backText: '医薬品医療機器総合機構。副作用情報の収集等を担う。' },
    { id: 3002, frontText: 'スイッチOTC', backText: '処方薬から一般用医薬品へ転用されたもの。' },
    { id: 3003, frontText: '眠気に注意', backText: '抗ヒスタミン薬等で表示される使用上の注意。' },
    { id: 3004, frontText: '交互作用', backText: '複数成分の併用で作用が変化すること。' },
    { id: 3005, frontText: '登録販売者の役割', backText: '情報提供・相談対応・適正使用のサポート。' },
  ],
}

let flashcardIndex = 0

let dailyFeedback: DailyFeedbackTodayResponse | null = {
  date: todayDateStr,
  hasFeedback: true,
  summaryText: '昨日より講義の進みが順調です。演習を先にこなして弱点を把握しましょう。',
  weaknessText: 'かぜ薬の成分分類で迷いがちなので、一覧表を赤シートで再確認。',
  adviceText: '演習後すぐに間違えた箇所をカード化すると定着率が上がります。',
}

export const getMe = (): MeResponse => me

export const getDailyPlanToday = (): DailyPlanTodayResponse => dailyPlanToday

export const completeDailyPlanItem = (itemId: number): DailyPlanItemCompleteResponse => {
  const item = dailyPlanToday.tasks.find((task) => task.id === itemId)
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Daily plan item not found' })
  }

  item.status = 'completed'
  item.progressPercent = 100
  dailyPlanToday.completedMinutes = Math.min(
    dailyPlanToday.estimatedMinutes,
    dailyPlanToday.completedMinutes + item.estimatedMinutes,
  )

  return {
    itemId,
    status: 'completed',
  }
}

export const getSectionDetail = (slug: string): SectionDetailResponse => {
  const detail = sectionDetails[slug]
  if (!detail) {
    throw createError({ statusCode: 404, statusMessage: 'Section not found' })
  }
  return detail
}

export const startPracticeSession = (
  body: StartPracticeSessionRequest,
): PracticeSessionResponse => {
  const sessionId = practiceSessionCounter++
  const questions = [...practiceQuestions]

  const session: PracticeSessionState = {
    sessionId,
    mode: body.mode,
    questionCount: questions.length,
    answeredCount: 0,
    correctCount: 0,
    currentIndex: 0,
    questions,
  }

  practiceSessions.set(sessionId, session)

  const firstQuestion = questions[0] ?? null
  return {
    sessionId,
    mode: body.mode,
    questionCount: questions.length,
    answeredCount: 0,
    correctCount: 0,
    currentQuestion: firstQuestion
      ? {
          id: firstQuestion.id,
          text: firstQuestion.text,
          choices: firstQuestion.choices,
        }
      : null,
  }
}

export const answerPracticeSession = (
  sessionId: number,
  body: SubmitAnswerRequest,
): PracticeSessionAnswerResponse => {
  const session = practiceSessions.get(sessionId)
  if (!session) {
    throw createError({ statusCode: 404, statusMessage: 'Session not found' })
  }

  const question = session.questions[session.currentIndex]
  if (!question) {
    throw createError({ statusCode: 400, statusMessage: 'No more questions' })
  }

  const isCorrect = body.selectedChoiceId === question.correctChoiceId
  if (isCorrect) {
    session.correctCount += 1
  }
  session.answeredCount += 1

  const nextIndex = session.currentIndex + 1
  session.currentIndex = nextIndex

  const nextQuestion = session.questions[nextIndex]
  const isFinished = nextIndex >= session.questionCount

  return {
    sessionId,
    result: {
      isCorrect,
      correctChoiceId: question.correctChoiceId,
      explanation: question.explanation,
    },
    nextQuestion: nextQuestion
      ? {
          id: nextQuestion.id,
          text: nextQuestion.text,
          choices: nextQuestion.choices,
        }
      : null,
    progress: {
      questionCount: session.questionCount,
      answeredCount: session.answeredCount,
      correctCount: session.correctCount,
      scorePercentage: Math.round((session.correctCount / session.questionCount) * 100),
      isFinished,
    },
  }
}

export const getFlashcardsToday = (): FlashcardsTodayResponse => {
  return {
    ...flashcardsToday,
    reviewedCount: flashcardIndex,
    cards: flashcardsToday.cards.slice(flashcardIndex),
  }
}

export const reviewFlashcard = (
  flashcardId: number,
  body: FlashcardReviewRequest,
): FlashcardReviewResponse => {
  const current = flashcardsToday.cards[flashcardIndex]
  if (!current || current.id !== flashcardId) {
    throw createError({ statusCode: 404, statusMessage: 'Flashcard not found or not in queue' })
  }

  flashcardIndex = Math.min(flashcardIndex + 1, flashcardsToday.cards.length)
  const nextCard = flashcardsToday.cards[flashcardIndex] ?? null

  return {
    cardId: flashcardId,
    rating: body.rating,
    progress: {
      totalCount: flashcardsToday.totalCount,
      reviewedCount: flashcardIndex,
    },
    nextCard,
  }
}

export const getDailyFeedbackToday = (): DailyFeedbackTodayResponse => {
  if (!dailyFeedback) {
    throw createError({ statusCode: 404, statusMessage: 'Feedback not found' })
  }
  return dailyFeedback
}

export const generateDailyFeedback = (): DailyFeedbackGenerateResponse => {
  const generated: DailyFeedbackGenerateResponse = {
    date: todayDateStr,
    summaryText: '今日の学習を要約しました。演習で出た弱点を明日重点的に復習しましょう。',
    weaknessText: '消化器系の副作用部分で選択肢を迷う傾向があります。',
    adviceText: '10分以内にカード化し、赤シートで確認してください。',
  }

  dailyFeedback = { hasFeedback: true, ...generated }
  return generated
}
