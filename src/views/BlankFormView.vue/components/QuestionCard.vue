<script lang="ts" setup>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiChevronDown,
  MdRadiobuttonchecked,
  HiPlus,
} from "oh-vue-icons/icons";

addIcons(HiChevronDown, MdRadiobuttonchecked, HiPlus);
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="bg-white w-[50vw] h-fit p-4 flex flex-col gap-4">
    <input
      :value="title"
      class="border-b-2 border-slate-200 w-full outline-0 text-xl p-2"
    />
    
    <button
      class="w-fit h-10 border border-slate-300 flex items-center justify-between px-4 gap-4 rounded-lg"
    >
      <div class="flex justify-between items-center gap-4">
        <OhVueIcon
          name="md-radiobuttonchecked"
          scale="1"
          class="text-slate-400 cursor-pointer"
        />

        <p>Один вариант ответа</p>
      </div>
      <OhVueIcon
        name="hi-chevron-down"
        scale="1"
        class="text-slate-400 cursor-pointer"
      />
    </button>

    <input
      placeholder="Вариант ответа"
      class="border-b-2 border-slate-200 w-full outline-0 p-2"
    />
    <button  class="text-slate-500 hover:text-slate-700 cursor-pointer w-fit p-2">
      <OhVueIcon name="hi-plus" scale="1"/>
      <span class="ml-2 ">Добавить вариант ответа</span>
    </button>
  </div>
</template>
