import { SHOW_MODAL } from "../constants/ui";

export const showModal = (bool) => {
  return {
    type: SHOW_MODAL,
    isModalOpen: bool,
  };
};
