/**
 * Created by sabir on 27.10.17.
 */

import * as mvConstants from '../../../constants/mvConsts'
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

 class UserPanel extends React.Component {

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
         let {user} = this.props;
         if (user == undefined){
             return null;
         }
         let {avatar, firstName, lastName} = user;
         let userAvatar = (avatar == undefined) ? mvConstants.DEFAULT_AVATAR : avatar;

         let avatarSide = width / 4.0;

         return (
             <View style={styles.container} >

                 <View style={{alignItems: 'center', justifyContent: 'center'}} >
                     <Image
                         style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2, }}
                         source={{uri: userAvatar}} />
                 </View>

                 <View style={{alignItems: 'center', justifyContent: 'center'}} >

                     <Text style={{fontWeight: mvConstants.fonts.bold,
                                   fontSize: mvConstants.fontSizeMiddle * 1.2}} >
                         {firstName} {' '} {lastName}
                     </Text>

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
     },

 });

 let getUser = (state, userId) => {
     let uId = (userId == undefined) ? state.users.currentUserId : userId;
     return state.users.usersMap.get(uId)
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        user: getUser(state, ownProps.userId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 UserPanel = connect(mapStateToProps, mapDispatchToProps)(UserPanel)

 export default UserPanel