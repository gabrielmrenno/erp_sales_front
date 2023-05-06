<template>
  <v-card class="p-4">
    <v-card-title class="flex justify-between items-center">
      Adicionar Produto
      <v-icon
        icon="mdi-window-close"
        color="#555"
        size="x-small"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>
    <v-card-text class="flex flex-col justify-start p-0!">
      <v-select
        placeholder="Produto"
        :items="productsNameList"
        variant="outlined"
        density="compact"
        bg-color="#E5E5E5"
        v-model:model-value="selectedProductName"
      ></v-select>
      <div class="w-full h-full flex gap-4">
        <v-text-field
          bg-color="#fff"
          variant="outlined"
          density="compact"
          type="number"
          placeholder="Quantidade"
          v-model="amount"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions class="flex justify-end">
      <v-btn variant="outlined" @click="addProduct">Confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed, watchEffect } from 'vue'
import type { ProductInfo } from '@/dtos/products-info'

import { getProductsInfoList } from '@/repositories/products-info'

interface ShowProduct {
  productInfoCode: number
  name: string
  amount: number
  productPrice: number
  productWeight: number
  totalValue: number
}

const emit = defineEmits(['confirmAction'])

const isLoadingData = ref(false)
const productsList = ref<ProductInfo[]>([])
const amount = ref<number>()
const selectedProductName = ref<string>()

const productsNameList = computed(() => productsList.value.map((product) => product.name))

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const customers: ProductInfo[] = await getProductsInfoList()

    productsList.value = customers
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})

function addProduct() {
  const selectedProduct = productsList.value.find(
    (product) => product.name === selectedProductName.value
  )
  let returnedProductSelected: ShowProduct = {} as ShowProduct
  if (selectedProduct) {
    returnedProductSelected = {
      productInfoCode: selectedProduct.code,
      productPrice: selectedProduct.price,
      amount: amount.value!,
      productWeight: selectedProduct.weight,
      name: selectedProduct.name,
      totalValue: selectedProduct.price * amount.value!
    }
  }
  emit('confirmAction', returnedProductSelected)
}
</script>

<style scoped></style>
