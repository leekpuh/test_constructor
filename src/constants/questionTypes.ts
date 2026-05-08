import type { QuestionType } from "@/stores/forms";

export const questionTypes: Record<
  QuestionType,
  {
    label: string;
    icon: string;
  }
> = {
  single: {
    label: "Один вариант ответа",
    icon: "md-radiobuttonchecked",
  },

  multiple: {
    label: "Множественный выбор",
    icon: "bi-check-square",
  },

  dropdown: {
    label: "Раскрывающийся список",
    icon: "co-chevron-double-down",
  },

  text: {
    label: "Ответ в свободной форме",
    icon: "bi-filter-square",
  },

  rating: {
    label: "Ответ по шкале звезд",
    icon: "bi-star",
  },
};