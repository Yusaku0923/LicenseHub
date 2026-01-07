import { ref, computed } from 'vue'

export type LearningMode = 'mini' | 'standard' | 'intensive'

export interface LearningTask {
  id: string
  type: 'lecture' | 'practice' | 'flashcard'
  title: string
  description: string
  estimatedMinutes: number
  count?: number // 問題数やカード枚数
  isCompleted: boolean
}

export const useDailyLearning = () => {
  const selectedMode = useState<LearningMode>('daily-learning-selected-mode', () => 'standard')
  const recommendedMode = useState<LearningMode>('daily-learning-recommended-mode', () => 'standard')

  const selectMode = (mode: LearningMode) => {
    selectedMode.value = mode
  }

  // モードに応じてタスクを生成
  const todayTasks = computed<LearningTask[]>(() => {
    const mode = selectedMode.value
    
    if (mode === 'mini') {
      return [
        {
          id: 'task-mini-practice',
          type: 'practice',
          title: '演習',
          description: '基本問題で知識を確認',
          estimatedMinutes: 5,
          count: 3,
          isCompleted: false,
        },
        {
          id: 'task-mini-flashcard',
          type: 'flashcard',
          title: '暗記カード',
          description: '重要キーワードを復習',
          estimatedMinutes: 5,
          count: 8,
          isCompleted: false,
        },
      ]
    }
    
    if (mode === 'intensive') {
      return [
        {
          id: 'task-intensive-lecture',
          type: 'lecture',
          title: '講義',
          description: '詳細解説で深く基礎を理解',
          estimatedMinutes: 15,
          isCompleted: false,
        },
        {
          id: 'task-intensive-practice',
          type: 'practice',
          title: '演習',
          description: '応用問題でしっかり定着',
          estimatedMinutes: 20,
          count: 12,
          isCompleted: false,
        },
        {
          id: 'task-intensive-flashcard',
          type: 'flashcard',
          title: '暗記カード',
          description: '重要事項を徹底的に復習',
          estimatedMinutes: 10,
          count: 22,
          isCompleted: false,
        },
      ]
    }
    
    // 標準モード（デフォルト）
    return [
      {
        id: 'task-standard-lecture',
        type: 'lecture',
        title: '講義',
        description: '基礎概念をしっかり解説',
        estimatedMinutes: 10,
        isCompleted: false,
      },
      {
        id: 'task-standard-practice',
        type: 'practice',
        title: '演習',
        description: '学んだ内容の理解を確認',
        estimatedMinutes: 10,
        count: 6,
        isCompleted: false,
      },
      {
        id: 'task-standard-flashcard',
        type: 'flashcard',
        title: '暗記カード',
        description: '重要項目を記憶に定着',
        estimatedMinutes: 5,
        count: 12,
        isCompleted: false,
      },
    ]
  })

  const totalMinutes = computed(() => {
    return todayTasks.value.reduce((sum, task) => sum + task.estimatedMinutes, 0)
  })

  return {
    selectedMode,
    recommendedMode,
    todayTasks,
    totalMinutes,
    selectMode,
  }
}
