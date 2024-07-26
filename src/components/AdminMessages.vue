<template>
    <div class="w-full mx-auto max-w-screen-xl p-4">
      <h2 class="text-2xl font-bold mb-4">Kontaktní zprávy</h2>
      <div v-if="loading" class="text-center">
        Načítání zpráv...
      </div>
      <div v-else-if="messages.length === 0" class="text-center">
        Žádné zprávy k zobrazení.
      </div>
      <div v-else>
        <div v-for="message in messages" :key="message.id" class="border p-4 mb-4 rounded shadow">
          <p><strong>Od:</strong> {{ message.firstName }} {{ message.lastName }}</p>
          <p><strong>Email:</strong> {{ message.email }}</p>
          <p><strong>Telefon:</strong> {{ message.phone }}</p>
          <p><strong>Webová stránka:</strong> {{ message.website }}</p>
          <p><strong>Zpráva:</strong> {{ message.message }}</p>
          <p><strong>Vytvořeno:</strong> {{ formatDate(message.createdAt) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { collection, getDocs, query, orderBy } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        messages: [],
        loading: true
      }
    },
    async mounted() {
      await this.fetchMessages();
    },
    methods: {
      async fetchMessages() {
        try {
          const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          this.messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        } catch (error) {
          console.error('Chyba při načítání zpráv:', error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        if (date && date.seconds) {
          return new Date(date.seconds * 1000).toLocaleString();
        }
        return 'Neznámé datum';
      }
    }
  }
  </script>