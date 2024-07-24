<template>
  <footer class="bg-white ">
    <div
      class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
    >
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© {{ date }}
        Všechna práva vyhrazena.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <a href="#" class="hover:underline me-6">Kontakt</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Podmínky použití & GDPR</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
const date = new Date().getFullYear();
</script>
