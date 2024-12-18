import { create } from "zustand";

interface CreateListingModalStore {
  isOpen: boolean;
  onMarket: boolean;
  setOnMarket: (value: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  mutateListing: () => void;
  setMutateListings: (fn: () => void) => void
}

const useCreateListingModal = create<CreateListingModalStore>((set) => ({
  isOpen: false,
  onMarket: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOnMarket: (onMarket) => set({ onMarket: onMarket}),
  mutateListing: () => {},
  setMutateListings: (fn) => set({mutateListing: fn})
}));

export default useCreateListingModal;
