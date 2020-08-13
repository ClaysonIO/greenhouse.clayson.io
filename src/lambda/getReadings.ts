//Get readings from a single sensor
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {MongoHelpers} from "./utilities/mongo";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    if(event && event.httpMethod === 'GET'){

        const deviceId: string = event.queryStringParameters?.deviceId || "";
        const sensorId: string = event.queryStringParameters?.sensorId || "";
        const startDate: number = +(event.queryStringParameters?.startDate || Math.min());
        const endDate: number = +(event.queryStringParameters?.endDate || Math.max());

        MongoHelpers
            .getSensorReadings({deviceId, sensorId, startDate: +startDate, endDate: +endDate})
            .then(readings=>{
                callback(null, {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(readings)
                })
            })
            .catch(err=>{
                callback(null, {
                    statusCode: 500,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(err) // Could be a custom message or object i.e. JSON.stringify(err)
                })
            })
    } else {
        callback(null, {
            statusCode: 404,
            body: "Not Found" // Could be a custom message or object i.e. JSON.stringify(err)
        })
    }
}