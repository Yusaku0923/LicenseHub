<template>
  <footer
    class="mt-12 border-t border-emerald-100/50 bg-emerald-50/30 py-8 text-center"
  >
    <div class="mb-4 flex justify-center gap-6 text-xs text-emerald-800/70">
      <NuxtLink to="/terms" class="hover:text-emerald-500">利用規約</NuxtLink>
      <NuxtLink to="/privacy" class="hover:text-emerald-500"
        >プライバシーポリシー</NuxtLink
      >
      <NuxtLink to="/help" class="hover:text-emerald-500"
        >ヘルプセンター</NuxtLink
      >
    </div>
    <p class="text-[10px] text-emerald-900/40">
      &copy; {{ new Date().getFullYear() }} MedLicenseNavi Academy. All rights
      reserved.
    </p>
  </footer>
</template>
