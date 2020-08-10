import {ISensor} from "./sensor";

export interface IDevice{
    deviceId: string,
    sensors: ISensor[]
}