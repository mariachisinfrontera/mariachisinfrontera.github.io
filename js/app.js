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
  buildGallery();
  buildVideos();
  buildContact();
  bindBookingForm();

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
      // drive.google.com/thumbnail is publicly accessible without Google auth
      // lh3.googleusercontent.com requires a Google session — fails on public mobile
      var sz = size || 'w800';
      return 'https://drive.google.com/thumbnail?id=' + match[1] + '&sz=' + sz;
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
    // Also add to mobile overlay socials
    var overlayEl = document.getElementById('navOverlaySocials');
    if (overlayEl && hasReal) {
      var olA = document.createElement('a');
      olA.href = url; olA.target = '_blank'; olA.className = 'soc';
      olA.setAttribute('aria-label', d.label);
      olA.innerHTML = '<svg viewBox="0 0 24 24" ' + attr + ' width="26" height="26">' + d.svg + '</svg>';
      overlayEl.appendChild(olA);
    }

    // Contact social icon — only show if real link
    if (hasReal && socRow) {
      var socA = document.createElement('a');
      socA.href = url; socA.target = '_blank'; socA.className = 'soc contact-soc';
      socA.setAttribute('aria-label', d.label); socA.title = d.label;
      socA.innerHTML = '<svg viewBox="0 0 24 24" ' + attr + ' width="24" height="24">' + d.svg + '</svg>';
      socA.style.cssText = 'color:' + d.color + ';opacity:1;';
      socRow.appendChild(socA);
    }
  });
}

