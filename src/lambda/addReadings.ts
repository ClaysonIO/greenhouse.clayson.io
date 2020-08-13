//Add readings from the sensor
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {IReading} from "./utilities/reading";
import {MongoHelpers} from "./utilities/mongo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    try {
        if(event.body && event.httpMethod === 'POST'){
            const body: IReading[] = JSON.parse(event.body);
            const daysUpdate = body.map(reading=>{
                const date = +dayjs(reading.time).utc().format("YYYYMMDD");
                return {
                    find: {deviceId: reading.deviceId, sensorId: reading.sensorId, date: date},
                    update: {$addToSet: {readings: {t: reading.time, v: reading.value}}}
                }
            })

            MongoHelpers.UpsertArray('days', daysUpdate)
                .then(()=>{
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({msg: `Inserted ${body.length} readings`})
                    })
                })
                .catch(err=>{
                    callback(null, {
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
                    })
                })
        } else {
            throw new Error("Not a valid request")
        }
    } catch (err) {
        console.log(err) // output to netlify function log

        callback(null, {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
        })
    }
}