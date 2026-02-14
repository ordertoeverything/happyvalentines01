// ============================================
// 🎀 VALENTINE'S DAY PERSONALIZATION CONFIG
// Edit these values to customize your page!
// ============================================

export const CONFIG = {
  // Names
  husbandName: "My Love",
  partnerName: "Your Valentine",
  coupleNames: "Us",
  year: 2026,
  tagline: "Another year of adventures, bad puns, and stolen fries",

  // YouTube video config for "Our Song"
  songTitle: "The Sweetest Thing",
  songArtist: "U2",
  youtubeVideoId: "5WybiA263bw", // U2 - Sweetest Thing (Official Music Video)
  useLocalAudio: false, // Set to true to use a local MP3 instead
  localAudioFile: "our-song.mp3", // Place MP3 in public/assets/

  // Photo gallery — update these when you add real photos
  photos: [
    { src: "", caption: "Photo 1", placeholder: true },
    { src: "", caption: "Photo 2", placeholder: true },
    { src: "", caption: "Photo 3", placeholder: true },
    { src: "", caption: "Photo 4", placeholder: true },
  ],
} as const;

// Placeholder gradient colors for the photo grid
export const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, hsl(350, 55%, 65%), hsl(350, 40%, 45%))",
  "linear-gradient(135deg, hsl(15, 50%, 70%), hsl(350, 50%, 55%))",
  "linear-gradient(135deg, hsl(35, 75%, 65%), hsl(15, 55%, 60%))",
  "linear-gradient(135deg, hsl(350, 45%, 50%), hsl(280, 30%, 45%))",
  "linear-gradient(135deg, hsl(15, 60%, 65%), hsl(35, 70%, 55%))",
  "linear-gradient(135deg, hsl(350, 35%, 55%), hsl(350, 55%, 40%))",
];
