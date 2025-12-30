"use client"
// import { useState } from "react";
interface EventProps{
    date: number;
    suffix: "st" | "nd" | "rd" | "th";
    month: string;
    year: number;
    time: string;
    location: string;
    eventTitle: string;
}

export default function EventsPage() { 
    return (
        <>
            <div>
                <h2>
                Manage Events Calendar</h2></div>  
        </>
    )
}