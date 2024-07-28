<template>
  <h1 class="text-4xl font-bold mt-20">
    Your
    <span class="text-text_ligh">
      {{ currentText }}
    </span>
    <span class="animate-blink">|</span>
  </h1>
  <div class="mt-3 pl-1">
    <p class="text-gray_dark">I'm Lukas Kalenda, 4 years programming, designing, 3D printing. I specialise in Web Development.</p>
    <a href="" class="pt-3 text-xl font-bold text-text_ligh inline-flex items-center group">
      Get in touch
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-v-26d0ee6c=""><g transform="translate(24 0) scale(-1 1)"><g fill="none"><path d="M9 12l5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="il-md-length-15 il-md-duration-3 il-md-delay-0"></path><path d="M9 12l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="il-md-length-15 il-md-duration-3 il-md-delay-0"></path></g></g></svg>
    </a>
  </div>
</template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  export default {
    setup() {
      const titles = ["Designer", "Developer"]
      const currentText = ref('')
      const currentIndex = ref(0)
      const charIndex = ref(0)
      let timer
  
      const typeText = () => {
        if (charIndex.value < titles[currentIndex.value].length) {
          currentText.value += titles[currentIndex.value][charIndex.value]
          charIndex.value++
          timer = setTimeout(typeText, 100)
        } else {
          timer = setTimeout(eraseText, 2000)
        }
      }
  
      const eraseText = () => {
        if (charIndex.value > 0) {
          currentText.value = currentText.value.slice(0, -1)
          charIndex.value--
          timer = setTimeout(eraseText, 50)
        } else {
          currentIndex.value = (currentIndex.value + 1) % titles.length
          timer = setTimeout(typeText, 500)
        }
      }
  
      onMounted(() => {
        typeText()
      })
  
      onBeforeUnmount(() => {
        clearTimeout(timer)
      })
  
      return {
        currentText
      }
    }
  }
  </script>
  
  <style scoped>
  @keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .animate-blink {
    animation: blink 0.7s infinite;
  }
  </style>