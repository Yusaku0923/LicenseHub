<!-- components/academy/dashboard/DashboardTodayTasks.vue -->
<template>
  <section
    class="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
  >
    <header class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 class="text-sm font-semibold text-slate-900">
          今日のタスク
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          1 日あたりの目安学習量に基づいて自動で設定されます。
        </p>
      </div>
      <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        {{ completedCount }} / {{ tasks.length }} 完了
      </span>
    </header>

    <ul v-if="!isLoading && tasks.length" class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-start justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5"
      >
        <div class="flex flex-1 items-start gap-3">
          <div
            class="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-base"
            :class="resolveMeta(task.type).iconBg"
          >
            <span>{{ resolveMeta(task.type).icon }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-xs font-semibold text-slate-900">
                {{ task.title }}
              </p>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                :class="statusBadgeClass(task.status)"
              >
                {{ statusLabel(task.status) }}
              </span>
            </div>
            <p class="mt-0.5 text-[11px] text-slate-500">
              {{ task.description || '今日の学習に進みましょう。' }}
            </p>

            <div class="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <div class="flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-1 rounded-full bg-emerald-500"
                  :style="{ width: `${task.progressPercent}%` }"
                ></div>
              </div>
              <span class="tabular-nums">
                {{ task.progressPercent }}%
              </span>
              <span class="text-slate-400">
                / 約 {{ task.estimatedMinutes }} 分
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="ml-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="task.status === 'completed'"
          @click="$emit('start-task', task)"
        >
          {{ task.status === 'completed' ? '完了' : '開始' }}
        </button>
      </li>
    </ul>

    <div v-else-if="isLoading" class="space-y-3">
      <div class="h-5 w-1/2 animate-pulse rounded bg-slate-100"></div>
      <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-lg bg-slate-100"></div>
    </div>

    <p v-else class="text-center text-xs text-slate-500">
      本日のタスクはありません。コースから自由に学習を始められます。
    </p>
  </section>
</template>

<script setup lang="ts">
import type { DailyPlanItem, DailyTaskType, DailyTaskStatus } from '~/types/academy'

const props = defineProps<{
  tasks: DailyPlanItem[]
  isLoading?: boolean
}>()

defineEmits<{
  (e: 'start-task', task: DailyPlanItem): void
}>()

const typeMeta: Record<
  DailyTaskType,
  {
    icon: string
    iconBg: string
  }
> = {
  study: { icon: '📕', iconBg: 'bg-emerald-50' },
  practice: { icon: '✏️', iconBg: 'bg-sky-50' },
  flashcard: { icon: '🧠', iconBg: 'bg-amber-50' },
  other: { icon: '📝', iconBg: 'bg-slate-100' },
}

const completedCount = computed(() =>
  props.tasks.filter((task) => task.status === 'completed').length,
)

const resolveMeta = (type: DailyTaskType) => typeMeta[type] ?? typeMeta.other

const statusLabel = (status: DailyTaskStatus) => {
  switch (status) {
    case 'completed':
      return '完了'
    case 'in_progress':
      return '進行中'
    default:
      return '未着手'
  }
}

const statusBadgeClass = (status: DailyTaskStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700'
    case 'in_progress':
      return 'bg-sky-50 text-sky-700'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}
</script>
