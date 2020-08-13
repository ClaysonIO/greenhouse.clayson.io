export interface IDay {
    deviceId: string;
    sensorId: string;
    date: number;
    readings: IDayReading[]
}

interface IDayReading {
    t: number,
    v: number
}