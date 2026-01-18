import { SUPPORTED_LANGUAGES } from "@constants/constants";

export const GOOGLE_FILTER_CONFIG = [
  {
    id: "maxResults",
    label: "Max Batch Size",
    type: "range",
    props: { min: 1, max: 40 },
    defaultValue: 40,
  },
  {
    id: "langRestrict",
    label: "Language Filter",
    type: "select",
    options: SUPPORTED_LANGUAGES,
    needsTranslation: true,
    defaultValue: "en",
  },
  {
    id: "printType",
    label: "Print Type",
    type: "radio",
    options: [
      { label: "All", value: "all" },
      { label: "Books", value: "books" },
      { label: "Magazines", value: "magazines" },
    ],
    defaultValue: "all",
  },
  {
    id: "orderBy",
    label: "Sort By",
    type: "radio",
    options: [
      { label: "Relevance", value: "relevance" },
      { label: "Newest", value: "newest" },
    ],
    defaultValue: "relevance",
  },
  {
    id: "filter",
    label: "Book Format",
    type: "select",
    options: [
      { label: "Any", value: "" },
      { label: "Free E-books", value: "free-ebooks" },
      { label: "Paid E-books", value: "paid-ebooks" },
      { label: "E-books only", value: "ebooks" },
      { label: "Partial Text", value: "partial" },
      { label: "Full Text", value: "full" },
    ],
    defaultValue: "",
  },
];
