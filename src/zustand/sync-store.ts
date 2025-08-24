import { create } from "zustand";

interface SyncState {
  loading: boolean;
  setLoading: (l: boolean) => void;
  offline: boolean;
  setOffline: (o: boolean) => void;
}

export const useSyncStore = create<SyncState>()((set) => ({
  loading: false,
  setLoading: (l) => set(() => ({ loading: l })),
  offline: false,
  setOffline: (o) => set(() => ({ offline: o })),
}));
