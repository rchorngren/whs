import { createAction, createReducer } from "@reduxjs/toolkit"

const empty = createAction('empty');
const checkout = createAction('checkout view');
const profile = createAction('profile view');
const login = createAction('login view');
const search = createAction('search view');
const selectedMovie = createAction('selected movie view');
const selectedPerson = createAction('selected person view')
const chosenGenre = createAction('chosen genre view');
const checkoutContinue = createAction('checkout continue view')
const purchaseThanks = createAction('purchase thanks')
const review = createAction('review view')

const actions = {
    empty,
    checkout,
    profile,
    login,
    search,
    selectedMovie,
    selectedPerson,
    chosenGenre,
    checkoutContinue,
    purchaseThanks,
    review
}

const ACTIVEVIEW = {
    DEFAULT: 'default',
    CHECKOUT: 'checkout',
    PROFILE: 'profile',
    LOGIN: 'login',
    SEARCH: 'search',
    SELECTEDMOVIE: 'selected movie',
    SELECTEDPERSON: 'selected person',
    CHOSENGENRE: 'chosen genre',
    CHECKOUTCONTINUE: 'checkout continue',
    PURCHASETHANKS: 'purchase thanks',
    REVIEW: 'review view'
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
    [selectedPerson]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.SELECTEDPERSON
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
    }),
    [review]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.REVIEW
    })
});

export { actions, reducer, ACTIVEVIEW };