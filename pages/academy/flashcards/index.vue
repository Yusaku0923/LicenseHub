<template>
  <div class="space-y-8">
    <AcademyPageHeader
      eyebrow="Flashcards"
      title="暗記カードでキーワードを定着"
      subtitle="カテゴリを選んで復習を始めましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/academy/flashcards/${category.slug}`"
        class="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-2"
        :class="[
          `hover:shadow-${category.color}-500/10`,
          `hover:ring-${category.color}-500/30`
        ]"
      >
        <div class="mb-4 flex items-start justify-between">
          <div
            class="rounded-2xl p-3 transition-colors"
            :class="[
              `bg-${category.color}-50 text-${category.color}-500`,
              `group-hover:bg-${category.color}-500 group-hover:text-white`
            ]"
          >
            <Icon :icon="category.icon" class="w-6 h-6" />
          </div>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
            {{ getCardCount(category.slug) }}枚
          </span>
        </div>

        <div class="flex-1">
          <h4
            class="text-lg font-black text-slate-900 transition-colors line-clamp-2"
            :class="`group-hover:text-${category.color}-600`"
          >
            {{ category.title }}
          </h4>
          <p class="mt-2 text-sm text-slate-500 line-clamp-2">
            {{ category.description }}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-end">
          <span
            class="text-sm font-bold transition-transform group-hover:translate-x-1"
            :class="`text-${category.color}-500`"
          >
            カードを学習 →
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

definePageMeta({
  layout: 'academy',
})

const { categories, getFlashcardsByCategory } = useAcademyMock()

function getCardCount(categorySlug: string) {
  return getFlashcardsByCategory(categorySlug).length
}
</script>
