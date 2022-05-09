import name from'./name';
import isLogged from './isLogged';
import permission from './permession';
import places from'./places';
import { combineReducers } from 'redux';

const all_reducers = combineReducers({
    name:name,
    isLogged:isLogged,
    permission:permission,
    places:places
});
export default all_reducers;