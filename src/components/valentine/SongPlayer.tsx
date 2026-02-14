import { useState, useRef, useCallback, useEffect } from "react";
import { CONFIG } from "@/lib/config";
import { Music, Pause, Play, Volume2 } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const SongPlayer = ({ onPlay }: { onPlay?: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const loadYouTubeAPI = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  }, []);

  const handlePlay = useCallback(async () => {
    if (CONFIG.useLocalAudio) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
          onPlay?.();
        }
      }
      return;
    }

    if (isPlaying && playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
      onPlay?.();
      return;
    }

    await loadYouTubeAPI();

    playerRef.current = new window.YT.Player("yt-player", {
      height: "0",
      width: "0",
      videoId: CONFIG.youtubeVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
          setIsPlaying(true);
          setIsLoaded(true);
          onPlay?.();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
      },
    });
  }, [isPlaying, loadYouTubeAPI, onPlay]);

  return (
    <section ref={sectionRef} className="scroll-reveal px-6 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <Music className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h3 className="font-display text-xl font-semibold text-foreground">
            Our Song
          </h3>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            {CONFIG.songTitle} — {CONFIG.songArtist}
          </p>

          <button
            onClick={handlePlay}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-body text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
            aria-label={isPlaying ? "Pause our song" : `Play our song: ${CONFIG.songTitle} by ${CONFIG.songArtist}`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5 fill-current" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 fill-current" />
                Play Our Song
              </>
            )}
          </button>

          {/* Now playing indicator */}
          {isPlaying && (
            <div className="mt-4 flex items-center justify-center gap-2 text-primary">
              <Volume2 className="h-4 w-4 animate-pulse-soft" />
              <span className="font-body text-xs">Now playing…</span>
              <div className="flex items-end gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-primary"
                    style={{
                      height: `${8 + Math.random() * 12}px`,
                      animation: `pulse-soft ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hidden YouTube player */}
        <div ref={containerRef} className="hidden">
          <div id="yt-player" />
        </div>

        {/* Local audio fallback */}
        {CONFIG.useLocalAudio && (
          <audio
            ref={audioRef}
            src={`/assets/${CONFIG.localAudioFile}`}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </section>
  );
};

export default SongPlayer;
