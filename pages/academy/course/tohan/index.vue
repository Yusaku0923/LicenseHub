<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">東販 学習コース</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Course Overview -->
      <section class="bg-white p-6 rounded-lg shadow mb-8">
        <h2 class="text-2xl font-semibold mb-4">コース概要</h2>
        <p class="text-gray-600 mb-4">
          東販の資格取得に向けた包括的な学習コースです。
        </p>
        <div class="flex gap-4 text-sm text-gray-600">
          <span>全10章</span>
          <span>•</span>
          <span>50セクション</span>
          <span>•</span>
          <span>進捗: 25%</span>
        </div>
      </section>

      <!-- Chapters List -->
      <section>
        <h2 class="text-xl font-semibold mb-4">章一覧</h2>
        <div class="space-y-4">
          <div
            v-for="i in 10"
            :key="i"
            class="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  第{{ i }}章: 章タイトル
                </h3>
                <p class="text-sm text-gray-600 mb-2">5セクション</p>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${Math.random() * 100}%` }"
                  ></div>
                </div>
              </div>
              <button class="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                開く
              </button>
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

