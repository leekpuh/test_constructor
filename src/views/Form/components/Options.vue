<script lang="ts" setup>
import { useFormsStore } from "@/stores/forms";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { HiSolidPlus } from "oh-vue-icons/icons";
import { computed } from "vue";
addIcons(HiSolidPlus);

const props = defineProps<{
  questionId: string;
}>();

const formsStore = useFormsStore();
const question = computed(() => {
   const q = formsStore?.currentForm?.questions.find((q) => q.id === props.questionId);
  if (!q) {
    console.warn("Question not found:", props.questionId);
  }

  return q;
}

);
const options = computed(() => question.value?.options || []);

function handleAddOption(questionId: string) {
  formsStore.addOption(questionId);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <input
      v-for="o in options"
      :key="o.id"
      v-model="o.optionText"
      placeholder="Вариант ответа"
      class="border-b-2 border-slate-200 w-full outline-0 p-2"
    />
  </div>
  <button
    @click="handleAddOption(props.questionId)"
    class="text-slate-500 hover:text-slate-700 cursor-pointer w-fit pt-4"
  >
    <OhVueIcon name="hi-solid-plus" scale="1" />
    <span class="ml-2">Добавить вариант ответа</span>
  </button>
</template>
