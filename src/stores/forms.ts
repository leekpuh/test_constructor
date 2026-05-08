import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface IForm {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}

export type QuestionType =
  | "single"
  | "multiple"
  | "dropdown"
  | "text"
  | "rating";

interface IQuestion {
  id: string;
  title: string;
  questionType: QuestionType;
  options: IOption[];
}

interface IOption {
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
      form.title.includes("Новая форма"),
    ).length;
    return numOfBlankTitles === 0
      ? "Новая форма"
      : `Новая форма (${numOfBlankTitles})`;
  };

  function addForm() {
    const newForm: IForm = {
      id: nanoid(),
      title: defineTitle(),
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: [],
    };
    forms.value.push(newForm);
    currentFormId.value = newForm.id;
    addQuestion();
    return newForm;
  }

  function addQuestion() {
    if (!currentForm.value) return;

    const newQuestion: IQuestion = {
      id: nanoid(),
      title: "Новый вопрос",
      questionType: "single",
      options: [],
    };
    currentForm.value.questions.push(newQuestion);
    addOption(newQuestion.id);
    return newQuestion;
  }

  function addOption(questionid: string) {
    const question = currentForm.value?.questions.find(
      (q) => q.id === questionid,
    );

    const newOption: IOption = {
      id: nanoid(),
      optionText: "",
    };
    question?.options.push(newOption);
  }

  function changeQuestionType(questionid: string, newType: QuestionType) {
    const question = currentForm.value?.questions.find(
      (q) => q.id === questionid,
    );

    if (!question) return;

    question.questionType = newType;
  }

  return {
    forms,
    currentFormId,
    currentForm,
    addForm,
    addQuestion,
    addOption,
    changeQuestionType,
  };
});
