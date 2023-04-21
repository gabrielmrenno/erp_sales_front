<!-- eslint-disable vue/valid-v-slot -->
<template>
  <HeaderListComponent
    add-to-router-name="NewUser"
    @filter-value="handleFilterUpdate"
    :disabled="isLoadingData"
  />

  <div class="mt-6" v-resize="resizeTable">
    <v-data-table-server
      v-model:page="page"
      :headers="headers"
      :items="userList"
      :items-per-page="itemsPerPage"
      :items-length="userList.length"
      fixed-header
      :height="tableHeight"
      :loading="isLoadingData"
      @click:row="goToUserDetails"
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
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'

import { VDataTableServer } from 'vuetify/labs/VDataTable'
import HeaderListComponent from '../../molecules/HeaderListComponent.vue'

import type { User } from '@/dtos/user'
import { getUserList } from '@/repositories/user'

dayjs.extend(localizedFormat)

const headers = [
  {
    title: 'Nome',
    key: 'name'
  },
  { title: 'Noma de Usuário', key: 'username' },
  { title: 'Posição', key: 'role' },
  { title: 'Criado em', key: 'createdAt' },
  { title: '', key: 'actions' }
]
const itemsPerPage = 20
let numberOfPage: number

const router = useRouter()

const page = ref(1)
const screenHeight = ref<number>(window.innerHeight)
const userList = ref<User[]>([])
const filter = ref<'active' | 'disabled'>('active')
const isLoadingData = ref(false)

const tableHeight = computed(() => screenHeight.value - 265)

function resizeTable() {
  screenHeight.value = window.innerHeight
}

function goToUserDetails() {
  // TODO: get user id and pass as params
  router.push({ name: 'UserDetails', params: { id: 1 } })
}

function handleFilterUpdate(filterValue: 'active' | 'disabled') {
  filter.value = filterValue
}

watchEffect(async () => {
  isLoadingData.value = true
  try {
    const users = await getUserList(filter.value)

    userList.value = users.map((user) => {
      return {
        ...user,
        createdAt: dayjs(user.createdAt).locale('pt-br').format('LL')
      }
    })

    numberOfPage = (userList.value.length || 1) / itemsPerPage + 1
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingData.value = false
  }
})
</script>

<style scoped></style>
