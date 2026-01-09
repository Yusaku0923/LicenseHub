import { computed } from 'vue'

export type TaskType = 'lecture' | 'practice' | 'flashcards'

export interface DailyTask {
  id: string
  type: TaskType
  title: string
  description: string
  estimatedMinutes: number
  isCompleted: boolean
}

export interface ProgressSummary {
  overallPercent: number
  studiedMinutesThisWeek: number
  consecutiveDays: number
}

export interface ChapterProgress {
  id: string
  title: string
  percent: number
}

export interface LectureSection {
  id: string
  slug: string
  chapterTitle: string
  title: string
  content: string
  estimatedMinutes: number
}

export interface PracticeQuestion {
  id: string
  question: string
  choices: string[]
  correctIndex: number
  explanation: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface LectureStats {
  completedSections: number
  totalSections: number
  progressPercent: number
}

export interface PracticeStats {
  weeklyAnswered: number
  weeklyCorrectRate: number // 0-100
}

export interface FlashcardStats {
  dueCards: number
  totalCards: number
}

export type DailyPlanStatus = 'planned' | 'in_progress' | 'completed' | 'skipped'
export type DailyPlanItemType = 'lecture' | 'practice' | 'flashcard'
export type DailyPlanItemStatus = 'planned' | 'in_progress' | 'completed' | 'skipped'

export interface UserDailyPlanItem {
  id: string
  type: DailyPlanItemType
  status: DailyPlanItemStatus
  targetCount: number // questions or minutes or cards
  completedCount: number
  chapterId?: string
  topicId?: string
  // Display helpers
  title: string
  subtitle: string
  estimatedMinutes: number
}

export interface UserDailyPlan {
  id: string
  date: string
  totalEstimatedMinutes: number
  status: DailyPlanStatus
  items: UserDailyPlanItem[]
}

export interface AiDailyFeedback {
  id: string
  date: string
  summaryText: string
  mood: 'happy' | 'neutral' | 'concerned' // UI helper
}

export interface DailyContribution {
  date: string // YYYY-MM-DD
  score: number // 今日の学習量（0〜数十）
}

function createRecentContributions(): DailyContribution[] {
  const today = new Date()
  const pattern = [0, 4, 9, 12, 7, 15, 22, 5, 10, 14, 6, 18, 24, 8, 11]
  const days = 30
  const contributions: DailyContribution[] = []

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const isoDate = date.toISOString().slice(0, 10)
    const score = pattern[(days - 1 - i) % pattern.length]
    contributions.push({ date: isoDate, score })
  }

  return contributions
}

