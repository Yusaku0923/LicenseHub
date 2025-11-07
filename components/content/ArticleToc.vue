<template>
  <nav v-if="links?.length" class="toc" :data-open="isOpen ? 'true' : 'false'">
    <!-- ヘッダー行（スマホはトグルボタン） -->
    <button type="button" class="toc-header" @click="toggle">
      <span class="toc-header-main">
        <Icon icon="mdi:book-open-page-variant" class="toc-icon" />
        <span class="toc-title">目次</span>
      </span>
      <Icon
        icon="mdi:chevron-down"
        class="toc-chevron"
        aria-hidden="true"
      />
    </button>

    <ul class="toc-list">
      <li v-for="link in links" :key="link.id">
        <a :href="`#${link.id}`">{{ link.text }}</a>
        <ul v-if="link.children?.length" class="toc-children">
          <li v-for="child in link.children" :key="child.id">
            <a :href="`#${child.id}`">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue' // ← Iconify の公式 Vue コンポーネント
import { ref } from 'vue'

defineProps<{
  links: Array<{
    id: string
    text: string
    children?: Array<{ id: string; text: string }>
  }>
}>()

const isOpen = ref(true)
const toggle = () => (isOpen.value = !isOpen.value)
</script>

<style lang="scss">
/* === TOCカード ===================================================== */
.toc {
  background: var(--surface, #ffffff);
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  padding: 0.9rem 1.1rem 1.1rem;
  font-size: 0.85rem;
}

/* ヘッダー（スマホではボタン化） */
.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  color: #475569;
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 0.6rem;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.toc-header-main {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.toc-icon {
  font-size: 1rem;
  color: var(--brand-sub, #325dce);
}

.toc-chevron {
  font-size: 1rem;
  transition: transform 0.15s ease-out;
  color: #64748b;
}
.toc[data-open='true'] .toc-chevron {
  transform: rotate(180deg);
}

/* リスト */
.toc-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.toc-list > li + li {
  margin-top: 0.1rem;
}
.toc-children {
  margin-top: 0.1rem;
  margin-left: 1rem;
  font-size: 0.8rem;
}

/* リンク */
.toc a {
  display: block;
  padding-block: 0.22rem;
  color: var(--text-muted, #6b7280);
  text-decoration: none;
  border-radius: 0.35rem;
  transition: color 0.15s ease-out, background-color 0.15s ease-out, transform 0.1s ease-out;
}
.toc a:hover {
  color: var(--brand, #325dce);
  background-color: rgba(50, 93, 206, 0.06);
  transform: translateX(1px);
}

/* === スマホ調整 ===================================================== */
@media (max-width: 768px) {
  .toc {
    font-size: 0.8rem;
    padding: 0.75rem 0.9rem 0.9rem;
    margin: 0.75rem 0 1.2rem;
  }
  .toc[data-open='false'] .toc-list {
    display: none;
  }
}
</style>
