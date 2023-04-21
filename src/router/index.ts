import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import PanelPage from '@/views/PanelPage.vue'

import UserPage from '@/components/organisms/Users/UsersPage.vue'
import UsersListPage from '@/components/organisms/Users/UsersListPage.vue'
import NewUserPage from '@/components/organisms/Users/NewUserPage.vue'
import UserDetailsPage from '@/components/organisms/Users/UserDetailsPage.vue'

import ProductsPage from '@/components/organisms/ProductsPage.vue'
import ProductsList from '@/components/organisms/ProductsList.vue'
import NewProductPage from '@/components/organisms/NewProductPage.vue'

import OrdersPage from '@/components/organisms/OrdersPage.vue'
import CustomersPage from '@/components/organisms/CustomersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/trocar-senha',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/painel',
      name: 'Panel',
      component: PanelPage,
      children: [
        {
          path: 'produtos',
          name: 'Products',
          component: ProductsPage,
          children: [
            {
              path: '',
              name: 'ProductsList',
              component: ProductsList
            },
            {
              path: 'novo',
              name: 'NewProduct',
              component: NewProductPage
            }
          ]
        },
        {
          path: 'pedidos',
          name: 'Orders',
          component: OrdersPage
        },
        {
          path: 'usuarios',
          name: 'Users',
          component: UserPage,
          children: [
            {
              path: '',
              name: 'UsersList',
              component: UsersListPage
            },
            {
              path: 'novo',
              name: 'NewUser',
              component: NewUserPage
            },
            {
              path: ':id',
              name: 'UserDetails',
              component: UserDetailsPage,
              props: true
            }
          ]
        },
        {
          path: 'customers',
          name: 'Customers',
          component: CustomersPage
        }
      ]
    }
  ]
})

export default router
