// ╔══════════════════════════════════════════════════════════════════╗
// ║   MARIACHI SIN FRONTERA — WEBSITE TEXT & SETTINGS               ║
// ║   This is the ONLY file you need to edit for most changes.      ║
// ║   Edit on GitHub: find the file → click pencil icon → commit.   ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE_TEXT = {

  // ── GOOGLE APPS SCRIPT URL ───────────────────────────────────────
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbzfJnVRape394Pjpuq-nj74LrYTzSJc7P-iVJei4uNblviZZCW1LLulDIjZlTUB3-g/exec",
  googleSheetId: "15mPIt4aAwwjKH3g3b72E1Uv1zJp-vIbegfBddXAhyV4",
  adminUrl:      "https://script.google.com/macros/s/AKfycbzfJnVRape394Pjpuq-nj74LrYTzSJc7P-iVJei4uNblviZZCW1LLulDIjZlTUB3-g/exec",

  // ── CONTACT INFO ─────────────────────────────────────────────────
  phone:    "(250) 555-1234",
  email:    "davidjamesmorris2@gmail.com",
  location: "Victoria, BC, Canada",

  // ── SOCIAL MEDIA LINKS ───────────────────────────────────────────
  // Replace placeholders with real links when ready.
  facebook:  "https://www.facebook.com/p/Mariachi-Sin-Frontera-61556020538065/",
  instagram: "https://www.instagram.com/mariachisinfronteravictoria",
  youtube:   "https://www.youtube.com/@YOUR_CHANNEL",
  // twitter: "https://twitter.com/YOUR_HANDLE",

  // ── GOOGLE DRIVE LINKS ───────────────────────────────────────────
  // Shown in Admin → Resources tab. Paste Drive folder sharing links.
  drive: {
    sheetMusic:     "https://drive.google.com/drive/folders/1l0dmjSFQjUmMjaM8Tv2dUZM342ekoWf7?usp=sharing",
    pastRecordings: "",
    referenceSongs: ""
  },

  // ── BAND PHOTO ───────────────────────────────────────────────────
  // Set to "band-main.jpg" — upload the file to GitHub → images/ folder.
  // Do NOT use a Google Drive link for this photo.
  bandPhoto: "band-main.jpg",

  about: {
    lead:       "Mariachi Sin Frontera — Without Borders — carries the soul of traditional Mexican Mariachi music to every corner of Victoria BC and southern Vancouver Island.",
    paragraph1: "Dressed in striking black Charro adorned with silver accents and bold bow ties, we bring the fire, romance, and joy of authentic Mariachi to weddings, quinceañeras, festivals, private events, and cultural celebrations.",
    paragraph2: "From classic rancheras and boleros to beloved sones jaliscienses, our repertoire spans the full richness of the Mariachi tradition — performed with passion, precision, and pride."
  },

  // ── BAND MEMBERS ─────────────────────────────────────────────────
  // photo: filename in images/ folder, OR a Google Drive sharing link, OR "" for icon
  members: [
    { name: "Jorge",    role: "Guitar, Vocals", bio: "the best.", photo: "https://drive.google.com/file/d/1BUhM9h93v_lDG552Zfy-oZhI-oKTQnYg/view" },
    { name: "Angelique", role: "Vocals",         bio: "Add a short biography about this member.", photo: "" },
    { name: "Amanda",   role: "Violin",          bio: "Add a short biography about this member.", photo: "" },
    { name: "Hector",   role: "Violin",          bio: "Add a short biography about this member.", photo: "" },
    { name: "Emily",    role: "Trumpet",         bio: "Add a short biography about this member.", photo: "" },
    { name: "David",    role: "Trumpet",         bio: "Add a short biography about this member.", photo: "" },
    { name: "Alex",     role: "Guitarrón",       bio: "Add a short biography about this member.", photo: "" }
  ],

  // ── GALLERY PHOTOS ───────────────────────────────────────────────
  // HOW TO ADD A PHOTO:
  //
  // Option A — Admin Panel → Photos tab (easiest):
  //   1. Drag photo into upload box — it saves to Google Drive
  //   2. Click "Copy Link" on the photo card
  //   3. Edit this file on GitHub (pencil icon)
  //   4. Paste link below as: { file: "LINK", caption: "Description" },
  //   5. Commit — done!
  //
  //   To update the WHOLE gallery order at once:
  //   1. Drag photos in the admin to reorder them
  //   2. The "Gallery Order" panel appears at the bottom of Photos tab
  //   3. Click "Copy All" — copies all gallery lines at once
  //   4. Edit this file on GitHub → replace everything between gallery: [ and the // ADD line
  //   5. Commit
  //
  // Option B — Upload directly to GitHub → images/ folder, then:
  //   { file: "filename.jpg", caption: "Description" },
  gallery: [
    { file: "https://drive.google.com/file/d/1VXRQZYn4LT01BhlwxNSO1vEnUxsHuOmy/view", caption: "Performance at Victoria Festival" },
    { file: "https://drive.google.com/file/d/0B4x_XgF1fe65QUdXS3NMWDdtbms/view",       caption: "Wedding Celebration" },
    { file: "https://drive.google.com/file/d/1BUhM9h93v_lDG552Zfy-oZhI-oKTQnYg/view", caption: "Cultural Event" },
    { file: "gallery-4.jpg", caption: "Private Party" },
    { file: "gallery-5.jpg", caption: "Outdoor Performance" },
    { file: "gallery-6.jpg", caption: "Band in Charro Suits" },
    { file: "gallery-7.jpg", caption: "Band in Charro Suits" }
    // ADD NEW PHOTOS ABOVE THIS LINE
  ],

  // ── YOUTUBE VIDEOS ───────────────────────────────────────────────
  // Copy only the ID from the YouTube URL (part after ?v=)
  // Keep quotes and comma on each line.
  videos: [
    { id: "KfFKkhkjoH8", label: "Centennial Square, 2025" },
    { id: "NCvJwzDQTBM",  label: "Wedding Celebration" }
    // ADD NEW VIDEOS ABOVE THIS LINE
  ]

};
