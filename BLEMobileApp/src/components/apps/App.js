/**
 * Created by sabir on 10.10.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import { addNavigationHelpers } from 'react-navigation';

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

 import AppNavigator from '../../navigation/AppNavigator'

 import BluetoothDaemonPanel from '../bluetooth/panels/BluetoothDaemonPanel'

 class App extends React.Component {

     render = () => {

         return (
             <View style={{flex: 1}} >
                 <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                  })} />

                 <BluetoothDaemonPanel />

             </View>

         )
     }

 }

const mapStateToProps = (state) => ({
    nav: state.nav
});

 App = connect(mapStateToProps)(App);

 export default App