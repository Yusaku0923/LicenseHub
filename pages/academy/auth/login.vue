<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">ログイン</h1>
        <p class="text-gray-600">アカウントにログインしてください</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white p-8 rounded-lg shadow">
        <form class="space-y-6">
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
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600" />
              <span class="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">
              パスワードを忘れた場合
            </a>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            ログイン
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            アカウントをお持ちでない方は
            <NuxtLink to="/academy/auth/signup" class="text-blue-600 hover:text-blue-700 font-medium">
              新規登録
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

