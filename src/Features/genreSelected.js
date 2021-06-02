import { createAction, createReducer } from '@reduxjs/toolkit';


const genreClicked = createAction('genre clicked');
const actions = { genreClicked }
const initialState = 28;

const reducer = createReducer(initialState, {
    [genreClicked] : (state, action) => action.payload 
})

export { actions, reducer }















