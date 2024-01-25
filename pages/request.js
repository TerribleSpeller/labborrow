import { stringify } from "querystring";
import clientPromise from "../lib/mongodb";
import { useState } from 'react';
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function request({equipment}) {
    const { data: session } = useSession();
    //This is the schema to be submitted
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephoneNumber: '',
        NIM: '',
        jurusan: '',
        equipmentChoice: '',
        Reason: '',
        Qty: '',
        Lab: '',
        plandateofBorrow: '',
        plandateofReturn: '',
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
            const response = await fetch('/api/requestfunction', {
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
            alert("Failed to submit Request! (This maybe because its all been requested)")
            }
        } 
        catch (error) {
          console.error('Error submitting request, Please contact Jason Alexander (2602188673) regarding the error:', error);
          alert(error);
        }
    };

    //Actual Website Code
    return(
        <div onLoad={GetServerSideProps}>
            <h1>Request some Lab Equipment!</h1>
            <p>
                Please contact Pak Faisal (08815935518) to inform that you've forwarded a request
            </p>
            <form onSubmit={handleSubmit} onChange={handleInputChange}>
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" name="name" />
                <br />
                <label htmlFor="email">Email:</label>
                <br />
                <input type="text" id="email" name="email" />
                <br/>
                <label htmlFor="telephoneNumber">No. Telefon:</label>
                <br />
                <input type="text" id="telephoneNumber" name="telephoneNumber" />
                <br/>
                <label htmlFor="NIM">NIM:</label>
                <br />
                <input type="text" id="NIM" name="NIM" />
                <br/>
                <label htmlFor="jurusan">Jurusan:</label>
                <br />
                <select type="text" id="jurusan" name="jurusan">
                    <option value="" selected disabled hidden>Choose here</option> 
                    <option value="ARE">Automotive and Robotics Engineering</option>
                    <option value="PDE">Product Design Engineering</option>
                    <option value="BE">Business Engineering</option>
                </select>
                <br/>
                <label htmlFor="equipmentChoice">Choose equipment:</label>
                <br/>
                <select name="equipmentChoice" id="equipmentChoice">
                    {equipment ? (
                        equipment.map((object) => (
                            <option value={object.name}    key={object._id}>
                                {object.name}
                            </option>
                        ))
                    ) : (
                        <option value="none">None</option>
                    )}
                </select>
                <br/>
                <label htmlFor="Reason">Reason:</label>
                <br />
                <input type="text" id="Reason" name="Reason" />
                <br/>
                <label htmlFor="Qty">Qty:</label>
                <br />
                <input type="text" id="Qty" name="Qty" />
                <br/>
                <label htmlFor="Lab">Lab:</label>
                <br />
                <select type="text" id="Lab" name="Lab">
                    <option value="" selected disabled hidden>Choose here</option> 
                    <option value="106">106</option>
                    <option value="107">107</option>
                    <option value="111">111</option>
                    <option value="208">208</option>
                </select><br />
                <label for="plandateofBorrow">Date of Borrwing:</label><br />
                <input type="date" id="plandateofBorrow" name="plandateofBorrow"/><br />
                <label for="plandateofReturn">Date of Returning:</label><br />
                <input type="date" id="plandateofReturn" name="plandateofReturn"/><br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
} 

//Function to Populate Dropdown form
export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("lab_equipment");

        const request = await db
            .collection("lab")
            .find({})
            .sort({ lab: 1 })
            .limit(150)
            .toArray();

        return {
            props: { equipment: JSON.parse(JSON.stringify(request)) },
        };
    } catch (e) {
        console.error(e);
    }
}