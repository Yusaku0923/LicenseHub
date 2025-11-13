<template>
  <MistralHeader />

  <MistralHomeLayout>
    <!-- メインコンテンツ -->
    <template #posts>
      <!-- ① Hero -->
      <section
        class="hero-section bg-white rounded-2xl border border-[rgba(50,93,206,0.05)] p-6 md:p-10 flex flex-col gap-6 md:flex-row md:items-center mt-10 mb-10 relative overflow-hidden"
      >
        <img
          src="/images/mv.webp"
          alt="Hero Background"
          class="absolute inset-0 z-0 w-full h-full object-cover"
          loading="eager"
        />
        <div class="flex-1 relative z-10">
          <p class="inline-flex items-center px-2 py-1 mb-3 text-xs font-semibold rounded-full bg-white text-[color:var(--brand)] border border-[rgba(50,93,206,0.16)]">
            LicenceHub｜登録販売者の情報ガイド
          </p>

          <h1 class="text-3xl md:text-4xl font-bold text-[color:var(--heading)] mb-4 leading-tight">
            登録販売者をめざすあなたへ。<br class="hidden md:block" />
            勉強・合格・仕事探しを、この一つに。
          </h1>

          <p class="text-[15px] md:text-lg text-[color:var(--heading)] mb-5">
            試験対策・教材比較・現場での働き方まで、登録販売者に関する情報を発信しています。
          </p>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/licenses/tohan/exam"
              class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-white text-[color:var(--brand)] border border-[rgba(50,93,206,0.25)] hover:bg-[color:var(--brand)] hover:text-white transition"
            >
              勉強の始め方を見る
            </NuxtLink>
            <NuxtLink
              to="/licenses/tohan/materials"
              class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-white text-[color:var(--brand)] border border-[rgba(50,93,206,0.25)] hover:bg-[color:var(--brand)] hover:text-white transition"
            >
              通信講座・教材を比較する
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ② カテゴリクイックリンク -->
      <section class="mb-12">
        <h2 class="section-title mb-3">まずはここから</h2>
        <p class="text-xs text-[color:var(--text-muted)] mb-4">
          勉強・教材・仕事の3つの入り口から、目的に合わせて情報を探せます。
        </p>
        <div class="grid gap-4 md:grid-cols-3">
          <NuxtLink
            v-for="item in quickLinks"
            :key="item.to"
            :to="item.to"
            class="group bg-white rounded-xl border border-[rgba(15,23,42,0.03)] shadow-sm p-4 flex items-center gap-3 transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-[rgba(50,93,206,0.08)] flex items-center justify-center text-[color:var(--brand)] text-lg"
            >
              {{ item.icon }}
            </div>
            <div>
              <p class="font-semibold text-[color:var(--heading)] text-sm group-hover:text-[color:var(--brand)] transition-colors">{{ item.title }}</p>
              <p class="text-xs text-[color:var(--text-muted)] group-hover:text-[color:var(--brand)] transition-colors">{{ item.desc }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>


      <!-- ③ 新着記事（ここに元の Mistral のコンポーネントを入れてもいい） -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title mb-0">新着記事</h2>
          <NuxtLink to="/licenses/tohan/articles" class="text-sm text-[color:var(--brand)] hover:underline">もっと見る</NuxtLink>
        </div>

        <!-- 新着記事 -->
        <div v-if="latestPosts.length > 0" class="grid gap-6 md:grid-cols-3">
          <NuxtLink
            v-for="post in latestPosts"
            :key="post._path"
            :to="post._path"
            class="group bg-white rounded-xl border border-[rgba(15,23,42,0.02)] shadow-sm overflow-hidden flex flex-col transition"
          >
            <div v-if="post.cover" class="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              <img
                :src="'/images/' + post.cover"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                width="360"
                height="192"
                sizes="(max-width: 768px) 100vw, 360px"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div v-else class="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              no image
            </div>
            <div class="p-4 flex flex-col gap-3 flex-1">
              <p
                v-if="post.tags && post.tags.length"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(50,93,206,0.08)] text-[0.6rem] text-[color:var(--brand)] font-semibold w-fit"
              >
                {{ post.tags[0] }}
              </p>
              <p class="font-semibold text-[color:var(--heading)] leading-snug line-clamp-2 group-hover:text-[color:var(--brand)] transition-colors">
                {{ post.title }}
              </p>
              <p v-if="post.date" class="text-xs text-[color:var(--text-muted)] mt-auto">
                {{ formatDate(post.date) }}
              </p>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center text-[color:var(--text-muted)] py-8">
          記事がまだありません
        </div>
      </section>

      <!-- ④ カテゴリ別セクション -->
      <section class="space-y-12 mb-4">
        <div v-for="section in categorySections" :key="section.slug">
          <div class="flex items-center justify-between mb-4">
            <h2 class="section-title mb-0">{{ section.title }}</h2>
            <NuxtLink :to="section.to" class="text-sm text-[color:var(--brand)] hover:underline">
              もっと見る
            </NuxtLink>
          </div>

          <div v-if="section.items.length > 0" class="grid gap-6 md:grid-cols-3">
            <NuxtLink
              v-for="post in section.items"
              :key="post._path"
              :to="post._path"
              class="group bg-white rounded-xl border border-[rgba(15,23,42,0.02)] shadow-sm overflow-hidden flex flex-col transition"
            >
              <!-- サムネイル（新着と同じレイアウト） -->
              <div v-if="post.cover" class="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                <img
                  :src="'/images/' + post.cover"
                  :alt="post.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  width="360"
                  height="192"
                  sizes="(max-width: 768px) 100vw, 360px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div v-else class="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                no image
              </div>

              <!-- テキスト部（タイトル＋任意で説明＋日付） -->
              <div class="p-4 flex flex-col gap-3 flex-1">
                <p v-if="post.date" class="text-xs text-[color:var(--text-muted)]">
                  {{ formatDate(post.date) }}
                </p>
                <p class="font-semibold text-[color:var(--heading)] leading-snug line-clamp-2 group-hover:text-[color:var(--brand)] transition-colors">
                  {{ post.title }}
                </p>
                <p
                  v-if="post.description"
                  class="text-xs text-[color:var(--text-muted)] leading-snug line-clamp-2"
                >
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="text-center text-[color:var(--text-muted)] py-4 text-sm">
            該当する記事がありません
          </div>
        </div>
      </section>

    </template>

    <!-- サイドバー -->
    <template #sidebar>
      <MistralSidebar :tags="tags" />
    </template>
  </MistralHomeLayout>

  <MistralFooter />
