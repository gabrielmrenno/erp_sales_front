<template>
  <header class="flex items-center">
    <v-icon icon="mdi-chevron-left" class="mr-2" :size="36" @click="goBack"></v-icon>
    <TitleComponent>{{ headerTitle }}</TitleComponent>
  </header>
  <v-divider class="border-opacity-100 mx" color="#DDD"></v-divider>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

import TitleComponent from '../atoms/TitleComponent.vue'

const router = useRouter()

defineProps({
  headerTitle: {
    type: String,
    required: true
  }
})

function goBack() {
  router.back()
}
</script>
