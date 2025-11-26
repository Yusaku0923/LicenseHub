<template>
    <MistralHeader />
    <main>
        <div>
            <div class="px-4 mx-auto sm:px-6 xl:max-w-7xl xl:px-0 mt-20">
                <h1 class="text-4xl font-bold text-gray-700 mb-8 flex justify-center">
                    記事一覧
                </h1>
                <div class="text-left mx-auto">
                    <div class="flex flex-wrap lg:flex-row-reverse py-6">
                        <div class="w-full px-5 max-w-none centered-image">
                            <MistralFullListOfPosts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <MistralFooter />
</template>
<script setup lang="ts">
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
const config = useAppConfig()
const route = useRoute()

useSeoMeta({
  title: () => `記事一覧 | ${config.site.name}`,
  description: () =>
    `記事一覧 - ${config.site.ogDescription || (config as any).description}`,
  ogTitle: () => `記事一覧 | ${config.site.name}`,
  ogDescription: () =>
    `記事一覧 - ${config.site.ogDescription || (config as any).description}`,
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
