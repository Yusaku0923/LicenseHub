<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">試験情報</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Exam Registration -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">試験登録</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              試験名
            </label>
            <input
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例: 東販 2024年度"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              試験日
            </label>
            <input
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            登録
          </button>
        </div>
      </section>

      <!-- Registered Exams -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">登録済み試験</h2>
        <div class="space-y-4">
          <div
            v-for="i in 2"
            :key="i"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-900">東販 {{ 2024 + i }}年度</h3>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                登録済み
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">試験日: 2024年{{ 6 + i }}月15日</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                編集
              </button>
              <button class="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                削除
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Study Progress -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">学習進捗</h2>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-700">全体進捗</span>
              <span class="text-gray-600">65%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-700">練習問題完了率</span>
              <span class="text-gray-600">45%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: 45%"></div>
            </div>
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

