<template>
  <ClientOnly>
    <div :key="adKey" class="article-ad my-8 flex justify-center w-full">
      <Adsense
        class="block max-w-full w-full text-center"
        style="display: block; width: 100%; min-width: 320px"
        :data-ad-client="adClient"
        data-ad-slot="7813917545"
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const adClient = runtimeConfig.public.adsenseClient || 'ca-pub-5447172429378250'

// ルート変更時にユニークなキーを生成して広告を再初期化
const adKey = computed(() => `ad-infield-${route.fullPath}-${Date.now()}`)
</script>

