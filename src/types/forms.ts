export type QuestionType =
  | "single"
  | "multiple"
  | "dropdown"
  | "text"
  | "rating";

export interface IForm {
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
  title: string;
  imageFile: File | null;
  imageUrl: string | null;
}

export interface IVideoBlock {
  id: string;
  blockType: "video";
  title: string;
  videoUrl: string;
}

export interface IPageBreak {
  id: string;
  blockType: "pageBreak";
}

export type FormBlock =
  | IQuestionBlock
  | IDescriptionBlock
  | IImageBlock
  | IVideoBlock
  | IPageBreak;

export interface IOption {
  id: string;
  optionText: string;
}
