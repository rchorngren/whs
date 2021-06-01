import { createAction, createReducer } from "@reduxjs/toolkit";

const menuOpen = createAction('menu open');
const menuClosed = createAction('menu closed');

const actions = {
    menuOpen,
    menuClosed
}

const SIDEMENU = {
    OPEN: true,
    CLOSED: false
}

const initialState = {
    sideMenu: SIDEMENU.CLOSED
}

const reducer = createReducer(initialState, {
    [menuOpen]: (state, action) => ({
        ...state,
        sideMenu: SIDEMENU.OPEN
    }),
    [menuClosed]: (state, action) => ({
        ...state,
        sideMenu: SIDEMENU.CLOSED
    })
});

export { actions, reducer, SIDEMENU }