import {useState} from 'react';
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useEffect } from 'react';


export default function Login() {

    const [loginEmail, setloginEmail ] = useState('');
    const [loginPassword, setloginPassword ] = useState('');
    const [loginError, setloginError] = useState('');
    const router = useRouter();

    const blankFunction = () => {
        console.log("awaited. ")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                loginEmail, loginPassword, redirect: true, callbackUrl: '/equipment?=loggedin' 
            })
            console.log(res.user)
            if(res.error) {
                setloginError("Invalid Credentials")    
            }
        } catch(loginError) {
            console.log(loginError)
        }
    }


    return (
        <>
            <div >
                <h1>Sign In</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input type="text" name ="email" placeholder="email" onChange={e => setloginEmail(e.target.value)}></input><br/><br/>
                    <input type="password" name ="password" placeholder="password" onChange={e => setloginPassword(e.target.value)}></input><br/><br/>
                    <button>Sign In!</button><br/>
                </form>
                <br/>
                {
                        loginError && (
                            <div>
                                {loginError}
                            </div>
                        )
                    }
            </div>
        </>
    )
}