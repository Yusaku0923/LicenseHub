<template>
  <section class="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-5">
    <header class="mb-4">
      <h3 class="text-sm font-semibold text-slate-900">
        コース進捗
      </h3>
      <p class="text-xs text-slate-500">
        まずは全体の進み具合だけを確認。詳細は必要なときだけ開けます。
      </p>
    </header>

    <div class="mb-4 rounded-lg bg-slate-50 px-3 py-3">
      <p class="text-[11px] text-slate-500">
        全体進捗
      </p>
      <div class="mt-2 flex items-center gap-4">
        <div class="relative h-16 w-16">
          <svg viewBox="0 0 36 36" class="h-16 w-16 -rotate-90 text-slate-200">
            <circle cx="18" cy="18" r="15" stroke="currentColor" stroke-width="3" fill="none" />
            <circle
              cx="18"
              cy="18"
              r="15"
              stroke="url(#grad)"
              stroke-width="3"
              stroke-linecap="round"
              fill="none"
              :stroke-dasharray="`${progressCircumference} ${progressCircumference}`"
              :stroke-dashoffset="progressDashoffset"
              class="text-emerald-500"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
            {{ progressPercent }}%
          </div>
        </div>
        <div class="flex-1 space-y-1 text-sm text-slate-700">
          <div class="flex items-center justify-between text-[13px]">
            <span>時間</span>
            <span class="tabular-nums font-semibold text-slate-900">
              {{ completedMinutes }} / {{ estimatedMinutes }} 分
            </span>
          </div>
          <div class="flex items-center justify-between text-[13px]">
            <span>タスク</span>
            <span class="tabular-nums font-semibold text-slate-900">
              {{ completedTasks }} / {{ totalTasks }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <div class="rounded-lg border border-slate-100 px-3 py-2">
        <p class="text-[11px] font-semibold text-slate-600">
          予定学習時間
        </p>
        <p class="mt-1 text-lg font-bold text-slate-900 tabular-nums">
          {{ estimatedMinutes }} 分
        </p>
      </div>
      <div class="rounded-lg border border-slate-100 px-3 py-2">
        <p class="text-[11px] font-semibold text-slate-600">
          完了タスク
        </p>
        <p class="mt-1 text-lg font-bold text-slate-900 tabular-nums">
          {{ completedTasks }} / {{ totalTasks }}
        </p>
      </div>
      <div class="rounded-lg border border-slate-100 px-3 py-2">
        <p class="text-[11px] font-semibold text-slate-600">
          残り時間
        </p>
        <p class="mt-1 text-lg font-bold text-slate-900 tabular-nums">
          {{ remainingMinutes }} 分
        </p>
      </div>
    </div>

    <div class="mt-4 rounded-lg border border-slate-100 bg-slate-50/70 px-3 py-3">
      <button
        type="button"
        class="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800"
        @click="showDetails = !showDetails"
      >
        <span>章別の進捗を確認</span>
        <span class="text-xs text-slate-500">{{ showDetails ? '閉じる' : '開く' }}</span>
      </button>
      <transition name="fade">
        <ul v-if="showDetails" class="mt-3 space-y-2 text-sm text-slate-700">
          <li
            v-for="chapter in chapters"
            :key="chapter.id"
            class="rounded-lg bg-white px-3 py-2"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold">{{ chapter.title }}</p>
                <p class="text-[11px] text-slate-500">
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
              <span class="text-[11px] text-slate-500">
                {{ chapter.completedLessons }}/{{ chapter.totalLessons }} レッスン
              </span>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DailyPlanToday } from '~/types/academy'

const props = defineProps<{
  plan: DailyPlanToday | null
}>()

const estimatedMinutes = computed(() => props.plan?.estimatedMinutes ?? 0)
const completedMinutes = computed(() => props.plan?.completedMinutes ?? 0)
const remainingMinutes = computed(() => Math.max(estimatedMinutes.value - completedMinutes.value, 0))

const totalTasks = computed(() => props.plan?.tasks.length ?? 0)
const completedTasks = computed(
  () => props.plan?.tasks.filter((t) => t.status === 'completed').length ?? 0,
)

const progressPercent = computed(() =>
  estimatedMinutes.value === 0
    ? 0
    : Math.min(100, Math.round((completedMinutes.value / estimatedMinutes.value) * 100)),
)

const progressCircumference = 2 * Math.PI * 15
const progressDashoffset = computed(
  () => progressCircumference * (1 - progressPercent.value / 100),
)

const showDetails = ref(false)
const chapters = [
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
