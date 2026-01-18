<template>
  <div>
    <img :src="image" alt="" class="rounded-2xl" />
    <div class="flex justify-between items-end">
      <div class="flex flex-col">
        <span><strong>Nombre: </strong>{{ name }}</span>
        <span><strong>Estado: </strong>{{ status }}</span>
        <span><strong>Género: </strong>{{ gender }}</span>
      </div>
      <button v-if="mode === 'add'" :disabled="isFav" @click="addFav" class="transition">
        <font-awesome-icon
          icon="fa-solid fa-star"
          size="xl"
          :class="
            isFav
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#ffdd00] transition hover:text-[#fff199] hover:cursor-pointer'
          "
        />
      </button>
      <button v-else-if="mode === 'remove'" @click="removeFav" class="transition">
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          size="xl"
          class="text-red-600 transition hover:text-red-800 font-bold text-xl hover:cursor-pointer"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { addFavorite, removeFavorite, isFavorite } from '@/services/favourites'
import { useToast } from 'vue-toastification'
import { getUser } from '@/services/authentication'

const toast = useToast()
const isFav = ref(false)

// DEFINICIÓN DEL PROP //
const props = defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  gender: { type: String, required: true },
  mode: { type: String, default: 'add' },
  onRemove: Function,
})

// COMPROBACIÓN DE SI ESTÁ EN FAVORITOS //
onMounted(async () => {
  if (props.mode === 'add') {
    const user = getUser()

    if (!user) return
    isFav.value = await isFavorite(user.uid, props.name)
  }
})

// AÑADIR A FAVORITOS //
const addFav = async () => {
  const user = getUser()

  if (!user) {
    toast.error('Debes iniciar sesión para agregar a favoritos')
    return
  }

  const res = await addFavorite(user.uid, props)
  if (res.ok) {
    toast.success(res.message)
    isFav.value = true
  } else {
    toast.error(res.message)
  }
}

// QUITAR DE FAVORITOS //
const removeFav = async () => {
  const user = getUser()

  if (!user) {
    toast.error('Debes iniciar sesión para eliminar favoritos')
    return
  }

  const res = await removeFavorite(user.uid, props.name)
  if (res.ok) {
    toast.success(res.message)
    props.onRemove && props.onRemove(props.name)
  } else {
    toast.error(res.message)
  }
}
</script>

<style lang="scss" scoped></style>
