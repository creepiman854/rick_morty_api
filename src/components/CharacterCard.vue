<template>
  <div>
    <img :src="image" alt="" class="rounded-2xl" />
    <div class="flex justify-between items-end">
      <div class="flex flex-col">
        <span><strong>Nombre: </strong>{{ name }}</span>
        <span><strong>Estado: </strong>{{ status }}</span>
        <span><strong>Género: </strong>{{ gender }}</span>
      </div>
      <font-awesome-icon
        icon="fa-solid fa-star"
        size="xl"
        class="text-[#ffdd00] transition hover:text-[#fff199] hover:cursor-pointer"
        @click="addFav"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { addFavorite } from '@/services/favourites'
import { useToast } from 'vue-toastification'
import { getUser } from '@/services/authentication'

const toast = useToast()

const props = defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  gender: { type: String, required: true },
})


const addFav = async () => {
  const user = getUser()

  if (!user) {
    toast.error('Debes iniciar sesión para agregar a favoritos')
    return
  }

  const res = await addFavorite(user.uid, {
    image: props.image,
    name: props.name,
    status: props.status,
    gender: props.gender,
  })

  if (res.ok){
    toast.success(res.message)
  } else {
    toast.error(res.message)
  }
}
</script>

<style lang="scss" scoped></style>
