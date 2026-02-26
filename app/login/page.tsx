"use client";
import { useState } from "react";
import { BookHeart, Lock } from "lucide-react";

export default function Login() {

  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
      document.cookie = "auth=true; path=/";
      window.location.href = "/";
    } else {
      alert("Incorrect password.");
    }
  }

  return (
    <>
      <article className="flex flex-col items-center justify-center gap-6 min-h-screen p-8">
        <div className="card">
          <BookHeart className="h-16 w-auto text-primary" />
        </div>
        <div className="text-center">
          <h1>Login</h1>
          <h4 className="mt-2">Enter the password to access ToonTrack</h4>
        </div>
        <form className="card flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-0">
            <Lock className="h-5 w-auto text-primary" />
            <h3>Secure Access</h3>
          </div>
          <p className="mt-2 mb-6 text-sm">This is a private dashboard for authorized users.</p>
          <input type="password" placeholder="Enter password..." className="border bg-slate-50 border-slate-200 shadow-sm px-3 py-1 text-emph rounded-full outline-none focus:border-primary mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="highlight">Access Dashboard</button>
        </form>
      </article>
    </>
  );
}