<template>
  <section class="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-5">
    <header class="mb-3">
      <h3 class="text-sm font-semibold text-slate-900">
        AI先生のひとこと
      </h3>
      <p class="text-xs text-slate-500">
        今日の学習を簡単にフィードバックします。
      </p>
    </header>

    <div v-if="loading" class="space-y-2">
      <div class="h-4 w-2/3 animate-pulse rounded bg-slate-100"></div>
      <div class="h-3 w-full animate-pulse rounded bg-slate-100"></div>
      <div class="h-3 w-5/6 animate-pulse rounded bg-slate-100"></div>
    </div>

    <div v-else-if="feedback" class="space-y-3 text-sm text-slate-800">
      <div>
        <p class="text-[11px] font-semibold text-slate-600">
          要約
        </p>
        <p class="mt-1 leading-relaxed">
          {{ feedback.summaryText || '今日の振り返りをここに表示します。' }}
        </p>
      </div>
      <div v-if="feedback.weaknessText">
        <p class="text-[11px] font-semibold text-slate-600">
          弱点
        </p>
        <p class="mt-1 leading-relaxed">
          {{ feedback.weaknessText }}
        </p>
      </div>
      <div v-if="feedback.adviceText">
        <p class="text-[11px] font-semibold text-slate-600">
          アドバイス
        </p>
        <p class="mt-1 leading-relaxed">
          {{ feedback.adviceText }}
        </p>
      </div>
    </div>

    <p v-else class="text-sm text-slate-500">
      まだフィードバックがありません。今日のタスクを進めるとここに表示されます。
    </p>
  </section>
</template>

<script setup lang="ts">
import type { DailyFeedbackToday } from '~/types/academy'

defineProps<{
  feedback: DailyFeedbackToday | null
  loading?: boolean
}>()
</script>
