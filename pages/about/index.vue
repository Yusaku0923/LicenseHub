<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          LicenceHub Academy
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          資格取得を「迷わず続けられる学習体験」で支援する<br>
          次世代の学習プラットフォーム
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/about/concept"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Academyの思想を知る
          </NuxtLink>
          <NuxtLink
            to="/about/how-it-works"
            class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            学習の流れを見る
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          なぜAcademyなのか？
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:brain-fill" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">個別最適化された学習</h3>
            <p class="text-gray-600">
              あなたの習熟度と学習ペースに合わせて、毎日最適な学習プランを自動提案します。
            </p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:chart-line-up-fill" class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">見える化された進捗</h3>
            <p class="text-gray-600">
              習熟度メーターと詳細な学習データで、現在地と目標までの道のりが一目瞭然。
            </p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:calendar-check-fill" class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3">継続しやすい仕組み</h3>
            <p class="text-gray-600">
              無理のないノルマ設定と達成感のあるフィードバックで、学習習慣を自然に身につけます。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Cards -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          詳しく知る
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            to="/about/concept"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <Icon name="ph:lightbulb-fill" class="w-8 h-8 text-yellow-500 mb-4" />
            <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              Academyの思想
            </h3>
            <p class="text-gray-600">
              「迷わず続けられる学習体験」の理念と設計思想について
            </p>
          </NuxtLink>
          <NuxtLink
            to="/about/how-it-works"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <Icon name="ph:gear-fill" class="w-8 h-8 text-blue-500 mb-4" />
            <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              学習の流れ
            </h3>
            <p class="text-gray-600">
              判断支援システムと習熟度の考え方について
            </p>
          </NuxtLink>
          <NuxtLink
            to="/about/pricing"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <Icon name="ph:currency-circle-dollar-fill" class="w-8 h-8 text-green-500 mb-4" />
            <h3 class="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              料金・プラン
            </h3>
            <p class="text-gray-600">
              料金体系、無料体験、解約方針について
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 bg-blue-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">
          今すぐ始めてみませんか？
        </h2>
        <p class="text-xl mb-8 opacity-90">
          無料体験で、あなたに最適化された学習体験を実感してください
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/signup"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            無料で始める
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            ログイン
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO設定
useSeoMeta({
  title: 'LicenceHub Academy について',
  description: '資格取得を「迷わず続けられる学習体験」で支援する次世代の学習プラットフォーム。個別最適化された学習プランと見える化された進捗管理で、効率的な資格取得をサポートします。',
})
</script>
