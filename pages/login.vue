<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <img src="/images/academy_logo.webp" alt="LicenceHub Academy" class="h-12 mx-auto mb-4">
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">ログイン</h1>
        <p class="text-gray-600 mt-2">アカウントにログインして学習を続けましょう</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="your@example.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="パスワードを入力"
            >
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
            </label>
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              パスワードを忘れた方
            </NuxtLink>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">ログイン</span>
            <span v-else class="flex items-center justify-center">
              <Icon name="ph:spinner" class="w-5 h-5 animate-spin mr-2" />
              ログイン中...
            </span>
          </button>
        </form>

        <!-- Social Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <button
              type="button"
              class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Icon name="ph:google-logo" class="w-5 h-5 mr-3" />
              Googleでログイン
            </button>
          </div>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            アカウントをお持ちでない方は
            <NuxtLink
              to="/signup"
              class="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              新規登録
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <NuxtLink
          to="/"
          class="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← ホームに戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ログイン機能は仮実装
const form = ref({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // TODO: 実際のログイン処理を実装
    await new Promise(resolve => setTimeout(resolve, 1000)) // 仮の遅延
    
    // ログイン成功後は既存のacademyダッシュボードにリダイレクト
    await navigateTo('/academy')
  } catch (error) {
    console.error('Login failed:', error)
    // TODO: エラーハンドリング
  } finally {
    isLoading.value = false
  }
}

// SEO設定
useSeoMeta({
  title: 'ログイン - LicenceHub Academy',
  description: 'LicenceHub Academyにログインして、あなたの学習を続けましょう。',
})
</script>
