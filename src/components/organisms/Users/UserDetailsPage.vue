<template>
  <v-dialog v-model="showConfirmDeleteModal" :width="360" persistent>
    <ConfirmActionModal
      title="Deletar Usuário"
      text="Deseja deletar o usuário admin?"
      @close-modal="showConfirmDeleteModal = false"
      @confirm-action="deleteUserFunction"
    />
  </v-dialog>

  <v-dialog v-model="showResetPasswordModal" :width="360" persistent>
    <ConfirmActionModal
      title="Resetar senha"
      text="Deseja resetar a senha do usuário admin?"
      @close-modal="showConfirmDeleteModal = false"
      @confirm-action="resetPassword"
    />
  </v-dialog>

  <FormHeader :header-title="`Editar do usuário - ${username}`" />

  <section class="w-full mt-2 flex justify-end">
    <div class="flex gap-4">
      <v-btn variant="outlined" class="bg-white" @click="showResetPasswordModal = true">
        <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Resetar senha</ParagraphComponent>
      </v-btn>
      <v-btn variant="outlined" class="bg-red-600" @click="showConfirmDeleteModal = true">
        <v-icon icon="mdi-delete-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Deletar</ParagraphComponent>
      </v-btn>
    </div>
  </section>

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
import { useRouter } from 'vue-router'

import { getUser, updateUser, deleteUser, resetUserPassword } from '@/repositories/user'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import ConfirmActionModal from '@/components/molecules/ConfirmActionModal.vue'

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
const showConfirmDeleteModal = ref(false)
const showResetPasswordModal = ref(false)

const router = useRouter()

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

async function updateUserDetails() {
  isSubmitLoading.value = true
  try {
    await updateUser({
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

async function deleteUserFunction() {
  await deleteUser(props.id)
  showConfirmDeleteModal.value = false
  router.back()
}

async function resetPassword() {
  await resetUserPassword(props.id)
  showResetPasswordModal.value = false
  router.back()
}
</script>

<style scoped></style>
