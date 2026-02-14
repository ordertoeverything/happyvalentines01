import { useEffect, useRef } from "react";
import { CONFIG } from "@/lib/config";
import { Heart } from "lucide-react";

const LoveLetter = () => {
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
          The (Fun) Love Letter
        </h2>
        <p className="mt-3 text-center font-body text-muted-foreground">
          No sappy stuff here. Okay, maybe a little.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-10">
          <div className="mb-6 flex justify-center">
            <Heart className="h-8 w-8 fill-primary text-primary" />
          </div>

          <div className="space-y-4 font-body text-base leading-relaxed text-card-foreground">
            <p className="font-display text-lg">
              Dear <span className="text-gradient-love font-semibold">[Babe / Hot Stuff / {CONFIG.husbandName}]</span>,
            </p>

            <p>
              Happy Valentine's Day! Or as I like to call it, "the one day a
              year I'm contractually obligated to say nice things about you."
              Just kidding. I say nice things about you at least three times a
              year.
            </p>

            <p>
              But seriously — another year with you, and somehow you haven't
              figured out that you could do better. I'm counting that as a win.
            </p>

            <p>
              Remember [that one trip where everything went wrong]? How we ended
              up lost, soaking wet, arguing over a map (that I was definitely
              holding the right way), and somehow it's one of my favorite
              memories? That's us. Chaotic, slightly lost, but always laughing.
            </p>

            <p>
              You're the person who makes [your favorite restaurant]'s wait list
              actually worth sitting through. The one who pretends to like my
              cooking (we both know the truth). The one who steals the blanket
              every. single. night. and still somehow makes me want to share a
              bed with you forever.
            </p>

            <p>
              I love that you [his weird but endearing habit]. I love that
              you know exactly how I take my coffee. I love that you laugh at
              your own jokes before you even finish telling them — and that
              somehow makes them funnier.
            </p>

            <p>
              You're my favorite weirdo, my best friend, my person who Googles
              "is it bad if..." at 2 AM. And I wouldn't trade you for anything.
              Well, maybe for a lifetime supply of [favorite snack]. But I'd feel
              really bad about it.
            </p>

            <p className="font-display text-lg italic">
              Here's to more stolen fries, terrible movie picks, and falling
              asleep on the couch at 9 PM like the cool kids we are.
            </p>

            <p className="mt-6 text-right">
              <span className="font-display text-lg">
                All my love (and most of my snacks),
              </span>
              <br />
              <span className="text-gradient-love font-display text-xl font-semibold">
                {CONFIG.partnerName} 💕
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
