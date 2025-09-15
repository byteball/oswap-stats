<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

interface Props {
  page: number;
}

defineProps<Props>();

const router = useRouter();
const route = useRoute();

function goToPage(page: number) {
  router.push({
    query: { ...route.query, page },
    hash: route.hash || undefined,
  });
}
</script>

<template>
  <a :href="'?page=' + page" @click.prevent="goToPage(page)" :key="page">
    <slot />
  </a>
</template>

<style scoped>

</style>