export function useAcademyMock() {
  const progressSummary = useState<ProgressSummary>('academy-progress-summary', () => ({
    overallPercent: 42,
    studiedMinutesThisWeek: 125,
    consecutiveDays: 3,
  }))

  const chapterProgress = useState<ChapterProgress[]>('academy-chapter-progress', () => [
    { id: 'chap-1', title: '医療倫理と法規', percent: 35 },
    { id: 'chap-2', title: '人体の構造と機能', percent: 48 },
    { id: 'chap-3', title: '臨床医学の基礎', percent: 27 },
    { id: 'chap-4', title: '公衆衛生・疫学', percent: 54 },
  ])

  const todayTasks = useState<DailyTask[]>('academy-today-tasks', () => [
    {
      id: 'task-lecture-1',
      type: 'lecture',
      title: '医療倫理の導入を読む',
      description: '医療者として守るべき価値観と法的責任の全体像を掴む',
      estimatedMinutes: 15,
      isCompleted: false,
    },
    {
      id: 'task-practice-1',
      type: 'practice',
      title: '設問でアウトプット',
      description: '倫理シナリオの設問で理解を確認する',
      estimatedMinutes: 12,
      isCompleted: false,
    },
    {
      id: 'task-flash-1',
      type: 'flashcards',
      title: '暗記カードで用語定着',
      description: '重要キーワードを一気に復習する',
      estimatedMinutes: 8,
      isCompleted: false,
    },
  ])

  // --- New Prisma-aligned State ---
  const dailyPlan = useState<UserDailyPlan>('academy-daily-plan', () => ({
    id: 'plan-today',
    date: new Date().toISOString().slice(0, 10),
    totalEstimatedMinutes: 25,
    status: 'planned',
    items: [
      {
        id: 'item-1',
        type: 'lecture',
        status: 'planned',
        targetCount: 1,
        completedCount: 0,
        title: '講義',
        subtitle: '基礎概念を解説',
        estimatedMinutes: 10,
        chapterId: 'chap-3', // 胃腸薬
      },
      {
        id: 'item-2',
        type: 'practice',
        status: 'planned',
        targetCount: 5,
        completedCount: 0,
        title: '演習',
        subtitle: '理解を確認',
        estimatedMinutes: 10,
      },
      {
        id: 'item-3',
        type: 'flashcard',
        status: 'planned',
        targetCount: 10,
        completedCount: 0,
        title: '暗記カード',
        subtitle: '記憶に定着',
        estimatedMinutes: 5,
      },
    ],
  }))

  const aiDailyFeedback = useState<AiDailyFeedback>('academy-ai-feedback', () => ({
    id: 'feedback-today',
    date: new Date().toISOString().slice(0, 10),
    summaryText: 'Nakayamaさん、こんにちは！昨日の『胃腸薬』は正答率80%で絶好調でした☀️ 今日はこの調子でStep 1へ進みましょう！',
    mood: 'happy',
  }))

  const contributionCalendar = useState<DailyContribution[]>('academy-contribution-calendar', () =>
    createRecentContributions(),
  )

  const lectureSections = useState<LectureSection[]>('academy-lecture-sections', () => [
    {
      id: 'lec-1',
      slug: 'medical-ethics-intro',
      chapterTitle: '医療倫理と法規',
      title: '医療倫理とは？',
      content:
        '医療倫理は、患者の尊厳を守りながら最適な医療を提供するための行動指針です。四原則（自律尊重・無危害・善行・正義）を軸に、現場での判断を支えます。',
      estimatedMinutes: 8,
    },
    {
      id: 'lec-2',
      slug: 'informed-consent',
      chapterTitle: '医療倫理と法規',
      title: 'インフォームド・コンセント',
      content:
        '十分な説明と患者の意思確認は、医療行為の前提条件です。患者の理解度に合わせて説明し、質問の余地を残すことが信頼構築につながります。',
      estimatedMinutes: 12,
    },
    {
      id: 'lec-3',
      slug: 'privacy-protection',
      chapterTitle: '医療倫理と法規',
      title: '個人情報と守秘義務',
      content:
        '医療記録は慎重に管理されるべき機微情報です。記録へのアクセス権限や共有範囲を明確にし、口頭での扱いにも細心の注意を払います。',
      estimatedMinutes: 10,
    },
    {
      id: 'lec-4',
      slug: 'anatomy-basics',
      chapterTitle: '人体の構造と機能',
      title: '基礎解剖の要点',
      content:
        '主要な臓器の位置関係と役割を俯瞰すると、症状と解剖のつながりが理解しやすくなります。まずは呼吸器系・循環器系から整理しましょう。',
      estimatedMinutes: 14,
    },
  ])

  const practiceQuestions = useState<PracticeQuestion[]>('academy-practice-questions', () => [
    {
      id: 'pq-1',
      question: 'インフォームド・コンセントの要件として最も重要なのはどれか？',
      choices: ['医療者の専門性', '患者の理解と同意', '家族の署名', '病院の規模'],
      correctIndex: 1,
      explanation: '患者が内容を理解し、自由意思で同意することが最優先です。',
    },
    {
      id: 'pq-2',
      question: '守秘義務に関する説明として正しいものはどれか？',
      choices: [
        '患者が未成年の場合は守秘義務は免除される',
        '患者の同意があれば情報共有できる',
        '法的要請でも情報提供はできない',
        '家族なら誰でも閲覧できる',
      ],
      correctIndex: 1,
      explanation: '本人の同意がある場合や法令で定められた場合に限り共有が認められます。',
    },
    {
      id: 'pq-3',
      question: '医療倫理の四原則に含まれないものはどれか？',
      choices: ['自律尊重', '無危害', '善行', '利益相反'],
      correctIndex: 3,
      explanation: '利益相反は管理対象ではありますが、四原則の構成要素ではありません。',
    },
  ])

  const flashcards = useState<Flashcard[]>('academy-flashcards', () => [
    {
      id: 'fc-1',
      front: '自律尊重の原則',
      back: '患者が自分の価値観に基づいて意思決定できるよう支援し、その選択を尊重すること。',
    },
    {
      id: 'fc-2',
      front: '無危害の原則',
      back: '患者に不利益や危害を与えないよう行動するという基本姿勢。利益よりも先に害の回避を考える。',
    },
    {
      id: 'fc-3',
      front: '善行の原則',
      back: '患者にとっての利益を最大化し、生活の質を高めるために積極的に介入すること。',
    },
    {
      id: 'fc-4',
      front: '正義の原則',
      back: '医療資源の公平な分配と、差別のない対応を指す。優先順位の透明性が重要。',
    },
  ])

  const currentPracticeIndex = useState<number>('academy-current-practice-index', () => 0)
  const currentFlashcardIndex = useState<number>('academy-current-flashcard-index', () => 0)

  function recalcStreak() {
    const today = new Date()
    let streak = 0
    for (let i = 0; i < 30; i += 1) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const isoDate = date.toISOString().slice(0, 10)
      const entry = contributionCalendar.value.find((item) => item.date === isoDate)
      if (entry && entry.score > 0) {
        streak += 1
      } else {
        break
      }
    }
    progressSummary.value.consecutiveDays = streak
  }

  function addContribution(score: number) {
    if (score <= 0) return

    const today = new Date()
    const todayKey = today.toISOString().slice(0, 10)
    const existing = contributionCalendar.value.find((item) => item.date === todayKey)

    if (existing) {
      existing.score += score
    } else {
      contributionCalendar.value.push({ date: todayKey, score })
    }

    progressSummary.value.studiedMinutesThisWeek += score * 2
    progressSummary.value.overallPercent = Math.min(
      100,
      progressSummary.value.overallPercent + Math.max(1, Math.round(score / 5)),
    )
    recalcStreak()
  }

  function completeTask(taskId: string) {
    const task = todayTasks.value.find((item) => item.id === taskId)
    if (!task) return

    if (!task.isCompleted) {
      addContribution(Math.max(3, Math.round(task.estimatedMinutes / 3)))
    }
    task.isCompleted = true
  }

  function getLectureBySlug(slug: string) {
    return lectureSections.value.find((section) => section.slug === slug)
  }

  const sortedPracticeQuestions = computed(() => practiceQuestions.value)

  function getCurrentPracticeQuestion() {
    return sortedPracticeQuestions.value[currentPracticeIndex.value] ?? null
  }

  function answerPracticeQuestion(choiceIndex: number) {
    const question = getCurrentPracticeQuestion()
    if (!question) return null

    const isCorrect = choiceIndex === question.correctIndex
    addContribution(isCorrect ? 8 : 4)

    return {
      isCorrect,
      explanation: question.explanation,
      correctIndex: question.correctIndex,
    }
  }

  function gotoNextPracticeQuestion() {
    if (currentPracticeIndex.value < practiceQuestions.value.length - 1) {
      currentPracticeIndex.value += 1
    }
  }

  function getCurrentFlashcard() {
    return flashcards.value[currentFlashcardIndex.value] ?? null
  }

  function rateFlashcard(level: 'again' | 'normal' | 'easy') {
    const scoreMap = {
      again: 3,
      normal: 5,
      easy: 8,
    }
    addContribution(scoreMap[level])

    if (currentFlashcardIndex.value < flashcards.value.length - 1) {
      currentFlashcardIndex.value += 1
    } else {
      currentFlashcardIndex.value = 0
    }
  }

  return {
    progressSummary,
    chapterProgress,
    todayTasks,
    dailyPlan,
    aiDailyFeedback,
    contributionCalendar,
    lectureSections,
    practiceQuestions,
    flashcards,
    currentPracticeIndex,
    currentFlashcardIndex,
    completeTask,
    addContribution,
    getLectureBySlug,
    getCurrentPracticeQuestion,
    answerPracticeQuestion,
    gotoNextPracticeQuestion,
    getCurrentFlashcard,
    rateFlashcard,
    incompleteTasksCount: computed(() => todayTasks.value.filter((t) => !t.isCompleted).length),
    // Mock Stats for Learning Menu
    lectureStats: computed<LectureStats>(() => ({
      completedSections: 12,
      totalSections: 45,
      progressPercent: Math.round((12 / 45) * 100),
    })),
    practiceStats: computed<PracticeStats>(() => ({
      weeklyAnswered: 35,
      weeklyCorrectRate: 68,
    })),
    flashcardStats: computed<FlashcardStats>(() => ({
      dueCards: 18,
      totalCards: 120,
    })),
  }
}
