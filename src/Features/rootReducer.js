import { combineReducers } from "redux";
import { reducer as counterReducer } from './counter';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export { rootReducer };