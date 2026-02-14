import { useState, useCallback } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export const useFloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const triggerHearts = useCallback(() => {
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 24,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter((h) => !newHearts.find((nh) => nh.id === h.id))
      );
    }, 6000);
  }, []);

  const HeartsOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="animate-float-heart absolute bottom-0"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.id % 2 === 0 ? "❤️" : "💕"}
        </div>
      ))}
    </div>
  );

  return { triggerHearts, HeartsOverlay };
};
