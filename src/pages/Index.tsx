import { useMemo } from "react";
import HeroSection from "@/components/valentine/HeroSection";
import PhotoGallery from "@/components/valentine/PhotoGallery";
import LoveLetter from "@/components/valentine/LoveLetter";
import SongPlayer from "@/components/valentine/SongPlayer";
import ReasonsList from "@/components/valentine/ReasonsList";
import FloatingHearts from "@/components/valentine/FloatingHearts";
import ValentineFooter from "@/components/valentine/ValentineFooter";

const Index = () => {
  const { triggerHearts, HeartsOverlay } = useMemo(() => FloatingHearts(), []);

  return (
    <div className="min-h-screen bg-background">
      <HeartsOverlay />
      <HeroSection />
      <PhotoGallery />
      <LoveLetter />
      <SongPlayer onPlay={triggerHearts} />
      <ReasonsList />
      <ValentineFooter />
    </div>
  );
};

export default Index;
