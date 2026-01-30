import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeedbackCard from "@/components/card/Feedback"
import { MessageSquare } from "lucide-react"
export default function Feedback() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-main mb-4">
              <MessageSquare className="w-8 h-8 text-sub" />
            </div>
            <h1 className="text-4xl md:text-5xl font-grotesk font-bold text-main mb-4">
              We Value Your Feedback
            </h1>
            <p className="text-lg  max-w-2xl mx-auto leading-relaxed">
              Share your complaints, observations, or suggestions to help us improve your experience. 
              Your voice matters to us.
            </p>
          </div>
          {/* Form Card */}
         <FeedbackCard />
        </div>
      </div>
      <Footer />
    </>
  )
}