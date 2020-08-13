export interface ISensor{
    deviceId: string,
    sensorId: string,
    type: 't' | 'h', //For (t)emperature or (h)umidity
    name?: string
}