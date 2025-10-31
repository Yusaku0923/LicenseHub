<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- header -->
    <header class="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <p class="text-xs tracking-wide text-emerald-700 font-semibold">
            登録販売者 合格と実務のための情報サイト
          </p>
          <h1 class="text-xl font-bold leading-tight">
            {{ siteTitle }}
          </h1>
        </div>
        <NuxtLink
          to="/archives"
          class="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition"
        >
          最新記事
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <!-- hero: 試験特化 -->
      <section class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div class="flex flex-col gap-6 md:flex-row md:items-center">
          <div class="flex-1 space-y-4">
            <p class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              はじめてでもOK / 独学OK / 働きながらOK
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              登録販売者に合格するまでを一つのブログで。
            </h2>
            <p class="text-slate-600 leading-relaxed">
              {{ descriptionText }}
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/guide/how-to-start"
                class="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                はじめての方へ
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <NuxtLink
                to="/posts/recommended-textbooks"
                class="inline-flex items-center gap-1 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200 transition"
              >
                おすすめ教材を見る
              </NuxtLink>
              <NuxtLink
                to="/archives"
                class="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                記事一覧 →
              </NuxtLink>
            </div>
          </div>

          <!-- アフィリの置き場 -->
          <div class="md:w-60">
            <div class="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p class="text-xs font-semibold text-emerald-900 mb-3">
                迷ったらこの教材
              </p>
              <ul class="space-y-2 text-sm text-emerald-950">
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <NuxtLink to="/posts/best-correspondence-2025" class="hover:underline">
                    通信講座：時短で合格したい方向け
                  </NuxtLink>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <NuxtLink to="/posts/best-textbook-2025" class="hover:underline">
                    独学テキスト：コスパ重視
                  </NuxtLink>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <NuxtLink to="/posts/mock-exam-collection" class="hover:underline">
                    模試・過去問：直前対策用
                  </NuxtLink>
                </li>
              </ul>
              <p class="mt-3 text-[10px] text-emerald-900/70">
                ※一部記事にはアフィリエイトリンクを含みます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 新着（後でBloggrifyのqueryContentに差し替え） -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">
            新着記事
          </h3>
          <NuxtLink to="/archives" class="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            すべて見る →
          </NuxtLink>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <!-- 仮のカード。ここに実データを流し込む -->
          <article class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p class="text-xs text-emerald-700 font-medium mb-1">勉強法</p>
            <NuxtLink to="/posts/study-3months-plan" class="block text-sm font-semibold text-slate-900 hover:text-emerald-700">
              3か月で合格を狙う学習スケジュール
            </NuxtLink>
            <p class="mt-2 text-xs text-slate-500">忙しい方向けの分割プラン</p>
          </article>
          <article class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p class="text-xs text-emerald-700 font-medium mb-1">教材レビュー</p>
            <NuxtLink to="/posts/recommended-textbooks" class="block text-sm font-semibold text-slate-900 hover:text-emerald-700">
              2025年版テキストの比較と選び方
            </NuxtLink>
            <p class="mt-2 text-xs text-slate-500">アフィリ記事に差し替え可</p>
          </article>
          <article class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p class="text-xs text-emerald-700 font-medium mb-1">法規・制度</p>
            <NuxtLink to="/posts/law-update-2025" class="block text-sm font-semibold text-slate-900 hover:text-emerald-700">
              制度改正のチェックポイント
            </NuxtLink>
            <p class="mt-2 text-xs text-slate-500">出題されやすい部分を要約</p>
          </article>
        </div>
      </section>

      <!-- カテゴリ導線（試験範囲に対応） -->
      <section class="space-y-3">
        <h3 class="text-lg font-semibold text-slate-900">試験範囲から探す</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink to="/categories/human-body" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            人体の構造・機能
          </NuxtLink>
          <NuxtLink to="/categories/medicine" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            医薬品の知識
          </NuxtLink>
          <NuxtLink to="/categories/law" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            関連法規・制度
          </NuxtLink>
          <NuxtLink to="/categories/public-health" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            衛生・公衆衛生
          </NuxtLink>
          <NuxtLink to="/categories/past-exam" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            過去問・模試
          </NuxtLink>
          <NuxtLink to="/categories/work" class="px-3 py-1.5 rounded-md bg-white border text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700">
            現場での対応
          </NuxtLink>
        </div>
      </section>
    </main>

    <footer class="py-10 text-center text-xs text-slate-400">
      &copy; {{ new Date().getFullYear() }} {{ siteTitle }}.
    </footer>
  </div>
</template>

<script setup lang="ts">
const config = useAppConfig()
const siteTitle = config.name || '登録販売者ブログ'
const descriptionText =
  config.description ||
  '独学・働きながらの受験でも迷わないように、教材選びと試験範囲の要点をまとめています。各記事から公式サイト・講座サイトにも移動できます。'
</script>
