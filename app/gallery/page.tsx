"use client"

import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
export default function Gallery() {
    return (
        <>
        <Navbar />
        
        
         <div className="border border-purple-950 grid relative">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-3.25 w-full h-[60vh] ">
          <div
            className=" topleft bg-no-repeat bg-cover flex items-center"
            style={{ backgroundImage: `url(/Gallery/1.JPG)` }}
          ></div>
          <div
            className=" topright bg-no-repeat bg-center bg-cover "
            style={{ backgroundImage: `url(/Gallery/2.JPG)` }}
          ></div>
        </div>

        {/* Middle Section */}
        <div
          className="middle bg-no-repeat bg-cover left-0 bg-position-[50%_40%] h-[60vh] relative "
          style={{ backgroundImage: `url(/Gallery/all.JPG)` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#0c16578a]">
          </div>
        </div>
        {/* Middle Section */}

        {/* Last Row */}
        <div className="grid grid-cols-2 gap-3.25 relative w-full h-[60vh] ">
          <div
            className=" bottomleft bg-no-repeat bg-cover flex items-center"
            style={{ backgroundImage: `url(/Gallery/3.JPG)` }}
          ></div>
          <div
            className=" bottomright bg-no-repeat bg-center bg-cover "
            style={{ backgroundImage: `url(/Gallery/4.JPG)` }}
          ></div>
        </div>
      </div>

      <div className="  bg-[#D49906] text-white py-3 px-20 relative ">
        <h2 className="font-rubik font-bold text-[24px] text-center lg:text-[50px]">
          Embark on a Journey Through a Gallery Highlighting ACUSA&apos;s
          Excellence
        </h2>
        </div>


        <div>
          
        </div>
      
            <div id="footer" className="relative ">
                <Footer />
            </div>
            
        </>
    )
}