"use client"

import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

import { useState } from "react";


interface galleryProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);


  const galleryItems: galleryProps[] = [
    {
      id: 1,
      title: "",
      description: "",
      imageUrl: "/Gallery/1.JPG",
      category: "",
    },
    {
      id: 2,
      title: "",
      description: "",
      imageUrl: "/Gallery/2.JPG",
      category: ""
    }
  ]

  const categories = ["All", "Events", "Executives", "Activities"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)
  
  //  function to open modal 
  const openModal = (index: number) => {
    setSelectedImage(index);
  }

  // function to close the modal 
  const closeModal = () => {
    setSelectedImage(null);
  }
//  check next image function
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  }
//  function to check previous image
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 :
        selectedImage - 1
      );
    }
  }
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
        <div className="py-12 px-6 lg:px-8 bg-white border-b border-gray-100">  


        </div>
            <div id="footer" className="relative ">
                <Footer />
            </div>
            
        </>
    )
}