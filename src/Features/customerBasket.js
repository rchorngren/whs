import { createAction, createReducer } from "@reduxjs/toolkit";

const addItem = createAction('add item');
const removeItem = createAction('remove item');
const content = createAction('content of basket')

const actions = {
    addItem,
    removeItem,
    content
}

const initialState = {
    content: []
}

const reducer = createReducer(initialState, {
    [addItem]: (state, action) => ({
        ...state,
        content: [action.payload, ...state.content]
    }),
    [removeItem]: (state, action) => ({
        ...state,
        content: [
            ...state.content.slice(0, action.payload),
            ...state.content.slice(action.payload + 1)
        ]
    }),
    [content]: (state, action) => ({
        ...state,
        content: []
    }),
})

export { actions, reducer }