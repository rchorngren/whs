import { createAction, createReducer } from '@reduxjs/toolkit';

//contains actions and reducers

const increase = createAction('increase counter');
const decrease = createAction('decrease counter');


//collect all our actions in a object so we don't need to export them individually
const actions = {
    increase,
    decrease
};

const initialState = 10;

const reducer = createReducer(initialState, {
    [increase]: (state, action) => state + 1,
    [decrease]: (state, action) => state - 1,
});

export { actions, reducer };