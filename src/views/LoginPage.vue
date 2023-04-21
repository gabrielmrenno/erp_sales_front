<template>
  <main class="h-screen w-full bg-[#555] flex flex-col items-center justify-center">
    <div class="mb-5">
      <img src="../assets/logo.png" alt="Logo Fecularia Piranguinho" />
    </div>
    <div
      class="bg-white px-[3.75rem] w-[500px] py-8 rounded-[1.25rem] flex flex-col items-center justify-center"
    >
      <TitleComponent>Entrar</TitleComponent>
      <ParagraphComponent class="mt-3"
        >Insira suas credenciais para acessar o portal</ParagraphComponent
      >
      <ParagraphComponent class="text-red-700 mt-9 h-6">{{
        isInvalidFormSubmit ? 'Usuário e/ou senha incorretos' : ''
      }}</ParagraphComponent>
      <v-form @submit.prevent="submitLoginForm" class="w-full h-72 justify-center">
        <InputComponent
          placeholder="Usuário"
          prepend-inner-icon="mdi-account-outline"
          v-model="username"
          :error="isInvalidFormSubmit"
        ></InputComponent>
        <InputComponent
          placeholder="Senha"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          v-model="password"
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
          Entrar
        </v-btn>
      </v-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { signIn } from '@/repositories/auth'
import {
  setBearerAuthorization,
  setLocalStorage,
  getLocalStorage
} from '@/repositories/axiosClient'

import TitleComponent from '@/components/atoms/TitleComponent.vue'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import InputComponent from '@/components/atoms/InputComponent.vue'

const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const isInvalidFormSubmit = ref(false)

async function submitLoginForm() {
  isInvalidFormSubmit.value = false
  isLoading.value = true
  try {
    const data = await signIn({
      username: username.value,
      password: password.value
    })

    setBearerAuthorization(data.token)
    setLocalStorage(data)
    const { resetPassword } = getLocalStorage()

    console.log(resetPassword)

    if (resetPassword) {
      router.push({ name: 'ResetPassword' })
      return
    }

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
