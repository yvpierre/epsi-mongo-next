// pages/api/movie/[id].js
import clientPromise from "../../../lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import {OrmService} from "../../../services/OrmService";
import {MongoConfigService} from "../../../services/MongoConfigService";

/**
 * @swagger
 * /api/movies/{id}:
 *  get:
 *      description: Get a movie by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Movie not found
 *          500:
 *              description: Internal Server Error
 *
 *  put:
 *      description: Update a movie by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
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
 *                          title: Updated Movie
 *                          director: Jane Doe
 *                          year: 2025
 *      responses:
 *          200:
 *              description: Movie updated successfully
 *          404:
 *              description: Movie not found
 *          500:
 *              description: Internal Server Error
 *
 *  delete:
 *      description: Delete a movie by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Movie deleted successfully
 *          404:
 *              description: Movie not found
 *          500:
 *              description: Internal Server Error
 */

export default async function handler(req: any, res: any) {
    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const movie = await OrmService.connectAndFindOne(MongoConfigService.collection.movies, id);
                res.json({ status: 200, data: { movie: movie } });
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
