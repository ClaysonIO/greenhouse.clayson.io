//Add readings from the sensor
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {IReading} from "./utilities/reading";
import {MongoHelpers} from "./utilities/mongo";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    try {
        if(event.body && event.httpMethod === 'POST'){
            const body: IReading[] = JSON.parse(event.body);

            MongoHelpers.InsertArray('readings', body)
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