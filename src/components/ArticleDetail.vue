<template>
<template>
  <div v-if="article" class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
    <img v-if="article.imageUrl" :src="article.imageUrl" alt="Article image" class="mb-4 max-w-lg">
    <div v-html="article.content"></div>
    <p class="text-gray-600 mt-4">{{ formatDate(article.createdAt) }}</p>
  </div>
  <div v-else-if="error" class="text-red-500">
    {{ error }}
  </div>
  <div v-else class="text-gray-600">
    Načítání článku...
  </div>
</template>
</template>

<script>
import { db } from "@/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      article: null,
      error: null,
    };
  },
  async mounted() {
    const slug = this.$route.params.slug;
    try {
      const q = query(collection(db, "articles"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        this.article = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
      } else {
        this.error = "Článek nebyl nalezen";
      }
    } catch (error) {
      console.error("Chyba při načítání článku:", error);
      this.error = "Nastala chyba při načítání článku";
    }
  },
};
</script>