</template>
  
<script setup lang="ts">
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
import FloatingIconsBackground from '~/components/themes/mistral/FloatingIconsBackground.vue'

const appConfig = useAppConfig()
const route = useRoute()

useSeoMeta({
  title: appConfig.site.ogTitle,
  description: appConfig.site.ogDescription,
  ogTitle: appConfig.site.ogTitle,
  ogDescription: appConfig.site.ogDescription,
  ogUrl: appConfig.site.ogUrl,
  ogType: () => appConfig.site.ogType as any,
  ogLocale: appConfig.site.ogLocale,
  ogSiteName: appConfig.site.ogSiteName,
  ogImage: appConfig.site.ogImage,
  ogImageWidth: appConfig.site.ogImageWidth,
  ogImageHeight: appConfig.site.ogImageHeight,
  ogImageAlt: appConfig.site.ogImageAlt,
  twitterCard: 'summary_large_image',
  keywords:
    '登録販売者, 登録販売者 試験, 登録販売者 勉強, 登録販売者 独学, 登録販売者 通信講座, 登録販売者 勉強法, 登録販売者 仕事内容, 登録販売者 仕事・転職',
})

useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [
    {
      rel: 'canonical',
      href: `${appConfig.site.domain}${route.path}`,
    },
  ],
})

const quickLinks = [
  { to: '/licenses/tohan/exam', title: '受験対策', desc: '合格に必要な範囲を整理', icon: '📘' },
  { to: '/licenses/tohan/materials', title: '教材・講座比較', desc: '通信講座・独学テキスト', icon: '📚' },
  { to: '/licenses/tohan/work', title: '仕事・転職', desc: 'ドラッグストア・調剤薬局', icon: '💼' },
]

