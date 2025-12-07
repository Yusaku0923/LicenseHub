<template>
  <div class="article-ad my-8 flex justify-center">
    <ins
      class="adsbygoogle block max-w-full"
      style="display:block; text-align:center;"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5447172429378250"
      data-ad-slot="6117692499"
    />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if (process.server) return
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle.push({})
  } catch (error) {
    console.debug('adsbygoogle init skipped', error)
  }
})
</script>
