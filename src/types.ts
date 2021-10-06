export interface IShuttleExpress {
    [key: string]: any;
}

export type EventMap = {
    [key: string]: ShuttleEventHandler[]
};

export type ShuttleEventHandler = (e: any) => void;