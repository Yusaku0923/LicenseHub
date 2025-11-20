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
  
      <ul class="space-y-3">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-start justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5"
        >
          <div class="flex flex-1 items-start gap-3">
            <div
              class="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-base"
              :class="task.iconBg"
            >
              <span>{{ task.icon }}</span>
            </div>
            <div class="flex-1">
              <p class="text-xs font-semibold text-slate-900">
                {{ task.title }}
              </p>
              <p class="mt-0.5 text-[11px] text-slate-500">
                {{ task.description }}
              </p>
  
              <div class="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                <div class="flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-1 rounded-full bg-emerald-500"
                    :style="{ width: `${task.progress}%` }"
                  ></div>
                </div>
                <span class="tabular-nums">
                  {{ task.progress }}%
                </span>
                <span class="text-slate-400">
                  / 約 {{ task.estimatedMinutes }} 分
                </span>
              </div>
            </div>
          </div>
  
          <button
            type="button"
            class="ml-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
          >
            開始
          </button>
        </li>
      </ul>
    </section>
  </template>
  
  <script setup lang="ts">
  interface TodayTask {
    id: string
    title: string
    description: string
    icon: string
    iconBg: string
    progress: number
    estimatedMinutes: number
    completed: boolean
  }
  
  /**
   * 仮データ：
   * 実装時は composables や API レスポンスに差し替え
   */
  const tasks: TodayTask[] = [
    {
      id: 'lesson',
      title: '講義：第1章 医薬品に共通する特性と基本的な知識',
      description: 'テキスト 1 セクション分（約 10 ページ）を読み進めます。',
      icon: '📕',
      iconBg: 'bg-emerald-50',
      progress: 40,
      estimatedMinutes: 25,
      completed: false,
    },
    {
      id: 'practice',
      title: '演習：一問一答 20 問',
      description: '第1章から頻出の基本問題を中心に確認します。',
      icon: '✏️',
      iconBg: 'bg-sky-50',
      progress: 0,
      estimatedMinutes: 15,
      completed: false,
    },
    {
      id: 'flashcards',
      title: '暗記カード：要復習カード 15 枚',
      description: '前回「要復習」としたカードのみを優先的に出題します。',
      icon: '🧠',
      iconBg: 'bg-amber-50',
      progress: 0,
      estimatedMinutes: 10,
      completed: false,
    },
  ]
  
  const completedCount = tasks.filter((t) => t.completed).length
  </script>
  