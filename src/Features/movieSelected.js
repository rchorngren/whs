import { createAction, createReducer } from '@reduxjs/toolkit'

const getMovieID = createAction('get movie id');


const actions = {
    getMovieID
};

const initialState = {
    id : 0
}


const reducer = createReducer(initialState, {
    [getMovieID]: (state, actions) => (
        {...state, id: actions.payload }
    )
});

export { actions, reducer}