// pages/api/denyfunction.js
import clientPromise  from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    console.log(id);
    const client  = await clientPromise;
    const db = client.db("lab_equipment");

    try {
      const objectId = new ObjectId(id);
      console.log(objectId)

      await db.collection("lab_requests").deleteOne({ _id: objectId });

      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      console.error('Error rejecting request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}