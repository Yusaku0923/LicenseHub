import { onMounted, ref } from 'vue'
import type { DailyPlanToday } from '~/types/academy'

const fallbackPlan: DailyPlanToday = {
  date: '2025-11-28',
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
      link: { kind: 'section', sectionSlug: 'chapter1-section2-1' },
    },
    {
      id: 2,
      type: 'practice',
      title: '症状問題 演習 5問',
      description: '基本問題でウォームアップしましょう。',
      estimatedMinutes: 10,
      status: 'planned',
      progressPercent: 0,
      link: { kind: 'practice_session', practiceSessionId: 101 },
    },
    {
      id: 3,
      type: 'flashcard',
      title: '暗記カード 10枚',
      description: '復習が必要なカードを重点的に出します。',
      estimatedMinutes: 10,
      status: 'planned',
      progressPercent: 0,
      link: { kind: 'flashcard_batch' },
    },
  ],
}

export const useDailyPlan = () => {
  const dailyPlan = useState<DailyPlanToday | null>('dailyPlanToday', () => null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchTodayPlan = async () => {
    loading.value = true
    error.value = null
    try {
      dailyPlan.value = await $fetch<DailyPlanToday>('/api/daily-plan/today')
    } catch (e) {
      error.value = e as Error
      if (!dailyPlan.value) {
        dailyPlan.value = fallbackPlan
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (!dailyPlan.value) {
      fetchTodayPlan()
    }
  })

  return {
    dailyPlan,
    loading,
    error,
    fetchTodayPlan,
  }
}
