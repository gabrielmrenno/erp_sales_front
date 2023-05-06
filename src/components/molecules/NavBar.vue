<template>
  <v-navigation-drawer class="bg-[#FFF112]" permanent app>
    <div class="my-4 w-full flex justify-center h-12">
      <img src="../../assets/logo.png" alt="Logo Fecularia Piranguinho" class="" />
    </div>
    <v-divider class="border-opacity-100 mx" color="#fff"></v-divider>

    <v-list>
      <v-list-item
        router-link
        :to="{ name: 'ProductsList' }"
        exact-active-class="v-list-item--active"
        prepend-icon="mdi-package-variant-closed"
        title="Produtos"
        value="produtos"
        v-if="hasPermission([UsersRoles.ADMIN, UsersRoles.SELLER])"
      >
      </v-list-item>

      <v-list-item
        router-link
        :to="{ name: 'OrdersList' }"
        exact-active-class="v-list-item--active"
        prepend-icon="mdi-cart-outline"
        title="Pedidos"
        value="pedidos"
        v-if="hasPermission([UsersRoles.ADMIN, UsersRoles.SELLER])"
      >
      </v-list-item>

      <v-list-item
        router-link
        :to="{ name: 'UsersList' }"
        exact-active-class="v-list-item--active"
        prepend-icon="mdi-account"
        title="Usuários"
        value="usuários"
        v-if="hasPermission([UsersRoles.ADMIN])"
      >
      </v-list-item>

      <v-list-item
        router-link
        :to="{ name: 'CustomersList' }"
        exact-active-class="v-list-item--active"
        prepend-icon="mdi-storefront"
        title="Clientes"
        value="clientes"
        v-if="hasPermission([UsersRoles.ADMIN, UsersRoles.SELLER])"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { UsersRoles } from '@/utils/enum'
import { hasPermission } from '@/utils/permissions'
</script>

<style scoped></style>
