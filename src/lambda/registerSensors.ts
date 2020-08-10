//Add sensors
import {APIGatewayProxyCallback, APIGatewayProxyEvent} from "aws-lambda";
import {MongoHelpers} from "./utilities/mongo";
import {ISensor} from "./utilities/sensor";

export function handler(
    event: APIGatewayProxyEvent,
    context: any,
    callback: APIGatewayProxyCallback
) {
    try {
        if(event.body && event.httpMethod === 'POST'){
            const body: ISensor[] = JSON.parse(event.body);

            const modifiedBody = body.map(val=>{
                val._id = val.id;
                return val;
            })

            MongoHelpers.InsertArray('sensors', modifiedBody)
                .then(()=>{
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({msg: `Inserted ${body.length} sensors`})
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