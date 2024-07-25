<template>
  <div class="w-full mx-auto max-w-screen-xl p-4">
    <form @submit.prevent="submitForm">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
          <input
            v-model="formData.firstName"
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
          <input
            v-model="formData.lastName"
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
          />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
          <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678"
            pattern="[0-9]{9}"
            required
          />
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
          <input
            v-model="formData.website"
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="flowbite.com"
            required
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <div class="mb-6">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zpráva</label>
        <textarea
          v-model="formData.message"
          id="message"
          rows="4"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Vaše zpráva..."
          required
        ></textarea>
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            v-model="formData.agreeToTerms"
            id="remember"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required
          />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree with the
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        firstName: '',
        lastName: '',
        phone: '',
        website: '',
        email: '',
        message: '',
        agreeToTerms: false
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
          this.formData[key] = key === 'agreeToTerms' ? false : '';
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