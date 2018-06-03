import {
    ON_DISMISS,
    SET_SEARCH_KEY,
    LOAD_DATA,
    ADD_DATA,
    LOADING,
    ON_ERROR
} from '../actions'

import {
    DEFAULT_QUERY,
    DEFAULT_HPP
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
    isLoading: false,
    error: null,
    pagination: {
        pageSize: DEFAULT_HPP,
        current: 1,
        total: 0
    }
}, action) => {
    switch (action.type) {
        case ON_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ON_DISMISS:
            return dismiss(state, action.id);
        case SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.key
            };
        case LOAD_DATA:
            let list = action.json.hits;
            return {
                ...state,
                list,
                pagination: {
                    ...state.pagination,
                    current: action.json.page,
                    total: action.json.nbHits>1000? 900:action.json.nbHits
                },
                isLoading: false
            };
        case ADD_DATA:
            return {
                ...state,
                list: [ action.item,...state.list ]
            }
        default:
            return state;
    }
}


export default rootReducer;