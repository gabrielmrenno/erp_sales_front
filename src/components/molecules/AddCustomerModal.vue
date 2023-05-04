<template>
  <v-card class="p-4">
    <v-card-title class="flex justify-between items-center">
      Selecionar cliente
      <v-icon
        icon="mdi-window-close"
        color="#555"
        size="x-small"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>
    <v-card-text class="flex flex-col justify-start p-0!">
      <div class="w-full h-full flex gap-4">
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
      <v-select
        placeholder="Cliente"
        :items="customerNameList"
        variant="outlined"
        density="compact"
        bg-color="#E5E5E5"
        v-model:model-value="selectedCustomerName"
      ></v-select>
    </v-card-text>
    <v-card-actions class="flex justify-end">
      <v-btn variant="outlined" @click="selectCustomer">Confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Customer } from '@/dtos/customer'
import { getCustomersList } from '@/repositories/customer'
import { defineEmits, ref, computed, watchEffect } from 'vue'

const emit = defineEmits(['confirmAction', 'closeModal'])

const filter = ref<string>()
const filterType = ref<'Código' | 'Nome'>()
const isLoadingData = ref(false)
const customersList = ref<Customer[]>([])
const selectedCustomerName = ref<string>()

const filterInputType = computed(() => {
  if (filterType.value === 'Código') {
    return 'number'
  }
  return 'text'
})

const customerNameList = computed(() => customersList.value.map((customer) => customer.fantasyName))

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const customers: Customer[] = await getCustomersList(filter.value, filterType.value)

    customersList.value = customers
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})

function selectCustomer() {
  const selectedCustomer = customersList.value.find(
    (customer) => customer.fantasyName === selectedCustomerName.value
  )
  emit('confirmAction', selectedCustomer)
}
</script>

<style scoped></style>
