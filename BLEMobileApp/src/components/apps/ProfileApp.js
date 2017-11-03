/**
 * Created by sabir on 10.10.17.
 */
import * as mvConstants from '../../constants/mvConsts'
const {width, height} = mvConstants.window;

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
    BackAndroid,
    ActivityIndicator
} from 'react-native';

import ReactNative from 'react-native';
const { StatusBarManager } = NativeModules;
import {Constants} from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome'

import BluetoothDevicesPanel from '../bluetooth/panels/BluetoothDevicesPanel'

import KaaTestPanel from '../kaa/KaaTestPanel'

import LoginForm from '../auth/forms/LoginForm'

import * as actions from '../../redux/actions/UsersActions'

import KaaButton from '../buttons/KaaButton'

import UserPanel from '../users/panels/UserPanel'

import KeyboardSpacer from "react-native-keyboard-spacer"

import UserSessionsPanel from '../sessions/panels/UserSessionsPanel'

class ProfileApp extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let { nav, isActive, routeName, user, logIn, loading, logOut} = this.props;
        console.log('ProfileApp: render: isActive = ', isActive);
        console.log('ProfileApp: render: routeName = ', routeName);

        return (
            <View style={styles.container} >

                <ScrollView>

                    {user != undefined ? null :
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: height * 0.05}} >
                            <LoginForm loading={loading}
                                       onSubmit={(data) => {
                                logIn(data);
                            }} />
                        </View>
                    }

                    {user == undefined ? null :
                        <View style={{marginBottom: 10}} >

                            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: height / 8.0}} >
                                <UserPanel />
                            </View>

                            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: height / 16.0}} >
                                <KaaButton text={'LOGOUT'} onPress={() => {
                                    logOut();
                                }} />
                            </View>

                            {isActive == false ? null :
                                <View style={{marginTop: 20}} >
                                    <UserSessionsPanel userId={user.id} />
                                </View>
                            }

                        </View>
                    }

                    <KeyboardSpacer/>

                </ScrollView>

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading,
        nav: state.nav,
        routeName: ownProps.navigation.state.routeName,
        isActive: (ownProps.navigation.state.routeName == 'Profile')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data) => {
            return dispatch(actions.logIn(data))
        },
        logOut: () => {
            return dispatch(actions.logOut())
        }
    }
}

ProfileApp = connect(mapStateToProps, mapDispatchToProps)(ProfileApp)

export default ProfileApp