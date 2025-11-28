import { createError } from 'h3'
import { getSectionDetail } from '~/server/mock/academy'
import type { SectionDetailResponse } from '~/types/academy'

export default defineEventHandler((event): SectionDetailResponse => {
  const slug = event.context.params?.slug
  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid section slug' })
  }

  return getSectionDetail(slug)
})
