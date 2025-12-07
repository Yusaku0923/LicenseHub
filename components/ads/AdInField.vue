<template>
  <div class="article-ad my-8 flex justify-center">
    <ins
      ref="adSlot"
      class="adsbygoogle block max-w-full"
      style="display:block; text-align:center;"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5447172429378250"
      data-ad-slot="7813917545"
    />
  </div>
</template>

<script setup lang="ts">
const adSlot = ref<HTMLElement | null>(null)

function pushAds() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).adsbygoogle.push({})
}

function tryInit() {
  if (process.server) return
  const el = adSlot.value
  if (!el) return
  // Avoid "No slot size for availableWidth=0"
  if (el.offsetWidth === 0) {
    requestAnimationFrame(tryInit)
    return
  }
  pushAds()
}

onMounted(() => {
  tryInit()
})
</script>
