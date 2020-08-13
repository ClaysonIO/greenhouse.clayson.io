import {Sensor} from "./Sensor";
import {IDevice} from "../../lambda/utilities/devices";

export class Device {
    public readonly deviceId: string;
    public name: string;
    public sensors: Sensor[] = [];

    constructor({deviceId, name, sensors}: IDevice) {
        this.deviceId = deviceId;
        this.name = name || "";
        this.sensors = sensors.map(val=>new Sensor(val, this));
    }
}