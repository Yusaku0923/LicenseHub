<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            資格取得を<br>
            <span class="text-blue-200">「迷わず続けられる学習体験」</span><br>
            で支援
          </h1>
          <p class="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            LicenceHub Academy は、AI が個別最適化した学習プランで<br>
            あなたの資格取得を効率的にサポートします
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/signup"
              class="bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              14日間無料で始める
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Academyについて詳しく
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            なぜ Academy なのか？
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            従来の学習方法の課題を解決し、科学的根拠に基づいた学習体験を提供します
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ph:compass-fill" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">判断の自動化</h3>
            <p class="text-gray-600">
              「今日何をやるか」で迷わないよう、AI があなたの習熟度に基づいて最適な学習内容を自動提案。
              選択肢を絞ることで、学習に集中できます。
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ph:chart-line-up-fill" class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">進捗の可視化</h3>
            <p class="text-gray-600">
              習熟度メーター（0-100）で現在地を明確に表示。カテゴリ別の詳細データで、
              「どこまで来たか」「何が足りないか」を一目で理解できます。
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ph:heart-fill" class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">継続の仕組み</h3>
            <p class="text-gray-600">
              小さな達成感を積み重ねられるタスク設計と、学習習慣を自然に身につけられる
              リマインド機能で、長期的な継続をサポートします。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            学習の流れ
          </h2>
          <p class="text-xl text-gray-600">
            4つのステップで効率的な学習サイクルを実現
          </p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">診断・設定</h3>
            <p class="text-gray-600 text-sm">
              現在のレベルと目標を設定し、個人に最適化された学習プランを生成
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">日々の学習</h3>
            <p class="text-gray-600 text-sm">
              毎日最適な学習タスクを自動提案。講義・演習・暗記をバランス良く
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">進捗分析</h3>
            <p class="text-gray-600 text-sm">
              学習データを分析し、習熟度と弱点を自動検出・可視化
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">最適化</h3>
            <p class="text-gray-600 text-sm">
              分析結果に基づいて学習プランを継続的に調整・改善
            </p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/about/how-it-works"
            class="text-blue-600 hover:text-blue-700 font-semibold"
          >
            学習の流れを詳しく見る →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            シンプルな料金体系
          </h2>
          <p class="text-xl text-gray-600">
            14日間の無料体験で、まずは効果を実感してください
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Free Trial -->
          <div class="border border-gray-200 rounded-xl p-8 text-center">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">無料体験</h3>
            <div class="text-4xl font-bold text-gray-900 mb-2">¥0</div>
            <div class="text-gray-600 mb-6">14日間</div>
            <ul class="text-left space-y-2 mb-8">
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                基本的な学習機能
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                習熟度メーター
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                学習提案（制限あり）
              </li>
            </ul>
            <NuxtLink
              to="/signup"
              class="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors block text-center"
            >
              無料で始める
            </NuxtLink>
          </div>

          <!-- Standard Plan -->
          <div class="border-2 border-blue-500 rounded-xl p-8 text-center relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                おすすめ
              </span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">スタンダード</h3>
            <div class="text-4xl font-bold text-blue-600 mb-2">¥2,980</div>
            <div class="text-gray-600 mb-6">月額（税込）</div>
            <ul class="text-left space-y-2 mb-8">
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                全ての学習機能
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                詳細な習熟度分析
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                無制限の演習・暗記
              </li>
            </ul>
            <NuxtLink
              to="/signup"
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
            >
              プランを選択
            </NuxtLink>
          </div>

          <!-- Premium Plan -->
          <div class="border border-gray-200 rounded-xl p-8 text-center">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">プレミアム</h3>
            <div class="text-4xl font-bold text-purple-600 mb-2">¥4,980</div>
            <div class="text-gray-600 mb-6">月額（税込）</div>
            <ul class="text-left space-y-2 mb-8">
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                スタンダードの全機能
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                AI学習コーチング
              </li>
              <li class="flex items-center text-sm">
                <Icon name="ph:check-circle-fill" class="w-4 h-4 text-green-500 mr-2" />
                優先サポート
              </li>
            </ul>
            <NuxtLink
              to="/signup"
              class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors block text-center"
            >
              プランを選択
            </NuxtLink>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink
            to="/about/pricing"
            class="text-blue-600 hover:text-blue-700 font-semibold"
          >
            料金について詳しく見る →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-6">
          今すぐ始めて、効率的な学習を体験しませんか？
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          14日間の無料体験で、個別最適化された学習の効果を実感してください
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/signup"
            class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            無料体験を始める
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            ログイン
          </NuxtLink>
        </div>
        
        <div class="mt-8 text-blue-200 text-sm">
          <p>✓ クレジットカード不要 ✓ いつでも解約可能 ✓ 7日間返金保証</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">LicenceHub Academy</h3>
            <p class="text-gray-400 text-sm">
              資格取得を「迷わず続けられる学習体験」で支援する次世代の学習プラットフォーム
            </p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Academy について</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/about/concept" class="hover:text-white">思想・コンセプト</NuxtLink></li>
              <li><NuxtLink to="/about/how-it-works" class="hover:text-white">学習の流れ</NuxtLink></li>
              <li><NuxtLink to="/about/pricing" class="hover:text-white">料金・プラン</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">サポート</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/academy" class="hover:text-white">Academy（学習開始）</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white">お問い合わせ</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">法的情報</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/terms" class="hover:text-white">利用規約</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-white">プライバシーポリシー</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white">運営者情報</NuxtLink></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 LicenceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// SEO設定
useSeoMeta({
  title: 'LicenceHub Academy - 資格取得を「迷わず続けられる学習体験」で支援',
  description: 'AI が個別最適化した学習プランで、あなたの資格取得を効率的にサポート。14日間無料体験で、科学的根拠に基づいた学習体験を実感してください。',
})
</script>
