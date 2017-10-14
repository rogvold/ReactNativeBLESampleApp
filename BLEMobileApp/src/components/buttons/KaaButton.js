/**
 * Created by sabir on 14.10.17.
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

 import * as mvConsts from '../../constants/mvConsts'
 const {width, height} = mvConsts.window;

 class KaaButton extends React.Component {

     static defaultProps = {
         width: 0.5 * width,
         height: 50,

         fontSize: 20,

         text: 'TEXT',

         onPress: () => {

         }

     }

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
         let {width, height, text, onPress, fontSize} = this.props;

         return (
             <TouchableOpacity
                 onPress={() => {
                     onPress()
                 }}
                 style={{
                     width: width,
                     height: height,
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: mvConsts.colors.kaaColor,
                     borderRadius: height / 2.0
             }} >

                <Text style={{textAlign: 'center', color: 'white', fontSize: fontSize}} >
                    {text}
                </Text>

             </TouchableOpacity>
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

 //KaaButton = connect(mapStateToProps, mapDispatchToProps)(KaaButton)

 export default KaaButton