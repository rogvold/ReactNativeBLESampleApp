/**
 * Created by sabir on 29.10.17.
 */

 import React, {PropTypes} from 'react';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';

 import * as mvConsts from '../../../constants/mvConsts'
 const window = mvConsts.window
 let {width, height} = window;

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

 import * as sessionsActions from '../../../redux/actions/SessionsActions'

 import moment from 'moment'

 class UserSessionsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         let {loadUserSessions, userId} = this.props;
         if (userId != undefined){
             loadUserSessions(userId);
         }
     }

     componentWillReceiveProps() {

     }

     render = () => {
        let {sessions, loading} = this.props;

         return (
             <View style={styles.container} >

                 {sessions.map((sess, k) => {
                     let {startTimestamp, endTimestamp} = sess;
                     return (
                         <TouchableOpacity key={sess.id}
                                           style={{
                                                padding: 10,
                                                width: width - 20,
                                                marginBottom: height * 0.05, backgroundColor: 'white',
                                                borderRadius: mvConsts.bigRadius
                                           }} >
                             <View >
                                 <Text style={{fontWeight: 'bold', fontSize: mvConsts.fontSizeMiddle}} >
                                     {moment(startTimestamp).format('MMMM, D')}
                                 </Text>
                             </View>
                             <View style={{marginTop: 10, opacity: 0.6, flexDirection: 'row'}} >
                                 <Text>
                                     {moment(startTimestamp).format('HH:mm:ss')}
                                 </Text>
                                 {endTimestamp == undefined ? null :
                                     <Text>
                                         {' - ' + moment(endTimestamp).format('HH:mm:ss')}
                                     </Text>
                                 }
                             </View>
                         </TouchableOpacity>
                     )
                 })}

             </View>
         )
     }

 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 10
     },

 });


const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.sessions.loading,
        sessions: state.sessions.sessionsMap.toArray()
                        .filter(s => (s.userId == ownProps.userId))
                        .sort((a, b) => (b.startTimestamp - a.startTimestamp))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserSessions: (userId) => {
            return dispatch(sessionsActions.loadUserKaaSessions(userId))
        }
    }
}

UserSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(UserSessionsPanel)

 export default UserSessionsPanel