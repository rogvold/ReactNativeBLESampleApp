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
                // console.log('resolving with response = ', response);
                resolve(response);
            }).catch((err) => {
                console.log('!!!!    ERROR while uploading to KAA!!! err = ', err);
                reject(err)
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
        return this.publishToKaa(topic, payload);
    },

    //format: [{rr: 123, t: 12121212}, {rr: 123, t: 11212212}]
    savePoints(userId, sessionStartTimestamp, points){
        console.log('savePoints: userId, sessionStartTimestamp, points', userId, sessionStartTimestamp, points)
        let topic = `kp1/hrv_patients_v1/dcx/${userId}/json`;
        let payload = points.map((p) => {return {
            startTimestamp: sessionStartTimestamp,
            timestamp: p.t,
            rr: p.rr
        }});
        return this.publishToKaa(topic, payload);
    },

    getAllSessionsByUserId(userId, fromTimestamp, toTimestamp){
        let url = config.KAA_BASE_ENDPOINT_URL + 'endpoints/tokens/' + userId;
        let topicUrl = config.KAA_BASE_URL + 'time-series/SessionsTs/data';
        console.log('KaaAPI: getAllSessionsByUserId: url, topicUrl = ', url, topicUrl);
        let toDateString = (toTimestamp == undefined) ? (new Date()) : (new Date(toTimestamp))
        let fromDateString = (fromTimestamp == undefined) ? (new Date(0)) : (new Date(fromTimestamp))
        return new Promise((resolve, reject) => {
            axios.get(url, {params: {}}).then((response) => {
                console.log('got endpoint result: response = ', response);
                let {endpointId} = response.data;
                console.log('endpointId = ', endpointId);
                axios({
                    url: topicUrl,
                    method: 'get',
                    params: {
                        fromDate: fromDateString,
                        toDate: toDateString,
                        endpointId: endpointId
                    }
                }).then((resp) => {
                    console.log('getAllSessionsByUserId: resp = ', resp);
                    let getNearestEnd = (isoTimestamp) => {
                        let aT = +new Date(isoTimestamp);
                        let eSessions = resp.data.filter(sess => (sess.value == 'end')).map(sess => {
                            return {
                                ...sess,
                                t: +new Date(sess.timestamp)
                            }
                        }).sort((a, b) => (a.t - b.t));
                        for (let i in eSessions){
                            if (+eSessions[i].t > aT){
                                return eSessions[i].t;
                            }
                        }
                        return undefined;
                        // return (+new Date())
                    }
                    let sessions = resp.data.filter(sess => (sess.value == 'start')).map(sess => {
                        return {
                            id: userId + '_' + sess.timestamp,
                            userId: userId,
                            sensorId: sess.tags.sensorID,
                            timestamp: new Date(sess.timestamp),
                            startTimestamp: +new Date(sess.timestamp),
                            endTimestamp: getNearestEnd(sess.timestamp)
                        }
                    });
                    console.log('getAllSessionsByUserId: resolving sessions = ', sessions);
                    resolve(sessions);
                }).catch(
                    err => {
                        console.log('KaaAPI: getAllSessionsByUserId: err = ', err);
                        return reject(err)
                    }
                )
            })
        })
    },

    getUserPoints(userId, fromTimestamp, toTimestamp){
        let url = config.KAA_BASE_ENDPOINT_URL + 'endpoints/tokens/' + userId;
        let topicUrl = config.KAA_BASE_URL + 'time-series/RespiratoryRateTs/data';
        // let offset = 30 * 1000;
        let offset = 300 * 1000;
        if (fromTimestamp != undefined) {fromTimestamp = +fromTimestamp - +offset;}
        if (toTimestamp != undefined) {toTimestamp = +toTimestamp + +offset;}

        let toDateString = (toTimestamp == undefined) ? (new Date()) : (new Date(toTimestamp))
        let fromDateString = (fromTimestamp == undefined) ? (new Date(0)) : (new Date(fromTimestamp))
        console.log('getUserPoints: fromDateString, toDateString = ', fromDateString, toDateString);
        return new Promise((resolve, reject) => {
            axios.get(url, {params: {}}).then((response) => {
                console.log(response);
                let {endpointId} = response.data;
                axios.get(topicUrl, {
                    params: {
                        fromDate: fromDateString,
                        toDate: toDateString,
                        endpointId: endpointId
                    }
                }).then((resp) => {
                    console.log('resp = ', resp);
                    let {data} = resp;
                    console.log('getUserPoints: data = ', data);
                    let points = data.map(pt => {
                        return {
                            t: +new Date(pt.timestamp),
                            rr: pt.value
                        }
                    });
                    resolve(points);
                });
            }).catch(err => reject(err))
        })
    },



}

export default  KaaAPI