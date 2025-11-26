<template>
    <MistralHeader />
    <main class="mt-2">
        <div class="mx-auto max-w-6xl md:p-4">
            <div class="px-3">
                <h1 class="p-4 text-4xl font-bold">
                    タグ「{{ tag }}」の記事一覧
                </h1>
                <MistralMinimalistListing format="list" :tag="tag" />
            </div>
        </div>
    </main>
    <MistralFooter />
</template>
<script setup lang="ts">
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
const props = defineProps<{
    tag: string;
}>()

const config = useAppConfig()
const route = useRoute()

useSeoMeta({
  title: () => `タグ「${props.tag}」の記事一覧 | ${config.site.name}`,
  description: () =>
    `タグ「${props.tag}」の記事一覧 - ${config.site.ogDescription || (config as any).description}`,
  ogTitle: () => `タグ「${props.tag}」の記事一覧 | ${config.site.name}`,
  ogDescription: () =>
    `タグ「${props.tag}」の記事一覧 - ${config.site.ogDescription || (config as any).description}`,
  ogType: () => 'website',
  ogUrl: () => `${config.site.domain}${route.path}`,
  ogImage: () => `${config.site.domain}${config.site.ogImage}`,
  ogSiteName: () => config.site.ogSiteName || config.site.name,
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
