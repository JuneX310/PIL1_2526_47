/**
 * IFRI_MentorLink – Dashboard JS
 * Données statiques fictives + interactions UI
 */

/* ══════════════════════════════════════════
   DONNÉES STATIQUES
══════════════════════════════════════════ */
const USER = {
  prenom: "Kofi",
  nom: "ADJOVI",
  role: "Étudiant",
  avatar: null, // on utilisera les initiales
};

const STATS = [
  { label: "Matchs", value: 12, icon: "🎯", color: "blue", trend: "+3 ce mois" },
  { label: "Sessions", value: 4, icon: "📅", color: "green", trend: "2 à venir" },
  { label: "Messages", value: 28, icon: "💬", color: "amber", trend: "5 non lus" },
];

const MATCHES = [
  {
    nom: "Dr. Arnaud SOSSOU",
    specialite: "Architecture Logicielle & Big Data",
    tags: ["Java", "Cloud Computing", "Docker"],
    score: 98,
    img: "../static/assets/mentor_arnaud.png",
  },
  {
    nom: "Mlle. Flora BIO",
    specialite: "Développement Web Fullstack",
    tags: ["React", "Node.js", "UX/UI"],
    score: 85,
    img: "../static/assets/mentor_flora.png",
  },
  {
    nom: "M. Samuel GLO",
    specialite: "Sécurité des Systèmes",
    tags: ["Pentesting", "Network", "Linux"],
    score: 72,
    img: null,
    initiales: "SG",
    couleur: "linear-gradient(135deg,#0F766E,#0D9488)",
  },
];

const ACTIVITES = [
  {
    type: "msg",
    icon: "💬",
    titre: "Nouveau message de Dr. Arnaud SOSSOU",
    desc: '"Bonjour Kofi, j\'ai bien reçu ton projet. Discutons-en demain…"',
    temps: "Il y a 2 heures",
    lu: false,
  },
  {
    type: "cal",
    icon: "📅",
    titre: "Session confirmée",
    desc: "Votre session avec Flora BIO est prévue pour le 15 Octobre à 14h.",
    temps: "Hier, 18:45",
    lu: true,
  },
  {
    type: "person",
    icon: "👤",
    titre: "Nouvelle suggestion",
    desc: "Un nouveau mentor correspondant à vos critères vient de nous rejoindre.",
    temps: "Il y a 2 jours",
    lu: true,
  },
];

const RDV = {
  titre: "Session de Mentorat : Algorithmique",
  heure: "16:00 - 17:00",
  label: "AUJOURD'HUI",
  mentor: "Arnaud SOSSOU",
  role: "Mentor · Architecte Logiciel",
  img: "../static/assets/mentor_arnaud.png",
  heureDebut: { h: 16, m: 0 },
};

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function scoreClass(s) {
  if (s >= 90) return "high";
  if (s >= 75) return "medium";
  return "low";
}

function scoreLabel(s) {
  if (s >= 90) return "⚡";
  if (s >= 75) return "🔥";
  return "✨";
}

function getInitials(name) {
  return name.split(" ").filter(w => /^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝ]/i.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

/* ══════════════════════════════════════════
   RENDER — STATS
══════════════════════════════════════════ */
function renderStats() {
  const container = document.getElementById("stats-grid");
  if (!container) return;

  container.innerHTML = STATS.map((s, i) => `
    <div class="stat-card fade-up fade-up-${i + 2}">
      <div class="stat-icon ${s.color}">
        <span style="font-size:22px">${s.icon}</span>
      </div>
      <div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-value" data-target="${s.value}">0</div>
        <div class="stat-trend">▲ ${s.trend}</div>
      </div>
    </div>
  `).join("");

  // Animate counters
  document.querySelectorAll(".stat-value[data-target]").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = String(current).padStart(2, "0");
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

/* ══════════════════════════════════════════
   RENDER — MATCHES
══════════════════════════════════════════ */
function renderMatches() {
  const container = document.getElementById("matches-grid");
  if (!container) return;

  container.innerHTML = MATCHES.map((m, i) => {
    const sc = scoreClass(m.score);
    const hasImg = m.img && m.img !== null;
    const avatarHtml = hasImg
      ? `<img src="${m.img}" alt="${m.nom}" class="match-avatar" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <div class="match-avatar-placeholder" style="display:none;background:linear-gradient(135deg,#3B82F6,#1E40AF)">${getInitials(m.nom)}</div>`
      : `<div class="match-avatar-placeholder" style="background:${m.couleur || 'linear-gradient(135deg,#3B82F6,#1E40AF)'}">${m.initiales || getInitials(m.nom)}</div>`;

    return `
      <div class="match-card fade-up fade-up-${i + 2}">
        <div class="match-card-header">
          <div style="display:flex;align-items:center;gap:.75rem">
            ${avatarHtml}
          </div>
          <span class="score-badge ${sc}">${scoreLabel(m.score)} ${m.score}% Match</span>
        </div>
        <div>
          <div class="match-name">${m.nom}</div>
          <div class="match-specialty">${m.specialite}</div>
        </div>
        <div class="tags">
          ${m.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="compat-bar-wrapper">
          <div class="compat-label">
            <span>Compatibilité</span>
            <span style="font-weight:700;color:var(--text-main)">${m.score}%</span>
          </div>
          <div class="compat-bar">
            <div class="compat-fill" style="width:0%" data-width="${m.score}%"></div>
          </div>
        </div>
        <button class="btn-profile" onclick="voirProfil('${m.nom}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Voir le profil
        </button>
      </div>
    `;
  }).join("");

  // Animate progress bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".compat-fill[data-width]").forEach(el => {
        el.style.width = el.dataset.width;
      });
    }, 400);
  });
}

