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
         let { nav, isActive, routeName} = this.props;
         console.log('HomeApp: render: isActive = ', isActive);
         console.log('HomeApp: render: routeName = ', routeName);

         return (
             <View style={styles.container} >


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });

 const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav,
        routeName: ownProps.navigation.state.routeName,
        isActive: (ownProps.navigation.state.routeName == 'Home')
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 HomeApp = connect(mapStateToProps, mapDispatchToProps)(HomeApp)

 export default HomeApp