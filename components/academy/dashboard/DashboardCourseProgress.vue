<!-- components/academy/dashboard/DashboardCourseProgress.vue -->
<template>
    <section
      class="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
    >
      <header class="mb-4">
        <h2 class="text-sm font-semibold text-slate-900">
          コース進捗
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          登録販売者コース全体の進み具合です。
        </p>
      </header>
  
      <!-- 全体進捗 -->
      <div class="mb-4 rounded-lg bg-slate-50 px-3 py-3">
        <p class="text-[11px] text-slate-500">
          全体進捗
        </p>
        <div class="mt-1 flex items-center justify-between">
          <div class="flex-1 overflow-hidden rounded-full bg-white/80">
            <div
              class="h-2 rounded-full bg-emerald-500"
              :style="{ width: `${overallProgress}%` }"
            ></div>
          </div>
          <span class="ml-3 text-sm font-semibold text-slate-900 tabular-nums">
            {{ overallProgress }}%
          </span>
        </div>
        <p class="mt-1 text-[11px] text-slate-500">
          完了レッスン {{ finishedLessons }} / {{ totalLessons }}
        </p>
      </div>
  
      <!-- 章ごとの進捗 -->
      <ul class="space-y-2">
        <li
          v-for="chapter in chapters"
          :key="chapter.id"
          class="rounded-lg border border-slate-100 px-3 py-2"
        >
          <div class="flex items-center justify-between gap-2">
            <div>
              <p class="text-xs font-semibold text-slate-900">
                {{ chapter.title }}
              </p>
              <p class="mt-0.5 text-[11px] text-slate-500">
                {{ chapter.subtitle }}
              </p>
            </div>
            <span class="text-xs font-semibold text-slate-700 tabular-nums">
              {{ chapter.progress }}%
            </span>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-1.5 rounded-full bg-emerald-500"
                :style="{ width: `${chapter.progress}%` }"
              ></div>
            </div>
            <span class="text-[11px] text-slate-400">
              {{ chapter.completedLessons }}/{{ chapter.totalLessons }} レッスン
            </span>
          </div>
        </li>
      </ul>
    </section>
  </template>
  
  <script setup lang="ts">
  interface ChapterProgress {
    id: string
    title: string
    subtitle: string
    progress: number
    completedLessons: number
    totalLessons: number
  }
  
  const overallProgress = 18
  const finishedLessons = 9
  const totalLessons = 50
  
  const chapters: ChapterProgress[] = [
    {
      id: 'ch1',
      title: '第1章 医薬品に共通する特性と基本的な知識',
      subtitle: '基礎用語・薬の働きの全体像',
      progress: 35,
      completedLessons: 5,
      totalLessons: 14,
    },
    {
      id: 'ch2',
      title: '第2章 主な医薬品とその作用',
      subtitle: '成分別のポイント整理',
      progress: 10,
      completedLessons: 2,
      totalLessons: 18,
    },
    {
      id: 'ch3',
      title: '第3章 身体の働きと医薬品',
      subtitle: '臓器ごとの関連性',
      progress: 0,
      completedLessons: 0,
      totalLessons: 10,
    },
  ]
  </script>
  