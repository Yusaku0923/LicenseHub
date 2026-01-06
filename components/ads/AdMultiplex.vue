<template>
  <ClientOnly>
    <div :key="adKey" class="article-ad my-8 flex justify-center w-full">
      <Adsense
        class="block max-w-full w-full"
        style="display: block; width: 100%; min-width: 320px"
        :data-ad-client="adClient"
        data-ad-slot="7897500416"
        data-ad-format="autorelaxed"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const adClient = runtimeConfig.public.adsenseClient || 'ca-pub-5447172429378250'

// ルート変更時にユニークなキーを生成して広告を再初期化
const adKey = computed(() => `ad-multiplex-${route.fullPath}-${Date.now()}`)
</script>

