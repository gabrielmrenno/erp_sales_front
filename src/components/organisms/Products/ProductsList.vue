<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="flex justify-between h-[62px]">
    <div class="w-[600px] h-full flex gap-4"></div>
    <RouterLink :to="{ name: 'NewProduct' }" v-if="hasPermission([UsersRoles.ADMIN])">
      <div class="flex gap-4">
        <v-btn variant="outlined" class="bg-white">
          <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
          <ParagraphComponent>Adicionar</ParagraphComponent>
        </v-btn>
      </div>
    </RouterLink>
  </div>

  <div class="mt-6" :style="{ width: contentWidth }" v-resize="resizeTable">
    <v-data-table-server
      v-model:page="page"
      :headers="headers"
      :items="productsInfoList"
      :items-per-page="itemsPerPage"
      :items-length="productsInfoList.length"
      fixed-header
      :height="tableHeight"
      :loading="isLoadingData"
      @click:row="(_, { item }) => goToCustomerDetails(item)"
    >
      <template v-slot:item.actions>
        <div class="flex justify-center gap-7 text-[#555]">
          <VIcon icon="mdi-chevron-right"></VIcon>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="bg-[#F9F9EE] pt-4 flex justify-end">
          <v-pagination v-model="page" :length="numberOfPage" rounded="circle"></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { VDataTableServer } from 'vuetify/labs/VDataTable'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'

import { getProductsInfoList } from '@/repositories/products-info'
import type { ProductInfo } from '@/dtos/products-info'
import { hasPermission } from '@/utils/permissions'
import { UsersRoles } from '@/utils/enum'

const headers = [
  { title: 'Código', key: 'code', maxWidth: '200px' },
  {
    title: 'Nome',
    key: 'name'
  },
  { title: 'Grupo', key: 'group' },
  { title: 'Unidade', key: 'unit' },
  { title: 'Preço', key: 'price' },
  { title: '', key: 'actions' }
]
const itemsPerPage = 20
let numberOfPage: number

const router = useRouter()

const page = ref(1)
const screenHeight = ref<number>(window.innerHeight)
const screenWidth = ref<number>(window.innerWidth)

const productsInfoList = ref<ProductInfo[]>([])
const isLoadingData = ref(false)

const tableHeight = computed(() => screenHeight.value - 265)
const contentWidth = computed(() => `${screenWidth.value - 335}px`)

function resizeTable() {
  screenHeight.value = window.innerHeight
  screenWidth.value = window.innerWidth
}

function goToCustomerDetails(item: any) {
  if (hasPermission([UsersRoles.ADMIN])) {
    router.push({ name: 'ProductDetails', params: { id: Number(item.value.code) } })
  }
}

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const productsInfo: ProductInfo[] = await getProductsInfoList()

    productsInfoList.value = productsInfo.map((productInfo) => {
      return {
        ...productInfo
      }
    })

    numberOfPage = (productsInfoList.value.length || 1) / itemsPerPage + 1
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})
</script>

<style scoped></style>
