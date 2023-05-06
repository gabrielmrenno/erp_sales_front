<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-dialog v-model="showConfirmDeleteModal" :width="360" persistent>
    <ConfirmActionModal
      title="Deletar Produto"
      :text="`Deseja deletar o pedido '${id}'?`"
      @close-modal="showConfirmDeleteModal = false"
      @confirm-action="deleteOrderFunction"
    />
  </v-dialog>

  <FormHeader header-title="Novo Pedido" />

  <section class="w-full my-2 flex justify-end">
    <div>
      <v-btn variant="outlined" class="bg-red-600" @click="showConfirmDeleteModal = true">
        <v-icon icon="mdi-delete-outline" size="x-large" class="mr-3"></v-icon>
        <ParagraphComponent>Deletar</ParagraphComponent>
      </v-btn>
    </div>
  </section>

  <v-dialog v-model="showAddCustomerModal" :width="500" persistent>
    <AddCostumerModal
      @confirm-action="(data) => setCustomer(data)"
      @close-modal="showAddCustomerModal = false"
    />
  </v-dialog>

  <v-dialog v-model="showAddProductModal" :width="500" persistent>
    <AddProductModal
      @confirm-action="(data) => setProductList(data)"
      @close-modal="showAddProductModal = false"
    />
  </v-dialog>

  <v-dialog v-model="showEditProductModal" :width="500" persistent>
    <EditProductModal
      :selected-product="selectedProduct"
      @confirm-action="(data) => editProductList(data)"
      @close-modal="showEditProductModal = false"
    />
  </v-dialog>

  <div class="w-full flex justify-center overflow-auto">
    <form
      class="flex flex-col py-4 w-full max-w-6xl justify-center"
      @submit.prevent="submitCreateOrder"
    >
      <section class="w-full p-4">
        <div class="flex justify-end" v-if="!customer.code">
          <v-btn variant="outlined" class="bg-white" @click="showAddCustomerModal = true">
            <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
            <ParagraphComponent>Adicionar cliente</ParagraphComponent>
          </v-btn>
        </div>
        <v-card class="bg-[#FFC] pb-4" v-else>
          <v-card-title class="flex justify-between">
            <div class="flex items-center gap-4">
              <v-icon icon="mdi-information-outline"></v-icon>
              Detalhes do cliente
            </div>
            <div class="flex items-center gap-4">
              <v-btn
                @click="showAddCustomerModal = true"
                density="comfortable"
                variant="outlined"
                icon="mdi-pencil"
              ></v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-4 py-2">
            <v-row class="px-4">
              <v-col cols="2" class="py-2"> ID: {{ customer.code }} </v-col>
              <v-col class="py-2"> Nome: {{ customer.name }}</v-col>
            </v-row>
            <v-row class="px-4">
              <v-col cols="2" class="py-2"> Doc: 123456 </v-col>
              <v-col class="py-2"> Nome fantasia: {{ customer.fantasyName }} </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col class="py-2"> Email: {{ customer.email }} </v-col>
              <v-col class="py-2"> Telefone: {{ customer.phone }} </v-col>
              <v-col class="py-2"> Nome de Contato: {{ customer.contactName }} </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col class="py-2" cols="2"> CEP: {{ customer.zipCode }} </v-col>
              <v-col class="py-2"> Endereço: {{ customer.address }} </v-col>
              <v-col class="py-2"> Cidade: {{ customer.city }} </v-col>
            </v-row>
            <v-row class="px-4">
              <v-col class="py-2" cols="2"> Desconto: {{ customer.discount }} % </v-col>
              <v-col class="py-2"> Prazo de pagamento: {{ customer.paymentTerm }} dias </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>
      <section>
        <div class="w-full items-end p-4">
          <div class="flex justify-end">
            <v-btn variant="outlined" class="bg-white" @click="showAddProductModal = true">
              <v-icon icon="mdi-plus-box-outline" size="x-large" class="mr-3"></v-icon>
              <ParagraphComponent>Adicionar Produto</ParagraphComponent>
            </v-btn>
          </div>
        </div>
        <div class="mt-6" v-resize="resizeTable">
          <v-data-table
            v-model:page="page"
            :headers="headers"
            :items="productList"
            :items-per-page="itemsPerPage"
            :items-length="productList.length"
            fixed-header
            :loading="isLoadingData"
            @click:row="(_, { item }) => goToProductDetails(item.value)"
          >
            <template #item.actions>
              <div class="flex justify-center gap-7 text-[#555]">
                <VIcon icon="mdi-chevron-right"></VIcon>
              </div>
            </template>
            <template v-slot:bottom>
              <div class="bg-[#F9F9EE] pt-4 flex justify-end">
                <v-pagination v-model="page" :length="numberOfPage" rounded="circle"></v-pagination>
              </div>
            </template>
          </v-data-table>
        </div>
      </section>

      <div v-if="productList.length !== 0" class="w-full pr-4 flex justify-end">
        <div class="w-72">
          <v-card variant="outlined">
            <v-card-title
              >Valor Total: R$
              {{ totalValueArray.reduce((acc, cur) => (acc += cur)).toFixed(2) }}</v-card-title
            >
          </v-card>
        </div>
      </div>

      <div class="w-full flex justify-center">
        <div class="w-52">
          <v-btn
            class="mt-9"
            block
            color="#FFF112"
            size="large"
            height="56"
            type="submit"
            :loading="isLoadingData"
          >
            Atualizar
          </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'

