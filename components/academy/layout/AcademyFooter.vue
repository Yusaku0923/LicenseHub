<template>
  <footer
    class="mt-12 bg-[var(--brand)] py-8 text-center"
  >
    <div class="mb-4 flex justify-center gap-6 text-xs">
      <NuxtLink to="/terms" class="text-white hover:text-slate-200 transition-colors">利用規約</NuxtLink>
      <NuxtLink to="/privacy" class="text-white hover:text-slate-200 transition-colors"
        >プライバシーポリシー</NuxtLink
      >
      <NuxtLink to="/help" class="text-white hover:text-slate-200 transition-colors"
        >ヘルプセンター</NuxtLink
      >
    </div>
    <p class="text-[10px] text-white">
      &copy; {{ new Date().getFullYear() }} MedLicenseNavi Academy. All rights
      reserved.
    </p>
  </footer>
</template>
