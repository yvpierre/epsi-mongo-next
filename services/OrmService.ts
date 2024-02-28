import clientPromise from "../lib/mongodb";
import {MongoConfigService} from "./MongoConfigService";
import {ObjectId} from "mongodb";

const connectToDb = async () => {
    const client = await clientPromise;
    return client.db(MongoConfigService.databases.mflix);
}

const _connectAndFind = async(dbName:string, limit:number) => {
    const db = await connectToDb();
    // Active Filters
    return await db.collection(dbName).find({}).limit(limit).toArray();
}

const _connectAndFindOne = async (dbName:string, id:string) => {
    const db = await connectToDb();
    return await db.collection(dbName).findOne({_id: new ObjectId(id)});
}

export const OrmService = {
    connectAndFind: _connectAndFind,
    connectAndFindOne: _connectAndFindOne
}