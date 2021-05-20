import { createAction, createReducer } from "@reduxjs/toolkit"

const empty = createAction('empty');
const checkout = createAction('checkout view');
const profile = createAction('profile view');
const login = createAction('login view');
const menu = createAction('menu view');
const search = createAction('search view')

const actions = {
    empty,
    checkout,
    profile,
    login,
    menu,
    search
}

const ACTIVEVIEW = {
    DEFAULT: 'default',
    CHECKOUT: 'checkout',
    PROFILE: 'profile',
    LOGIN: 'login',
    MENU: 'menu',
    SEARCH: 'search'
}

const initialState = {
    activeView: ACTIVEVIEW.DEFAULT
}

const reducer = createReducer(initialState, {
    [empty]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.DEFAULT
    }),
    [checkout]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.CHECKOUT
    }),
    [profile]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.PROFILE
    }),
    [login]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.LOGIN
    }),
    [menu]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.MENU
    }),
    [search]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.SEARCH
    })
});

export { actions, reducer, ACTIVEVIEW };