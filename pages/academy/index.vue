<!-- pages/academy/index.vue -->
<template>
  <div class="w-full space-y-8">
    <AcademyPageHeader
      eyebrow="Dashboard"
      title="今日の学習"
      subtitle="登録販売者試験までの進捗を確認して、今日のタスクから始めましょう。"
    >
      <button
        type="button"
        class="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
      >
        今日のレッスンを開始
      </button>
    </AcademyPageHeader>

    <!-- 上段：今日のタスク + コース進捗 -->
    <div class="grid gap-6 md:grid-cols-3">
      <DashboardTodayTasks class="md:col-span-2" />
      <DashboardCourseProgress />
    </div>

    <!-- 下段：最近の学習履歴 -->
    <DashboardRecentSessions />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'academy',
  // ここに auth 必須の middleware を後で差し込み予定
})

import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import DashboardTodayTasks from '~/components/academy/dashboard/DashboardTodayTasks.vue'
import DashboardCourseProgress from '~/components/academy/dashboard/DashboardCourseProgress.vue'
import DashboardRecentSessions from '~/components/academy/dashboard/DashboardRecentSessions.vue'
</script>
