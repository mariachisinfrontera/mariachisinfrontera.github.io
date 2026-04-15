// ═══════════════════════════════════════════════════════════
//  MARIACHI SIN FRONTERA — App
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('yr').textContent = new Date().getFullYear();

  // ── Mobile nav overlay ───────────────────────────────────
  var burger  = document.getElementById('burger');
  var overlay = document.getElementById('navOverlay');
  var navClose = document.getElementById('navClose');
  function closeNav() {
    overlay.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (burger && overlay) {
    burger.addEventListener('click', function() {
      var open = overlay.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (navClose) navClose.addEventListener('click', closeNav);
    overlay.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeNav);
    });
  }

  buildSocials();
  buildAbout();
  buildBand();
  buildSlideshow();
  buildVideos();
  buildContact();

  // Admin links — show when adminUrl is set
  var adminUrl = SITE_TEXT.adminUrl;
  if (adminUrl && adminUrl !== '') {
    ['navAdminLink','mobileAdminLink','footerAdminLink'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) { el.href = adminUrl; el.style.display = ''; }
    });
  }

  loadGigs();

  // Scroll reveal
  setTimeout(function() {
    var ro = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function(el) { ro.observe(el); });
  }, 200);
});

// ── Photo resolver ────────────────────────────────────────
function resolvePhotoSrc(file, size) {
  if (!file) return '';
  if (file.startsWith('http')) {
    var match = file.match(/\/file\/d\/([^/]+)/);
    if (match) {
      // Use lh3.googleusercontent.com — more reliable on mobile than /thumbnail
      var sz = size || '800';
      return 'https://lh3.googleusercontent.com/d/' + match[1] + '=s' + sz + '?authuser=0';
    }
    return file;
  }
  return 'images/' + file;
}

