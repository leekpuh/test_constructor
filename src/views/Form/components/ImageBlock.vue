<script lang="ts" setup>
import { type IImageBlock } from "@/stores/forms";
import { onUnmounted } from "vue";
import FormBlock from "./FormBlock.vue";

const props = defineProps<{
  image: IImageBlock;
}>();

let imageUrl = '';

if (props.image.imageFile) {
  imageUrl = URL.createObjectURL(props.image.imageFile);
}
else if (props.image.imageUrl) {
  imageUrl = props.image.imageUrl
}

onUnmounted(() => {
  URL.revokeObjectURL(imageUrl);
});


</script>
<template>
  <FormBlock>
    <input
      placeholder="Заголовок"
      class="border-b-2 border-slate-200 w-full outline-0 text-xl p-2"
    />
    <div class="flex-center">
      <img
        :src="imageUrl"
        class="border border-slate-300 p-1 max-h-100 w-fit rounded-xl"
      />
    </div>
  </FormBlock>
</template>
