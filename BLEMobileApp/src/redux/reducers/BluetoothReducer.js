/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'
import {Map, Stack, Set} from 'immutable'

const initialState = {
    loading: false,
    messagesMap: Map(),
    error: undefined,
    selectedUserId: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const BluetoothReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.INIT_BLUETOOTH:
            return {

            }

        default:
            return state;
    }

}

export default BluetoothReducer;