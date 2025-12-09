<template>
    <!-- ① ヘッダーはこれまで通り -->
    <MistralHeader />
  
    <!-- ② パンくず + サイドバー付きレイアウトに -->
    <MistralHomeLayout>
      <template #posts>
        <div class="px-0 mt-6">
          <MistralBreadcrumbs :doc="doc" />
        </div>
        <div v-if="doc" class="pt-6 pb-0 px-0">
          <!-- ③ 記事�EチE��ーをカード化しためE��に -->
          <ArticleHeader :article="doc" />

           <!-- ② カバ�E画僁E-->
          <div v-if="doc.cover" class="flex justify-center mb-4 mt-4">
            <img
              :src="'/images/' + doc.cover"
              :alt="doc.title"
              loading="eager"
              width="1200"
              height="630"
              sizes="(max-width: 768px) 100vw, 960px"
              class="rounded-lg max-h-[420px] object-cover w-full"
            />
          </div>

          <!-- ③ リード文�E�カバ�Eのあとに表示�E�E-->
          <p
            v-if="doc.lead"
            class="text-sm md:text-base text-[color:var(--heading)]/85 leading-relaxed mb-6"
          >
            {{ doc.lead }}
          </p>

          <!-- ☁E目次カード！ErticleToc�E�E-->
          <div class="mt-8 md:mt-10">
            <ArticleToc
              :links="doc.body.toc.links"
              class="toc"
            />
          </div>

          <!-- ④ 本斁E��カード）！E中に TOC を�Eれる -->
          <div class="mt-6">
            <article
              class="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-6 md:px-7 md:py-7 mx-auto"
              :class="[
                'w-full',
                isTocEnabled ? 'lg:max-w-[var(--article-max)]' : 'lg:max-w-[var(--article-max)]'
              ]"
            >
              <!-- 本斁E-->
                            <ContentRenderer
                id="nuxtContent"
                :value="doc"
                class="prose article-body max-w-none"
              />
            </article>
          </div>

          <!-- タグ -->
          <div class="flex flex-wrap gap-3 mt-10">
            <a
              v-for="tag in doc.tags"
              :key="tag"
              :href="`/tags/${tag}`"
              class="bg-slate-100 rounded-full px-3 py-1 text-sm font-semibold text-slate-700"
            >
              {{ tag }}
            </a>
          </div>
    
          <!-- シェア・コメンチE-->
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
 * キーワード！Erontmatter の keywords ↁEなければ tags を利用�E�E
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
 * SEO 用タイトル�E�EeoTitle があれ�E優先、なければ title、さらにサイト名�E�E
 */
const seoTitle = computed(() => props.doc?.seoTitle || props.doc?.title || config.site.name)

/**
 * SEO メタ設宁E
 * Nuxt 3 では useSeoMeta は自動インポ�EトされてぁE��ので、E
 * 追加の import は不要です、E
 */
useSeoMeta({
  title: () => seoTitle.value,
  description: () =>
    props.doc?.description ?? props.doc?.lead ?? config.description,
  keywords: () => keywordString.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () =>
    props.doc?.ogDescription ??
    props.doc?.description ??
    config.site.ogDescription,
  ogType: () => 'article',
  ogUrl: () => `${config.site.domain}${route.path}`,
  ogImage: () =>
    props.doc?.ogImage ??
    (props.doc?.cover
      ? `${config.site.domain}/images/${props.doc.cover}`
      : `${config.site.domain}${config.site.ogImage}`),
  ogSiteName: () => config.site.ogSiteName || config.site.name,
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



