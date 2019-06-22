import {Reducer} from 'redux';

const initialState = {
    data: {},
    count: 0
};

const searchReducer: Reducer<any> = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SEARCH_USER_SUCCESS':
            return {
                data: action.data,
                count: action.count
            };
        default:
            return state;
    }
};

export default searchReducer;
