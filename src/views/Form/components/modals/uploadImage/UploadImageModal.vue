<script lang="ts" setup>
import { ref } from "vue";

import TabButton from "@/components/ui/buttons/TabButton.vue";
import TabManual from "./TabManual.vue";
import TabURL from "./TabURL.vue";
import TabCamera from "./TabCamera.vue";


export interface IChosenImage {
  file: File | null;
  blob_url: string;
}

const emit = defineEmits<{
  closeModal: [];
}>();


type Tab = "manual" | "url" | "camera";
const chosenTab = ref<Tab>("manual");

const handleTabChange = (el: Tab) => {
  chosenTab.value = el;
};
</script>

<template>
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
    <div class=" pt-2">
      <TabManual
        v-if="chosenTab === 'manual'"
        @closeModal="emit('closeModal')"
      />
      <TabURL
        v-else-if="chosenTab === 'url'"
        @closeModal="emit('closeModal')"
      />
      <TabCamera
        v-else-if="chosenTab === 'camera'"
        @closeModal="emit('closeModal')"
      />
    </div>
</template>
