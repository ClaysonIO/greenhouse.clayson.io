import {MongoClient} from 'mongodb';
import {IDevice} from "./devices";

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Database Name
const dbName = process.env.MONGO_DBNAME || 'Greenhouse';

export class MongoHelpers{

    public static getDevices(){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                client
                    .db(dbName)
                    .collection("devices")
                    .aggregate([
                        {$match: {}},
                        {$lookup: {from: "sensors", localField: "deviceId", foreignField: "deviceId", as: "sensors" }}
                    ])
                    .toArray()
                    .then((devices: IDevice[])=>{
                        client.close()
                        resolve(devices);
                    })
                    .catch(err=>{
                        console.error(err);
                        client.close()
                        reject(err);
                    });
            })
        })
    }

    public static getSensors({deviceId}: {deviceId: string}){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                client
                    .db(dbName)
                    .collection("sensors")
                    .find({deviceId})
                    .toArray()
                    .then((sensors)=>{
                        client.close()
                        resolve(sensors);
                    })
                    .catch(err=>{
                        console.error(err);
                        client.close()
                        reject(err);
                    });
            })
        })
    }

    public static getSensorReadings({deviceId, sensorId, startDate, endDate}: {deviceId: string, sensorId: string, startDate: number, endDate: number}){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                client
                    .db(dbName)
                    .collection("days")
                    .aggregate([
                        {$match: {deviceId, sensorId, date: {$gte: startDate, $lte: endDate}}},
                        {$unwind: "$readings"},
                        {$group: {
                                _id: "sensorId",
                                readings: {$push: "$readings"}
                            }}
                    ])
                    .toArray()
                    .then((sensors)=>{
                        client.close()
                        resolve(sensors[0].readings);
                    })
                    .catch(err=>{
                        console.error(err);
                        client.close()
                        reject(err);
                    });
            })
        })
    }

    public static InsertArray(collectionName: string, valueArray: any[]){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                const bulk = collection.initializeUnorderedBulkOp();

                valueArray.forEach(val=>{
                    bulk.insert(val);
                })

                bulk.execute()
                    .then(()=>{
                        return client.close();
                    })
                    .then(()=>{
                        resolve();
                    })
                    .catch(err=>reject(err));

            })
        })
    }

    public static UpsertArray(collectionName: string, valueArray: { ['find']: any, ['update']: any }[]){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                const bulk = collection.initializeUnorderedBulkOp();

                valueArray.forEach(val=>{
                    bulk
                        .find(val.find)
                        .upsert()
                        .updateOne(val.update);
                })

                bulk.execute()
                    .then(()=>{
                        return client.close();
                    })
                    .then(()=>{
                        resolve();
                    })
                    .catch(err=>reject(err));

            })
        })
    }

}