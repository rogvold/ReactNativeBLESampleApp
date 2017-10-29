/**

 */

import * as types from '../ActionTypes.js'

import {Map} from 'immutable'

const initialState = {
    loading: false,
    // sessionsMap: {},
    sessionsMap: Map(),
    // sessionsDataMap: {},
    sessionsDataMap: Map(),

    dataMap: Map(),

    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeSessions = (state, sessions) => {
    if (sessions == undefined){
        return state;
    }
    var sessionsMap = Object.assign({}, state.sessionsMap);
    for (let s of sessions){
        sessionsMap[s.id] = s;
    }
    return Object.assign({}, state.sessionsMap, sessionsMap);
}

let consumeData = (dataMap, userId, points) => {
    let pointsMap = (dataMap.get(userId) == undefined ? Map() : dataMap.get(userId))
                    .merge(points.reduce((map, p) => map.set(p.t, p), Map()))
    return dataMap.set(userId, pointsMap);
}

const SessionsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_USER_SESSIONS:
        case types.LOAD_USER_POINTS_IN_RANGE:
            return startLoading(state, action)

        case types.LOAD_USER_SESSIONS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USER_SESSIONS_SUCCESS:
            return {...state,
                loading: false,
                error: undefined,
                sessionsMap: state.sessionsMap.merge(action.sessions.reduce((map, note) => {return map.set(note.id, note)}, Map()))
            }


        case types.LOAD_SESSION_DATA:
            return startLoading(state, action)

        case types.LOAD_SESSION_DATA_FAIL:
        case types.LOAD_USER_POINTS_IN_RANGE_FAIL:
            return stopLoading(state, action)

        case types.LOAD_SESSION_DATA_SUCCESS:
            // let data = action.data;
            // let sessionId = action.sessionId;
            // let newSessionsDataMap = Object.assign({}, state.sessionsDataMap);
            // newSessionsDataMap[sessionId] = data;
            return {...state,
                loading: false,
                error: undefined,
                // sessionsDataMap: newSessionsDataMap
                sessionsDataMap: state.sessionsDataMap.set(action.sessionId, action.data),
                dataMap: consumeData(state.dataMap, action.userId, action.data)
            }

        case types.LOAD_USER_POINTS_IN_RANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                dataMap: consumeData(state.dataMap, action.userId, action.data)
            }


        default:
            return state;
    }

}

export default SessionsReducer