<template>
    <!-- ① ヘッダーはこれまで通り -->
    <MistralHeader />
  
    <!-- ② パンくず + サイドバー付きレイアウトに -->
    <MistralHomeLayout>
      <template #posts>
        <div class="px-4 mt-6 md:px-0">
          <MistralBreadcrumbs :doc="doc" />
        </div>
        <div v-if="doc" class="pt-6 pb-0 px-4 md:px-0">
          <!-- ③ 記事ヘッダーをカード化したやつに -->
          <ArticleHeader :article="doc" />

           <!-- ② カバー画像 -->
          <div v-if="doc.cover" class="flex justify-center mb-4 mt-4">
            <NuxtImg
              :src="'/images/' + doc.cover"
              :alt="doc.title"
              fit="cover"
              placeholder
              loading="eager"
              preload
              width="1200"
              height="630"
              sizes="(max-width: 768px) 100vw, 960px"
              format="webp"
              class="rounded-lg max-h-[420px] object-cover w-full"
            />
          </div>

          <!-- ③ リード文（カバーのあとに表示） -->
          <p
            v-if="doc.lead"
            class="text-sm md:text-base text-[color:var(--heading)]/85 leading-relaxed mb-6"
          >
            {{ doc.lead }}
          </p>

          <!-- ★ 目次カード（ArticleToc） -->
          <div class="mt-8 md:mt-10">
            <ArticleToc
              :links="doc.body.toc.links"
            />
          </div>

          <!-- ④ 本文（カード）＋ 中に TOC を入れる -->
          <div class="mt-6">
            <article
              class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-6 md:px-7 md:py-7"
              :class="{ 'lg:max-w-[var(--article-max)]': !isTocEnabled }"
            >
              <!-- 本文 -->
              <ContentRenderer
                id="nuxtContent"
                :value="doc"
                class="prose article-body max-w-none"
              />
            </article>
          </div>

          <!-- タグ -->
          <div class="flex flex-wrap gap-3 mt-10">
            <NuxtLink
              v-for="tag in doc.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="bg-slate-100 rounded-full px-3 py-1 text-sm font-semibold text-slate-700"
            >
              {{ tag }}
            </NuxtLink>
          </div>
    
          <!-- シェア・コメント -->
          <hr class="my-8" />
          <!-- <ShareSection :title="doc.title" :cover="doc.cover" /> -->
          <!-- <CommentSystem :id="doc.id" :nocomments="doc.nocomments" /> -->
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
import ArticleHeader from '~/components/themes/mistral/ArticleHeader.vue'
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
import MistralBreadcrumbs from '~/components/themes/mistral/MistralBreadcrumbs.vue'

const props = defineProps<{
  doc: any
}>()

const config = useAppConfig()
const route = useRoute()

const isTocEnabled = computed(() => {
  const hasTocLinks = !!props.doc?.body?.toc?.links?.length
  const globalEnabled = config.table_of_contents !== false
  const localEnabled = props.doc?.table_of_contents !== false

  return hasTocLinks && globalEnabled && localEnabled
})

/**
 * キーワード（frontmatter の keywords → なければ tags を利用）
 */
const keywordString = computed(() => {
  if (props.doc?.keywords?.length) {
    return props.doc.keywords.join(', ')
  }
  if (props.doc?.tags?.length) {
    return props.doc.tags.join(', ')
  }
  return undefined
})

/**
 * SEO メタ設定
 * Nuxt 3 では useSeoMeta は自動インポートされているので、
 * 追加の import は不要です。
 */
 useSeoMeta({
  title: () => props.doc?.title ?? config.site.name,
  description: () =>
    props.doc?.description ?? props.doc?.lead ?? config.site.description,
  keywords: () => keywordString.value,
  ogTitle: () => props.doc?.ogTitle ?? props.doc?.title ?? config.site.name,
  ogDescription: () =>
    props.doc?.ogDescription ??
    props.doc?.description ??
    config.site.description,
  ogType: () => 'article',
  ogUrl: () => `${config.site.domain}${route.path}`,
  ogImage: () =>
    props.doc?.ogImage ??
    (props.doc?.cover
      ? `${config.site.domain}/images/${props.doc.cover}`
      : `${config.site.domain}${config.site.ogImage}`),
  author: config.site.author,
  publisher: config.site.publisher,
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

<style lang="scss">
.prose {
  a {
    @apply underline underline-offset-2 decoration-dotted;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    @apply no-underline;
  }
}
</style>
