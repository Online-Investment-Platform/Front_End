import { create } from "zustand";

interface RefreshState {
  refreshCount: number;
  incrementCount: () => void;
  resetCount: () => void;
}

const useRefreshStore = create<RefreshState>((set) => ({
  refreshCount: 0,
  incrementCount: () =>
    set((state) => ({ refreshCount: state.refreshCount + 1 })),
  resetCount: () => set({ refreshCount: 0 }),
}));

export default useRefreshStore;
