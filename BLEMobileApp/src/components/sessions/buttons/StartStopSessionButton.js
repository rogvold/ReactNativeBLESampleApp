/**
 * Created by sabir on 29.10.17.
 */


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

 import KaaButton from '../../buttons/KaaButton'

 import * as recordActions from '../../../redux/actions/RecordActions'

 import KaaHelper from '../../../helpers/KaaHelper'

 class StartStopSessionButton extends React.Component {

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
         let {stopSession, startSession, sessionTimestamp, device} = this.props;
         let recording = (sessionTimestamp != undefined);
         let text = (sessionTimestamp == undefined) ? 'START' : 'STOP';
         if (device == undefined){
             return null;
         }

         return (
             <KaaButton text={text} onPress={() => {
                 if (recording == true){
                     stopSession();
                 }else {
                     startSession();
                 }
             }} />
         )
     }

 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });


 const mapStateToProps = (state) => {
    return {
        sessionTimestamp: state.record.sessionTimestamp,
        device: KaaHelper.getConnectedDevice(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        startSession: () => {
            return dispatch(recordActions.startSession())
        },
        stopSession: () => {
            return dispatch(recordActions.stopSession())
        }
    }
 }

 StartStopSessionButton = connect(mapStateToProps, mapDispatchToProps)(StartStopSessionButton)

 export default StartStopSessionButton