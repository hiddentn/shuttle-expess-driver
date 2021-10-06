
import { IShuttleExpress } from '../types';
import { ShuttleExpressHandler } from './ShuttleExpressHandler';

export const init = async (): Promise<IShuttleExpress> => {

    if (navigator.hid) {
        const devices = await navigator.hid.requestDevice({ filters: [] });
        if (devices && devices.length) {
            const shuttleDevice = devices[0];
            await shuttleDevice.open();
            return new ShuttleExpressHandler(shuttleDevice);
        } else {
            console.warn('Cant find Device');
            return null;
        }
    } else {
        console.warn('HID Unsupported');
        return null;
    }
};