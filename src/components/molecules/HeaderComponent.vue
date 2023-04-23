<template>
  <div class="flex justify-end">
    <v-btn variant="text" @click="goToUserDetails">
      <v-icon icon="mdi-account-outline" size="x-large" class="mr-3"></v-icon>
      <ParagraphComponent>{{ user?.name }}</ParagraphComponent>
    </v-btn>
    <v-btn variant="text" class="ml-10" @click="logout">
      <v-icon icon="mdi-exit-to-app" size="x-large" class="mr-3"></v-icon>
      <ParagraphComponent>Sair</ParagraphComponent>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getUser } from '@/repositories/user'
import { getLocalStorage } from '@/repositories/axiosClient'
import type { User } from '@/dtos/user'

import ParagraphComponent from '../atoms/ParagraphComponent.vue'

const router = useRouter()

const user = ref<User>()

watchEffect(async () => {
  const { idUser } = getLocalStorage()
  user.value = await getUser(idUser)
})

function goToUserDetails() {
  // TODO: get user id and pass as params
  router.push({ name: 'Profile' })
}

function logout() {
  localStorage.removeItem('user')
  router.push({ name: 'Login' })
}
</script>

<style scoped></style>
