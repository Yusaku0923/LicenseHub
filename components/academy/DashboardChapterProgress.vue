<template>
  <div class="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          章別の到達度
        </p>
        <h2 class="text-lg font-semibold text-slate-900">次に進むべき場所が明確</h2>
      </div>
      <NuxtLink
        to="/academy/lecture/medical-ethics-intro"
        class="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        講義へ進む →
      </NuxtLink>
    </div>

    <div class="mt-4 space-y-4">
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 shadow-sm"
      >
        <div class="flex items-center justify-between text-sm font-semibold text-slate-800">
          <span>{{ chapter.title }}</span>
          <span>{{ chapter.percent }}%</span>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-white">
          <div
            class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
            :style="{ width: `${chapter.percent}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChapterProgress } from '~/composables/useAcademyMock'

defineProps<{
  chapters: ChapterProgress[]
}>()
</script>
