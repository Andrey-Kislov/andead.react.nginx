import { combineReducers } from 'redux';

import { authorize } from './authorize';
import { mqtt } from './mqtt';

export default combineReducers({
    authorize,
    mqtt
});