<script lang="ts" setup>
import Button from '@/components/ui/buttons/Button.vue';
import { useFormsStore } from '@/stores/forms';
import { ref } from 'vue';


const emit = defineEmits<{
  closeModal: [];
}>();

const pastedUrl = ref("");
const imagePreviewUrl = ref("");
const imagePreviewError = ref(false);

const formsStore = useFormsStore()

const handleUrlUpload = () => {
  if (!pastedUrl.value) return;
  imagePreviewError.value = false;
  // проверки ссылки
  imagePreviewUrl.value = pastedUrl.value.trim();
};

const handleAddURLImage = () => {
  if (!imagePreviewUrl.value) return;
  formsStore.addImage(null, imagePreviewUrl.value);
  emit("closeModal");
};
</script>
<template>
<div class="px-5">
          <div class="h-85 flex flex-col gap-5 pt-5">
            <div class="flex gap-5">
              <input
                v-model="pastedUrl"
                placeholder="URL ссылка"
                class="border-b-2 border-slate-200 w-full outline-0 p-2 h-fit"
              />
              <Button @click="handleUrlUpload"> Загрузить </Button>
            </div>
            <div
              v-if="imagePreviewUrl && !imagePreviewError"
              class="flex-center"
            >
              <img
                :src="imagePreviewUrl"
                @error="imagePreviewError = true"
                class="h-50 w-fit border border-slate-400 p-1 rounded-xl"
              />
            </div>

            <p v-if="imagePreviewError">
              Загрузка не удалась. Проверьте URL ссылку.
            </p>
          </div>
          <div class="w-full flex justify-end mr-5">
            <Button
              v-if="imagePreviewUrl && !imagePreviewError"
              @click="handleAddURLImage"
            >
              Вставить изображение
            </Button>
          </div>
        </div>
</template>
