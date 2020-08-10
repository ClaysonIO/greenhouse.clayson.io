import {MongoClient} from 'mongodb';

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Database Name
const dbName = process.env.MONGO_DBNAME || 'Greenhouse';

export class MongoHelpers{

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

    public static UpdateArray(collectionName: string, valueArray: { ['find']: any, ['update']: any }[]){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");

                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                const bulk = collection.initializeUnorderedBulkOp();

                valueArray.forEach(val=>{
                    bulk.find(val.find).updateOne(val.update);
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