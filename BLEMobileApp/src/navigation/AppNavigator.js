/**
 * Created by sabir on 10.10.17.
 */

import {StackNavigator } from 'react-navigation';

import LoginApp from '../components/apps/LoginApp'
import HomeApp from '../components/apps/HomeApp'
import InitialApp from '../components/apps/InitialApp'

const AppRouteConfigs = {
    Login: { screen: LoginApp },
    Home: { screen: HomeApp },
    Initial: { screen: InitialApp },
}

const AppNavigator = StackNavigator(AppRouteConfigs);

export default AppNavigator;