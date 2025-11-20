<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900">練習結果</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Result Summary -->
      <div class="bg-white p-8 rounded-lg shadow mb-8">
        <div class="text-center mb-6">
          <div class="text-5xl font-bold text-blue-600 mb-2">75%</div>
          <p class="text-gray-600">正答率</p>
        </div>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-semibold text-gray-900">10</div>
            <div class="text-sm text-gray-600">総問題数</div>
          </div>
          <div>
            <div class="text-2xl font-semibold text-green-600">7</div>
            <div class="text-sm text-gray-600">正解</div>
          </div>
          <div>
            <div class="text-2xl font-semibold text-red-600">3</div>
            <div class="text-sm text-gray-600">不正解</div>
          </div>
        </div>
      </div>

      <!-- Question Review -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">問題の復習</h2>
        <div class="space-y-4">
          <div
            v-for="i in 10"
            :key="i"
            class="bg-white p-6 rounded-lg shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-medium text-gray-900">問題 {{ i }}</h3>
              <span
                class="px-3 py-1 text-sm rounded"
                :class="i % 3 === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
              >
                {{ i % 3 === 0 ? '不正解' : '正解' }}
              </span>
            </div>
            <p class="text-gray-700 mb-2">問題文の内容がここに表示されます。</p>
            <div class="text-sm">
              <p class="text-gray-600">あなたの回答: 選択肢 {{ (i % 4) + 1 }}</p>
              <p class="text-gray-600">正解: 選択肢 {{ ((i + 1) % 4) + 1 }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex gap-4">
        <button class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          もう一度練習する
        </button>
        <NuxtLink
          to="/academy/practice"
          class="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50"
        >
          練習一覧に戻る
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const sessionId = computed(() => route.params.id)

definePageMeta({
  layout: false
})
</script>

