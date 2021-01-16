import { SAVE_ANSWER } from "../constants/results";

export const saveAnswer = (widget) => {
  return {
    type: SAVE_ANSWER,
    widget,
  };
};
