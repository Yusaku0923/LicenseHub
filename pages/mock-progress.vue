<script setup lang="ts">
// ページメタデータ
useHead({
  title: '進捗フィードバック - モック',
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        進捗フィードバック
      </h1>
      
      <ProgressFeedbackPanel />
    </div>
  </div>
</template>
