'use client'

import signIn from "@/firebase/config";
import { LoginScreen } from '@/components/component/login-screen'
import { useRouter } from 'next/navigation'
import { useState } from "react"



function Page() {

    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
  

    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/cliente")
    }
    return (
        <>
          <LoginScreen handleForm={handleForm} setEmail={setEmail} setPassword={setPassword}/>
        </>
    )
}

export default Page;