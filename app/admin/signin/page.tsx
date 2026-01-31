"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserPlus, Info, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo/media.jpg"


export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center  px-4 py-12 font-mont">
          <div className="w-full max-w-md">
            {/* Logo/Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16">
                <Image src={Logo} 
                  className="w-16 h-16 object-contain"
                alt="ACUSA Media Logo"/>
              </div>
              <h1 className="text-3xl font-bold text-main mb-2 font-grotesk">
                Admin Login
              </h1>
              <p className="text-sub text-sm">
                Signin to  your admin account for ACUSA
              </p>
            </div>
    
            {/* Main Card */}
            <Card className="border-0 shadow-2xl shadow-slate-200/50 backdrop-blur-sm bg-white/80">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-semibold text-main font-grotesk">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-sub">
                  Fill in your details to signin to your admin account
                </CardDescription>
              </CardHeader>
    
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Alert */}
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200 text-red-800 animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm font-medium">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
    

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-main"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 bg-slate-50 border-slate-200 focus:border-main focus:ring-main transition-all duration-200"
                      placeholder="admin@acusa.edu"
                      disabled={loading}
                    />
                  </div>
    
                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-main"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="h-12 bg-slate-50 border-slate-200 focus:border-main focus:ring-main transition-all duration-200 pr-12"
                        placeholder="••••••••"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sub hover:text-main transition-colors duration-200"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
    
                
    
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-main hover:bg-main/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Log in...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Signin 
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
    
                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-sub">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/admin/signup"
                      className="font-semibold text-main hover:text-sub transition-colors duration-200"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
    
            {/* Info Box */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info className="h-4 w-4 text-main" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-main leading-relaxed">
                    This panel is for admin accounts only. Make sure you have
                    authorization to have an admin account.
                  </p>
                </div>
              </div>
            </div>
    
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-sub">
                © {new Date().getFullYear()} ACUSA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
  );
}