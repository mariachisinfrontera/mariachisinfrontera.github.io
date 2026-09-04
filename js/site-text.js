// ╔══════════════════════════════════════════════════════════════════╗
// ║   MARIACHI SIN FRONTERA — WEBSITE TEXT & SETTINGS               ║
// ║   This is the ONLY file you need to edit for most changes.      ║
// ║   Edit on GitHub: find the file → click pencil icon → commit.   ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE_TEXT = {

  // ── GOOGLE APPS SCRIPT URL ───────────────────────────────────────
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbwftg4j8dgl3XsQXTuzSJkfUEX22A6wCMyyIMCNlRqX-sWVu5IovB6c5MqW-IGftOCt/exec",
  googleSheetId: "1TQ9UjAT7_Z55G-qDa0TVzi8U00QvgCSqnfsq3miZle8",
  adminUrl:      "https://script.google.com/macros/s/AKfycbwftg4j8dgl3XsQXTuzSJkfUEX22A6wCMyyIMCNlRqX-sWVu5IovB6c5MqW-IGftOCt/exec",

  // ── CONTACT INFO ─────────────────────────────────────────────────
  phone:    "(250) 686-4855",
  email:    "sinfronteramariachi@gmail.com",
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
    sheetMusic:     "https://drive.google.com/drive/folders/1gN1BwQ683Wx7qn8ElTa7DwBIt25n9Ymm?usp=sharing",
    pastRecordings: "https://drive.google.com/drive/folders/1wiS3EUuopZ7ZKPcpw77sRz9OWOEmchZW?usp=drive_link",
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
    { name: "Jorge",    role: "Vihuela, Vocals", bio: "Soy Guapo mucho.", photo: "https://drive.google.com/file/d/1KzFU97SypEzlelTG_0WP5NIf3c-byS28/view" },
    { name: "Angelique", role: "Vocals",         bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1Z3w4VTxLGsIBVPUGbJAdVUjGoBZtzjh3/view" },
    { name: "Amanda",   role: "Violín",          bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1clGUSsGanegpslgnLT67DTBdm6cSvkb4/view" },
    { name: "Hector",   role: "Violín",          bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1WDXbmZwSv3x_0RUOGo0fcF6hmZ139bqY/view" },
    { name: "Leonardo",   role: "Violín",          bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1hF4EhGKXO4V5b521HsyRy67JOUNiuhLx/view" },
    { name: "Cleo",   role: "Violín",          bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1DyiDmbnXwdaXJwhKloZJJW18tQf6059g/view" },
    { name: "Emily",    role: "Trompeta",         bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/10biyVXGY8PEvJiGhy9WFafQPICzuz93G/view" },
    { name: "David",    role: "Trompeta",         bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1HNDt3AzhBWDWuptYZ-YaOQgo1ZIGufMx/view" },
    { name: "Alex",     role: "Guitarrón",       bio: "Add a short biography about this member.", photo: "https://drive.google.com/file/d/1YMs4-4r1ZcuDfVs9RG26llGP1amkMt3u/view" }
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
    { file: "https://drive.google.com/file/d/1hPzjwj66LlayGJU50OOADbuclQSu-Lfu/view", caption: "Performance at Victoria Festival" },
    { file: "https://drive.google.com/file/d/1jyr3nFNJsRJK6WXIGT90Dkv0SHzDRHV4/view", caption: "Wedding Celebration" },
    { file: "https://drive.google.com/file/d/1Py5w4D3X26hEOKP5rtiJBdsU2IwRhpMt/view", caption: "Cultural Event" },
    { file: "https://drive.google.com/file/d/1tGOZCVoaiJImn-g_9NJi-DyCyL7xYR02/view", caption: "Private Party" },
    { file: "https://drive.google.com/file/d/1nt9HGZu2J7ZrRaIAU_urviTovpEJzY7C/view", caption: "Outdoor Performance" },
    { file: "https://drive.google.com/file/d/1ZImhbWNnWR9QdZNykcy28lcjvggESvCL/view", caption: "Band in Charro Suits" },
    { file: "https://drive.google.com/file/d/1Z3w4VTxLGsIBVPUGbJAdVUjGoBZtzjh3/view", caption: "Band in Charro Suits" }
    // ADD NEW PHOTOS ABOVE THIS LINE
  ],

  // ── YOUTUBE VIDEOS ───────────────────────────────────────────────
  // Copy only the ID from the YouTube URL (part after ?v=)
  // Keep quotes and comma on each line.
  videos: [
    { id: "WfqlfYfFRzU", label: "Greek Fest, 2024" },
    { id: "rdUy6x38yYg", label: "test" },
    { id: "NCvJwzDQTBM",  label: "test2" }
    // ADD NEW VIDEOS ABOVE THIS LINE
  ]

};
