<template>
  <header class="flex justify-between mt-8">
    <div class="flex gap-4">
      <v-btn
        variant="outlined"
        :disabled="disabled"
        :class="selectedFilter === 'active' ? 'activeFilter' : 'disabledFilter'"
        @click="updateSelectedFilter('active')"
      >
        <v-icon icon="mdi-checkbox-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Ativo</ParagraphComponent>
      </v-btn>
      <v-btn
        variant="outlined"
        :disabled="disabled"
        :class="selectedFilter === 'disabled' ? 'activeFilter' : 'disabledFilter'"
        @click="updateSelectedFilter('disabled')"
      >
        <v-icon icon="mdi-close-box-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Desativado</ParagraphComponent>
      </v-btn>
    </div>
    <RouterLink :to="{ name: addToRouterName }">
      <div class="flex gap-4">
        <v-btn variant="outlined" class="bg-white">
          <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
          <ParagraphComponent>Adicionar</ParagraphComponent>
        </v-btn>
      </div>
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

import ParagraphComponent from '../atoms/ParagraphComponent.vue'

const selectedFilter = ref<'active' | 'disabled'>('active')

defineProps({
  addToRouterName: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['filterValue'])

function updateSelectedFilter(filter: 'active' | 'disabled') {
  selectedFilter.value = filter
  emit('filterValue', selectedFilter.value)
}
</script>

<style scoped>
.activeFilter {
  background-color: #555;
  color: #fff112;
  border: none;
}

.disabledFilter {
  background-color: white;
}
</style>
