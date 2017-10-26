import * as config from '../constants/config'

var PORT = 10721
var HOST = 'dev-hrv-monitor.kaaiot.net'

var options = {
    port: PORT,
    host: HOST
}

import axios from 'axios'

const KaaAPI = {

    getAllEndpoints(){
        let url = config.KAA_BASE_URL + 'endpoints/tokens';
        return new Promise((resolve, reject) => {
            axios.get(url, {params: {}}).then((response) => {
                console.log('response = ', response);
                let {content, totalElements} = response.data;
                console.log('content = ', content);
                console.log('totalElements = ', totalElements);
                resolve(content)
            })
        })
    },

    getAllSessionsByUserId(userId, fromTimestamp, toTimestamp){
        let url = config.KAA_BASE_URL + 'endpoints/tokens/' + userId;
        let topicUrl = config.KAA_BASE_URL + 'time-series/SessionsTs/data';
        return new Promise((resolve, reject) => {
            axios.get(url, {params: {}}).then((response) => {
                console.log(response);
                let {endpointId} = response;
                axios.get(topicUrl, {
                    params: {
                        fromDate: new Date((fromTimestamp == undefined ? 0 : fromTimestamp)),
                        toDate: new Date(toTimestamp),
                    }
                }).then((resp) => {
                    console.log('resp = ', resp);
                    resolve(resp);
                })
            })
        })
    },

    getUserPoints(userId, fromTimestamp, toTimestamp){
        let url = config.KAA_BASE_URL + 'endpoints/tokens/' + userId;
        let topicUrl = config.KAA_BASE_URL + 'time-series/RespiratoryRateTs/data';
        return new Promise((resolve, reject) => {
            axios.get(url, {params: {}}).then((response) => {
                console.log(response);
                let {endpointId} = response;
                axios.get(topicUrl, {
                    params: {
                        fromDate: new Date((fromTimestamp == undefined ? 0 : fromTimestamp)),
                        toDate: new Date(toTimestamp),
                    }
                }).then((resp) => {
                    console.log('resp = ', resp);
                    resolve(resp);
                })
            })
        })
    },

    publishToKaa(topic, data){
        console.log('publishToKaa: topic, data = ', topic, data);
        let url = config.KAA_SABIR_PUBLISH_PROXY_URL;
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: {
                    topic: topic,
                    data: JSON.stringify(data)
                }
            }).then((response) => {
                console.log('publishToKaa: published!');
                console.log('resolving with response = ', response);
                resolve(response);
            })
        })
    },

    saveSensorMetaInfo(sensorId, info){
        let topic = `kp1/hrv_devices_v1/epmx/${sensorId}/update`;
        if (info == undefined){
            info = {
                deviceName:"Polar SabirTest GX",
                uid:"F1B85E018D55",
                hwvr:"GASM Beta rev.1",
                swvr:"v0.4-RC5",
                location:"Moscow"
            }
        }
        return this.publishToKaa(topic, info);
    },

    saveSensorLogs(sensorId, logs){
        let topic = `kp1/hrv_devices_v1/dcx/${sensorId}/json`;
        if (logs == undefined){
            logs = [{
                timestamp: +new Date(),
                logLevel:"DEBUG",
                message: "Sensor published next data [SensorDataDto(rr=5.23, ts=1508752990061, latitude=33.88616519629805, longitude=-108.23599158679193)]"
            }]
        }
        return this.publishToKaa(topic, logs);
    },

    startSession(userId, sensorId){
        console.log('startSession occured: userId. sensorId = ', userId, sensorId);
        let topic = `kp1/hrv_patients_v1/dcx/${userId}/json`;
        console.log('topic = ', topic);
        let payload = [{
            "timestamp": +new Date(),
            "boundary": "start",
            "sensorID": sensorId
        }];
        return this.publishToKaa(topic, payload);
    },

    stopSession(userId, sensorId){
        console.log('stopSession occured: userId. sensorId = ', userId, sensorId);
        let topic = `kp1/hrv_patients_v1/dcx/${userId}/json`;
        let payload = [  {
            "timestamp": +new Date(),
            "boundary": "end",
            "sensorID": sensorId
        }]
        this.publishToKaa(topic, payload);
    },

    //format: [{rr: 123, t: 12121212}, {rr: 123, t: 11212212}]
    savePoints(userId, sessionStartTimestamp, points){
        //todo: remove it
        // let now = +new Date();
        // let defaultPoints = [{
        //     rr: 555,
        //     t: now - 3 * 1000
        // }, {
        //     rr: 666,
        //     t: now - 2 * 1000
        // }, {
        //     rr: 777,
        //     t: now - 1 * 1000
        // }]
        // points = defaultPoints;
        // sessionStartTimestamp = now - 3 * 1000;
        // if (userId == undefined){userId = 'sabirUserId'}
        //____

        let topic = `kp1/hrv_patients_v1/dcx/${userId}/json`;
        let payload = points.map((p) => {return {
            startTimestamp: sessionStartTimestamp,
            timestamp: p.t,
            rr: p.rr
        }});
        return this.publishToKaa(topic, payload);
    }



}

export default  KaaAPI