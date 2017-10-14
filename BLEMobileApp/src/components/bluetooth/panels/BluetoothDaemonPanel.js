/**
 * Created by sabir on 13.10.17.
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

 import * as actions from '../../../redux/actions/BluetoothActions'

 class BluetoothDaemonPanel extends React.Component {

     static defaultProps = {
         interval: 900
         // interval: 2500
     }

     static propTypes = {}

     state = {

     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     initTimer = () => {
         if (this.intervalId == undefined){
             this.intervalId = setInterval(() => {
                 this.onTick();
             }, this.props.interval)
         }
     }

     destroyTimer = () => {
         if (this.intervalId != undefined){
             clearInterval(this.intervalId)
             this.intervalId = undefined;
         }
     }

     componentWillUnmout(){
         this.destroyTimer();
     }

     componentDidMount() {
        this.initTimer();
     }

     onTick = () => {
         let {saveData, device} = this.props;
         if (device == undefined){
             return;
         }
         let randomRR = Math.floor(Math.random() * 300 + 500);
         saveData(device.id, [randomRR]);
     }

     componentWillReceiveProps() {

     }

     render = () => {

         return (
             <View style={styles.container} >

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         width: 0,
         height: 0,
         display: 'none'
     },

 });

 let getConnectedSensor = (state) => {
     let {connectedSet, devicesMap} = state.ble;
     let devices = devicesMap.toArray().filter(d => (connectedSet.has(d.id)));
     if (devices.length > 0){
         return devices[0];
     }
     return undefined;
 }

 const mapStateToProps = (state) => {
    return {
        device: getConnectedSensor(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        saveData(deviceId, rrs){
            return dispatch(actions.saveRRData(deviceId, rrs))
        }
    }
 }

 BluetoothDaemonPanel = connect(mapStateToProps, mapDispatchToProps)(BluetoothDaemonPanel)

 export default BluetoothDaemonPanel