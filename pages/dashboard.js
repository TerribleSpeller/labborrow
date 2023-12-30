import clientPromise from "../lib/mongodb";
import { useEffect, useState } from 'react';


export default function equipment({ equip }) {

    const [updatedEquip, setUpdatedEquip] = useState(equip);

    const handleReject = async (id) => {
        console.log(id)
        try {
            const response = await fetch('./api/denyfunction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
      
            if (response.ok) {
              // Update the local state to reflect the change
              const updatedData = updatedEquip.filter((object) => object._id !== id);
              setUpdatedEquip(updatedData);
              console.log('Request rejected successfully');
            } else {
              console.error('Failed to reject request');
            }
          } catch (error) {
            console.error('Error rejecting request:', error);
          }
    };
  
    const handleAccept = async (id) => {
        console.log(id);
        try {
          const response = await fetch('/api/acceptfunction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
    
          if (response.ok) {
            // Update the local state to reflect the change
            const updatedData = updatedEquip.filter((object) => object._id !== id);
            setUpdatedEquip(updatedData);
            console.log('Request accepted and copied successfully');
          } else {
            console.error('Failed to accept request');
          }
        } catch (error) {
          console.error('Error accepting request:', error);
        }
    };

    
    return (
        
        <div>
            <h1>Dashboard</h1>
            <p>
                Please contact Jason Alexander (Phone Number Here) to inform of any issues
            </p>

            <h2>Requests</h2>
            <table>
                <thead>
                    <tr>
                        <td>Timestamp</td>
                        <td>Requester</td>
                        <td>NIM</td>
                        <td>Jurusan</td>
                        <td>Email</td>
                        <td>No. Telefon</td>
                        <td>Item to Borrow</td>
                    </tr>
                </thead>
                <tbody>
                    {equip ? (
                        equip.map((object) => (
                            <tr key={object._id}>
                                <td>{object.timestamp}</td>
                                <td>{object.name}</td>
                                <td>{object.NIM}</td>
                                <td>{object.jurusan}</td>
                                <td>{object.email}</td>
                                <td>{object.telephoneNumber}</td>
                                <td>{object.equipmentChoice}</td>
                                <td><button onClick={() => handleAccept(object._id)}>Accept</button></td>
                                <td><button onClick={() => handleReject(object._id)}>Reject</button></td>
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
            .collection("lab_requests")
            .find({})
            .sort({ timestamp: 1 })
            .limit(150)
            .toArray();

        return {
            props: { equip: JSON.parse(JSON.stringify(equipment)) },
        };
    } catch (e) {
        console.error(e);
    }
}