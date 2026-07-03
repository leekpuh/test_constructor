<script lang="ts" setup>
import { watchEffect } from "vue";
import Toolbar from "./components/Toolbar.vue";
import { useFormsStore } from "@/stores/forms";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import MainHeader from "@/components/MainHeader.vue";
import QuestionBlock from "./components/QuestionBlock.vue";
import DescriptionBlock from "./components/DescriptionBlock.vue";
import ImageBlock from "./components/ImageBlock.vue";
import VideoBlock from "./components/VideoBlock.vue";
import PageBreakBlock from "./components/PageBreakBlock.vue";
import draggable from "vuedraggable";

const route = useRoute();
const formsStore = useFormsStore();
const { currentForm, currentFormId } = storeToRefs(formsStore);

watchEffect(() => {
  currentFormId.value = route.params.id as string;
});
</script>

<template>
  <main class="bg-slate-100">
    <MainHeader />
    <div class="flex">
      <div
        class="h-[calc(100vh-72.8px)] w-fit flex-center sticky z-98 left-0 top-[72.8px] mx-2"
      >
        <Toolbar />
      </div>

      <div
        class="w-full flex items-center flex-col gap-4 py-8 [&>*:nth-last-child(1)]:mb-20"
      >
        <div class="shadow-md shadow-slate-300 rounded-2xl h-fit w-fit">
          <div class="bg-blue-300 h-3 w-[50vw] rounded-t-2xl"></div>
          <div
            class="bg-white w-[50vw] h-fit py-4 px-6 flex flex-col rounded-b-2xl"
          >
            <input v-if="currentForm"
              v-model.trim="currentForm.title" 
              placeholder="Название теста"
              class="border-b-2 border-slate-200 w-full outline-0 text-2xl p-2"
            />
            <input v-if="currentForm"
            v-model.trim="currentForm.description"
              placeholder="Описание"
              class="border-b-2 border-slate-200 w-full outline-0 p-2"
            />
          </div>
        </div>
        <draggable
          v-if="currentForm"
          v-model="currentForm.blocks"
          item-key="id"
          animation="200"
          :force-fallback="true"
          :scroll="true"
          :scroll-sensitivity="80"
          :scroll-speed="10"
          handle=".handle"
          ghost-class="opacity-0"
          chosen-class="scalw-2"
          class="flex flex-col gap-4 noselect"
        >
          <template #item="{ element: block }">
            <div class="">
              <div
                class="h-2 w-full bg-blue-100 flex-center p-2 cursor-pointer hover:bg-blue-200/75 rounded-t-2xl handle"
              >
                <p class="text-slate-300">=</p>
              </div>
              <QuestionBlock
                v-if="block.blockType === 'question'"
                :question="block"
              />

              <DescriptionBlock v-else-if="block.blockType === 'description'" />

              <ImageBlock
                v-else-if="block.blockType === 'image'"
                :image="block"
              />

              <VideoBlock
                v-else-if="block.blockType === 'video'"
                :video="block"
              />

              <PageBreakBlock v-else-if="block.blockType === 'pageBreak'" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </main>
</template>