// 実際のコンテンツから取得
const { data: allPosts } = await useAsyncData('home-posts', async () => {
  try {
    console.log('[home.vue] Fetching posts from content...')
    const posts = await queryContent()
      .only(['title', 'description', 'date', 'tags', '_path', 'cover', 'listed'])
      .find()
    
    console.log('[home.vue] Total posts found:', posts.length)
    console.log('[home.vue] Post paths:', posts.map((p: any) => p._path))
    
    // フィルタリングとソート
    const filtered = posts
      .filter((p: any) => {
        // トップページは除外
        if (p._path === '/' || p._path === '/index') return false
        // listedが明示的にfalseのものは除外
        if (p.listed === false) return false
        // dateがあるもののみ
        return !!p.date
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      })
      .slice(0, 10)
    
    console.log('[home.vue] Filtered posts:', filtered.length)
    console.log('[home.vue] Filtered paths:', filtered.map((p: any) => p._path))
    
    return filtered
  } catch (error: any) {
    console.error('[home.vue] Error fetching posts:', error)
    if (error.statusCode === 404) {
      console.error('[home.vue] 404 Error - Document not found!')
      console.error('[home.vue] Query that caused 404:', error.data?.query)
    }
    console.error('[home.vue] Error details:', JSON.stringify(error, null, 2))
    console.error('[home.vue] Error stack:', error.stack)
    return []
  }
})

const latestPosts = computed(() => {
  return (allPosts.value || []).slice(0, 3)
})

const categorySections = computed(() => {
  const posts = allPosts.value || []
  return [
    {
      slug: 'exam',
      title: '受験対策',
      to: '/licenses/tohan/exam',
      items: posts.filter((p: any) => 
        p.tags?.includes('試験情報') || p._path?.startsWith('/licenses/tohan/exam')
      ).slice(0, 3),
    },
    {
      slug: 'materials',
      title: '教材・通信講座',
      to: '/licenses/tohan/materials',
      items: posts.filter((p: any) => 
        p.tags?.some((tag: string) => ['教材', '通信講座', 'レビュー'].includes(tag)) || 
        p._path?.startsWith('/licenses/tohan/materials')
      ).slice(0, 3),
    },
    {
      slug: 'work',
      title: '仕事・転職',
      to: '/licenses/tohan/work',
      items: posts.filter((p: any) => 
        p.tags?.some((tag: string) => ['仕事', '転職'].includes(tag)) || 
        p._path?.startsWith('/licenses/tohan/work')
      ).slice(0, 3),
    },
  ]
})

// タグ一覧を取得
const { data: allTags } = await useAsyncData('home-tags', async () => {
  try {
    console.log('[home.vue] Fetching tags from content...')
    const posts = await queryContent()
      .only(['tags'])
      .find()
    
    console.log('[home.vue] Total posts for tags:', posts.length)
    
    const tagSet = new Set<string>()
    posts.forEach((post: any) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => tagSet.add(tag))
      }
    })
    const tags = Array.from(tagSet).slice(0, 6)
    console.log('[home.vue] Extracted tags:', tags)
    return tags
  } catch (error: any) {
    console.error('[home.vue] Error fetching tags:', error)
    if (error.statusCode === 404) {
      console.error('[home.vue] 404 Error - Document not found!')
      console.error('[home.vue] Query that caused 404:', error.data?.query)
    }
    console.error('[home.vue] Error details:', JSON.stringify(error, null, 2))
    console.error('[home.vue] Error stack:', error.stack)
    return []
  }
})

const tags = computed(() => allTags.value || ['試験情報', '合格体験記', '独学', 'テキスト', 'ドラッグストア', '調剤薬局'])

const formatDate = (date: string | undefined) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  } catch {
    return ''
  }
}
</script>

<style scoped>
.hero-button:hover {
  background-color: var(--brand) !important;
  color: white !important;
}
</style>
