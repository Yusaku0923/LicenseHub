<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <ins
        id="adsbygoogle-infield"
        class="adsbygoogle block max-w-full"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-5447172429378250"
        data-ad-slot="7813917545"
      />
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
