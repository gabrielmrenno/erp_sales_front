<template>
  <FormHeader header-title="Novo Cliente" />

  <form class="flex flex-col w-full items-center" @submit.prevent="submitCreateCustomer">
    <div class="overflow-y-auto" :style="{ height: contentHeight }" v-resize="resizeTable">
      <section class="w-full flex mt-6">
        <div class="w-1/2 h-full">
          <h2 class="text-2xl font-bold">Informações do cliente:</h2>
          <p class="w-2/3 text-[#555] text-sm font-semibold mt-2 ml-4">
            Insira o CNPJ do cliente para buscar suas informações. É possível editá-las.
          </p>
        </div>
        <div class="w-1/2 h-full">
          <div class="flex gap-4 items-center">
            <v-label class="flex flex-col items-start w-1/2">
              CNPJ
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o CNPJ"
                v-model="newCustomer.doc"
              ></v-text-field>
            </v-label>
            <div class="w-1/2 flex justify-end">
              <v-btn variant="outlined" class="bg-white" @click="getInfoByCNPJ">
                <v-icon icon="mdi-magnify" size="x-large" class="mr-3"></v-icon>
                <ParagraphComponent>Buscar CNPJ</ParagraphComponent>
              </v-btn>
            </div>
          </div>
          <div class="flex gap-4">
            <v-label class="flex flex-col items-start w-1/2">
              Nome
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o nome"
                v-model="newCustomer.name"
              ></v-text-field>
            </v-label>
            <v-label class="flex flex-col items-start w-1/2">
              Nome Fantasia
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o nome fantasia"
                v-model="newCustomer.fantasyName"
              ></v-text-field>
            </v-label>
          </div>
          <div class="flex gap-4">
            <v-label class="flex flex-col items-start w-1/2">
              Email
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o email"
                v-model="newCustomer.email"
              ></v-text-field>
            </v-label>
            <v-label class="flex flex-col items-start w-1/2">
              Endereço
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o endereço completo"
                v-model="newCustomer.address"
              ></v-text-field>
            </v-label>
          </div>
          <div class="flex gap-4">
            <v-label class="flex flex-col items-start w-1/2">
              Cidade
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira a cidade"
                v-model="newCustomer.city"
              ></v-text-field>
            </v-label>
            <v-label class="flex flex-col items-start w-1/2">
              CEP
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o CEP"
                v-model="newCustomer.zipCode"
              ></v-text-field>
            </v-label>
          </div>
        </div>
      </section>
      <v-divider class="border-opacity-100 mx" color="#DDD"></v-divider>
      <section class="w-full flex mt-6">
        <div class="w-1/2 h-full">
          <h2 class="text-2xl font-bold">Informações de contato:</h2>
          <p class="w-2/3 text-[#555] text-sm font-semibold mt-2 ml-4">
            Insira as informações de contato do estabelecimento
          </p>
        </div>
        <div class="w-1/2 h-full">
          <div class="flex gap-4">
            <v-label class="flex flex-col items-start w-1/2">
              Telefone
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o telefone"
                v-model="newCustomer.phone"
              ></v-text-field>
            </v-label>
            <v-label class="flex flex-col items-start w-1/2">
              Nome de contato
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o nome de contato"
                v-model="newCustomer.contactName"
              ></v-text-field>
            </v-label>
          </div>
        </div>
      </section>
      <v-divider class="border-opacity-100 mt-6" color="#DDD"></v-divider>
      <section class="w-full flex mt-6">
        <div class="w-1/2 h-full">
          <h2 class="text-2xl font-bold">Informações de pagamento:</h2>
          <p class="w-2/3 text-[#555] text-sm font-semibold mt-2 ml-4">
            Insira as informações de pagamento do estabelecimento
          </p>
        </div>
        <div class="w-1/2 h-full">
          <div class="flex gap-4">
            <v-label class="flex flex-col items-start w-1/2">
              Prazo de pagamento
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o numero de dias"
                type="number"
                v-model="newCustomer.paymentTerm"
              ></v-text-field>
            </v-label>
            <v-label class="flex flex-col items-start w-1/2">
              Desconto
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                density="compact"
                class="w-full"
                placeholder="Insira o desconto"
                type="number"
                v-model="newCustomer.discount"
              ></v-text-field>
            </v-label>
          </div>
        </div>
      </section>
    </div>

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
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import type { Customer } from '@/dtos/customer'
import { getInfoByCNPJRequest, createCustomerRequest } from '@/repositories/customer'

import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import { notify } from '@kyvg/vue3-notification'

const router = useRouter()

const newCustomer = ref<Customer>({} as Customer)
const screenHeight = ref<number>(0)
const isLoading = ref(false)

function resizeTable() {
  screenHeight.value = window.innerHeight
}

const contentHeight = computed(() => `${screenHeight.value - 266}px`)

async function getInfoByCNPJ() {
  const { data } = await getInfoByCNPJRequest(newCustomer.value.doc)
  newCustomer.value = data
}

async function submitCreateCustomer() {
  isLoading.value = true
  try {
    await createCustomerRequest({
      name: newCustomer.value.name,
      fantasyName: newCustomer.value.fantasyName,
      doc: newCustomer.value.doc,
      email: newCustomer.value.email,
      address: newCustomer.value.address,
      city: newCustomer.value.city,
      zipCode: newCustomer.value.zipCode,

      phone: newCustomer.value.phone,
      contactName: newCustomer.value.contactName,

      discount: Number(newCustomer.value.discount),
      paymentTerm: Number(newCustomer.value.paymentTerm)
    })

    notify({
      title: 'Successo',
      text: 'Cliente criado com sucesso',
      type: 'success'
    })

    router.push({ name: 'CustomerList' })
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
