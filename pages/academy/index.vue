<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Dashboard"
      title="LicenceHub Academy"
      subtitle="迷わず・続けて・合格できる、あなただけの学習ダッシュボード。"
    >
      <button
        type="button"
        class="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-800"
        @click="startFirstAction"
      >
        いちばん簡単なステップから始める
      </button>
    </AcademyPageHeader>

    <DashboardTodayTasks
      :tasks="todayTasks"
      @complete="completeTask"
      @start="startTask"
    />

    <div class="grid gap-6 lg:grid-cols-3">
      <DashboardProgressCard
        class="lg:col-span-2"
        :summary="progressSummary"
      />
      <DashboardContributionCalendar :contributions="contributionCalendar" />
    </div>

    <DashboardChapterProgress :chapters="chapterProgress" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DashboardChapterProgress from '~/components/academy/DashboardChapterProgress.vue'
import DashboardContributionCalendar from '~/components/academy/DashboardContributionCalendar.vue'
import DashboardProgressCard from '~/components/academy/DashboardProgressCard.vue'
import DashboardTodayTasks from '~/components/academy/DashboardTodayTasks.vue'
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

definePageMeta({
  layout: 'academy',
})

const {
  progressSummary,
  chapterProgress,
  todayTasks,
  contributionCalendar,
  lectureSections,
  completeTask,
} = useAcademyMock()

const firstLectureSlug = computed(() => lectureSections.value[0]?.slug || null)

const firstIncompleteTask = computed(() =>
  todayTasks.value.find((task) => !task.isCompleted),
)

function resolveTaskPath(taskType: 'lecture' | 'practice' | 'flashcards') {
  if (taskType === 'lecture' && firstLectureSlug.value) {
    return `/academy/lecture/${firstLectureSlug.value}`
  }
  if (taskType === 'practice') return '/academy/practice'
  if (taskType === 'flashcards') return '/academy/flashcards'
  return null
}

const startTask = async (taskId: string) => {
  const task = todayTasks.value.find((item) => item.id === taskId)
  if (!task) return

  const path = resolveTaskPath(task.type)
  if (path) await navigateTo(path)
}

const startFirstAction = async () => {
  const task = firstIncompleteTask.value || todayTasks.value[0]
  if (!task) return

  const path = resolveTaskPath(task.type)
  if (path) await navigateTo(path)
}
</script>
