import axios from 'axios';

import { ACTION_AUTHORIZE } from './constants';

export function setAuthUser(authUser) {
    return {
        type: ACTION_AUTHORIZE.checkAuthUser,
        authUser
    };
}

export function setLoading(loading) {
    return {
        type: ACTION_AUTHORIZE.setLoading,
        loading
    };
}

export function setError(hasError) {
    return {
        type: ACTION_AUTHORIZE.setError,
        hasError
    };
}

export function checkAuthUser(accessToken) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (accessToken) {
            axios.get(location.origin + '/social/provider/login', {
                headers: { 'Authorization': 'Bearer ' + accessToken
            }})
            .then(response => {
                console.log(response);
                dispatch(setAuthUser(response.data));
            })
            .catch(error => {
                console.error(error);
                dispatch(setError(true));
            })
            .finally(() => dispatch(setLoading(false)));
        } else {
            dispatch(setLoading(false));
        }
    };
}