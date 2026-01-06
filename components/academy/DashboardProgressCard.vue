<template>
  <div class="card--premium p-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Learning Analytics
        </p>
        <h2 class="mt-1 text-2xl font-bold text-slate-900 tracking-tight">学習サマリー</h2>
        <p class="mt-1 text-sm text-slate-500">
          合格に向けた進捗をリアルタイムで分析しています。
        </p>
      </div>
      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V19.875c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex items-end justify-between font-bold text-slate-900">
        <span class="text-sm">全体の進捗率</span>
        <span class="text-3xl text-gradient">{{ summary.overallPercent }}%</span>
      </div>
      <div class="mt-3 relative h-4 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 transition-all duration-1000 ease-out"
          :style="{ width: `${summary.overallPercent}%` }"
        >
          <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>
      </div>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <div class="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 transition-colors hover:bg-emerald-50">
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-500">
          Weekly Time
        </p>
        <p class="mt-1 text-2xl font-black text-slate-900">
          {{ summary.studiedMinutesThisWeek }}<span class="ml-1 text-xs font-medium text-slate-500">min</span>
        </p>
      </div>
      
      <div class="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 transition-colors hover:bg-emerald-50">
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-500">
          Streak
        </p>
        <p class="mt-1 text-2xl font-black text-slate-900">
          {{ summary.consecutiveDays }}<span class="ml-1 text-xs font-medium text-slate-500">days</span>
        </p>
      </div>

      <div class="group flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-5 transition-colors hover:bg-emerald-50">
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-500">
          Daily Goal
        </p>
        <div class="mt-1 flex items-baseline gap-1">
          <p class="text-xl font-black text-slate-900 line-through decoration-emerald-500/30">1hr</p>
          <p class="text-2xl font-black text-emerald-600">20m</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressSummary } from '~/composables/useAcademyMock'

defineProps<{
  summary: ProgressSummary
}>()
</script>

<style scoped>
@keyframes shimmer {
  from { background-position: 0 0; }
  to { background-position: 40px 0; }
}
.animate-shimmer {
  animation: shimmer 2s linear infinite;
}
</style>
