<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { setBearerAuthorization } from './repositories/axiosClient'

const stringData = localStorage.getItem('user') ?? ''
const { token } = JSON.parse(stringData)

setBearerAuthorization(token)
</script>
