/* KingNaren Store – script.js
   Konfigurasi dan data produk ada di atas agar mudah diubah. */
(() => {
  'use strict';

  /* ---------- Konfigurasi ---------- */
  const CONFIG = {
    whatsapp: '6285924864946',  // format 62…, tanpa + atau spasi
    whatsappLabel: '+62 859-2486-4946',
    brand: 'KingNaren Store',
    qris: 'qris.png'           // nama file gambar QRIS (sejajar index.html)
  };

  /* ---------- Kategori ---------- */
  const CATS = [
    { id: 'panel',  icon: 'server', label: 'Khusus Panel',   title: 'Panel Pterodactyl',        desc: 'Pilih kapasitas RAM panel sesuai kebutuhan bot atau server kamu.' },
    { id: 'role',   icon: 'crown',  label: 'Role Panel',     title: 'Role Panel',               desc: 'Akses role khusus untuk mengelola dan menjual kembali panel.' },
    { id: 'script', icon: 'wrench', label: 'Jasa Script',    title: 'Jasa Edit & Recode Script', desc: 'Oprek script yang bersih, terstruktur, dan tuntas hingga ke fungsi dasar.' },
    { id: 'murbug', icon: 'bug',    label: 'Murbug',         title: 'Murbug',                   desc: 'Role dan bimbingan untuk perbaikan error coding.' },
    { id: 'vps',    icon: 'cloud',  label: 'VPS',            title: 'VPS',                      desc: 'Pilih spesifikasi VPS sesuai kebutuhanmu.' },
    { id: 'bot',    icon: 'bot',    label: 'Script Bot Tele', title: 'Script Bot via Telegram',  desc: 'Script bot Telegram siap pakai, full up. Pilih yang sesuai lalu pesan.' }
  ];

  /* ---------- Produk: [kategori, nama, deskripsi, harga, populer, grup] ---------- */
  const DATA = [
    ['panel', '1GB Panel', 'Panel Pterodactyl RAM 1GB, stabil.', 1500],
    ['panel', '2GB Panel', 'Panel Pterodactyl RAM 2GB, stabil.', 2000],
    ['panel', '3GB Panel', 'Panel Pterodactyl RAM 3GB, stabil.', 2500],
    ['panel', '4GB Panel', 'Panel Pterodactyl RAM 4GB, lancar.', 3000],
    ['panel', '5GB Panel', 'Panel Pterodactyl RAM 5GB, lancar.', 3500, 1],
    ['panel', '10GB Panel', 'Panel Pterodactyl RAM 10GB, ngebut.', 5000, 1],
    ['panel', 'Unlimited Panel', 'Panel Pterodactyl RAM unlimited sesuai ketentuan.', 7000, 1],

    ['role', 'Reseller Panel', 'Akses role Reseller untuk mengelola panel.', 10000],
    ['role', 'Admin Panel', 'Akses role Admin panel dan izin reseller.', 20000, 1],
    ['role', 'Owner Panel', 'Akses role Owner panel dengan fitur lengkap.', 30000],
    ['role', 'PT Panel', 'Akses role Partner (PT) dengan panel prioritas.', 35000],
    ['role', 'CEO Panel', 'Akses role CEO panel dengan full akses.', 45000, 1],

    ['script', 'Jasa Rename SC Sampai Akar', 'Ganti nama, watermark, dan identitas script sampai ke fungsi paling dalam tanpa error.', 10000, 1],
    ['script', 'Jasa Recode Script', 'Perombakan, restrukturisasi logika, pembersihan error, dan optimasi script.', 15000, 1],

    ['murbug', 'Murbug Member', 'Role Member, bimbingan bug, dan script yang gacor.', 5000],
    ['murbug', 'Murbug Owner', 'Role Owner, bimbingan bug, dan script yang gacor.', 10000, 1],
    ['murbug', 'Murbug Partner', 'Role Partner, bimbingan bug, dan script yang gacor.', 15000],
    ['murbug', 'Murbug Creator', 'Role Creator, bimbingan bug, dan script yang gacor.', 35000, 1],

    ['vps', 'VPS Linode R2 C2', 'Linode, RAM 2GB, CPU 2 core.', 5000, 0, 'VPS Linode'],
    ['vps', 'VPS Linode R4 C4', 'Linode, RAM 4GB, CPU 4 core.', 7000, 0, 'VPS Linode'],
    ['vps', 'VPS Linode R8 C4', 'Linode, RAM 8GB, CPU 4 core.', 10000, 0, 'VPS Linode'],
    ['vps', 'VPS Linode R16 C6', 'Linode, RAM 16GB, CPU 6 core.', 15000, 0, 'VPS Linode'],
    ['vps', 'VPS DO R2 C2', 'DigitalOcean, RAM 2GB, CPU 2 core.', 4000, 0, 'VPS DigitalOcean'],
    ['vps', 'VPS DO R4 C2', 'DigitalOcean, RAM 4GB, CPU 2 core.', 4000, 0, 'VPS DigitalOcean'],
    ['vps', 'VPS DO R8 C4', 'DigitalOcean, RAM 8GB, CPU 4 core.', 8000, 0, 'VPS DigitalOcean'],
    ['vps', 'VPS DO R16 C2', 'DigitalOcean, RAM 16GB, CPU 2 core.', 5000, 0, 'VPS DigitalOcean'],

    ['bot', 'AVOID X TIME', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'X CODE', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'EVERLEIGH', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'VOID GHOST', 'Script bot via Telegram, full up.', 10000, 1],
    ['bot', 'X MOVA INVICTUS', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'ONE PIECE MAN', 'Script bot via Telegram, full up.', 15000],
    ['bot', 'X XEON', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'CIKIDAW', 'Script bot via Telegram, full up.', 80000],
    ['bot', 'X MINE', 'Script bot via Telegram, full up.', 5000],
    ['bot', 'KICAU MANIA', 'Script bot via Telegram, full up.', 15000]
  ];
  const ITEMS = DATA.map(([cat, name, desc, price, pop, group], id) => ({ id, cat, name, desc, price, pop: !!pop, group }));
  const byId = (id) => ITEMS[id];

  /* ---------- Helper ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rp = (n) => 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const waLink = (t) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
  const icons = () => window.lucide && window.lucide.createIcons();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- State & keranjang ---------- */
  const state = { cat: CATS[0].id, q: '', view: 'cart', sheet: null, lastFocus: null, direct: null };
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem('kn_cart')) || {}; } catch (_) { cart = {}; }
  cart = Object.fromEntries(Object.entries(cart).filter(([id, n]) => byId(id) && n > 0));
  const save = () => { try { localStorage.setItem('kn_cart', JSON.stringify(cart)); } catch (_) { /* abaikan */ } };
  const qty = (id) => cart[id] || 0;
  const lines = () => ITEMS.filter((p) => qty(p.id));
  const count = () => lines().reduce((s, p) => s + qty(p.id), 0);
  const total = () => lines().reduce((s, p) => s + qty(p.id) * p.price, 0);

  /* ---------- Render katalog ---------- */
  const ctl = (id) => qty(id)
    ? `<div class="step"><button type="button" data-dec="${id}" aria-label="Kurangi"><i data-lucide="minus"></i></button><span>${qty(id)}</span><button type="button" data-inc="${id}" aria-label="Tambah"><i data-lucide="plus"></i></button></div>`
    : `<button type="button" class="icon-btn add" data-inc="${id}" aria-label="Tambah ${byId(id).name} ke keranjang"><i data-lucide="plus"></i></button>`;

  const row = (p) => `
    <article class="row${qty(p.id) ? ' in' : ''}" data-row="${p.id}">
      <div class="row-top">
        <span class="row-ic"><i data-lucide="${CATS.find((c) => c.id === p.cat).icon}"></i></span>
        <div class="row-main">
          <div class="row-name"><h4>${p.name}</h4>${p.pop ? '<span class="pop"><i data-lucide="flame"></i>Populer</span>' : ''}</div>
          <p>${p.desc}</p>
        </div>
      </div>
      <div class="price"><strong>${rp(p.price)}</strong><small>/ layanan</small></div>
      <div class="row-act">
        <button type="button" class="btn btn-primary btn-sm buy" data-buy="${p.id}" aria-label="Beli ${p.name} sekarang"><i data-lucide="zap"></i>Beli</button>
        <div data-ctl="${p.id}">${ctl(p.id)}</div>
      </div>
    </article>`;

  const renderTabs = () => {
    $('#tabs').innerHTML = CATS.map((c) =>
      `<button type="button" class="tab" role="tab" data-tab="${c.id}" aria-selected="${c.id === state.cat}"><i data-lucide="${c.icon}"></i>${c.label}</button>`).join('');
    $('#tabsWrap').classList.toggle('searching', !!state.q.trim());
  };

  const renderList = () => {
    const q = state.q.trim().toLowerCase();
    const cats = q ? CATS : CATS.filter((c) => c.id === state.cat);
    let html = '';
    cats.forEach((c) => {
      const list = ITEMS.filter((p) => p.cat === c.id && (!q || `${p.name} ${p.desc} ${c.label}`.toLowerCase().includes(q)));
      if (!list.length) return;
      html += `<div class="cat-head"><h3>${c.title}</h3>${q ? '' : `<p>${c.desc}</p>`}<span>${list.length} produk</span></div><div class="lw"><div class="glist">`;
      let last;
      list.forEach((p) => {
        if (p.group && p.group !== last) html += `<h4 class="group">${p.group}</h4>`;
        last = p.group;
        html += row(p);
      });
      html += '</div></div>';
    });
    $('#list').innerHTML = html || `<p class="empty"><i data-lucide="search-x"></i>Produk tidak ditemukan. Coba kata kunci lain.</p>`;
    icons();
  };

  const selectCat = (id) => {
    state.cat = id;
    state.q = '';
    $('#q').value = '';
    renderTabs();
    renderList();
    const active = $(`.tab[data-tab="${id}"]`);
    if (active) active.scrollIntoView({ inline: 'center', block: 'nearest' });
    const list = $('#list');
    if (list.getBoundingClientRect().top < 120) list.scrollIntoView({ block: 'start' });
  };

  /* ---------- Sinkronisasi saat pesanan berubah ---------- */
  const updateBar = () => {
    const bar = $('#cartbar');
    const n = count();
    bar.hidden = !n;
    $('#cbInfo').textContent = `${n} layanan`;
    $('#cbTotal').textContent = rp(total());
  };

  const syncBadge = (bump) => {
    const n = count();
    updateBar();
    $$('[data-badge]').forEach((b) => {
      b.textContent = n;
      b.hidden = !n;
      if (bump) { b.classList.add('bump'); setTimeout(() => b.classList.remove('bump'), 250); }
    });
  };

  const setQty = (id, n) => {
    if (n > 0) cart[id] = Math.min(n, 99); else delete cart[id];
    save();
    $$(`[data-ctl="${id}"]`).forEach((el) => { el.innerHTML = ctl(id); });
    $$(`[data-row="${id}"]`).forEach((el) => el.classList.toggle('in', !!qty(id)));
    syncBadge(true);
    if (state.sheet === 'cart') renderCart();
    else icons();
  };

  /* ---------- Teks pesanan (WhatsApp & salin) ---------- */
  /* Pesanan yang sedang dibayar: satu produk (tombol Beli) atau seluruh keranjang */
  const direct = () => state.direct !== null;
  const payEntries = () => (direct() ? [[byId(state.direct), 1]] : lines().map((p) => [p, qty(p.id)]));
  const payTotal = () => payEntries().reduce((s, [p, n]) => s + p.price * n, 0);
  const orderLines = () => payEntries().map(([p, n]) => `- ${p.name} x${n} = ${rp(p.price * n)}`).join('\n');
  const waOrderLink = () => waLink(`Halo ${CONFIG.brand}, saya ingin order:\n${orderLines()}\nTotal: ${rp(payTotal())}\nSaya sudah bayar via QRIS, bukti transfer saya kirim di chat ini.`);
  const orderSummary = () => `Pesanan ${CONFIG.brand}\n${orderLines()}\nTotal: ${rp(payTotal())}\nPembayaran: QRIS`;

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
    } catch (_) { /* lanjut ke cadangan */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (_) { return false; }
  };

  /* ---------- Sheet pesanan & pembayaran QRIS ---------- */
  const payView = () => {
    const sum = payEntries().map(([p, n]) => `<div class="pay-line"><span>${p.name}${n > 1 ? ` <small>x${n}</small>` : ''}</span><b>${rp(p.price * n)}</b></div>`).join('');
    const qrisBlock = CONFIG.qris
      ? `<button type="button" class="qris-card" id="qrisCard" data-zoom aria-label="Perbesar QRIS"><img id="qrisImg" src="${CONFIG.qris}" alt="QRIS KingNaren Store"><span class="qris-hint"><i data-lucide="search"></i>Klik untuk perbesar</span></button>`
      : `<div class="qris-card is-error is-empty"><i data-lucide="qr-code"></i><p>Gambar QRIS belum dipasang. Isi CONFIG.qris di script.js.</p></div>`;
    return `
      <div class="pay">
        <div class="pay-sum">${sum}<div class="pay-total"><span>Total Pembayaran</span><strong>${rp(payTotal())}</strong></div></div>
        ${qrisBlock}
        <div class="pay-pair">
          <button type="button" class="btn btn-ghost" data-zoom><i data-lucide="zoom-in"></i>Perbesar QRIS</button>
          <a class="btn btn-ghost" href="${CONFIG.qris || '#'}" target="_blank" rel="noopener" download="QRIS-KingNaren-Store.png"><i data-lucide="download"></i>Buka / Simpan QR</a>
        </div>
        <div class="pay-note"><i data-lucide="info"></i><p><b>Cara Pembayaran:</b> Pindai (scan) kode QRIS di atas sesuai dengan <b>Total Pembayaran</b>, lalu simpan bukti transfer untuk dikonfirmasi melalui WhatsApp.</p></div>
        <a class="btn btn-primary" href="${waOrderLink()}" target="_blank" rel="noopener"><i data-lucide="send"></i>Kirim Bukti Transfer &amp; Konfirmasi via WA</a>
        <button type="button" class="btn btn-ghost" data-copy><i data-lucide="copy"></i><span>Salin Rincian Pesanan</span></button>
        ${direct()
          ? '<button type="button" class="pay-back" data-close><i data-lucide="arrow-left"></i>Kembali ke katalog</button>'
          : '<button type="button" class="pay-back" data-view="cart"><i data-lucide="arrow-left"></i>Ubah pesanan</button>'}
        <p class="pay-safe">Selalu jaga kerahasiaan PIN dan kode OTP akun transaksi Anda.</p>
      </div>`;
  };

  const bindQrisImage = () => {
    const img = $('#qrisImg');
    if (!img) return;
    img.addEventListener('error', () => {
      const card = $('#qrisCard');
      if (card) {
        card.className = 'qris-card is-error is-empty';
        card.removeAttribute('data-zoom');
        card.removeAttribute('aria-label');
        card.disabled = true;
        card.innerHTML = '<i data-lucide="triangle-alert"></i><p>Gambar QRIS gagal dimuat. Muat ulang halaman atau hubungi admin lewat WhatsApp.</p>';
      }
      $$('.pay-pair [data-zoom]').forEach((b) => { b.disabled = true; b.removeAttribute('data-zoom'); });
      const dl = $('.pay-pair a');
      if (dl) { dl.removeAttribute('href'); dl.setAttribute('aria-disabled', 'true'); dl.style.opacity = '.45'; dl.style.pointerEvents = 'none'; }
      icons();
    }, { once: true });
  };

  const renderCart = () => {
    const body = $('#cartBody');
    const foot = $('#cartFoot');
    const sub = $('#cartSub');
    const items = direct() ? [byId(state.direct)] : lines();
    foot.hidden = false;
    sub.hidden = true;
    if (!items.length) {
      state.view = 'cart';
      $('#cartTitle').textContent = 'Pesanan';
      body.innerHTML = `<div class="state"><i data-lucide="shopping-bag"></i><p>Pesanan masih kosong.<br>Pilih produk dari katalog dulu.</p></div>`;
      foot.innerHTML = `<button type="button" class="btn btn-primary" data-close data-goto="#katalog"><i data-lucide="layout-grid"></i>Lihat katalog</button>`;
    } else if (state.view === 'pay' || direct()) {
      $('#cartTitle').textContent = 'Pembayaran QRIS';
      sub.textContent = 'Klik gambar QRIS untuk memperbesar (zoom) atau mengunduh.';
      sub.hidden = false;
      body.innerHTML = payView();
      foot.innerHTML = '';
      foot.hidden = true;
      body.scrollTop = 0;
      bindQrisImage();
    } else {
      $('#cartTitle').textContent = 'Pesanan';
      body.innerHTML = items.map((p) => `
        <div class="ci">
          <div><h4>${p.name}</h4><p>${rp(p.price)} x ${qty(p.id)} = ${rp(p.price * qty(p.id))}</p></div>
          <div class="ci-act">${ctl(p.id)}</div>
        </div>`).join('');
      foot.innerHTML = `
        <div class="total"><span>${count()} layanan</span><strong>${rp(total())}</strong></div>
        <button type="button" class="btn btn-primary" data-view="pay"><i data-lucide="qr-code"></i>Lanjut bayar via QRIS</button>
        <button type="button" class="btn btn-ghost" data-clear><i data-lucide="trash-2"></i>Kosongkan pesanan</button>`;
    }
    icons();
  };

  /* ---------- Tampilan penuh QRIS ---------- */
  const zoomEl = $('#zoom');
  let zoomReturn = null;
  const openZoom = () => {
    const img = $('#qrisImg');
    if (!img || !img.complete || !img.naturalWidth) return;
    $('#zoomImg').src = img.currentSrc || img.src;
    zoomReturn = document.activeElement;
    zoomEl.hidden = false;
    zoomEl.focus({ preventScroll: true });
  };
  const closeZoom = () => {
    if (zoomEl.hidden) return;
    zoomEl.hidden = true;
    if (zoomReturn && document.contains(zoomReturn)) zoomReturn.focus({ preventScroll: true });
    zoomReturn = null;
  };

  /* ---------- Buka / tutup sheet ---------- */
  const openSheet = (name) => {
    if (state.sheet) closeSheet(true);
    else state.lastFocus = document.activeElement;
    state.sheet = name;
    if (name === 'cart') { state.view = direct() ? 'pay' : 'cart'; renderCart(); }
    const el = $(`#sheet-${name}`);
    el.inert = false;
    el.classList.add('on');
    $('#scrim').classList.add('on');
    document.body.classList.add('locked');
    const first = $('button, a', el);
    if (first) first.focus({ preventScroll: true });
  };

  const closeSheet = (silent) => {
    if (!state.sheet) return;
    const el = $(`#sheet-${state.sheet}`);
    el.classList.remove('on');
    el.inert = true;
    state.sheet = null;
    if (!silent) {
      state.direct = null;
      $('#scrim').classList.remove('on');
      document.body.classList.remove('locked');
      if (state.lastFocus && document.contains(state.lastFocus)) state.lastFocus.focus({ preventScroll: true });
      state.lastFocus = null;
    }
  };

  const doCopy = async (btn) => {
    const ok = await copyText(orderSummary());
    btn.classList.remove('is-done', 'is-fail');
    btn.classList.add(ok ? 'is-done' : 'is-fail');
    btn.innerHTML = ok
      ? '<i data-lucide="check"></i><span>Tersalin</span>'
      : '<i data-lucide="triangle-alert"></i><span>Gagal menyalin, salin manual</span>';
    icons();
    setTimeout(() => {
      if (!document.contains(btn)) return;
      btn.classList.remove('is-done', 'is-fail');
      btn.innerHTML = '<i data-lucide="copy"></i><span>Salin Rincian Pesanan</span>';
      icons();
    }, 2200);
  };

  /* ---------- Event ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-inc],[data-dec],[data-buy],[data-tab],[data-open],[data-close],[data-view],[data-clear],[data-zoom],[data-copy]');
    if (!t) return;
    const d = t.dataset;
    if (d.inc !== undefined) setQty(+d.inc, qty(+d.inc) + 1);
    else if (d.dec !== undefined) setQty(+d.dec, qty(+d.dec) - 1);
    else if (d.buy !== undefined) { state.direct = +d.buy; openSheet('cart'); }
    else if (d.tab !== undefined) {
      selectCat(d.tab);
      if (t.tagName === 'A') { e.preventDefault(); $('#katalog').scrollIntoView(); }
    }
    else if (d.open !== undefined) { e.preventDefault(); state.direct = null; openSheet(d.open); }
    else if (d.view !== undefined) { state.view = d.view; renderCart(); }
    else if (d.clear !== undefined) { Object.keys(cart).forEach((id) => setQty(+id, 0)); }
    else if (d.zoom !== undefined) openZoom();
    else if (d.copy !== undefined) doCopy(t);
    else if (d.close !== undefined) {
      closeSheet();
      if (d.goto) $(d.goto).scrollIntoView();
    }
  });

  zoomEl.addEventListener('click', closeZoom);
  $('#scrim').addEventListener('click', () => closeSheet());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!zoomEl.hidden) closeZoom(); else closeSheet(); return; }
    if (e.key !== 'Tab') return;
    if (!zoomEl.hidden) { e.preventDefault(); return; }
    if (!state.sheet) return;
    const el = $(`#sheet-${state.sheet}`);
    const f = $$('button:not(:disabled), a[href], input', el).filter((n) => n.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $('#q').addEventListener('input', (e) => {
    state.q = e.target.value;
    $('#tabsWrap').classList.toggle('searching', !!state.q.trim());
    renderList();
  });

  /* ---------- WhatsApp & navigasi aktif ---------- */
  const setupWhatsApp = () => {
    $$('[data-wa]').forEach((el) => {
      el.href = waLink(el.dataset.waMsg || `Halo ${CONFIG.brand}`);
      el.target = '_blank';
      el.rel = 'noopener';
    });
    $$('[data-wa-number]').forEach((num) => { num.textContent = CONFIG.whatsappLabel; });
  };

  const setupActiveNav = () => {
    if (!('IntersectionObserver' in window)) return;
    const map = { beranda: '#beranda', katalog: '#katalog', keunggulan: '#keunggulan', tentang: '#tentang', kontak: '#kontak' };
    const links = $$('.nav a, .dock a');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => (a.getAttribute('href') === map[en.target.id]
        ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    }), { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  };

  /* ---------- Carousel keunggulan ---------- */
  const setupCarousel = () => {
    const car = $('#car');
    if (!car) return;
    const slides = $$('.slide', car);
    const dotsEl = $('#dots');
    const prev = $('#carPrev');
    const next = $('#carNext');

    dotsEl.innerHTML = slides
      .map((_, i) => `<button type="button" class="dot" data-slide="${i}" aria-label="Keunggulan ${i + 1}"></button>`)
      .join('');
    const dots = $$('.dot', dotsEl);

    const padL = () => parseFloat(getComputedStyle(car).paddingLeft) || 0;
    const atEnd = () => car.scrollLeft + car.clientWidth >= car.scrollWidth - 4;
    const current = () => {
      if (atEnd()) return slides.length - 1;
      const x = car.scrollLeft + padL();
      let best = 0;
      let dist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - x);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    };
    const go = (i) => {
      const n = Math.max(0, Math.min(slides.length - 1, i));
      car.scrollTo({ left: slides[n].offsetLeft - padL(), behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const update = () => {
      const i = current();
      dots.forEach((d, n) => (n === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      prev.disabled = car.scrollLeft <= 2;
      next.disabled = atEnd();
    };

    let tick = 0;
    car.addEventListener('scroll', () => {
      if (tick) return;
      tick = requestAnimationFrame(() => { tick = 0; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    dotsEl.addEventListener('click', (e) => {
      const d = e.target.closest('[data-slide]');
      if (d) go(+d.dataset.slide);
    });
    update();
  };

  /* ---------- Motion: reveal saat scroll, count-up, progress ---------- */
  const setupMotion = () => {
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
      : null;
    $$('.section-head, .eyebrow, .how, .search, .car, .car-ctrl, .about-lead, .about-index, .about-dev, .footer .container > *').forEach((el) => {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min([...el.parentElement.children].indexOf(el), 5));
      if (io) io.observe(el); else el.classList.add('in');
    });

    $$('[data-count]').forEach((el) => {
      const n = +el.dataset.count;
      if (reduceMotion) { el.textContent = n; return; }
      const t0 = performance.now() + 800;
      const tick = (t) => {
        const p = Math.min(Math.max((t - t0) / 1500, 0), 1);
        el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    const bar = $('#progress');
    let busy = false;
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(scrollY / h, 1) : 0})`;
      busy = false;
    };
    addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(upd); } }, { passive: true });
  };

  /* ---------- Init ---------- */
  renderTabs();
  renderList();
  syncBadge(false);
  setupWhatsApp();
  setupActiveNav();
  setupCarousel();
  $('#count').textContent = ITEMS.length;
  $('#statProduk').dataset.count = ITEMS.length;
  setupMotion();
  $('#year').textContent = new Date().getFullYear();
  icons();
})();
