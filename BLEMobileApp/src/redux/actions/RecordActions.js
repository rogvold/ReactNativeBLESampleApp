/**
 * Created by sabir on 26.10.17.
 */
import * as types from '../ActionTypes'
import {Map, Stack, Set} from 'immutable'

import KaaAPI from '../../api/KaaAPI'
import KaaHelper from '../../helpers/KaaHelper'

let uploadPoints_ = () => {
    return {
        type: types.UPLOAD_POINTS_TO_SERVER
    }
}

let uploadPointsFail = (err) => {
    return {
        type: types.UPLOAD_POINTS_TO_SERVER_FAIL,
        error: err
    }
}
let uploadPointsSuccess = (points) => {
    console.log('uploadPointsSuccess: points = ', points);
    return {
        type: types.UPLOAD_POINTS_TO_SERVER_SUCCESS,
        points: points
    }
}
//thunk
export function uploadPoints(){
    return (dispatch, getState) => {
        dispatch(uploadPoints_());
        let {sessionTimestamp} = getState().record;
        let points = KaaHelper.getNotUploadedPoints(getState());
        let userId = getState().users.currentUserId;
        if (userId == undefined){
            userId = 'sabir'
        }
        return KaaAPI.savePoints(userId, sessionTimestamp, points).then(
            () => dispatch(uploadPointsSuccess(points)),
            err => dispatch(uploadPointsFail(err))
        );
    }
}

//sessions

let startSession_ = () => {
    return {
        type: types.START_SESSION
    }
}

let startSessionFail = (err) => {
    return {
        type: types.START_SESSION_FAIL,
        error: err
    }
}
let startSessionSuccess = (timestamp) => {
    console.log('startSessionSuccess occured');
    return {
        type: types.START_SESSION_SUCCESS,
        timestamp: timestamp
    }
}
//thunk
export function startSession(){
    return (dispatch, getState) => {
        dispatch(startSession_());
        console.log('startSession occured');
        let now = +new Date();
        let deviceId = getState().ble.connectedSet.toArray()[0];
        let userId = getState().users.currentUserId;
        if (userId == undefined){
            userId = 'sabir'
        }
        return KaaAPI.startSession(userId, deviceId).then(
            () => dispatch(startSessionSuccess(now)),
            err => dispatch(startSessionFail(err))
        );
    }
}

let stopSession_ = () => {
    return {
        type: types.STOP_SESSION
    }
}

let stopSessionFail = (err) => {
    return {
        type: types.STOP_SESSION_FAIL,
        error: err
    }
}
let stopSessionSuccess = () => {
    return {
        type: types.STOP_SESSION_SUCCESS
    }
}
//thunk
export function stopSession(){
    return (dispatch, getState) => {
        dispatch(stopSession_());
        let now = +new Date();
        let deviceId = getState().ble.connectedSet.toArray()[0];
        let userId = getState().users.currentUserId;
        if (userId == undefined){
            userId = 'sabir'
        }
        return KaaAPI.stopSession(userId, deviceId).then(
            () => dispatch(stopSessionSuccess()),
            err => dispatch(stopSessionFail(err))
        );
    }
}


