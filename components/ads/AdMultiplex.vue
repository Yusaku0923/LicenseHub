<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center w-full">
      <Adsbygoogle
        :key="route.fullPath"
        ad-slot="7897500416"
        ad-format="autorelaxed"
        :page-url="pageUrl"
        :ad-style="{ display: 'block', width: '100%', minWidth: '320px' }"
        include-query
        class="block max-w-full"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const pageUrl = computed(() => `${runtimeConfig.public.siteUrl}${route.fullPath}`)
</script>
