<template>
  <v-dialog v-model="showConfirmDeleteModal" :width="360" persistent>
    <ConfirmActionModal
      title="Deletar Usuário"
      :text="`Deseja deletar o usuário '${customerDetails.name}'?`"
      @close-modal="showConfirmDeleteModal = false"
      @confirm-action="deleteCustomerFunction"
    />
  </v-dialog>

  <FormHeader :header-title="`Editar cliente`" />

  <section class="w-full my-2 flex justify-end">
    <div>
      <v-btn variant="outlined" class="bg-red-600" @click="showConfirmDeleteModal = true">
        <v-icon icon="mdi-delete-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Deletar</ParagraphComponent>
      </v-btn>
    </div>
  </section>

  <form
    v-if="!isLoading"
    class="flex flex-col w-full items-end"
    @submit.prevent="submitEditCustomer"
  >
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
                v-model="customerDetails.doc"
              ></v-text-field>
            </v-label>
            <div class="w-1/2 flex justify-end"></div>
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
                v-model="customerDetails.name"
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
                v-model="customerDetails.fantasyName"
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
                v-model="customerDetails.email"
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
                v-model="customerDetails.address"
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
                v-model="customerDetails.city"
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
                v-model="customerDetails.zipCode"
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
                v-model="customerDetails.phone"
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
                v-model="customerDetails.contactName"
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
                v-model="customerDetails.paymentTerm"
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
                v-model="customerDetails.discount"
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
        Editar
      </v-btn>
    </div>
  </form>
  <v-progress-circular indeterminate v-else />
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, defineProps } from 'vue'
import { useRouter } from 'vue-router'

import type { Customer } from '@/dtos/customer'
import { getCustomerDetails, editCustomer, deleteCustomer } from '@/repositories/customer'

import FormHeader from '@/components/molecules/FormHeader.vue'
import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import ConfirmActionModal from '@/components/molecules/ConfirmActionModal.vue'
import { notify } from '@kyvg/vue3-notification'

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

console.log(props.id)

const customerDetails = ref<Customer>({} as Customer)
const screenHeight = ref<number>(0)
const isLoading = ref(false)
const showConfirmDeleteModal = ref(false)

function resizeTable() {
  screenHeight.value = window.innerHeight
}

const contentHeight = computed(() => `${screenHeight.value - 266 - 56}px`)

watchEffect(async () => {
  try {
    const customer = await getCustomerDetails(props.id)
    customerDetails.value = customer
  } catch (error) {
    console.log(error)
  }
})

async function submitEditCustomer() {
  try {
    await editCustomer({
      code: props.id,

      name: customerDetails.value.name,
      fantasyName: customerDetails.value.fantasyName,
      doc: customerDetails.value.doc,
      address: customerDetails.value.address,
      city: customerDetails.value.city,
      zipCode: customerDetails.value.zipCode,
      email: customerDetails.value.email,

      phone: customerDetails.value.phone,
      contactName: customerDetails.value.contactName,

      discount: customerDetails.value.discount,
      paymentTerm: customerDetails.value.paymentTerm
    })

    notify({
      title: 'Successo',
      text: 'Cliente atualizado com sucesso',
      type: 'success'
    })

    router.back()
  } catch (error) {
    console.log(error)
  }
}

async function deleteCustomerFunction() {
  try {
    await deleteCustomer(props.id)

    notify({
      title: 'Successo',
      text: 'Cliente deletado com sucesso',
      type: 'success'
    })

    router.push({ name: 'CustomersList' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
