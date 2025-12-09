<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <Adsbygoogle
        :key="route.fullPath"
        ad-slot="7813917545"
        ad-format="fluid"
        ad-layout="in-article"
        :ad-style="{ display: 'block', textAlign: 'center' }"
        :page-url="pageUrl"
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
