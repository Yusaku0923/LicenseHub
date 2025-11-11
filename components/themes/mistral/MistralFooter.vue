<template>
    <footer class="mt-20 border-t border-slate-200 bg-white text-slate-700">
      <div class="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <!-- column 1: site info -->
        <div class="space-y-3">
          <NuxtLink to="/" class="block text-lg font-bold text-slate-800 hover:text-emerald-700 transition">
            <img
              src="/images/logo.webp"
              alt="LicenseHub"
              class="h-12 w-auto group-hover:opacity-80 transition"
              width="160"
              height="48"
              sizes="(max-width: 768px) 120px, 160px"
              loading="eager"
              decoding="async"
            />
          </NuxtLink>
          <p class="text-sm leading-relaxed text-slate-600">
            登録販売者試験の合格と実務に役立つ情報を発信しています。<br>
            独学・通信講座・転職など、現場で役立つ知識をやさしく解説します。
          </p>
        </div>
  
        <!-- column 2: menu -->
        <div>
          <h3 class="font-semibold text-slate-900 mb-3">メニュー</h3>
          <ul class="space-y-2 text-sm list-none">
            <li v-for="item in menu" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="hover:text-emerald-700 transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-emerald-700 transition-colors">運営者情報</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="hover:text-emerald-700 transition-colors">プライバシーポリシー</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/disclaimer" class="hover:text-emerald-700 transition-colors">免責事項</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-emerald-700 transition-colors">お問い合わせ</NuxtLink>
            </li>
          </ul>
        </div>
  
        <!-- column 3: CTA / info area -->
        <div>
          <h3 class="font-semibold text-slate-900 mb-3">関連リンク</h3>
          <ul class="space-y-2 text-sm list-none">
            <li>
              <a
                href="https://www.mhlw.go.jp/"
                target="_blank"
                rel="noopener"
                class="hover:text-emerald-700 transition-colors"
              >
                厚生労働省：登録販売者制度について
              </a>
            </li>
            <li>
              <a
                href="https://www.jacds.gr.jp/"
                target="_blank"
                rel="noopener"
                class="hover:text-emerald-700 transition-colors"
              >
                日本チェーンドラッグストア協会
              </a>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- copyright -->
      <div class="border-t border-slate-100 py-6 text-center text-xs text-slate-500">
        © {{ new Date().getFullYear() }} {{ config.name || '登録販売者ナビ' }}. All rights reserved.<br>
        本サイトは資格取得や転職の参考情報を提供するものであり、正確性・最新性を保証するものではありません。<br>
        本サイトの記事には、アフィリエイト広告を含む場合があります。
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  const config = useAppConfig()
  const menu =
    config.menu ||
    [
      { name: '受験対策', path: '/exam' },
      { name: '教材比較', path: '/materials' },
      { name: '仕事・転職', path: '/work' },
      { name: '記事一覧', path: '/articles' },
    ]
  </script>
  