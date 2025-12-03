<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Lecture"
      :title="section?.title || '講義が見つかりません'"
      :subtitle="section ? section.chapterTitle : 'URLをご確認ください。'"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
      >
        ダッシュボードへ戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div v-if="section" class="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
      <div class="flex items-center justify-between text-sm text-slate-600">
        <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          目安 {{ section.estimatedMinutes }}分
        </span>
        <span>章: {{ section.chapterTitle }}</span>
      </div>

      <article class="prose prose-slate mt-4 max-w-none">
        <p>{{ section.content }}</p>
      </article>

      <div class="mt-6 flex items-center justify-between">
        <NuxtLink
          v-if="prevSlug"
          :to="`/academy/lecture/${prevSlug}`"
          class="text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          ← 前の講義
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="nextSlug"
          :to="`/academy/lecture/${nextSlug}`"
          class="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          次の講義 →
        </NuxtLink>
        <NuxtLink
          v-else
          to="/academy/practice"
          class="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          演習に進む →
        </NuxtLink>
      </div>
    </div>

    <div v-else class="rounded-2xl bg-white/80 p-6 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
      指定の講義が見つかりませんでした。ダッシュボードから再度お選びください。
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

definePageMeta({
  layout: 'academy',
})

const route = useRoute()
const { lectureSections, getLectureBySlug } = useAcademyMock()

const slug = computed(() => String(route.params.slug))
const section = computed(() => getLectureBySlug(slug.value) || null)

const lectureOrder = computed(() =>
  lectureSections.value.map((item) => ({
    slug: item.slug,
  })),
)

const currentIndex = computed(() =>
  lectureOrder.value.findIndex((item) => item.slug === slug.value),
)

const prevSlug = computed(() => {
  if (currentIndex.value > 0) return lectureOrder.value[currentIndex.value - 1]?.slug || null
  return null
})

const nextSlug = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < lectureOrder.value.length - 1) {
    return lectureOrder.value[currentIndex.value + 1]?.slug || null
  }
  return null
})
</script>
