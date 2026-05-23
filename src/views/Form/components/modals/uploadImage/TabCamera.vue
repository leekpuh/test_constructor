<script lang="ts" setup>
import Button from "@/components/ui/buttons/Button.vue";
import { useFormsStore } from "@/stores/forms";
import { useDevicesList, useUserMedia } from "@vueuse/core";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiCamera } from "oh-vue-icons/icons";
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
  useTemplateRef,
  watchEffect,
} from "vue";

addIcons(BiCamera);

const emit = defineEmits<{
  closeModal: [];
}>();
const currentCamera = shallowRef<string>();
const { videoInputs: cameras } = useDevicesList({
  onUpdated() {
    if (!cameras.value.some((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});

const video = ref<HTMLVideoElement | null>(null);
const photo = ref<File>();
const photoUrl = ref("");


const { stream, enabled } = useUserMedia({
  constraints: reactive({
    video: {
      deviceId: {
        exact: currentCamera,
      },
    },
    audio: false,
  }),
});
onMounted(() => {
  enabled.value = true;
});
onUnmounted(() => {
  enabled.value = false;
});

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!;
});

const takePhoto = () => {
  if (!video.value) return;

  const canvas = document.createElement("canvas");

  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video.value, 0, 0);

canvas.toBlob((blob) => {
  if (!blob) return;

  const file = new File([blob], "photo.png", {
    type: "image/png",
  });

  photo.value = file;
  photoUrl.value = URL.createObjectURL(file);
}, "image/png");

  console.log(photo)
};

const formsStore = useFormsStore()

const handleAddImage = () => {
  if (!photo.value) return;
  formsStore.addImage(photo.value, "");
  emit("closeModal");
};

</script>
<template>
  <div class="flex h-85">
    <div class="flex items-center flex-col gap-2 w-1/2 pt-4">
      <video
        ref="video"
        muted
        autoplay
        playsinline
        class="max-h-60 w-fit rounded-lg "
      />

      <button
        @click="takePhoto"
        class="bg-slate-200 w-fit hover:bg-slate-300/75 p-2 rounded-full"
      >
        <OhVueIcon name="bi-camera" scale="1.5" class="text-slate-400" />
      </button>
    </div>
    <div class="w-1/2 h-auto bg-slate-200 flex justify-center rounded-l-lg gap-2 pt-4">
      <img v-if="photo" :src="photoUrl" alt="Фото" class="h-60 w-fit rounded-lg border-2 border-slate-800" />

    </div>
  </div>
  <div v-if="photo" class="w-full flex justify-end pr-5">
      <Button @click="handleAddImage"> Вставить изображение </Button>
    </div>
</template>
