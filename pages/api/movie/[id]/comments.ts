// pages/api/movies.js
import clientPromise from "../../../../lib/mongodb";
import {Db, MongoClient, ObjectId} from "mongodb";

/**
 * @swagger
 * /api/movies/{id}/comments:
 *  get:
 *      description: Get comments for a movie by ID
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
 *              description: Comments not found
 *          500:
 *              description: Internal Server Error
 *
 *  post:
 *      description: Add a comment for a movie by ID
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
 *                          user:
 *                              type: string
 *                          comment:
 *                              type: string
 *                      example:
 *                          user: John Doe
 *                          comment: This movie is amazing!
 *      responses:
 *          200:
 *              description: Comment added successfully
 *          404:
 *              description: Movie not found
 *          500:
 *              description: Internal Server Error
 */
export default async function handler(req:any, res:any) {
    const { id } = req.query;


    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const comments = await db.collection("comments").find({movie_id: new ObjectId(id)}).toArray();
                console.log(id)
                res.json({ status: 200, data: comments });
                break;
            case "POST":
                const params = req.body;
                params.movie_id = new ObjectId(id)
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
