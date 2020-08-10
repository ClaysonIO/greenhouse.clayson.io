//Add sensors
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {MongoHelpers} from "./utilities/mongo";
import {IDevice} from "./utilities/devices";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    try {
        if(event.body && event.httpMethod === 'POST'){
            const body: IDevice = JSON.parse(event.body);

            MongoHelpers.InsertArray('devices', [{deviceId: body.deviceId}])
                .then(()=>MongoHelpers.InsertArray('sensors', body.sensors))
                .then(()=>{
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({msg: `Inserted 1 device and  ${body.sensors.length} sensors`})
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