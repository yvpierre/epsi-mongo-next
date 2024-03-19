// pages/api/movies.js
import clientPromise from "../../lib/mongodb";
import {OrmService} from "../../services/OrmService";
import {Db, MongoClient} from "mongodb";
import {MongoConfigService} from "../../services/MongoConfigService";

/**
 * @swagger
 * /api/movies:
 *  get:
 *      description: Get all movies
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Server Error
 *
 *  post:
 *      description: Create a new movie
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          director:
 *                              type: string
 *                          year:
 *                              type: integer
 *                      example:
 *                          title: Example Movie
 *                          director: John Doe
 *                          year: 2024
 *      responses:
 *          200:
 *              description: Movie created successfully
 *          500:
 *              description: Internal Server Error
 */

export default async function handler(req:any, res:any) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                // OrmService.connectAndFind(MongoConfigService.collection.name, 100))))
                const movies = await db.collection("movies").find({ "imdb.rating": { $gt: 8.5 }, "directors": { $ne: null } }).limit(100).toArray();
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
