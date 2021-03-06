/**
 * Created by sabir on 10.10.17.
 */

 import * as mvConstants from '../../constants/mvConsts'
 const {window} = mvConstants;

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';



import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

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

 class AnimationComponent extends React.Component {

     static defaultProps = {
         startTime: undefined,
         canRestart: false,
         source: require('../../assets/lottie/radar.json'),

         width: window.width,
         height: window.width
     }

     static propTypes = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     state = {

     };

     componentDidMount() {
         this._playAnimation();
     }


     componentWillReceiveProps(nextProps) {
        let {startTime} = nextProps;
        if (startTime != this.props.startTime){
            this._playAnimation();
        }
     }

     _playAnimation = () => {
         this.animation.reset();
         this.animation.play();
     };

     render() {
         let {canRestart, source, height, width} = this.props;

         return (
             <Lottie
                 ref={animation => {
                        this.animation = animation;
                 }}
                 style={{
                          width: width,
                          height: height
                        }}
                 source={source}
             />
         );
     }

 }

const styles = StyleSheet.create({
    animationContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});


 //const mapStateToProps = (state) => {
 //    return {
 //        currentUserId: state.users.currentUserId,
 //        loading: state.users.loading
 //    }
 //}

 //const mapDispatchToProps = (dispatch) => {
 //    return {
 //        onLogout: (data) => {
 //            dispatch(actions.logOut())
 //        }
 //    }
 //}

 //AnimationComponent = connect(mapStateToProps, mapDispatchToProps)(AnimationComponent)

 export default AnimationComponent