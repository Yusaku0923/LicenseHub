import { createError } from 'h3'
import { completeDailyPlanItem } from '~/server/mock/academy'
import type { DailyPlanItemCompleteResponse } from '~/types/academy'

export default defineEventHandler((event): DailyPlanItemCompleteResponse => {
  const idParam = event.context.params?.id
  const itemId = Number.parseInt(String(idParam), 10)

  if (Number.isNaN(itemId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid item id' })
  }

  return completeDailyPlanItem(itemId)
})
