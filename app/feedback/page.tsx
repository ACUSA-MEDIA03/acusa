"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Send, MessageSquare, Mail, Phone, User, Loader2, CheckCircle2 } from "lucide-react"

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (!response.ok) {
        toast.error(data.message || "An error occurred while submitting your feedback.")
        return
      }

      toast.success("Thank you for your feedback!", {
        description: "We appreciate you taking the time to share your thoughts."
      })
      resetForm()
    } catch (error) {
      toast.error("An error occurred while submitting your feedback.", { 
        description: (error as Error).message 
      })
    } finally {
      setSubmitted(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phonenumber: "",
      message: ""
    })
  }

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
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-main font-grotesk">
                    <User className="w-4 h-4 text-sub" />
                    Name <span className="text-sub font-grotesk">(Optional)</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => 
                      setFormData({
                        ...formData, 
                        name: e.target.value
                      })
                    }
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-main/20"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-main font-grotesk">
                    <Mail className="w-4 h-4 text-sub" />
                    Email <span className="text-sub font-grotesk">(Optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData, 
                        email: e.target.value
                      })
                    }}
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-main/20"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-sm font-medium flex items-center font-grotesk text-main gap-2">
                    <Phone className="w-4 h-4 text-sub" />
                    Phone Number <span className="text-sub font-grotesk">(Optional)</span>
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="+1 (234) 567-8900"
                    value={formData.phonenumber}
                    onChange={(e) => 
                      setFormData({
                        ...formData, 
                        phonenumber: e.target.value
                      })
                    }
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-main/20"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium flex items-center text-main gap-2">
                    <MessageSquare className="w-4 h-4 text-sub" />
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Share your complaints, feedback, observations, or requests..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData, 
                        message: e.target.value
                      })
                    }
                    rows={8}
                    required
                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-main/20"
                  />
                  <p className="text-xs text-main">
                    {formData.message.length} characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="bg-main hover:bg-main/90 h-11 flex-1 sm:flex-none sm:min-w-40 transition-all duration-200 text-sub"
                    disabled={submitted || !formData.message.trim()}
                  >
                    {submitted ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2  animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 " />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                  
                  {(formData.name || formData.email || formData.phonenumber || formData.message) && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetForm}
                      className="h-11"
                      disabled={submitted}
                    >
                      Clear Form
                    </Button>
                  )}
                </div>

                {/* Privacy Notice */}
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 text-sm text-main">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <p>
                      We respect your privacy. Your information will only be used to respond to your feedback 
                      and improve our services.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Help Section */}
          {/* <div className="mt-8 text-center">
            <p className="text-sm text-main">
              Need immediate assistance?{" "}
              <a href="/contact" className="text-primary hover:underline font-medium">
                Contact our support team
              </a>
            </p>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  )
}