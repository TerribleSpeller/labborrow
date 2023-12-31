import clientPromise, { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';


export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { objectid, returnStat, returnDate, returnCon } = req.body;
        try {
            const client = await clientPromise;
            const db = client.db("lab_equipment");
            const objectId = new ObjectId(objectid);
            console.log(objectid);
            console.log(objectId)
            console.log(req.body)
      
            const result = await db.collection('approved_requests').updateOne(
              { _id: objectId },
              { $set: { returnStat: returnStat, returnDate: returnDate, returnCon: returnCon } }
            );
            
      
            if (result.modifiedCount) {
              res.status(201).json({ message: 'Request submitted successfully' });
            } else {
              res.status(404).json({ message: 'Document not found or not modified' });
            }
          } catch (error) {
            console.error('Error updating request:', error);
            res.status(500).json({ message: 'Internal Server Error - Fuck!' });
          }
        } else {
          res.status(405).json({ message: 'Method Not Allowed' });
        }
}