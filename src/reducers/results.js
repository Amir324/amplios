
import { loadFromLocalStorage } from "../utils/utils";
import { SAVE_ANSWER } from "../constants/results";

const widgetsSaved = loadFromLocalStorage("results/polls") || [];

const initialState = {
  polls: widgetsSaved,
};

export default function resultsReducer(state = initialState, action) {
  const id = action?.widget?.id;
  const user = action?.widget?.user;
  const answerId = action?.widget?.answerId;

  switch (action.type) {
    case SAVE_ANSWER: {

      //creating new widget
      let newPoll = {
        id: id,
        results: [{ answerId: answerId, user: user }],
      };
      return {
        ...state,
        polls: [...state.polls, newPoll],
      };
    }

    default:
      return state;
  }
}
