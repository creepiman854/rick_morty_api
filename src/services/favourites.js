import { db } from '@/firebase/config'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

export const addFavorite = async (userId, character) => {
  try {
    const docRef = await addDoc(collection(db, 'favourites'), {
      userId,
      image: character.image,
      name: character.name,
      status: character.status,
      gender: character.gender,
    })
    console.log('Character added')

    return {
      ok: true,
      message: 'Personaje añadido a favoritos',
      id: docRef.id,
    }
  } catch (error) {
    console.log('Character NOT added: ' + error)

    return {
      ok: false,
      message: 'No se pudo añadir a favoritos',
    }
  }
}

export const getFavoritesByUser = async (userId) => {
  try {
    const q = query(collection(db, 'favourites'), where('userId', '==', userId))
    const snapshot = await getDocs(q)
    const favorites = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return { ok: true, favorites }
  } catch (error) {
    console.error('Error getting favorites:', error)
    return { ok: false, error }
  }
}
