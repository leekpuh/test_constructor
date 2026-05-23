<script lang="ts" setup>
import logo from "@/assets/icons/logo.svg";
import router from "@/router";
</script>

<template>
  <header class="shadow-lg shadow-slate-200 bg-white">
    <div class="flex justify-between items-center py-2 px-6 ">
      <div  @click="router.push(`/`)" class="flex gap-2 items-center  hover:cursor-pointer">
        <img :src="logo" alt="Logo" class="size-7" />
        <p class="text-xl">Тесты</p>
      </div>
      <div class="size-9 bg-amber-500 rounded-full"><img /></div>
    </div>
  </header>
</template>
