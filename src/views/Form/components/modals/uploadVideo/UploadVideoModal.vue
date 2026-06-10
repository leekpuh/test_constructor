<script lang="ts" setup>
import { ref } from "vue";

import TabManual from "./TabManual.vue";
import TabURL from "./TabURL.vue";
import TabButton from "@/components/ui/buttons/TabButton.vue";

const emit = defineEmits<{
  closeModal: [];
}>();

type Tab = "manual" | "url";
const chosenTab = ref<Tab>("url");

const handleTabChange = (el: Tab) => {
  chosenTab.value = el;
};
</script>

<template>
  <ul class="flex gap-2">
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
        @click="handleTabChange('manual')"
        :isActive="chosenTab === 'manual'"
      >
        Загрузить
      </TabButton>
    </li>
  </ul>
  <hr class="border-slate-300" />
  <div class="pt-2">
    <TabURL v-if="chosenTab === 'url'" @closeModal="emit('closeModal')" />
    <TabManual v-else-if="chosenTab === 'manual'" @closeModal="emit('closeModal')" />
  </div>
</template>
