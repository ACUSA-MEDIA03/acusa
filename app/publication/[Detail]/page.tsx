"use client"
import { ArrowRight } from "lucide-react"
import Navbar from "@/component/Navbar"
import Footer from "@/component/Footer"
import Link from "next/link"
export default function Detail() {
    return (
        <>
            <Navbar />

        <div className="px-22.5 h-[34lvh] py-4 bg-[#0C1657] flex items-start justify-end flex-col text-white">
        <h2 className="font-rubik font-bold text-[40px]">Publications</h2>
        <p className="font-grotesk tracking-[0.9px] flex items-center gap-2">
          <Link href={`/publication`}>Publications</Link> <ArrowRight />
          {/* {title} */}
        </p>
            </div>
            
            {/* Body */}
            

            <Footer />
        </>
    )
}