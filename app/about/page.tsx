"use client"

import { useState } from "react"
import Image from "next/image"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Leaders, Team } from "@/assets/data/Leader"
import { MissVision } from "@/assets/data/AboutUs"
import MissVisionCard from "../../components/card/missvissioncard"
import ProfileCard from "../../components/card/aboutprofilecard"
import Banner from "@/assets/Banner/all.jpg"
import Acusa from "@/assets/Logo/logo.png"
import Acusa_Media from "@/assets/Logo/media.jpg"
import Frame270 from "@/assets/About/Frame270.png"
import Frame272 from '@/assets/About/Frame272.png'
import Frame273 from '@/assets/About/Frame273.png'
import Frame275 from '@/assets/About/Frame275.png'
export default function About() {
  
  const [category, setCategory] = useState("Executive");
  const filteredLeaders = Leaders.filter((leader) => leader.tag === category);
  const filteredTeam = Team;
    return (
        <>
        <div className="min-h-screen">
        <Navbar />
                
        {/* HERO Section*/}
         <div
        className="h-[50vh] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${Banner.src})` }}>
        <div className="flex justify-center flex-col px-5 lg:px-20 py-32 text-white h-full bg-black/40 ">
          <div className="max-w-4xl space-y-4 lg:space-y-6 pt-12">
            <h1 className="font-bold text-4xl lg:text-6xl leading-tight ">
              About Us
            </h1>
            <p className="text-lg lg:text-2xl leading-relaxed max-w-3xl">
              Learn all there is to learn about the Ajayi Crowther University
              Students&apos; Assembly
            </p>
          </div>
        </div>
         </div>


        {/* Learn more about ACUSA section */}
        <section className="px-5 lg:px-20 py-12 lg:py-20">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-[8px] lg:text-[24px] font-semibold text-gray-600 mb-2">
            Learn about ACUSA
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold leading-tight max-w-4xl font-rubik ">
            There is more to the Ajayi Crowther University Students Assembly
            than just simply paying the ACUSA fee.
          </h2>
        </div>

    {/* Content Grid */}
<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
  {/* Image Grid */}
  <div className="w-full lg:w-1/2">
    <div className="grid grid-cols-4 grid-rows-2 auto-rows-[150px] lg:auto-rows-[260px] gap-3 lg:gap-5">

      <div className="relative col-span-3 h-37.5 lg:h-65">
        <Image
          src={Frame270}
          alt="Students in a lecture hall"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="relative h-37.5 lg:h-65">
        <Image
          src={Frame272}
          alt="Students in a lecture hall"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="relative col-span-1 h-37.5 lg:h-65">
        <Image
          src={Frame273}
          alt="Students in a lecture hall"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="relative col-span-3 h-37.5 lg:h-65">
        <Image
          src={Frame275}
          alt="Students in discussion"
          fill
          className="object-cover rounded-lg"
        />
      </div>

    </div>
  </div>
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-xl lg:text-3xl font-semibold leading-relaxed">
              ACUSA is a student-led organization, the Ajayi Crowther University
              Student Assembly (ACUSA) is committed to promoting the welfare,
              rights, and interests of all students at the university.
            </p>
            <p className="text-base lg:text-xl text-gray-700 leading-relaxed">
              As the liaison between the student body and the university
              administration, ACUSA, which is made up of chosen student
              officials, makes sure that students&apos; opinions are heard, their
              issues are taken care of, and their social and academic
              experiences are enhanced.
            </p>
          </div>
        </div>
            </section>
            
            {/* Logo, Mission and Vision Section */}
            <section className="bg-gray-100 px-5 lg:px-20 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Image
              src={Acusa}
                alt="ACUSA Logo"
                width={400}
                height={400}
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
            />
          </div>
          {/* Mission And Vision */}
          {MissVision.map((detail) => (
            <MissVisionCard
              key={detail.id}
              header={detail.header}
              description={detail.description}
            />
          ))}
        </div>
      </section>

    {/* Quote Section with Image */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Text Content */}
          <div className="bg-main text-white px-5 lg:px-20 py-12 lg:py-20 lg:w-2/3 flex flex-col justify-center">
            <p className="text-lg lg:text-3xl font-medium leading-relaxed mb-6">
              As a group founded on service, leadership, and accountability,{" "}
              <span className="font-bold">ACUSA</span> supports programs and
              policies that advance student growth, create a welcoming campus
              environment, and facilitate productive communication between
              students and school administrators.
            </p>
            <p className="text-base lg:text-2xl leading-relaxed opacity-90">
              ACUSA makes sure that the needs of the student body as a whole are
              satisfied through representation, engagement, and calculated
              action.
            </p>
          </div>

          {/* Image */}

<div className="lg:w-1/3 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 p-5 lg:p-0">
  <div className="relative w-full h-65 lg:h-105">
    <Image
      src={Frame275}
      alt="Students in a lecture hall"
      fill
      className="object-cover rounded-lg lg:rounded-none shadow-xl"
      sizes="(min-width: 1024px) 33vw, 100vw"
    />
  </div>
</div>

        </div>
            </section>
            

        {/* Leadership Section  */}
        <section className="bg-gray-100 px-5 lg:px-20 py-12 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12 max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Meet the ACUSA Leadership: Executives, Legislatives, Judiciary, and
            Appointees
          </h2>
          <p className="text-base lg:text-xl text-gray-700 leading-relaxed">
            Meet the dedicated individuals driving our vision forward. From the
            Executives to the Senate, Judiciary, and Executive Appointees, each
            member plays a vital role in governance, decision-making, and
            upholding the values of our community.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-12">
          {["Executive", "Legislative", "Judiciary", "Appointee"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setCategory(type)}
                className={`px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all ${
                  category === type
                    ? "bg-main text-white shadow-lg"
                    : "bg-gray-300 text-gray-800 hover:bg-main hover:text-white"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredLeaders.length <= 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-main text-lg lg:text-xl font-mono font-medium">
               Lost? What are you looking for!!! Sheriff caught you!  No {category}s available.
              </p>
            </div>
          ) : (
            filteredLeaders.map((leader, index) => (
              <ProfileCard
                key={index}
                name={leader.name}
                position={leader.position}
                image={leader.image}
                level={leader.level}
                tag={leader.tag}
                email={leader.email}
                phone={leader.phone}
                facebook={leader.facebook}
                x={leader.x}
                // linkedlin={leader.linkedlin}
                faculty={leader.faculty}
                department={leader.department}
              />
            ))
          )}
        </div>
      </section>

    {/* ACUSA Media Section */}
      <section className="px-5 lg:px-20 py-12 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12 max-w-5xl mx-auto">        
    <div className="flex flex-col items-center justify-center text-center gap-4 lg:gap-6 py-8 lg:py-12">
    <h2 className="text-2xl lg:text-4xl font-bold tracking-tight font-mono">
         About <span className="text-main font-rubik">ACUSA Media</span>
  </h2>

  <div className="relative">
    <Image
      src={Acusa_Media}
      alt="ACUSA Media Logo"
      width={192}
      height={192}
      className="object-contain"
      priority
    />
  </div>
  <div className="h-1 w-16 rounded-full bg-main opacity-80" />
</div>
          <p className="text-base font-mono lg:text-xl text-gray-700 leading-relaxed">
            ACUSA Media is the official media body for the Ajayi Crowther
            University Student&apos;s Assembly. It has the responsibility of
            providing full media activities for ACUSA. ACUSA Media is
            responsible for supporting ACUSA with its core responsibility; giving
            voice to the students and being an ear to the management. The ACUSA
            Media is therefore split into various teams that help achieve this
            goal. These teams are headed by the best individuals in their
            respective fields. They are:
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredTeam.length <= 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-main text-lg font-grotesk lg:text-xl font-medium">
                No team members available.
              </p>
            </div>
          ) : (
            filteredTeam.map((team, index) => (
              <ProfileCard
                key={index}
                name={team.name}
                position={team.position}
                image={team.image}
                email={team.email}
                phone={team.phone}
                x={team.x}
                linkedin={team.linkedin}
                department={team.department}
                level={team.level}
                faculty={team.faculty}  
                facebook={team.facebook}
              />
            ))
          )}
        </div>
      </section>      
                <Footer />
                </div>
        </>
    )
}