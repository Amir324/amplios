import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import {
  CREATE_WIDGET,
  DELETE_WIDGET,
  EDIT_WIDGET,
  GET_WIDGETS,
  SELECT_WIDGET,
  UPDATE_IN_EDIT_WIDGET,
  ADD_KEY_VALUE_ROW,
  DELETE_KEY_VALUE_ROW,
  SAVE_WIDGET,
  WIDGET,
} from "../constants/widgets";
import { loadFromLocalStorage } from "../utils/utils";

const WIDGET_INIT_STATE = {
  [WIDGET.id]: "",
  [WIDGET.name]: "",
  [WIDGET.user]: "",
  [WIDGET.question]: "",
  [WIDGET.choices]: [],
};

const widgetsSaved = loadFromLocalStorage("polls") || [];
const allChoicesSaved = loadFromLocalStorage("polls/allChoices") || {};
const allQuestionsSaved = loadFromLocalStorage("polls/allQuestions") || {};

const initialState = {
  widgets: widgetsSaved,
  selectedWidget: {},
  inEditWidget: WIDGET_INIT_STATE,
  allChoices: allChoicesSaved,
  allQuestions: allQuestionsSaved,
  error: null,
};

export default function widgetsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WIDGETS: {
      return {
        ...state,
        questionBeingAnswered: state.widgets.find(
          (_widget) => _widget.id === action.id
        ),
      };
    }
    case SELECT_WIDGET: {
      return {
        ...state,
        selectedWidget: state.widgets.find(
          (_widget) => _widget.id === action.widgetId
        ),
      };
    }

    case EDIT_WIDGET: {
      let widget = state.widgets.find(
        (_widget) => _widget.id === action.widgetId
      );
      return {
        ...state,
        inEditWidget: widget,
      };
    }

    case CREATE_WIDGET: {
      //creating new widget

      return {
        ...state,
        inEditWidget: { ...WIDGET_INIT_STATE, id: uuidv4() },
      };
    }

    case SAVE_WIDGET: {
      const { id, question, choices } = action?.widget;
      //creating new widget

      const cloneNewWidget = action?.widget;
      cloneNewWidget?.choices?.forEach((_choice) => {
        _choice.id = uuidv4();
        return _choice;
      });

      //extracting questions and choices
      const updatedAllQuestions = _.cloneDeep(state.allQuestions);
      const updatedAllChoices = _.cloneDeep(state.allChoices);

      updatedAllQuestions[id] = question;

      choices.forEach((c) => {
        updatedAllChoices[c.id] = c.answer;
      });

      return {
        ...state,
        widgets: [...state?.widgets, cloneNewWidget],
        allChoices: updatedAllChoices,
        allQuestions: updatedAllQuestions,
        inEditWidget: WIDGET_INIT_STATE,
      };
    }

    case DELETE_WIDGET: {
      const { widgetId } = action;
      let updatedWidgets = state?.widgets?.filter(({ id }) => id !== widgetId);

      let updatedSelectedWidget;
      if (widgetId === state?.selectedWidget?.id) {
        if (state?.widgets?.length === 1) {
          updatedSelectedWidget = {};
        }

        return {
          ...state,
          widgets: updatedWidgets,
          selectedWidget: updatedSelectedWidget,
        };
      }

      return {
        ...state,
        widgets: updatedWidgets,
      };
    }

    case UPDATE_IN_EDIT_WIDGET: {
      return {
        ...state,
        inEditWidget: action?.widget,
      };
    }

    case ADD_KEY_VALUE_ROW: {
      let newKeyValuePairs = [
        ...state.inEditWidget.choices,
        { [WIDGET.answer]: "" },
      ];

      let newInEditWidget = {
        ...state.inEditWidget,
        choices: newKeyValuePairs,
      };

      return {
        ...state,
        inEditWidget: newInEditWidget,
      };
    }

    case DELETE_KEY_VALUE_ROW: {
      let index = action?.index;
      let newKeyValuePairs = state?.inEditWidget?.choices?.filter(
        (_, _index) => !(_index === index)
      );
      let newInEditWidget = {
        ...state?.inEditWidget,
        choices: newKeyValuePairs,
      };

      return {
        ...state,
        inEditWidget: newInEditWidget,
      };
    }

    default:
      return state;
  }
}
