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

import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigationActions } from 'react-navigation';

import AnimationComponent from '../animations/AnimationComponent'

class InitialApp extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow('PORTRAIT_UP');
        // let {goHome} = this.props;
        // setTimeout(() => {
        //     goHome()
        // }, 3000)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive != this.props.isActive){

        }
    }

    render = () => {
        let {goHome, nav, isActive, routeName} = this.props;
        console.log('InitialApp: render: isActive = ', isActive);
        console.log('InitialApp: render: routeName = ', routeName);
        console.log('InitialApp: render: nav = ', nav);

        return (
            <View style={styles.container} >

                {((isActive == false) || (true == true)) ? null :
                    <View style={{alignItems: 'center'}} >
                        <AnimationComponent />
                    </View>
                }

                <View style={{height: height * 0.25, width: height * 0.25 * 576 / 362}} >
                    <Image
                        style={{height: height * 0.25, width: height * 0.25 * 576 / 362}}
                        source={require('../../assets/images/kaa_logo.png')} />
                </View>

                <View style={{position: 'absolute', bottom: 50,
                              alignItems: 'center', justifyContent: 'center',
                              left: 0, right: 0}} >
                    <TouchableOpacity
                                        onPress={() => {
                                            goHome();
                                        }}
                                        style={{height: 50, paddingLeft: 40, alignItems: 'center',
                                                paddingRight: 40, justifyContent: 'center',
                                                 width: 0.5 * width,
                                                borderRadius: 25, backgroundColor: mvConstants.colors.kaaColor}} >
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 20}} >
                            START
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

});


const mapStateToProps = (state, ownProps) => {
   return {
        nav: state.nav,
        routeName: ownProps.navigation.state.routeName,
        // isActive: (ownProps.navigation.state.routeName == 'Initial')
        isActive: (state.nav.routes[state.nav.index].routeName == 'Initial')
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       goHome: () => {
           return dispatch(NavigationActions.navigate({
               routeName: 'Home'
           }))
       }
   }
}

InitialApp = connect(mapStateToProps, mapDispatchToProps)(InitialApp)

export default InitialApp