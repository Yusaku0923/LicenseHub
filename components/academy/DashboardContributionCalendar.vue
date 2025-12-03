<template>
  <div class="rounded-3xl bg-gradient-to-b from-emerald-50/60 to-white p-6 shadow-sm ring-1 ring-emerald-100/60">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          学習カレンダー
        </p>
        <h2 class="text-lg font-semibold text-slate-900">30日間の積み上げ</h2>
        <p class="text-sm text-slate-600">少しずつの積み重ねが合格に繋がります。</p>
      </div>
      <div class="flex items-center gap-2 text-xs text-slate-600">
        <span class="h-3 w-3 rounded bg-slate-200" />
        <span>0</span>
        <span class="h-3 w-3 rounded bg-green-200" />
        <span>1-5</span>
        <span class="h-3 w-3 rounded bg-green-300" />
        <span>6-10</span>
        <span class="h-3 w-3 rounded bg-green-400" />
        <span>11-20</span>
        <span class="h-3 w-3 rounded bg-green-500" />
        <span>21+</span>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-7 gap-1.5">
      <div
        v-for="entry in displayCells"
        :key="entry.date"
        class="aspect-square rounded-md border border-white/40 shadow-sm"
        :class="colorClass(entry.score)"
        :title="`学習量: ${entry.score}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DailyContribution } from '~/composables/useAcademyMock'

const props = defineProps<{
  contributions: DailyContribution[]
}>()

const sorted = computed(() =>
  [...props.contributions].sort((a, b) => a.date.localeCompare(b.date)),
)
const displayCells = computed(() => sorted.value.slice(-35))

const colorClass = (score: number) => {
  if (score === 0) return 'bg-slate-200'
  if (score <= 5) return 'bg-green-200'
  if (score <= 10) return 'bg-green-300'
  if (score <= 20) return 'bg-green-400'
  return 'bg-green-500'
}
</script>
