<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <Adsbygoogle
        ref="adComponent"
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
import { computed, ref, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const adComponent = ref<any>(null)
const runtimeConfig = useRuntimeConfig()
const pageUrl = computed(() => `${runtimeConfig.public.siteUrl}${route.fullPath}`)

// ルート変更時に広告を更新
watch(() => route.fullPath, () => {
  if (adComponent.value?.updateAd) {
    // 少し遅延させてから更新（DOM更新を待つ）
    setTimeout(() => {
      adComponent.value.updateAd()
    }, 100)
  }
}, { immediate: false })
</script>
