<template>
  <div
    class="flex flex-col gap-3 rounded-xl border border-slate-100 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50/80 cursor-pointer md:flex-row md:items-center md:justify-between"
    @click="goToTask"
  >
    <div class="flex items-start gap-3">
      <div
        class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full text-lg"
        :class="typeMeta[task.type]?.iconBg || typeMeta.other.iconBg"
      >
        <span>{{ typeMeta[task.type]?.icon || typeMeta.other.icon }}</span>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-slate-900">
            {{ task.title }}
          </p>
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            :class="statusBadgeClass(task.status)"
          >
            {{ statusLabel(task.status) }}
          </span>
        </div>
        <p class="mt-1 text-xs text-slate-500">
          {{ task.description || '今日の学習に進みましょう。' }}
        </p>
        <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            class="h-full rounded-full bg-emerald-500 transition-all"
            :style="{ width: `${task.progressPercent}%` }"
          />
        </div>
        <p class="mt-1 text-[11px] text-slate-500">
          目安 {{ task.estimatedMinutes }} 分 ・ {{ task.progressPercent }}%
        </p>
      </div>
    </div>
    <div class="flex items-center justify-end gap-2">
      <button
        class="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-white"
        type="button"
        @click.stop="goToTask"
      >
        {{ task.status === 'completed' ? '完了' : '続きから' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DailyPlanItem, DailyTaskStatus, DailyTaskType } from '~/types/academy'

const props = defineProps<{
  task: DailyPlanItem
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

const goToTask = () => {
  const link = props.task.link
  if (!link) return

  if (link.kind === 'section' && link.sectionSlug) {
    navigateTo(`/academy/sections/${link.sectionSlug}`)
  } else if (link.kind === 'practice_session' && link.practiceSessionId) {
    navigateTo(`/academy/practice/session/${link.practiceSessionId}`)
  } else if (link.kind === 'flashcard_batch') {
    navigateTo('/academy/flashcards/today')
  }
}

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
