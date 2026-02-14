import { useEffect, useRef } from "react";
import { Heart, Check } from "lucide-react";

const REASONS = [
  "You let me have the last slice of pizza. Sometimes. Okay, once.",
  "You pretend my jokes are funny, and that's true love.",
  "You're the only person I'd share a Netflix password with.",
  "You kill the spiders. I will never not appreciate this.",
  "You make me coffee without being asked, which is basically a love language.",
  "You've seen me at my worst and still chose to come home the next day.",
  "You laugh at yourself, which makes everything 10x better.",
  "You're the best big spoon / little spoon / no-spoon-just-starfish in the game.",
  "You make ordinary days feel like adventures (or at least tolerable).",
  "Because honestly? Life is just more fun with you in it. 💛",
];

const ReasonsList = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="scroll-reveal px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Reasons I'd Still Choose You
        </h2>
        <p className="mt-3 text-center font-body text-muted-foreground">
          A totally objective and scientific list
        </p>

        <ul className="mt-10 space-y-4">
          {REASONS.map((reason, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                {i === REASONS.length - 1 ? (
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                ) : (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <span className="font-body text-sm leading-relaxed text-card-foreground sm:text-base">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReasonsList;
