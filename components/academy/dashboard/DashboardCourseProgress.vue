<!-- components/academy/dashboard/DashboardCourseProgress.vue -->
<template>
  <section
    class="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
  >
    <header class="mb-4">
      <h2 class="text-sm font-semibold text-slate-900">
        今日の進捗サマリー
      </h2>
      <p class="mt-1 text-xs text-slate-500">
        今日の学習タスクと試験日までの残日数を確認しましょう。
      </p>
    </header>

    <!-- 今日の進捗 -->
    <div class="mb-4 rounded-lg bg-slate-50 px-3 py-3">
      <p class="text-[11px] text-slate-500">
        今日の進捗
      </p>
      <div class="mt-2 flex items-center justify-between gap-3">
        <div class="flex-1 overflow-hidden rounded-full bg-white/80">
          <div
            class="h-2 rounded-full bg-emerald-500"
            :style="{ width: `${progressPercent}%` }"
          ></div>
        </div>
        <span class="text-sm font-semibold text-slate-900 tabular-nums">
          {{ progressPercent }}%
        </span>
      </div>
      <p class="mt-1 text-[11px] text-slate-500">
        完了タスク {{ completedTasks }} / {{ totalTasks }} ・ 約 {{
          completedMinutes
        }} / {{ estimatedMinutes }} 分
      </p>
    </div>

    <!-- 試験日・AIひとこと -->
    <div class="space-y-3">
      <div class="rounded-lg border border-slate-100 px-3 py-2">
        <p class="text-[11px] font-semibold text-slate-700">
          試験日まで
        </p>
        <p class="mt-1 text-sm font-bold text-slate-900 tabular-nums">
          <span v-if="daysUntilExam !== null">{{ daysUntilExam }} 日</span>
          <span v-else class="text-slate-500">未設定</span>
        </p>
        <p v-if="examDate" class="text-[11px] text-slate-500">
          試験日: {{ examDate }}
        </p>
      </div>

      <div class="rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2">
        <p class="text-[11px] font-semibold text-emerald-700">
          AI先生のひとこと
        </p>
        <p class="mt-1 text-xs text-emerald-900">
          {{ feedbackText || '演習や講義の進捗に応じたフィードバックがここに表示されます。' }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DailyPlanItem } from '~/types/academy'

const props = defineProps<{
  estimatedMinutes: number
  completedMinutes: number
  tasks?: DailyPlanItem[]
  examDate?: string | null
  feedbackText?: string | null
}>()

const progressPercent = computed(() => {
  if (!props.estimatedMinutes) return 0
  return Math.min(
    100,
    Math.round((props.completedMinutes / props.estimatedMinutes) * 100),
  )
})

const completedTasks = computed(() =>
  (props.tasks || []).filter((task) => task.status === 'completed').length,
)

const totalTasks = computed(() => props.tasks?.length || 0)

const daysUntilExam = computed(() => {
  if (!props.examDate) return null
  const today = new Date()
  const exam = new Date(props.examDate)
  const diff = Math.ceil((exam.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
  return diff >= 0 ? diff : 0
})
</script>
