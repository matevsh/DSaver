import { create } from "zustand";

type GlobalLayoutState = {
  isLoading: boolean;
  isError: boolean;
};

type GlobalLayoutStoreActions = {
  set: (state: Partial<GlobalLayoutStore>) => void;
};

type GlobalLayoutStore = GlobalLayoutState & GlobalLayoutStoreActions;

export const useGlobalLayoutStore = create<GlobalLayoutStore>((set, get) => ({
  isError: false,
  isLoading: true,
  set: (state) => set({ ...get(), ...state }),
}));
