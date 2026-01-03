// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function SignIn() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");
//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//     if (res?.error) {
//       setError("Invalid email or password");
//       return;
//     }
//     // On successful login
//     router.push("/admin");
//   };

//   return (
//       <div className="max-w-md mx-auto mt-20 space-y-4">
          
//           <h2>Login </h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full border p-2"
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full border p-2"
//       />

//       {error && <p className="text-red-500">{error}</p>}

//       <button
//         onClick={handleLogin}
//         className="w-full bg-black text-white p-2"
//       >
//         Login
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission if wrapped in form
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin", // Specify where to go after login
        
      });

      console.log("SignIn response:", res); // Debug log

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      if (res?.ok) {
        // Login successful - force navigation
        window.location.href = "/admin"; // Use window.location for hard redirect
      router.push("/admin")
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        disabled={loading}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <a href="/admin/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}