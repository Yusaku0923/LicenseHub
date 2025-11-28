import { getMe } from '~/server/mock/academy'
import type { MeResponse } from '~/types/academy'

export default defineEventHandler((): MeResponse => {
  return getMe()
})
