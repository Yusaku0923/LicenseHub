<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <section class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <nav class="mb-8">
          <NuxtLink to="/about" class="text-green-200 hover:text-white transition-colors">
            ← Academyについて
          </NuxtLink>
        </nav>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          学習の流れ
        </h1>
        <p class="text-xl opacity-90">
          判断支援システムと習熟度の考え方
        </p>
      </div>
    </section>

    <!-- Learning Flow -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Academyでの学習フロー
        </h2>
        
        <div class="grid md:grid-cols-4 gap-8 mb-16">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">診断・設定</h3>
            <p class="text-gray-600 text-sm">
              現在のレベルと目標を設定し、個人に最適化された学習プランを生成
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">日々の学習</h3>
            <p class="text-gray-600 text-sm">
              毎日最適な学習タスクを自動提案。講義・演習・暗記をバランス良く
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">進捗分析</h3>
            <p class="text-gray-600 text-sm">
              学習データを分析し、習熟度と弱点を自動検出・可視化
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">最適化</h3>
            <p class="text-gray-600 text-sm">
              分析結果に基づいて学習プランを継続的に調整・改善
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Learning Experience -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          毎日の学習体験
        </h2>
        
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">
            📅 今日の学習提案（例）
          </h3>
          
          <div class="space-y-4">
            <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-blue-900">📖 講義：第3章「主な医薬品とその作用」</h4>
                <span class="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">推定20分</span>
              </div>
              <p class="text-blue-800 text-sm">
                前回の演習で苦手と判定された分野を重点的に学習します
              </p>
            </div>
            
            <div class="border border-green-200 rounded-lg p-4 bg-green-50">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-green-900">✏️ 演習：過去問 10問</h4>
                <span class="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">推定15分</span>
              </div>
              <p class="text-green-800 text-sm">
                習熟度70%の分野から出題。理解度に応じて難易度を調整
              </p>
            </div>
            
            <div class="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-purple-900">🧠 暗記カード：重要用語 15枚</h4>
                <span class="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">推定10分</span>
              </div>
              <p class="text-purple-800 text-sm">
                忘却曲線に基づいて復習タイミングを最適化
              </p>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-yellow-800 text-sm">
              💡 <strong>今日の目標：</strong>全体習熟度を72%→74%に向上させましょう
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mastery System -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          習熟度システムの考え方
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              📊 習熟度メーター（0-100）
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">0-30%</span>
                <span class="text-sm font-medium text-red-600">基礎学習期</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">30-60%</span>
                <span class="text-sm font-medium text-yellow-600">理解定着期</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">60-80%</span>
                <span class="text-sm font-medium text-blue-600">応用練習期</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">80-100%</span>
                <span class="text-sm font-medium text-green-600">試験準備期</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              🎯 判断支援の仕組み
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>• <strong>学習履歴分析：</strong>過去の正答率と学習時間を考慮</li>
              <li>• <strong>忘却曲線モデル：</strong>記憶の定着度を予測</li>
              <li>• <strong>弱点自動検出：</strong>苦手分野を優先的に提案</li>
              <li>• <strong>負荷分散：</strong>疲労度に応じて学習量を調整</li>
            </ul>
          </div>
        </div>
        
        <!-- Confidence Level -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 class="text-xl font-semibold text-blue-900 mb-4">
            🔍 信頼度（データ十分度）
          </h3>
          <p class="text-blue-800 mb-4">
            習熟度の精度を表す指標です。学習データが蓄積されるほど信頼度が向上し、
            より正確な学習提案が可能になります。
          </p>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <div class="text-red-500 font-semibold mb-1">信頼度 低（0-30%）</div>
              <div class="text-sm text-gray-600">学習開始直後。基本的な提案のみ</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <div class="text-yellow-500 font-semibold mb-1">信頼度 中（30-70%）</div>
              <div class="text-sm text-gray-600">ある程度個人に最適化された提案</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <div class="text-green-500 font-semibold mb-1">信頼度 高（70-100%）</div>
              <div class="text-sm text-gray-600">高精度な個別最適化学習</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-12 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <NuxtLink
            to="/about/concept"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Academyの思想
          </NuxtLink>
          <div class="flex gap-4">
            <NuxtLink
              to="/about/pricing"
              class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              料金を見る →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '学習の流れ - LicenceHub Academy',
  description: 'Academyの判断支援システムと習熟度の考え方を詳しく解説。毎日の学習体験から習熟度メーター、信頼度システムまで、効率的な学習を支える仕組みをご紹介します。',
})
</script>
