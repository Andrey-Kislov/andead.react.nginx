import { getData } from './common';

export function getAuthUser() {
    return getData(location.origin + '/social/provider/login');
}
