import { combineReducers } from "redux";
import { reducer as counterReducer } from './counter';
import { reducer as genresListOfReducer} from './genresListOf';
import { reducer as activeViewReducer } from './activeView';

const rootReducer = combineReducers({
    counter: counterReducer,
    genresListOf: genresListOfReducer,
    activeView: activeViewReducer
});

export { rootReducer };