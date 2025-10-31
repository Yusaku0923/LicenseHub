<template>
    <!-- ① ヘッダーはこれまで通り -->
    <MistralHeader />
  
    <!-- ② パンくず + サイドバー付きレイアウトに -->
    <MistralHomeLayout>
      <template #posts>
        <div class="px-4 md:px-0">
          <MistralBreadcrumbs :doc="doc" />
        </div>
        <div v-if="doc" class="pt-6 pb-16">
          <!-- カバー画像（あれば） -->
          <div v-if="doc.cover" class="hidden md:flex justify-center mb-8">
            <NuxtImg
              :src="'/images/' + doc.cover"
              :alt="doc.title"
              fit="cover"
              placeholder
              class="rounded-lg max-h-[420px] object-cover w-full"
            />
          </div>
    
          <!-- ③ 記事ヘッダーをカード化したやつに -->
          <ArticleHeader :article="doc" />
    
          <!-- ④ 本文＋TOC の2カラム -->
          <div class="mt-8 flex flex-col lg:flex-row gap-8">
            <!-- TOC -->
            <aside v-if="isTocEnabled" class="lg:w-1/4">
              <PageSidebar :toc="doc.body.toc.links" />
            </aside>
    
            <!-- 本文 -->
            <article
              class="flex-1"
              :class="{ 'lg:max-w-[var(--article-max)]': !isTocEnabled }"
            >
              <ContentRenderer
                id="nuxtContent"
                :value="doc"
                class="prose max-w-none"
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
import ShareSection from '~/components/themes/mistral/ShareSection.vue'
import PageSidebar from '~/components/themes/mistral/PageSidebar.vue'
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
import MistralBreadcrumbs from '~/components/themes/mistral/MistralBreadcrumbs.vue'

const props = defineProps<{
doc: any
}>()

const config = useAppConfig()

const isTocEnabled =
props.doc?.body?.toc?.links?.length &&
(config.table_of_contents || props.doc?.table_of_contents)
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
