/**
 * Created by sabir on 10.10.17.
 */

 import * as mvConstants from '../../constants/mvConsts'
 const {width, height} = mvConstants.window;

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

 class HeartAnimationComponent extends React.Component {

     static defaultProps = {
         canRestart: false
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


     componentWillReceiveProps() {

     }

     _playAnimation = () => {
         this.animation.reset();
         this.animation.play();
     };

     render() {
         let {canRestart} = this.props;

         return (
             <View style={styles.animationContainer}>

                 <Lottie
                     ref={animation => {
                        this.animation = animation;
                 }}
                     style={{
                          width: width,
                          height: width
                        }}
                     source={require('../../assets/lottie/radar.json') }
                 />

                 {canRestart == false ? null :
                     <View style={styles.buttonContainer}>
                         <TouchableOpacity
                             onPress={this._playAnimation}
                         >
                             <Text>
                                 restart animation
                             </Text>
                         </TouchableOpacity>
                     </View>
                 }

             </View>
         );
     }

 }

const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
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

 //HeartAnimationComponent = connect(mapStateToProps, mapDispatchToProps)(HeartAnimationComponent)

 export default HeartAnimationComponent