import { getOrderDetails, editOrder, deleteOrder } from '@/repositories/order'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { getProductsInfoList } from '@/repositories/products-info'
import type { Customer } from '@/dtos/customer'
import type { OrderedProducts } from '@/dtos/order'

import ParagraphComponent from '@/components/atoms/ParagraphComponent.vue'
import FormHeader from '@/components/molecules/FormHeader.vue'
import AddCostumerModal from '@/components/molecules/AddCustomerModal.vue'
import AddProductModal from '@/components/molecules/AddProductModal.vue'
import EditProductModal from '@/components/molecules/EditProductModal.vue'
import { watchEffect } from 'vue'
import { getLocalStorage } from '@/repositories/axiosClient'
import ConfirmActionModal from '@/components/molecules/ConfirmActionModal.vue'

interface ShowProduct {
  productInfoCode: number
  name: string
  amount: number
  discount: number
  productPrice: number
  productWeight: number
  totalValue: number
}

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const customer = ref<Customer>({} as Customer)
const page = ref(1)

const headers = [
  { title: 'Código', key: 'productInfoCode' },
  {
    title: 'Nome',
    key: 'name'
  },
  { title: 'Quantidade', key: 'amount' },
  { title: 'Valor', key: 'productPrice' },
  { title: 'Valor total', key: 'totalValue' },
  { title: '', key: 'actions' }
]
const itemsPerPage = 20
let numberOfPage: number

const screenHeight = ref<number>(window.innerHeight)
const productList = ref<ShowProduct[]>([])
const selectedProduct = ref<ShowProduct>({} as ShowProduct)
const isLoadingData = ref(false)
const showAddCustomerModal = ref(false)
const showAddProductModal = ref(false)
const showEditProductModal = ref(false)
const showConfirmDeleteModal = ref(false)

const totalValueArray = computed(() => productList.value.map((product) => product.totalValue))

function resizeTable() {
  screenHeight.value = window.innerHeight
}

watchEffect(async () => {
  try {
    const responseData = await getOrderDetails(props.id)
    const products = await getProductsInfoList()

    console.log(responseData)

    customer.value = responseData.order.customer
    productList.value = responseData.order.OrderedProducts.map((product: OrderedProducts) => {
      return {
        amount: product.amount,
        discount: 0,
        name: products.find((prod) => prod.code === product.productInfoCode)!.name,
        productInfoCode: product.productInfoCode,
        productPrice: product.productPrice,
        productWeight: product.productWeight,
        totalValue: product.amount * product.productPrice
      }
    })
  } catch (error) {
    console.log(error)
  }
})

function goToProductDetails(item: any) {
  selectedProduct.value = item
  console.log(item)
  showEditProductModal.value = true
}

function setCustomer(data: Customer) {
  customer.value = data
  showAddCustomerModal.value = false
}

function setProductList(data: ShowProduct) {
  productList.value.push(data)
  showAddProductModal.value = false
}

function editProductList(data: ShowProduct) {
  const productIndex = productList.value.findIndex(
    (product) => product.productInfoCode === data.productInfoCode
  )
  productList.value[productIndex] = data

  showEditProductModal.value = false
}

async function deleteOrderFunction() {
  try {
    await deleteOrder(props.id)

    notify({
      title: 'Successo',
      text: 'Pedido deletado com sucesso',
      type: 'success'
    })

    router.push({ name: 'OrdersList' })
  } catch (error) {
    console.log(error)
  }
}

async function submitCreateOrder() {
  isLoadingData.value = true
  const { idUser } = getLocalStorage()

  try {
    const productListFormatted: OrderedProducts[] = productList.value.map((product) => {
      return {
        orderId: Number(props.id),
        productInfoCode: Number(product.productInfoCode),
        amount: Number(product.amount),
        productPrice: Number(product.productPrice),
        productWeight: Number(product.productWeight)
      }
    })
    await editOrder({
      customerCode: customer.value.code!,
      deliveryDate: null,
      OrderedProducts: productListFormatted,
      orderId: props.id,
      paymentDate: new Date(), // TODO: today plus paymentTerm
      paymentStatus: 'pendent',
      userId: idUser
    })

    notify({
      title: 'Successo',
      text: 'Pedido atualizado com sucesso',
      type: 'success'
    })

    router.push({ name: 'OrdersList' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
