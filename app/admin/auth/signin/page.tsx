"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";


export default function signIn() {


    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


 
    return (

    )
}