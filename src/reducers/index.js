import {
    ON_DISMISS,
    SET_SEARCH_KET,
    LOAD_DATA,
    ADD_DATA,
    SET_ADD_DATA,
    LOADING,
    SORT,
    ON_ERROR
} from '../actions'

import {
    initAddItem,
    DEFAULT_QUERY
} from '../constants'

const dismiss = (state, id) => {
    const {
        list
    } = state;
    const isNotId = item => item.objectID !== id;
    const updatedHits = list.filter(isNotId);

    return {
        ...state,
        list: updatedHits
    };
}

const rootReducer = (state = {
    list: [],
    searchKey: DEFAULT_QUERY,
    page: 0,
    addedItem: initAddItem,
    isLoading: false,
    error: null,
    sortKey: "NONE",
    isSortReverse: false,
}, action) => {
    switch (action.type) {
        case ON_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case SORT:
            const isSortReverse =
                state.sortKey === action.key && !state.isSortReverse;
            return {
                ...state,
                isSortReverse,
                sortKey: action.key
            }
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ON_DISMISS:
            return dismiss(state, action.id);
        case SET_SEARCH_KET:
            return {
                ...state,
                searchKey: action.key
            };
        case LOAD_DATA:
            let list = action.json.hits;
            if (action.json.page !== 1) {
                list = [...state.list, ...list]
            }
            return {
                ...state,
                list,
                page: action.json.page,
                isLoading: false
            };
        case ADD_DATA:
            return {
                ...state,
                addedItem: { ...initAddItem
                },
                list: [...state.list, action.item]
            }
        case SET_ADD_DATA:
            return {
                ...state,
                addedItem: action.item
            }
        default:
            return state;
    }
}


export default rootReducer;