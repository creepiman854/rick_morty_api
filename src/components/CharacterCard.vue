<template>
  <div>
    <img :src="image" alt="" class="rounded-2xl" />
    <div class="flex justify-between items-end">
      <div class="flex flex-col">
        <span><strong>Nombre: </strong>{{ name }}</span>
        <span><strong>Estado: </strong>{{ status }}</span>
        <span><strong>Género: </strong>{{ gender }}</span>
      </div>
      <font-awesome-icon icon="fa-solid fa-star" size="xl"/>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: String,
  name: { String, required: true },
  status: { String, required: true },
  gender: { String, required: true },
})


</script>

<style lang="scss" scoped></style>
