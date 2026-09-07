import { useEffect, useState } from "react";
import { Eye, Play } from "lucide-react";

/**
 * Live overlay for product cover videos:
 * bottom-left "Playing" badge + bottom-right "N watching" counter
 * that changes every 3 seconds.
 */
export function VideoOverlay({ seed = 0 }: { seed?: number }) {
  const [watching, setWatching] = useState(
    () => 640 + ((seed * 137) % 300),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setWatching((w) => {
        const delta = Math.floor(Math.random() * 41) - 20; // -20..+20
        return Math.max(380, Math.min(1400, w + delta));
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
        <Play className="size-3 fill-primary text-primary" />
        Playing
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
        <Eye className="size-3 text-primary" />
        {watching} watching
      </span>
    </>
  );
}
