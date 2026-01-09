<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Flashcards"
      title="今日の単語カード"
      subtitle="隙間時間で効率的に記憶を定着させましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Stats -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-3xl font-black text-slate-900 tracking-tight">15</div>
            <div class="text-xs font-bold text-slate-400 mt-1">今日のカード</div>
          </div>
          <div class="relative">
            <div class="absolute left-0 top-2 bottom-2 w-px bg-slate-100"></div>
            <div class="text-3xl font-black text-blue-500 tracking-tight">8</div>
            <div class="text-xs font-bold text-slate-400 mt-1">残り</div>
            <div class="absolute right-0 top-2 bottom-2 w-px bg-slate-100"></div>
          </div>
          <div>
            <div class="text-3xl font-black text-emerald-500 tracking-tight">7</div>
            <div class="text-xs font-bold text-slate-400 mt-1">完了</div>
          </div>
        </div>
      </div>

      <!-- Flashcard -->
      <div class="relative h-[420px] perspective-1000">
        <div
          class="absolute inset-0 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
          :class="{ 'rotate-y-180': isFlipped }"
          @click="flipCard"
        >
          <div v-if="!isFlipped" class="text-center space-y-6">
            <span class="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black rounded-full uppercase tracking-wider">Front</span>
            <h2 class="text-4xl font-black text-slate-800 leading-tight">用語・概念</h2>
            <p class="text-sm font-bold text-slate-400 flex items-center justify-center gap-2">
              <Icon icon="ph:hand-tap-fill" class="w-4 h-4" />
              タップして裏面を確認
            </p>
          </div>
          <div v-else class="text-center space-y-6">
            <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full uppercase tracking-wider">Back</span>
            <h2 class="text-2xl font-bold text-slate-800">説明・定義</h2>
            <p class="text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
              ここに用語の詳細な説明や定義が表示されます。
              重要なポイントや関連情報も含まれます。
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="grid grid-cols-3 gap-4">
        <button class="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all active:scale-95">
          <Icon icon="ph:x-circle-bold" class="w-6 h-6" />
          <span class="text-xs">もう一度</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all active:scale-95">
          <Icon icon="ph:warning-circle-bold" class="w-6 h-6" />
          <span class="text-xs">難しい</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-emerald-600 border border-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0">
          <Icon icon="ph:check-circle-bold" class="w-6 h-6" />
          <span class="text-xs">簡単</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'

const isFlipped = ref(false)

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

definePageMeta({
  layout: "academy"
})
</script>

