"use client";
import { signOut } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { GetServerSideProps } from "next";

export default function Logout() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signOut({ callbackUrl: '/' });

            console.log(res)
            if(res.error) {
                console.log(res.error)
            }
        } catch(error) {
            console.log(error)
        }
    }  

    return (
        <>
            <div>
                <h1>Sign Out</h1>
                <form onSubmit={handleSubmit}>
                    <button>Sign Out!</button>
                </form>
            </div>
        </>
    )
}