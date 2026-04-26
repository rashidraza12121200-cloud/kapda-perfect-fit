import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Mail, Phone, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [mode, setMode] = useState("signin"); // signin | signup
  const [method, setMethod] = useState("email"); // email | phone

  // Email state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone state (demo OTP)
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let displayName = fullName;
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (fullName) await updateProfile(cred.user, { displayName: fullName });
        toast.success("Account created 🚀");
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        displayName = cred.user.displayName || email.split("@")[0];
        toast.success("Welcome back 👋");
      }
      login({ name: displayName || email.split("@")[0], email });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\+?\d{10,15}$/.test(phone.replace(/\s/g, ""))) {
      toast.error("Enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setOtp("");
      // Demo mode: show the OTP on screen instead of sending real SMS
      toast.success(`Demo OTP: ${code}`, {
        description: "In production this would be sent via SMS.",
        duration: 10000,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!generatedOtp) return;
    setLoading(true);
    try {
      if (otp.trim() !== generatedOtp) {
        toast.error("Invalid OTP. Try again.");
        return;
      }
      const formatted = phone.startsWith("+") ? phone : `+91${phone}`;
      toast.success("Phone verified ✅");
      login({ name: fullName || formatted, phone: formatted });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Kapda<span className="text-primary">+</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="grid grid-cols-2 bg-secondary rounded-lg p-1 mb-5">
            <button
              onClick={() => setMode("signin")}
              className={`py-2 text-sm font-medium rounded-md transition ${mode === "signin" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`py-2 text-sm font-medium rounded-md transition ${mode === "signup" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Sign Up
            </button>
          </div>

          {/* Method tabs */}
          <Tabs value={method} onValueChange={(v) => { setMethod(v); setGeneratedOtp(null); setOtp(""); }} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="email"><Mail className="w-4 h-4 mr-2" />Email</TabsTrigger>
              <TabsTrigger value="phone"><Phone className="w-4 h-4 mr-2" />Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "signin" ? "Sign In" : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              {!confirmation ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  {mode === "signup" && (
                    <div>
                      <Label htmlFor="pname">Full Name</Label>
                      <Input id="pname" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" required />
                    <p className="text-xs text-muted-foreground mt-1">Include country code, e.g. +91</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Continue"}
                  </Button>
                  <button type="button" onClick={() => setConfirmation(null)} className="w-full text-xs text-muted-foreground hover:text-foreground">
                    Change number
                  </button>
                </form>
              )}
              <div ref={recaptchaRef} />
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-5">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-primary font-semibold">
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
