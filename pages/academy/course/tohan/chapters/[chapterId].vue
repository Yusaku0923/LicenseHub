<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <NuxtLink to="/academy/course/tohan" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← コースに戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">第{{ chapterId }}章: 章タイトル</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Chapter Overview -->
      <section class="bg-white p-6 rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold mb-4">章の概要</h2>
        <p class="text-gray-600">
          この章では、重要な概念と実践的な知識を学習します。
        </p>
        <div class="mt-4 flex gap-4 text-sm text-gray-600">
          <span>5セクション</span>
          <span>•</span>
          <span>進捗: 60%</span>
        </div>
      </section>

      <!-- Sections List -->
      <section>
        <h2 class="text-xl font-semibold mb-4">セクション一覧</h2>
        <div class="space-y-4">
          <div
            v-for="i in 5"
            :key="i"
            class="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-1 text-xs rounded"
                    :class="i === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ i === 1 ? '完了' : '未完了' }}
                  </span>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-1">
                  セクション {{ i }}: セクションタイトル
                </h3>
                <p class="text-sm text-gray-600">約15分</p>
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
const route = useRoute()
const chapterId = computed(() => route.params.chapterId)

definePageMeta({
  layout: false
})
</script>

