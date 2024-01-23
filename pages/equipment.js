import clientPromise from "../lib/mongodb";
import { useEffect, useState } from 'react';
import { useSession, getSession } from "next-auth/react";
import Link from 'next/link';
import { GetServerSideProps } from "next";


export default function equipment({ equip }) {
    const { data: session } = useSession();


    useEffect(() => {
        const onShowFunction = () => {
            console.log('Page is shown!');
            useEffect(() => {
                window.addEventListener('pageshow', GetServerSideProps);
        
            })
          };
        
          window.addEventListener('pageshow', GetServerSideProps);
    
          return () => {
            window.removeEventListener('pageshow', onShowFunction);
          };
    }, [])
    return (
        
        <div onLoadStart={GetServerSideProps}>

            <br/>
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

export {GetServerSideProps}

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