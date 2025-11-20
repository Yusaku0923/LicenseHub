<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <NuxtLink to="/academy" class="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← 戻る
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">サブスクリプション</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Current Plan -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">現在のプラン</h2>
        <div class="border-2 border-blue-500 rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">プレミアムプラン</h3>
              <p class="text-sm text-gray-600">全機能にアクセス可能</p>
            </div>
            <span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
              アクティブ
            </span>
          </div>
          <div class="space-y-2 text-sm text-gray-700">
            <p>• 全コースへのアクセス</p>
            <p>• 無制限の練習問題</p>
            <p>• 優先サポート</p>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-2xl font-bold text-gray-900">¥2,980<span class="text-base font-normal text-gray-600">/月</span></p>
            <p class="text-sm text-gray-600">次回更新日: 2024年2月15日</p>
          </div>
        </div>
      </section>

      <!-- Available Plans -->
      <section class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">プラン一覧</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold mb-2">ベーシック</h3>
            <p class="text-2xl font-bold mb-2">¥980<span class="text-base font-normal">/月</span></p>
            <ul class="text-sm text-gray-600 space-y-1 mb-4">
              <li>• 基本コース</li>
              <li>• 月50問まで</li>
            </ul>
            <button class="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            選択
          </button>
          </div>
          <div class="border-2 border-blue-500 rounded-lg p-4">
            <h3 class="font-semibold mb-2">プレミアム</h3>
            <p class="text-2xl font-bold mb-2">¥2,980<span class="text-base font-normal">/月</span></p>
            <ul class="text-sm text-gray-600 space-y-1 mb-4">
              <li>• 全コース</li>
              <li>• 無制限</li>
              <li>• 優先サポート</li>
            </ul>
            <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            現在のプラン
          </button>
          </div>
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold mb-2">年間プラン</h3>
            <p class="text-2xl font-bold mb-2">¥29,800<span class="text-base font-normal">/年</span></p>
            <p class="text-xs text-green-600 mb-2">2ヶ月分お得！</p>
            <ul class="text-sm text-gray-600 space-y-1 mb-4">
              <li>• 全コース</li>
              <li>• 無制限</li>
              <li>• 優先サポート</li>
            </ul>
            <button class="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            選択
          </button>
          </div>
        </div>
      </section>

      <!-- Billing History -->
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">支払い履歴</h2>
        <div class="space-y-3">
          <div
            v-for="i in 3"
            :key="i"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <p class="font-medium text-gray-900">プレミアムプラン</p>
              <p class="text-sm text-gray-600">2024年{{ 1 + i }}月15日</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">¥2,980</p>
              <p class="text-sm text-green-600">支払い済み</p>
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

