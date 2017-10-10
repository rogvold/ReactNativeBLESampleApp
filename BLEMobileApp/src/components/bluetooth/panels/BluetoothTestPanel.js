/**
 * Created by sabir on 10.10.17.
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

 class BluetoothTestPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
         this.manager = new BleManager()
         this.state = {info: "", values: {}}
         this.prefixUUID = "f000aa"
         this.suffixUUID = "-0451-4000-b000-000000000000"
         this.sensors = {
             0: "Temperature",
             1: "Accelerometer",
             2: "Humidity",
             3: "Magnetometer",
             4: "Barometer",
             5: "Gyroscope"
         }
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     render = () => {
         let {info, values} = this.state;

         return (
             <View style={styles.container} >

                 <Text>Info: {info}</Text>
                 <Text>Values: {JSON.stringify(values)}</Text>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
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

 //BluetoothTestPanel = connect(mapStateToProps, mapDispatchToProps)(BluetoothTestPanel)

 export default BluetoothTestPanel