<script setup>
// @bloggrify/coreがlayout: homeを解決する際に、
// layouts/themes/mistral/home.vueを探そうとして失敗するため、
// layouts/home.vueからテーマのレイアウトを直接インポートして使用します
import MistralHomeLayout from '~/layouts/themes/custom/home.vue'
</script>

<template>
  <MistralHomeLayout />
</template>

