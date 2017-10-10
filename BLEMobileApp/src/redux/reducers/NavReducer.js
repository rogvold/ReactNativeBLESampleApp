/**
 * Created by sabir on 10.10.17.
 */
// import * as mvConsts from '../../constants/mvConsts'
import * as types from '../ActionTypes'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import AppNavigator from '../../navigation/AppNavigator'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Initial'));

const NavReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export default NavReducer;