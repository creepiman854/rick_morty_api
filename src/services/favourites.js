import { db } from '@/firebase/config'
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore'

// AÑADIR A LA BD //
export const addFavorite = async (userId, character) => {
  try {
    const q = query(
      collection(db, 'favourites'),
      where('userId', '==', userId),
      where('name', '==', character.name),
    )

    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      return {
        ok: false,
        message: 'Este personaje ya está en favoritos',
      }
    }

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

// ELIMINAR DE LA BD //
export const removeFavorite = async (userId, characterName) => {
  try {
    const q = query(
      collection(db, 'favourites'),
      where('userId', '==', userId),
      where('name', '==', characterName),
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return {
        ok: false,
        message: 'El personaje no existe en favoritos',
      }
    }

    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(db, 'favourites', docSnap.id))
    }

    return {
      ok: true,
      message: 'Personaje eliminado de favoritos',
    }
  } catch (error) {
    console.log('Character NOT deleted: ' + error)

    return {
      ok: false,
      message: 'No se pudo eliminar el personaje',
    }
  }
}

// OBTENER EL FAVORITO POR ID DE USUARIO //
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

// COMPROBACIÓN DE SI ES FAVORITO O NO //
export const isFavorite = async (userId, characterName) => {
  const q = query(
    collection(db, 'favourites'),
    where('userId', '==', userId),
    where('name', '==', characterName),
  )

  const snapshot = await getDocs(q)
  return !snapshot.empty
}
