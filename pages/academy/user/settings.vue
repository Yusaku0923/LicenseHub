<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">設定</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Profile Settings -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">プロフィール</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              お名前
            </label>
            <input
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value="山田 太郎"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value="example@email.com"
            />
          </div>
          <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            保存
          </button>
        </div>
      </section>

      <!-- Notification Settings -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">通知設定</h2>
        <div class="space-y-3">
          <label class="flex items-center justify-between">
            <span class="text-sm text-gray-700">メール通知</span>
            <input type="checkbox" class="rounded border-gray-300" checked />
          </label>
          <label class="flex items-center justify-between">
            <span class="text-sm text-gray-700">学習リマインダー</span>
            <input type="checkbox" class="rounded border-gray-300" checked />
          </label>
          <label class="flex items-center justify-between">
            <span class="text-sm text-gray-700">進捗レポート</span>
            <input type="checkbox" class="rounded border-gray-300" />
          </label>
        </div>
      </section>

      <!-- Privacy Settings -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">プライバシー</h2>
        <div class="space-y-3">
          <button class="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            パスワードを変更
          </button>
          <button class="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            アカウントを削除
          </button>
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

