import {
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from "../constants";

export const ON_DISMISS = 'ON_DISMISS'; // 移除
export const SET_SEARCH_KEY = 'SET_SEARCH_KEY'; // 设置搜索词
export const LOAD_DATA = 'LOAD_DATA';// 加载数据
export const ADD_DATA = 'ADD_DATA';// 添加数据
export const SET_ADD_DATA = 'SET_ADD_DATA';// 设置添加的数据
export const LOADING = 'LOADING';// 设置加载中
export const SORT = 'SORT';// 排序
export const ON_ERROR = 'ON_ERROR';// 设置错误

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
    type: SET_SEARCH_KEY,
    key
});
export const loadData = json => ({
    type: LOAD_DATA,
    json
});

export const queryData = (key, page = 1) => (dispatch, getState) => {
    dispatch(loading());
    dispatch(setSearchKey(key));
    fetch(
            `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${key}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
        )
        .then(response => response.json())
        .then(result => dispatch(loadData(result)))
        .catch(error => dispatch(onError(error)))
};