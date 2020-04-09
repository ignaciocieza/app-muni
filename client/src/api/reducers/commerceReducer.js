import {
    SET_COMMERCE,
    IS_FETCHING_COMMERCE
} from '../actions/typeAction';
import {addUser} from './helperFunction';

const INITIAL_STATE = {
    commerces: [],
    currentCommerces:{},
    isFetching: false,
    isFetched: false,
};

const commerceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMMERCE:
            return({
                ...state,
                commerces:addUser(state.commerces, action.payload),
                isFetching: false,
                isFetched: true,
            });
            case IS_FETCHING_COMMERCE:
                return({
                    ...state,
                    isFetching: action.payload,
                    isFetched: false,
                })
        default:
            return state;
    }
}

export default commerceReducer;