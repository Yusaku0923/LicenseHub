import { onMounted, ref } from 'vue'
import type { MeResponse } from '~/types/academy'

const fallbackMe: MeResponse = {
  user: { id: 1, email: 'student@example.com' },
  profile: {
    displayName: '模擬 受験生',
    prefectureCode: 13,
    targetExamRegionId: 1,
    targetExamYearId: 2025,
    dailyStudyMinutes: 30,
    examDate: '2025-09-01',
  },
}

export const useMe = () => {
  const me = useState<MeResponse | null>('me', () => null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchMe = async () => {
    loading.value = true
    error.value = null
    try {
      me.value = await $fetch<MeResponse>('/api/me')
    } catch (e) {
      error.value = e as Error
      if (!me.value) {
        me.value = fallbackMe
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (!me.value) {
      fetchMe()
    }
  })

  return {
    me,
    loading,
    error,
    fetchMe,
  }
}
