<script lang="ts" setup>
import {
  onClickOutside,
  useDevicesList,
  useDropZone,
  useFileDialog,
  useUserMedia,
} from "@vueuse/core";
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
  useTemplateRef,
  watchEffect,
} from "vue";

import { useFormsStore } from "@/stores/forms";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoClose } from "oh-vue-icons/icons";
import Button from "@/components/ui/buttons/Button.vue";
import TabButton from "@/components/ui/buttons/TabButton.vue";
import TabManual from "./TabManual.vue";
import TabURL from "./TabURL.vue";
import TabCamera from "./TabCamera.vue";

addIcons(IoClose);

export interface IChosenImage {
  file: File | null;
  blob_url: string;
}

const emit = defineEmits<{
  closeModal: [];
}>();

const imageModalTarget = ref(null);

onClickOutside(imageModalTarget, () => {
  emit("closeModal");
});

type Tab = "manual" | "url" | "camera";
const chosenTab = ref<Tab>("manual");

const handleTabChange = (el: Tab) => {
  chosenTab.value = el;
};
</script>

<template>
  <Teleport to="body">
    <div class="h-screen w-screen flex-center fixed z-100 top-0 bg-gray-400/75">
      <div
        ref="imageModalTarget"
        class="w-200 h-130 bg-white shadow-md rounded-lg"
      >
        <div class="p-5">
          <div class="flex justify-between">
            <p class="pb-5">Вставка изображения</p>
            <button @click="emit('closeModal')">
              <OhVueIcon
                name="io-close"
                class="bg-slate-100 hover:bg-slate-200 rounded-full size-8 p-1 text-slate-400"
              />
            </button>
          </div>

          <ul class="flex gap-2">
            <li>
              <TabButton
                @click="handleTabChange('manual')"
                :isActive="chosenTab === 'manual'"
              >
                Загрузить
              </TabButton>
            </li>
            <li>
              <TabButton
                @click="handleTabChange('url')"
                :isActive="chosenTab === 'url'"
              >
                URL ссылка
              </TabButton>
            </li>
            <li>
              <TabButton
                @click="handleTabChange('camera')"
                :isActive="chosenTab === 'camera'"
              >
                Веб-камера
              </TabButton>
            </li>
          </ul>
          <hr class="border-slate-300" />
        </div>

        <TabManual v-if="chosenTab === 'manual'" @closeModal="emit('closeModal')" />
        <TabURL v-else-if="chosenTab === 'url'" @closeModal="emit('closeModal')" />
        <TabCamera v-else-if="chosenTab === 'camera'" @closeModal="emit('closeModal')" />


      </div>
    </div>
  </Teleport>
</template>
