<script lang="ts" setup>
import MainHeader from "@/components/MainHeader.vue";
import router from "@/router";
import { useFormsStore } from "@/stores/forms";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiSolidPlus,
  FcList,
  BiThreeDotsVertical,
  MdAccesstimeRound,
} from "oh-vue-icons/icons";
addIcons(HiSolidPlus, FcList, BiThreeDotsVertical, MdAccesstimeRound);

const formsStore = useFormsStore();

function handleCreateNewForm() {
  const newForm = formsStore.addForm();
  router.push(`/form/${newForm.id}`);
}
</script>

<template>
  <main>
    <MainHeader />
    <div class="bg-slate-100 py-4 mb-8 shadow-lg shadow-slate-200">
      <div class="main-container">
        <div class="flex flex-col gap-4">
          <p class="text-lg">Создать тест</p>
          <div class="flex">
            <button
              @click="handleCreateNewForm"
              class="border border-slate-300 w-40 h-30 flex-center hover:border-slate-400 bg-white"
            >
              <OhVueIcon
                name="hi-solid-plus"
                scale="2"
                class="text-slate-600"
              />
            </button>
            
            <div class="border-l-3 border-slate-200 mx-4"></div>
            <div> </div>
          </div>

        </div>
      </div>
    </div>
    <div class="main-container">
      <div>
        <p class="text-lg">Мои тесты</p>
      </div>
      <div class="w-full h-full flex gap-6 flex-wrap pt-4">
        <div v-for="form in formsStore.forms">
          <div
            class="border border-slate-300 hover:border-slate-400 hover:cursor-pointer rounded-b-lg"
          >
            <button
              @click="router.push(`/form/${form.id}`)"
              class="border-b border-slate-300 w-40 h-30 flex-cente bg-white"
            >
              <OhVueIcon name="fc-list" scale="2" class="text-slate-600" />
            </button>
            <div class="bg-blue-50 p-2 rounded-b-lg ">
              <p class="text-sm mb-2">{{ form.title }}</p>
              <div class="flex justify-between">
                <div class="flex gap-1 items-center">
                  <OhVueIcon name="md-accesstime-round" scale="0.8" class="text-slate-600" />
                  <span class="text-xs">{{ form.createdAt }}</span>
                </div>
                <OhVueIcon name="bi-three-dots-vertical" scale="1" class="text-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
