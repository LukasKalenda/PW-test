<template>
  <div class="w-full mx-auto max-w-screen-xl">
    <h2 class="text-2xl font-bold mb-4">Editor článku</h2>
    <input
      v-model="title"
      placeholder="Název článku"
      class="w-full p-2 mb-4 border rounded"
    />
    <div class="mb-4">
      <label class="block mb-2">Náhledový obrázek:</label>
      <input
        type="file"
        @change="handleImageUpload"
        accept="image/*"
        class="mb-2"
      />
      <img
        v-if="imagePreview"
        :src="imagePreview"
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
          bullist numlist outdent indent | removeformat | image | help',
        images_upload_handler: handleEditorImageUpload
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
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      title: "",
      content: "",
      imageFile: null,
      imagePreview: null,
      isSaving: false,
      saveError: null,
      saveSuccess: null,
    };
  },
  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.imageFile);
    },

    async handleEditorImageUpload(blobInfo, progress) {
      return new Promise(async (resolve, reject) => {
        try {
          const file = blobInfo.blob();
          const fileName = blobInfo.filename();
          const storageRef = ref(storage, `article-content-images/${Date.now()}-${fileName}`);
          const snapshot = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(snapshot.ref);
          resolve(imageUrl);
        } catch (error) {
          reject('Image upload failed');
        }
      });
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

        let imageUrl = null;
        if (this.imageFile) {
          const storageRef = ref(
            storage,
            `article-images/${slug}-${Date.now()}`
          );
          const snapshot = await uploadBytes(storageRef, this.imageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, "articles"), {
          title: this.title,
          content: this.content,
          slug: slug,
          imageUrl: imageUrl,
          createdAt: new Date(),
        });

        this.saveSuccess = "Článek byl úspěšně uložen!";
        this.title = "";
        this.content = "";
        this.imageFile = null;
        this.imagePreview = null;
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
