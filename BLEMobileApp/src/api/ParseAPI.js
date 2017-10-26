/**
 * Created by sabir on 19.07.17.
 */
/**
 * Created by sabir on 13.02.17.
 */

'use strict';

import * as constants from '../constants/config.js'
import Parse from 'parse/react-native'

const ParseAPI = {

    isEmail (email) {
        if (email === undefined){
            return false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    initParse (){
        console.log('---   initParse occured! ');
        Parse.initialize(constants.PARSE_APP_ID, constants.PARSE_JS_KEY);
        Parse.serverURL = constants.PARSE_SERVER_URL;
    },

    transformUser(u) {
        if (u === undefined){
            return undefined;
        }
        return {
            id: u.id,
            timestamp: (new Date(u.createdAt)).getTime(),
            email: u.get('email'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            organizationId: u.get('organizationId'),
            phone: u.get('phone'),
            weight: u.get('weight'),
            height: u.get('height'),
            avatar: (u.get('avatar') === undefined) ? constants.EMPTY_AVATAR : u.get('avatar'),

            userRole: (u.get('userRole') == undefined) ? 'user' : u.get('userRole')
        }
    },

    fetchCurrentUserAsPromise () {
        console.log('fetchCurrentUserAsPromise occured');
        return new Promise((resolve, reject) => {
            Parse.User.currentAsync().then(
                cu => {
                    console.log('----    cu = ', cu);
                    if (cu == undefined){
                        return resolve(undefined)
                    }
                    cu.fetch().then((user) =>{
                        console.log('success: resolving ', user);
                        resolve(this.transformUser(user));
                    }, err => {
                        console.log('fetchCurrentUserAsPromise: err = ', err);
                        return reject(err)
                    });
                },
                err => {
                    console.log('fetchCurrentUserAsPromise - resolving undefined');
                    resolve(undefined);
                }
            )
        });
    },

    runCloudFunction (functionName, data, success, error){
        // console.log('runCloudFunction uccured: ', functionName, data);
        if (functionName === undefined){
            return;
        }
        if (data === undefined){
            // console.log('data is not defined');
            return;
        }
        if (success === undefined){
            success = function(){}
        }
        if (error === undefined){
            error = function(){}
        }
        Parse.Cloud.run(functionName, {data: data}, {
            success: function(successData){
                // console.log('functionName: ' + functionName + ' | success data: ', successData);
                success(successData);
            },
            error: function(respErr){
                // console.log('functionName: error: ', respErr);
                let err = respErr.message;
                if (typeof  respErr.message === 'string'){
                    err = JSON.parse(err);
                }
                error(err);
            }
        });
    },

    logIn (email, password, success, error){
        if (this.isEmail(email) === false){
            error({message: 'email is not valid'});
            return;
        }
        if (password === undefined || password.trim() === ''){
            error({message: 'password is not defined'});
            return;
        }
        email = email.toLowerCase();
        let self = this;
        Parse.User.logIn(email, password, {
            success: function(u){
                success(self.transformUser(u));
            },
            error: function(u, err){
                let code = err.code;
                if (code === 101){
                    error({message: 'Account with specified login and password is not found'});
                }else{
                    error(err);
                }
            }
        });
    },

    signUp: function(data, success, error){
        if (data === undefined){
            data = {};
        }

        if (this.isEmail(data.email) === false){
            error({message: 'Incorrect email'});
            return;
        }

        if (data.password === undefined || data.password.trim() === ''){
            error({message: 'Incorrect email'});
            return;
        }

        data.email = data.email.toLowerCase();
        let user = new Parse.User();

        for (let key in data){
            user.set(key, data[key]);
        }
        user.set('username', data.email);
        let self = this;
        user.signUp(null, {
            success: function(u) {
                success(self.transformUser(u));
            },
            error: function(user, err) {
                error(err);
            }
        });
    },

    logOutAsPromise: function(){
        return Parse.User.logOut();
    },

    logInAsPromise (email, password) {
        let self = this;
        let promise = new Promise(function(resolve, reject){
            self.logIn(email, password, function(user){
                resolve(user);
            }, function(err){
                reject(err);
            });
        });
        return promise;
    },

    signUpAsPromise (data){
        let self = this;
        let promise = new Promise(function(resolve, reject){
            self.signUp(data, function(user){
                resolve(user);
            }, function(error){
                reject(error);
            })
        });
        return promise;
    },

    runCloudFunctionAsPromise (functionName, data){
        let self = this;
        let promise = new Promise(function(resolve, reject) {
            self.runCloudFunction(functionName, data, function(res){
                resolve(res);
            }, function(err){
                reject(err);
            })
        });
        return promise;
    },

    getUsersByIds(ids) {
        console.log('ParseAPI: getUsersByIds: ids = ', ids);
        let self = this;
        let q = new Parse.Query(Parse.User);
        q.limit(10000);
        q.containedIn('objectId', ids);
        return new Promise(function(resolve, reject){
            q.find(function(loadedUsers){
                let users = loadedUsers.map(function(u){
                    return self.transformUser(u);
                })
                console.log('loaded users = ', users);
                resolve(users);
            });
        })
    },

    getFreshObjects(className, objectsMap, filterData, transformFunction) {
        console.log('   --->>>   getFreshObjects: ' + className);
        let self = this;
        return new Promise((resolve, reject) => {
            let q = new Parse.Query(className);
            q.limit(100000);
            q.addAscending('createdAt');
            for (let key in filterData){
                let v = filterData[key];
                if (v !== undefined && v.length > 0){
                    for (let j in v){
                        q[key](...v[j]);
                    }
                }
            }
            // if (objectsMap !== undefined){
            //     q.greaterThan('updatedAt', new Date(self.getMaxUpdatedTimestamp(objectsMap)));
            // }

            // console.log('q = ', q);
            q.find().then((results) => {
                // console.log('objects loaded: objects = ', results);
                let objects = results.map( (m) => {
                    return transformFunction(m);
                });
                // console.log('transformed objects = ', objects);
                resolve(objects);
            }, (err) => {
                reject(err);
            });
        })
    },

    updateObject(className, data, transformFun){
        // console.log('updateObject: ' + className, data);
        let self = this;
        let q = new Parse.Query(className);
        return new Promise((resolve, reject) => {
            q.get(data.id, {
                success: (loadedObject) => {
                    for (let key in data){
                        let d = data[key];
                        if (key === 'id' || key === 'timestamp' || key === 'creatorId'){
                            continue;
                        }
                        loadedObject.set(key, data[key]);
                    }
                    loadedObject.save().then((savedObject) => {
                        let obj = transformFun(savedObject);
                        console.log('updateObject: success');
                        resolve(obj);
                    });
                },
                error: (err) =>{
                    reject(err);
                }
            })
        });
    },

    createObject(className, data, transformFun){
        // console.log('createObject: ' + className, data);
        let self = this;
        let Obj = Parse.Object.extend(className);
        let obj = new Obj();
        return new Promise((resolve, reject) => {
            for (let key in data){
                let d = data[key];
                if (key === 'id' || key === 'timestamp'){
                    continue;
                }
                // console.log('createObject: key - value = ', key, data[key]);
                obj.set(key, data[key]);
            }
            obj.save().then((savedObject) => {
                // console.log('successfully saved: savedObject = ', savedObject);
                let sObj = transformFun(savedObject);
                resolve(sObj);
            }).catch(err => {reject(err)});
        });
    },

    deleteObject(className, id){
        let q = new Parse.Query(className);
        return new Promise((resolve, reject) => {
            q.get(id, {
                success: (loadedObject) => {
                    if (loadedObject === undefined){
                        reject({
                            message: 'not found'
                        });
                        return;
                    }
                    loadedObject.destroy().then(() => {
                        resolve({
                            id: id
                        });
                    });
                },
                error: (err) =>{
                    reject(err);
                }
            })
        });
    }

}

export default ParseAPI