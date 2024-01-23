import clientPromise from "../lib/mongodb";
import { useRouter } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from "next";


export default function UpdateFunction({ updateentry, id }) {
    const [formData, setFormData] = useState({
        objectid: id,
        returnStat: '',
        returnDate: '',
        returnCon: '',
      });

    //Handler for Input Change
    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    //Function for when we gotta submit stuff bro
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/updatefunction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            if (response.ok) {
            console.log('Request submitted');
            alert("Your Request has been submitted!\n");
            location.reload();
            } else {
            console.error('Failed to submit request');
            alert("Failed to submit Request!")
            }
        } 
        catch (error) {
          console.error('Error submitting request, Please contact Jason Alexander (2602188673) regarding the error:', error);
          alert(error);
        }
    };

  return (
    <div onLoad={GetServerSideProps}>
       <h1>Update Page</h1>
       <p>
        Updating Entry: {id}
        </p>
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
                </tr>
            </thead>
            <tbody>
                {updateentry ? (
                    updateentry.map((object) => (
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
                        </tr>
                    ))
                ) : (
                    <tr>Loading...</tr>
                )}
            </tbody>                
        </table>

        <br/>

        <form onSubmit={handleSubmit} onChange={handleInputChange}>
                <label htmlFor="returnStat">Returned?</label>
                <br />
                <select type="text" id="returnStat" name="returnStat">
                    <option value="" defaultValue={"false"} disabled hidden>Choose here</option> 
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>                <br />
                <label htmlFor="returnDate">Return Date:</label>
                <br />
                <input type="text" id="returnDate" name="returnDate" />
                <br/>
                <label htmlFor="returnCon">Return Condition:</label>
                <br />
                <input type="text" id="returnCon" name="returnCon" />
                <br/>
                <input type="submit" value="Submit"/>

        </form>



        <style jsx>{`
                table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
              }`}

            </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const  newid  = context.query; // Use context.query to get the query parameters
   // console.log(context.query);
   // console.log("Logged Context!")
   // console.log(newid)
    const objectId = new ObjectId(newid);
   // console.log(objectId)

    const client = await clientPromise;
    const db = client.db("lab_equipment");

    const equipment = await db
        .collection("approved_requests")
        .find({ _id: objectId })
        .toArray();


    return {
      props: { 
        updateentry: JSON.parse(JSON.stringify(equipment)) ,
        id: objectId.toString(), // Convert ObjectId to string for display
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        updateentry: null,
        id: null,
      },
    };
  }
}
