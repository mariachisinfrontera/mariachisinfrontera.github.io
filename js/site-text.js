// ╔══════════════════════════════════════════════════════════════════╗
// ║   MARIACHI SIN FRONTERA — WEBSITE TEXT & SETTINGS               ║
// ║   This is the ONLY file you need to edit for most changes.      ║
// ║   Edit on GitHub: find the file → click pencil icon → commit.   ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE_TEXT = {

  // ── GOOGLE APPS SCRIPT URL ───────────────────────────────────────
  // Your Google Apps Script Web App URL — do not change this
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbzfJnVRape394Pjpuq-nj74LrYTzSJc7P-iVJei4uNblviZZCW1LLulDIjZlTUB3-g/exec",

  // Your Google Sheet ID — used to load public gig dates on the website
  googleSheetId: "15mPIt4aAwwjKH3g3b72E1Uv1zJp-vIbegfBddXAhyV4",

  // Admin panel link — shown in the site footer
  // Paste your Google Apps Script URL here too
  adminUrl: "https://script.google.com/macros/s/AKfycbzfJnVRape394Pjpuq-nj74LrYTzSJc7P-iVJei4uNblviZZCW1LLulDIjZlTUB3-g/exec",

  // ── CONTACT INFO ─────────────────────────────────────────────────
  phone:    "(250) 555-1234",
  email:    "davidjamesmorris2@gmail.com",
  location: "Victoria, BC, Canada",

  // ── SOCIAL MEDIA LINKS ───────────────────────────────────────────
  // Replace YOUR_PAGE etc. with your real social media profile links.
  // To add Twitter/X: remove the // at the start of the twitter line.
  facebook:  "https://www.facebook.com/YOUR_PAGE",
  instagram: "https://www.instagram.com/YOUR_HANDLE",
  youtube:   "https://www.youtube.com/@YOUR_CHANNEL",
  // twitter: "https://twitter.com/YOUR_HANDLE",

  // ── GOOGLE DRIVE LINKS ───────────────────────────────────────────
  // Links to your private Drive folders — shown in the Admin panel only.
  // To get a link: right-click folder in Drive → Share →
  //   "Anyone with the link can view" → Copy link
  drive: {
    sheetMusic:     "https://drive.google.com/drive/folders/1l0dmjSFQjUmMjaM8Tv2dUZM342ekoWf7?usp=sharing",   // ← paste your sheet music folder link
    pastRecordings: "",   // ← paste your recordings folder link
    referenceSongs: ""    // ← paste your reference songs folder link
  },

  // ── ABOUT SECTION — BAND PHOTO ───────────────────────────────────
  // The photo shown in the "Our Story" section.
  //
  // HOW TO ADD/CHANGE THE BAND PHOTO:
  //
  // Option A — Upload via Admin Panel (recommended):
  //   1. Open your Admin Panel URL in browser
  //   2. Click the "📷 Photos" tab
  //   3. Drag your photo into the upload box
  //   4. Click "Set as Band Photo" — the card highlights green
  //      and the link appears above the upload box
  //   5. Copy that link and paste it below (replacing the current value)
  //   6. Commit on GitHub — site updates in 1-2 minutes
  //
  // Option B — Direct from Google Drive:
  //   1. Right-click photo in Drive → Share → "Anyone with the link"
  //   2. Copy the sharing link (looks like https://drive.google.com/file/d/ABC123/view)
  //   3. Paste it below
  //
  // IMPORTANT: Make sure the photo is shared as "Anyone with the link can view"
  //            in Google Drive, otherwise it won't appear on the site.
  //
  bandPhoto: "https://drive.google.com/file/d/0B4x_XgF1fe65QUdXS3NMWDdtbms/view",

  about: {
    // The italic gold opening line
    lead:       "Mariachi Sin Frontera — Without Borders — carries the soul of traditional Mexican Mariachi music to every corner of Victoria BC and southern Vancouver Island.",
    // First paragraph
    paragraph1: "Dressed in striking black Charro adorned with silver accents and bold bow ties, we bring the fire, romance, and joy of authentic Mariachi to weddings, quinceañeras, festivals, private events, and cultural celebrations.",
    // Second paragraph
    paragraph2: "From classic rancheras and boleros to beloved sones jaliscienses, our repertoire spans the full richness of the Mariachi tradition — performed with passion, precision, and pride."
  },

  // ── BAND MEMBERS ─────────────────────────────────────────────────
  // photo: filename in images/ folder, OR a Google Drive sharing link
  // Leave photo as "" for a placeholder icon
  // To get a Drive link: use the Admin Panel → Photos tab → upload → Copy Gallery Link
  members: [
    { name: "David",       role: "Trumpet",             bio: "the best.", photo: "https://drive.google.com/file/d/1BUhM9h93v_lDG552Zfy-oZhI-oKTQnYg/view" },
    { name: "Jorge", role: "Vocals",                    bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Guitarrón",           bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Vihuela",             bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Guitar",              bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Vocals",              bio: "Add a short biography about this member.", photo: "" }
  ],

  // ── GALLERY PHOTOS ───────────────────────────────────────────────
  // Shown as an auto-scrolling slideshow (5 seconds per photo).
  //
  // HOW TO ADD A PHOTO:
  //
  // Option A — Upload via Admin Panel (recommended, no GitHub needed for the photo itself):
  //   1. Admin Panel → Photos tab → drag photo into upload box
  //   2. Click "Copy Gallery Link" — a URL is copied to your clipboard
  //   3. Edit this file on GitHub (pencil icon)
  //   4. Add a new line in the gallery section below:
  //      { file: "PASTE_THE_FULL_LINK_HERE", caption: "Your description" },
  //   5. Commit — done!
  //
  // Option B — Upload directly to GitHub:
  //   1. Go to GitHub → images/ folder → Add file → Upload files
  //   2. Add the filename below (include .jpg or .png — case sensitive!):
  //      { file: "your-photo.jpg", caption: "Your description" },
  //
  // NOTE: Both options need a line added here. The comma at the end of each
  //       line is required. Keep the quote marks around values.
  //
  gallery: [
    { file: "https://drive.google.com/file/d/1VXRQZYn4LT01BhlwxNSO1vEnUxsHuOmy/view", caption: "Performance at Victoria Festival" },
    { file: "https://drive.google.com/file/d/0B4x_XgF1fe65QUdXS3NMWDdtbms/view", caption: "Wedding Celebration" },
    { file: "https://drive.google.com/file/d/1BUhM9h93v_lDG552Zfy-oZhI-oKTQnYg/view", caption: "Cultural Event" },
    { file: "gallery-4.jpg", caption: "Private Party" },
    { file: "gallery-5.jpg", caption: "Outdoor Performance" },
    { file: "gallery-6.jpg", caption: "Band in Charro Suits" },
    { file: "gallery-7.jpg", caption: "Band in Charro Suits" }
    // ADD NEW PHOTOS ABOVE THIS LINE — copy the format of the lines above
  ],

  // ── YOUTUBE VIDEOS ───────────────────────────────────────────────
  // Videos are shown as YouTube embeds on the website.
  //
  // HOW TO ADD A VIDEO:
  //   1. Open the YouTube video in your browser
  //   2. Look at the address bar — the URL looks like:
  //      https://www.youtube.com/watch?v=dQw4w9WgXcQ
  //                                       ^^^^^^^^^^^
  //      Copy ONLY the letters/numbers after the = sign (the video ID)
  //   3. Add a new line below (keep the quotes and the comma):
  //      { id: "dQw4w9WgXcQ", label: "Song or event name" },
  //
  // For private band videos: upload to YouTube as "Unlisted" — they won't
  // appear in search results but will embed correctly on the site.
  //
  videos: [
    { id: "KfFKkhkjoH8&list=PLZBqeKD9Hoy60-C8Q-x2ZR6aJ34R_hxTE&index=1", label: "Centenial Square, 2025" },
    { id: "NCvJwzDQTBM", label: "Wedding Celebration" },
    { id: "YOUTUBE_ID_3", label: "Cielito Lindo" }
    // ADD NEW VIDEOS ABOVE THIS LINE — replace YOUTUBE_ID with the real ID
  ]

};
