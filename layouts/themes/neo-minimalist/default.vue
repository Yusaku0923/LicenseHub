<template>
  <div>
      <header>
          <h1>
              {{ title }}
          </h1>
      </header>

      <main>
          <div v-if="doc">
              <div >
                  <h2>
                      {{ doc.title }}
                  </h2>
              </div>

              <ContentRenderer
                  id="nuxtContent"
                  :value="doc"
              />
          </div>
      </main>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  doc: unknown;
}>()
const config = useAppConfig()
const title = config.name
</script>