// ── About ─────────────────────────────────────────────────
function buildAbout() {
  var T = SITE_TEXT;
  var img = document.getElementById('aboutImg');
  if (img && T.bandPhoto) {
    var frame = document.getElementById('aboutImgFrame');
    img.addEventListener('load', function() {
      // Image loaded successfully — ensure missing class is removed
      if (frame) frame.classList.remove('img-missing');
    });
    img.addEventListener('error', function() {
      // Only mark missing if src is actually set (not empty)
      if (img.src && img.src !== window.location.href) {
        if (frame) frame.classList.add('img-missing');
      }
    });
    img.src = resolvePhotoSrc(T.bandPhoto);
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
  buildCarousel('bandGrid', SITE_TEXT.members, function(m) {
    var i = SITE_TEXT.members.indexOf(m);
    var src = m.photo ? resolvePhotoSrc(m.photo) : '';
    return '<div class="member-card">' +
      '<div class="mc-img">' +
      (src ? '<img src="' + src + '" alt="' + m.name + '" onload="this.nextElementSibling.style.display=\'none\'" onerror="this.style.display=\'none\'">' : '') +
      '<div class="mc-img-ph">' + (ph[i] || '🎵') + '</div>' +
      '</div>' +
      '<div class="mc-body">' +
      '<div class="mc-name">' + m.name + '</div>' +
      '<div class="mc-role">' + m.role + '</div>' +
      '<p class="mc-bio">' + m.bio + '</p>' +
      '</div></div>';
  }, { perPage: 3, auto: 5000 });
}

// ── Gallery — same carousel as Videos/Band: 3 up desktop, 1 mobile,
//    arrows on desktop, swipe on mobile, auto-advances every 5s ──
function buildGallery() {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  var photos = SITE_TEXT.gallery;
  if (!photos || !photos.length) return;
  buildCarousel('galleryGrid', photos, function(p) {
    var src = resolvePhotoSrc(p.file);
    return '<div class="gallery-card">' +
      '<div class="gc-img">' +
      '<img src="' + src + '" alt="' + (p.caption || '') + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
      '<div class="gc-img-ph" style="display:none">📷</div>' +
      '</div>' +
      (p.caption ? '<div class="gc-caption">' + p.caption + '</div>' : '') +
      '</div>';
  }, { perPage: 3, auto: 5000 });
}

// ── Videos ────────────────────────────────────────────────
function extractYouTubeId(raw) {
  if (!raw) return null;
  raw = raw.trim();
  // Already a clean 11-char ID (letters, numbers, - and _)
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
  // youtu.be/ID or youtu.be/ID?si=...
  var m = raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // youtube.com/watch?v=ID or with extra params
  m = raw.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // youtube.com/embed/ID
  m = raw.match(/embed\/([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // Fallback — take first 11-char segment
  m = raw.match(/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}


// ── Universal Carousel ────────────────────────────────────────────
function buildCarousel(containerId, items, renderItem, opts) {
  var container = document.getElementById(containerId);
  if (!container || !items.length) return;
  opts = opts || {};
  var perPageDesktop = opts.perPage || 3;
  var autoMs = opts.auto || 0;
  var isMobile = window.innerWidth < 768;
  var perPage = isMobile ? 1 : perPageDesktop;
  var idx = 0;
  var autoTimer = null;
  var touchStartX = 0;

  // Build HTML
  var wrap = document.createElement('div');
  wrap.className = 'carousel-wrap';
  var outer = document.createElement('div');
  outer.className = 'carousel-track-outer';
  var track = document.createElement('div');
  track.className = 'carousel-track';
  items.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'carousel-card';
    card.innerHTML = renderItem(item);
    track.appendChild(card);
  });
  outer.appendChild(track);

  var prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev'; prevBtn.innerHTML = '&#8249;'; prevBtn.setAttribute('aria-label','Previous');
  var nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next'; nextBtn.innerHTML = '&#8250;'; nextBtn.setAttribute('aria-label','Next');

  var dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';
  var totalPages = Math.ceil(items.length / perPage);
  for (var d = 0; d < totalPages; d++) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (d===0?' active':'');
    dot.setAttribute('data-page', d);
    dot.setAttribute('aria-label', 'Page '+(d+1));
    dotsWrap.appendChild(dot);
  }

  wrap.appendChild(prevBtn);
  wrap.appendChild(outer);
  wrap.appendChild(nextBtn);
  container.innerHTML = '';
  container.appendChild(wrap);
  container.appendChild(dotsWrap);

  function setCardWidths() {
    var gap = 22;
    var availW = outer.offsetWidth;
    var cardW = (availW - gap * (perPage - 1)) / perPage;
    var allCards = track.querySelectorAll('.carousel-card');
    allCards.forEach(function(c) { c.style.minWidth = cardW + 'px'; c.style.maxWidth = cardW + 'px'; });
    track.style.gap = gap + 'px';
  }

  function goTo(page) {
    page = Math.max(0, Math.min(page, totalPages - 1));
    idx = page;
    var gap = 22;
    var cardW = track.querySelector('.carousel-card').offsetWidth;
    var offset = page * (cardW + gap) * perPage;
    track.style.transform = 'translateX(-' + offset + 'px)';
    dotsWrap.querySelectorAll('.carousel-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === page);
    });
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page >= totalPages - 1;
  }

  prevBtn.addEventListener('click', function() { goTo(idx - 1); resetAuto(); });
  nextBtn.addEventListener('click', function() { goTo(idx + 1); resetAuto(); });
  dotsWrap.querySelectorAll('.carousel-dot').forEach(function(dot) {
    dot.addEventListener('click', function() { goTo(parseInt(this.getAttribute('data-page'))); resetAuto(); });
  });

  // Touch swipe
  outer.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, {passive:true});
  outer.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { goTo(dx < 0 ? idx + 1 : idx - 1); resetAuto(); }
  }, {passive:true});

  function startAuto() {
    if (!autoMs) return;
    autoTimer = setInterval(function() { goTo(idx >= totalPages - 1 ? 0 : idx + 1); }, autoMs);
  }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  // Show items immediately as fallback, then initialize carousel
  var allCards = track.querySelectorAll('.carousel-card');
  allCards.forEach(function(c) { c.style.minWidth = '200px'; });
  
  function initCarousel() {
    if (outer.offsetWidth === 0) {
      setTimeout(initCarousel, 100);
      return;
    }
    setCardWidths(); goTo(0); startAuto();
  }
  setTimeout(initCarousel, 100);
  // Only react to real width changes (breakpoint crossed), not mobile
  // browsers firing 'resize' on scroll when the address bar hides/shows —
  // that was resetting the carousel back to slide 1 every time.
  var lastWidth = window.innerWidth;
  window.addEventListener('resize', function() {
    var newWidth = window.innerWidth;
    if (newWidth === lastWidth) return; // height-only change (mobile scroll) — ignore
    lastWidth = newWidth;
    var newIsMobile = newWidth < 768;
    var newPerPage  = newIsMobile ? 1 : perPageDesktop;
    var perPageChanged = newPerPage !== perPage;
    isMobile = newIsMobile;
    perPage  = newPerPage;
    totalPages = Math.ceil(items.length / perPage);
    setCardWidths();
    goTo(perPageChanged ? 0 : idx);
  });
}

