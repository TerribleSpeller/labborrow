import {useState} from 'react';
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Signup() {

    //const session = await getServerSession(authOptions);

    //if (session) redirect("./dashboard");
    var data = useSession()
    console.log(data)


    const [registerUsername, setRegisterUsername ] = useState('');
    const [registerEmail, setRegisterEmail ] = useState('');
    const [registerPassword, setregisterPassword ] = useState('');
    const [registerError, setRegisterError] = useState('')
    const router = useRouter();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registerUsername || !registerEmail || !registerPassword) {
            setRegisterError("All Fields are Necessary")
            return;
        }

        if(registerPassword.length < 6 ) {
            setRegisterError("Password must be at least six letters long!")
            return;
        }

        try {
            var tempString = registerEmail.split("@");
            console.log(tempString);

            if(tempString[1] != 'binus.ac.id'){
                setRegisterError("Must use binus.ac.id account")
                return;
            }

            const resUserExists = await fetch("api/userexistsfunction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({registerUsername, registerEmail, registerPassword,})
            })

            if (resUserExists.status == 201 ) {
                console.log(resUserExists)
                console.log("User found, fucked.")
                setRegisterError("User/Email already registered")
                return;
            } else {
                console.log("No User Foun -> Is ok")
            }

            const res = await fetch("api/registerfunction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({registerUsername, registerEmail, registerPassword,})
            })
            if (res.ok) {
                const form = e.target;
                form.reset();
                setRegisterError("Successfully Registered!")
                router.push("/")
            } else {
                console.log("Error During Registration:", registerError)
            }
              
        } 

        catch(registerError) {
            console.log(registerError)
        }
    }

    return (
        <>
            <div>
                <h1>Sign Up!</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input type="text" name ="username" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input><br/><br/>
                    <input type="text" name ="email" placeholder="email" onChange={e => setRegisterEmail(e.target.value)}></input><br/><br/>
                    <input type="password" name ="password" placeholder="password" onChange={e => setregisterPassword(e.target.value)}></input><br/><br/>
                    <button>Sign Up! </button><br/>
                    <br/>
                    <h3>Please do not use the same password as your regular password</h3>

                    {
                        registerError && (
                            <div>
                                {registerError}
                            </div>
                        )
                    }
                </form>
                
            </div>
        </>
    )
}