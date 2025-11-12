<template>
  <!-- ヘッダー -->
  <MistralHeader />

  <!-- ハブページレイアウト -->
  <MistralHomeLayout>
    <template #posts>
      <div class="px-4 mt-6 md:px-0">
        <MistralBreadcrumbs :doc="doc" />
      </div>

      <div v-if="doc" class="pt-6 pb-0 px-4 md:px-0">
        <!-- ① Hub Hero：目的から探せるハブ感を強める -->
        <section
          class="hub-hero"
        >
          <div class="flex-1 space-y-3">
            <p class="hub-hero__eyebrow">
              LicenceHub｜登録販売者ナビゲーションハブ
            </p>

            <h1 class="hub-hero__title">
              {{ doc.title }}
            </h1>

            <p v-if="doc.description" class="hub-hero__description">
              {{ doc.description }}
            </p>

            <!-- 目的別ガイドのクイックピル -->
            <div class="hub-hero__pills">
              <button
                type="button"
                class="hub-hero__pill"
                :class="{ 'hub-hero__pill--active': activeSection === 'exam' }"
                @click="activeSection = 'exam'"
              >
                まずは資格の全体像を知りたい
              </button>
              <button
                type="button"
                class="hub-hero__pill"
                :class="{ 'hub-hero__pill--active': activeSection === 'materials' }"
                @click="activeSection = 'materials'"
              >
                自分に合う勉強方法を選びたい
              </button>
              <button
                type="button"
                class="hub-hero__pill"
                :class="{ 'hub-hero__pill--active': activeSection === 'work' }"
                @click="activeSection = 'work'"
              >
                将来の年収やキャリアが気になる
              </button>
            </div>
          </div>

          <!-- 右側：シンプルな「現在地インフォ」 -->
          <div class="hub-hero__status">
            <p class="hub-hero__status-label">今いる場所</p>
            <p class="hub-hero__status-main">
              登録販売者の<span class="hub-hero__status-accent">全体ガイド</span>
            </p>
            <p class="hub-hero__status-sub">
              このページから「試験」「教材」「働き方」「コラム」に
              迷わずアクセスできます。
            </p>
          </div>
        </section>

        <!-- ② 学びのジャーニー：Step 1 → 2 → 3 を可視化 -->
        <section class="hub-journey-section">
          <div class="hub-section-header">
            <h2 class="hub-section-header__title">学びのステップで見る LicenceHub</h2>
            <p class="hub-section-header__lead">
              「知る → 学ぶ → 働く」の3ステップで、登録販売者の学習とキャリアをデザインできます。
            </p>
          </div>

          <div class="hub-journey">
            <!-- Step 1 -->
            <NuxtLink
              to="/licenses/tohan/exam"
              class="hub-journey__card"
              @click="activeSection = 'exam'"
            >
              <div class="hub-journey__step">STEP 1</div>
              <h3 class="hub-journey__title">資格と試験の全体像をつかむ</h3>
              <p class="hub-journey__body">
                試験概要・出題範囲・難易度・合格率を整理して、
                「目指す価値があるか」「いつ受験するか」を判断できます。
              </p>
              <ul class="hub-journey__links">
                <li>登録販売者試験の概要と出題範囲</li>
                <li>登録販売者試験の難易度と合格率</li>
                <li>都道府県別の試験日程・申込スケジュール</li>
              </ul>
            </NuxtLink>

            <!-- ステップ間のコネクタ（装飾） -->
            <div class="hub-journey__connector" aria-hidden="true"></div>

            <!-- Step 2 -->
            <NuxtLink
              to="/licenses/tohan/materials"
              class="hub-journey__card"
              @click="activeSection = 'materials'"
            >
              <div class="hub-journey__step">STEP 2</div>
              <h3 class="hub-journey__title">自分に合う勉強スタイルを決める</h3>
              <p class="hub-journey__body">
                独学・通信講座・月額サービスを比較しながら、
                予算と生活リズムに合う学習プランを設計します。
              </p>
              <ul class="hub-journey__links">
                <li>独学と通信講座どちらが合格しやすい？</li>
                <li>三幸医療カレッジの口コミ・評判まとめ</li>
                <li>SMART合格講座・オンスク.JPの比較</li>
              </ul>
            </NuxtLink>

            <div class="hub-journey__connector" aria-hidden="true"></div>

            <!-- Step 3 -->
            <NuxtLink
              to="/licenses/tohan/work"
              class="hub-journey__card"
              @click="activeSection = 'work'"
            >
              <div class="hub-journey__step">STEP 3</div>
              <h3 class="hub-journey__title">働き方とキャリアアップを描く</h3>
              <p class="hub-journey__body">
                年収相場・職場ごとの違い・ダブルライセンス戦略を踏まえて、
                数年後のキャリアプランを具体化していきます。
              </p>
              <ul class="hub-journey__links">
                <li>登録販売者の年収・キャリアアップ実態</li>
                <li>ドラッグストアと調剤薬局の働き方の違い</li>
                <li>登録販売者からのキャリアアップ戦略</li>
              </ul>
            </NuxtLink>
          </div>
        </section>

        <!-- ③ タブ切り替え型 Hub コンテンツ -->
        <section class="hub-tabs">
          <div class="hub-tabs__bar">
            <button
              type="button"
              class="hub-tab"
              :class="{ 'hub-tab--active': activeSection === 'exam' }"
              @click="activeSection = 'exam'"
            >
              Exam
              <span class="hub-tab__sub">試験ガイド</span>
            </button>
            <button
              type="button"
              class="hub-tab"
              :class="{ 'hub-tab--active': activeSection === 'materials' }"
              @click="activeSection = 'materials'"
            >
              Materials
              <span class="hub-tab__sub">教材・通信講座</span>
            </button>
            <button
              type="button"
              class="hub-tab"
              :class="{ 'hub-tab--active': activeSection === 'work' }"
              @click="activeSection = 'work'"
            >
              Work
              <span class="hub-tab__sub">働き方・年収</span>
            </button>
            <button
              type="button"
              class="hub-tab"
              :class="{ 'hub-tab--active': activeSection === 'articles' }"
              @click="activeSection = 'articles'"
            >
              Articles
              <span class="hub-tab__sub">コラム・勉強法</span>
            </button>
          </div>

          <!-- タブ配下のカードグリッド（既存4セクションを再構成） -->
          <div class="hub-tabs__content">
            <!-- Exam -->
            <div v-show="activeSection === 'exam'" class="hub-tabs__panel">
              <NuxtLink to="/licenses/tohan/exam" class="hub-card">
                <div class="hub-card__label">Exam</div>
                <h2 class="hub-card__title">試験ガイド・難易度・合格率</h2>
                <p class="hub-card__body">
                  試験概要・出題範囲・難易度・合格率など、
                  登録販売者試験の全体像をここから整理できます。
                </p>
                <ul class="hub-card__links">
                  <li>登録販売者試験の概要と出題範囲</li>
                  <li>登録販売者試験の難易度と合格率</li>
                  <li>都道府県別の試験日程・申込スケジュール</li>
                </ul>
              </NuxtLink>
            </div>

            <!-- Materials -->
            <div v-show="activeSection === 'materials'" class="hub-tabs__panel">
              <NuxtLink to="/licenses/tohan/materials" class="hub-card">
                <div class="hub-card__label">Materials</div>
                <h2 class="hub-card__title">教材・通信講座・独学ツール</h2>
                <p class="hub-card__body">
                  市販テキストから通信講座、月額学習サービスまで、
                  あなたに合った勉強ツールを比較できます。
                </p>
                <ul class="hub-card__links">
                  <li>独学と通信講座どちらが合格しやすい？</li>
                  <li>三幸医療カレッジの口コミ・評判まとめ</li>
                  <li>SMART合格講座・オンスク.JPの比較</li>
                </ul>
              </NuxtLink>
            </div>

            <!-- Work -->
            <div v-show="activeSection === 'work'" class="hub-tabs__panel">
              <NuxtLink to="/licenses/tohan/work" class="hub-card">
                <div class="hub-card__label">Work</div>
                <h2 class="hub-card__title">年収・働き方・キャリアアップ</h2>
                <p class="hub-card__body">
                  登録販売者として働くときの年収相場や職場ごとの特徴、
                  ダブルライセンス戦略などをまとめています。
                </p>
                <ul class="hub-card__links">
                  <li>登録販売者の年収・キャリアアップ実態</li>
                  <li>ドラッグストアと調剤薬局の働き方の違い</li>
                  <li>登録販売者からのキャリアアップ戦略</li>
                </ul>
              </NuxtLink>
            </div>

            <!-- Articles -->
            <div v-show="activeSection === 'articles'" class="hub-tabs__panel">
              <NuxtLink to="/licenses/tohan/articles" class="hub-card">
                <div class="hub-card__label">Articles</div>
                <h2 class="hub-card__title">コラム・勉強法・体験談</h2>
                <p class="hub-card__body">
                  勉強の進め方やスキマ時間活用術、実際の合格体験談など、
                  読み物系コンテンツを集約しています。
                </p>
                <ul class="hub-card__links">
                  <li>登録販売者の勉強法まとめ</li>
                  <li>暗記カード・一問一答コンテンツ</li>
                  <li>合格者インタビュー・体験談</li>
                </ul>
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- ④ 必要であれば Markdown 本文（補足） -->
        <section v-if="doc.body" class="mb-10">
          <div class="bg-white rounded-2xl border border-slate-100 px-5 py-6 md:px-7 md:py-7">
            <ContentRenderer
              id="nuxtContent"
              :value="doc"
              class="prose article-body max-w-none"
            />
          </div>
        </section>

        <!-- タグ -->
        <div
          v-if="doc.tags && doc.tags.length > 0"
          class="flex flex-wrap gap-3 mt-4 mb-10"
        >
          <NuxtLink
            v-for="tag in doc.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="bg-slate-100 rounded-full px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </template>

    <!-- サイドバー -->
    <template #sidebar>
      <MistralSidebar :tags="doc?.tags" />
    </template>
  </MistralHomeLayout>

  <MistralFooter />
