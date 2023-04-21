<template>
  <div class="flex justify-end">
    <v-btn variant="text" @click="goToUserDetails">
      <v-icon icon="mdi-account-outline" size="x-large" class="mr-3"></v-icon>
      <ParagraphComponent>Gabriel Rennó</ParagraphComponent>
    </v-btn>
    <v-btn variant="text" class="ml-10" @click="logout">
      <v-icon icon="mdi-exit-to-app" size="x-large" class="mr-3"></v-icon>
      <ParagraphComponent>Sair</ParagraphComponent>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ParagraphComponent from '../atoms/ParagraphComponent.vue'

const router = useRouter()

function goToUserDetails() {
  // TODO: get user id and pass as params
  router.push({ name: 'UserDetails', params: { id: 1 } })
}

function logout() {
  localStorage.removeItem('user')
  router.push({ name: 'Login' })
}
</script>

<style scoped></style>
