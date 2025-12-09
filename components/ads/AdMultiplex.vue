<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <ins
        id="adsbygoogle-multiplex"
        class="adsbygoogle block max-w-full"
        style="display:block"
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-5447172429378250"
        data-ad-slot="7897500416"
      ></ins>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle.push({})
  }
})
</script>
