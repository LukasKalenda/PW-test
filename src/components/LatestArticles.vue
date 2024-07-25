<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Nejnovější články</h2>
      <div v-for="article in latestArticles" :key="article.id" class="mb-4 p-4 border rounded">
        <img v-if="article.imageUrl" :src="article.imageUrl" alt="Article image" class="mb-2 max-w-xs">
        <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
        <p class="text-gray-600 mb-2">{{ formatDate(article.createdAt) }}</p>
        <router-link 
          :to="{ name: 'articleDetail', params: { slug: article.slug || article.id } }" 
          class="text-blue-500 hover:underline"
        >
          Číst více
        </router-link>
      </div>
      <router-link 
        :to="{ name: 'articleList' }" 
        class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Zobrazit všechny články
      </router-link>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
  import slugify from 'slugify';
  
  export default {
    data() {
      return {
        latestArticles: []
      }
    },
    async mounted() {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      
      this.latestArticles = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          slug: data.slug || slugify(data.title, { lower: true, strict: true })
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
        return 'Neznámé datum';
      }
    }
  }
  </script>