<template>
  <div class="article-ad my-8 flex justify-center">
    <ins
      ref="adSlot"
      class="adsbygoogle block max-w-full"
      style="display:block"
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-5447172429378250"
      data-ad-slot="7897500416"
    ></ins>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const adSlot = ref<HTMLInsElement | null>(null)

const MAX_RETRY = 10

function pushAds() {
  if (typeof window === 'undefined') return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  w.adsbygoogle = w.adsbygoogle || []
  w.adsbygoogle.push({})
}

function initAd(retry = 0) {
  const el = adSlot.value
  if (!el) return

  // 幅0だと "No slot size for availableWidth=0" を避けるためリトライ
  if (el.offsetWidth === 0) {
    if (retry >= MAX_RETRY) return
    requestAnimationFrame(() => initAd(retry + 1))
    return
  }

  try {
    pushAds()
  } catch (e) {
    console.error('Adsense multiplex init error:', e)
  }
}

onMounted(() => {
  initAd()
})
</script>
