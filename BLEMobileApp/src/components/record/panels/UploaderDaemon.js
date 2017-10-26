/**
 * Created by sabir on 26.10.17.
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

 import KaaHelper from '../../../helpers/KaaHelper'

import * as actions from '../../../redux/actions/RecordActions'

 class UploaderDaemon extends React.Component {

     static defaultProps = {
         interval: 2 * 1000
     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        this.initTimer();
     }

     componentWillReceiveProps() {

     }

     initTimer(){
         if (this.intervalId != undefined){
             return;
         }
         this.intervalId = setInterval(() => {
             this.onTick();
         }, this.props.interval)
     }

     destroyInterval(){
         if (this.intervalId != undefined){
             clearInterval(this.intervalId);
             this.intervalId = undefined;
         }
     }

     componentWillUnmount(){
        this.destroyInterval();
     }

     onTick(){
         let {sessionTimestamp, points, uploadData, recorderLoading, currentUserId} = this.props;
         console.log('onTick occured: sessionTimestamp = ', sessionTimestamp);
         // console.log('onTick occured: points = ', points);
         console.log('onTick occured: points.length, recorderLoading = ', points.length, recorderLoading);
         if (sessionTimestamp == undefined || points == undefined || points.length == 0){
             return;
         }
         if (recorderLoading == true || currentUserId == true){
             return;
         }
         uploadData(points);
     }

     render = () => {
         let {sessionTimestamp} = this.props;

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


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        sessionTimestamp: state.record.sessionTimestamp,
        points: KaaHelper.getNotUploadedPoints(state),
        recorderLoading: state.record.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        uploadData: () => {
            return dispatch(actions.uploadPoints())
        }
    }
 }

 UploaderDaemon = connect(mapStateToProps, mapDispatchToProps)(UploaderDaemon)

 export default UploaderDaemon