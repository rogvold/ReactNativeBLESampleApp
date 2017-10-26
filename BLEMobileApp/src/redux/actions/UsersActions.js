

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
// import Parse from 'parse'
import Parse from 'parse/react-native'
import {Map} from 'immutable'

//LOGIN
let startLoggingIn = () => {
    return {
        type: types.LOGIN
    }
}
let onLoggedIn = (user) => {
    console.log('LOGIN_SUCCESS: user = ', user);
    return {
        type: types.LOGIN_SUCCESS,
        user: user
    }
}
let onLoginFailed = (error) => {
    return {
        type: types.LOGIN_FAIL,
        error: error
    }
}
//thunk
export function logIn(data){
    return (dispatch, getState) => {
        dispatch(startLoggingIn())
        return ParseAPI.logInAsPromise(data.email, data.password).then(
            user => dispatch(onLoggedIn(user)),
            error => dispatch(onLoginFailed(error))
        )
    }
}

//SIGNUP
let startSigningUp = () => {
    return {
        type: types.SIGNUP
    }
}
let onSignedUp = (user) => {
    return {
        type: types.SIGNUP_SUCCESS,
        user: user
    }
}
let onSignUpFail = (error) => {
    return {
        type: types.SIGNUP_FAIL,
        error: error
    }
}
//thunk
export function signUp(data){
    return (dispatch, getState) => {
        dispatch(startSigningUp())
        return ParseAPI.signUpAsPromise(data).then(
            user => dispatch(onSignedUp(user)),
            error => dispatch(onSignUpFail(error))
        )
    }
}

//LOGOUT
let startLoggingOut = () => {
    // console.log('startLoggingOut occured');
    return {
        type: types.LOGOUT
    }
}
let onLogoutFail = () => {
    return {
        type: types.LOGOUT_FAIL
    }
}
let onLoggedOut = () => {
    return {
        type: types.LOGOUT_SUCCESS
    }
}
//thunk
export function logOut(){
    return (dispatch, getState) => {
        let usersState = getState().users;
        // console.log('usersState = ', usersState);
        if (usersState.currentUserId === undefined){
            return Promise.resolve()
        }
        dispatch(startLoggingOut());
        return ParseAPI.logOutAsPromise().then(
            () => dispatch(onLoggedOut()),
            () => dispatch(onLogoutFail())
        )
    }
}

//AUTH_INIT
let startAuthInit = () => {
    return {
        type: types.INITIALIZE_AUTH
    }
}
let authInitFailed = (err) => {
    console.log('!!!   authInitFailed: err = ', err);
    return {
        type: types.INITIALIZE_AUTH_FAIL,
        error: err
    }
}
let authInitSuccess = (user) => {
    console.log('   --->>>   !!!   authInitSuccess: user = ', user);
    return {
        type: types.INITIALIZE_AUTH_SUCCESS,
        user: user
    }
}
//thunk
export function initializeAuthorization(){
    return (dispatch, getState) => {
        console.log('initializeAuthorization occured');
        dispatch(startAuthInit());
        return ParseAPI.fetchCurrentUserAsPromise().then(
            user => dispatch(authInitSuccess(user)),
            err => dispatch(authInitFailed())
        );
    }
}

//USERS
let loadUsers_ = () => {
    return {
        type: types.LOAD_USERS
    }
}

let loadUsersFail = (error) => {
    return {
        type: types.LOAD_USERS_FAIL,
        error: error
    }
}

let loadUsersSuccess = (users, links) => {
    return {
        type: types.LOAD_USERS_SUCCESS,
        users: users,
        links: (links === undefined) ? [] : links
    }
}

export function loadUsersByIds(ids){
    return (dispatch, getState) => {
        dispatch(loadUsers_());
        return ParseAPI.getUsersByIds(ids).then(
            users => dispatch(loadUsersSuccess(users)),
            error => dispatch(loadUsersFail(error))
        )
    }
}


//   ---   USERS LINKS   ---
let loadUserLinks_ = () => {
    return {
        type: types.LOAD_USER_LINKS
    }
}


let loadUserLinksFail = (error) => {
    return {
        type: types.LOAD_USER_LINKS_FAIL,
        error: error
    }
}

let loadUserLinksSuccess = (links, users) => {
    return {
        type: types.LOAD_USER_LINKS_SUCCESS,
        links: links,
        users: users
    }
}

//thunks
export function  loadUserUserLinks(userId){
    return (dispatch, getState) => {
        console.log('loadUserUserLinks occured');
        let {currentUserId} = getState().users;
        if (userId === undefined && currentUserId !== undefined){
            userId = currentUserId
        }
        if (userId === undefined){
            return;
        }
        dispatch(loadUserLinks_());
        console.log('loadUserUserLinks occured');
        return ParseAPI.runCloudFunctionAsPromise('loadUserUserLinks', {userId: userId}).then(
            d => {
                // console.log('loadUserUserLinksSuccess: d = ', d);
                return dispatch(loadUserLinksSuccess(d.links, d.users))
            },
            err => {dispatch(loadUserLinksFail(err))}
        )
    }
}

