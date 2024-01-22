import clientPromise, { connectToDatabase } from '../../lib/mongodb';

//Function to check if a user alreayd exists 

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const {registerUsername, registerEmail, registerPassword} =  req.body;
        const client = await clientPromise;
        const db = client.db("lab_equipment");
        const userCheck = await db.collection('users').findOne({email: registerEmail});

        if(userCheck) {
            res.status(201).json({ message: 'User found successfully', status: 201 });
        } else {
            res.status(404).json({ message: 'User not found, clear', status: 404 });
        }

    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}