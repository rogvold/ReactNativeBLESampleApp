/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'
import {Map, Stack, Set} from 'immutable'

import uuid from 'uuid'

const initialState = {
    initializing: false,
    scanning: false,
    error: undefined,

    devicesMap: Map(),

    connectingSet: Set(),
    connectedSet: Set(),

    fakeEnabled: false,

    dataMap: Map()

}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeData = (oldMap, deviceId, rrs) => {
    let dataArray = oldMap.get(deviceId);
    let lastTime = (dataArray == undefined || dataArray.length == 0) ? 0 : dataArray[dataArray.length - 1].t;
    // console.log('consumeData occured: lastTime = ', lastTime);
    let addData = rrs.map(r => {
        return {
            rr: r,
            t: +new Date(),
            id: uuid()
        }
    })
    if (dataArray == undefined){dataArray = []}
    return oldMap.set(deviceId, dataArray.concat(addData));
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
                scanning: true
            }

        case types.SCAN_BLUETOOTH_DEVICES_SUCCESS:
            return {
                ...state,
                devicesMap: state.devicesMap.merge(action.devices.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                scanning: false
            }

        case types.SCAN_BLUETOOTH_DEVICES_FAIL:
            return {
                ...state,
                error: action.error,
                scanning: false
            }

        case types.CONNECT_TO_DEVICE:
            return {
                ...state,
                connectingSet: state.connectingSet.add(action.id),
                connectedSet: state.connectedSet.delete(action.id)
            }

        case types.CONNECT_TO_DEVICE_SUCCESS:
            return {
                ...state,
                connectingSet: state.connectingSet.delete(action.id),
                // connectedSet: state.connectedSet.add(action.id)
                connectedSet: Set().add(action.id),
                dataMap: state.dataMap.set(action.id, [])
            }

        case types.DISCONNECT_DEVICE_SUCCESS:
            return {
                ...state,
                connectedSet: Set()
            }

        case types.CONNECT_TO_DEVICE_FAIL:
            return {
                ...state,
                connectingSet: state.connectingSet.delete(action.id),
                connectedSet: state.connectedSet.delete(action.id),
                error: action.error
            }



        case types.SAVE_RR_DATA:
            return {
                ...state,
                dataMap: consumeData(state.dataMap, action.deviceId, action.rrs)
            }

        case types.TURN_ON_FAKE:
            return {
                ...state,
                fakeEnabled: true
            }

        case types.TURN_OFF_FAKE:
            return {
                ...state,
                fakeEnabled: false
            }


        default:
            return state;
    }

}

export default BluetoothReducer;