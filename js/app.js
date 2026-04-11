// ═══════════════════════════════════════════════════════════
//  MARIACHI SIN FRONTERA — App
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Mobile nav
  const burger  = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');
  burger.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mainNav.classList.remove('open'))
  );

  buildSocials();
  buildAbout();
  buildBand();
  buildSlideshow();
  buildVideos();
  buildContact();
  loadGigs();

  // Scroll reveal
  setTimeout(() => {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  }, 200);
});

// ── Helper: resolve photo src (file or Google Drive link) ─
function resolvePhotoSrc(file) {
  if (!file) return '';
  // Full URL — Google Drive or external link
  if (file.startsWith('http')) {
    // Convert Google Drive share link to direct image link
    const match = file.match(/\/file\/d\/([^/]+)/);
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
    }
    return file;
  }
  // Local file in images/ folder
  return 'images/' + file;
}

// ── Social icons ──────────────────────────────────────────
function buildSocials() {
  const T = SITE_TEXT;
  const defs = [
    { key:'facebook',  label:'Facebook',   color:'#1877f2', fill:true,
      svg:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'},
    { key:'instagram', label:'Instagram',  color:'#e1306c', fill:false,
      svg:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>'},
    { key:'youtube',   label:'YouTube',    color:'#ff0000', fill:true,
      svg:'<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>'},
    { key:'twitter',   label:'Twitter / X',color:'#000',    fill:true,
      svg:'<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'}
  ];
  const navEl  = document.getElementById('navSocials');
  const socRow = document.getElementById('contactSocialRow');
  defs.forEach(({ key, label, color, fill, svg }) => {
    const url = T[key];
    if (!url || url.includes('YOUR_')) return;
    const attr = fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2"';
    const navA = document.createElement('a');
    navA.href = url; navA.target = '_blank'; navA.className = 'soc'; navA.setAttribute('aria-label', label);
    navA.innerHTML = `<svg viewBox="0 0 24 24" ${attr} width="18" height="18">${svg}</svg>`;
    navEl.appendChild(navA);
    const pill = document.createElement('a');
    pill.href = url; pill.target = '_blank'; pill.textContent = label; pill.className = 'soc-pill';
    pill.style.cssText = `border-color:${color};color:${color}`;
    pill.addEventListener('mouseenter', () => { pill.style.background = color; pill.style.color = '#fff'; });
    pill.addEventListener('mouseleave', () => { pill.style.background = ''; pill.style.color = color; });
    socRow.appendChild(pill);
  });
}

// ── About ─────────────────────────────────────────────────
function buildAbout() {
  const T = SITE_TEXT;
  const img = document.getElementById('aboutImg');
  if (img && T.bandPhoto) {
    img.src = resolvePhotoSrc(T.bandPhoto);
  }
  setText('aboutLead', T.about.lead);
  setText('aboutP1',   T.about.paragraph1);
  setText('aboutP2',   T.about.paragraph2);
}

// ── Band members ──────────────────────────────────────────
function buildBand() {
  const grid = document.getElementById('bandGrid');
  if (!grid) return;
  const ph = ['🎺','🎻','🎸','🎵','🎸','🎤'];
  grid.innerHTML = SITE_TEXT.members.map((m, i) => {
    const src = m.photo ? resolvePhotoSrc(m.photo) : '';
    return `
      <div class="member-card reveal">
        <div class="mc-img">
          ${src ? `<img src="${src}" alt="${m.name}" onerror="this.style.display='none'">` : ''}
          <div class="mc-img-ph">${ph[i] || '🎵'}</div>
        </div>
        <div class="mc-body">
          <div class="mc-name">${m.name}</div>
          <div class="mc-role">${m.role}</div>
          <p class="mc-bio">${m.bio}</p>
        </div>
      </div>`;
  }).join('');
}

// ── Gallery Slideshow ─────────────────────────────────────
let slideIndex   = 0;
let slideTimer   = null;
const SLIDE_DELAY = 5000; // 5 seconds

function buildSlideshow() {
  const photos = SITE_TEXT.gallery;
  if (!photos || !photos.length) return;

  const track  = document.getElementById('slideTrack');
  const dots   = document.getElementById('slideDots');
  const caption = document.getElementById('slideCaption');

  // Build slides
  track.innerHTML = photos.map((p, i) => {
    const src = resolvePhotoSrc(p.file);
    return `
      <div class="slide ${i === 0 ? 'active' : ''}" data-index="${i}">
        <img src="${src}" alt="${p.caption || ''}" onerror="this.parentElement.classList.add('slide-missing')">
        <div class="slide-missing-ph">📷</div>
      </div>`;
  }).join('');

  // Build dots
  dots.innerHTML = photos.map((_, i) =>
    `<button class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" aria-label="Photo ${i+1}"></button>`
  ).join('');

  // Set initial caption
  if (photos[0].caption) caption.textContent = photos[0].caption;

  // Arrow buttons
  document.getElementById('slidePrev').onclick = () => { stepSlide(-1); resetTimer(); };
  document.getElementById('slideNext').onclick = () => { stepSlide(1);  resetTimer(); };

  // Auto-advance
  startTimer();
}

function goToSlide(n) {
  const photos  = SITE_TEXT.gallery;
  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.dot');
  const caption = document.getElementById('slideCaption');

  slides[slideIndex].classList.remove('active');
  dots[slideIndex].classList.remove('active');

  slideIndex = (n + photos.length) % photos.length;

  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');

  const cap = photos[slideIndex].caption;
  caption.textContent = cap || '';
  caption.style.opacity = cap ? '1' : '0';
}

function stepSlide(dir) { goToSlide(slideIndex + dir); }

function startTimer() {
  slideTimer = setInterval(() => stepSlide(1), SLIDE_DELAY);
}

function resetTimer() {
  clearInterval(slideTimer);
  startTimer();
}

// ── Videos ────────────────────────────────────────────────
function buildVideos() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;
  const valid = SITE_TEXT.videos.filter(v => v.id && !v.id.startsWith('YOUTUBE'));
  if (!valid.length) {
    grid.innerHTML = '<p style="color:rgba(208,208,208,.3);font-style:italic;text-align:center;padding:32px 0;grid-column:1/-1">Add YouTube video IDs to js/site-text.js to display videos here.</p>';
    return;
  }
  grid.innerHTML = valid.map(v => `
    <div class="vid-card reveal">
      <div class="vid-embed">
        <iframe src="https://www.youtube.com/embed/${v.id}" allowfullscreen loading="lazy" title="${v.label}"></iframe>
      </div>
      <div class="vid-label">${v.label}</div>
    </div>`).join('');
}

// ── Contact ───────────────────────────────────────────────
function buildContact() {
  const T    = SITE_TEXT;
  const list = document.getElementById('contactInfoList');
  if (list) {
    list.innerHTML = [
      { label:'Phone',    val: T.phone },
      { label:'Email',    val: `<a href="mailto:${T.email}">${T.email}</a>` },
      { label:'Based in', val: T.location }
    ].map(i => `<li><strong>${i.label}:</strong> ${i.val}</li>`).join('');
  }
}

// ── Gigs — from Google Apps Script ───────────────────────
async function loadGigs() {
  const list    = document.getElementById('gigsList');
  const empty   = document.getElementById('gigsEmpty');
  const loading = document.getElementById('gigsLoading');

  const url = SITE_TEXT.appsScriptUrl;
  if (!url || url.includes('PASTE_YOUR')) {
    loading.style.display = 'none';
    empty.textContent = 'Gig dates coming soon — check back shortly!';
    empty.style.display = 'block';
    return;
  }

  try {
    const res  = await fetch(`${url}?action=getGigs`);
    const gigs = await res.json();
    loading.style.display = 'none';

    if (!Array.isArray(gigs) || !gigs.length) {
      empty.style.display = 'block'; return;
    }

    const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    list.innerHTML = gigs.map(g => {
      const d = new Date(g.date + 'T00:00:00');
      return `
        <div class="gig-row reveal">
          <div class="gig-cal">
            <div class="gig-day">${d.getDate()}</div>
            <div class="gig-month">${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>
          </div>
          <div class="gig-info">
            <div class="gig-name">${g.name}</div>
            <div class="gig-venue">📍 ${g.venue}</div>
          </div>
        </div>`;
    }).join('');

    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.gig-row').forEach(el => ro.observe(el));

  } catch {
    loading.style.display = 'none';
    empty.textContent = 'Could not load performances — please check back later.';
    empty.style.display = 'block';
  }
}

// ── Utility ───────────────────────────────────────────────
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
