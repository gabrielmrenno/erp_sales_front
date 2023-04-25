<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="flex justify-between">
    <div class="w-[600px] h-full flex gap-4">
      <v-text-field
        bg-color="#fff"
        variant="outlined"
        density="compact"
        :type="filterInputType"
        placeholder="Adicione o filtro"
        prepend-inner-icon="mdi-magnify"
        v-model="filter"
      ></v-text-field>
      <v-select
        placeholder="Filtro"
        :items="['Código', 'Nome']"
        variant="outlined"
        density="compact"
        bg-color="#E5E5E5"
        class="max-w-[150px]"
        v-model:model-value="filterType"
      ></v-select>
    </div>
    <RouterLink :to="{ name: 'NewCustomer' }">
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
      :items="customersList"
      :items-per-page="itemsPerPage"
      :items-length="customersList.length"
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

import type { Customer } from '@/dtos/customer'
import { getCustomersList } from '@/repositories/customer'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'

const headers = [
  { title: 'Código', key: 'code', maxWidth: '200px' },
  {
    title: 'Nome',
    key: 'name'
  },
  { title: 'Noma fantasia', key: 'fantasyName' },
  { title: 'Endereço', key: 'address' },
  { title: 'Cidade', key: 'city' },
  { title: '', key: 'actions' }
]
const itemsPerPage = 20
let numberOfPage: number

const router = useRouter()

const page = ref(1)
const screenHeight = ref<number>(window.innerHeight)
const screenWidth = ref<number>(window.innerWidth)

const customersList = ref<Customer[]>([])
const filter = ref<string>()
const filterType = ref<'Código' | 'Nome'>()
const isLoadingData = ref(false)

const filterInputType = computed(() => {
  if (filterType.value === 'Código') {
    return 'number'
  }
  return 'text'
})

const tableHeight = computed(() => screenHeight.value - 265)
const contentWidth = computed(() => `${screenWidth.value - 335}px`)

function resizeTable() {
  screenHeight.value = window.innerHeight
  screenWidth.value = window.innerWidth
}

function goToCustomerDetails(item: any) {
  router.push({ name: 'CustomerDetails', params: { id: String(item.value.code) } })
}

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const customers: Customer[] = await getCustomersList(filter.value, filterType.value)

    console.log(customers)

    customersList.value = customers.map((customer) => {
      return {
        ...customer
      }
    })

    numberOfPage = (customersList.value.length || 1) / itemsPerPage + 1
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})
</script>

<style scoped></style>
