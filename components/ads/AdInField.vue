<template>
  <ClientOnly>
    <div class="article-ad my-8 flex justify-center">
      <div ref="adContainer" class="block max-w-full w-full" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const adContainer = ref<HTMLElement | null>(null)

const adClient = runtimeConfig.public.adsenseClient || 'ca-pub-5447172429378250'
const adSlot = '7813917545'

let adsScriptPromise: Promise<void> | null = null
let hasRendered = false

const loadAdsScript = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if ((window as any).adsbygoogle?.push) {
    return Promise.resolve()
  }

  if (adsScriptPromise) {
    return adsScriptPromise
  }

  adsScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[data-adsbygoogle="yes"]') as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('adsbygoogle script failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.dataset.adsbygoogle = 'yes'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('adsbygoogle script failed'))
    document.head.appendChild(script)
  })

  return adsScriptPromise
}

const renderAd = async () => {
  if (hasRendered) return
  if (!adContainer.value) return
  adContainer.value.innerHTML = ''

  const ins = document.createElement('ins')
  ins.className = 'adsbygoogle'
  ins.style.display = 'block'
  ins.style.textAlign = 'center'
  ins.style.width = '100%'
  ins.setAttribute('data-ad-client', adClient)
  ins.setAttribute('data-ad-slot', adSlot)
  ins.setAttribute('data-ad-format', 'fluid')
  ins.setAttribute('data-ad-layout', 'in-article')
  ins.setAttribute('data-page-url', `${runtimeConfig.public.siteUrl}${route.fullPath}`)

  adContainer.value.appendChild(ins)

  try {
    await loadAdsScript()
    await nextTick()
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})
    hasRendered = true
  } catch (error) {
    console.warn('ads render error', error)
  }
}

onMounted(() => {
  renderAd()
})
</script>
