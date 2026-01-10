<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Practice"
      title="演習で理解を定着"
      subtitle="一問ごとに正誤と解説を確認しながら合格力を積み上げましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <div class="flex items-center justify-between text-sm text-slate-600 mb-6">
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            Q{{ currentIndexLabel }}
          </span>
          <span class="text-xs font-bold text-slate-400">正答で学習量が加算されます</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-slate-500">Progress</span>
          <div class="h-2 w-32 rounded-full bg-slate-100 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              :style="{ width: progressPercent }"
            />
          </div>
        </div>
      </div>

      <div v-if="question" class="mt-4 space-y-6">
        <h2 class="text-xl font-black text-slate-900 leading-relaxed">
          {{ question.question }}
        </h2>

        <div class="grid gap-3">
          <button
            v-for="(choice, idx) in question.choices"
            :key="idx"
            type="button"
            class="w-full rounded-2xl border px-6 py-4 text-left text-base font-bold transition-all relative overflow-hidden group"
            :class="choiceClass(idx)"
            :disabled="isAnswered"
            @click="submitAnswer(idx)"
          >
            <span class="relative z-10">{{ choice }}</span>
          </button>
        </div>

        <div v-if="isAnswered" class="rounded-2xl bg-slate-50 border border-slate-100 p-6 animate-fade-in-up">
          <div class="flex items-center gap-2 mb-2">
             <Icon :icon="isCorrect ? 'ph:check-circle-fill' : 'ph:x-circle-fill'" class="w-6 h-6" :class="isCorrect ? 'text-emerald-500' : 'text-rose-500'" />
             <p
                class="text-lg font-black"
                :class="isCorrect ? 'text-emerald-700' : 'text-rose-700'"
             >
                {{ isCorrect ? '正解！' : '不正解...' }}
             </p>
          </div>
          <p class="text-sm font-medium text-slate-600 leading-relaxed">
            {{ feedback }}
          </p>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
          <button
            v-if="!isAnswered || isLastQuestion"
             type="button"
            class="rounded-full bg-slate-50 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            @click="restart"
          >
            最初から
          </button>
          
          <button
          v-if="isAnswered && !isLastQuestion"
          type="button"
          class="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all"
          @click="nextQuestion"
        >
          次の問題へ
          <Icon icon="ph:arrow-right-bold" />
        </button>
        </div>
      </div>

      <div v-else class="mt-12 text-center space-y-4">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="ph:trophy-fill" class="w-10 h-10" />
        </div>
        <h3 class="text-2xl font-black text-slate-900">All Completed!</h3>
        <p class="text-slate-500 font-medium">すべての問題に回答しました。</p>
        <!-- 完了後は「次のステップ（例: STEP3）」を“今”として表示できるようにクエリを付与 -->
        <NuxtLink :to="{ path: '/academy', query: { step: '3' } }" class="inline-block rounded-full bg-slate-900 text-white px-8 py-3 font-bold hover:bg-slate-800 transition-colors">
            ダッシュボードへ戻る
        </NuxtLink>
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
    return 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/60 text-slate-700'
  }

  if (idx === question.value?.correctIndex) {
    return 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md ring-1 ring-emerald-200'
  }

  if (idx === selectedIndex.value) {
    return 'border-rose-200 bg-rose-50 text-rose-900'
  }

  return 'border-slate-100 bg-slate-50 text-slate-400 opacity-60'
}
</script>
