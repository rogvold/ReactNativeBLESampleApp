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

 import BluetoothDevicesPanel from '../bluetooth/panels/BluetoothDevicesPanel'

 import RealtimeChart from '../charts/panels/RealtimeChart'

 import { LinearGradient } from 'expo';

  import AnimationComponent from '../animations/AnimationComponent'

 import KaaHelper from '../helpers/KaaHelper'

 import KaaButton from '../buttons/KaaButton'

 import {NavigationActions} from 'react-navigation'

 import * as actions from '../../redux/actions/BluetoothActions'

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

     render = () => {
         let { nav, isActive, routeName, lastPoint, device, goToSettings, scan} = this.props;
         // console.log('HomeApp: render: isActive = ', isActive);
         // console.log('HomeApp: render: routeName = ', routeName);

         return (
             <View style={styles.container} >

                 <LinearGradient
                     colors={['#FFFFFF', '#FFFFFA']}
                     style={{position: 'relative', flex: 1, width: width,
                             justifyContent: 'center', alignItems: 'center' }}>

                     {device != null ?
                         <View>

                         </View> :
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
                                        width: width * 0.5, height: width * 0.5
                         }} >
                             <AnimationComponent
                                 width={0.5 * width}
                                 height={0.5 * width}
                                 startTime={lastPoint.t}
                                 source={require('../../assets/lottie/heart_like_.json')} />
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
        }

    }
 }

 HomeApp = connect(mapStateToProps, mapDispatchToProps)(HomeApp)

 export default HomeApp