function buildVideos() {
  var grid = document.getElementById('videosGrid');
  if (!grid) return;
  var valid = SITE_TEXT.videos
    .map(function(v) { return { id: extractYouTubeId(v.id), label: v.label }; })
    .filter(function(v) { return v.id && !v.id.startsWith('YOUTUBE'); });
  if (!valid.length) {
    grid.innerHTML = '<p style="color:rgba(208,208,208,.3);font-style:italic;text-align:center;padding:32px 0">Add YouTube video IDs to js/site-text.js to display videos here.</p>';
    return;
  }
  buildCarousel('videosGrid', valid, function(v) {
    return '<div class="vid-card">' +
      '<div class="vid-embed">' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '" allowfullscreen loading="lazy" title="' + v.label + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
      '</div><div class="vid-label">' + v.label + '</div></div>';
  }, { perPage: 3, auto: 5000 });
}

// ── Booking form — submit via AJAX so we can show a real success/
//    error message and actually clear the fields on success ──────
function bindBookingForm() {
  var form = document.getElementById('bookingForm');
  if (!form) return;
  var status = document.getElementById('bookingFormStatus');
  var btn    = document.getElementById('bookingSubmitBtn');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function(res) {
      if (res.ok) {
        form.reset();
        status.textContent = 'Thank you! Your booking inquiry has been sent — we\'ll be in touch soon.';
        status.className = 'form-status success';
      } else {
        return res.json().then(function(json) {
          var msg = (json && json.errors && json.errors.length)
            ? json.errors.map(function(er) { return er.message; }).join(', ')
            : 'Something went wrong sending your message.';
          throw new Error(msg);
        });
      }
    }).catch(function(err) {
      status.textContent = 'Sorry, we couldn\'t send that (' + err.message + '). Please email us directly at ' + SITE_TEXT.email + '.';
      status.className = 'form-status error';
    }).finally(function() {
      btn.disabled = false;
      btn.textContent = 'Send Booking Inquiry';
    });
  });
}

// ── Contact ───────────────────────────────────────────────
function buildContact() {
  var T    = SITE_TEXT;
  var list = document.getElementById('contactInfoList');
  if (!list) return;
  list.innerHTML = [
    { label:'Phone',    val: '<a href="tel:' + T.phone.replace(/[^0-9+]/g,'') + '" style="color:var(--gold)">' + T.phone + '</a>' },
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
        return { id: clean[0], name: clean[1], date: clean[2], venue: clean[3], visibility: clean[4], time: clean[5] || '', duration: parseInt(clean[6]) || 60, link: clean[7] || '' };
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
      var timeStr = g.time ? formatTime(g.time) : '';
      var durStr  = g.time && g.duration ? ' (' + (g.duration===60?'1 hr':g.duration===90?'1.5 hr':g.duration===120?'2 hr':g.duration+' min') + ')' : '';
      var timeHtml = g.time
        ? '<div class="gig-time">🕐 ' + timeStr + durStr + '</div>'
        : '<div class="gig-time" style="opacity:.5">🕐 Time TBD</div>';
      var mapsUrl = 'https://maps.google.com/?q=' + encodeURIComponent(g.venue);
      var linkHtml = g.link ? '<a class="gig-link-btn" href="' + g.link + '" target="_blank" rel="noopener">Link to Event Info →</a>' : '';
      return '<div class="gig-row reveal">' +
        '<div class="gig-cal"><div class="gig-day">' + d.getDate() + '</div>' +
        '<div class="gig-month">' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + '</div></div>' +
        '<div class="gig-info"><div class="gig-name">' + g.name + '</div>' +
        '<a class="gig-venue" href="' + mapsUrl + '" target="_blank" rel="noopener">📍 ' + g.venue + '</a>' +
        timeHtml + linkHtml + '</div></div>';
    }).join('');

    var ro = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.gig-row').forEach(function(el) { ro.observe(el); });

  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (empty)   { empty.textContent = 'No upcoming public performances — check back soon!'; empty.style.display = 'block'; }
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
