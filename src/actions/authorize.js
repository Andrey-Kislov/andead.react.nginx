import { ACTION_AUTHORIZE } from './constants';
import { getAuthUser } from '../services/authorize';
import { checkNotificationsPermission } from '../services/push-notifications';

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

export function setAccessToken(accessToken) {
    return {
        type: ACTION_AUTHORIZE.setAccessToken,
        accessToken
    };
}

export function checkAuthUser(accessToken) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (accessToken) {
            dispatch(setAccessToken(accessToken));

            getAuthUser()
                .then(response => {
                    dispatch(setAuthUser(response));
                    checkNotificationsPermission();
                })
                .catch(() => dispatch(setError(true)))
                .finally(() => dispatch(setLoading(false)));
        } else {
            dispatch(setLoading(false));
        }
    };
}