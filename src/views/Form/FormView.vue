<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import QuestionCard from "./components/QuestionCard.vue";
import Toolbar from "./components/Toolbar.vue";
import { useFormsStore } from "@/stores/forms";
import { useRoute} from "vue-router";
import { storeToRefs } from "pinia";
import MainHeader from "@/components/MainHeader.vue";

const handleAddQuestion = () => {
  formsStore.addQuestion();
};

const route = useRoute();
const formsStore = useFormsStore();
const { currentForm, currentFormId } = storeToRefs(formsStore);

watchEffect(() => {
  currentFormId.value = route.params.id as string;
})
</script>

<template>
  <main class="bg-slate-100">
    <MainHeader />
    <div class="flex">
      <div
        class="h-[calc(100vh-72.8px)] w-fit flex-center sticky z-98 left-0 top-[72.8px] mx-2"
      >
        <Toolbar @add-question-card="handleAddQuestion" />
      </div>

      <div class="w-full flex items-center flex-col gap-4 py-8 [&>*:nth-last-child(1)]:mb-20">
        <div class="shadow-md shadow-slate-300 rounded-t-2xl h-fit w-fit">
          <div class="bg-blue-200 h-4 w-[50vw] rounded-t-2xl"></div>
          <div class="bg-white w-[50vw] h-fit py-4 px-6 flex flex-col">
            <input
              :value="currentForm?.title"
              placeholder="Название формы"
              class="border-b-2 border-slate-200 w-full outline-0 text-2xl p-2"
            />
            <input
              placeholder="Описание"
              class="border-b-2 border-slate-200 w-full outline-0 p-2"
            />
          </div>
        </div>
        <QuestionCard
          class="shadow-md shadow-slate-300 flex flex-col gap-4 "
          v-for="question in currentForm?.questions"
          :key="question.id"
          :id="question.id"
          :title="question.title"
          :type="question.questionType"
        />
      </div>
    </div>
  </main>
</template>
