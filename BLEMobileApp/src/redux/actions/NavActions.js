/**
 * Created by sabir on 10.10.17.
 */
import * as types from '../ActionTypes'

let setScreen = (screen) => {
    return (dispatch, getState) => {
        return dispatch({
            type: types.SET_SCREEN,
            screen: screen
        });
    }
}
