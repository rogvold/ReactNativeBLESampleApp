/**
 * Created by sabir on 06.11.17.
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

 import * as bleActions from '../../redux/actions/BluetoothActions'

 class FakeSwitcherPanel extends React.Component {

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
         let {enableFake, disableFake, fakeEnabled} = this.props;

         return (
             <TouchableOpacity style={styles.container} onPress={() => {
                 if (fakeEnabled == true){
                     disableFake();
                 }else {
                     enableFake();
                 }
             }} >

                 {fakeEnabled == true ?
                     <Text>
                         Fake points enabled
                     </Text> :
                     <Text>
                         Fake points disabled
                     </Text>
                 }

             </TouchableOpacity>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         height: 30,
         alignItems: 'center',
         justifyContent: 'center'
     },

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        fakeEnabled: state.ble.fakeEnabled
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        enableFake: () => {
            return dispatch(bleActions.turnOnFake())
        },
        disableFake: () => {
            return dispatch(bleActions.turnOffFake())
        }
    }
 }

 FakeSwitcherPanel = connect(mapStateToProps, mapDispatchToProps)(FakeSwitcherPanel)

 export default FakeSwitcherPanel