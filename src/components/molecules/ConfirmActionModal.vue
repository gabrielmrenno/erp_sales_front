<template>
  <v-card class="p-4">
    <v-card-title class="flex justify-between items-center">
      {{ title }}
      <v-icon
        icon="mdi-window-close"
        color="#555"
        size="x-small"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>
    <v-card-text class="flex justify-start p-0!">{{ text }}</v-card-text>
    <v-card-actions class="flex justify-end">
      <v-btn variant="outlined" @click="$emit('confirmAction')">Sim</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

defineEmits(['closeModal', 'confirmAction'])
</script>

<style scoped></style>
