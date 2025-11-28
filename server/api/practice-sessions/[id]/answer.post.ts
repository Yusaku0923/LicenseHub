import { createError, readBody } from 'h3'
import { answerPracticeSession } from '~/server/mock/academy'
import type { PracticeSessionAnswerResponse, SubmitAnswerRequest } from '~/types/academy'

export default defineEventHandler(async (event): Promise<PracticeSessionAnswerResponse> => {
  const idParam = event.context.params?.id
  const sessionId = Number.parseInt(String(idParam), 10)

  if (Number.isNaN(sessionId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid session id' })
  }

  const body = (await readBody(event)) as SubmitAnswerRequest
  return answerPracticeSession(sessionId, body)
})
