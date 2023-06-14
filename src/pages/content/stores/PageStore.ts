import { create } from "zustand";

type PageState = {
  page: number;
  setPage: (newPage: number) => void;
};

export const usePageStore = create<PageState>((set) => ({
  page: 0,
  setPage: (newPage) => set({ page: newPage }),
}));
