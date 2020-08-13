import {ISensor} from "./sensor";

export interface IDevice{
    deviceId: string,
    name?: string,
    sensors: ISensor[]
}