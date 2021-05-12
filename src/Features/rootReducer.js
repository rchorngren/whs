import { combineReducers } from "redux";
import { reducer as counterReducer } from './counter';
import { reducer as genresListOfReducer} from './genresListOf';

const rootReducer = combineReducers({
    counter: counterReducer,
    genresListOf: genresListOfReducer
});

export { rootReducer };