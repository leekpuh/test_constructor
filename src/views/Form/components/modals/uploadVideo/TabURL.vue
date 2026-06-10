<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoClose } from "oh-vue-icons/icons";
import { useFormsStore } from "@/stores/forms";
import Button from "@/components/ui/buttons/Button.vue";

addIcons(IoClose);

const emit = defineEmits<{
  closeModal: [];
}>();


const pastedUrl = ref("");
const pastedUrlError = ref(false);
const embedUrl = ref("");
const allowedHosts = ["vkvideo.ru", "rutube.ru"];

const formsStore = useFormsStore();

const handleUrlUpload = () => {
  if (!pastedUrl.value) return;
  resetData();

  try {
    const url = new URL(pastedUrl.value.trim());
    if (!allowedHosts.includes(url.hostname)) {
      pastedUrlError.value = true;
      return;
    }
    handleCreateEmbedLink(url, url.hostname);
  } catch {
    pastedUrlError.value = true;
    return;
  }
};
const resetData = () => {
  pastedUrlError.value = false;
  embedUrl.value = "";
};

const handleAddURLVideo = () => {
  if (!embedUrl.value) return;
  formsStore.addVideo(embedUrl.value);
  emit("closeModal");
};

const handleCreateEmbedLink = (url: URL, host: string) => {
  if (host === "vkvideo.ru") {
    const videoID = url.pathname.slice(7).split("_");
    embedUrl.value =
      "https://vkvideo.ru/video_ext.php?oid=-" +
      videoID[0] +
      "&id=" +
      videoID[1];
  }
  if (host === "rutube.ru") {
    const videoID = url.pathname.slice(7);
    embedUrl.value = "https://rutube.ru/play/embed/" + videoID;
  }
};

</script>

<template>
  <div class="px-5">
    <div class="flex flex-col gap-2 pt-2">
      
      <div class="flex gap-5">
        <input
          v-model="pastedUrl"
          placeholder="URL ссылка"
          class="border-b-2 border-slate-200 w-full outline-0 p-2 h-fit"
        />

        <Button @click="handleUrlUpload"> Загрузить </Button>
      </div>
      <p class="text-xs">
        * Вставьте URL ссылку на видео
        <span class="text-blue-700">RUTUBE или VK Видео</span>
      </p>
      <div v-if="embedUrl && !pastedUrlError" class="flex-center h-65">
        <iframe
          :src="embedUrl"
          class="h-62 w-110 border border-slate-300 rounded-xl "
        />
      </div>
      <p v-if="pastedUrlError">Загрузка не удалась. Проверьте URL ссылку.</p>
    </div>
    <div class="w-full flex justify-end">
      <Button v-if="embedUrl && !pastedUrlError" @click="handleAddURLVideo">
        Вставить видео
      </Button>
    </div>
  </div>
</template>
