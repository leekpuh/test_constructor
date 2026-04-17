<script lang="ts" setup>
import FormHeader from "@/components/FormHeader.vue";

import { ref } from "vue";
import QuestionCard from "./components/QuestionCard.vue";
import Toolbar from "./components/Toolbar.vue";


const questionCards = ref([{ id: 1, title: "Новый вопрос" }]);

const addQuestionCard = () => {
  questionCards.value.push({ id: Date.now(), title: "Новый вопрос" });
};
</script>

<template>
  <main class="bg-slate-100">
    <FormHeader />
    <div class="flex">
      <div
        class="h-[calc(100vh-72.8px)] w-fit flex-center sticky z-98 left-0 top-[72.8px] mx-2"
      >
        <Toolbar @add-question-card="addQuestionCard" />
      </div>



      <div class="w-full flex items-center flex-col gap-4 py-8">
        <div class="shadow-md shadow-slate-300 rounded-t-2xl h-fit w-fit">
          <div class="bg-blue-200 h-4 w-[50vw] rounded-t-2xl"></div>
          <div class="bg-white w-[50vw] h-fit p-4 flex flex-col">
            <input
              value="Новая форма"
              class="border-b-2 border-slate-200 w-full outline-0 text-2xl p-2"
            />
            <input
              placeholder="Описание"
              class="border-b-2 border-slate-200 w-full outline-0 p-2"
            />
          </div>
        </div>
          <QuestionCard
            class="shadow-md shadow-slate-300 flex flex-col gap-4"
            v-for="value in questionCards"
            :key="value.id"
            :title="value.title"
          />
      </div>
    </div>
  </main>
</template>
