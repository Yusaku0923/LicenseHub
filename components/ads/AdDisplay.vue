<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <Adsbygoogle
        ref="adComponent"
        ad-slot="3990044993"
        ad-format="auto"
        class="block max-w-full"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const adComponent = ref<any>(null)

// ルート変更時に広告を更新
watch(() => route.path, () => {
  if (adComponent.value?.updateAd) {
    // 少し遅延させてから更新（DOM更新を待つ）
    setTimeout(() => {
      adComponent.value.updateAd()
    }, 100)
  }
}, { immediate: false })
</script>

