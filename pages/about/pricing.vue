<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <nav class="mb-8">
          <NuxtLink to="/about" class="text-purple-200 hover:text-white transition-colors">
            ← Academyについて
          </NuxtLink>
        </nav>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          料金・プラン
        </h1>
        <p class="text-xl opacity-90">
          シンプルで分かりやすい料金体系
        </p>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          プラン一覧
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Free Plan -->
          <div class="border border-gray-200 rounded-xl p-8 bg-white">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">無料体験</h3>
              <div class="text-4xl font-bold text-gray-900 mb-2">¥0</div>
              <div class="text-gray-600">14日間</div>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">基本的な学習機能</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">習熟度メーター</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">毎日の学習提案（制限あり）</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:x-circle-fill" class="w-5 h-5 text-gray-300 mr-3" />
                <span class="text-gray-400">詳細な分析レポート</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:x-circle-fill" class="w-5 h-5 text-gray-300 mr-3" />
                <span class="text-gray-400">無制限の演習問題</span>
              </li>
            </ul>
            
            <button class="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              無料で始める
            </button>
          </div>

          <!-- Standard Plan -->
          <div class="border-2 border-blue-500 rounded-xl p-8 bg-white relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                おすすめ
              </span>
            </div>
            
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">スタンダード</h3>
              <div class="text-4xl font-bold text-blue-600 mb-2">¥2,980</div>
              <div class="text-gray-600">月額（税込）</div>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">全ての学習機能</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">詳細な習熟度分析</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">無制限の演習・暗記カード</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">学習データエクスポート</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">メールサポート</span>
              </li>
            </ul>
            
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              プランを選択
            </button>
          </div>

          <!-- Premium Plan -->
          <div class="border border-gray-200 rounded-xl p-8 bg-white">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">プレミアム</h3>
              <div class="text-4xl font-bold text-purple-600 mb-2">¥4,980</div>
              <div class="text-gray-600">月額（税込）</div>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">スタンダードの全機能</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">AI学習コーチング</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">個別学習計画の最適化</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">優先サポート</span>
              </li>
              <li class="flex items-center">
                <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">複数資格対応（準備中）</span>
              </li>
            </ul>
            
            <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              プランを選択
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Comparison -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          機能比較表
        </h2>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-gray-900 font-semibold">機能</th>
                <th class="px-6 py-4 text-center text-gray-900 font-semibold">無料体験</th>
                <th class="px-6 py-4 text-center text-blue-600 font-semibold">スタンダード</th>
                <th class="px-6 py-4 text-center text-purple-600 font-semibold">プレミアム</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 text-gray-900">学習提案（1日あたり）</td>
                <td class="px-6 py-4 text-center text-gray-600">最大1タスク</td>
                <td class="px-6 py-4 text-center text-blue-600">最大3タスク</td>
                <td class="px-6 py-4 text-center text-purple-600">無制限</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-900">演習問題</td>
                <td class="px-6 py-4 text-center text-gray-600">10問/日</td>
                <td class="px-6 py-4 text-center text-blue-600">無制限</td>
                <td class="px-6 py-4 text-center text-purple-600">無制限</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-900">暗記カード</td>
                <td class="px-6 py-4 text-center text-gray-600">20枚/日</td>
                <td class="px-6 py-4 text-center text-blue-600">無制限</td>
                <td class="px-6 py-4 text-center text-purple-600">無制限</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-900">詳細分析レポート</td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:x-circle-fill" class="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-gray-900">AI学習コーチング</td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:x-circle-fill" class="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:x-circle-fill" class="w-5 h-5 text-gray-300 mx-auto" />
                </td>
                <td class="px-6 py-4 text-center">
                  <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Policies -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          安心の解約・返金方針
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-green-50 border border-green-200 rounded-xl p-6">
            <Icon name="ph:shield-check-fill" class="w-8 h-8 text-green-600 mb-4" />
            <h3 class="text-xl font-semibold text-green-900 mb-3">
              いつでも解約可能
            </h3>
            <p class="text-green-800">
              契約の縛りはありません。マイページからいつでも簡単に解約できます。
              解約後も期間終了まではサービスをご利用いただけます。
            </p>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <Icon name="ph:clock-countdown-fill" class="w-8 h-8 text-blue-600 mb-4" />
            <h3 class="text-xl font-semibold text-blue-900 mb-3">
              7日間返金保証
            </h3>
            <p class="text-blue-800">
              有料プラン開始から7日以内であれば、理由を問わず全額返金いたします。
              まずは安心してお試しください。
            </p>
          </div>
        </div>
        
        <div class="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 class="text-lg font-semibold text-yellow-900 mb-3">
            💡 お得な年間プラン（準備中）
          </h3>
          <p class="text-yellow-800">
            年間プランでは月額料金から20%割引でご利用いただけます。
            近日中にリリース予定ですので、お楽しみにお待ちください。
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          よくある質問
        </h2>
        
        <div class="space-y-6">
          <div class="bg-white rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Q. 無料体験期間中に解約した場合、料金は発生しますか？
            </h3>
            <p class="text-gray-600">
              A. いいえ、無料体験期間中に解約された場合、料金は一切発生しません。
              体験期間終了の24時間前までに解約手続きを行ってください。
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Q. プランの変更はできますか？
            </h3>
            <p class="text-gray-600">
              A. はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、
              ダウングレードは次回請求日から適用されます。
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Q. 支払い方法は何が利用できますか？
            </h3>
            <p class="text-gray-600">
              A. クレジットカード（Visa、Mastercard、JCB、American Express）に対応しています。
              今後、銀行振込やPayPalなどの決済方法も追加予定です。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">
          まずは無料体験から始めませんか？
        </h2>
        <p class="text-xl mb-8 opacity-90">
          14日間、すべての基本機能を無料でお試しいただけます
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/signup"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            無料体験を始める
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Academyについて詳しく
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-12 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <NuxtLink
            to="/about/how-it-works"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 学習の流れ
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Academyについて →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '料金・プラン - LicenceHub Academy',
  description: 'LicenceHub Academyの料金プランをご紹介。14日間の無料体験から始められ、いつでも解約可能。7日間返金保証付きで安心してお試しいただけます。',
})
</script>
