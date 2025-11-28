import { readBody } from 'h3'
import { startPracticeSession } from '~/server/mock/academy'
import type { PracticeSessionResponse, StartPracticeSessionRequest } from '~/types/academy'

export default defineEventHandler(async (event): Promise<PracticeSessionResponse> => {
  const body = (await readBody(event)) as StartPracticeSessionRequest
  return startPracticeSession(body)
})
