import { CONFIG } from "@/lib/config";
import { Heart } from "lucide-react";

const ValentineFooter = () => {
  return (
    <footer className="px-6 py-16 text-center">
      <div className="mx-auto max-w-md">
        <Heart className="mx-auto mb-4 h-8 w-8 fill-primary text-primary animate-pulse-soft" />
        <p className="font-display text-xl italic text-foreground">
          "You're stuck with me. No refunds."
        </p>
        <p className="mt-4 font-body text-sm text-muted-foreground">
          Made with ❤️ by {CONFIG.partnerName} for {CONFIG.husbandName}
        </p>
        <p className="mt-1 font-body text-xs text-muted-foreground/60">
          Valentine's Day {CONFIG.year}
        </p>
      </div>
    </footer>
  );
};

export default ValentineFooter;
