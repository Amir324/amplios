import {
  CREATE_WIDGET,
  DELETE_WIDGET,
  EDIT_WIDGET,
  GET_WIDGETS,
  SELECT_WIDGET,
  UPDATE_IN_EDIT_WIDGET,
  DELETE_KEY_VALUE_ROW,
  ADD_KEY_VALUE_ROW,
  SAVE_WIDGET,
} from "../constants/widgets";

export const getWidgets = (id) => {
  return {
    type: GET_WIDGETS,
    id
  };
};

export const selectWidget = (id) => {
  return {
    type: SELECT_WIDGET,
    widgetId: id,
  };
};

export const editWidget = (id) => {
  return {
    type: EDIT_WIDGET,
    widgetId: id,
  };
};

export const saveWidget = (widget) => {
  return {
    type: SAVE_WIDGET,
    widget,
  };
};

export const deleteWidget = (id) => {
  return {
    type: DELETE_WIDGET,
    widgetId: id,
  };
};

export const createWidget = (widget) => {
  return {
    type: CREATE_WIDGET,
    widget,
  };
};

export const updateInEditWidget = (widget) => {
  return {
    type: UPDATE_IN_EDIT_WIDGET,
    widget,
  };
};

export const addKeyValueRowToInEditWidget = () => {
  return {
    type: ADD_KEY_VALUE_ROW,
  };
};

export const deleteKeyValueRowToInEditWidget = (index) => {
  return {
    type: DELETE_KEY_VALUE_ROW,
    index,
  };
};
