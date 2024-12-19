"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Rocket, Bell } from "lucide-react";
import { useState } from "react";

export function TeamsComingSoon() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
  
    const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      window.location.href = `mailto:ibrahimdoba55@gmail.com?subject=Notify me about Quillstash Teams&body=Please notify me when team collaboration features become available.%0D%0A%0D%0AEmail: ${email}`;
      setIsSubscribed(true);
      setEmail("");
    };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-background to-muted/20 px-6 py-12">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            Team Collaboration
          </h1>
          <p className="mb-8 text-xl text-muted-foreground sm:text-2xl font-semibold">
            Coming Soon to Quillstash
          </p>

          <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-card-foreground flex justify-center items-center flex-col shadow-sm">
              <Rocket className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Collaborative Editing</h3>
              <p className="text-sm text-muted-foreground">
                Work together in real-time on content creation and editing
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground flex justify-center items-center flex-col shadow-sm">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Team Management</h3>
              <p className="text-sm text-muted-foreground">
                Organize teams, assign roles, and manage permissions effortlessly
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground flex justify-center items-center flex-col shadow-sm">
              <Bell className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Stay informed with instant notifications and activity feeds
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-md">
            {isSubscribed ? (
              <div className="rounded-lg bg-primary/10 p-6">
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  Thank you for your interest!
                </h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll notify you when team collaboration features are available.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button  type="submit">
                  Notify Me
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}