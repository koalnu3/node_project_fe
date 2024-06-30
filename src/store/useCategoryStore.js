import React from "react";
import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categoryStore: [
    {
      _id: "",
      id: "",
      name: "",
    },
  ],
  setCategoryStore: (categoryStore) => set({ categoryStore }),
}));

export default useCategoryStore;
