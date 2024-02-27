// pages/api/movies.js
import clientPromise from "../../../../lib/mongodb";
import {Db, MongoClient, ObjectId} from "mongodb";
export default async function handler(req:any, res:any) {
    const { id } = req.query;


    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const comments = await db.collection("comments").find({movie_id: id}).limit(10).toArray();
                console.log(id)
                res.json({ status: 200, data: comments });
                break;
            case "POST":
                const params = req.body;
                params.movie_id = new ObjectId(params.movie_id)
                const result = await db.collection("comments").insertOne(params);
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
