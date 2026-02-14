import { useEffect, useRef } from "react";
import { CONFIG } from "@/lib/config";
import heroBg from "@/assets/hero-bg.jpg";
import { Heart } from "lucide-react";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.classList.add("revealed");
  }, []);

  return (
    <section
      ref={ref}
      className="scroll-reveal relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />
      <div className="absolute inset-0 z-0 bg-hero-gradient" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Heart className="h-5 w-5 fill-primary text-primary animate-pulse-soft" />
          <span className="font-body text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {CONFIG.partnerName} → {CONFIG.husbandName}
          </span>
          <Heart className="h-5 w-5 fill-primary text-primary animate-pulse-soft" />
        </div>

        <h1 className="font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl">
          Happy Valentine's Day,{" "}
          <span className="text-gradient-love">{CONFIG.husbandName}!</span>
        </h1>

        <p className="mt-6 font-body text-lg text-muted-foreground sm:text-xl">
          {CONFIG.tagline}
        </p>

        <p className="mt-2 font-display text-sm italic text-rose-gold">
          — {CONFIG.coupleNames}, {CONFIG.year} —
        </p>

        <div className="mt-10">
          <a
            href="#photos"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg"
          >
            Let's take a trip down memory lane
            <Heart className="h-4 w-4 fill-current" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