</template>

<script setup lang="ts">
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
import MistralBreadcrumbs from '~/components/themes/mistral/MistralBreadcrumbs.vue'

defineProps<{
  doc: any
}>()

const config = useAppConfig()
const route = useRoute()

const activeSection = ref<'exam' | 'materials' | 'work' | 'articles'>('exam')

useSeoMeta({
  // 既存の SEO 設定をここに維持
})

useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.site.domain}${route.path}`,
    },
  ],
})
</script>

<style lang="scss" scoped>
/* ① Hub Hero */
.hub-hero {
  @apply rounded-2xl border border-[rgba(50,93,206,0.14)]
         bg-gradient-to-br from-[rgba(50,93,206,0.06)] via-white to-[rgba(133,196,255,0.08)]
         px-6 py-6 md:px-8 md:py-7 mb-8 flex flex-col gap-5 md:flex-row md:items-center;
}

.hub-hero__eyebrow {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
         bg-white/80 border border-[rgba(50,93,206,0.2)]
         text-[color:var(--brand)];
}

.hub-hero__title {
  @apply text-3xl md:text-4xl font-bold text-[color:var(--heading)] leading-tight;
}

.hub-hero__description {
  @apply text-[15px] md:text-base text-[color:var(--text-muted)] max-w-2xl;
}

.hub-hero__pills {
  @apply flex flex-wrap gap-2 mt-3;
}

.hub-hero__pill {
  @apply inline-flex items-center rounded-full px-3 md:px-4 py-1.5 text-xs md:text-[13px]
         bg-white/80 text-[color:var(--text-muted)] border border-slate-200
         hover:border-[color:var(--brand-sub)] hover:text-[color:var(--brand)]
         transition-colors;
}

.hub-hero__pill--active {
  @apply bg-[color:var(--brand-soft)] text-[color:var(--brand)] border-[color:var(--brand)];
}

.hub-hero__status {
  @apply mt-2 md:mt-0 md:ml-6 min-w-[230px] max-w-xs
         rounded-2xl bg-white/80 border border-slate-200 px-4 py-4
         shadow-sm flex flex-col gap-1;
}

.hub-hero__status-label {
  @apply text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-500;
}

.hub-hero__status-main {
  @apply text-sm font-semibold text-[color:var(--heading)];
}

.hub-hero__status-accent {
  @apply text-[color:var(--brand)];
}

.hub-hero__status-sub {
  @apply text-xs text-[color:var(--text-muted)] leading-relaxed mt-1;
}

/* 共通セクションヘッダ */
.hub-section-header {
  @apply flex flex-col gap-1 mb-3 md:mb-4;
}

.hub-section-header__title {
  @apply text-base md:text-lg font-semibold text-[color:var(--heading)];
}

.hub-section-header__lead {
  @apply text-xs md:text-sm text-[color:var(--text-muted)];
}

/* ② ジャーニー（横スクロール対応） */
.hub-journey-section {
  @apply mb-8;
}

.hub-journey {
  @apply flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0;
}

.hub-journey__card {
  @apply relative flex-shrink-0 w-[260px] md:w-1/3
         rounded-2xl border border-slate-200 bg-white/90
         px-4 py-4 md:px-5 md:py-5 no-underline cursor-pointer
         transition-all duration-200;
}

.hub-journey__card:hover {
  @apply -translate-y-1 shadow-md border-[color:var(--brand-sub)];
}

.hub-journey__step {
  @apply text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-1;
}

.hub-journey__title {
  @apply text-sm md:text-base font-semibold text-[color:var(--heading)] mb-1;
}

.hub-journey__body {
  @apply text-xs md:text-[13px] text-[color:var(--text-muted)] leading-relaxed mb-2;
}

.hub-journey__links {
  @apply text-[11px] md:text-xs text-slate-500 space-y-0.5 list-none pl-0;
}

.hub-journey__links li {
  @apply flex items-start gap-1;
}

.hub-journey__links li::before {
  content: '・';
  @apply text-slate-400;
}

/* ステップ間コネクタ（飾り） */
.hub-journey__connector {
  @apply hidden md:block w-4 h-[1px] self-center bg-gradient-to-r from-slate-200 to-slate-100;
}

/* ③ タブバー + コンテンツ */
.hub-tabs {
  @apply mb-10;
}

.hub-tabs__bar {
  @apply inline-flex w-full md:w-auto rounded-full bg-slate-50 border border-slate-200 p-1 mb-4 overflow-x-auto;
}

.hub-tab {
  @apply relative flex flex-col items-start md:items-center justify-center
         px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-semibold
         text-slate-600 hover:text-[color:var(--brand)]
         transition-colors flex-shrink-0;
}

.hub-tab__sub {
  @apply text-[10px] font-normal text-slate-400 md:mt-0.5;
}

.hub-tab--active {
  @apply bg-white text-[color:var(--brand)] shadow-sm;
}

/* タブ内コンテンツ */
.hub-tabs__content {
  @apply mt-2;
}

.hub-tabs__panel {
  @apply grid gap-4 md:grid-cols-1;
}

/* ハブカード本体（既存を活かしつつ微調整） */
.hub-card {
  @apply relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80
         px-5 py-4 md:px-6 md:py-5 transition-all duration-200 cursor-pointer
         no-underline;
}

.hub-card:hover {
  @apply -translate-y-1 shadow-md border-[color:var(--brand-sub)];
}

/* ラベル（Exam / Materials など） */
.hub-card__label {
  @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold
         bg-slate-100 text-slate-600 tracking-wide uppercase;
}

/* タイトル */
.hub-card__title {
  @apply text-lg md:text-xl font-bold text-[color:var(--heading)];
}

/* 本文 */
.hub-card__body {
  @apply text-sm md:text-[15px] text-[color:var(--text-muted)] leading-relaxed;
}

/* 代表的なリンクのミニリスト（装飾だけでクリックはカード全体） */
.hub-card__links {
  @apply mt-2 text-xs md:text-[13px] text-slate-500 space-y-1 list-none pl-0;
}

.hub-card__links li {
  @apply flex items-start gap-1;
}

.hub-card__links li::before {
  content: '・';
  @apply text-slate-400;
}
</style>
