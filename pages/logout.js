"use client";
import { signOut } from "next-auth/react";

export default function Logout() {

    return (
        <>
            <div>
                <h1>Sign OUT!!</h1>
                <form onSubmit={signOut}>
                    <button>Sign Out!</button>
                </form>
            </div>
        </>
    )
}