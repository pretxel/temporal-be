export type Filter = {
  not: string | null;
} | null;

export type FiltersList = Record<string, Filter>;
