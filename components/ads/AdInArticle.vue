<template>
  <div class="article-ad my-8 flex justify-center">
    <ins
      class="adsbygoogle block max-w-full"
      style="display:block"
      :data-ad-client="resolvedClient"
      :data-ad-slot="resolvedSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  adClient?: string
  adSlot?: string
}>(), {
  adClient: undefined,
  adSlot: undefined,
})

const runtimeConfig = useRuntimeConfig()

const resolvedClient = computed(() => props.adClient || runtimeConfig.public?.adsenseClient || 'ca-pub-5447172429378250')
const resolvedSlot = computed(() => props.adSlot || runtimeConfig.public?.adsenseSlot || '')

onMounted(() => {
  if (process.server || !resolvedSlot.value) return
  try {
    // Initialize in-article Adsense slot
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).adsbygoogle.push({})
  } catch (error) {
    console.debug('adsbygoogle init skipped', error)
  }
})
</script>
