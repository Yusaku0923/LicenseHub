<template>
  <div v-if="banner" class="affiliate-banner" v-html="banner.html"></div>
  <p v-else class="text-red-500 text-sm">
    未登録の広告タイプです: {{ type }}
  </p>
</template>

<script setup lang="ts">
import { affiliateBanners } from '~/data/affiliate'
import type { AffiliateBannerKeys } from '~/data/affiliate'

const props = defineProps<{
  type: AffiliateBannerKeys
}>()

const banner = affiliateBanners[props.type]
</script>

<style scoped>
.affiliate-banner {
  margin: 1.5rem auto;
  text-align: center;
}
.affiliate-banner img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
