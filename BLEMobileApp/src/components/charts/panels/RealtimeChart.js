/**
 * Created by sabir on 13.10.17.
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

 import moment from 'moment'

 import { SmoothLine, StockLine, Scatterplot } from 'react-native-pathjs-charts'

 class RealtimeChart extends React.Component {

     static defaultProps = {
         maxPointsNumber: 20
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
         let {points, maxPointsNumber} = this.props;
         let pts = points.slice(-maxPointsNumber).map(pt => {
            let hr = (Math.round(60000.0 / pt.rr));
            return {
                ...pt,
                hr: hr
            }
         });
         if (points.length == 0){
             return null;
         }
         pts = [{...pts[0], hr: 0}].concat(pts)
         let chartData = [pts];

         if (Platform.OS == 'android'){
             return null;
         }

         return (
             <View style={{
                           borderRadius: mvConsts.littleRadius,
                           width: +defaultOptions.width + +defaultOptions.margin.left + +defaultOptions.margin.right,
                           height: +defaultOptions.height +defaultOptions.margin.top + +defaultOptions.margin.bottom
             }} >
                 {Platform.OS == 'ios' ?
                     <SmoothLine data={chartData} options={defaultOptions} pallete={pallete}
                                 xKey='t' yKey='hr' /> :
                     <View>
                        <Text> </Text>
                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });


const pallete = [
    // {'r':45,'g':175,'b':199},
    {'r':247,'g':84,'b':95},
    {'r':24,'g':175,'b':35},
    {'r':190,'g':31,'b':69},
    {'r':100,'g':36,'b':199}];

const defaultOptions = {
    // width: width * 0.8,
    width: width * 1.0,
    height: height * 0.25,
    // color: mvConsts.colors.goodBlue,
    color: mvConsts.colors.kaaColor,
    r: 3,
    margin: {
        // top: 0,
        top: 20,
        bottom: 0,
        left: 0,
        right: 0
    },
    // animate: {
    //     type: 'delayed',
    //     duration: 200
    // },
    axisX: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        // orient: 'bottom',
        labelFunction: ((v) => {
            return moment(v).format('mm:ss')
        }),
        label: {
            fontFamily: 'Arial',
            fontSize: 10,
            fontWeight: true,
            fill: '#34495E'
        },

    },
    axisY: {
        showAxis: false,
        showLines: false,
        // showLabels: true,
        showLabels: false,
        showTicks: false,
        zeroAxis: true,
        orient: 'left',
        label: {
            fontFamily: 'Arial',
            fontSize: 12,
            fontWeight: false,
            fill: '#34495E'
        }
    }
}

let getDeviceData = (state, deviceId) => {
    let {dataMap} = state.ble;
    let d = dataMap.get(deviceId);
    if (d == undefined){
        return [];
    }
    return d;
}

let getConnectedDevice = (state) => {
    let {devicesMap, connectedSet} = state.ble;
    let devices = devicesMap.toArray().filter(dev => (connectedSet.has(dev.id)));
    if (devices.length == 0){
        return undefined;
    }
    return devices[0];
}

let connectedDeviceData = (state) => {
    let dev = getConnectedDevice(state);
    if (dev == undefined){
        return [];
    }
    return getDeviceData(state, dev.id);
}

 const mapStateToProps = (state) => {
    return {
        points: connectedDeviceData(state)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 RealtimeChart = connect(mapStateToProps, mapDispatchToProps)(RealtimeChart)

 export default RealtimeChart