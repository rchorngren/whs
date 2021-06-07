import { createAction, createReducer } from "@reduxjs/toolkit"

const empty = createAction('empty');
const checkout = createAction('checkout view');
const profile = createAction('profile view');
const login = createAction('login view');
const search = createAction('search view');
const selectedMovie = createAction('selected movie view');
const chosenGenre = createAction('chosen genre view');
const checkoutContinue = createAction('checkout continue view')
const purchaseThanks = createAction('purchase thanks')

const actions = {
    empty,
    checkout,
    profile,
    login,
    search,
    selectedMovie,
    chosenGenre,
    checkoutContinue,
    purchaseThanks
}

const ACTIVEVIEW = {
    DEFAULT: 'default',
    CHECKOUT: 'checkout',
    PROFILE: 'profile',
    LOGIN: 'login',
    SEARCH: 'search',
    SELECTEDMOVIE: 'selected movie',
    CHOSENGENRE: 'chosen genre',
    CHECKOUTCONTINUE: 'checkout continue',
    PURCHASETHANKS: 'purchase thanks'
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
    [search]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.SEARCH
    }),
    [selectedMovie]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.SELECTEDMOVIE
    }),
    [chosenGenre]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.CHOSENGENRE
    }),
    [checkoutContinue]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.CHECKOUTCONTINUE
    }),
    [purchaseThanks]: (state, action)  => ({
        ...state,
        activeView: ACTIVEVIEW.PURCHASETHANKS
    })
});

export { actions, reducer, ACTIVEVIEW };