<template>
    <MistralHeader />
    <main class="mt-2">
        <div class="mx-auto max-w-6xl md:p-4">
            <div class="">
                <h1 class="p-4 text-4xl font-bold">
                    タグ「{{ tag }}」の記事一覧
                </h1>
                <MistralMinimalistListing format="list" :tag="tag" />
            </div>
        </div>
    </main>
    <MistralFooter />
</template>
<script setup lang="ts">
import Header from '~/components/themes/mistral/Header.vue'
import Footer from '~/components/themes/mistral/Footer.vue'
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
defineProps<{
    tag: string;
}>()

</script>
