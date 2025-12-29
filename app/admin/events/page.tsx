"use client"
import { useState } from "react";
interface EventProps{
    date: number;
    suffix: "st" | "nd" | "rd" | "th";
    month: string;
    year: number;
    time: string;
    location: string;
    eventTitle: string;
}

export default function Events({ date, suffix, month, year, time, location, eventTitle }): EventProps {
    
    const [form, setForm] = useState({
       date: "",
        suffix: "th",
       month: "",
       year: "",
       time: "",
       location: "",
       eventTitle: ""
    });
    return (
        <>
        </>
    )
}