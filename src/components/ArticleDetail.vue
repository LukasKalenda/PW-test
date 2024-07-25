<template>
  <div v-if="article" class="w-full mx-auto max-w-screen-xl article">
    <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
    <img
      v-if="article.imageUrl"
      :src="article.imageUrl"
      alt="Article image"
      class="mb-4 max-w-lg"
    />
    <div v-html="article.content"></div>
    <p class="text-gray-600 mt-4">{{ formatDate(article.createdAt) }}</p>
  </div>
  <div v-else-if="error" class="text-red-500">
    {{ error }}
  </div>
  <div v-else class="text-gray-600">Načítání článku...</div>
</template>

<script>
import { db } from "@/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  data() {
    return {
      article: null,
      error: null,
    };
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
  async mounted() {
    const slug = this.$route.params.slug;
    if (!slug) {
      this.error = "Chybí identifikátor článku";
      return;
    }
    try {
      const q = query(collection(db, "articles"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        this.article = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
      } else {
        // Pokud nenajdeme článek podle slugu, zkusíme hledat podle ID
        const articleDoc = await getDoc(doc(db, "articles", slug));
        if (articleDoc.exists()) {
          this.article = {
            id: articleDoc.id,
            ...articleDoc.data(),
          };
        } else {
          this.error = "Článek nebyl nalezen";
        }
      }
    } catch (error) {
      console.error("Chyba při načítání článku:", error);
      this.error = "Nastala chyba při načítání článku";
    }
  },
};
</script>

<style>
</style>
