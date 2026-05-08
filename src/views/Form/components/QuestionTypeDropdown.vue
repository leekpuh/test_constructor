<script lang="ts" setup>
import { useFormsStore, type QuestionType } from "@/stores/forms";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdRadiobuttonchecked,
  BiCheckSquare,
  CoChevronDoubleDown,
  BiFilterSquare,
  IoStarHalfOutline,
} from "oh-vue-icons/icons";
import { questionTypes } from "@/constants/questionTypes";

const props = defineProps<{
  questionId: string
}>()
const emit = defineEmits<{
  closeDropdown: []
}>();

const formsStore = useFormsStore();

const handleTypeChange = (type: QuestionType) => {
formsStore.changeQuestionType(props.questionId, type);
emit("closeDropdown");
}

addIcons(
  MdRadiobuttonchecked,
  BiCheckSquare,
  CoChevronDoubleDown,
  BiFilterSquare,
  IoStarHalfOutline,
);
</script>

<template>
  <div
    class="w-fit h-fit z-101 p-2 bg-white shadow-2xl border border-slate-200 rounded-lg flex flex-col gap-2"
  >
    <button v-for="(type, key) in questionTypes" :key="key" @click="handleTypeChange(key as QuestionType)">
      <div
        class="flex justify-between items-center gap-4 rounded-md border border-slate-200 hover:border-slate-300 px-4 py-2"
      >
        <OhVueIcon
          :name="type.icon"
          scale="1"
          class="text-slate-400 cursor-pointer"
        />

        <p>{{ type.label }}</p>
      </div>
    </button>

    
  </div>
</template>
