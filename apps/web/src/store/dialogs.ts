import { create } from 'zustand'

type DialogsStore = {
  // Empty store for now, but keeping the structure for future dialogs
}

export const useDialogsStore = create<DialogsStore>(() => ({}))
