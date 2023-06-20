<template>
  <v-layout class="bg-[#F9F9EE] w-screen h-screen">
    <NavBar />
    <v-main class="my-8 mx-10">
      <HeaderComponent class="mb-8" />
      <main class="max-w-full">
        <RouterView></RouterView>
      </main>
    </v-main>
  </v-layout>
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
