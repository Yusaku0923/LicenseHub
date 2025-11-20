<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900">練習セッション</h1>
        <div class="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <span>問題 {{ currentQuestion }}/{{ totalQuestions }}</span>
          <span>•</span>
          <span>残り時間: 15:30</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Question Card -->
      <div class="bg-white p-8 rounded-lg shadow mb-6">
        <div class="mb-6">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            問題 {{ currentQuestion }}
          </span>
        </div>
        <h2 class="text-xl font-semibold mb-4">
          ここに問題文が表示されます。問題の内容を確認してください。
        </h2>
        <div class="space-y-3">
          <label
            v-for="i in 4"
            :key="i"
            class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
          >
            <input
              type="radio"
              name="answer"
              :value="i"
              class="mr-3"
            />
            <span>選択肢 {{ i }}: 回答オプションのテキスト</span>
          </label>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center">
        <button
          v-if="currentQuestion > 1"
          class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          前の問題
        </button>
        <div v-else></div>
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {{ currentQuestion === totalQuestions ? '結果を見る' : '次の問題' }}
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="mt-8">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all"
            :style="{ width: `${(currentQuestion / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const sessionId = computed(() => route.params.id)

// ダミーデータ
const currentQuestion = ref(1)
const totalQuestions = 10

definePageMeta({
  layout: false
})
</script>

