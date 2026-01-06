<template>
  <MistralHeader />

  <MistralHomeLayout>
    <!-- メインコンテンツ -->
    <template #posts>
      <!-- ① Hero Section: Refined with Premium Feel -->
      <section
        class="hero-section bg-premium-gradient rounded-[2rem] p-8 md:p-14 flex flex-col gap-8 md:flex-row md:items-center mt-6 mb-12 relative overflow-hidden border border-[rgba(34,156,142,0.1)] shadow-sm"
      >
        <!-- LCP Image Integration -->
        <img
          src="/images/mv.webp"
          alt="Hero Background"
          class="absolute inset-0 z-0 w-full h-full object-cover opacity-20 md:opacity-30 mix-blend-overlay"
          loading="eager"
        />
        <!-- Background Decoration -->
        <div class="absolute top-[-100px] right-[-100px] w-64 h-64 bg-brand opacity-10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-accent opacity-10 rounded-full blur-3xl"></div>
        
        <div class="flex-1 relative z-10 text-center md:text-left">
          <div class="inline-flex items-center px-3 py-1 mb-6 text-xs font-bold rounded-full bg-white text-[color:var(--brand)] shadow-sm border border-[rgba(34,156,142,0.1)]">
            <span class="flex h-2 w-2 rounded-full bg-[color:var(--brand)] mr-2 animate-pulse"></span>
            LicenceHub｜登録販売者のための総合ガイド
          </div>

          <h1 class="text-3xl md:text-5xl font-extrabold text-[color:var(--heading)] mb-6 leading-[1.2] tracking-tight">
            登録販売者を<span class="text-brand">めざす</span>あなたへ。<br class="hidden md:block" />
            <span class="text-gradient">合格とその先</span>を、これ一つに。
          </h1>

          <p class="text-base md:text-xl text-[color:var(--text-muted)] mb-8 leading-relaxed max-w-2xl">
            試験対策から教材の徹底比較、現場でのキャリアアップまで。<br class="hidden md:block" />
            専門家が届ける信頼の情報で、あなたの挑戦をサポートします。
          </p>

          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <NuxtLink
              to="/licenses/tohan/exam"
              class="btn-primary px-8 py-3.5 text-lg rounded-full shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
            >
              勉強の始め方
              <Icon icon="mdi:chevron-right" class="text-xl" />
            </NuxtLink>
            <NuxtLink
              to="/licenses/tohan/materials"
              class="inline-flex items-center rounded-full px-8 py-3.5 text-lg font-bold bg-white text-[color:var(--brand)] border border-[rgba(34,156,142,0.2)] hover:bg-slate-50 hover:border-[color:var(--brand)] shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              教材を比較する
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ② Category Quick Links: Premium Cards -->
      <section class="mb-16">
        <div class="flex flex-col items-center mb-10 text-center">
          <span class="section-eyebrow">GUIDE NAVIGATION</span>
          <h2 class="text-2xl font-bold md:text-3xl">まずはここからチェック</h2>
          <div class="w-12 h-1 bg-brand mt-3 rounded-full"></div>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <NuxtLink
            v-for="item in quickLinks"
            :key="item.to"
            :to="item.to"
            class="group card--premium p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 rounded-[1.5rem]"
          >
            <div
              class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[color:var(--brand)] group-hover:bg-brand group-hover:text-white transition-all duration-300"
            >
              <Icon :icon="item.icon" class="text-3xl" />
            </div>
            <div>
              <p class="font-bold text-[color:var(--heading)] text-xl mb-1 transition-colors">{{ item.title }}</p>
              <p class="text-sm text-[color:var(--text-muted)] leading-relaxed">{{ item.desc }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- ③ Latest Articles: Dynamic Grid -->
      <section class="mb-16">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="section-eyebrow">NEW ARRIVALS</span>
            <h2 class="text-2xl font-bold">新着記事</h2>
          </div>
          <NuxtLink to="/licenses/tohan/articles" class="text-sm font-bold text-[color:var(--brand)] hover:opacity-70 flex items-center gap-1 group">
            記事一覧へ
            <Icon icon="mdi:arrow-right" class="group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div v-if="latestPosts.length > 0" class="flex flex-col gap-8">
          <!-- Featured Article (Horizontal Card) -->
          <NuxtLink
            v-if="latestPosts[0]"
            :to="latestPosts[0]._path"
            class="group relative bg-white rounded-[2rem] border border-[rgba(15,23,42,0.05)] shadow-md overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div class="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img
                :src="latestPosts[0].cover ? '/images/' + latestPosts[0].cover : '/images/cover.webp'"
                :alt="latestPosts[0].title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-brand text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">Featured</span>
              </div>
            </div>
            <div class="md:w-1/2 p-8 md:p-10 flex flex-col justify-center gap-4">
              <div class="flex items-center gap-3">
                <span v-if="latestPosts[0].tags?.[0]" class="license-pill">{{ latestPosts[0].tags[0] }}</span>
                <p class="text-xs text-[color:var(--text-muted)]">{{ formatDate(latestPosts[0].date) }}</p>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-[color:var(--heading)] group-hover:text-brand transition-colors leading-tight">
                {{ latestPosts[0].title }}
              </h3>
              <p class="text-[color:var(--text-muted)] line-clamp-3 text-sm md:text-base leading-relaxed">
                {{ latestPosts[0].description }}
              </p>
              <div class="mt-4 flex items-center font-bold text-brand group-hover:gap-2 transition-all">
                記事を読む
                <Icon icon="mdi:chevron-right" />
              </div>
            </div>
          </NuxtLink>

          <!-- Other Latest Posts -->
          <div class="grid gap-6 md:grid-cols-2">
            <NuxtLink
              v-for="post in latestPosts.slice(1)"
              :key="post._path"
              :to="post._path"
              class="group bg-white rounded-2xl border border-[rgba(15,23,42,0.02)] shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
            >
              <div class="h-48 overflow-hidden">
                <img
                  :src="post.cover ? '/images/' + post.cover : '/images/cover.webp'"
                  :alt="post.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-6 flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span v-if="post.tags?.[0]" class="license-pill text-[10px]">{{ post.tags[0] }}</span>
                  <p class="text-[10px] text-[color:var(--text-muted)]">{{ formatDate(post.date) }}</p>
                </div>
                <h3 class="font-bold text-lg text-[color:var(--heading)] group-hover:text-[color:var(--brand)] transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ④ Category Sections: Clean & Professional -->
      <section class="space-y-16 mb-12">
        <div v-for="section in categorySections" :key="section.slug" class="category-block">
          <div class="flex items-end justify-between mb-8 border-b border-[rgba(34,156,142,0.1)] pb-4">
            <div>
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <div class="w-1 h-6 bg-brand rounded-full"></div>
                {{ section.title }}
              </h2>
            </div>
            <NuxtLink :to="section.to" class="text-sm font-bold text-[color:var(--brand)] hover:underline">
              すべて表示
            </NuxtLink>
          </div>

          <div v-if="section.items.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink
              v-for="post in section.items"
              :key="post._path"
              :to="post._path"
              class="group bg-white rounded-xl border border-[rgba(15,23,42,0.03)] shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div class="h-40 overflow-hidden bg-slate-50">
                <img
                  :src="post.cover ? '/images/' + post.cover : '/images/cover.webp'"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <p class="text-[10px] text-[color:var(--text-muted)] flex items-center gap-1">
                  <Icon icon="mdi:calendar-blank" />
                  {{ formatDate(post.date) }}
                </p>
                <h3 class="font-bold text-[color:var(--heading)] leading-snug line-clamp-2 group-hover:text-[color:var(--brand)] transition-colors">
                  {{ post.title }}
                </h3>
                <p v-if="post.description" class="text-xs text-[color:var(--text-muted)] leading-relaxed line-clamp-2">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
          <div v-else class="bg-slate-50 rounded-xl py-12 text-center text-[color:var(--text-muted)] text-sm border border-dashed border-slate-200">
            このカテゴリの記事は準備中です
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
  title: appConfig.site.title,
  description: appConfig.site.description,
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
  script: [
    {
      id: 'website-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${appConfig.site.domain}/#website`,
        url: appConfig.site.domain,
        name: appConfig.site.name,
        inLanguage: 'ja',
        publisher: {
          '@type': 'Organization',
          name: appConfig.site.publisher,
        },
      }),
    },
  ],
})

const quickLinks = [
  { to: '/licenses/tohan/exam', title: '受験対策', desc: '合格に必要な範囲を整理', icon: 'mdi:school' },
  { to: '/licenses/tohan/materials', title: '教材・講座比較', desc: '通信講座・独学テキスト', icon: 'mdi:book-open-variant' },
  { to: '/licenses/tohan/work', title: '仕事・転職', desc: 'ドラッグストア・調剤薬局', icon: 'mdi:briefcase' },
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
