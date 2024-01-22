import clientPromise from "../lib/mongodb";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, getSession } from "next-auth/react";



export default function equipment({ equip, returnProps }) {
    const { data: session } = useSession();

    const router = useRouter()


    if(session?.user?.admin == false){
        router.push("equipment")
    }


    const [updatedEquip, setUpdatedEquip] = useState(equip);

    const handleReject = async (id) => {
        console.log(await getSession())

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
              location.reload;
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
            location.reload();
          } else {
            console.error('Failed to accept request');
            alert("Failed to accept Request!")
          }
        } catch (error) {
          console.error('Error accepting request:', error);
          alert(error)
        }
    };


    //So when the Admin wants to update the entry, the ID can be taken. 
    const handleUpdateClick = (id) => {
      router.push(`/updatepage?id=${id}`); //
    };

    
    return (
        
        <div>
            <h1>Dashboard</h1>
            <p>
                Please contact Jason Alexander (081293820288/jasonalexanderyuwono@gmail.com) to inform of any issues
            </p>
            <hr/>
            <p>
                Welcome {session?.user?.email} to the Dashboard.
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

            <hr/>

            <br/>

            <h2>Accepted Requests</h2>

            <table>
                <thead>
                    <tr>
                        <td>Timestamp</td>
                        <td>Requester</td>
                        <td>NIM</td>
                        <td>Jurusan</td>
                        <td>Email</td>
                        <td>No. Telefon</td>
                        <td>Item Borrowed</td>
                        <td>Returned?</td>
                        <td>Return Date</td>
                        <td>Return Condition</td>
                        <td>Update Entry?</td>
                    </tr>
                </thead>
                <tbody>
                    {returnProps ? (
                        returnProps.map((object) => (
                            <tr key={object._id}>
                                <td>{object.timestamp}</td>
                                <td>{object.name}</td>
                                <td>{object.NIM}</td>
                                <td>{object.jurusan}</td>
                                <td>{object.email}</td>
                                <td>{object.telephoneNumber}</td>
                                <td>{object.equipmentChoice}</td>
                                <td>{object.returnStat}</td>
                                <td>{object.returnDate}</td>
                                <td>{object.returnCon}</td>
                                <td><button onClick={() => handleUpdateClick(object._id)}>Update Entry</button></td>
                            </tr>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </tbody>                
            </table>

            <style jsx>{`
                table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
              }`}

            </style>
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

        const returnCheck = await db
            .collection("approved_requests")
            .find({})
            .sort({timestamp: -1})
            .limit(150)
            .toArray();

        return {
            props: { 
                equip: JSON.parse(JSON.stringify(equipment)) ,
                returnProps : JSON.parse(JSON.stringify(returnCheck))

            },
        };
    } catch (e) {
        console.error(e);
    }
}