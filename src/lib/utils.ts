import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkPage = <T extends { page: string }>(
  page: string,
  pagesChildrenData: T[],
): T | undefined => {
  for (let i = 0; i < pagesChildrenData.length; i++) {
    if (page == pagesChildrenData[i].page) {
      return pagesChildrenData[i];
    }
  }
  return undefined;
};

export const formatStringTags = (tag: string) =>
  tag.toLowerCase().replace("-", " ");

export const capitalizeLetter1 = (word: string) =>
  word.charAt(0).toUpperCase().concat(word.slice(1));

export const getNumericSearchParam = (
  searchParams: URLSearchParams,
  param: string,
  defaultValue: number,
): number => {
  const value = Number(searchParams.get(param));
  return isNaN(value) || value <= 0 ? defaultValue : value;
};
