<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Practice"
      title="演習で理解を定着"
      subtitle="一問ごとに正誤と解説を確認しながら合格力を積み上げましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
      <div class="flex items-center justify-between text-sm text-slate-600">
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Q{{ currentIndexLabel }}
          </span>
          <span>正答で学習量が加算されます</span>
        </div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span>進捗</span>
          <div class="h-2 w-28 rounded-full bg-slate-100">
            <div
              class="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
              :style="{ width: progressPercent }"
            />
          </div>
        </div>
      </div>

      <div v-if="question" class="mt-4 space-y-4">
        <h2 class="text-xl font-semibold text-slate-900">
          {{ question.question }}
        </h2>

        <div class="grid gap-3">
          <button
            v-for="(choice, idx) in question.choices"
            :key="idx"
            type="button"
            class="w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
            :class="choiceClass(idx)"
            :disabled="isAnswered"
            @click="submitAnswer(idx)"
          >
            {{ choice }}
          </button>
        </div>

        <div v-if="isAnswered" class="rounded-xl bg-slate-50/80 px-4 py-3">
          <p
            class="text-sm font-semibold"
            :class="isCorrect ? 'text-emerald-700' : 'text-rose-700'"
          >
            {{ isCorrect ? '正解！' : 'もう一度見直そう' }}
          </p>
          <p class="mt-1 text-sm text-slate-700">
            {{ feedback }}
          </p>
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button
          type="button"
          class="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          :disabled="!isAnswered || isLastQuestion"
          @click="nextQuestion"
        >
          次の問題へ
        </button>
          <button
            type="button"
            class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
            @click="restart"
          >
            もう一度解く
          </button>
        </div>
      </div>

      <div v-else class="mt-6 text-sm text-slate-600">
        すべての問題に回答しました。ダッシュボードから次のタスクへ進みましょう。
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

const {
  practiceQuestions,
  currentPracticeIndex,
  getCurrentPracticeQuestion,
  answerPracticeQuestion,
  gotoNextPracticeQuestion,
} = useAcademyMock()

const selectedIndex = ref<number | null>(null)
const isAnswered = ref(false)
const isCorrect = ref<boolean | null>(null)
const feedback = ref('')

const question = computed(() => getCurrentPracticeQuestion())

const currentIndexLabel = computed(() => currentPracticeIndex.value + 1)
const isLastQuestion = computed(
  () => currentPracticeIndex.value >= practiceQuestions.value.length - 1,
)
const progressPercent = computed(() => {
  if (!practiceQuestions.value.length) return '0%'
  const percent =
    ((currentPracticeIndex.value + (isAnswered.value ? 1 : 0)) / practiceQuestions.value.length) *
    100
  return `${percent}%`
})

const submitAnswer = (choiceIndex: number) => {
  if (!question.value || isAnswered.value) return

  selectedIndex.value = choiceIndex
  const result = answerPracticeQuestion(choiceIndex)
  isAnswered.value = true
  isCorrect.value = result?.isCorrect ?? false
  feedback.value = result?.explanation ?? ''
}

const nextQuestion = () => {
  if (!isAnswered.value) return
  gotoNextPracticeQuestion()
  isAnswered.value = false
  isCorrect.value = null
  feedback.value = ''
  selectedIndex.value = null
}

const restart = () => {
  currentPracticeIndex.value = 0
  isAnswered.value = false
  isCorrect.value = null
  feedback.value = ''
  selectedIndex.value = null
}

const choiceClass = (idx: number) => {
  if (!isAnswered.value) {
    return 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/60'
  }

  if (idx === question.value?.correctIndex) {
    return 'border-emerald-200 bg-emerald-50 text-emerald-900'
  }

  if (idx === selectedIndex.value) {
    return 'border-rose-200 bg-rose-50 text-rose-900'
  }

  return 'border-slate-200 bg-white text-slate-700'
}
</script>

