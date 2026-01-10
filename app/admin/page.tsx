"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "@/assets/Logo/logo.png"
import AcusaMedia from "@/assets/Logo/media.jpg"
export default function Admin() {

  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
  //  if admin is authenticated redirect to dashboard
    if (status ===  "authenticated") {
      router.push("/admin/dashboard")
    } 
    //  if not authenticated redirect to signup
    else if (status === "unauthenticated") {
      router.push("/admin/signin")
    }
  }, [status,router])

  //  show loading state while checking for authentication state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Image 
          src={AcusaMedia} 
          alt="Acusa Media" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <Image 
            src={Logo} 
            alt="Acusa Logo" 
            width={150} 
            height={150} 
            className="mx-auto mb-4"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      </div>
    )
  }
  return (
        <>
        <div className="min-h-screen flex items-center justify-center">
        <Image 
          src={AcusaMedia} 
          alt="Acusa Media" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <Image 
            src={Logo} 
            alt="Acusa Logo" 
            width={150} 
            height={150} 
            className="mx-auto mb-4"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      </div>
        </>
    )
}