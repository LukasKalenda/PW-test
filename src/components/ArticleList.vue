<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Seznam článků</h2>
    <div v-for="article in articles" :key="article.id" class="mb-4 p-4 border rounded">
      <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
      <p class="text-gray-600 mb-2">{{ formatDate(article.createdAt) }}</p>
      <router-link :to="{ name: 'articleDetail', params: { slug: article.slug } }" class="text-blue-500 hover:underline">
        Číst více
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    this.articles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  methods: {
    formatDate(date) {
      return date instanceof Date ? date.toLocaleDateString() : new Date(date.seconds * 1000).toLocaleDateString();
    }
  }
}
</script>