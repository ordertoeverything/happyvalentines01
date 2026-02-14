import { useState, useCallback, useEffect, useRef } from "react";
import { CONFIG, PLACEHOLDER_GRADIENTS } from "@/lib/config";
import { X, Camera } from "lucide-react";

const PhotoGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && lightboxIndex !== null)
        setLightboxIndex((lightboxIndex + 1) % CONFIG.photos.length);
      if (e.key === "ArrowLeft" && lightboxIndex !== null)
        setLightboxIndex((lightboxIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox]);

  const photo = lightboxIndex !== null ? CONFIG.photos[lightboxIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="photos"
      className="scroll-reveal px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-center text-3xl font-bold text-foreground sm:text-4xl">
          Photo Memories
        </h2>
        <p className="mt-3 text-center font-body text-muted-foreground">
          Every picture tells a story — and ours is my favorite
        </p>

        {/* Hero photo area */}
        <div
          className="mt-10 flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition-transform hover:scale-[1.01]"
          style={{ background: PLACEHOLDER_GRADIENTS[0] }}
          onClick={() => openLightbox(0)}
          role="button"
          tabIndex={0}
          aria-label={`View photo: ${CONFIG.photos[0]?.caption}`}
          onKeyDown={(e) => e.key === "Enter" && openLightbox(0)}
        >
          {CONFIG.photos[0]?.placeholder ? (
            <div className="flex flex-col items-center gap-3 text-primary-foreground/80">
              <Camera className="h-12 w-12" />
              <span className="font-body text-sm">Upload your hero photo</span>
              <span className="font-display text-lg italic">
                {CONFIG.photos[0].caption}
              </span>
            </div>
          ) : (
            <img
              src={CONFIG.photos[0].src}
              alt={CONFIG.photos[0].caption}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CONFIG.photos.slice(1).map((p, i) => (
            <div
              key={i}
              className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-[1.03]"
              style={{ background: PLACEHOLDER_GRADIENTS[i + 1] }}
              onClick={() => openLightbox(i + 1)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${p.caption}`}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i + 1)}
            >
              {p.placeholder ? (
                <div className="flex flex-col items-center gap-2 px-3 text-center text-primary-foreground/80">
                  <Camera className="h-8 w-8" />
                  <span className="font-body text-xs">{p.caption}</span>
                </div>
              ) : (
                <img
                  src={p.src}
                  alt={p.caption}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-body text-xs text-primary-foreground">
                  {p.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && photo && (
        <div
          className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 rounded-full bg-foreground/50 p-2 text-primary-foreground transition-colors hover:bg-foreground/70"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="flex aspect-video items-center justify-center"
              style={{
                background: PLACEHOLDER_GRADIENTS[lightboxIndex],
                minHeight: "300px",
              }}
            >
              {photo.placeholder ? (
                <div className="flex flex-col items-center gap-3 text-primary-foreground/80">
                  <Camera className="h-16 w-16" />
                  <span className="font-body">Upload your photo here</span>
                </div>
              ) : (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="p-4 text-center">
              <p className="font-display text-lg italic text-foreground">
                {photo.caption}
              </p>
              <p className="mt-1 font-body text-xs text-muted-foreground">
                {lightboxIndex + 1} / {CONFIG.photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
