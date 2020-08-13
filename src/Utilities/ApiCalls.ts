import axios from 'axios';
import {IShortReading, Sensor} from "./Classes/Sensor";
import {IDevice} from "../lambda/utilities/devices";

export class ApiCalls{
    static GetDevices(): Promise<IDevice[]>{
        return SimpleGet<IDevice[]>(`/.netlify/functions/getDevices`)
    }

    static GetSensors(){
        return axios.get(`/.netlify/functions/getSensors`)
    }

    static GetSensorReadings({sensor, startDate, endDate}: {sensor: Sensor, startDate: number, endDate: number}){
        return SimpleGet<IShortReading[]>(`/.netlify/functions/getReadings?deviceId=${sensor.deviceId}&sensorId=${sensor.sensorId}&startDate=${startDate}&endDate=${endDate}`)
    }
}

function SimpleGet<T>(url: string): Promise<T>{
    return new Promise((resolve, reject)=>{
        axios.get(url)
            .then((response)=>{
                return response.data
            })
            .then((json: T)=>{
                resolve(json)
            })
            .catch(err=>reject(err))
    })
}