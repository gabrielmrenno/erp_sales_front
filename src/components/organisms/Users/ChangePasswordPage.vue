<template>
  <FormHeader :header-title="`Editar Senha`" />

  <section class="flex h-full items-center justify-center">
    <v-form @submit.prevent="submitLoginForm" class="max-w-sm w-full justify-center">
      <v-label>Nova senha</v-label>
      <InputComponent
        placeholder="Nova senha"
        prepend-inner-icon="mdi-lock-outline"
        type="password"
        v-model="newPassword"
        :error="isInvalidFormSubmit"
      ></InputComponent>

      <v-label>Repita a nova senha</v-label>
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getLocalStorage } from '@/repositories/axiosClient'
import { changePassword } from '@/repositories/user'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import { AxiosError } from 'axios'

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

    await changePassword({ password: newPassword.value, id: idUser })

    router.back()
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

<style scoped></style>