//update link

let updateLink_ = () => {
    return {
        type: types.UPDATE_USER_LINK
    }
}
let updateLinkFail = (err) => {
    return {
        type: types.UPDATE_USER_LINK_FAIL,
        error: err
    }
}
let updateLinkSuccess = (link) => {
    return {
        type: types.UPDATE_USER_LINK_SUCCESS,
        link: link
    }
}
export function updateLink(data){
    return (dispatch, getState) => {
        dispatch(updateLink_());
        return ParseAPI.runCloudFunctionAsPromise('updateUserLink', data).then(
            link => {dispatch(updateLinkSuccess(link))},
            err => {dispatch(updateLinkFail(err))}
        )
    }
}

export function createLink(data){
    return (dispatch, getState) => {
        dispatch(updateLink_());
        let {currentUserId} = getState().users;
        data.creatorId = currentUserId;
        return ParseAPI.runCloudFunctionAsPromise('createUserLink', data).then(
            link => {dispatch(updateLinkSuccess(link))},
            err => {dispatch(updateLinkFail(err))}
        )
    }
}

export function acceptFollower(userId){
    return (dispatch, getState) => {
        let friendId = getState().users.currentUserId;
        let links = getState().users.linksMap.toArray().filter((link) => {
            return (link.creatorId === userId && link.friendId === friendId);
        })
        if (links.length === 0){
            return dispatch(deleteLinkFail());
        }
        let {id} = links[0];
        let data = {id: id, status: 'accepted'};
        dispatch(updateLink_());
        return ParseAPI.runCloudFunctionAsPromise('updateUserLink', data).then(
            link => {dispatch(updateLinkSuccess(link))},
            err => {dispatch(updateLinkFail(err))}
        )
    }
}

let deleteLink_ = () => {
    return {
        type: types.DELETE_USER_LINK
    }
}
let deleteLinkFail = (err) => {
    return {
        type: types.DELETE_USER_LINK_FAIL,
        error: err
    }
}
let deleteLinkSuccess = (id) => {
    return {
        type: types.DELETE_USER_LINK_SUCCESS,
        id: id
    }
}

export function deleteUserLink(id){
    return (dispatch, getState) => {
        dispatch(deleteLink_());
        return ParseAPI.runCloudFunctionAsPromise('deleteUserLink', {id: id}).then(
            d => {dispatch(deleteLinkSuccess(id))},
            err => {dispatch(deleteLinkFail(err))}
        )
    }
}

export function deleteUserLinkByCreatorIdAndFriendId(creatorId, friendId){
    return (dispatch, getState) => {
        let links = getState().users.linksMap.toArray().filter((link) => {
            return (link.creatorId === creatorId && link.friendId === friendId);
        })
        if (links.length === 0){
            return dispatch(deleteLinkFail());
        }
        dispatch(deleteLink_());
        let {id} = links[0];
        return ParseAPI.runCloudFunctionAsPromise('deleteUserLink', {id: id}).then(
            d => {dispatch(deleteLinkSuccess(id))},
            err => {dispatch(deleteLinkFail(err))}
        )
    }
}




// update user

let updateUser_ = () => {
    return {
        type: types.UPDATE_USER
    }
}

let updateUserFail = (err) => {
    return {
        type: types.UPDATE_USER_FAIL,
        error: err
    }
}

let updateUserSuccess = (user) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user: user
    }
}

//thunk
export function updateUser(data){
    return (dispatch, getState) => {
        let {currentUserId, usersMap} = getState().users;
        data.id = currentUserId;
        dispatch(updateUser_());
        return ParseAPI.updateObject(Parse.User, data, ParseAPI.transformUser).then(
            user => dispatch(updateUserSuccess(user)),
            err => dispatch(updateUserFail(err))
        )
    }
}

//load all users
export function loadAllUsers(){
    return (dispatch, getState) => {
        dispatch(loadUsers_())
        return ParseAPI.getFreshObjects(Parse.User, Map(), {}, ParseAPI.transformUser).then(
            users => dispatch(loadUsersSuccess(users)),
            err => dispatch(loadUsersFail(err))
        )
    }
}

let searchUsers_ = () => {
    return {
        type: types.SEARCH_USERS
    }
}

let searchUsersFail = (err) => {
    return {
        type: types.SEARCH_USERS_FAIL,
        error: err
    }
}
let searchUsersSuccess = (users) => {
    return {
        type: types.SEARCH_USERS_SUCCESS,
        users: users,
        links: []
    }
}
//thunk
export function searchUsers(searchText){
    return (dispatch, getState) => {
        dispatch(searchUsers_());
        let data = {text: searchText};
        return ParseAPI.runCloudFunctionAsPromise('searchUsers', data).then(
            users => dispatch(searchUsersSuccess(users)),
            err => dispatch(searchUsersFail(err))
        )
    }
}

export function selectUser(userId) {
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_USER,
            id: userId
        })
    }
}

export function unselectUser() {
    return (dispatch, getState) => {
        return dispatch({
            type: types.UNSELECT_USER
        })
    }
}