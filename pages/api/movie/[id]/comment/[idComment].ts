// pages/api/movie/[id].js
import clientPromise from "../../../../../lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movies/{id}/comments/{idComment}:
 *  get:
 *      description: Get a comment by ID for a movie
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
 *        - in: path
 *          name: idComment
 *          required: true
 *          description: ID of the comment
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Comment not found
 *          500:
 *              description: Internal Server Error
 *
 *  put:
 *      description: Update a comment by ID for a movie
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
 *        - in: path
 *          name: idComment
 *          required: true
 *          description: ID of the comment
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
 *              description: Comment updated successfully
 *          404:
 *              description: Comment not found
 *          500:
 *              description: Internal Server Error
 *
 *  delete:
 *      description: Delete a comment by ID for a movie
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the movie
 *          schema:
 *              type: string
 *        - in: path
 *          name: idComment
 *          required: true
 *          description: ID of the comment
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Comment deleted successfully
 *          404:
 *              description: Comment not found
 *          500:
 *              description: Internal Server Error
 */
export default async function handler(req: any, res: any) {
    const { idComment } = req.query;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        switch(req.method){
            case "GET":
                const dbMovie = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
                console.log(idComment);
                res.json({ status: 200, data: { movie: dbMovie } });
                break;
            case "PUT":
                const params = req.body.movie;
                delete params._id;
                const result = await db.collection("comments").updateOne({ _id: new ObjectId(idComment) }, { $set: params });
                res.json({ status: 200, data: result });
                break;
            case "DELETE":
                const deleteResult = await db.collection("comments").deleteOne({ _id: new ObjectId(idComment) });
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
