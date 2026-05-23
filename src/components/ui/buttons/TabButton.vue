<script lang="ts" setup>
defineProps<{
  isActive: boolean;
}>();
</script>

<template>
  <button
    class="py-1 px-4 "
    :class="isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500 hover:text-slate-700'"
  >
    <slot />
  </button>
</template>
