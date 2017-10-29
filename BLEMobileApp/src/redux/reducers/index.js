/**
 * Created by sabir on 19.07.17.
 */
import { combineReducers } from 'redux';
import NavReducer from './NavReducer'
import BluetoothReducer from './BluetoothReducer'
import RecordReducer from './RecordReducer'
import UsersReducer from './UsersReducer'
import SessionsReducer from './SessionsReducer'

export const reducer = combineReducers({
    nav: NavReducer,
    ble: BluetoothReducer,
    users: UsersReducer,
    record: RecordReducer,
    sessions: SessionsReducer
});