
import Signup from "../components/registerForm";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { GetServerSideProps } from "next";

export default function RegisterPage() {
    const { data: session } = useSession();
    console.log(session)
    const router = useRouter()


    if(session){
        router.push("equipment")
    }

   return (
        <div onLoad={GetServerSideProps}>
            <Signup/>
        </div>
   )
    
}