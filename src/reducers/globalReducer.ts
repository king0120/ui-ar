export default function reducer(state: any = {}, action: any = {}) {
    switch (action.type) {
        case 'REQUEST_STARTED':
            return {
                loading: true
            }
        case 'REQUEST_COMPLETE':
            return {
                loading: false
            }
        default:
            return state;
    }
}
