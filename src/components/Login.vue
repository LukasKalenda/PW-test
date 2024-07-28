<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Přihlášení</h2>
      <form @submit.prevent="login" class="max-w-md">
        <input
          v-model="email"
          type="email"
          placeholder="E-mail"
          required
          class="w-full p-2 mb-4 text-black border rounded"
        >
        <input
          v-model="password"
          type="password"
          placeholder="Heslo"
          required
          class="w-full p-2 mb-4 text-black border rounded"
        >
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="isLogging"
        >
          {{ isLogging ? 'Přihlašování...' : 'Přihlásit' }}
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        isLogging: false,
        error: null
      };
    },
    methods: {
      async login() {
        this.isLogging = true;
        this.error = null;
        try {
          const auth = getAuth();
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/admin');
        } catch (error) {
          console.error('Chyba při přihlašování:', error);
          this.error = 'Nesprávné přihlašovací údaje. Zkuste to prosím znovu.';
        } finally {
          this.isLogging = false;
        }
      }
    }
  };
  </script>