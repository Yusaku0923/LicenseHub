<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <NuxtLink to="/academy/course/tohan" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← コースに戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">セクション: {{ sectionSlug }}</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Content Area -->
      <article class="bg-white p-8 rounded-lg shadow mb-8">
        <div class="prose max-w-none">
          <h2 class="text-2xl font-semibold mb-4">セクションタイトル</h2>
          <div class="space-y-4 text-gray-700">
            <p>
              ここにセクションのコンテンツが表示されます。テキスト、画像、動画などが含まれます。
            </p>
            <p>
              学習内容の詳細な説明や、重要なポイントがここに記載されます。
            </p>
          </div>
        </div>
      </article>

      <!-- Navigation -->
      <div class="flex justify-between items-center bg-white p-6 rounded-lg shadow">
        <button class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          前のセクション
        </button>
        <div class="text-sm text-gray-600">
          進捗: 3/5
        </div>
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          次のセクション
        </button>
      </div>

      <!-- Sidebar (optional) -->
      <aside class="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 class="font-semibold mb-4">このセクションの要点</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li>• 重要なポイント1</li>
          <li>• 重要なポイント2</li>
          <li>• 重要なポイント3</li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const sectionSlug = computed(() => route.params.sectionSlug)

definePageMeta({
  layout: false
})
</script>

