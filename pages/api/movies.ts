// pages/api/movies.js
import clientPromise from "../../lib/mongodb";
import {Db, MongoClient} from "mongodb";
export default async function handler(req:any, res:any) {

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const movies = await db.collection("movies").find({}).limit(10).toArray();
                res.json({ status: 200, data: movies });
                break;
            case "POST":
                const params = req.body;
                const result = await db.collection("movies").insertOne(params);
                res.json({ status: 200, data: result });
                break;
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }



}
