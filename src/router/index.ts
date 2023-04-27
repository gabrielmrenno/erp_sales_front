import { createRouter, createWebHistory } from 'vue-router'

import { UsersRoles } from '@/utils/enum'
import { hasPermission } from '@/utils/permissions'

import LoginPage from '@/views/LoginPage.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import PanelPage from '@/views/PanelPage.vue'

import UserPage from '@/components/organisms/Users/UsersPage.vue'
import UsersListPage from '@/components/organisms/Users/UsersListPage.vue'
import NewUserPage from '@/components/organisms/Users/NewUserPage.vue'
import UserDetailsPage from '@/components/organisms/Users/UserDetailsPage.vue'
import ChangePasswordPage from '@/components/organisms/Users/ChangePasswordPage.vue'

import ProductsPage from '@/components/organisms/Products/ProductsPage.vue'
import ProductsList from '@/components/organisms/Products/ProductsList.vue'
import NewProductPage from '@/components/organisms/Products/NewProductPage.vue'
import ProductDetailsPage from '@/components/organisms/Products/ProductDetailsPage.vue'

import OrdersPage from '@/components/organisms/OrdersPage.vue'

import CustomersPage from '@/components/organisms/Customers/CustomersPage.vue'
import CustomersListPage from '@/components/organisms/Customers/CustomersListPage.vue'
import NewCustomerPage from '@/components/organisms/Customers/NewCustomerPage.vue'
import CustomerDetailsPage from '@/components/organisms/Customers/CustomerDetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
      meta: {
        protected: false
      }
    },
    {
      path: '/trocar-senha',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        protected: true,
        permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
      }
    },
    {
      path: '/painel',
      name: 'Panel',
      component: PanelPage,
      meta: {
        protected: true,
        permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
      },
      children: [
        {
          path: 'produtos',
          name: 'Products',
          component: ProductsPage,
          meta: {
            protected: true,
            permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
          },
          children: [
            {
              path: '',
              name: 'ProductsList',
              component: ProductsList,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
              }
            },
            {
              path: 'novo',
              name: 'NewProduct',
              component: NewProductPage,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN]
              }
            },
            {
              path: ':id',
              name: 'ProductDetails',
              component: ProductDetailsPage,
              props: true,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN]
              }
            }
          ]
        },
        {
          path: 'pedidos',
          name: 'Orders',
          component: OrdersPage,
          meta: {
            protected: true,
            permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
          }
        },
        {
          path: 'perfil',
          name: 'Profile',
          component: ChangePasswordPage,
          meta: {
            protected: true,
            permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
          }
        },
        {
          path: 'usuarios',
          name: 'Users',
          component: UserPage,
          meta: {
            protected: true,
            permissions: [UsersRoles.ADMIN]
          },
          children: [
            {
              path: '',
              name: 'UsersList',
              component: UsersListPage,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN]
              }
            },
            {
              path: 'novo',
              name: 'NewUser',
              component: NewUserPage,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN]
              }
            },
            {
              path: ':id',
              name: 'UserDetails',
              component: UserDetailsPage,
              props: true,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN]
              }
            }
          ]
        },
        {
          path: 'clientes',
          name: 'Customers',
          component: CustomersPage,
          meta: {
            protected: true,
            permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
          },
          children: [
            {
              path: '',
              name: 'CustomersList',
              component: CustomersListPage,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
              }
            },
            {
              path: 'novo',
              name: 'NewCustomer',
              component: NewCustomerPage,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
              }
            },
            {
              path: ':id',
              name: 'CustomerDetails',
              component: CustomerDetailsPage,
              props: true,
              meta: {
                protected: true,
                permissions: [UsersRoles.ADMIN, UsersRoles.SELLER]
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const permissions = to.meta.permissions as string[]

  if (to.meta.protected) {
    if (!hasPermission(permissions)) {
      return next({ name: 'Login' })
    }
  }

  return next()
})

export default router
