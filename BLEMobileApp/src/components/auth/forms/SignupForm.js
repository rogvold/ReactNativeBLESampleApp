/**
 * Created by sabir on 28.09.17.
 */

import * as mvConsts from '../../../constants/mvConsts'
const window = mvConsts.window

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

import isEmail from 'validator/lib/isEmail';

class SignupForm extends React.Component {

    static defaultProps = {
        title: 'Регистрация',
        buttonText: 'Создать аккаунт',

        loading: false,

        onSubmit: (data) => {

        },

        bottomContent: undefined

    }

    static propTypes = {}

    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {title, buttonText, bottomContent, onSubmit, loading} = this.props;
        let {email, password, confirmPassword} = this.state;

        return (
            <View style={{width: window.width * 0.85, paddingTop: window.height * 0.05,  paddingBottom: window.height * 0.02, backgroundColor: mvConsts.colors.maincolor, borderRadius: mvConsts.bigRadius * 2, alignItems: 'center', justifyContent: 'center', }}>

                <View style={{width: window.width * 0.7, paddingBottom: window.height * 0.03, }}>
                    <Text style={{fontFamily: mvConsts.fonts.bold, fontSize: mvConsts.fontSizeMiddle * 1.5, color: mvConsts.colors.fontColorMain, }} >
                        {title}
                    </Text>
                </View>

                <TextInput
                    style={{width: window.width * 0.7, margin: window.height * 0.02,
                             fontFamily: mvConsts.fonts.regular, fontSize: mvConsts.fontSizeMiddle,
                             color: mvConsts.colors.fontColorMain, }}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    placeholder={'Email'}
                    secureTextEntry={false}
                    value={email}
                    keyboardType={'email-address'}
                    onChangeText={(txt) => {
                         this.setState({
                             email: txt
                         });
                     }}
                />

                <TextInput
                    style={{width: window.width * 0.7, margin: window.height * 0.02,
                             fontFamily: mvConsts.fonts.regular, fontSize: mvConsts.fontSizeMiddle,
                             color: mvConsts.colors.fontColorMain, }}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    value={password}
                    placeholder={'Пароль'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onChangeText={(txt) => {
                         this.setState({
                             password: txt
                         });
                     }}
                />

                <TextInput
                    style={{width: window.width * 0.7, margin: window.height * 0.02,
                             fontFamily: mvConsts.fonts.regular, fontSize: mvConsts.fontSizeMiddle,
                             color: mvConsts.colors.fontColorMain, }}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    value={confirmPassword}
                    placeholder={'Повторите пароль'}
                    secureTextEntry={true}
                    keyboardType={'default'}
                    onChangeText={(txt) => {
                         this.setState({
                             confirmPassword: txt
                         });
                     }}
                />

                <TouchableOpacity
                    style={{marginTop: window.height * 0.02, width: window.width * 0.7, height: window.height * 0.075, backgroundColor: mvConsts.colors.disabledfont, borderRadius: window.height * 0.05, alignItems: 'center', justifyContent: 'center', }}
                    onPress={() => {
                        if ((password != confirmPassword) || (isEmail(email) == false)){
                            return;
                        }
                        onSubmit({email, password})
                     }}
                >
                    {loading == false ?
                        <Text style={{fontFamily: mvConsts.fonts.regular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.colors.maincolor, }} >
                            {buttonText}
                        </Text> : <ActivityIndicator color={mvConsts.colors.maincolor} />
                    }
                </TouchableOpacity>

                {bottomContent == undefined ? null :
                    bottomContent
                }

            </View>
        )
    }

}

export default SignupForm