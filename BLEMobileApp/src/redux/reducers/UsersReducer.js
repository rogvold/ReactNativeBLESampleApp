/**
 * Created by sabir on 04.02.17.
 */

import * as types from '../ActionTypes'
import {Map, OrderedMap, Set, List} from 'immutable';

const initialState = {
    initialized: false,
    loading: false,
    usersMap: Map(),
    linksMap: Map(),
    currentUserId: undefined,

    selectedUserId: undefined,

    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const UsersReducers =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGIN:
            return startLoading(state, action)

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                currentUserId: action.user.id,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false
            }

        case types.LOGIN_FAIL:
            return stopLoading(state, action)

        case types.SIGNUP:
            return startLoading(state, action)

        case types.SIGNUP_FAIL:
            return stopLoading(state, action)

        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                currentUserId: action.user.id,
                usersMap: state.usersMap.set(action.user.id, action.user),
                loading: false
            }


        case  types.LOGOUT:
            return startLoading(state, action)

        case  types.LOGOUT_FAIL:
            return stopLoading(state, action)

        case  types.LOGOUT_SUCCESS:
            return {...state, currentUserId: undefined, loading: false, error: undefined}

        case types.INITIALIZE_AUTH:
            return {...state, loading: true, initialized: false}

        case types.INITIALIZE_AUTH_FAIL:
            return {...state, loading: false, initialized: false}

        case types.INITIALIZE_AUTH_SUCCESS:
            return {...state,
                loading: false,
                initialized: true,
                currentUserId: (action.user === undefined) ? undefined : action.user.id,
                usersMap: (action.user === undefined) ? state.usersMap : state.usersMap.set(action.user.id, action.user)
            }



        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                usersMap: state.usersMap.set(action.user.id, action.user)
            }

        case types.UPDATE_USER:
        case types.SEARCH_USERS:
        case types.LOAD_USERS:
        case types.LOAD_USER_LINKS:
            return startLoading(state, action)

        case types.UPDATE_USER_FAIL:
        case types.SEARCH_USERS_FAIL:
        case types.LOAD_USERS_FAIL:
        case types.LOAD_USER_LINKS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                usersMap: state.usersMap.merge(action.users.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                linksMap: state.linksMap.merge(action.links.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                loading: false
            }


        case types.SEARCH_USERS_SUCCESS:
        case types.LOAD_USER_LINKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                usersMap: state.usersMap.merge(action.users.reduce((res, u) => {return res.set(u.id, u)}, Map())),
                linksMap: state.linksMap.merge(action.links.reduce((res, u) => {return res.set(u.id, u)}, Map())),
            }

        case types.CREATE_USER_LINK:
            return startLoading(state, action);
        case types.CREATE_USER_LINK_FAIL:
            return stopLoading(state, action);
        case types.CREATE_USER_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                linksMap: state.linksMap.set(action.link.id, action.link)
            }

        case types.UPDATE_USER_LINK:
            return startLoading(state, action);
        case types.UPDATE_USER_LINK_FAIL:
            return stopLoading(state, action);
        case types.UPDATE_USER_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                linksMap: state.linksMap.set(action.link.id, action.link)
            }

        case types.DELETE_USER_LINK:
            return startLoading(state, action);
        case types.DELETE_USER_LINK_FAIL:
            return stopLoading(state, action);
        case types.DELETE_USER_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                linksMap: state.linksMap.delete(action.id)
            }

        case types.SELECT_USER:
            return {
                ...state,
                selectedUserId: action.id
            }

        case types.UNSELECT_USER:
            return {
                ...state,
                selectedUserId: undefined
            }

        default:
            return state;

    }

}

export default UsersReducers;