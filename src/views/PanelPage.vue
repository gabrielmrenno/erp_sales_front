<template>
  <v-card>
    <v-layout class="bg-[#F9F9EE] h-screen">
      <NavBar />
      <v-main class="my-8 mx-10">
        <HeaderComponent class="mb-8" />
        <main class="h-[80%]">
          <RouterView></RouterView>
        </main>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/molecules/HeaderComponent.vue'
import NavBar from '@/components/molecules/NavBar.vue'
</script>

<style>
.active-item {
  background-color: #555;
  color: #fff112;
}

.v-list-item--link.v-list-item--active {
  background-color: #555;
  color: #fff112;
}
</style>
