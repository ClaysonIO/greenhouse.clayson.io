//Get all sensors from a device
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {MongoHelpers} from "./utilities/mongo";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    const deviceId = event.queryStringParameters?.deviceId;

    if(event.httpMethod === 'GET' && deviceId){
        console.log(deviceId)
        MongoHelpers
            .getSensors({deviceId})
            .then(devices=>{
                callback(null, {
                    statusCode: 200,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(devices)
                })
            })
            .catch(err=>{
                callback(null, {
                    statusCode: 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                })
            })
    } else {
        callback(null, {statusCode: 404, body: ""})
    }
}