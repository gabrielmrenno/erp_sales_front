<template>
  <main class="h-screen overflow-y-auto overflow-x-hidden">
    <notifications class="my-notification" position="bottom center" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { setBearerAuthorization } from './repositories/axiosClient'

const stringData = localStorage.getItem('user') || '{}'
const { token } = JSON.parse(stringData)

setBearerAuthorization(token)
</script>

<style>
.my-notification .success {
  color: #555;

  background-color: #fff112;
  border-left: 5px solid #c9be2d;
}
</style>
