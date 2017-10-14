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
    }

}

export default KaaHelper