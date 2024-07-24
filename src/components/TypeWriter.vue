<template>
    <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-200 mt-20">
      I'm a
      <span class="text-blue-600 dark:text-blue-400">
        {{ currentText }}
      </span>
      <span class="animate-blink">|</span>
    </h1>
    <div class="mt-3">
        <a href="" class="text-gray-500 hover:text-purple-500">Get in touch ></a>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  export default {
    setup() {
      const titles = ["Designer", "Developer", "Trainer"]
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