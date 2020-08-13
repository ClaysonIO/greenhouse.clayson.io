import {ISensor} from "../../lambda/utilities/sensor";
import {Device} from "./Device";
import {observable} from "mobx";

export class Sensor{
    public readonly deviceId: string;
    public readonly sensorId: string;
    public readonly type: 't' | 'h';
    public readonly device: Device;
    @observable public readings: any[] = [];
    @observable public name: string;

    constructor({deviceId, sensorId, type, name}: ISensor, device: Device) {
        this.deviceId = deviceId;
        this.sensorId = sensorId;
        this.name = name || "";
        this.type = type;
        this.device = device;
    }

}