<script lang="ts" setup>
import { useFormsStore } from "@/stores/forms";
import { type IQuestionBlock } from "@/types/forms";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { HiSolidPlus } from "oh-vue-icons/icons";
import { computed } from "vue";
addIcons(HiSolidPlus);

const props = defineProps<{
  questionId: string;
}>();

const formsStore = useFormsStore();
const question = computed(() => {
  const block = formsStore?.currentForm?.blocks.find(
    (b) => b.id === props.questionId && b.blockType === "question",
  ) as IQuestionBlock;

  return block;
});
const options = computed(() => question.value?.options || []);

function handleAddOption(questionId: string) {
  formsStore.addOption(questionId);
}
</script>

<template>
  <div class="flex flex-col gap-2" >
    <div class="flex gap-4" v-for="o in options" :key="o.id">
      <input
        v-model="o.optionText"
        placeholder="Вариант ответа"
        class="border-b-2 border-slate-200 w-full outline-0 p-2"
      />
      <input v-model="o.rightAnswer" type="checkbox" class="size-5 cursor-pointer flex self-center" title="Пометить верный ответ"/>
    </div>
  </div>
  <button
    @click="handleAddOption(props.questionId)"
    class="text-slate-500 hover:text-slate-700 cursor-pointer w-fit pt-4"
  >
    <OhVueIcon name="hi-solid-plus" scale="1" />
    <span class="ml-2">Добавить вариант ответа</span>
  </button>
</template>
