# Moodscape 🌅

🌅 Dive into Moodscape: a mesmerizing TypeScript-powered Next.js web app that transforms your daily moods into vibrant, interactive digital landscapes – where emotions paint the canvas of your mind. Capture fleeting feelings as evolving terrains of color and form, blending sentiment analysis with generative visuals to turn journaling into an artistic journey.

```
    /\      🌿
   /  \    💚
  /    \  🧡
 /______\ 💙
Emotions as horizons, moods as mountains.
```

## 🌟 What is Moodscape?

Moodscape isn't just another journal – it's your emotional canvas, where words become worlds. Pour in your daily mood via a simple textarea, and watch sentiment analysis (powered by the `sentiment` library) uncover the hidden hues of your feelings: positive vibes bloom into serene gradients, negatives carve dramatic shadows. Fetch a random nature-inspired image from Unsplash, extract its colors with `get-image-colors`, and let them shape a personalized "moodscape" backdrop. Save memos with dates in localStorage, revisit them as clickable cards featuring the custom TransparentMemoIcon, and dive into analytics via a modal table tracking sentiment scores over time.

Built for introspection with a touch of magic, Moodscape helps you visualize emotional patterns – like a digital therapist meets abstract art. Input "I'm feeling serene today," and emerge with a gradient-drenched vista that mirrors your inner calm. Perfect for developers, creators, or anyone seeking a poetic twist on mood tracking. (Imagine a GIF here: mood entry flowing into a colorful landscape render – fork and add your own!)

Why it stands out: Unlike plain note apps, it *feels* alive, turning data into delight with NextUI components for sleek, responsive UIs and Framer Motion for subtle animations (ready for your enhancements).

## 🚀 Quick Start

Ready to let your moods bloom? Fire up Moodscape locally in minutes – it's Next.js under the hood, so onboarding is a breeze.

1. Clone the repo:
   ```bash
   git clone https://github.com/Astatide1337/Moodscape.git
   cd Moodscape
   ```

2. Install dependencies (TypeScript, Tailwind, NextUI, and mood magic libs like `sentiment` and `get-image-colors`):
   ```bash
   npm install
   # or yarn install
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your first moodscape bloom. Tinker with `pages/index.tsx` for the main UI – it auto-reloads. Pro tip: Swap the favicon in `/public` with your own MemoIcon variant for personal theming; the TransparentMemoIcon.png is primed for overlay magic.

No gotchas – TypeScript ensures type-safe mood mapping, and Tailwind's earthy palette (check `globals.css`) sets the emotional tone right out of the box.

## 🎨 Features

- 🌈 **Sentiment-Powered Moodscapes**: Enter your mood in the intuitive textarea (built with NextUI's Textarea). Analyze it instantly with `sentiment` lib to detect positive/negative/neutral tones, then generate a dynamic gradient from an Unsplash nature image's extracted colors. Emotions as landscapes? Absolutely.
  
- 📝 **Memo Journaling**: Save dated entries to localStorage, displayed as interactive cards with TransparentMemoIcon.png. Click to edit or revisit – like flipping through an emotional scrapbook.

- 📊 **Analytics Modal**: One-tap access to a sentiment breakdown table (via NextUI Table). Track scores, top emotions, and patterns across memos. Clean, data-driven reflection without the overwhelm.

- 🎭 **Helpful Prompts**: Stuck? Open the modal for writing ideas like "Describe a moment when you felt [emotion]" – sparks creativity in your mood flow.

- 🔄 **Responsive & Themed**: Tailwind CSS for pixel-perfect, mobile-friendly design with a warm, earthy scheme (#F9DEC9 backgrounds, #5E3023 accents). Dark mode ready via `tailwind.config.js`. Extend the API route in `pages/api/hello.ts` for custom mood processing.

- 🖼️ **Visual Branding**: Custom MemoIcon assets in `/public` for favicons and cards – theme your version with personal icons to make moods uniquely yours.

Tease: Future moods could evolve into shareable PNGs or AI-enhanced detections. Your emotions, visualized.

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.3-blue.8?logo=tailwindcss&logoColor=white)

Built on Next.js for seamless SSR and API routes, TypeScript for rock-solid types (see `tsconfig.json`), and Tailwind CSS for emotional palettes that adapt to your moods. NextUI handles the UI components with flair, while `framer-motion` adds smooth transitions (expand in `_app.tsx`). PostCSS and Autoprefixer polish the styles in `postcss.config.js`. The webpack tweaks in `next.config.js` ensure smooth builds. Dive into `tailwind.config.ts` to extend fonts (Inter is default) or colors – it's all set for your artistic tweaks.

## 📱 Usage Examples

Watch moods come alive: Start on the index page with a mood input like "Overwhelmed but hopeful." Hit Submit – sentiment scores it, pulls a nature image, and crafts a gradient backdrop for journaling.

Here's a peek at extending the API for mood queries (edit `pages/api/hello.ts`):

```typescript
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

type Data = {
  mood: string;
  score: number;
  suggestion: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { text } = req.query;
  const analysis = sentiment.analyze(text as string);
  
  res.status(200).json({
    mood: text as string,
    score: analysis.score,
    suggestion: analysis.score > 0 ? 'Embrace the positivity!' : 'Take a deep breath.'
  });
}
```

Fetch it client-side (add to `index.tsx`):

```typescript
const fetchMood = async (mood: string) => {
  const res = await fetch(`/api/hello?text=${encodeURIComponent(mood)}`);
  const data = await res.json();
  console.log(`Your mood score: ${data.score}`); // Use to update gradient!
};
```

(Envision a screenshot: Left – mood input form; Right – gradient landscape with memo cards and analytics modal. Or a GIF: Typing "joyful" → image fetch → colorful render.)

Pro tip: Hook `get-image-colors` into your fetches for real-time palette shifts. Extend for your own mood algorithms!

## 🌍 Deploying Your Moodscape

Share your emotional horizons worldwide – Next.js makes it effortless.

- **Vercel (Recommended)**: Connect your GitHub repo at [vercel.com](https://vercel.com/import/project?template=https://github.com/Astatide1337/Moodscape). One-click deploy! No env vars needed (localStorage handles persistence). Watch it build with the vercel.svg logo in `/public`.

- **Alternatives**: Push to Netlify or Render – just set the build command to `npm run build` and start to `npm start`. Ensure Unsplash fetches work (no CORS issues in prod).

Your moods go global: Deploy, share the link, and let friends explore their own landscapes. Horizon's edge? Yours to expand.

## 💡 Roadmap & Ideas

Moodscape is your starting canvas – let's paint the future together:

- 🤖 **AI Mood Detection**: Integrate NLP APIs for deeper insights beyond basic sentiment.
  
- 🖼️ **Shareable Exports**: Generate PNG moodscapes with MemoIcon overlays – download or social-share your emotional art.

- 👥 **Multi-User Vibes**: Collaborative journals for couples or teams, blending moods into shared landscapes.

- 🌙 **Advanced Visuals**: Animate gradients with Framer Motion; add weather/mood correlations via external APIs.

Got ideas to shape the next landscape? Open an issue – your spark could color the code! Let's make emotions even more vivid. 🎨