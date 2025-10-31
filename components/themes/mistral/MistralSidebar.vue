<template>
  <div class="space-y-6">
    <!-- A8バナー置き場 -->
    <div class="aff-box">
      <p class="aff-box-title text-[color:var(--heading)] font-semibold text-base mb-2">
        登録販売者の通信講座をお探しの方へ
      </p>
      <p class="aff-box-text text-[color:var(--text-muted)] text-sm mb-4 leading-relaxed">
        試験対策を効率的に進めたい方には、合格実績のある通信講座がおすすめです。  
        以下は編集部が特に評判の高い講座を厳選しました。
      </p>

      <AffiliateBanner type="studying" />
      <AffiliateBanner type="onsuku" />
    </div>

    <!-- タグなど -->
    <div v-if="tags && tags.length > 0" class="card">
      <h3 class="text-sm font-semibold mb-3 text-[color:var(--heading)]">タグ</h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink v-for="tag in tags" :key="tag" :to="`/tags/${tag}`" class="bg-slate-100 px-2 py-1 rounded text-xs">
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tags?: string[]
}

withDefaults(defineProps<Props>(), {
  tags: () => [],
})
</script>

