import {Device} from "./Classes/Device";
import {ApiCalls} from "./ApiCalls";
import {observable, runInAction} from "mobx";

export class AppState{
    @observable public devices: Device[] = [];
    @observable public ready: boolean = false;

    constructor() {
        this.fetchSensors();
    }

    public fetchSensors(){
        ApiCalls
            .GetDevices()
            .then((devices)=>{
                runInAction(()=>{
                    this.devices = devices.map(val=>new Device(val));
                    this.ready = true;
                })
            })
    }
}