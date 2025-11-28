import { createError, readBody } from 'h3'
import { reviewFlashcard } from '~/server/mock/academy'
import type { FlashcardReviewRequest, FlashcardReviewResponse } from '~/types/academy'

export default defineEventHandler(async (event): Promise<FlashcardReviewResponse> => {
  const idParam = event.context.params?.id
  const flashcardId = Number.parseInt(String(idParam), 10)

  if (Number.isNaN(flashcardId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid flashcard id' })
  }

  const body = (await readBody(event)) as FlashcardReviewRequest
  return reviewFlashcard(flashcardId, body)
})
