import { getDailyFeedbackToday } from '~/server/mock/academy'
import type { DailyFeedbackTodayResponse } from '~/types/academy'

export default defineEventHandler((): DailyFeedbackTodayResponse => {
  return getDailyFeedbackToday()
})
