/**
 * Created by sabir on 12.10.17.
 */

import * as mvConsts from '../../../constants/mvConsts'
const {width, height} = mvConsts.window;

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

 import AnimationComponent from '../../animations/AnimationComponent'

 import * as actions from '../../../redux/actions/BluetoothActions'
 import * as recActions from '../../../redux/actions/RecordActions'

 import { NavigationActions } from 'react-navigation';

 import KaaButton from '../../buttons/KaaButton'

 import KaaHelper from '../../../helpers/KaaHelper'

// getDeviceAvatarSourceByType

 class BluetoothDevicesPanel extends React.Component {

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
         let {devices, initializing, getPoints,
             scanning, connectDevice, connecting,
             scanDevices, isConnecting, isConnected, goHome} = this.props;

         return (
             <View style={styles.container} >

                 {((initializing == false) && (scanning == false)) ? null :
                     <View style={styles.animationPlaceholder} >
                         <AnimationComponent />
                     </View>
                 }

                 <ScrollView

                 >
                     <View style={styles.list} >
                         {devices.map((dev, k) => {
                             let connecting = isConnecting(dev.id);
                             let connected = isConnected(dev.id);
                             let st = [styles.item];
                             if (connected == true){
                                 st.push(styles.connectedItem);
                             }
                             let points = getPoints(dev.id);
                             let lastPoint = (points.length == 0) ? undefined : points[points.length - 1];
                             return (
                                 <TouchableOpacity
                                     style={st}
                                     key={dev.id} onPress={() => {
                                          connectDevice(dev.id);
                                }} >

                                     <View style={styles.deviceImagePlaceholder} >
                                         <Image
                                             style={styles.deviceImage}
                                             source={KaaHelper.getDeviceAvatarSourceByType(dev.type)} />
                                     </View>
                                     <View style={styles.deviceInfoPlaceholder} >
                                         <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                             <Text style={(connected == false) ? styles.name : [styles.name, styles.whiteText]} >
                                                 {dev.name}
                                             </Text>
                                             {lastPoint == undefined ? null :
                                                 <Text style={{color: 'white', opacity: 0.8, fontSize: 10}} >
                                                     {lastPoint.rr}
                                                 </Text>
                                             }
                                             {connecting == false ? null :
                                                 <ActivityIndicator />
                                             }
                                         </View>

                                         <View>
                                             <Text style={(connected == false) ? styles.deviceId : [styles.deviceId, styles.whiteText]} >
                                                 {dev.id}
                                             </Text>
                                         </View>
                                     </View>

                                 </TouchableOpacity>
                             )
                         })}
                     </View>

                 </ScrollView>

                 {((scanning == true) || (connecting == true)) ? null :
                     <View style={styles.scanButtonPlaceholder} >
                         <KaaButton
                             text={'SCAN'}
                             onPress={() => {
                                scanDevices();
                         }} />
                     </View>
                 }


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1
     },

     list: {
         alignItems: 'center',
         justifyContent: 'center'
     },

     animationPlaceholder: {
         position: 'absolute',
         zIndex: 100,
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         backgroundColor: 'rgba(255, 255, 255, 0.9)'
     },

     item: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: mvConsts.bigRadius,
        height: 80,
        width: width - 40,
        margin: 10,
        flexDirection: 'row',
        position: 'relative'
     },

     connectedItem: {
        // backgroundColor: mvConsts.colors.lightGreenBackground
        // backgroundColor: mvConsts.colors.goodBlue
        backgroundColor: mvConsts.colors.kaaColor
     },

     deviceImagePlaceholder: {
         height: 80,
         width: 100,
         paddingLeft: 20
     },

     deviceImage: {
         width: 80,
         height: 80,
         borderRadius: 40
     },

     deviceInfoPlaceholder: {
        paddingLeft: 20
     },

     name: {
         fontWeight: 'bold',
         fontSize: 24,
         marginRight: 10
     },

     textWhite: {
        color: 'white'
     },

     deviceId: {
         fontSize: 18,
         opacity: 0.6
     },

     scanButtonPlaceholder: {
         alignItems: 'center',
         justifyContent: 'center',
         padding: 10
     },

     button: {
         backgroundColor: mvConsts.colors.kaaColor,
         height: 50,
         borderRadius: 25,
         alignItems: 'center',
         justifyContent: 'center',
         paddingLeft: 40,
         paddingRight: 40
     },

     buttonText: {
         color: 'white',
         fontSize: 18
     }

 });


 let isSomethingConnecting = (state) => {
     let f = false;
     let {devicesMap, connectingSet} = state.ble;
     let devices = devicesMap.toArray();
     for (let i in devices){
         let id = devices[i].id;
         if (connectingSet.has(id) == true){
             f = true;
         }
     }
     return f;
 }

 let getDeviceData = (state, deviceId) => {
     let {dataMap} = state.ble;
     let d = dataMap.get(deviceId);
     if (d == undefined){
         return [];
     }
     return d;
 }

 const mapStateToProps = (state) => {
    return {
        initializing: state.ble.initializing,
        scanning: state.ble.scanning,
        connecting: isSomethingConnecting(state),
        devices: state.ble.devicesMap.toArray().sort((a, b) => {
            if (a.id > b.id){return 1;}
            if (a.id < b.id){return -1;}
            return 0;
        }),
        getPoints: (deviceId) => {
            return getDeviceData(state, deviceId)
        },
        isConnecting: (deviceId) => {
            return state.ble.connectingSet.has(deviceId)
        },
        isConnected: (deviceId) => {
            return state.ble.connectedSet.has(deviceId)
        }
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        scanDevices: () => {
            return dispatch(actions.scanBluetoothDevices())
        },
        connectDevice: (deviceId) => {
            return dispatch(actions.connectToDevice(deviceId)).then(
                () => {
                    return dispatch(NavigationActions.navigate({
                        routeName: 'Home'
                    }))
                }
            ).then(
                () => dispatch(recActions.startSession())
            )
        },
        goHome: () => {
            return dispatch(NavigationActions.navigate({
                routeName: 'Home'
            }))
        }
    }
 }

 BluetoothDevicesPanel = connect(mapStateToProps, mapDispatchToProps)(BluetoothDevicesPanel)

 export default BluetoothDevicesPanel