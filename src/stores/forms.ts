import type {
  IDescriptionBlock,
  IForm,
  IImageBlock,
  IOption,
  IPageBreak,
  IQuestionBlock,
  IVideoBlock,
  QuestionType,
} from "@/types/forms";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFormsStore = defineStore("formsStore", () => {
  const forms = ref<IForm[]>([]);
  const currentFormId = ref<string | null>(null);
  const history = ref([]);

  const currentForm = computed(() => {
    return forms.value.find((form) => form.id === currentFormId.value);
  });

  const defineTitle = () => {
    const blankTitles = forms.value.filter((form) =>
      form.title.match(/^Новый тест( \((\d+)\))?$/),
    );
   if (blankTitles.length === 0) return "Новый тест"
   const maxNum = blankTitles.reduce((max, form) => {
    const match = form.title.match(/\((\d+)\)/)
    if (!match) return max
    const num = Number(match[1])
    return num - 1 === max ? num : max
   }, 0)
    return `Новый тест (${maxNum + 1})`;
  };

  const formatedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  function addForm() {
    const newForm: IForm = {
      id: nanoid(),
      title: defineTitle(),
      description: "",
      createdAt: formatedDate(),
      updatedAt: new Date().toISOString(),
      blocks: [],
    };
    forms.value.push(newForm);
    currentFormId.value = newForm.id;
    addQuestion("single");
    return newForm;
  }

  //question functions

  function addQuestion(type: QuestionType) {
    if (!currentForm.value) return;

    const question: IQuestionBlock = {
      id: nanoid(),
      blockType: "question",
      title: "",
      questionType: type,
      options: [],
    };

    currentForm.value.blocks.push(question);
    addOption(question.id);
  }

  //option functions

  function addOption(questionid: string) {
    const question = currentForm.value?.blocks.find(
      (b) => b.blockType === "question" && b.id === questionid,
    ) as IQuestionBlock;

    const newOption: IOption = {
      id: nanoid(),
      optionText: "",
    };

    question?.options.push(newOption);
  }

  function changeQuestionType(questionid: string, newType: QuestionType) {
    const question = currentForm.value?.blocks.find(
      (b) => b.blockType === "question" && b.id === questionid,
    ) as IQuestionBlock;

    if (!question) return;

    question.questionType = newType;
  }

  //description functions

  function addDescription() {
    if (!currentForm.value) return;

    const newDescription: IDescriptionBlock = {
      id: nanoid(),
      blockType: "description",
      text: "",
    };

    currentForm.value.blocks.push(newDescription);
  }

  //image functions

  function addImage(file: File | null, url: string | null) {
    if (!currentForm.value) return;

    const newImage: IImageBlock = {
      id: nanoid(),
      blockType: "image",
      title: "",
      imageFile: file,
      imageUrl: url,
    };

    currentForm.value.blocks.push(newImage);
  }

  //video functions
  function addVideo(url: string) {
    if (!currentForm.value) return;

    const newVideo: IVideoBlock = {
      id: nanoid(),
      blockType: "video",
      title: "",
      videoUrl: url,
    };

    currentForm.value.blocks.push(newVideo);
  }

  //page break

  function breakPage() {
    if (!currentForm.value) return;
    const newPageBreak: IPageBreak = {
      id: nanoid(),
      blockType: "pageBreak",
    };
    currentForm.value.blocks.push(newPageBreak);
  }

  //history undo

  function addToHistory() {}

  //general func

  // function changeBlockTitle(blockId: string, newTitle: string) {
  //   const block = currentForm.value?.blocks.find((b) =>
  //     b.id === blockId);
  //   if (
  //     block &&
  //     (block.blockType === "question" ||
  //       block.blockType === "image" ||
  //       block.blockType === "video")
  //   )
  //     block.title = newTitle;
  // }

  return {
    forms,
    currentFormId,
    currentForm,
    addForm,
    addQuestion,
    addOption,
    changeQuestionType,
    addDescription,
    addImage,
    addVideo,
    breakPage,
  };
});
