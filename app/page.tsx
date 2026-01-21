import  Image from "next/image";
import Link from "next/link";
// components
import NavBar from "../component/Navbar";
import Footer from "../component/Footer";
import Button from "../component/Button";
import Card from "../component/Card/Card"
import EventCards from "../component/Card/EventCards";
import ProfileCard from "../component/Card/ProfileCard";

// Data Objects
import {Events} from "@/assets/data/Events";

import Banner from "@/assets/Banner/banner.jpg"
import Animation from "@/assets/Animation/animation.gif"
import President from "@/assets/Executives/President.jpg"
import Vice_President from "@/assets/Executives/Vice_President.jpeg"

export default function Home() {
  return (
    <>
      <NavBar />
        <div
        className={`lg:h-screen grid bg-no-repeat bg-cover bg-center`}
        style={{backgroundImage: `url(${Banner.src})`}}>
        <div className="overlay flex justify-center flex-col lg:p-17.5 px-5 py-30 text-white">
          <div className="lg:space-y-6 space-y-4">
            <p className="font-grotesk lg:text-[30px] text-[15px] ">
              Welcome to the ACUSA Website
            </p>
            <p className="lg:text-[90px] text-[30px] lg:w-220 place-content-center font-rubik font-thin lg:leading-22.5">
              Ajayi Crowther Student Assembly
            </p>

            {/* Button */}
            <div className="border lg:w-[15%] w-[40%] grid mt-2">
              <Button text={`View More ...`} bgcolor='blue'/>
            </div>
            {/* Button */}
          </div>
        </div>
      </div>

       {/* What About Us */}
      <div className="lg:p-10 p-5 grid lg:grid-cols-2 bg-main text-white gap-4">
        {/* left */}
        <div className="flex flex-col justify-center items-left lg:p-5 space-y-3 p-2.5">
          <b className="font-rubik lg:text-[56px] text-[40px]">
            What We Are All About?
          </b>

          <p
            className="font-grotesk leading-8 text-[14px]"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`Welcome to the heart of student advocacy and empowerment at Ajayi Crowther University. The Student Assembly Body is a dedicated team of elected student leaders committed to amplifying the voices,interests, and concerns of the diverse student body.
As elected representatives, we serve as a vital link students, faculty, and administration. We actively engage with our peers to understand their perspectives, gather feedback, and champion their interests across various facets of university life.`}
          </p>

          {/* Button */}
          <div className="border lg:w-[15%] w-[40%] grid mt-2">
              <Button text={`View More ...`} bgcolor='blue'/>
            </div>
          {/* Button */}
        </div>
        {/* left */}

        {/* right */}
        <div className="grid lg:grid-cols-2 gap-1">
          <div className="flex gap-5 flex-col p-2 lg:mb-8">
            <Card
              white
              number={1}
              title="Media Coverage"
              text=" We amplify student voices by highlighting key issues, achievements, and events through responsible and engaging media coverage that informs, educates, and inspires the campus community."
            />
            <Card
              number={2}
              title="Students Welfare"
              text="We foster a culture of service by organizing outreach programs, volunteering initiatives, and social impact projects that strengthen our connection with the wider community."

            />
          </div>

          <div className="flex gap-5 flex-col p-2 lg:mt-8">
            <Card
              number={3}
              title="Student Activism"
              text="We encourage active student participation in leadership, dialogue, and advocacy by empowering students to stand up for their rights and contribute to positive institutional change."

            />
            <Card
              number={4}
              title="Community Service"
              text="We foster a culture of service by organizing outreach programs, volunteering initiatives, and social impact projects that strengthen our connection with the wider community."

            />
          </div>
        </div>
        {/* right */}
      </div>

      
       {/* upcoming Events */}
      <div className="lg:grid-cols-5 lg:grid lg:p-10 gap-4 p-5">
        <div className="lg:col-span-3 flex-col flex justify-center items-left lg:p-5 space-y-7">
          <div className="">
            <b className="font-rubik lg:text-[56px] text-[40px] text-main">
              Upcoming Events{" "}
            </b>

            <p className="font-grotesk font-light lg:text-[25px] text-[15px]">
              These is the schedule of events coming up in school
            </p>
          </div>

          {/* Event Card */}
          <div className="grid gap-7">
            {Events.slice(0, 3).map((event) => {
              return (
                <EventCards
                  key={event.eventTitle}
                  date={event.date}
                  suffix={event.suffix}
                  month={event.month}
                  year={event.year}
                  time={event.time}
                  location={event.location}
                  eventTitle={event.eventTitle}
                />
              );
            })}
          </div>
          {/* Event Card */}
        </div>

        <div className="lg:col-span-2 lg:grid hidden place-content-center lg:mt-0 mt-5">
          <Image  src={Animation} alt="Calendar Animation" className="lg:w-162.5"/>
        </div>
      </div>

      
       {/* Executives */}
      <div className="lg:p-10 p-2.5 flex lg:flex-row flex-col bg-[#dfa41cda] text-white gap-4">
        {/* left */}
        <div className="flex flex-col justify-center items-left lg:p-5 space-y-3 p-2.5 basis-[50%]">
          <b className="font-rubik lg:text-[52px] text-[30px]">
            Meet The Central Executive Committee
          </b>

          <p
            className="font-grotesk leading-8 text-[14px]"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`Welcome to the heart of student advocacy and empowerment at Ajayi Crowther University. The Student Assembly Body is a dedicated team of elected student leaders committed to amplifying the voices,interests, and concerns of the diverse student body.`}
          </p>

          {/* Button */}
          <div className="border lg:w-[30%] w-[50%] grid mt-2">
            <Button text={`Meet The Team ...`} bgcolor='sub' />
          </div>
          {/* Button */}
        </div>
        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-5 p-3 basis-[60%]">
             {/* Profile Card */}
          <ProfileCard
            name="Bello Emmanuel"
            position="President"
            image={President.src}
          />
          <ProfileCard
            name="Faleye Gift "
            position="Vice President"
            image={Vice_President.src} />

        </div>
        {/* right */}
      </div>
      
      <Footer />
    </>  
  )
}