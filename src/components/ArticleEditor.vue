<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Editor článku</h2>
    <input
      v-model="title"
      placeholder="Název článku"
      class="w-full p-2 mb-4 border rounded"
    />
    <editor
      api-key="cxpzzuuj1dj3yofi845lzdl6xhbsacrg7ido0yz4ih3dp2yy"
      v-model="content"
      :init="{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
      }"
    />
    <button
      @click="saveArticle"
      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      :disabled="isSaving"
    >
      {{ isSaving ? 'Ukládání...' : 'Uložit článek' }}
    </button>
    <p v-if="saveError" class="text-red-500 mt-2">{{ saveError }}</p>
    <p v-if="saveSuccess" class="text-green-500 mt-2">{{ saveSuccess }}</p>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import slugify from 'slugify'
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      title: "",
      content: "",
      isSaving: false,
      saveError: null,
      saveSuccess: null,
    };
  },
  methods: {
    async saveArticle() {
      if (!this.title || !this.content) {
        this.saveError = "Prosím vyplňte název a obsah článku.";
        return;
      }

      this.isSaving = true;
      this.saveError = null;
      this.saveSuccess = null;

      try {
        const slug = slugify(this.title, { lower: true, strict: true });
        await addDoc(collection(db, "articles"), {
          title: this.title,
          content: this.content,
          slug: slug,
          createdAt: new Date(),
        });
        
        this.saveSuccess = "Článek byl úspěšně uložen!";
        // Volitelně: Vyčistit formulář po úspěšném uložení
        this.title = "";
        this.content = "";
        
        // Volitelně: Přesměrovat na seznam článků nebo detail právě vytvořeného článku
        // this.$router.push({ name: 'articleList' });
      } catch (error) {
        console.error("Chyba při ukládání článku:", error);
        this.saveError = "Nastala chyba při ukládání článku. Zkuste to prosím znovu.";
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>