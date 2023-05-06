<template>
  <v-dialog v-model="showConfirmDeleteModal" :width="360" persistent>
    <ConfirmActionModal
      title="Deletar Produto"
      :text="`Deseja deletar o produto '${productDetails.name}'?`"
      @close-modal="showConfirmDeleteModal = false"
      @confirm-action="deleteProductFunction"
    />
  </v-dialog>

  <FormHeader header-title="Editar Produto" />

  <section class="w-full my-2 flex justify-end">
    <div>
      <v-btn variant="outlined" class="bg-red-600" @click="showConfirmDeleteModal = true">
        <v-icon icon="mdi-delete-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Deletar</ParagraphComponent>
      </v-btn>
    </div>
  </section>

  <v-form @submit.prevent="submitUpdateUserForm" class="flex flex-col mt-6 items-center">
    <section class="flex items-center w-full">
      <div class="flex justify-center gap-8 w-full">
        <div class="w-1/2 max-w-sm h-full">
          <v-label>Nome</v-label>
          <InputComponent
            placeholder="Digite o nome"
            v-model="productDetails.name"
          ></InputComponent>

          <v-label>Descrição</v-label>
          <InputComponent
            type="text"
            placeholder="Digite a descrição"
            v-model="productDetails.description"
          ></InputComponent>

          <v-label>Grupo</v-label>
          <InputComponent
            type="text"
            placeholder="Digite o grupo"
            v-model="productDetails.group"
          ></InputComponent>
        </div>

        <div class="w-1/2 max-w-sm h-full">
          <v-label>Unidade</v-label>
          <v-select
            placeholder="Unidade"
            :items="['FD', 'SC']"
            variant="outlined"
            bg-color="#E5E5E5"
            v-model:model-value="productDetails.unit"
          ></v-select>

          <v-label>Preço</v-label>
          <InputComponent
            type="number"
            placeholder="Digite o preço"
            v-model="productDetails.price"
          ></InputComponent>

          <v-label>Peso</v-label>
          <InputComponent
            type="number"
            placeholder="Digite o peso"
            v-model="productDetails.weight"
          ></InputComponent>
        </div>
      </div>
    </section>
    <div class="w-52">
      <v-btn
        class="mt-9"
        block
        color="#FFF112"
        size="large"
        height="56"
        type="submit"
        :loading="isLoading"
      >
        Atualizar
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'

import {
  getProductInfoDetails,
  updateProductInfo,
  deleteProductInfo
} from '@/repositories/products-info'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import type { ProductInfo } from '@/dtos/products-info'
import ConfirmActionModal from '@/components/molecules/ConfirmActionModal.vue'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const productDetails = ref<ProductInfo>({} as ProductInfo)
const isLoading = ref(false)
const showConfirmDeleteModal = ref(false)

watchEffect(async () => {
  try {
    const returnedProductDetails = await getProductInfoDetails(props.id)
    productDetails.value = returnedProductDetails
  } catch (error) {
    console.log(error)
  }
})

async function submitUpdateUserForm() {
  isLoading.value = true
  try {
    await updateProductInfo({
      ...productDetails.value,
      code: props.id
    })

    notify({
      title: 'Successo',
      text: 'Produto atualizado com sucesso',
      type: 'success'
    })

    router.back()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

async function deleteProductFunction() {
  try {
    await deleteProductInfo(props.id)

    notify({
      title: 'Successo',
      text: 'Produto deletado com sucesso',
      type: 'success'
    })

    router.push({ name: 'ProductsList' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
