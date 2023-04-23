<template>
  <main class="h-screen w-full bg-[#555] flex flex-col items-center justify-center">
    <div class="mb-5">
      <img src="../assets/logo.png" alt="Logo Fecularia Piranguinho" />
    </div>
    <div
      class="bg-white px-[3.75rem] w-[500px] py-8 rounded-[1.25rem] flex flex-col items-center justify-center"
    >
      <TitleComponent>Redefinição de senha</TitleComponent>
      <ParagraphComponent class="mt-3"
        >Insira sua nova senha para acessar o portal</ParagraphComponent
      >
      <ParagraphComponent class="text-red-700 mt-9 h-6">{{
        isInvalidFormSubmit ? 'As senhas devem devem ser iguais' : ''
      }}</ParagraphComponent>
      <v-form @submit.prevent="submitLoginForm" class="w-full h-72">
        <InputComponent
          placeholder="Nova senha"
          prepend-inner-icon="mdi-lock-outline"
          type="password"
          v-model="newPassword"
          :error="isInvalidFormSubmit"
        ></InputComponent>
        <InputComponent
          placeholder="Repetir nova senha"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          v-model="repeatNewPassword"
          :error="isInvalidFormSubmit"
        ></InputComponent>
        <v-btn
          class="mt-9"
          block
          color="#FFF112"
          size="large"
          height="56"
          type="submit"
          :loading="isLoading"
        >
          Redefinir senha
        </v-btn>
      </v-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { changePassword } from '@/repositories/user'

import TitleComponent from '@/components/atoms/TitleComponent.vue'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import InputComponent from '@/components/atoms/InputComponent.vue'
import { getLocalStorage } from '@/repositories/axiosClient'

const router = useRouter()

const newPassword = ref('')
const repeatNewPassword = ref('')
const isLoading = ref(false)
const isInvalidFormSubmit = ref(false)

async function submitLoginForm() {
  isInvalidFormSubmit.value = false
  if (newPassword.value !== repeatNewPassword.value) {
    isInvalidFormSubmit.value = true
    return
  }
  isLoading.value = true
  try {
    const { idUser } = getLocalStorage()

    const data = await changePassword({ password: newPassword.value, id: idUser })

    router.push({ name: 'Panel' })
  } catch (error) {
    isInvalidFormSubmit.value = true
    if (error instanceof AxiosError) {
      console.log(error)
      if (error.response?.status === 400) {
        console.log(error.message)
      }
    }
  } finally {
    isLoading.value = false
  }
}
</script>
