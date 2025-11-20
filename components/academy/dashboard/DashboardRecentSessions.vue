<!-- components/academy/dashboard/DashboardRecentSessions.vue -->
<template>
    <section
      class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
    >
      <header class="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">
            最近の学習履歴
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            直近 1 週間の学習セッションです。
          </p>
        </div>
  
        <NuxtLink
          to="/academy/practice"
          class="text-xs font-medium text-emerald-700 hover:underline"
        >
          詳細を見る
        </NuxtLink>
      </header>
  
      <div class="overflow-hidden rounded-lg border border-slate-100">
        <table class="min-w-full divide-y divide-slate-100 text-xs">
          <thead class="bg-slate-50 text-[11px] text-slate-500">
            <tr>
              <th class="px-3 py-2 text-left font-medium">日時</th>
              <th class="px-3 py-2 text-left font-medium">種類</th>
              <th class="px-3 py-2 text-left font-medium">内容</th>
              <th class="px-3 py-2 text-right font-medium">結果</th>
              <th class="px-3 py-2 text-right font-medium">所要時間</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="session in sessions"
              :key="session.id"
              class="hover:bg-slate-50/60"
            >
              <td class="whitespace-nowrap px-3 py-2 text-slate-600">
                {{ session.date }}
              </td>
              <td class="whitespace-nowrap px-3 py-2">
                <span
                  class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                  :class="session.typeBadgeClass"
                >
                  {{ session.typeLabel }}
                </span>
              </td>
              <td class="px-3 py-2 text-slate-700">
                {{ session.title }}
              </td>
              <td class="whitespace-nowrap px-3 py-2 text-right">
                <span class="tabular-nums text-slate-800">
                  {{ session.score }}
                </span>
              </td>
              <td class="whitespace-nowrap px-3 py-2 text-right text-slate-500">
                約 {{ session.duration }} 分
              </td>
            </tr>
  
            <tr v-if="sessions.length === 0">
              <td
                colspan="5"
                class="px-3 py-6 text-center text-xs text-slate-500"
              >
                まだ学習履歴がありません。今日のレッスンから始めてみましょう。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  interface RecentSession {
    id: string
    date: string
    type: 'lesson' | 'practice' | 'flashcards'
    typeLabel: string
    typeBadgeClass: string
    title: string
    score: string
    duration: number
  }
  
  const sessions: RecentSession[] = [
    {
      id: 's1',
      date: '11/19 22:15',
      type: 'practice',
      typeLabel: '演習',
      typeBadgeClass: 'bg-sky-50 text-sky-700',
      title: '一問一答 20 問（第1章）',
      score: '16 / 20 問 正解',
      duration: 14,
    },
    {
      id: 's2',
      date: '11/19 21:40',
      type: 'flashcards',
      typeLabel: '暗記カード',
      typeBadgeClass: 'bg-amber-50 text-amber-700',
      title: '要復習カード 15 枚',
      score: '覚えた 10 / 15',
      duration: 11,
    },
    {
      id: 's3',
      date: '11/19 21:10',
      type: 'lesson',
      typeLabel: '講義',
      typeBadgeClass: 'bg-emerald-50 text-emerald-700',
      title: '第1章-2 医薬品のリスク区分',
      score: '完了',
      duration: 25,
    },
  ]
  </script>
  