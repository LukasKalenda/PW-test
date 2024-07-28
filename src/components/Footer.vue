<template>
  <footer class="mt-5 md:mt-20">
    <hr class="h-0.5" />
    <div
      class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
    >
      <span class="text-sm  sm:text-center"
        >© {{ date }}
        Všechna práva vyhrazena.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium 400 sm:mt-0"
      >
        <li>
          <a href="#" class="hover:underline me-6 link">Kontakt</a>
        </li>
        <li>
          <a href="#" class="hover:underline link">Podmínky použití & GDPR</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
const date = new Date().getFullYear();
</script>
