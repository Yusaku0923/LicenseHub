<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
    <!-- 左→右（1列目） -->
    <PillIcon class="floating-icon floating-icon-1" />
    <!-- 右→左（2列目） -->
    <MedicalBagIcon class="floating-icon floating-icon-2" />
    <!-- 左→右（3列目） -->
    <OpenBookIcon class="floating-icon floating-icon-3" />
    <!-- 右→左（4列目） -->
    <PillIcon class="floating-icon floating-icon-4" />
  </div>
</template>

<script setup lang="ts">
import PillIcon from '~/components/icons/PillIcon.vue'
import MedicalBagIcon from '~/components/icons/MedicalBagIcon.vue'
import OpenBookIcon from '~/components/icons/OpenBookIcon.vue'
</script>

<style scoped>
/* 流れるアイコンのアニメーション（左右交互横断） */
.floating-icon {
  position: absolute;
  font-size: 3.5rem;
  color: var(--brand);
  opacity: 0.2;
  flex-shrink: 0;
}

/* 左→右（1列目） */
.floating-icon-1 {
  top: 15%;
  left: calc(-100vw - 100px);
  width: 3.5rem;
  height: 3.5rem;
  animation: float-right 48s linear infinite;
  animation-delay: 0s;
}

/* 右→左（2列目） */
.floating-icon-2 {
  top: 35%;
  right: calc(-100vw - 100px);
  width: 3.5rem;
  height: 3.5rem;
  animation: float-left 48s linear infinite;
  animation-delay: 3s;
}

/* 左→右（3列目） */
.floating-icon-3 {
  top: 55%;
  left: calc(-100vw - 100px);
  width: 3.5rem;
  height: 3.5rem;
  animation: float-right 48s linear infinite;
  animation-delay: 6s;
}

/* 右→左（4列目） */
.floating-icon-4 {
  top: 75%;
  right: calc(-100vw - 100px);
  width: 3.5rem;
  height: 3.5rem;
  animation: float-left 48s linear infinite;
  animation-delay: 9s;
}

/* 左→右のアニメーション（画面外to画面外） */
@keyframes float-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(200vw + 200px));
  }
}

/* 右→左のアニメーション（画面外to画面外） */
@keyframes float-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-200vw - 200px));
  }
}

/* モバイルではアイコンを小さく */
@media (max-width: 768px) {
  .floating-icon {
    font-size: 2.5rem;
  }
}
</style>

