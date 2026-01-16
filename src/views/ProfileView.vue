<template>
  <div class="flex flex-col min-h-screen">
    <header class="shadow-lg px-8 py-3 h-25 flex justify-between items-center shrink-0 z-1">
      <router-link to="/" class="h-full"
        ><img src="@/assets/images/logo.png" alt="logo" class="h-full"
      /></router-link>
      <button
        @click="userLogout"
        class="bg-[#cc0000] p-3 text-white font-bold rounded-3xl transition hover:bg-[#ff6666] hover:cursor-pointer"
      >
        Cerrar sesión
      </button>
    </header>
    <main class="flex flex-col gap-10">
      <div class="bg-[#f2f2f2] p-10 flex flex-col justify-center items-center gap-5 z-0">
        <span class="font-black text-5xl font-[Audiowide]">Bienvenido</span>
        <span class="text-3xl">{{ user?.email }}</span>
      </div>
      <div v-if="favList.length" class="flex flex-col items-center">
        <h1 class="font-bold text-3xl">Tus favoritos</h1>
        <div class="flex flex-wrap gap-10 p-5 justify-center">
          <character-card
            v-for="(char, index) in favList"
            :key="index"
            :image="char.image"
            :name="char.name"
            :status="char.status"
            :gender="char.gender"
            class="shadow-xl p-5 rounded-3xl flex flex-col gap-2"
          ></character-card>
        </div>
      </div>
      <div v-else class="text-xl text-gray-500 text-center">Aún no tienes favoritos.</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { logout, getUser } from '@/services/authentication'
import router from '@/router'
import { useToast } from 'vue-toastification'
import { getFavoritesByUser } from '@/services/favourites'
import CharacterCard from '@/components/CharacterCard.vue'

const favList = ref([])

const toast = useToast()

const user = computed(() => getUser())

const userLogout = async () => {
  const res = await logout()

  if (res.ok) {
    toast.success(res.message)
    router.push('/login')
  } else {
    toast.error(res.message)
  }
}

onMounted(async () => {
  if (user.value) {
    const res = await getFavoritesByUser(user.value.uid)
    if (res.ok) {
      favList.value = res.favorites
    }
  }
})
</script>

<style lang="scss" scoped></style>
