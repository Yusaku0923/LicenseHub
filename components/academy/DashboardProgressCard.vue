<template>
  <div class="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          続けやすいペース
        </p>
        <h2 class="text-xl font-semibold text-slate-900">学習サマリー</h2>
        <p class="mt-1 text-sm text-slate-600">
          合格に向けた進捗を一目で確認できます。
        </p>
      </div>
      <div class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
        {{ summary.overallPercent }}% 達成
      </div>
    </div>

    <div class="mt-6 space-y-5">
      <div>
        <div class="flex items-center justify-between text-sm font-medium text-slate-700">
          <span>全体進捗</span>
          <span>{{ summary.overallPercent }}%</span>
        </div>
        <div class="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
            :style="{ width: `${summary.overallPercent}%` }"
          />
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            今週の学習時間
          </p>
          <p class="mt-1 text-2xl font-semibold text-slate-900">
            {{ summary.studiedMinutesThisWeek }}分
          </p>
          <p class="text-xs text-slate-500">あと15分で目標クリア</p>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            連続学習日数
          </p>
          <p class="mt-1 text-2xl font-semibold text-slate-900">
            {{ summary.consecutiveDays }}日
          </p>
          <p class="text-xs text-slate-500">継続は力なり</p>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            1日の目安
          </p>
          <p class="mt-1 text-2xl font-semibold text-slate-900">
            20〜30分
          </p>
          <p class="text-xs text-slate-500">迷わず着手できるペース</p>
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
