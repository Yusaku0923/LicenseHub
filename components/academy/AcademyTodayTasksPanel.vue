<template>
  <section class="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-6">
    <header class="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          今日の学習タスク
        </h2>
        <p class="text-sm text-slate-500">
          上から順番に進めれば、今日の学習は完了です。
        </p>
      </div>
      <div v-if="plan" class="flex items-center gap-3">
        <div class="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <span class="text-xs font-semibold text-emerald-700">進捗</span>
          <span class="text-sm font-bold text-emerald-800 tabular-nums">{{ progressPercent }}%</span>
        </div>
        <div class="hidden h-10 w-28 items-center gap-2 rounded-full bg-slate-100 px-2 text-[11px] text-slate-700 md:flex">
          <div class="flex-1 overflow-hidden rounded-full bg-white">
            <div
              class="h-1.5 rounded-full bg-emerald-500"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>
          <span class="font-semibold tabular-nums">
            {{ completedTasks }}/{{ totalTasks }}
          </span>
        </div>
      </div>
    </header>

    <div v-if="plan" class="mb-3 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs text-emerald-900">
      まずは一番上のタスクから着手してください。迷ったらこの順でOKです。
    </div>

    <div v-if="loading" class="space-y-3">
      <div class="h-6 w-1/3 animate-pulse rounded bg-slate-100"></div>
      <div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-xl bg-slate-100"></div>
    </div>

    <div v-else-if="plan && plan.tasks.length" class="space-y-3">
      <AcademyTodayTaskItem
        v-for="task in plan.tasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <p v-else class="text-sm text-slate-500">
      今日のタスクはまだ設定されていません。
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AcademyTodayTaskItem from '~/components/academy/AcademyTodayTaskItem.vue'
import type { DailyPlanToday } from '~/types/academy'

const props = defineProps<{
  plan: DailyPlanToday | null
  loading?: boolean
}>()

const totalTasks = computed(() => props.plan?.tasks.length ?? 0)
const completedTasks = computed(
  () => props.plan?.tasks.filter((t) => t.status === 'completed').length ?? 0,
)
const progressPercent = computed(() =>
  totalTasks.value === 0 ? 0 : Math.round((completedTasks.value / totalTasks.value) * 100),
)
</script>
