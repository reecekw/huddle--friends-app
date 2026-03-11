import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserPlus, Clock, MessageCircle, Star, Instagram, Twitter, Youtube } from "lucide-react";

const REVIEWS = [
  { quote: "I struggled to make friends after moving, but Huddle matched me with people who actually get me. Lifelong friends!", name: "Amanda", location: "San Francisco", stars: 5 },
  { quote: "Finally have a squad to play pickup basketball with. This app changed my weekends.", name: "Thomas", location: "Cleveland", stars: 5 },
  { quote: "The 24-hour drops keep it exciting. Every day feels like a new opportunity.", name: "LeBron", location: "Los Angeles", stars: 5 },
  { quote: "I feel like I finally have a real support group. Not just online friends — real ones.", name: "Alice", location: "Dallas", stars: 4 },
  { quote: "Found gym bros who actually show up. We've been consistent for 3 months now.", name: "Greg", location: "Provo", stars: 5 },
  { quote: "Reconnected with an old friend by total chance. This app is magic.", name: "Ryan", location: "Austin", stars: 5 },
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Take the Quiz",
    description: "Answer a quick personality quiz so we can understand your vibe and what you're looking for.",
  },
  {
    icon: Clock,
    title: "Get Matched Every 24h",
    description: "Every day, we drop you into a new group of people who share your energy and interests.",
  },
  {
    icon: MessageCircle,
    title: "Chat & Connect",
    description: "Jump into your group chat, make plans, and turn strangers into your new crew.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

        <h1 className="text-6xl font-black text-foreground leading-none tracking-tight animate-fade-in relative">
          Huddle
        </h1>
        <p className="text-xl font-semibold text-primary mt-3 animate-slide-up">
          New friends, every 24 hours.
        </p>
        <p className="text-base text-muted-foreground mt-4 max-w-sm leading-relaxed animate-slide-up">
          We match you with people who get you — then drop you into a group chat. No swiping. No awkward intros.
        </p>
        <div className="flex gap-3 mt-8 animate-slide-up">
          <Button
            variant="ghost"
            className="rounded-full px-6 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/get-started")}
          >
            Log in
          </Button>
          <Button
            className="rounded-full px-8 h-12 text-base font-semibold"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">How It Works</h2>
        <div className="space-y-4 max-w-sm mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.title} className="bg-secondary rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0 px-2 py-0">
                    Step {i + 1}
                  </Badge>
                  <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">What People Are Saying</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">Real stories from real users</p>
        <div className="max-w-sm mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {REVIEWS.map((r) => (
                <CarouselItem key={r.name}>
                  <div className="bg-secondary/50 border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < r.stars ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">"{r.quote}"</p>
                    <div className="flex items-center gap-3 pt-1">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {r.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.location}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 bg-secondary border-border hover:bg-secondary/80" />
              <CarouselNext className="static translate-y-0 bg-secondary border-border hover:bg-secondary/80" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 text-center">
        <div className="bg-secondary rounded-2xl p-8 max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">Ready to find your crew?</h2>
          <p className="text-sm text-muted-foreground mb-6">It takes less than 2 minutes to get started.</p>
          <Button
            className="rounded-full px-8 h-12 text-base font-semibold w-full"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              <span className="text-primary">H</span>uddle
            </span>
            <div className="flex gap-4 text-muted-foreground">
              <Twitter className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
              <Instagram className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
              <Youtube className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
          </div>
          <p className="text-xs text-muted-foreground/60">&copy; 2026 Huddle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
