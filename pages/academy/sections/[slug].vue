<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {{ section?.chapterTitle || '章情報' }}
        </p>
        <h1 class="text-xl font-bold text-slate-900">
          {{ section?.sectionTitle || 'セクション' }}
        </h1>
        <p v-if="section?.summary" class="mt-1 text-sm text-slate-600">
          {{ section.summary }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-2">
        <button
          type="button"
          class="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-700"
          @click="goPractice"
        >
          理解度チェックへ
        </button>
        <p class="text-[11px] text-slate-500">
          読了目安: {{ section?.estimatedMinutes ?? '--' }} 分
        </p>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <ContentRenderer v-if="section?.parsedBody" :value="section.parsedBody">
        <ContentRendererMarkdown :value="section.parsedBody" />
      </ContentRenderer>
      <div v-else class="space-y-2 text-sm text-slate-500">
        <div class="h-5 w-1/2 animate-pulse rounded bg-slate-100"></div>
        <div class="h-4 w-full animate-pulse rounded bg-slate-100"></div>
        <div class="h-4 w-3/4 animate-pulse rounded bg-slate-100"></div>
      </div>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        @click="markComplete"
      >
        このセクションを完了にする
      </button>
      <NuxtLink
        to="/academy/practice"
        class="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
      >
        次へ: 演習に進む
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseMarkdown } from '#imports'
import type { SectionDetailResponse } from '~/types/academy'

definePageMeta({
  layout: 'academy',
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: section, pending } = await useAsyncData(
  'section-detail',
  async () => {
    const res = await $fetch<SectionDetailResponse>(`/api/sections/${slug.value}`)
    const parsedBody = await parseMarkdown(res.bodyMarkdown)
    return { ...res, parsedBody }
  },
  { watch: [slug] },
)

const goPractice = () => {
  navigateTo('/academy/practice')
}

const markComplete = () => {
  // モック処理（後でAPI連携に差し替え）
  console.info('Section completed:', slug.value)
}
</script>
