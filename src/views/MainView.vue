<template>
  <header v-if="!isLogged" class="font-[Audiowide] shadow-lg px-8 py-3 h-25 flex justify-between items-center">
    <img src="@/assets/images/logo.png" alt="logo" class="h-full"/>
    <router-link to="/login" class="font-bold text-xl">Iniciar sesión</router-link>
  </header>
  <header v-else class="font-[Audiowide] shadow-lg px-8 py-3 h-25 flex justify-between items-center">
    <img src="@/assets/images/logo.png" alt="logo" class="h-full"/>
    <router-link to="/userProfile" class="font-bold text-xl">Favoritos</router-link>
  </header>
  <div class="flex flex-wrap gap-10 p-5 justify-center">
    <character-card
      v-for="(char, index) in charList"
      :key="index"
      :image="char.image"
      :name="char.name"
      :status="char.status"
      :gender="char.gender"
      class="shadow-xl p-5 rounded-3xl flex flex-col gap-2"
    ></character-card>
  </div>
</template>

<script setup>
import CharacterCard from '@/components/CharacterCard.vue'
import { getData } from '@/scripts/getChar'
import { ref, onMounted, computed } from 'vue'
import { getUser } from '@/services/authentication'

const isLogged = computed(() => getUser())

const charList = ref([])

onMounted(() => {
  getData().then((character) => {
    charList.value = character

    // console.log(charList.value);
  })
})
</script>

<style lang="scss" scoped></style>
