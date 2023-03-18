export interface LanguageOption {
  readonly value: string;
  readonly label: string;
}

export const languageOptions: readonly LanguageOption[] = [
  { value: "javascript", label: "javascript" },
  { value: "css", label: "css" },
  { value: "html", label: "html" },
  { value: "typescript", label: "typescript" },
  { value: "python", label: "python" },
  { value: "jsx", label: "jsx" },
  { value: "java", label: "java" },
];
