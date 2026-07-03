<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoClose } from "oh-vue-icons/icons";
import UploadImageModal from "./uploadImage/UploadImageModal.vue";
import UploadVideoModal from "./uploadVideo/UploadVideoModal.vue";

addIcons(IoClose);

const emit = defineEmits<{
  closeModal: [];
}>();

const props = defineProps<{
  type: string;
}>();

const modalTarget = ref(null);

onClickOutside(modalTarget, () => {
  emit("closeModal");
});

const modalTitle = computed(() => {
  return props.type === "image" ? "Вставить изображение" : "Вставить видео";
});
</script>

<template>
  <Teleport to="body">
    <div class="h-screen w-screen flex-center fixed z-100 top-0 bg-gray-400/75">
      <div ref="modalTarget" class="w-200 h-130 bg-white shadow-md rounded-lg">
        <div class="p-5">
          <div class="flex justify-between">
            <p class="pb-5">{{ modalTitle }}</p>
            <button @click="emit('closeModal')">
              <OhVueIcon
                name="io-close"
                class="bg-slate-100 hover:bg-slate-200 rounded-full size-8 p-1 text-slate-400"
              />
            </button>
          </div>
          <UploadImageModal
            v-if="type === 'image'"
            @close-modal="emit('closeModal')"
          />
          <UploadVideoModal
            v-if="type === 'video'"
            @close-modal="emit('closeModal')"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
