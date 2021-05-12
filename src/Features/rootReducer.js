import { combineReducers } from "redux";
import { reducer as counterReducer } from './counter';
import { reducer as activeViewReducer } from './activeView';

const rootReducer = combineReducers({
    counter: counterReducer,
    activeView: activeViewReducer
});

export { rootReducer };