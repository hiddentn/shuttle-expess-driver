
declare global {

interface HIDDeviceFilter {
    vendorId: number;
    productId: number;
    usagePage: number;
    usage: number;
}

interface HIDDeviceRequestOptions {
    filters?: HIDDeviceFilter[];
}

interface HIDDevice {
    open: () => Promise<void>;
    oninputreport: (e: InputReportEvent) => void;
}

interface HID {

    onconnect: (...arg: any[]) => any;
    ondisconnect: (...arg: any[]) => any;

    getDevices: () => Promise<HIDDevice>;
    requestDevice: (options: HIDDeviceRequestOptions) => Promise<HIDDevice[]>;
}

interface InputReportEvent {
    data: DataView;
}

    interface Navigator {
        readonly hid: HID;
    }
}
export {};