// ── Social icons ──────────────────────────────────────────
// Always builds icons — real links are clickable, placeholders are greyed out
function buildSocials() {
  var T = SITE_TEXT;
  var defs = [
    { key:'facebook',  label:'Facebook',    color:'#1877f2', fill:true,
      svg:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'},
    { key:'instagram', label:'Instagram',   color:'#e1306c', fill:false,
      svg:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>'},
    { key:'youtube',   label:'YouTube',     color:'#ff0000', fill:true,
      svg:'<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>'}
  ];
  var navEl  = document.getElementById('navSocials');
  var socRow = document.getElementById('contactSocialRow');

  defs.forEach(function(d) {
    var url = T[d.key];
    var hasReal = url && !url.includes('YOUR_');
    var attr = d.fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2"';

    // Nav icon — always show, greyed if no real link
    var navA = document.createElement(hasReal ? 'a' : 'span');
    if (hasReal) { navA.href = url; navA.target = '_blank'; }
    navA.className = 'soc' + (hasReal ? '' : ' soc-placeholder');
    navA.setAttribute('aria-label', d.label);
    navA.title = hasReal ? d.label : d.label + ' (add link in site-text.js)';
    navA.innerHTML = '<svg viewBox="0 0 24 24" ' + attr + ' width="18" height="18">' + d.svg + '</svg>';
    if (navEl) navEl.appendChild(navA);

    // Contact pill — only show if real link
    if (hasReal && socRow) {
      var pill = document.createElement('a');
      pill.href = url; pill.target = '_blank'; pill.textContent = d.label; pill.className = 'soc-pill';
      pill.style.cssText = 'border-color:' + d.color + ';color:' + d.color;
      pill.addEventListener('mouseenter', function() { pill.style.background = d.color; pill.style.color = '#fff'; });
      pill.addEventListener('mouseleave', function() { pill.style.background = ''; pill.style.color = d.color; });
      socRow.appendChild(pill);
    }
  });
}

// ── About ─────────────────────────────────────────────────
function buildAbout() {
  var T = SITE_TEXT;
  var img = document.getElementById('aboutImg');
  if (img && T.bandPhoto) {
    img.addEventListener('load', function() { img.classList.add('loaded'); });
    img.addEventListener('error', function() {
      // lh3 failed — try the /thumbnail endpoint as fallback
      if (!img.getAttribute('data-tried-thumb')) {
        img.setAttribute('data-tried-thumb','1');
        var m2 = T.bandPhoto.match(/\/file\/d\/([^/]+)/);
        if (m2) img.src = 'https://drive.google.com/thumbnail?id=' + m2[1] + '&sz=w800';
      }
    });
    img.src = resolvePhotoSrc(T.bandPhoto);
    if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
  }
  setText('aboutLead', T.about.lead);
  setText('aboutP1',   T.about.paragraph1);
  setText('aboutP2',   T.about.paragraph2);
}

// ── Band members ──────────────────────────────────────────
function buildBand() {
  var grid = document.getElementById('bandGrid');
  if (!grid) return;
  var ph = ['🎺','🎻','🎸','🎵','🎸','🎤'];
  grid.innerHTML = SITE_TEXT.members.map(function(m, i) {
    var src = m.photo ? resolvePhotoSrc(m.photo) : '';
    return '<div class="member-card reveal">' +
      '<div class="mc-img">' +
      (src ? '<img src="' + src + '" alt="' + m.name + '" onload="this.nextElementSibling.style.display=\'none\'" onerror="this.style.display=\'none\'">' : '') +
      '<div class="mc-img-ph">' + (ph[i] || '🎵') + '</div>' +
      '</div>' +
      '<div class="mc-body">' +
      '<div class="mc-name">' + m.name + '</div>' +
      '<div class="mc-role">' + m.role + '</div>' +
      '<p class="mc-bio">' + m.bio + '</p>' +
      '</div></div>';
  }).join('');
}

// ── Gallery Slideshow — 10 second delay ──────────────────
var slideIndex  = 0;
var slideTimer  = null;
var SLIDE_DELAY = 10000;

function buildSlideshow() {
  var photos = SITE_TEXT.gallery;
  if (!photos || !photos.length) return;
  var track   = document.getElementById('slideTrack');
  var dots    = document.getElementById('slideDots');
  var caption = document.getElementById('slideCaption');
  if (!track) return;

  track.innerHTML = photos.map(function(p, i) {
    var src = resolvePhotoSrc(p.file);
    return '<div class="slide ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '">' +
      '<img src="' + src + '" alt="' + (p.caption || '') + '" onerror="this.parentElement.classList.add(\'slide-missing\')">' +
      '<div class="slide-missing-ph">📷</div></div>';
  }).join('');

  dots.innerHTML = photos.map(function(_, i) {
    return '<button class="dot ' + (i === 0 ? 'active' : '') + '" onclick="goToSlide(' + i + ')" aria-label="Photo ' + (i+1) + '"></button>';
  }).join('');

  if (photos[0].caption) caption.textContent = photos[0].caption;
  document.getElementById('slidePrev').onclick = function() { stepSlide(-1); resetTimer(); };
  document.getElementById('slideNext').onclick = function() { stepSlide(1);  resetTimer(); };
  startTimer();
}

function goToSlide(n) {
  var photos  = SITE_TEXT.gallery;
  var slides  = document.querySelectorAll('.slide');
  var dotEls  = document.querySelectorAll('.dot');
  var caption = document.getElementById('slideCaption');
  if (!slides.length) return;
  slides[slideIndex].classList.remove('active');
  dotEls[slideIndex].classList.remove('active');
  slideIndex = (n + photos.length) % photos.length;
  slides[slideIndex].classList.add('active');
  dotEls[slideIndex].classList.add('active');
  caption.textContent = photos[slideIndex].caption || '';
}

function stepSlide(dir) { goToSlide(slideIndex + dir); }
function startTimer()   { slideTimer = setInterval(function() { stepSlide(1); }, SLIDE_DELAY); }
function resetTimer()   { clearInterval(slideTimer); startTimer(); }

// ── Videos ────────────────────────────────────────────────
function buildVideos() {
  var grid = document.getElementById('videosGrid');
  if (!grid) return;
  var valid = SITE_TEXT.videos.filter(function(v) { return v.id && !v.id.startsWith('YOUTUBE'); });
  if (!valid.length) {
    grid.innerHTML = '<p style="color:rgba(208,208,208,.3);font-style:italic;text-align:center;padding:32px 0;grid-column:1/-1">Add YouTube video IDs to js/site-text.js to display videos here.</p>';
    return;
  }
  grid.innerHTML = valid.map(function(v) {
    return '<div class="vid-card reveal">' +
      '<div class="vid-embed">' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '" allowfullscreen loading="lazy" title="' + v.label + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
      '</div><div class="vid-label">' + v.label + '</div></div>';
  }).join('');
}

// ── Contact ───────────────────────────────────────────────
function buildContact() {
  var T    = SITE_TEXT;
  var list = document.getElementById('contactInfoList');
  if (!list) return;
  list.innerHTML = [
    { label:'Phone',    val: T.phone },
    { label:'Email',    val: '<a href="mailto:' + T.email + '">' + T.email + '</a>' },
    { label:'Based in', val: T.location }
  ].map(function(i) { return '<li><strong>' + i.label + ':</strong> ' + i.val + '</li>'; }).join('');
}

// ── Gigs — reads from Google Sheet CSV ───────────────────
async function loadGigs() {
  var list    = document.getElementById('gigsList');
  var empty   = document.getElementById('gigsEmpty');
  var loading = document.getElementById('gigsLoading');
  var sheetId = SITE_TEXT.googleSheetId;
  if (!sheetId || sheetId.includes('PASTE')) {
    if (loading) loading.style.display = 'none';
    if (empty)   empty.style.display   = 'block';
    return;
  }
  try {
    var csvUrl = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv&sheet=Gigs';
    var res    = await fetch(csvUrl);
    var text   = await res.text();
    if (loading) loading.style.display = 'none';
    var today  = new Date(); today.setHours(0,0,0,0);
    var MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    var rows   = text.trim().split('\n').slice(1);
    var gigs   = rows
      .map(function(row) {
        var cols  = row.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
        var clean = cols.map(function(c) { return c.replace(/^"|"$/g, '').trim(); });
        return { id: clean[0], name: clean[1], date: clean[2], venue: clean[3], visibility: clean[4], time: clean[5] || '' };
      })
      .filter(function(g) {
        if (!g.name || !g.date) return false;
        if (g.visibility === 'private') return false;
        return new Date(g.date + 'T00:00:00') >= today;
      })
      .sort(function(a, b) { return new Date(a.date) - new Date(b.date); });

    if (!gigs.length) { if (empty) empty.style.display = 'block'; return; }

    list.innerHTML = gigs.map(function(g) {
      var d = new Date(g.date + 'T00:00:00');
      var timeHtml = g.time ? '<div class="gig-time">🕐 ' + formatTime(g.time) + '</div>' : '';
      return '<div class="gig-row reveal">' +
        '<div class="gig-cal"><div class="gig-day">' + d.getDate() + '</div>' +
        '<div class="gig-month">' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + '</div></div>' +
        '<div class="gig-info"><div class="gig-name">' + g.name + '</div>' +
        '<div class="gig-venue">📍 ' + g.venue + '</div>' + timeHtml + '</div></div>';
    }).join('');

    var ro = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.gig-row').forEach(function(el) { ro.observe(el); });

  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (empty)   { empty.textContent = 'Could not load performances — check back soon.'; empty.style.display = 'block'; }
  }
}

function formatTime(t) {
  if (!t) return '';
  var colon = t.indexOf(':');
  if (colon > 2) { var sp = t.lastIndexOf(' ', colon); t = sp >= 0 ? t.substring(sp + 1) : t; }
  var parts = t.split(':'), h = parseInt(parts[0]), m = parts[1] || '00';
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + m + ' ' + ampm;
}

function setText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}
