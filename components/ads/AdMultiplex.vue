<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <Adsbygoogle
        v-if="!showFallback"
        ref="adComponent"
        :key="route.fullPath"
        ad-slot="7897500416"
        ad-format="autorelaxed"
        :page-url="pageUrl"
        include-query
        class="block max-w-full"
      />
      <AdDisplay v-else />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from '#app'
import AdDisplay from './AdDisplay.vue'

const route = useRoute()
const adComponent = ref<any>(null)
const showFallback = ref(false)
const runtimeConfig = useRuntimeConfig()
const pageUrl = computed(() => `${runtimeConfig.public.siteUrl}${route.fullPath}`)
let stopUnfilledWatcher: (() => void) | null = null

const watchUnfilled = () => {
  stopUnfilledWatcher?.()
  const unfilled = adComponent.value?.isUnfilled
  if (!unfilled) return

  stopUnfilledWatcher = watch(
    () => unfilled.value,
    (isUnfilled) => {
      if (isUnfilled) {
        showFallback.value = true
      }
    },
    { immediate: true },
  )
}

// ルート変更時に広告を更新
watch(() => route.fullPath, () => {
  showFallback.value = false
  watchUnfilled()
  if (adComponent.value?.updateAd) {
    // 少し遅延させてから更新（DOM更新を待つ）
    setTimeout(() => {
      adComponent.value.updateAd()
    }, 100)
  }
}, { immediate: false })

onMounted(() => {
  watchUnfilled()
})

onBeforeUnmount(() => {
  stopUnfilledWatcher?.()
})
</script>
