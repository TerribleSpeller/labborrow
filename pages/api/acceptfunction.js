import { ObjectId } from 'mongodb';
import clientPromise  from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    console.log(id);

    try {
        const client  = await clientPromise;
        const db = client.db("lab_equipment");
        const objectId = new ObjectId(id);
        const fieldAdd = {
            $set: {
              returnStat: 'false',
              returnDate: 'Not yet returned',
              returnCon: 'Not yet returned'
            },
          };

      // Step 1: Find the document in the source collection
      const sourceDocument = await db.collection("lab_requests").findOne({ _id: objectId });

      // Step 2: Insert the document into the target collection
      if (sourceDocument) {
        const result = await db.collection("approved_requests").insertOne(sourceDocument);
        var newObjectId = result.insertedId
        await db.collection("approved_requests").updateOne({_id: newObjectId}, fieldAdd)
        await db.collection("lab_requests").deleteOne({ _id: objectId });


      } else {
        throw new Error('Document not found in the source collection');
      }

      res.status(200).json({ message: 'Request accepted and copied successfully' });
    } catch (error) {
      console.error('Error accepting request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}