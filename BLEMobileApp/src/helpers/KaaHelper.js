/**
 * Created by sabir on 14.10.17.
 */


const KaaHelper = {


    getDevicePoints(state, deviceId){
        let {devicesMap, connectedSet, dataMap} = state.ble;
        let d = dataMap.get(deviceId);
        if (d == undefined){
            return [];
        }
        return d;
    },

    getConnectedDevice(state){
        let {devicesMap, connectedSet} = state.ble;
        let devices = devicesMap.toArray().filter(dev => (connectedSet.has(dev.id)));
        if (devices.length == 0){
            return undefined;
        }
        return devices[0];
    },

    getConnectedDevicePoints(state){
        let conDevice = this.getConnectedDevice(state);
        if (conDevice == undefined){
            return [];
        }
        let points = this.getDevicePoints(state, conDevice.id);
        return points;
    },

    getConnectedDeviceLastPoint(state){
        let points = this.getConnectedDevicePoints(state);
        if (points.length == 0){
            return undefined;
        }
        return points[points.length - 1];
    },

    getDeviceAvatarSourceByType(deviceType){
        if (deviceType == 'watches'){
            return require('../assets/images/mio_al.png')
        }
        return require('../assets/images/polarH7_2.png')
    },

    getNotUploadedPoints(state){
        console.log('getNotUploadedPoints occured');
        let {uploadedSet, sessionTimestamp} = state.record;
        let {dataMap} = state.ble;
        if (sessionTimestamp == undefined){
            return [];
        }
        let allPoints = dataMap.toArray().reduce((arr, pts) => {return arr.concat(pts)}, []);
        // console.log('allPoints = ', allPoints);
        let points = allPoints.filter(p => (+p.t > +sessionTimestamp))
                                .filter(p => (uploadedSet.has(p.id) == false))
                                .sort((a, b) => (+a.t - +b.t))
        // console.log('points = ', points);
        return points;
    },

    getPrettyDuration(durMilliseconds){
        let durSec = Math.floor(durMilliseconds / 1000.0);
        let minutes = Math.floor(durSec / 60);
        let seconds = durSec % 60;
        if (minutes < 10){
            minutes = '0' + minutes;
        }
        if (seconds < 10){
            seconds = '0' + seconds;
        }
        let s = minutes + ':' + seconds;
        return s;
    }

}

export default KaaHelper