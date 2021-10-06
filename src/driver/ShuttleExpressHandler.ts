
import { ShuttleEvents, SHUTTLE_BTNS } from '../constants';
import { EventMap, IShuttleExpress, ShuttleEventHandler } from '../types';

export class ShuttleExpressHandler implements IShuttleExpress {

    eventsMap: EventMap = {
        'shuttleebuttonup': [],
        'shuttleebuttondown': [],
        'shuttlerollup': [],
        'shuttlerolldown': [],
        'shuttlescrollup': [],
        'shuttlescrolldown': [],
    };

    // indexes of btn that are currently being pressed
    private state: [number[], number, number] = [[], null, null];

    constructor(private device: HIDDevice) {
        this.device.oninputreport = this.HandleOnDevice.bind(this);
    }

    private HandleOnDevice(e: InputReportEvent): void {

        // Prepare the New State
        // -7 => 7
        const rotation = e.data.getInt8(0);

        // 0 => 255
        const slider = e.data.getUint8(1);

        // not sure what is this yest
        // const separator = e.data.getInt8(2);
        e.data.getInt8(2);

        let btns = e.data.getUint8(3);
        btns += e.data.getUint8(4) === 1 ? 256 : 0;
        const clicked = [];
        for (let i = 4; i >= 0; i--) {
            if (btns - SHUTTLE_BTNS[i] >= 0) {
                clicked.push(i);
                btns -= SHUTTLE_BTNS[i];
            }
        }

        // Update State and Dispatch Events
        this.updateState([clicked, slider, rotation]);

    }

    private updateState(newState: [number[], number, number]): void {
        const [clicked, slider, rotation] = newState;
        const [previousClicked, previousSlider, previousRotation] = this.state;
        this.updateBtnState(previousClicked, clicked);
        this.updateRollerState(previousRotation, rotation);
        this.updateSliderState(previousSlider, slider);
        this.state = newState;

    }

    private updateBtnState(oldBtnsState: number[], btnsState: number[]): void {
        // check clicked btn versus CurrentlyClickedButtonsIndexes
        // if the index exists then its a btn down event else its a btn up event
        for (let index = 0; index <= 4; index++) {

            const btnPreviouslyPressed = oldBtnsState.indexOf(index) >= 0;
            const btnIsBeingPressed = btnsState.indexOf(index) >= 0;
            if (btnPreviouslyPressed && !btnIsBeingPressed) {
                // dispatch mouse up event
                this.dispatchEvent('shuttleebuttonup', { button: index });
            }

            if (!btnPreviouslyPressed && btnIsBeingPressed) {
                // dispatch mouse down event
                this.dispatchEvent('shuttleebuttondown', { button: index });
            }
        }
    }
    private updateRollerState(oldRotationState: number, newRotationState: number): void {
        if (oldRotationState != null) {
            if (oldRotationState > newRotationState) {
                // roll down

            }
            if (oldRotationState > newRotationState) {
                // roll up
                this.dispatchEvent('shuttlerollup', { value: newRotationState });
            }
        }
    }
    private updateSliderState(oldSliderState: number, newSliderState: number): void {
        // handle the slider
        if (oldSliderState != null) {
            if (oldSliderState > newSliderState) {
                // scroll down event
                this.dispatchEvent('shuttlescrolldown', undefined);
            }
            if (oldSliderState < newSliderState) {
                // scroll up event
                this.dispatchEvent('shuttlescrollup', undefined);
            }
        }

    }

    public addEventListener(event: ShuttleEvents, listener: ShuttleEventHandler): void {
        this.eventsMap[event].push(listener);
    }

    private dispatchEvent(event: ShuttleEvents, args: any) {
        const handlers = this.eventsMap[event];
        if (handlers && handlers.length > 0) {
            for (const handler of handlers) {
                handler(args);
            }
        }
    }
}