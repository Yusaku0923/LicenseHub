<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Flashcards"
      title="暗記カードでキーワードを定着"
      subtitle="Again / Normal / Easy の3タップで、迷わず反復。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-600">
            <span class="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              {{ progressLabel }}
            </span>
            <span class="ml-2">タップで表裏を切り替え</span>
          </div>
          <div class="text-xs font-semibold text-slate-600">
            進捗 {{ Math.round(progressPercent) }}%
          </div>
        </div>

        <div
          class="mt-4 h-72 cursor-pointer rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-6 text-white shadow-lg transition hover:scale-[1.01]"
          @click="toggleFlip"
        >
          <p class="text-sm uppercase tracking-wide text-emerald-200">カード</p>
          <p class="mt-3 text-2xl font-semibold">
            {{ isFlipped ? card?.back : card?.front }}
          </p>
          <p class="mt-3 text-sm text-emerald-100">
            {{ isFlipped ? '理解を確認したら評価してください' : 'クリックで解説を表示' }}
          </p>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-3">
          <button
            type="button"
            class="rounded-xl bg-rose-50 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-100 hover:bg-rose-100"
            @click="rate('again')"
          >
            Again
          </button>
          <button
            type="button"
            class="rounded-xl bg-amber-50 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-100 hover:bg-amber-100"
            @click="rate('normal')"
          >
            Normal
          </button>
          <button
            type="button"
            class="rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            @click="rate('easy')"
          >
            Easy
          </button>
        </div>
      </div>

      <div class="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          カード一覧
        </h3>
        <div class="mt-3 space-y-3">
          <div
            v-for="(item, idx) in flashcards"
            :key="item.id"
            class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
          >
            <div
              class="mt-0.5 h-2.5 w-2.5 rounded-full"
              :class="idx === currentFlashcardIndex ? 'bg-emerald-500' : 'bg-slate-300'"
            />
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ item.front }}</p>
              <p class="text-xs text-slate-600">{{ item.back }}</p>
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
