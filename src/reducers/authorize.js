import { ACTION_AUTHORIZE } from '../actions/constants';

const initialState = {
    authUser: null,
    loading: true,
    hasError: false
};

export function authorize(state = initialState, action) {
    switch (action.type) {
        case ACTION_AUTHORIZE.checkAuthUser:
            return Object.assign({}, state, {
                authUser: action.authUser
            });
        
        case ACTION_AUTHORIZE.setLoading:
            return Object.assign({}, state, {
                loading: action.loading
            });

        case ACTION_AUTHORIZE.setError:
            return Object.assign({}, state, {
                hasError: action.hasError
            });

        default:
            return state;
    }
}