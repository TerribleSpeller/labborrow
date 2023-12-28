import clientPromise from "../lib/mongodb";
import { useEffect, useState } from 'react';


export default function equipment({ equip }) {
    return (
        
        <div>
            <h1>Equipment List</h1>
            <p>
                Please contact Pak Faisal (Phone Number Here) to inform that you;ve forwarded a request
            </p>
            <table>
                <thead>
                    <tr>
                        <td>Equipment Name</td>
                        <td>Total Qty.</td>
                        <td>Borrwed Qty.</td>
                        <td>Lab</td>
                    </tr>
                </thead>
                <tbody>
                    {equip ? (
                        equip.map((object) => (
                            <tr key={object._id}>
                                <td>{object.name}</td>
                                <td>{object.qty}</td>
                                <td>{object.borrowedqty}</td>
                                <td>{object.lab}</td>
                            </tr>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </tbody>

                
            </table>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("lab_equipment");

        const equipment = await db
            .collection("lab")
            .find({})
            .sort({ lab: 1 })
            .limit(150)
            .toArray();

        return {
            props: { equip: JSON.parse(JSON.stringify(equipment)) },
        };
    } catch (e) {
        console.error(e);
    }
}