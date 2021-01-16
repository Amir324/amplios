import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { saveToLocalStorage } from "../utils/utils";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);

store.subscribe(() => {
    saveToLocalStorage("polls", store.getState().widgets.widgets)
    saveToLocalStorage("polls/allChoices", store.getState().widgets.allChoices)
    saveToLocalStorage("polls/allQuestions", store.getState().widgets.allQuestions)
    saveToLocalStorage("results/polls", store.getState().results.polls)
    saveToLocalStorage("username", store.getState().user.username)
})
export default store;
