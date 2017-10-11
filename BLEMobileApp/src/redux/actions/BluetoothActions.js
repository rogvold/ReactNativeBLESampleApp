/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'

let initBluetooth_ = () => {
    return {
        type: types.INIT_BLUETOOTH
    }
}

let initBluetoothFail = (err) => {
    return {
        type: types.INIT_BLUETOOTH_FAIL,
        error: err
    }
}
let initBluetoothSuccess = () => {
    return {
        type: types.INIT_BLUETOOTH_SUCCESS,
    }
}
//thunk
export function initBluetooth(){
    return (dispatch, getState) => {
        dispatch(initBluetooth_());
    }
}

