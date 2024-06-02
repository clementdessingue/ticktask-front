<template>
    <v-main class="tt-main" id="tt-main">
        <router-view :key="route.fullPath" />
    </v-main>
</template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>