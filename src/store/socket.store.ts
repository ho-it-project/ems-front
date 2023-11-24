import { IO } from "@/lib/utils/IO";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
  requestSocket: Socket | null;
  initSocket: (token: string) => void;
  resetSocket: () => void;
}

type StoreSetter = (partialState: Partial<SocketStore>) => void;
type StoreGetter = () => SocketStore;

const initSocket = (set: StoreSetter, token: string) => {
  const requestSocket = IO("/request", token);
  set({ requestSocket });
};

const resetSocket = (set: StoreSetter, get: StoreGetter) => {
  const socket = get().requestSocket;
  if (socket) {
    socket.disconnect();
    set({ requestSocket: null });
  }
};
export const useSocketStore = create<SocketStore>((set, get) => ({
  requestSocket: null,
  initSocket: (token) => initSocket(set, token),
  resetSocket: () => resetSocket(set, get),
}));
