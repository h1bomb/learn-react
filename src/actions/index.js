import {
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from "../constants";

export const ON_DISMISS = 'ON_DISMISS';
export const SET_SEARCH_KET = 'SET_SEARCH_KET';
export const LOAD_DATA = 'LOAD_DATA';
export const ADD_DATA = 'ADD_DATA';
export const SET_ADD_DATA = 'SET_ADD_DATA';
export const LOADING = 'LOADING';
export const SORT = 'SORT';
export const ON_ERROR = 'ON_ERROR';

export const onError = error => ({
    type: ON_ERROR,
    error
});

export const sort = key => ({
    type: SORT,
    key
})

export const loading = () => ({
    type: LOADING
})

export const setAddData = item => ({
    type: SET_ADD_DATA,
    item
});

export const addData = item => ({
    type: ADD_DATA,
    item
});

export const onDismiss = id => ({
    type: ON_DISMISS,
    id
});
export const setSearchKey = key => ({
    type: SET_SEARCH_KET,
    key
});
export const loadData = json => ({
    type: LOAD_DATA,
    json
});

export const queryData = (key, page = 1) => (dispatch, getState) => {
    dispatch(loading());
    fetch(
            `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${key}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
        )
        .then(response => response.json())
        .then(result => dispatch(loadData(result)))
        .catch(error => dispatch(onError(error)))
};