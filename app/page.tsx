import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import UserPrograms from "@/components/UserPrograms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">
        {/* SUBTLE BACKGROUND PATTERN FOR LIGHT MODE */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--aithena-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--aithena-grid-color)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* CORNER DECORATION */}
            <div className="absolute -top-8 left-0 w-16 h-16 border-l-2 border-t-2 border-primary" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative">
              {/* TODO: Use Typography component for heading if available */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <div>
                  <span className="text-foreground">Transform</span>
                </div>
                <div>
                  <span className="text-primary">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>

              {/* SEPARATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

              {/* TODO: Use Typography component for paragraph if available */}
              <p className="text-xl text-muted-foreground max-w-xl">
                Talk to our AI assistant and get personalized diet plans and
                workout routines designed just for you
              </p>

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                {/* TODO: Use Badge or Card for each stat if desired */}
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">xxx+</div>
                  <div className="text-xs uppercase tracking-wider">
                    ACTIVE USERS
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">
                    GENERATION
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">
                    PERSONALIZED
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="px-8 py-6 text-lg">
                  <Link href="/generate-program">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* ENHANCED CORNER PIECES */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 dark:border-border" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-secondary/30 dark:border-border" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/30 dark:border-border" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 dark:border-border" />
              </div>

              {/* IMAGE CONTAINER */}
              <div className="relative w-full max-w-lg aspect-square mx-auto">
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-card via-card/80 to-card/60 border border-border/50 shadow-lg">
                  <Image
                    src="/aithena.png"
                    alt="AI Fitness Coach"
                    fill
                    className="object-contain object-center p-6"
                    sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 600px"
                    priority
                  />

                  {/* ENHANCED SCAN LINE - Better for light mode */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),hsl(var(--primary)/0.4)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_20px] animate-scanline-enhanced pointer-events-none" />

                  {/* IMPROVED DECORATIONS */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Main targeting circle */}
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-primary/30 rounded-full shadow-sm" />

                    {/* Secondary circles */}
                    <div className="absolute top-1/4 right-1/4 w-1/6 h-1/6 border border-secondary/40 rounded-full" />
                    <div className="absolute bottom-1/4 left-1/4 w-1/6 h-1/6 border border-accent/40 rounded-full" />

                    {/* Enhanced targeting lines */}
                    <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/60 to-transparent" />
                    <div className="absolute top-0 left-1/2 h-1/3 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 h-1/3 w-px bg-gradient-to-t from-transparent via-primary/60 to-transparent" />

                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-primary/40 rounded-full" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-secondary/40 rounded-full" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent/40 rounded-full" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary/40 rounded-full" />
                  </div>

                  {/* IMPROVED GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>

                {/* ENHANCED TERMINAL OVERLAY */}
                <Card className="absolute -bottom-4 -right-4 w-36 h-24 p-0 border border-border/50 rounded-lg font-mono text-xs shadow-lg bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="text-primary font-semibold">$ aithena</div>
                    <div className="text-foreground">&gt; Generating...</div>
                    <div className="text-secondary">✓ Program ready</div>
                    <div className="text-muted-foreground text-[10px]">
                      v3.5.0
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
}
