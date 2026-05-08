<script lang="ts" setup>
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
addIcons(
  HiPlusCircle,
  HiChatAlt,
  OiImage,
  OiVideo,
  MdLineweightRound,
  MdRemoveredeyeOutlined,
  HiReply,
);

const emit = defineEmits(["add-question-card"]);
const addQuestionCard = () => {
  emit("add-question-card");
};
</script>
<template>
  <div class="h-fit w-fit p-5 bg-white shadow border border-slate-200">
    <ul class="flex flex-col gap-5">
      <li>
        <button title="добавить вопрос" @click="addQuestionCard">
          <OhVueIcon
            name="hi-plus-circle"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <li>
        <button title="добавить описание">
          <OhVueIcon
            name="hi-chat-alt"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <li>
        <button title="добавить изображение">
          <OhVueIcon
            name="oi-image"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <li>
        <button title="добавить видео">
          <OhVueIcon
            name="oi-video"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <li>
        <button title="добавить раздел">
          <OhVueIcon
            name="md-lineweight-round"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <hr class="border-2 border-slate-200" />
      <li>
        <button title="Предпросмотр формы">
          <OhVueIcon
            name="md-removeredeye-outlined"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
      <li>
        <button title="Отменить изменение">
          <OhVueIcon
            name="hi-reply"
            scale="1.5"
            class="text-slate-400 hover:text-slate-600 cursor-pointer"
          />
        </button>
      </li>
    </ul>
  </div>
</template>
