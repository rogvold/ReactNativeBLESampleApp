/**
 * Created by sabir on 11.10.17.
 */

const MOCK_BLUETOOTH_INIT_TIMEOUT = 3000;
const MOCK_BLUETOOTH_SCAN_TIMEOUT = 3500;
// const MOCK_BLUETOOTH_CONNECT_TIMEOUT = 300;
const MOCK_BLUETOOTH_CONNECT_TIMEOUT = 1500;

const MOCK_DEVICES = [
    {
        name: 'Polar H7 ',
        id: '00:22:D0:33:1E:0F',
        type: 'strap'
    },
    {
        name: 'Polar H7 ',
        id: '00:22:A0:33:27:02',
        type: 'strap'
    },
    {
        name: 'Mio Global',
        id: '00:22:A1:BA:37:05',
        type: 'watches'
    },
    {
        name: 'Polar H7',
        id: '00:22:D3:A1:65:12',
        type: 'strap'
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