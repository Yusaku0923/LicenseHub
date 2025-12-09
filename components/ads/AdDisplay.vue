<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <ins
        id="adsbygoogle-display"
        class="adsbygoogle block max-w-full"
        style="display:block"
        data-ad-client="ca-pub-5447172429378250"
        data-ad-slot="3990044993"
        data-ad-format="auto"
        data-full-width-responsive="true"
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

