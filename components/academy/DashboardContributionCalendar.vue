<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-[10px] font-bold text-slate-400">
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-sm bg-slate-100" />
          <span>Less</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="h-2.5 w-2.5 rounded-sm bg-emerald-200" />
          <span class="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
          <span class="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
        </div>
        <div class="flex items-center gap-1.5">
          <span>More</span>
        </div>
      </div>
      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Last 35 Days
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 md:grid-cols-12 lg:grid-cols-7 xl:grid-cols-12">
      <div
        v-for="entry in displayCells"
        :key="entry.date"
        class="aspect-square rounded-[4px] transition-all hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20"
        :class="colorClass(entry.score)"
        :title="`${entry.date}: ${entry.score}`"
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
// Desktop displays 35 days, could be adjusted for layout
const displayCells = computed(() => sorted.value.slice(-36))

const colorClass = (score: number) => {
  if (score === 0) return 'bg-slate-100'
  if (score <= 5) return 'bg-emerald-100'
  if (score <= 10) return 'bg-emerald-200'
  if (score <= 15) return 'bg-emerald-400'
  if (score <= 22) return 'bg-emerald-500'
  return 'bg-emerald-600'
}
</script>