/* ══════════════════════════════════════════
   RENDER — ACTIVITES
══════════════════════════════════════════ */
function renderActivites() {
  const container = document.getElementById("activity-list");
  if (!container) return;

  container.innerHTML = ACTIVITES.map(a => `
    <li class="activity-item">
      <div class="activity-icon-wrap ${a.type}">
        <span>${a.icon}</span>
      </div>
      <div class="activity-content">
        <div class="activity-title">${a.titre}</div>
        <div class="activity-desc">${a.desc}</div>
        <div class="activity-time">${a.temps}</div>
      </div>
      <div class="activity-dot ${a.lu ? 'read' : ''} pulse-dot"></div>
    </li>
  `).join("");
}

/* ══════════════════════════════════════════
   RENDER — RDV
══════════════════════════════════════════ */
function renderRDV() {
  const container = document.getElementById("rdv-card");
  if (!container) return;

  const mentorAvatar = `
    <img src="${RDV.img}" alt="${RDV.mentor}" class="rdv-mentor-avatar"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="rdv-mentor-avatar-placeholder" style="display:none">${getInitials(RDV.mentor)}</div>
  `;

  container.innerHTML = `
    <div class="rdv-header">
      <div class="rdv-title">Prochain RDV</div>
      <button class="rdv-add-btn" title="Planifier un RDV" onclick="planifierRDV()">＋</button>
    </div>
    <div>
      <div class="rdv-time-label">${RDV.label}</div>
      <div class="rdv-time">${RDV.heure}</div>
      <div class="rdv-event-title">${RDV.titre}</div>
    </div>
    <div class="rdv-mentor">
      ${mentorAvatar}
      <div>
        <div class="rdv-mentor-name">${RDV.mentor}</div>
        <div class="rdv-mentor-role">${RDV.role}</div>
      </div>
    </div>
    <div class="rdv-countdown" id="rdv-countdown">
      <div class="rdv-countdown-block"><div class="rdv-countdown-num" id="cd-h">00</div><div class="rdv-countdown-lbl">Heures</div></div>
      <div class="rdv-countdown-block"><div class="rdv-countdown-num" id="cd-m">00</div><div class="rdv-countdown-lbl">Min</div></div>
      <div class="rdv-countdown-block"><div class="rdv-countdown-num" id="cd-s">00</div><div class="rdv-countdown-lbl">Sec</div></div>
    </div>
    <button class="btn-join" onclick="rejoindreAppel()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      Rejoindre l'appel
    </button>
  `;

  startCountdown();
}

/* ══════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════ */
function startCountdown() {
  function tick() {
    const now = new Date();
    const rdv = new Date();
    rdv.setHours(RDV.heureDebut.h, RDV.heureDebut.m, 0, 0);
    if (rdv < now) rdv.setDate(rdv.getDate() + 1);

    const diff = Math.max(0, Math.floor((rdv - now) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    const pad = n => String(n).padStart(2, "0");
    const elH = document.getElementById("cd-h");
    const elM = document.getElementById("cd-m");
    const elS = document.getElementById("cd-s");
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

/* ══════════════════════════════════════════
   DATE DYNAMIQUE
══════════════════════════════════════════ */
function updateDate() {
  const el = document.getElementById("hero-date");
  if (!el) return;
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  el.textContent = new Date().toLocaleDateString("fr-FR", opts);
}

/* ══════════════════════════════════════════
   NOTIFICATIONS DEMO
══════════════════════════════════════════ */
function toggleNotif() {
  const toast = document.getElementById("notif-toast");
  if (!toast) return;
  toast.classList.toggle("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ══════════════════════════════════════════
   ACTIONS
══════════════════════════════════════════ */
function voirProfil(nom) {
  showToast(`📋 Profil de ${nom} — fonctionnalité bientôt disponible !`, "info");
}

function planifierRDV() {
  showToast("📅 Planification de RDV — disponible après connexion Django !", "info");
}

function rejoindreAppel() {
  showToast("🎥 Connexion à l'appel en cours…", "success");
}

/* ══════════════════════════════════════════
   TOAST SYSTEM
══════════════════════════════════════════ */
function showToast(message, type = "info") {
  const colors = {
    info: { bg: "#1E40AF", icon: "ℹ️" },
    success: { bg: "#065F46", icon: "✅" },
    warn: { bg: "#92400E", icon: "⚠️" },
  };
  const { bg, icon } = colors[type] || colors.info;

  const toast = document.createElement("div");
  toast.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:${bg}; color:#fff; padding:.85rem 1.25rem;
    border-radius:12px; font-size:.84rem; font-weight:500;
    box-shadow:0 8px 32px rgba(0,0,0,.25);
    display:flex; align-items:center; gap:.6rem;
    animation:fadeInUp .3s ease;
    max-width:340px;
  `;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transform = "translateY(10px)"; toast.style.transition = ".3s"; setTimeout(() => toast.remove(), 300); }, 3200);
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  updateDate();
  renderStats();
  renderMatches();
  renderActivites();
  renderRDV();

  // Notif button
  const notifBtn = document.getElementById("notif-btn");
  if (notifBtn) notifBtn.addEventListener("click", toggleNotif);
});
