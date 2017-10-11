/**
 * Created by sabir on 10.10.17.
 */

import React from 'react';

import {StackNavigator, TabNavigator } from 'react-navigation';

import Icon from "react-native-vector-icons/FontAwesome";

import LoginApp from '../components/apps/LoginApp'
import HomeApp from '../components/apps/HomeApp'
import InitialApp from '../components/apps/InitialApp'
import SettingsApp from '../components/apps/SettingsApp'

const tabNav = TabNavigator({
    Home: {
        screen: HomeApp,
        navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon name={"home"} size={30} color={tintColor} />
            )
        }
    },
    Settings: {
        screen: SettingsApp,
        navigationOptions: {
            tabBarLabel:"Settings",
            tabBarIcon: ({ tintColor }) => (
                <Icon name={"gear"} size={30} color={tintColor} />
            )
        }
    }


}, {
    tabBarOptions: {
        // activeTintColor: '#222',
        activeTintColor: '#222',
    }
});

const stackNav = StackNavigator({
    Login: { screen: LoginApp },
    Initial: {
        screen: InitialApp,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
    Home: {
        screen: tabNav,
        navigationOptions: ({navigation}) => ({
            title: 'Home',
        }),
    },
    Settings: {
        screen: tabNav,
        navigationOptions: ({navigation}) => ({
            title: 'Settings',
        }),
    },
});



export default stackNav;