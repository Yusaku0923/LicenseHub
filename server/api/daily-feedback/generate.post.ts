import { generateDailyFeedback } from '~/server/mock/academy'
import type { DailyFeedbackGenerateResponse } from '~/types/academy'

export default defineEventHandler((): DailyFeedbackGenerateResponse => {
  return generateDailyFeedback()
})
