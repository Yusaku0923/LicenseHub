<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? 'お探しのページが見つかりません' : 'エラーが発生しました'
)
const description = computed(() =>
  isNotFound.value
    ? 'URLが変更されたか、ページが移動・削除された可能性があります。'
    : '少し時間をおいてから再度お試しください。'
)

const goHome = () => clearError({ redirect: '/' })
const goAcademy = () => clearError({ redirect: '/academy' })

useHead({
  title: isNotFound.value ? '404 | LicenceHub' : 'エラー | LicenceHub',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div class="error-shell">
    <div class="bubble bubble-a" />
    <div class="bubble bubble-b" />
    <div class="bubble bubble-c" />

    <div class="panel">
      <div class="eyebrow">
        <span class="status-code">{{ isNotFound ? '404' : props.error?.statusCode || 'Error' }}</span>
        <span class="status-label">{{ isNotFound ? 'Not Found' : props.error?.statusMessage || 'Unexpected' }}</span>
      </div>

      <h1>{{ title }}</h1>
      <p class="lead">
        {{ description }}
      </p>

      <div class="actions">
        <button type="button" class="btn-primary" @click="goHome">
          トップページへ戻る
        </button>
        <button type="button" class="btn-ghost" @click="goAcademy">
          資格の最新記事を見る
        </button>
      </div>

      <div class="hints">
        <div class="hint">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3L4 9v12h6v-6h4v6h6V9l-8-6z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            />
          </svg>
          <div>
            <p class="hint-title">トップから再探索</p>
            <p class="hint-text">ホームでは人気の国家資格やおすすめ記事をまとめています。</p>
          </div>
        </div>
        <div class="hint">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 19h14M12 5v9m0 0l4-4m-4 4l-4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <p class="hint-title">別のページで続ける</p>
            <p class="hint-text">アカデミーでは資格の学び方や最新情報を掲載中です。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-shell {
  min-height: 100vh;
  background: radial-gradient(120% 120% at 15% 20%, rgba(34, 156, 142, 0.25), transparent),
    radial-gradient(110% 110% at 80% 0%, rgba(228, 123, 136, 0.18), transparent),
    linear-gradient(180deg, #eaf8f6 0%, #dff5f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 3rem;
  position: relative;
  overflow: hidden;
  color: var(--text);
}

.bubble {
  position: absolute;
  border-radius: 50%;
  filter: blur(48px);
  opacity: 0.6;
}

.bubble-a {
  width: 320px;
  height: 320px;
  background: rgba(34, 156, 142, 0.35);
  top: -60px;
  left: -80px;
}

.bubble-b {
  width: 260px;
  height: 260px;
  background: rgba(228, 123, 136, 0.22);
  bottom: -40px;
  right: 40px;
}

.bubble-c {
  width: 180px;
  height: 180px;
  background: rgba(31, 158, 143, 0.22);
  bottom: 30%;
  left: 18%;
}

.panel {
  position: relative;
  max-width: 720px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(34, 156, 142, 0.18);
  border-radius: 1.4rem;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.12);
  padding: 2.4rem 2.6rem 2.2rem;
  backdrop-filter: blur(10px);
  z-index: 1;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 1.2rem;
  box-shadow: 0 8px 20px rgba(34, 156, 142, 0.18);
}

.status-code {
  font-size: 0.95rem;
  background: #fff;
  padding: 0.25rem 0.6rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(34, 156, 142, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.status-label {
  font-size: 0.9rem;
}

h1 {
  font-size: 1.95rem;
  margin-bottom: 0.75rem;
  color: var(--heading);
  letter-spacing: -0.01em;
}

.lead {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-bottom: 1.6rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.6rem;
}

.btn-primary,
.btn-ghost {
  border: none;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: transform 0.12s ease-out, box-shadow 0.18s ease-out, background 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #1f9e8f 0%, #229c8e 50%, #2db5a4 100%);
  color: #fff;
  padding: 0.75rem 1.4rem;
  border-radius: 0.9rem;
  box-shadow: 0 14px 28px rgba(34, 156, 142, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 34px rgba(34, 156, 142, 0.28);
}

.btn-ghost {
  background: rgba(34, 156, 142, 0.08);
  color: var(--heading);
  padding: 0.72rem 1.25rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(34, 156, 142, 0.2);
}

.btn-ghost:hover {
  background: rgba(34, 156, 142, 0.12);
  transform: translateY(-1px);
}

.hints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;
}

.hint {
  display: flex;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(34, 156, 142, 0.12);
  border-radius: 0.9rem;
  padding: 0.85rem 1rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
}

.hint svg {
  width: 26px;
  height: 26px;
  color: var(--brand);
  flex-shrink: 0;
}

.hint-title {
  font-weight: 700;
  margin: 0 0 0.2rem;
  color: var(--heading);
}

.hint-text {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .error-shell {
    padding: 3rem 1.1rem 2.2rem;
  }

  .panel {
    padding: 1.9rem 1.6rem 1.7rem;
    border-radius: 1rem;
  }

  h1 {
    font-size: 1.65rem;
  }

  .lead {
    font-size: 0.98rem;
  }

  .actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>
