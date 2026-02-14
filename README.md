# 💕 Valentine's Day Page

A personalized Valentine's Day website for your special someone. Built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The site works immediately with placeholder content. Customize it by editing `src/lib/config.ts`.

## 📸 Adding Your Photos

1. Place your photos in `src/assets/` (e.g., `src/assets/photo1.jpg`)
2. Open `src/lib/config.ts`
3. Update the `photos` array — set `placeholder: false` and provide the import path:

```ts
photos: [
  { src: "/src/assets/photo1.jpg", caption: "Our first date ❤️", placeholder: false },
  // ...
],
```

## 🎵 Setting Up the Song

### YouTube Embed (Default)
Update `youtubeVideoId` in `src/lib/config.ts` with any YouTube video ID.

**⚠️ Autoplay:** Audio plays only after user clicks Play (browser security requirement).  
**⚠️ Copyright:** Uses YouTube's official embed player. Some videos may restrict embedding.

### Local MP3 Alternative
1. Place MP3 in `public/assets/our-song.mp3`
2. Set `useLocalAudio: true` in config

## ✏️ Personalizing

Edit `src/lib/config.ts` for names, year, tagline.  
Edit the love letter in `src/components/valentine/LoveLetter.tsx`.  
Edit reasons in `src/components/valentine/ReasonsList.tsx`.

## 🌐 Deploy

```bash
npm run build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## 📱 Features

- ❤️ Mobile-first responsive design
- 🖼️ Photo gallery with keyboard-accessible lightbox
- 💌 Playful love letter with editable placeholders
- 🎵 YouTube song player with floating hearts animation
- 📝 Humorous "Reasons I'd Still Choose You" list
- ♿ Semantic HTML, ARIA labels, keyboard navigation
