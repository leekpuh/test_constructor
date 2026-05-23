<script lang="ts" setup>
import Button from "@/components/ui/buttons/Button.vue";
import { useDropZone, useFileDialog } from "@vueuse/core";
import { reactive, ref } from "vue";
import type { IChosenImage } from "./UploadImageModal.vue";
import { useFormsStore } from "@/stores/forms";
import uploadImg from "@/assets/images/upload.png";

const emit = defineEmits<{
  closeModal: [];
}>();

const formsStore = useFormsStore();

const chosenImage = reactive<IChosenImage>({
  file: null,
  blob_url: "",
});

const { open, onChange } = useFileDialog({
  accept: "image/png, image/jpg, image/jpeg",
  multiple: false,
});

const setImagePreview = (file: File) => {
  chosenImage.file = file;

  if (chosenImage.blob_url) {
    URL.revokeObjectURL(chosenImage.blob_url);
  }

  chosenImage.blob_url = URL.createObjectURL(file);
};

onChange((files) => {
  const file = files?.[0];
  if (file) setImagePreview(file);
});

const handleAddFileImage = () => {
  if (!chosenImage.file) return;
  formsStore.addImage(chosenImage.file, "");
  resetChosenImage();
  emit("closeModal");
};

const resetChosenImage = () => {
  if (chosenImage.blob_url) {
    URL.revokeObjectURL(chosenImage.blob_url);
  }

  chosenImage.file = null;
  chosenImage.blob_url = "";
};

// DROP IMAGE

const dropZoneRef = ref<HTMLDivElement | null>(null);

const onDrop = (files: File[] | null) => {
  const file = files?.[0];
  if (file) setImagePreview(file);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/png", "image/jpeg", "image/jpg"],
});
</script>

<template>
  <div class="px-5">
    <div
      ref="dropZoneRef"
      class="h-85 flex-center flex-col gap-4 bg rounded-xl border-3 border-dashed border-slate-300"
      :class="isOverDropZone ? ' bg-slate-200' : '   bg-slate-50'"
    >
      <img v-if="!chosenImage.blob_url" :src="uploadImg" class="w-30" />
      <img
        v-else-if="chosenImage.blob_url"
        :src="chosenImage.blob_url"
        class="h-50 border border-slate-400 p-1 rounded-xl"
      />

      <Button @click="open" type="button"> Обзор </Button>
      <span class="text-sm">Или перетащите изображение сюда</span>
    </div>
    <div v-if="chosenImage.blob_url" class="w-full flex justify-end mr-5">
      <Button @click="handleAddFileImage"> Вставить изображение </Button>
    </div>
  </div>
</template>
