// Actions
const UPDATE_FORM_STATE = 'final-form-redux-example/finalForm/UPDATE_FORM_STATE';

// Reducer
export default function reducer(state: any = {}, action: any = {}) {
    switch (action.type) {
        case UPDATE_FORM_STATE:
            return {
                ...state,
                [action.form]: action.payload,
            };
        default:
            return state;
    }
}

// Action Creators
export const updateFormState = (form: any, state: any) => ({
    type: UPDATE_FORM_STATE,
    form,
    payload: state,
});

// Selectors
export const getFormState = (state: any, form: any) =>
    (state && state.fform && state.fform[form]) || {};
