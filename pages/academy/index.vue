<!-- pages/academy/index.vue -->
<template>
  <div class="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-6 md:py-8">
    <AcademyPageHeader
      eyebrow="Dashboard"
      title="今日の学習"
      subtitle="今日のタスクを起点に学習を始めましょう。"
    >
      <button
        type="button"
        class="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="!firstTaskPath"
        @click="startFirstTask"
      >
        今日のタスクをはじめる
      </button>
    </AcademyPageHeader>

    <!-- 上段：今日のタスク（フル幅） -->
    <AcademyTodayTasksPanel
      :plan="dailyPlan"
      :loading="dailyPlanLoading"
    />

    <!-- 下段 2 カラム -->
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <AcademyProgressSummaryPanel :plan="dailyPlan" />
        <AcademyExamCountdownPanel :profile="me?.profile || null" />
      </div>

      <div class="space-y-6 lg:col-span-1">
        <AcademyDailyFeedbackPanel
          :feedback="dailyFeedback"
          :loading="dailyFeedbackLoading"
        />
        <AcademyQuickLinksPanel />
      </div>
    </div>

    <!-- 学習履歴（モチベ維持） -->
    <AcademyRecentSessionsPanel />
  </div>
</template>

<script setup lang="ts">
import AcademyDailyFeedbackPanel from '~/components/academy/AcademyDailyFeedbackPanel.vue'
import AcademyExamCountdownPanel from '~/components/academy/AcademyExamCountdownPanel.vue'
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import AcademyProgressSummaryPanel from '~/components/academy/AcademyProgressSummaryPanel.vue'
import AcademyQuickLinksPanel from '~/components/academy/AcademyQuickLinksPanel.vue'
import AcademyRecentSessionsPanel from '~/components/academy/AcademyRecentSessionsPanel.vue'
import AcademyTodayTasksPanel from '~/components/academy/AcademyTodayTasksPanel.vue'
import { useDailyFeedback } from '~/composables/useDailyFeedback'
import { useDailyPlan } from '~/composables/useDailyPlan'
import { useMe } from '~/composables/useMe'
import type { DailyPlanItem } from '~/types/academy'
import { computed } from 'vue'

definePageMeta({
  layout: 'academy',
})

const { me } = useMe()
const { dailyPlan, loading: dailyPlanLoading } = useDailyPlan()
const { dailyFeedback, loading: dailyFeedbackLoading } = useDailyFeedback()

const tasks = computed<DailyPlanItem[]>(() => dailyPlan.value?.tasks ?? [])
const firstIncompleteTask = computed(() =>
  tasks.value.find((task) => task.status !== 'completed'),
)
const firstTaskPath = computed(() => resolveTaskLink(firstIncompleteTask.value))

function resolveTaskLink(task?: DailyPlanItem | null) {
  if (!task || !task.link) return null

  switch (task.link.kind) {
    case 'section':
      return task.link.sectionSlug ? `/academy/sections/${task.link.sectionSlug}` : null
    case 'practice_session':
      return task.link.practiceSessionId
        ? `/academy/practice/session/${task.link.practiceSessionId}`
        : '/academy/practice'
    case 'flashcard_batch':
      return '/academy/flashcards/today'
    default:
      return null
  }
}

const startFirstTask = async () => {
  if (!firstTaskPath.value) return
  await navigateTo(firstTaskPath.value)
}
</script>
