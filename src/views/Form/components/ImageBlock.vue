<script lang="ts" setup>
import { type IImageBlock } from "@/stores/forms";
import { onUnmounted } from "vue";

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
  <div class="bg-white w-[50vw] h-fit py-4 px-6 flex flex-col gap-4">
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
  </div>
</template>
