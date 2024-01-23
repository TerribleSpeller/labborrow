"use client";
import { signOut } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { GetServerSideProps } from "next";

export default function Logout() {
    const router = useRouter();

    const handleSubmit = async () => {
        e.preventDefault();
        await signOut({ callbackUrl: '/' });

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