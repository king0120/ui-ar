import * as Actions from '../actions';

const initialState = {
    entities   : [],
    eventDialog: {
        type : 'new',
        props: {
            open: false
        },
        data : {
            date: new Date()
        }
    }
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EVENTS:
        {
            const entities = action.payload.map((event) => (
                {
                    ...event,
                    // TODO REMOVE EVENTUALLY
                }
            ));

            return {
                ...state,
                entities
            };
        }
        case Actions.OPEN_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: true,
                        ...action.data
                    },
                    data : {
                        ...action.data
                    }
                }
            };
        }
        case Actions.CLOSE_NEW_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: true,
                        ...action.data,
                    },
                    data : {
                        ...action.data
                    }
                }
            };
        }
        case Actions.CLOSE_EDIT_EVENT_DIALOG:
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default eventsReducer;