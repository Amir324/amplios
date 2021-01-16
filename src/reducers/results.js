
import _ from "lodash"
import { loadFromLocalStorage } from "../utils/utils";
import { SAVE_ANSWER } from "../constants/results";

const pollsSaved = loadFromLocalStorage("results/polls") || [];

const initialState = {
  polls: pollsSaved,
};

export default function resultsReducer(state = initialState, action) {

  const id = action?.widget?.id
  const user = action?.widget?.user
  const answerId = action?.widget?.answerId

  switch (action.type) {

    case SAVE_ANSWER: {
      let existingWidget = state.polls.find(
        (_widget) => _widget?.id === id
      );

      //updating existing widget
      if (existingWidget) {
        let updatedWidgets = state.polls.map((_question) => {
          if (_question?.id === id) {
            _question.results = [
              ..._question.results,
              { user: user, answerId: answerId },
            ];
          }
          return _question;
        });

        return {
          ...state,
          polls: updatedWidgets,
        };
      }

      //creating new widget

      const clonePolls = _.cloneDeep(state.polls);

      let newPoll = {
        id: id,
        results: [{ answerId: answerId, user: user }],
      };

      clonePolls.push(newPoll);

      return {
        ...state,
        polls: clonePolls,
      };
    }

    default:
      return state;
  }
}
