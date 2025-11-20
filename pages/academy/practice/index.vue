<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">練習問題</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Practice Options -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">新しい練習セッション</h2>
          <p class="text-gray-600 mb-4">問題を解いて実力を確認しましょう</p>
          <button class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            練習を開始
          </button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">設定</h2>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300" checked />
              <span class="ml-2 text-sm text-gray-700">ランダム出題</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300" />
              <span class="ml-2 text-sm text-gray-700">間違えた問題のみ</span>
            </label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>10問</option>
              <option>20問</option>
              <option>30問</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Recent Sessions -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">最近のセッション</h2>
        <div class="space-y-4">
          <div
            v-for="i in 5"
            :key="i"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div>
              <p class="font-medium text-gray-900">セッション {{ i }}</p>
              <p class="text-sm text-gray-600">2024年1月{{ i }}日 - 正答率: {{ 60 + i * 5 }}%</p>
            </div>
            <button class="px-4 py-2 text-blue-600 hover:text-blue-700">
              結果を見る
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
</script>

