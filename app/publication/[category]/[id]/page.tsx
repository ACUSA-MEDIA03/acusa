import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import Details from "@/components/PublicationSection/Details";
import OfficialLetter from "@/components/PublicationSection/OfficialLetter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface PageProps {
  params: {
    title: string;
    id: string;
  };
}
export default function PublicationsPage({ params }: PageProps) {
    const { title, id } = params;
    console.log("Params:", title, id);
    return (
        <>
            <Navbar />

         {/* TopNav */}
      <div className="px-22.5 h-[34lvh] py-4 bg-[#0C1657] flex items-start justify-end flex-col text-white">
        <h2 className="font-rubik font-bold text-[40px]">Publications</h2>
        <p className="font-grotesk tracking-[0.9px] flex items-center gap-2">
          <Link href="/publication" className="hover:underline">  Publications </Link>{" "} <ArrowRight />
          {title}
        </p>
      </div>
     
        {title ===
          "Official Letters" ?
          <OfficialLetter />
          :
           <Details />
         }
    
        <Footer />
         </>
     )
 }



