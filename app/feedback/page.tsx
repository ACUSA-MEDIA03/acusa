"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export default function Feedback() {
    return (
        <>
           <Navbar />
             <div className="max-w-md mx-auto mt-20 space-y-4">
     <h2 className="text-2xl font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        // disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        // disabled={loading}
        // onKeyPress={(e) => {
        //   if (e.key === "Enter") {
            // handleLogin(e);
        //   }
        // }}
      />

</div>
            <Footer />
            </>
    )
}