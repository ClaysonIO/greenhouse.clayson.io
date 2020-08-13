//Get all available devices
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {MongoHelpers} from "./utilities/mongo";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    if(event.httpMethod === 'GET'){
        MongoHelpers
            .getDevices()
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