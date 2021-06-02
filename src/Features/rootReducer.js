import { combineReducers } from "redux";
import { reducer as counterReducer } from './counter';
import { reducer as genresListOfReducer} from './genresListOf';
import { reducer as loadingAnimReducer} from './loadingAnim';
import { reducer as activeViewReducer } from './activeView';
import { reducer as loggedinUserReducer } from './loggedinUser';
import { reducer as movieReducer } from './movieSelected';
import { reducer as genreReducer } from './genreSelected';
import { reducer as sideMenuReducer } from './sideMenu';
import { reducer as customerBasketReducer } from './customerBasket';

const rootReducer = combineReducers({
    counter: counterReducer,
    genresListOf: genresListOfReducer,
    activeView: activeViewReducer,
    loggedinUser: loggedinUserReducer,
    loadingAnim: loadingAnimReducer,
    movieSelected: movieReducer,
    genreSelected: genreReducer,
    sideMenu: sideMenuReducer,
    customerBasket: customerBasketReducer
});

export { rootReducer };