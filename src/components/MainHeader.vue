<script lang="ts" setup>
import logo from "@/icons/logo.svg";
import router from "@/router";
</script>

<template>
  <header class="shadow-lg shadow-slate-200 bg-white">
    <div class="flex justify-between items-center py-4 px-6 ">
      <div  @click="router.push(`/`)" class="flex gap-4 items-center  hover:cursor-pointer">
        <img :src="logo" alt="Logo" />
        <p class="font-seq text-2xl">Тесты</p>
      </div>
      <div class="size-10 bg-amber-500 rounded-full"><img /></div>
    </div>
  </header>
</template>
