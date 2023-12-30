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

      // Step 1: Find the document in the source collection
      const sourceDocument = await db.collection("lab_requests").findOne({ _id: objectId });

      // Step 2: Insert the document into the target collection
      if (sourceDocument) {
        await db.collection("approved_requests").insertOne(sourceDocument);
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