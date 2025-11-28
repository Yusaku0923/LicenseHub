import { getFlashcardsToday } from '~/server/mock/academy'
import type { FlashcardsTodayResponse } from '~/types/academy'

export default defineEventHandler((): FlashcardsTodayResponse => {
  return getFlashcardsToday()
})
