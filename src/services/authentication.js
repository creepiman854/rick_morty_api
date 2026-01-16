import { auth } from '@/firebase/config'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { ref } from 'vue'

const user = ref(null)
const authReady = ref(false)

onAuthStateChanged(auth, (userFirebase) => {
  console.log(`User detected: ${userFirebase?.email || "none"}`);

  user.value = userFirebase
  authReady.value = true
})

export const register = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log("User created");

    return{
      ok:true,
      message:"Perfil creado",
      user: userCredentials
    }
  } catch (error) {
    console.log("User NOT created: " + error);

    return{
      ok:false,
      message:"No se pudo crear el perfil"
    }
  }
}

export const login = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log("User logged");

    return{
      ok:true,
      message:"Sesión iniciada",
      user: userCredentials
    }
  } catch (error) {
    console.log("User NOT logged: " + error);

    return{
      ok:false,
      message:"No se pudo iniciar sesión"
    }
  }
}

export const logout = async() => {
  try {
    await signOut(auth)
    console.log("User logged out");

    return{
      ok: true,
      message:"Sesión cerrada"
    }
  } catch (error) {
    console.log("User NOT logged out: " + error);

    return{
      ok:false,
      message:"No se pudo cerrar sesión"
    }
  }
}


export const getUser = () => user.value
export const userAuthenticated = () => user.value !== null
export const isAuthReady = () => authReady.value
