import clientPromise, { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { name, email, telephoneNumber, NIM, jurusan, equipmentChoice } = req.body;
        // Connect to the MongoDB database
        const client = await clientPromise;
        const db = client.db("lab_equipment");

        // Insert data into the 'requests' collection 
        await db.collection('lab_requests').insertOne({
            timestamp: new Date(),
            name,
            email,
            telephoneNumber,
            NIM,
            jurusan,
            equipmentChoice,
        });

        res.status(201).json({ message: 'Request submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}