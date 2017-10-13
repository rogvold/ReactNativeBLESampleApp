/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'
import BluetoothAPI from '../../api/BluetoothAPI'

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
        return BluetoothAPI.initBluetooth().then(
            () => dispatch(initBluetoothSuccess()),
            err => dispatch(initBluetoothFail(err))
        )
    }
}

let scanBluetoothDevices_ = () => {
    return {
        type: types.SCAN_BLUETOOTH_DEVICES
    }
}

let scanBluetoothDevicesFail = (err) => {
    return {
        type: types.SCAN_BLUETOOTH_DEVICES_FAIL,
        error: err
    }
}
let scanBluetoothDevicesSuccess = (devices) => {
    return {
        type: types.SCAN_BLUETOOTH_DEVICES_SUCCESS,
        devices: devices
    }
}
//thunk
export function scanBluetoothDevices(){
    return (dispatch, getState) => {
        dispatch(scanBluetoothDevices_());
        return BluetoothAPI.scanDevices().then(
            devices => dispatch(scanBluetoothDevicesSuccess(devices)),
            err => dispatch(scanBluetoothDevicesFail(err))
        )
    }
}

let connectToDevice_ = (id) => {
    return {
        type: types.CONNECT_TO_DEVICE,
        id: id
    }
}

let connectToDeviceFail = (err, id) => {
    return {
        type: types.CONNECT_TO_DEVICE_FAIL,
        error: err,
        id: id
    }
}
let connectToDeviceSuccess = (id) => {
    return {
        type: types.CONNECT_TO_DEVICE_SUCCESS,
        id: id
    }
}
//thunk
export function connectToDevice(deviceId){
    return (dispatch, getState) => {
        dispatch(connectToDevice_(deviceId));
        return BluetoothAPI.connectToDevice(deviceId).then(
            () => dispatch(connectToDeviceSuccess(deviceId)),
            err => dispatch(connectToDeviceFail(err, id))
        )
    }
}


export function saveRRData(deviceId, rrs){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SAVE_RR_DATA,
            rrs: rrs,
            deviceId: deviceId
        })
    }
}