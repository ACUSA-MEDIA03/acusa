"use client"
import Animation from "@/assets/Animation/animation.gif"
import Image from 'next/image'
import EventCards from "@/component/Card/EventCards";
import {Events} from "@/assets/data/Events";

export default function Admin(){
    return (
        <>
    <div className="mt-12 px-6">
      <h1 className="lg:text-[56px] text-[40px] font-bold text-main">Admin Dashboard</h1>
      <p>Welcome to the admin panel</p>
    </div>
             {/* Events */}
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
                        {Events.slice(0,1).map((event) => {
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
            
                    <div className="lg:col-span-2 lg:grid  place-content-center lg:mt-0 mt-5">
                      <Image  src={Animation} alt="Calendar Animation" className="lg:w-162.5"/>
                    </div>
            </div>
            


        </>
    )
}