/**
 * Created by sabir on 11.10.17.
 */

const MOCK_BLUETOOTH_INIT_TIMEOUT = 3000;
const MOCK_BLUETOOTH_SCAN_TIMEOUT = 1500;
const MOCK_BLUETOOTH_CONNECT_TIMEOUT = 300;

const MOCK_DEVICES = [
    {
        name: 'sensor_id_1',
        id: 'AA:BB:CC:00'
    },
    {
        name: 'sensor_id_2',
        id: 'AA:BB:CC:01'
    },
    {
        name: 'sensor_id_3',
        id: 'AA:BB:CC:02'
    },
    {
        name: 'sensor_id_4',
        id: 'AA:BB:CC:03'
    },
    {
        name: 'sensor_id_5',
        id: 'AA:BB:CC:04'
    }
]

const BluetoothAPI = {

    initBluetooth(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(MOCK_DEVICES)
            }, MOCK_BLUETOOTH_INIT_TIMEOUT)
        })
    },

    scanDevices(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(MOCK_DEVICES)
            }, MOCK_BLUETOOTH_SCAN_TIMEOUT)
        })
    },

    connectToDevice(deviceId){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(MOCK_DEVICES.filter(d => (d.id == deviceId))[0])
            }, MOCK_BLUETOOTH_CONNECT_TIMEOUT)
        })
    }

}

export default BluetoothAPI;