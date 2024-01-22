import { NextResponse } from "next/server";
import clientPromise, { connectToDatabase } from '../../lib/mongodb';
import bcrypt from "bcryptjs";



export default async function POST(req, res) {
    try {
        const {registerUsername, registerEmail, registerPassword} =  req.body;
        const client = await clientPromise;
        const db = client.db("lab_equipment");
        const hashedPassword = await bcrypt.hash(registerPassword, 10);
        // Insert data into the 'users' collection 
        await db.collection('users').insertOne({
            timestamp: new Date(),
            username: registerUsername, 
            email: registerEmail,
            password: hashedPassword,
            admin: false,
        });
        res.status(200).json({ message: 'Request submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

