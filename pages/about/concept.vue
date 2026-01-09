<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <nav class="mb-8">
          <NuxtLink to="/about" class="text-blue-200 hover:text-white transition-colors">
            ← Academyについて
          </NuxtLink>
        </nav>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Academyの思想
        </h1>
        <p class="text-xl opacity-90">
          「迷わず続けられる学習体験」を実現するための設計理念
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto prose prose-lg max-w-none">
        <!-- Core Philosophy -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">核となる思想</h2>
          
          <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 class="text-xl font-semibold text-blue-900 mb-3">
              「何を学ぶか」ではなく「どう学ぶか」
            </h3>
            <p class="text-blue-800">
              資格学習で最も重要なのは、膨大な学習範囲の中から「今日何をやるべきか」を正しく判断することです。
              Academyは学習者の迷いを取り除き、最適な学習体験を提供します。
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-3">従来の学習方法</h4>
              <ul class="space-y-2 text-gray-600">
                <li>• 膨大な教材から何を選ぶか迷う</li>
                <li>• 進捗が見えず不安になる</li>
                <li>• 弱点がわからず効率が悪い</li>
                <li>• モチベーション維持が困難</li>
              </ul>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-blue-900 mb-3">Academyの学習体験</h4>
              <ul class="space-y-2 text-blue-800">
                <li>• 毎日最適な学習プランを自動提案</li>
                <li>• リアルタイムで習熟度を可視化</li>
                <li>• 弱点を自動検出し重点的にフォロー</li>
                <li>• 達成感のあるフィードバック</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Design Principles -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">設計原則</h2>
          
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ph:compass-fill" class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">1. 判断の自動化</h3>
                <p class="text-gray-600">
                  学習者が「今日何をやるか」で迷わないよう、AIが習熟度データに基づいて最適な学習内容を自動提案します。
                  選択肢を絞ることで、学習に集中できる環境を作ります。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ph:chart-line-up-fill" class="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">2. 進捗の可視化</h3>
                <p class="text-gray-600">
                  習熟度メーター（0-100）で現在地を明確に表示。カテゴリ別の詳細データと合わせて、
                  「どこまで来たか」「何が足りないか」を一目で理解できます。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ph:target-fill" class="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">3. 適応的な難易度調整</h3>
                <p class="text-gray-600">
                  学習者の理解度に応じて、問題の難易度や学習量を自動調整。
                  無理のないペースで着実にレベルアップできる仕組みです。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ph:heart-fill" class="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">4. 継続のための心理設計</h3>
                <p class="text-gray-600">
                  小さな達成感を積み重ねられるタスク設計と、学習習慣を自然に身につけられる
                  リマインド機能で、長期的な継続をサポートします。
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">私たちのビジョン</h2>
          <p class="text-lg text-gray-700 mb-6">
            資格取得は人生の選択肢を広げる重要なステップです。しかし、多くの人が学習の途中で挫折してしまうのが現実です。
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Academyは、テクノロジーの力で学習体験を根本から変革し、
            「誰もが迷わず、効率的に、楽しく学び続けられる世界」を実現します。
          </p>
          <p class="text-lg font-semibold text-blue-700">
            あなたの資格取得の成功が、私たちの成功です。
          </p>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-12 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <NuxtLink
            to="/about"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Academyについて
          </NuxtLink>
          <div class="flex gap-4">
            <NuxtLink
              to="/about/how-it-works"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              学習の流れを見る →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Academyの思想 - LicenceHub Academy',
  description: '「迷わず続けられる学習体験」を実現するAcademyの設計理念と思想。判断の自動化、進捗の可視化、適応的な難易度調整、継続のための心理設計について詳しく解説します。',
})
</script>
