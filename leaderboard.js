// === Leaderboard – Local Storage ===
const LB_BASE_KEY = 'snake.leaderboard';
const PN_STORAGE_KEY = 'snake.playerName';
const LB_MAX_ENTRIES = 10;

// === Name helpers ===
export function sanitizeName(raw) {
  if (!raw) return 'Anonymous';
  const s = String(raw).trim().replace(/\s+/g, ' ');
  // limite raisonnable 2–15 chars, lettres/chiffres/espaces/accents/-
  let cleaned = s.replace(/[^0-9A-Za-zÀ-ÖØ-öø-ÿ \-]/g, '');
  if (cleaned.length < 2) cleaned = 'Anonymous';
  return cleaned.slice(0, 15);
}

export function getPlayerName() {
    try {
      return localStorage.getItem(PN_STORAGE_KEY) || '';
    } catch (_) {
      return '';
    }
}
  
export function setPlayerName(name) {
try {
    localStorage.setItem(PN_STORAGE_KEY, sanitizeName(name));
} catch (_) {
    // silencieux
}
}

// === Leaderboard helpers ===
export function lbKey(stepMs) {
    return `${LB_BASE_KEY}.${stepMs ?? 'default'}`;
}

export function loadLeaderboardFor(stepMs) {
  try {
    const raw = localStorage.getItem(lbKey(stepMs));
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export function saveLeaderboardFor(stepMs, list) {
  localStorage.setItem(lbKey(stepMs), JSON.stringify(list));
}

export function addScoreForSpeed({ name, score, stepMs, createdAt }) {
  const list = loadLeaderboardFor(stepMs);
  list.push({ name, score, createdAt });
  // Sort by score desc then date asc
  list.sort((a, b) => (b.score - a.score) || (a.createdAt - b.createdAt));
  // Keep Top N
  const trimmed = list.slice(0, LB_MAX_ENTRIES);
  saveLeaderboardFor(stepMs, trimmed);
  return trimmed;
}

export function clearLeaderboardFor(stepMs) {
    saveLeaderboardFor(stepMs,[]);
}

export function formatDate(ts) {
  try {
    const d = new Date(ts);
    // Europe/Paris → format FR short
    return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
  } catch (_) {
    return '';
  }
}