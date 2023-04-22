<template>
  <FormHeader header-title="Novo usuário" />

  <section class="flex h-full items-center justify-center">
    <v-form @submit.prevent="submitCreateUserForm" class="max-w-sm w-full justify-center">
      <v-label>Nome</v-label>
      <InputComponent placeholder="Digite o nome" v-model="name"></InputComponent>

      <v-label>Nome de usuário</v-label>
      <InputComponent
        type="text"
        placeholder="Digite o nome de usuário"
        v-model="username"
      ></InputComponent>

      <v-label>Posição</v-label>
      <v-select
        placeholder="Posição"
        :items="['Administrador', 'Vendedor']"
        variant="outlined"
        bg-color="#E5E5E5"
        v-model:model-value="role"
      ></v-select>

      <v-btn class="mt-9" block color="#FFF112" size="large" height="56" type="submit">
        Cadastrar
      </v-btn>
    </v-form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { createUser } from '@/repositories/user'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'

const router = useRouter()

const username = ref('')
const name = ref('')
const role = ref<string>()
const isLoading = ref(false)

async function submitCreateUserForm() {
  isLoading.value = true
  try {
    await createUser({
      username: username.value,
      name: name.value,
      role: role.value === 'Administrador' ? 'ADMIN' : 'SELLER'
    })

    router.back()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
