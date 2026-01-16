<template>
  <div class="flex flex-col min-h-screen">
    <header class="font-[Audiowide] shadow-lg px-8 py-3 h-25 flex justify-between items-center shrink-0">
      <router-link to="/" class="h-full"
        ><img src="@/assets/images/logo.png" alt="logo" class="h-full"
      /></router-link>
      <router-link to="/register" class="font-bold text-xl">Registrarse</router-link>
    </header>
    <main class="flex-1 flex items-center justify-center overflow-hidden">
      <form
        @submit.prevent="userLogin"
        class="shadow-xl flex flex-col p-10 gap-5 rounded-3xl justify-center items-center"
      >
        <h1 class="font-bold text-3xl mb-5 font-[Audiowide]">Inicia sesión</h1>
        <input type="email" v-model="email" placeholder="Correo electrónico" :class="input" />
        <input type="password" v-model="passwd" placeholder="Contraseña" :class="input" />
        <button
          type="submit"
          class="border-2 w-50 p-3 rounded-3xl text-white font-bold text-lg bg-[#999999] transition hover:bg-[#b3b3b3] hover:cursor-pointer"
          :disabled="loading"
        >
          {{ loading ? 'Accediendo...' : 'Acceder' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/services/authentication'
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Estilos
const input = ref('border-2 border-[#cccccc] w-150 rounded-2xl p-3 outline-none')

const email = ref('')
const passwd = ref('')
const loading = ref(false)

const userLogin = async () => {
  loading.value = true
  const res = await login(email.value, passwd.value)
  loading.value = false

  if (res.ok) {
    toast.success(res.message)
    router.push('/userProfile')
  } else {
    toast.error(res.message)
  }
}
</script>

<style lang="scss" scoped></style>
