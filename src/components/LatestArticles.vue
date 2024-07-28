<template>
  <div class="w-full mx-auto max-w-screen-xl p-4 mt-5 md:mt-20 mb-5 md:mb-20">
    <h2 class="text-4xl text-center font-bold mb-10">Nejnovější články</h2>
    <div class="flex flex-col md:flex-row justify-between">
      <div
        v-for="article in latestArticles"
        :key="article.id"
        class="mb-4 p-4 border rounded flex flex-col max-w-sm bg-bg_light border-bg_light"
      >
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          alt="Article image"
          class="mb-2 max-w-sm"
        />
        <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
        <p class="text-gray-400 mb-2">{{ formatDate(article.createdAt) }}</p>
        <router-link
          :to="{
            name: 'articleDetail',
            params: { slug: article.slug || article.id },
          }"
          class="text-blue-500 hover:underline"
        >
          Číst více
        </router-link>
      </div>
    </div>
    <div class="text-center">
      <router-link
        :to="{ name: 'articleList' }"
        class="mt-4 mx-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Zobrazit všechny články
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import slugify from "slugify";

export default {
  data() {
    return {
      latestArticles: [],
    };
  },
  async mounted() {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, orderBy("createdAt", "desc"), limit(3));
    const querySnapshot = await getDocs(q);

    this.latestArticles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        slug: data.slug || slugify(data.title, { lower: true, strict: true }),
      };
    });
  },
  methods: {
    formatDate(date) {
      if (date instanceof Date) {
        return date.toLocaleDateString();
      } else if (date && date.seconds) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return "Neznámé datum";
    },
  },
};
</script>
