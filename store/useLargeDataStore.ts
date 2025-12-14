import { create } from "zustand";

interface LargeDataStore {
  data: any;
  setData: (value: any) => void;
  clearData: () => void;
}

export const useLargeDataStore = create<LargeDataStore>((set) => ({
  data: null,
  setData: (value) => set({ data: value }),
  clearData: () => set({ data: null }),
}));
