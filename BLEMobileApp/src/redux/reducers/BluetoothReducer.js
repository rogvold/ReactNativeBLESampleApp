/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'
import {Map, Stack, Set} from 'immutable'

const initialState = {
    initializing: false,
    error: undefined,

    devicesMap: Map(),

    connectingSet: Set(),
    connectedSet: Set()

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
                ...state,
                initializing: true
            }

        case types.INIT_BLUETOOTH_FAIL:
            return {
                ...state,
                initializing: false,
                error: action.error
            }

        case types.INIT_BLUETOOTH_SUCCESS:
            return {
                ...state,
                initializing: false
            }

        case types.SCAN_BLUETOOTH_DEVICES:
            return {
                ...state,
                initializing: true
            }

        case types.SCAN_BLUETOOTH_DEVICES_SUCCESS:
            return {
                ...state,
                devicesMap: state.devicesMap.merge(action.devices.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                initializing: false
            }

        case types.SCAN_BLUETOOTH_DEVICES_FAIL:
            return {
                ...state,
                error: action.error,
                initializing: false
            }


        default:
            return state;
    }

}

export default BluetoothReducer;