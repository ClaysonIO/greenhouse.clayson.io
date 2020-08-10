export interface IReading{
    deviceId: string,
    sensorId: string,
    value: number,
    type: 't' | 'h' //For (t)emperature or (h)umidity
    timestamp: number
}