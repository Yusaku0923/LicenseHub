import { onMounted, ref } from 'vue'
import type { DailyFeedbackToday } from '~/types/academy'

const fallbackFeedback: DailyFeedbackToday = {
  date: '2025-11-28',
  hasFeedback: true,
  summaryText: '昨日より講義の進みが順調です。演習を先にこなして弱点を把握しましょう。',
  weaknessText: 'かぜ薬の成分分類で迷いがちなので、一覧表を赤シートで再確認。',
  adviceText: '演習後すぐに間違えた箇所をカード化すると定着率が上がります。',
}

export const useDailyFeedback = () => {
  const dailyFeedback = useState<DailyFeedbackToday | null>('dailyFeedbackToday', () => null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchDailyFeedback = async () => {
    loading.value = true
    error.value = null
    try {
      dailyFeedback.value = await $fetch<DailyFeedbackToday>('/api/daily-feedback/today')
    } catch (e: any) {
      if (e?.statusCode === 404) {
        dailyFeedback.value = null
      } else {
        error.value = e as Error
        if (!dailyFeedback.value) {
          dailyFeedback.value = fallbackFeedback
        }
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (dailyFeedback.value === null) {
      fetchDailyFeedback()
    }
  })

  return {
    dailyFeedback,
    loading,
    error,
    fetchDailyFeedback,
  }
}
