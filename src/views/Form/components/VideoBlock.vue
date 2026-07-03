<script lang="ts" setup>
import { type IVideoBlock } from "@/types/forms";
import FormBlock from "./FormBlock.vue";

const props = defineProps<{
  video: IVideoBlock;
}>();
</script>
<template>
  <FormBlock>
    <input
      placeholder="Заголовок"
      v-model="props.video.title"
      class="border-b-2 border-slate-200 w-full outline-0 text-xl p-2"
    />
    <div class="flex-center">
      <iframe
        :src="video.videoUrl"
        class="h-80 w-142 border border-slate-300 rounded-xl"
      />
    </div>
  </FormBlock>
</template>
