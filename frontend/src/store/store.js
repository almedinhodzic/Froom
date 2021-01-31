import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import setToken from "../utils/setToken";

const initialState = {};

const composeEnharcers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

// Creating redux state
const store = createStore(
  rootReducer,
  initialState,
  // we need middleware to use functions in actions
  composeEnharcers(applyMiddleware(thunk))
);

let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setToken(token);
  }
});

export default store;
