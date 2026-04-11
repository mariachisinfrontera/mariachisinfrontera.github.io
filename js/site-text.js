// ╔══════════════════════════════════════════════════════════════════╗
// ║   MARIACHI SIN FRONTERA — WEBSITE TEXT & SETTINGS               ║
// ║   This is the ONLY file you need to edit for most changes.      ║
// ║   After editing: save, then re-upload msf6 folder to GitHub.   ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE_TEXT = {

  // ── GOOGLE APPS SCRIPT URL ───────────────────────────────────────
  // After setting up the Google Apps Script (see GOOGLE-APPS-SCRIPT.js),
  // paste the Web App URL here.
  // It looks like: https://script.google.com/macros/s/XXXXX.../exec
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbzfJnVRape394Pjpuq-nj74LrYTzSJc7P-iVJei4uNblviZZCW1LLulDIjZlTUB3-g/exec",
  googleSheetId: "15mPIt4aAwwjKH3g3b72E1Uv1zJp-vIbegfBddXAhyV4",
  // Admin panel link shown in site footer — paste same URL as above
  adminUrl: "",

  // ── CONTACT INFO ─────────────────────────────────────────────────
  phone:    "(250) 555-1234",
  email:    "davidjamesmorris2@gmail.com",
  location: "Victoria, BC, Canada",

  // ── SOCIAL MEDIA LINKS ───────────────────────────────────────────
  // Replace YOUR_PAGE etc. with your real links.
  // To add Twitter/X: remove the // at the start of the twitter line.
  facebook:  "https://www.facebook.com/YOUR_PAGE",
  instagram: "https://www.instagram.com/YOUR_HANDLE",
  youtube:   "https://www.youtube.com/@YOUR_CHANNEL",
  // twitter: "https://twitter.com/YOUR_HANDLE",

  // ── GOOGLE DRIVE LINKS ───────────────────────────────────────────
  // Shown in the Admin panel for band members to access resources.
  // Right-click folder in Drive → Share → "Anyone with the link" → Copy link
  drive: {
    sheetMusic:     "",   // ← paste sheet music folder link
    pastRecordings: "",   // ← paste past performances/recordings link
    referenceSongs: ""    // ← paste YouTube/reference songs folder link
  },

  // ── ABOUT SECTION ────────────────────────────────────────────────
  // Band photo for the "Our Story" section.
  //
  // HOW TO ADD YOUR BAND PHOTO — TWO OPTIONS:
  //
  // Option A: File in images/ folder (same as before)
  //   1. Copy photo into the images/ folder
  //   2. Set bandPhoto to just the filename: "my-photo.jpg"
  //
  // Option B: Google Drive link (no re-uploading needed)
  //   1. Put photo in Google Drive
  //   2. Right-click → Share → "Anyone with the link"
  //   3. Get the direct image link (see SETUP-GUIDE.txt for details)
  //   4. Paste the full https://... link as bandPhoto
  //
  // Best size: landscape/wide photo, e.g. 1200x675px
  bandPhoto: "band-main.jpg",

  about: {
    lead:       "Mariachi Sin Frontera — Without Borders — carries the soul of traditional Mexican Mariachi music to every corner of Victoria BC, Vancouver Island and beyond.",
    paragraph1: "Dressed in striking black Charro adorned with silver accents and bold bow ties, we bring the fire, romance, and joy of authentic Mariachi to weddings, quinceañeras, festivals, private events, and cultural celebrations.",
    paragraph2: "From classic rancheras and boleros to beloved sones jaliscienses, our repertoire spans the full richness of the Mariachi tradition — performed with passion, precision, and pride."
  },

  // ── BAND MEMBERS ─────────────────────────────────────────────────
  // photo: filename in images/ folder, OR a full Google Drive image link
  // Leave as "" for a placeholder icon
  members: [
    { name: "David", role: "Trumpet · Director", bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Violin",              bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Guitarrón",           bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Vihuela",             bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Guitar",              bio: "Add a short biography about this member.", photo: "" },
    { name: "Member Name", role: "Vocals",              bio: "Add a short biography about this member.", photo: "" }
  ],

  // ── GALLERY PHOTOS ───────────────────────────────────────────────
  // Displays as an auto-scrolling slideshow (one image at a time, 5 seconds each)
  //
  // HOW TO ADD A PHOTO — TWO OPTIONS:
  //
  // Option A: File in images/ folder
  //   file: "your-photo.jpg"   ← just the filename, include .jpg or .png
  //
  // Option B: Google Drive (no re-deploying needed!)
  //   1. Upload photo to Google Drive
  //   2. Right-click → Share → "Anyone with the link can view"
  //   3. Copy the sharing link
  //   4. The link looks like: https://drive.google.com/file/d/FILE_ID/view
  //   5. Use this as the file value — the site converts it automatically
  //   file: "https://drive.google.com/file/d/YOUR_FILE_ID/view"
  //
  // caption: shown briefly at bottom of slideshow
  gallery: [
    { file: "gallery-1.jpg", caption: "Performance at Victoria Festival" },
    { file: "gallery-2.jpg", caption: "Wedding Celebration" },
    { file: "gallery-3.jpg", caption: "Cultural Event" },
    { file: "gallery-4.jpg", caption: "Private Party" },
    { file: "gallery-5.jpg", caption: "Outdoor Performance" },
    { file: "gallery-6.jpg", caption: "Band in Charro Suits" }
    // Add more photos above this line
    // Copy the format exactly — don't forget the comma at the end of each line
  ],

  // ── YOUTUBE VIDEOS ───────────────────────────────────────────────
  // Get the video ID from the YouTube URL — the part after ?v=
  // Example: youtube.com/watch?v=dQw4w9WgXcQ → id: "dQw4w9WgXcQ"
  videos: [
    { id: "YOUTUBE_ID_1", label: "Live Performance — Victoria" },
    { id: "YOUTUBE_ID_2", label: "Wedding Celebration" },
    { id: "YOUTUBE_ID_3", label: "Cielito Lindo" }
    // Add more videos above this line
  ]

};
