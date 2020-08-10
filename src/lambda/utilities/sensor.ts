export interface ISensor{
    sensorId: string,
    type: 't' | 'h', //For (t)emperature or (h)umidity
    name?: string
}