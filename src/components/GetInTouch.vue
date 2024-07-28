<template>
    <section class="w-full mx-auto max-w-screen-xl p-4">
      <div>
        <h3 class="text-3xl font-bold hover:text-text_ligh text-center pt-6">
          Get in touch
        </h3>
      </div>
      <div>
        <div class="w-full mx-auto max-w-screen-md p-4">
          <form @submit.prevent="submitEmail" class="mb-6 flex flex-row justify-center p-4">
            <input
              v-model="email"
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-text-text_ligh focus:border-text-text_ligh block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
            />
            <button
              type="submit"
              class="bg-text_ligh text-white px-4 rounded-r-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-text-text_ligh focus:ring-opacity-50 transition-colors duration-200"
            >
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 16 4-4-4-4m6 8 4-4-4-4"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      submitEmail() {
        // Zde implementujte logiku pro odeslání e-mailu
        console.log('Odesílám e-mail:', this.email);
        // Můžete zde přidat volání API nebo jinou logiku pro zpracování e-mailu
        // Například:
        // await this.sendEmailToApi(this.email);
        
        // Po odeslání vyčistěte pole
        this.email = '';
      }
    }
  }
  </script>