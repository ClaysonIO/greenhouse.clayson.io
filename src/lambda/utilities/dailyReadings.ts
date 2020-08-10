export interface IDailyReadings{
    deviceId: string;
    sensorId: string;
    date: number;
    readings: {
       time: number,
       value: number
    }[]
}