<template>
  <div class="">
    <div class="w-full mx-auto max-w-screen-xl p-4">
      <TypeWriter></TypeWriter>
    </div>

    <!-- Get in touch -->
    <!-- <div class="bg-bg_lighter">
      <GetInTouch></GetInTouch>
    </div> -->
    <!-- Card -->
    <section>
      <div class="w-full mx-auto max-w-screen-xl p-4">
        <div>
          <h2 class="text-4xl text-center font-bold hover:text-gray-300 md:p-4">
            My work
          </h2>
        </div>

        <div class="flex flex-col justify-center md:flex-row mt-5">
          <Card></Card><Card></Card>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <LatestArticles></LatestArticles>

    <!-- Contact -->
    <section class="bg-bg_lighter md:mt-5 mt-20">
      <div class="w-full mx-auto max-w-screen-xl p-4">
        <div><h2 class="font-bold text-4xl text-center">Contact me</h2></div>
        <div class="flex justify-center pt-4 gap-4">
          <svg
            class="w-12 h-12 text-purple-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clip-rule="evenodd"
            /></svg
          ><svg
            class="w-12 h-12 text-purple-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
              clip-rule="evenodd"
            /></svg
          ><svg
            class="w-12 h-12 text-purple-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <Contacts></Contacts>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Card from "../components/Card.vue";
import TypeWriter from "../components/TypeWriter.vue";
import GetInTouch from "@/components/GetInTouch.vue";
import Button from "../components/Button.vue";
import ArticleList from "@/components/ArticleList.vue";
import LatestArticles from "@/components/LatestArticles.vue";
import Contacts from "@/components/Contacts.vue";
const buttons = ["Development", "Design", "3D prints"];
</script>
