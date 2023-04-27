<template>
  <FormHeader header-title="Novo Produto" />
  <v-form @submit.prevent="submitCreateUserForm" class="flex flex-col mt-6 items-center">
    <section class="flex items-center w-full">
      <div class="flex justify-center gap-8 w-full">
        <div class="w-1/2 max-w-sm h-full">
          <v-label>Nome</v-label>
          <InputComponent placeholder="Digite o nome" v-model="newProduct.name"></InputComponent>

          <v-label>Descrição</v-label>
          <InputComponent
            type="text"
            placeholder="Digite a descrição"
            v-model="newProduct.description"
          ></InputComponent>

          <v-label>Grupo</v-label>
          <InputComponent
            type="text"
            placeholder="Digite o grupo"
            v-model="newProduct.group"
          ></InputComponent>
        </div>

        <div class="w-1/2 max-w-sm h-full">
          <v-label>Unidade</v-label>
          <v-select
            placeholder="Unidade"
            :items="['FD', 'SC']"
            variant="outlined"
            bg-color="#E5E5E5"
            v-model:model-value="newProduct.unit"
          ></v-select>

          <v-label>Preço</v-label>
          <InputComponent
            type="number"
            placeholder="Digite o preço"
            v-model="newProduct.price"
          ></InputComponent>

          <v-label>Peso</v-label>
          <InputComponent
            type="number"
            placeholder="Digite o peso"
            v-model="newProduct.weight"
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
        Cadastrar
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'

import { createProductInfo } from '@/repositories/products-info'

import InputComponent from '@/components/atoms/InputComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import type { ProductInfo } from '@/dtos/products-info'

const router = useRouter()

const newProduct = ref<ProductInfo>({} as ProductInfo)
const isLoading = ref(false)

async function submitCreateUserForm() {
  isLoading.value = true
  try {
    await createProductInfo({
      ...newProduct.value
    })

    notify({
      title: 'Successo',
      text: 'Produto criado com sucesso',
      type: 'success'
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
