<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-slate-900">今日の学習モードを選択</h2>
      <p class="mt-2 text-slate-500">無理なく続けられるペースを選びましょう</p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <!-- ミニモード（10分）-->
      <button
        @click="$emit('select', 'mini')"
        class="group relative flex flex-col justify-between rounded-xl border-2 border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
      >
        <div class="space-y-4">
          <div
            class="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
          >
            ミニ（10分）
          </div>
          <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-600">
            最低限の継続用
          </h3>
          <p class="text-sm text-slate-500">
            忙しい日でも「今日はやった」と言える最低ライン
          </p>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              演習：3問
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              暗記カード：8枚
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              講義：なし
            </li>
          </ul>
        </div>
      </button>

      <!-- 標準モード（25分）- おすすめ -->
      <button
        @click="$emit('select', 'standard')"
        class="group relative flex flex-col justify-between rounded-xl border-2 border-emerald-500 bg-emerald-50/50 p-6 text-left ring-4 ring-emerald-500/10 transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
          今日のおすすめ
        </div>
        
        <div class="space-y-4 pt-2">
          <div
            class="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700"
          >
            標準（25分）
          </div>
          <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-600">
            デフォルト
          </h3>
          <p class="text-sm text-emerald-700/70">
            継続と理解のバランスを取る基本ループ
          </p>
          <ul class="space-y-2 text-sm text-slate-700">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              講義：10分
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              演習：10分（5〜8問）
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              暗記カード：5分（10〜15枚）
            </li>
          </ul>
        </div>
      </button>

      <!-- 集中モード（45分）-->
      <button
        @click="$emit('select', 'intensive')"
        class="group relative flex flex-col justify-between rounded-xl border-2 border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
      >
        <div class="space-y-4">
          <div
            class="inline-flex items-center rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700"
          >
            集中（45分）
          </div>
          <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-600">
            余裕がある日
          </h3>
          <p class="text-sm text-slate-500">
            学習が進む日を最大化するための拡張モード
          </p>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              講義：15分
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              演習：20分（10〜15問）
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              暗記カード：10分（20〜25枚）
            </li>
          </ul>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LearningMode } from '~/composables/useDailyLearning'

defineEmits<{
  (e: 'select', mode: LearningMode): void
}>()
</script>
