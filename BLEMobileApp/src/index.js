/**
 * Created by sabir on 19.07.17.
 */

import React from 'react';

import {
    AppRegistry,
    Picker,
    StyleSheet,
    NativeModules,
    Text,
    Modal,
    Dimensions,
    View,
    ListView,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    NativeAppEventEmitter,
    Platform,
    Alert,
    BackAndroid,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//actions
import * as initActions from './redux/actions/InitActions.js';

import {reducer} from './redux/reducers'

const loggerMiddleware = createLogger()

import moment from 'moment/min/moment-with-locales.min.js'

import {persistStore, autoRehydrate} from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import {AsyncStorage} from 'react-native'

import KaaAPI from './api/KaaAPI'


import App from './components/apps/App'

let __DEV__ = false;

const store = (__DEV__ ? createStore(
            reducer,
            undefined,
            compose(
                applyMiddleware(thunkMiddleware, loggerMiddleware)
            )
        ) : createStore(
            reducer,
            undefined,
            compose(
                applyMiddleware(thunkMiddleware)
            )
        )
)


// const store = (__DEV__ ? createStore(
//             reducer,
//             applyMiddleware(thunkMiddleware, loggerMiddleware)
//         ) :
//         createStore(
//             reducer,
//             applyMiddleware(thunkMiddleware)
//         )
// );

export default function setup() {
    class RootApp extends React.Component{

        render() {

            return (
                <Provider store={store}>

                    <App />

                </Provider>
            );
        }

    }
    moment.locale('ru');
    return RootApp;
}



let init = () => {
    return (dispatch, getState) => {
        dispatch(initActions.loadEverything());
    }
}

let startNotFirstTime = () => {
    // persistStore(store, {storage: AsyncStorage, transforms: [immutableTransform()]}, () => {
        store.dispatch(init());
    // })
}

let startFirstTime = () => {
    store.dispatch(init());
}


//checking if the launch is the first
AsyncStorage.getItem("alreadyLaunched").then(value => {
    if(value === null){
        // console.log('this is the first launch!');
        AsyncStorage.setItem('alreadyLaunched', '1');
        startFirstTime();
    }else {
        // console.log('not first launch');
        startNotFirstTime();
    }
})