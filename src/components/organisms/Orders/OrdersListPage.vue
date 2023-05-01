<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="flex justify-between">
    <div class="w-56 h-full flex gap-4">
      <v-text-field
        bg-color="#fff"
        variant="outlined"
        density="compact"
        type="number"
        class="w-2/5"
        placeholder="Filtre por código"
        prepend-inner-icon="mdi-magnify"
        v-model="filter"
      ></v-text-field>
    </div>
    <RouterLink :to="{ name: 'NewOrder' }">
      <div class="flex gap-4">
        <v-btn variant="outlined" class="bg-white">
          <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
          <ParagraphComponent>Adicionar</ParagraphComponent>
        </v-btn>
      </div>
    </RouterLink>
  </div>

  <div class="mt-6" :style="{ width: contentWidth }" v-resize="resizeTable">
    <VDataTableServer
      v-model:page="page"
      :headers="headers"
      :items="ordersList"
      :items-per-page="itemsPerPage"
      :items-length="ordersList.length"
      fixed-header
      :height="tableHeight"
      :loading="isLoadingData"
      @click:row="(_, { item }) => goToOrderDetails(item)"
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
    </VDataTableServer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { VDataTableServer } from 'vuetify/labs/VDataTable'

import type { ICompleteOrder } from '@/dtos/order'
import { getOrdersList } from '@/repositories/order'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'

interface OrdersTable {
  id: number
  customer: string
  city: string
  paymentStatus: string
  totalOrderValue: string
}

const headers = [
  { title: 'Código', key: 'id', maxWidth: '200px' },
  {
    title: 'Cliente',
    key: 'customer'
  },
  { title: 'Cidade', key: 'city' },
  { title: 'Status', key: 'paymentStatus' },
  { title: 'Valor', key: 'totalOrderValue' },
  { title: '', key: 'actions' }
]
const itemsPerPage = 20
let numberOfPage: number

const router = useRouter()

const page = ref(1)
const screenHeight = ref<number>(window.innerHeight)
const screenWidth = ref<number>(window.innerWidth)

const ordersList = ref<OrdersTable[]>([])
const filter = ref<number>()
const isLoadingData = ref(false)

const tableHeight = computed(() => screenHeight.value - 265)
const contentWidth = computed(() => `${screenWidth.value - 335}px`)

function resizeTable() {
  screenHeight.value = window.innerHeight
  screenWidth.value = window.innerWidth
}

function goToOrderDetails(item: any) {
  console.log(item)
  router.push({ name: 'OrderDetails', params: { id: item.columns.id } })
}

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const orders: ICompleteOrder[] = await getOrdersList({
      code: filter.value,
      page: page.value
    })

    ordersList.value = orders.map((order) => {
      return {
        id: order.id,
        paymentStatus: order.paymentStatus,
        totalOrderValue: `R$ ${order.totalOrderValue.toFixed(2)}`,
        customer: order.customer.fantasyName,
        city: order.customer.city
      }
    })

    numberOfPage = (ordersList.value.length || 1) / itemsPerPage + 1
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})
</script>

<style scoped></style>
