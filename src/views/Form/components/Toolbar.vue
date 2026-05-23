<script lang="ts" setup>
import { useFormsStore } from "@/stores/forms";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiPlusCircle,
  HiChatAlt,
  OiImage,
  OiVideo,
  MdLineweightRound,
  MdRemoveredeyeOutlined,
  HiReply,
} from "oh-vue-icons/icons";
import { ref } from "vue";
import UploadImageModal from "./modals/uploadImage/UploadImageModal.vue";
addIcons(
  HiPlusCircle,
  HiChatAlt,
  OiImage,
  OiVideo,
  MdLineweightRound,
  MdRemoveredeyeOutlined,
  HiReply,
);

const formsStore = useFormsStore();

const isModalUploadImageOpen = ref(false);


const handleAddQuestion = () => {
  formsStore.addQuestion("single");
};

const handleAddDescription = () => {
  formsStore.addDescription();
};

const handleUploadImage = () => {
  isModalUploadImageOpen.value = true;
};

const toolbarButtonsData = [
  {
    title: 'Добавить вопрос',
    funcOnClick: handleAddQuestion,
    icon: 'hi-plus-circle',
  },
  {
    title: 'Добавить описание',
    funcOnClick: handleAddDescription,
    icon: 'hi-chat-alt',
  },{
    title: 'Добавить изображение',
    funcOnClick: handleUploadImage,
    icon: 'oi-image',
  },{
    title: 'Добавить видео',
    funcOnClick: () => {},
    icon: 'oi-video',
  },{
    title: 'Добавить раздел',
    funcOnClick: () => {},
    icon: 'md-lineweight-round',
  },{
    title: 'Предпросмотр формы',
    funcOnClick: () => {},
    icon: 'md-removeredeye-outlined',
  },{
    title: 'Отменить изменение',
    funcOnClick: () => {},
    icon: 'hi-reply',
  },
]

</script>
<template>
  <div class="h-fit w-fit p-5 bg-white shadow border border-slate-200">
    <ul class="flex flex-col gap-3">
      <li v-for="el in toolbarButtonsData" :key="el.title" class="nth-last-[2]:border-t-3 nth-last-[2]:border-slate-200 nth-last-[2]:pt-2">
        <button :title="el.title" @click="el.funcOnClick">
          <OhVueIcon
            :name="el.icon"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer "
          />
        </button>
      </li>
    </ul>
    <UploadImageModal
      v-if="isModalUploadImageOpen"

      @closeModal="isModalUploadImageOpen = false"
    />
  </div>
</template>
