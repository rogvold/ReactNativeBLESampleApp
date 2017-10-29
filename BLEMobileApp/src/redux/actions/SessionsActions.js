
import * as types from '../ActionTypes.js'
import ParseAPI from '../../api/ParseAPI.js';
import KaaAPI from '../../api/KaaAPI.js';
import KaaHelper from '../../helpers/KaaHelper.js';


//SESSIONS
let loadUserSessions_ = (userId) => {
    return {
        type: types.LOAD_USER_SESSIONS,
        userId: userId
    }
}
let loadUserSessionsSuccess = (userId, data) => {
    return {
        type: types.LOAD_USER_SESSIONS_SUCCESS,
        sessions: data.sessions
    }
}
let loadUserSessionsFail = (userId, error) => {
    return {
        type: types.LOAD_USER_SESSIONS_FAIL,
        userId: userId,
        error: error
    }
}
//thunk
export function loadUserSessions(userId){
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        return ParseAPI.runCloudFunctionAsPromise('loadUserSessions', {userId: userId}).then(
            data => dispatch(loadUserSessionsSuccess(userId, data)),
            error => dispatch(loadUserSessionsFail(userId, error))
        )
    }
}

export function loadUserKaaSessions(userId){
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        return KaaAPI.getAllSessionsByUserId(userId).then(
            sessions => dispatch(loadUserSessionsSuccess(userId, {sessions: sessions})),
            error => dispatch(loadUserSessionsFail(userId, error))
        ).then(
            pld => {
                let {sessions} = pld;
                if (sessions != undefined && sessions.length > 0){
                    let orderedSessions = sessions.sort((a, b) => (+b.startTimestamp - +a.startTimestamp))
                    let lastSession = orderedSessions[0];
                    let {startTimestamp, endTimestamp} = lastSession;
                    return dispatch(loadUserPointsInRange(userId, startTimestamp, endTimestamp))
                }
            }
        )
    }
}

export function loadFriendsSessions(userId){
    console.log('loadFriendsSessions occured: userId = ', userId);
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        return ParseAPI.runCloudFunctionAsPromise("loadUserFriendsSessions", {userId: userId}).then(
            data => dispatch(loadUserSessionsSuccess(userId, data)),
            err => dispatch(loadUserSessionsFail(userId, err))
        )
    }
}

//DATA
let loadSessionData_ = (sessionId) => {
    return {
        type: types.LOAD_SESSION_DATA,
        sessionId: sessionId
    }
}
let loadSessionDataSuccess = (sessionId, userId, data) => {
    return {
        type: types.LOAD_SESSION_DATA_SUCCESS,
        data: data,
        sessionId: sessionId,
        userId: userId
    }
}
let loadSessionDataFail = (sessionId, error) => {
    return {
        type: types.LOAD_SESSION_DATA_FAIL,
        sessionId: sessionId,
        error: error
    }
}
//thunk
export function loadSessionData(sessionId){
    return (dispatch, getState) => {
        var data = getState().sessions.sessionsDataMap[sessionId];
        let session = getState().sessions.sessionsMap.get(sessionId);
        // if (data != undefined){
        //     return Promise.resolve();
        // }
        dispatch(loadSessionData_());
        return ParseAPI.runCloudFunctionAsPromise('loadSessionData', {id: sessionId}).then(
                data => dispatch(loadSessionDataSuccess(sessionId, session.userId, data)),
                error => dispatch(loadSessionDataFail(sessionId, error))
        )
    }
}

export function loadKaaSessionData(sessionId){
    return (dispatch, getState) => {
        let {sessionsMap} = getState().sessions;
        let session = sessionsMap.get(sessionId);
        let {startTimestamp, endTimestamp, userId} = session;
        console.log('loadKaaSessionData: sessionId, session, startTimestamp, endTimestamp = ', sessionId, session, startTimestamp, endTimestamp);
        return KaaAPI.getUserPoints(userId, startTimestamp, endTimestamp).then(
            data => dispatch(loadSessionDataSuccess(sessionId, session.userId, data)),
            error => dispatch(loadSessionDataFail(sessionId, error))
        )
    }
}

//
let loadUserPointsInRange_ = () => {
    return {
        type: types.LOAD_USER_POINTS_IN_RANGE
    }
}

let loadUserPointsInRangeFail = (err) => {
    return {
        type: types.LOAD_USER_POINTS_IN_RANGE_FAIL,
        error: err
    }
}
let loadUserPointsInRangeSuccess = (userId, points) => {
    return {
        type: types.LOAD_USER_POINTS_IN_RANGE_SUCCESS,
        userId: userId,
        data: points
    }
}
//thunk
export function loadUserPointsInRange(userId, startTimestamp, endTimestamp){
    return (dispatch, getState) => {
        dispatch(loadUserPointsInRange_());
        return KaaAPI.getUserPoints(userId, startTimestamp, endTimestamp).then(
            points => dispatch(loadUserPointsInRangeSuccess(userId, points)),
            err => dispatch(loadUserPointsInRangeFail(err))
        )
    }
}

export function loadFreshUserPoints(userId){
    return (dispatch, getState) => {
        dispatch(loadUserPointsInRange_());
        let duration = 20 * 1000;
        let toTimestamp = +new Date();
        let fromTimestamp = toTimestamp - duration;
        let points = KaaHelper.getUserPointsInRange(getState(), userId, fromTimestamp, toTimestamp);
        if (points.length > 0){
            fromTimestamp = points[points.length - 1].t;
        }
        return KaaAPI.getUserPoints(userId, fromTimestamp, toTimestamp).then(
            points => dispatch(loadUserPointsInRangeSuccess(userId, points)),
            err => dispatch(loadUserPointsInRangeFail(err))
        )
    }
}