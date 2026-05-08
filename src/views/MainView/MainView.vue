<script lang="ts" setup>
import MainHeader from "@/components/MainHeader.vue";
import router from "@/router";
import { useFormsStore } from "@/stores/forms";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidPlus, FcList } from "oh-vue-icons/icons";
addIcons(HiSolidPlus, FcList);

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
          <p class="text-lg">Создать форму</p>
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
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div>
        <p class="text-lg">Мои формы</p>
      </div>
      <div class="w-full h-full flex gap-4 pt-4">
        <div v-for="form in formsStore.forms">
          <div class="border border-slate-300 hover:border-slate-400 hover:cursor-pointer  rounded-b-lg ">
            <button
              @click="router.push(`/form/${form.id}`)"
              class="border-b border-slate-300 w-40 h-30 flex-cente bg-white"
            >
              <OhVueIcon name="fc-list" scale="2" class="text-slate-600" />
            </button>
            <div class="bg-blue-100 p-2 rounded-b-lg">
              <p class="text-sm">{{ form.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
