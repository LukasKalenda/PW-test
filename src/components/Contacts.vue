<template>
  <div class="w-full mx-auto max-w-screen-xl p-4">
    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-md font-medium ">Jméno</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Jan Novák"
          required
        />
      </div>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-md font-medium ">Email</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="jan.novak@example.com"
          required
        />
      </div>
      <div class="mb-6">
        <label for="message" class="block mb-2 text-md font-medium ">Zpráva</label>
        <textarea
          v-model="formData.message"
          id="message"
          rows="4"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Vaše zpráva..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="text-white bg-purple-500 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Odesílání...' : 'Odeslat' }}
      </button>
    </form>

    <p v-if="submitStatus" :class="submitStatus.success ? 'text-green-500' : 'text-red-500'" class="mt-4">
      {{ submitStatus.message }}
    </p>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      isSubmitting: false,
      submitStatus: null
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.submitStatus = null;

      try {
        await addDoc(collection(db, 'contactMessages'), {
          ...this.formData,
          createdAt: new Date()
        });

        this.submitStatus = {
          success: true,
          message: 'Zpráva byla úspěšně odeslána!'
        };

        // Reset formuláře
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = '';
        });

      } catch (error) {
        console.error('Chyba při odesílání zprávy:', error);
        this.submitStatus = {
          success: false,
          message: 'Při odesílání zprávy nastala chyba. Zkuste to prosím znovu.'
        };
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>