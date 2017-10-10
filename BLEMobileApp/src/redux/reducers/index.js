/**
 * Created by sabir on 19.07.17.
 */
import { combineReducers } from 'redux';
import NavReducer from './NavReducer'

export const reducer = combineReducers({
    nav: NavReducer
});