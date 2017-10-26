/**
 * Created by sabir on 10.10.17.
 */
 import * as mvConsts from '../../constants/mvConsts'
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

 import BluetoothDevicesPanel from '../bluetooth/panels/BluetoothDevicesPanel'

 import RealtimeChart from '../charts/panels/RealtimeChart'

 import { LinearGradient } from 'expo';

  import AnimationComponent from '../animations/AnimationComponent'

 import KaaHelper from '../../helpers/KaaHelper'

 import KaaButton from '../buttons/KaaButton'

 import {NavigationActions} from 'react-navigation'

 import * as actions from '../../redux/actions/BluetoothActions'

 import * as recActions from '../../redux/actions/RecordActions'

 class HomeApp extends React.Component {

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

     renderConnectedDevice(){
         let {device, lastPoint, disconnect} = this.props;
         if (device == undefined){
             return null;
         }
         return (
             <View
                 style={styles.device}>

                 <View style={styles.deviceInfoPlaceholder} >
                     <View >
                         <Text style={styles.name} >
                             {device.name}
                         </Text>
                     </View>

                     <View>
                         <Text style={styles.deviceId} >
                             {device.id}
                         </Text>
                     </View>

                     <TouchableOpacity onPress={() => {
                         disconnect(device.id)
                     }} >
                         <Text style={styles.stopPlaceholder} >
                             disconnect
                         </Text>
                     </TouchableOpacity>

                 </View>

             </View>
         )
     }

     render = () => {
         let { nav, isActive, routeName, lastPoint, device, goToSettings, scan} = this.props;
         // console.log('HomeApp: render: isActive = ', isActive);
         // console.log('HomeApp: render: routeName = ', routeName);

         return (
             <View style={styles.container} >

                 <LinearGradient
                     colors={['#FFFFFF', '#FFFFFF']}
                     style={{position: 'relative', flex: 1, width: width,
                             justifyContent: 'center', alignItems: 'center' }}>

                     {device != null ?
                         this.renderConnectedDevice() :
                         <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50, }} >
                             <View style={{
                                 width: width * 0.75,
                                 height: width * 0.75
                             }} >
                                 <AnimationComponent
                                     width={width * 0.75}
                                     height={width * 0.75}
                                     source={require('../../assets/lottie/empty_box.json')} />
                             </View>
                             <View style={{marginTop: 30}} >
                                 <View>
                                     <Text style={{backgroundColor: 'white'}} >
                                         Please connect your sensor.
                                     </Text>
                                 </View>
                                 <View style={{marginTop: 30}} >
                                     <KaaButton text={'CONNECT'} onPress={() => {
                                         setTimeout(() => {
                                             goToSettings();
                                         }, 100)
                                         scan();
                                     }} />
                                 </View>
                             </View>
                         </View>
                     }

                     {lastPoint == undefined ? null :
                         <View style={{alignItems: 'center', justifyContent: 'center',
                                        width: width * 0.6, height: width * 0.4, position: 'relative'
                         }} >
                             <AnimationComponent
                                 width={0.6 * width}
                                 height={0.4 * width}
                                 startTime={lastPoint.t}
                                 source={require('../../assets/lottie/heart_like_.json')} />

                             <View style={{position: 'absolute', top: 0,
                                        zIndex: 1000,
                                        bottom: 0, left: 0, right: 0,
                                        paddingBottom: 0.05 * width,
                                        alignItems: 'center', justifyContent: 'center'}} >
                                 {lastPoint == undefined ? null :
                                     <Text style={{textAlign: 'center',
                                            backgroundColor: 'white',
                                            fontSize: 20,
                                            color: mvConsts.colors.heartColor, fontWeight: 'bold'}} >
                                         {Math.round(60000.0 / lastPoint.rr)}
                                     </Text>
                                 }
                             </View>

                         </View>
                     }


                     <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}} >
                         <RealtimeChart />
                     </View>

                 </LinearGradient>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         position: 'relative'
     },

     device: {
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: mvConsts.bigRadius,
         height: 80,
         width: width,
         flexDirection: 'row',
         // position: 'relative',
         position: 'absolute',
         top: 50,
         left: 0,
         right: 0,
         backgroundColor: 'white'
     },

     connectedItem: {
         backgroundColor: mvConsts.colors.kaaColor
     },

     deviceInfoPlaceholder: {
         alignItems: 'center',
         justifyContent: 'center',
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

     stopPlaceholder: {
         fontSize: 14,
         opacity: 0.4
     },

 });

 let getConnectedDevice = (state) => {
    let {devicesMap, connectedSet} = state.ble;
    let devices = devicesMap.toArray().filter(dev => (connectedSet.has(dev.id)))
     if (devices.length == 0){
         return undefined;
     }
     return devices[0];
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav,
        routeName: ownProps.navigation.state.routeName,
        isActive: (ownProps.navigation.state.routeName == 'Home'),
        lastPoint: KaaHelper.getConnectedDeviceLastPoint(state),
        device: KaaHelper.getConnectedDevice(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        goToSettings: () => {
            return dispatch(NavigationActions.navigate({
                routeName: 'Settings'
            }))
        },
        scan: () => {
            return dispatch(actions.scanBluetoothDevices())
        },
        disconnect: (deviceId) => {
            return dispatch(recActions.stopSession()).then(
                () => {
                    dispatch(actions.disconnectDevice(deviceId))
                }
            )
        }

    }
 }

 HomeApp = connect(mapStateToProps, mapDispatchToProps)(HomeApp)

 export default HomeApp