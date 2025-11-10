<template>
    <main class="mx-auto max-w-6xl px-4 md:px-4 lg:px-0">
      <div
        class="layout-grid"
      >
        <!-- 記事本体エリア -->
        <section class="layout-main">
          <slot name="posts" />
        </section>
  
        <!-- サイドバーエリア（スロットがある場合のみ） -->
        <aside v-if="$slots.sidebar" class="layout-sidebar">
          <slot name="sidebar" />
        </aside>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  // 特にロジックがなければ空でOK
  </script>
  
  <style scoped lang="scss">
  .layout-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
  
  /* PC 以上では 2 カラムに */
  @media (min-width: 1024px) {
    .layout-grid {
      grid-template-columns: minmax(0, 2fr) minmax(260px, 320px);
      align-items: flex-start;
      gap: 2.5rem;
    }
  }
  
  /* 並び順：モバイルでは posts → sidebar の縦並び */
  .layout-main {
    order: 1;
  }
  
  .layout-sidebar {
    order: 2;
    /* スマホでは少し上マージンを足すと本文との区切りが自然 */
    margin-top: 0.5rem;
  }
  
  /* PC では並び順はそのまま（grid の列順に従う） */
  @media (min-width: 1024px) {
    .layout-main {
      order: 0;
    }
    .layout-sidebar {
      order: 0;
      margin-top: 2.5rem; /* 上マージンは不要 */
    }
  }
  </style>
  