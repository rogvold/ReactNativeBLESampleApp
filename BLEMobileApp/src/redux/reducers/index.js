/**
 * Created by sabir on 19.07.17.
 */
import { combineReducers } from 'redux';
import NavReducer from './NavReducer'
import BluetoothReducer from './BluetoothReducer'

export const reducer = combineReducers({
    nav: NavReducer,
    ble: BluetoothReducer
});