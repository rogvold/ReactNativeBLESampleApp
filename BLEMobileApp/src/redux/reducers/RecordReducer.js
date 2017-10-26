/**
 * Created by sabir on 11.10.17.
 */
import * as types from '../ActionTypes'
import {Map, Stack, Set} from 'immutable'

const initialState = {

    sessionTimestamp: undefined,
    loading: false,
    uploadedSet: Set(),

}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const RecordReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.UPLOAD_POINTS_TO_SERVER:
        case types.START_SESSION:
        case types.STOP_SESSION:
            return {
                ...state,
                loading: true
            }

        case types.UPLOAD_POINTS_TO_SERVER_FAIL:
        case types.START_SESSION_FAIL:
        case types.STOP_SESSION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.UPLOAD_POINTS_TO_SERVER_SUCCESS:
            return{
                ...state,
                loading: false,
                uploadedSet: state.uploadedSet.merge(action.points.reduce((set, p) => {return set.add(p.id)}, Set()))
            }

        case types.START_SESSION_SUCCESS:
            return{
                ...state,
                loading: false,
                sessionTimestamp: action.timestamp
            }

        case types.STOP_SESSION_SUCCESS:
            return{
                ...state,
                loading: false,
                sessionTimestamp: undefined
            }


        default:
            return state;
    }

}

export default RecordReducer;