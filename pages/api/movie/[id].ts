// pages/api/movie/[id].js
import clientPromise from "../../../lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const dbMovie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
                console.log(id);
                res.json({ status: 200, data: { movie: dbMovie } });
                break;
            case "PUT":
                const params = req.body.movie;
                delete params._id;
                const result = await db.collection("movies").updateOne({ _id: new ObjectId(id) }, { $set: params });
                res.json({ status: 200, data: result });
                break;
            case "DELETE":
                const deleteResult = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
                res.json({ status: 200, data: deleteResult });
                break;
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}
