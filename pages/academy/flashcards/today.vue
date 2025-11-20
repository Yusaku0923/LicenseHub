<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">今日の単語カード</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Stats -->
      <div class="bg-white p-6 rounded-lg shadow mb-8">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-semibold text-gray-900">15</div>
            <div class="text-sm text-gray-600">今日のカード</div>
          </div>
          <div>
            <div class="text-2xl font-semibold text-blue-600">8</div>
            <div class="text-sm text-gray-600">残り</div>
          </div>
          <div>
            <div class="text-2xl font-semibold text-green-600">7</div>
            <div class="text-sm text-gray-600">完了</div>
          </div>
        </div>
      </div>

      <!-- Flashcard -->
      <div class="relative mb-8" style="height: 400px;">
        <div
          class="absolute inset-0 bg-white rounded-lg shadow-lg p-8 flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
          @click="flipCard"
        >
          <div v-if="!isFlipped" class="text-center">
            <p class="text-sm text-gray-500 mb-4">表面</p>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">用語・概念</h2>
            <p class="text-gray-600">カードをクリックして裏面を見る</p>
          </div>
          <div v-else class="text-center">
            <p class="text-sm text-gray-500 mb-4">裏面</p>
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">説明・定義</h2>
            <p class="text-gray-700">
              ここに用語の詳細な説明や定義が表示されます。
              重要なポイントや関連情報も含まれます。
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 mb-6">
        <button class="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
          もう一度
        </button>
        <button class="flex-1 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
          難しい
        </button>
        <button class="flex-1 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
          簡単
        </button>
      </div>

      <!-- Progress -->
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">進捗</span>
          <span class="text-sm text-gray-600">7/15</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all"
            style="width: 46.67%"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const isFlipped = ref(false)

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

definePageMeta({
  layout: false
})
</script>

