<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">新規登録</h1>
        <p class="text-gray-600">新しいアカウントを作成してください</p>
      </div>

      <!-- Signup Form -->
      <div class="bg-white p-8 rounded-lg shadow">
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              お名前
            </label>
            <input
              id="name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <p class="mt-1 text-xs text-gray-500">8文字以上で入力してください</p>
          </div>

          <div>
            <label for="password-confirm" class="block text-sm font-medium text-gray-700 mb-2">
              パスワード（確認）
            </label>
            <input
              id="password-confirm"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-start">
            <input
              id="terms"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-blue-600"
            />
            <label for="terms" class="ml-2 text-sm text-gray-600">
              利用規約とプライバシーポリシーに同意します
            </label>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            アカウントを作成
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            既にアカウントをお持ちの方は
            <NuxtLink to="/academy/auth/login" class="text-blue-600 hover:text-blue-700 font-medium">
              ログイン
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
</script>

