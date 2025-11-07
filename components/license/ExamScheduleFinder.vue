<!-- components/license/ExamScheduleFinder.vue -->
<script setup lang="ts">
const props = defineProps<{
  license: string
  year: string
}>()

// 例: /api/licenses/tohan/schedule?year=2025 から取得する
const { data, pending, error } = await useFetch(`/api/licenses/${props.license}/schedule`, {
  query: { year: props.year }
})

const items = computed(() => data.value ?? [])
</script>

<template>
  <section>
    <div v-if="pending">読み込み中...</div>
    <div v-else-if="error">データの取得に失敗しました。</div>
    <div v-else>
      <!-- items を map してテーブル表示 -->
    </div>
  </section>
</template>
