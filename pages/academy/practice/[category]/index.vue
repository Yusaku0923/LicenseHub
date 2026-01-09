<template>
  <div class="space-y-6">
    <AcademyPageHeader
      eyebrow="Practice"
      :title="category?.title || '演習'"
      subtitle="一問ごとに正誤と解説を確認しながら合格力を積み上げましょう。"
    >
      <NuxtLink
        to="/academy/practice"
        class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
      >
        カテゴリ一覧に戻る
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

      <div v-else class="mt-6 text-center py-10">
        <div class="mb-4">
          <Icon icon="ph:check-circle-fill" class="w-16 h-16 text-emerald-500 mx-auto" />
        </div>
        <p class="text-lg font-bold text-slate-900 mb-2">すべての問題に回答しました！</p>
        <p class="text-sm text-slate-600 mb-6">お疲れさまでした。他のカテゴリも挑戦してみましょう。</p>
        <NuxtLink
          to="/academy/practice"
          class="inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-all"
        >
          カテゴリ一覧に戻る
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

const route = useRoute()
const categorySlug = computed(() => route.params.category as string)

const { getCategoryBySlug, getPracticeQuestionsByCategory, addContribution } = useAcademyMock()

const category = computed(() => getCategoryBySlug(categorySlug.value))
const questions = computed(() => getPracticeQuestionsByCategory(categorySlug.value))

const currentIndex = ref(0)
const selectedIndex = ref<number | null>(null)
const isAnswered = ref(false)
const isCorrect = ref<boolean | null>(null)
const feedback = ref('')

const question = computed(() => questions.value[currentIndex.value] ?? null)

const currentIndexLabel = computed(() => currentIndex.value + 1)
const isLastQuestion = computed(
  () => currentIndex.value >= questions.value.length - 1,
)
const progressPercent = computed(() => {
  if (!questions.value.length) return '0%'
  const percent =
    ((currentIndex.value + (isAnswered.value ? 1 : 0)) / questions.value.length) *
    100
  return `${percent}%`
})

const submitAnswer = (choiceIndex: number) => {
  if (!question.value || isAnswered.value) return

  selectedIndex.value = choiceIndex
  const correct = choiceIndex === question.value.correctIndex
  isAnswered.value = true
  isCorrect.value = correct
  feedback.value = question.value.explanation
  addContribution(correct ? 8 : 4)
}

const nextQuestion = () => {
  if (!isAnswered.value) return
  currentIndex.value += 1
  isAnswered.value = false
  isCorrect.value = null
  feedback.value = ''
  selectedIndex.value = null
}

const restart = () => {
  currentIndex.value = 0
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
