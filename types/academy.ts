// 共通で使うアカデミー関連のモック型定義
export type DailyTaskType = 'study' | 'practice' | 'flashcard' | 'other'
export type DailyTaskStatus = 'planned' | 'in_progress' | 'completed'

export interface MeResponse {
  user: {
    id: number
    email: string
  }
  profile: {
    displayName: string | null
    prefectureCode: number | null
    targetExamRegionId: number | null
    targetExamYearId: number | null
    dailyStudyMinutes: number
    examDate: string | null // '2025-09-01' など
  }
}

export interface DailyPlanItem {
  id: number
  type: DailyTaskType
  title: string
  description?: string
  estimatedMinutes: number
  status: DailyTaskStatus
  progressPercent: number // 0〜100
  link?: {
    kind: 'section' | 'practice_session' | 'flashcard_batch'
    sectionSlug?: string
    practiceSessionId?: number
  }
}

export interface DailyPlanTodayResponse {
  date: string // '2025-11-28'
  estimatedMinutes: number
  completedMinutes: number
  tasks: DailyPlanItem[]
}

// alias for convenience with composables/components naming
export type DailyPlanToday = DailyPlanTodayResponse

export interface DailyPlanItemCompleteResponse {
  itemId: number
  status: 'completed'
}

export interface SectionDetailResponse {
  id: number
  slug: string
  chapterTitle: string
  sectionTitle: string
  summary?: string
  bodyMarkdown: string
  estimatedMinutes: number
}

export type PracticeSessionMode =
  | 'daily_task'
  | 'chapter'
  | 'weakness'
  | 'region'

export interface StartPracticeSessionRequest {
  mode: PracticeSessionMode
  chapterId?: number
  regionId?: number
  dailyPlanItemId?: number
}

export interface QuestionChoice {
  id: number
  label: string
  text: string
}

export interface PracticeQuestion {
  id: number
  text: string
  choices: QuestionChoice[]
}

export interface PracticeSessionResponse {
  sessionId: number
  mode: PracticeSessionMode
  questionCount: number
  answeredCount: number
  correctCount: number
  currentQuestion: PracticeQuestion | null
}

export interface SubmitAnswerRequest {
  questionId: number
  selectedChoiceId: number
}

export interface AnswerResult {
  isCorrect: boolean
  correctChoiceId: number
  explanation?: string
}

export interface PracticeSessionAnswerResponse {
  sessionId: number
  result: AnswerResult
  nextQuestion: PracticeQuestion | null
  progress: {
    questionCount: number
    answeredCount: number
    correctCount: number
    scorePercentage: number // 0〜100
    isFinished: boolean
  }
}

export interface Flashcard {
  id: number
  frontText: string
  backText: string
}

export interface FlashcardsTodayResponse {
  date: string
  totalCount: number
  reviewedCount: number
  cards: Flashcard[]
}

export type FlashcardRating = 1 | 2 | 3

export interface FlashcardReviewRequest {
  rating: FlashcardRating
}

export interface FlashcardReviewResponse {
  cardId: number
  rating: FlashcardRating
  progress: {
    totalCount: number
    reviewedCount: number
  }
  nextCard: Flashcard | null
}

export interface DailyFeedbackTodayResponse {
  date: string
  hasFeedback: boolean
  summaryText?: string
  weaknessText?: string
  adviceText?: string
}

export type DailyFeedbackToday = DailyFeedbackTodayResponse

export interface DailyFeedbackGenerateResponse {
  date: string
  summaryText: string
  weaknessText?: string
  adviceText?: string
}
