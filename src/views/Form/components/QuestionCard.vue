<script lang="ts" setup>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiChevronDown,
  MdRadiobuttonchecked,
  HiPlus,
  BiStar,
} from "oh-vue-icons/icons";
import Options from "./Options.vue";
import QuestionTypeDropdown from "./QuestionTypeDropdown.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { questionTypes } from "@/constants/questionTypes";
import type { QuestionType } from "@/stores/forms";

addIcons(HiChevronDown, MdRadiobuttonchecked, HiPlus, BiStar);
const props = defineProps<{
  id: string;
  title: string;
  type: QuestionType;
}>();

const isDropdownOpen = ref(false);

const questionTypeTarget = ref(null);

onClickOutside(questionTypeTarget, () => {
  isDropdownOpen.value = false;
});
</script>

<template>
  <div class="bg-white w-[50vw] h-fit py-4 px-6 flex flex-col gap-4 ">
    <input
      :value="title"
      class="border-b-2 border-slate-200 w-full outline-0 text-xl p-2"
    />

    <button
      @click="isDropdownOpen = true"
      class="w-fit h-10 border border-slate-300 flex items-center justify-between px-4 gap-4 rounded-lg"
    >
      <div class="flex items-center w-full gap-4 px-2">
        <OhVueIcon
          :name="questionTypes[props.type].icon"
          scale="1"
          class="text-slate-400 cursor-pointer"
        />

        <p>{{ questionTypes[props.type].label }}</p>
      </div>
      <OhVueIcon
        name="hi-chevron-down"
        scale="1"
        class="text-slate-400 cursor-pointer"
      />
    </button>
    <div
      v-if="isDropdownOpen"
      ref="questionTypeTarget"
      class="absolute mt-15 z-97"
    >
      <QuestionTypeDropdown
        :questionId="id"
        @closeDropdown="isDropdownOpen = false"
      />
    </div>
    <div class="py-2">
      <Options
        v-if="['single', 'multiple', 'dropdown'].includes(props.type)"
        :questionId="id"
      />
      <textarea
        v-else-if="props.type === 'text'"
        disabled
        placeholder="Ответ"
        class="border border-slate-300 rounded-lg p-2 h-12 w-full resize-none"
      />
      <div v-else-if="props.type === 'rating'" class="flex gap-2">
        <OhVueIcon name="bi-star" scale="1.5" class="text-slate-400 mb-2" />
        <OhVueIcon name="bi-star" scale="1.5" class="text-slate-400 mb-2" />
        <OhVueIcon name="bi-star" scale="1.5" class="text-slate-400 mb-2" />
        <OhVueIcon name="bi-star" scale="1.5" class="text-slate-400 mb-2" />
        <OhVueIcon name="bi-star" scale="1.5" class="text-slate-400 mb-2" />
      </div>
    </div>
  </div>
</template>
