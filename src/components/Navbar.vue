<template>
  <nav class=" border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap"
          >Lukas Kalenda</span
        >
      </RouterLink>
      <button
        @click="toggleMenu"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        aria-controls="navbar-default"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">{{ isMenuOpen ? 'Close main menu' : 'Open main menu' }}</span>
        <svg
          v-if="!isMenuOpen"
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium text-center flex flex-col p-4 md:p-0 mt-4 border border-text_dark rounded-lg bg-bg_lighter md:bg-bg_dark md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
        >
          <li>
            <RouterLink
              @click="closeMenu"
              :to="{ name: 'home' }"
              class="navlink"
              aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="closeMenu"
              :to="{ name: 'contact' }"
              class="navlink"
              >Kontakt</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="closeMenu"
              :to="{ name: 'articleEditor' }"
              class="navlink"
              >Blog</RouterLink
            >
          </li>
          <li v-if="isLoggedIn">
            <RouterLink
              @click="closeMenu"
              :to="{ name: 'adminMessages' }"
              class="navlink"
            >
              Admin zprávy
            </RouterLink>
          </li>
          <li v-if="!isLoggedIn">
            <RouterLink
              @click="closeMenu"
              :to="{ name: 'login' }"
              class="block py-6 md:py-2 px-3 text-text_ligh"
            >
              Přihlásit
            </RouterLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
    });
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push('/');
      } catch (error) {
        console.error('Chyba při odhlašování:', error);
      }
    }
  }
}
</script>