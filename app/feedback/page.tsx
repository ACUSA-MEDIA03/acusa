"use client"

// import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
export default function Feedback() {
  // const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Navbar />
        <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Share your complaints, observations, or suggestions to help us improve your experience.
          </p>
        </div>

        </div>

      <Footer />
  </>
  )
}