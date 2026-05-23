import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type QuestionType =
  | "single"
  | "multiple"
  | "dropdown"
  | "text"
  | "rating";

interface IForm {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  blocks: FormBlock[];
}

export interface IQuestionBlock {
  id: string;
  blockType: "question";
  title: string;
  questionType: QuestionType;
  options: IOption[];
}

export interface IDescriptionBlock {
  id: string;
  blockType: "description";
  text: string;
}

export interface IImageBlock {
  id: string;
  blockType: "image";
  imageFile: File | null;
  imageUrl: string | null;
}

export interface IVideoBlock {
  id: string;
  blockType: "video";
  videoUrl: string;
}

type FormBlock = IQuestionBlock | IDescriptionBlock | IImageBlock | IVideoBlock;

export interface IOption {
  id: string;
  optionText: string;
}

export const useFormsStore = defineStore("formsStore", () => {
  const forms = ref<IForm[]>([]);
  const currentFormId = ref<string | null>(null);

  const currentForm = computed(() => {
    return forms.value.find((form) => form.id === currentFormId.value);
  });

  const defineTitle = () => {
    const numOfBlankTitles = forms.value.filter((form) =>
      form.title.includes("Новый тест"),
    ).length;
    return numOfBlankTitles === 0
      ? "Новый тест"
      : `Новый тест (${numOfBlankTitles})`;
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
      title: "Новый вопрос",
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
    if (!currentForm.value) return

    const newDescription: IDescriptionBlock = {
      id: nanoid(),
      blockType: "description",
      text: "",
    };

    currentForm.value.blocks.push(newDescription)
  }
  function addImage(file: File | null, url: string | null) {
    if (!currentForm.value) return

    const newImage: IImageBlock = {
      id: nanoid(),
      blockType: 'image',
      imageFile: file,
      imageUrl: url,
    }

    currentForm.value.blocks.push(newImage)
  }

  //picture functions


  return {
    forms,
    currentFormId,
    currentForm,
    addForm,
    addQuestion,
    addOption,
    changeQuestionType,
    addDescription,
    addImage
  };
});
