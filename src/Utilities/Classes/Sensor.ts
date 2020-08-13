import {ISensor} from "../../lambda/utilities/sensor";
import {Device} from "./Device";
import {computed, observable, runInAction} from "mobx";
import {ApiCalls} from "../ApiCalls";
import dayjs, {Dayjs} from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export class Sensor{
    public readonly deviceId: string;
    public readonly sensorId: string;
    public readonly type: 't' | 'h';
    public readonly device: Device;
    @observable public readings: IDetailedReading[] = [];
    @observable public name: string;
    private fetched: boolean = false;
    private fetching: boolean = false;

    constructor({deviceId, sensorId, type, name}: ISensor, device: Device) {
        this.deviceId = deviceId;
        this.sensorId = sensorId;
        this.name = name || sensorId;
        this.type = type;
        this.device = device;

        this.fetchReadings = this.fetchReadings.bind(this);
    }

    public fetchReadings(){
        console.log("Fetching", this.fetching, this.fetched)
        if(!this.fetching && !this.fetched){
            console.log("Requesting")
            this.fetching = true;
            const startDate = +dayjs().utc().subtract(2, 'd').format('YYYYMMDD');
            const endDate = +dayjs().utc().format('YYYYMMDD');
            ApiCalls.GetSensorReadings({sensor: this, startDate, endDate})
                .then(readings=>{
                    runInAction(()=>{
                        this.readings = readings
                            .sort((a,b)=>a.t - b.t)
                            .map(val=>({
                                dayjs: dayjs(val.t, 'x'),
                                f: celsiusToFarenheit(val.v),
                                c: val.v,
                                h: val.v,
                                value: (this.type === 'h' ? val.v.toFixed(1) + " %" : celsiusToFarenheit(val.v).toFixed(1) + " F"),
                                ms: val.t
                            }))
                    });
                    this.fetched = true;
                    this.fetching = false;
                })
        }
    }

    @computed public get latestReading(){
        return this.readings.length ? this.readings[this.readings.length - 1] : undefined
    }

    @computed public get farenheitChartData(){
        return ({
            label: this.name,
            data: this.readings.map(val=>([val.f, val.ms]))
        })
    }
}

function celsiusToFarenheit(celsius: number){
    return Math.round(((celsius * (9/5)) + 32) * 100) / 100;
}

interface IDetailedReading {
    dayjs: Dayjs;
    f: number;
    c: number;
    h: number;
    value: string;
    ms: number;
}

export interface IShortReading {
    t: number,
    v: number
}