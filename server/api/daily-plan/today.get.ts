import { getDailyPlanToday } from '~/server/mock/academy'
import type { DailyPlanTodayResponse } from '~/types/academy'

export default defineEventHandler((): DailyPlanTodayResponse => {
  return getDailyPlanToday()
})
