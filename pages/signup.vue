<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <img src="/images/academy_logo.webp" alt="LicenceHub Academy" class="h-12 mx-auto mb-4">
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">新規登録</h1>
        <p class="text-gray-600 mt-2">14日間の無料体験を始めましょう</p>
      </div>

      <!-- Signup Form -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              お名前
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="山田太郎"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
              minlength="8"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="8文字以上のパスワード"
            >
            <p class="text-xs text-gray-500 mt-1">
              8文字以上で、英数字を含むパスワードを設定してください
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              パスワード（確認）
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="パスワードを再入力"
            >
          </div>

          <!-- Target Exam -->
          <div>
            <label for="targetExam" class="block text-sm font-medium text-gray-700 mb-2">
              目標資格
            </label>
            <select
              id="targetExam"
              v-model="form.targetExam"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="">選択してください</option>
              <option value="tohan">登録販売者</option>
              <option value="other">その他（準備中）</option>
            </select>
          </div>

          <!-- Terms Agreement -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
            >
            <label for="terms" class="ml-3 text-sm text-gray-600">
              <NuxtLink to="/terms" class="text-green-600 hover:text-green-700 underline">利用規約</NuxtLink>
              および
              <NuxtLink to="/privacy" class="text-green-600 hover:text-green-700 underline">プライバシーポリシー</NuxtLink>
              に同意します
            </label>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">無料体験を始める</span>
            <span v-else class="flex items-center justify-center">
              <Icon name="ph:spinner" class="w-5 h-5 animate-spin mr-2" />
              登録中...
            </span>
          </button>
        </form>

        <!-- Social Signup -->
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
              Googleで登録
            </button>
          </div>
        </div>

        <!-- Login Link -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            すでにアカウントをお持ちの方は
            <NuxtLink
              to="/login"
              class="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              ログイン
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Benefits -->
      <div class="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">無料体験に含まれるもの</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-center">
            <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
            14日間すべての基本機能が利用可能
          </li>
          <li class="flex items-center">
            <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
            個別最適化された学習プラン
          </li>
          <li class="flex items-center">
            <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
            習熟度の可視化とフィードバック
          </li>
          <li class="flex items-center">
            <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
            いつでも解約可能・自動課金なし
          </li>
        </ul>
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
// サインアップ機能は仮実装
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  targetExam: '',
  agreeToTerms: false
})

const isLoading = ref(false)

const isFormValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.targetExam &&
         form.value.agreeToTerms
})

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  try {
    // TODO: 実際のサインアップ処理を実装
    await new Promise(resolve => setTimeout(resolve, 1000)) // 仮の遅延
    
    // サインアップ成功後は既存のacademyダッシュボードにリダイレクト
    await navigateTo('/academy')
  } catch (error) {
    console.error('Signup failed:', error)
    // TODO: エラーハンドリング
  } finally {
    isLoading.value = false
  }
}

// SEO設定
useSeoMeta({
  title: '新規登録 - LicenceHub Academy',
  description: 'LicenceHub Academyの14日間無料体験を始めましょう。個別最適化された学習体験で効率的な資格取得をサポートします。',
})
</script>
