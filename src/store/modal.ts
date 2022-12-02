import { createMutable } from "solid-js/store";

export const modal = createMutable({
  isOpen: false,
  openModal() {
    this.isOpen = true;
  },
  closeModal() {
    this.isOpen = false;
  },
});
