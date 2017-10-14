/**
 * Created by mityabeldii on 10.06.2017.
 */

import { Animated, Dimensions, Easing, AlertIOS, } from 'react-native'

export const window = {
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
    height: Math.max(Dimensions.get('window').width, Dimensions.get('window').height),
}

// Values
export const littleRadius = window.height *  0.01056;
export const bigRadius = window.height * 0.0176;
export const animationOpcityScDuration = 300;
export const passwordLenght = 1;
export const fontSizeMiddle = window.height * 0.03;

export const NAVBAR_HEIGHT = 54;

export const DEFAULT_AVATAR = 'https://drive.sabir.pro/files/GQCiG6m54lQyV6yIiUaV.jpg';

//USER MODE
export const HOME_SCREEN_NUMBER = 0;
export const STATS_SCREEN_NUMBER = 1;
export const CHAT_SCREEN_NUMBER = 2;
export const SETTINGS_SCREEN_NUMBER = 3;

//DOCTOR MODE
export const PATIENTS_SCREEN_NUMBER = 0;
export const DOCTOR_SETTINGS_SCREEN_NUMBER = 1;

export const NEW_MORNING_MEASUREMENT_TYPE = 'NEW_MORNING_MEASUREMENT';
export const NEW_EVENING_MEASUREMENT_TYPE = 'NEW_EVENING_MEASUREMENT';

export const MEASUREMENT_WEEK_RANGE = 'WEEK'
export const MEASUREMENT_MONTH_RANGE = 'MONTH'
export const MEASUREMENT_3_MONTHS_RANGE = '3_MONTHS'
export const MEASUREMENT_YEAR_RANGE = 'YEAR'
export const MEASUREMENT_OVERALL_RANGE = 'OVERALL'

export const fonts = {
    regular: 'regular',
    bold: 'bold',
    light: 'light',
    medium: 'medium',
}

export const colors = {
    maincolor: '#FFFFFF',

    // lightGreenBackground: '#dcffee',
    lightGreenBackground: '#d2f0e1',

    disabledback: '#e7e7e7',
    disabledfont: '#B0B7BE',
    darkfont: '#808890',
    lightselectedcolor: '#f6f6f6',
    selectedcolor: '#dedede',
    secondarycolor: '#32C73C',
    halfopacityssecondary: 'rgba(32,145,250,0.9)',
    contrastcolor: '#e63333',
    acceptcolor: '#1db22a',
    fontColorMain: '#000000',

    // calendarCompletedBackground: '#7ADDD5',
    calendarCompletedBackground: '#20C6AE',
    calendarNotCompletedBackground: '#FEDF5A',

    eveningColor: '#9b59b6',
    morningColor: '#16a085',

    // goodBlue: '#1F6FD6',
    goodBlue: '#2DAFC7',
    kaaColor: '#F5AC4D',

}

// Shadow Props
// shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset,
export const shadowColor = '#000000';
export const shadowRadius = 3.5;
export const shadowOpacity = 0.2;
export const shadowOffset = {width: 0, height: 0};
