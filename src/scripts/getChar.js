import axios from 'axios'
import { ref } from 'vue'

const endpoint = ref('https://rickandmortyapi.com/api/character')

export const getData = async () => {
  const res = await axios.get(endpoint.value)
  return res.data.results
}
