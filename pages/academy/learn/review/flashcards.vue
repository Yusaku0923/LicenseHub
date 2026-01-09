<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Flashcards"
      title="暗記カードでキーワードを定着"
      subtitle="Again / Normal / Easy の3タップで、迷わず反復。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-slate-600 flex items-center gap-2">
            <span class="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
              {{ progressLabel }}
            </span>
            <span class="text-xs font-bold text-slate-400">タップで表裏を切り替え</span>
          </div>
          <div class="text-xs font-black text-slate-400">
            {{ Math.round(progressPercent) }}% Completed
          </div>
        </div>

        <div
          class="relative h-80 perspective-1000 group cursor-pointer"
          @click="toggleFlip"
        >
            <div class="absolute inset-0 w-full h-full transition-all duration-500 preserve-3d" :class="{ 'rotate-y-180': isFlipped }">
                <!-- Front -->
                <div class="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-xl flex flex-col justify-center items-center text-center border border-slate-700">
                    <p class="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">Question</p>
                     <p class="text-2xl font-black leading-snug">
                        {{ card?.front }}
                    </p>
                    <p class="absolute bottom-6 text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        <Icon icon="ph:hand-tap-fill" /> Click to Flip
                    </p>
                </div>

                <!-- Back -->
                <div class="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white p-8 border border-emerald-100 shadow-xl flex flex-col justify-center items-center text-center">
                    <p class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Answer</p>
                    <p class="text-xl font-bold text-slate-800 leading-relaxed">
                        {{ card?.back }}
                    </p>
                     <p class="absolute bottom-6 text-[10px] font-bold text-slate-400">
                        自己評価を選択してください
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            class="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 font-bold hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all active:scale-95"
            @click="rate('again')"
          >
            <Icon icon="ph:arrow-counter-clockwise-bold" class="w-5 h-5 mb-1" />
            <span class="text-xs">Again</span>
          </button>
          <button
            type="button"
            class="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 font-bold hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all active:scale-95"
            @click="rate('normal')"
          >
             <Icon icon="ph:check-bold" class="w-5 h-5 mb-1" />
            <span class="text-xs">Normal</span>
          </button>
          <button
            type="button"
            class="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-600 border border-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all active:scale-95"
            @click="rate('easy')"
          >
             <Icon icon="ph:star-fill" class="w-5 h-5 mb-1" />
            <span class="text-xs">Easy</span>
          </button>
        </div>
      </div>

      <div class="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-2">
          Card List
        </h3>
        <div class="space-y-3 h-[420px] overflow-y-auto custom-scrollbar pr-2">
          <div
            v-for="(item, idx) in flashcards"
            :key="item.id"
            class="flex items-start gap-4 rounded-2xl border px-4 py-3 transition-colors"
            :class="idx === currentFlashcardIndex ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50/50 border-slate-100'"
          >
            <div
              class="mt-1.5 h-2 w-2 rounded-full shrink-0"
              :class="idx === currentFlashcardIndex ? 'bg-emerald-500' : 'bg-slate-300'"
            />
            <div>
              <p class="text-sm font-bold text-slate-900 leading-snug">{{ item.front }}</p>
              <p class="text-xs font-medium text-slate-500 mt-1 line-clamp-1">{{ item.back }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

definePageMeta({
  layout: 'academy',
})

const { flashcards, currentFlashcardIndex, getCurrentFlashcard, rateFlashcard } = useAcademyMock()

const isFlipped = ref(false)

const card = computed(() => getCurrentFlashcard())
const progressPercent = computed(() => {
  if (!flashcards.value.length) return 0
  return ((currentFlashcardIndex.value + 1) / flashcards.value.length) * 100
})

const progressLabel = computed(() => `${currentFlashcardIndex.value + 1} / ${flashcards.value.length}`)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const rate = (level: 'again' | 'normal' | 'easy') => {
  rateFlashcard(level)
  isFlipped.value = false
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}
</style>
