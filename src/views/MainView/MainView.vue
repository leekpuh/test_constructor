<script lang="ts" setup>
import MainHeader from "@/components/MainHeader.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidPlus } from "oh-vue-icons/icons";
addIcons(HiSolidPlus);
</script>

<template>
  <main>
    <MainHeader />
    <div class=" bg-slate-100 py-4 mb-8 shadow-lg shadow-slate-200 ">
      <div class="main-container">
        <div class="flex flex-col gap-4">
          <p class="text-lg">Создать форму</p>
          <div class="flex">
            <RouterLink to="/blank-form">
              <button class="border border-slate-300 w-40 h-30 flex-center hover:border-slate-400 bg-white">
                <OhVueIcon name="hi-solid-plus" scale="2" class="text-slate-600"/>
              </button>
            </RouterLink>
            <div class="border-l-3 border-slate-200 mx-4"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div>
        <p class="text-lg">Мои формы</p>
      </div>
    </div>
  </main>
</template>
