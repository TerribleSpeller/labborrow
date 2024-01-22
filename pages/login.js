import {useState} from 'react';
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";


export default function Login() {

    const [loginEmail, setloginEmail ] = useState('');
    const [loginPassword, setloginPassword ] = useState('');
    const [loginError, setloginError] = useState('');
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                loginEmail, loginPassword, redirect: false,
            })
            if(res.error) {
                setloginError("Invalid Credentials")
            }
            console.log("Login Suceesed!")
            router.replace("equipment")
        } catch(loginError) {
            console.log(loginError)
        }
    }

    return (
        <>
            <div>
                <h1>Sign In!!</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name ="email" placeholder="email" onChange={e => setloginEmail(e.target.value)}></input>
                    <input type="password" name ="password" placeholder="password" onChange={e => setloginPassword(e.target.value)}></input>
                    <button>Sign In!</button>
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