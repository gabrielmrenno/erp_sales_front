<template>
  <FormHeader :header-title="`Editar do usuário - ${username}`" />

  <section class="flex h-full items-center justify-center">
    <v-form
      v-if="!isLoading"
      @submit.prevent="updateUserDetails"
      class="max-w-sm w-full justify-center"
    >
      <v-label>Nome</v-label>
      <InputComponent placeholder="Digite o nome" v-model="name"></InputComponent>

      <v-label>Posição</v-label>
      <v-select
        placeholder="Posição"
        :items="['Administrador', 'Vendedor']"
        variant="outlined"
        bg-color="#E5E5E5"
        v-model:model-value="role"
      ></v-select>

      <v-btn
        class="mt-9"
        block
        color="#FFF112"
        size="large"
        height="56"
        type="submit"
        :loading="isSubmitLoading"
      >
        Editar
      </v-btn>
    </v-form>
    <v-progress-circular indeterminate v-else />
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps } from 'vue'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import { getUser, updateUser } from '@/repositories/user'
import router from '@/router'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const name = ref('')
const role = ref<string>()
const username = ref('')
const isLoading = ref(false)
const isSubmitLoading = ref(false)

watchEffect(async () => {
  isLoading.value = true
  try {
    const userReturned = await getUser(props.id)
    name.value = userReturned.name
    role.value = userReturned.role
    username.value = userReturned.username
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

function updateUserDetails() {
  isSubmitLoading.value = true
  try {
    updateUser({
      id: props.id,
      name: name.value,
      role: role.value === 'Administrador' ? 'ADMIN' : 'SELLER'
    })

    router.back()
  } catch (error) {
    console.log(error)
  } finally {
    isSubmitLoading.value = false
  }
}
</script>

<style scoped></style>
