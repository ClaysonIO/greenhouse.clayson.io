import {Device} from "./Classes/Device";
import {ApiCalls} from "./ApiCalls";
import {observable, runInAction} from "mobx";

export class AppState{
    @observable public devices: Device[] = [];

    constructor() {
        this.fetchSensors();
    }

    public fetchSensors(){
        ApiCalls
            .GetDevices()
            .then((devices)=>{
                runInAction(()=>this.devices = devices.map(val=>new Device(val)))
            })
    }
}