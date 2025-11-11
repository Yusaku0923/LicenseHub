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
        <!-- ① Hub 用ミニ Hero -->
        <section
          class="rounded-2xl bg-[rgba(50,93,206,0.05)] border border-[rgba(50,93,206,0.08)]
                 px-6 py-6 md:px-8 md:py-7 mb-8 flex flex-col gap-4 md:flex-row md:items-center"
        >
          <div class="flex-1">
            <h1 class="text-3xl md:text-4xl font-bold text-[color:var(--heading)] mb-3">
              {{ doc.title }}
            </h1>
            <p v-if="doc.description" class="text-[15px] md:text-lg text-[color:var(--text-muted)]">
              {{ doc.description }}
            </p>
          </div>

          <!-- カテゴリピル -->
          <div class="flex flex-wrap gap-2 md:flex-col md:items-end">
            <span class="hub-pill">Exam</span>
            <span class="hub-pill">Materials</span>
            <span class="hub-pill">Work</span>
            <span class="hub-pill">Articles</span>
          </div>
        </section>

        <!-- ② Hub カードグリッド -->
        <section class="grid gap-4 md:grid-cols-2 mb-10">
          <!-- Exam -->
          <NuxtLink to="/licenses/tohan/exam"
            class="hub-card"
          >
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

          <!-- Materials -->
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

          <!-- Work -->
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

          <!-- Articles -->
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
        </section>

        <!-- ③ 必要であれば Markdown 本文（補足） -->
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
        <div v-if="doc.tags && doc.tags.length > 0" class="flex flex-wrap gap-3 mt-4 mb-10">
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

useSeoMeta({
  // ... ここは既に実装済みのSEO設定 ...
})

// ★ ここで lang を含めて head を上書き
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
.hub-pill {
  @apply inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-semibold;
  @apply bg-[color:var(--brand-soft)] text-[color:var(--brand)];
}

/* ハブカード本体 */
.hub-card {
  @apply relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80
         px-5 py-4 md:px-6 md:py-5 transition-all duration-200 cursor-pointer;
  @apply no-underline;

  &:hover {
    @apply -translate-y-1 shadow-md border-[color:var(--brand-sub)];
  }
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

  li {
    @apply flex items-start gap-1;
  }

  li::before {
    content: '・';
    @apply text-slate-400;
  }
}
</style>
