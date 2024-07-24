<template>
  <div>
    <h1 v-if="article">{{ article.title }}</h1>
    <p v-if="article" v-html="article.content"></p>
    <p v-if="!article && !error">Načítání článku...</p>
    <p v-if="error">{{ error }}</p>
  </div>
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