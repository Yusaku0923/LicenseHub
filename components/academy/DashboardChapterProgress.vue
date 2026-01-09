<template>
  <div class="card--premium p-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
          Curriculum Progress
        </p>
        <h2 class="mt-1 text-2xl font-bold text-slate-900 tracking-tight">章別の到達度</h2>
      </div>
      <NuxtLink
        to="/academy/lecture/medical-ethics-intro"
        class="group flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700"
      >
        講義へ進む
        <Icon icon="ph:arrow-right-bold" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="group flex flex-col justify-between rounded-2xl border border-slate-50 bg-slate-50/50 p-5 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-200/50"
      >
        <div class="flex items-start justify-between">
          <h3 class="font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
            {{ chapter.title }}
          </h3>
          <span class="text-sm font-black text-slate-900">{{ chapter.percent }}%</span>
        </div>
        
        <div class="mt-4 relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200/50">
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-emerald-500 transition-all duration-700 ease-out group-hover:bg-emerald-400"
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
