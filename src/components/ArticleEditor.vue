<template>
  <div class="w-full mx-auto max-w-screen-xl">
    <h2 class="text-2xl font-bold mb-4">Editor článku</h2>
    <input
      v-model="title"
      placeholder="Název článku"
      class="w-full p-2 mb-4 border rounded text-bg_dark"
    />
    <div class="mb-4">
      <label class="block mb-2">Náhledový obrázek URL:</label>
      <input
        v-model="imageUrl"
        type="url"
        placeholder="https://example.com/image.jpg"
        class="w-full p-2 mb-2 border rounded text-bg_dark"
      />
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="Preview"
        class="max-w-xs"
      />
    </div>
    <editor
      api-key="cxpzzuuj1dj3yofi845lzdl6xhbsacrg7ido0yz4ih3dp2yy"
      v-model="content"
      :init="{
        height: 500,
        menubar: 'file edit view insert format tools table help',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | image link | help',
        image_advtab: true,
        image_uploadtab: false,
        image_description: false,
        object_resizing: 'img',
        file_picker_types: 'image',
        file_picker_callback: this.handleFilePicker
      }"
    />
    <button
      @click="saveArticle"
      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      :disabled="isSaving"
    >
      {{ isSaving ? "Ukládání..." : "Uložit článek" }}
    </button>
    <p v-if="saveError" class="text-red-500 mt-2">{{ saveError }}</p>
    <p v-if="saveSuccess" class="text-green-500 mt-2">{{ saveSuccess }}</p>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import slugify from "slugify";
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
      imageUrl: "",
      isSaving: false,
      saveError: null,
      saveSuccess: null,
    };
  },
  methods: {
    handleFilePicker(callback, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Vložte URL obrázku');

      input.onchange = function () {
        const url = this.value;
        callback(url, { alt: '' });
      };

      input.click();
    },

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

        // Extrahujte URL obrázků z obsahu
        const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/g;
        const contentImageUrls = [];
        let match;
        while (match = imgRegex.exec(this.content)) {
          contentImageUrls.push(match[1]);
        }

        await addDoc(collection(db, "articles"), {
          title: this.title,
          content: this.content,
          slug: slug,
          imageUrl: this.imageUrl,
          contentImageUrls: contentImageUrls,
          createdAt: new Date(),
        });

        this.saveSuccess = "Článek byl úspěšně uložen!";
        this.title = "";
        this.content = "";
        this.imageUrl = "";
      } catch (error) {
        console.error("Chyba při ukládání článku:", error);
        this.saveError =
          "Nastala chyba při ukládání článku. Zkuste to prosím znovu.";
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>