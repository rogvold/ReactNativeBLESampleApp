/**
 * Created by sabir on 11.10.17.
 */

const mockBluetoothTimeout = 3000;

const BluetoothAPI = {

    initBluetooth(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, mockBluetoothTimeout)
        })
    }

}

export default BluetoothAPI;