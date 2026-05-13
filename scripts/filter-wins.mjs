// One-off filter: scan a Telegram chat export and pick win-related CHAT SCREENSHOTS.
//
// Pipeline:
//   1. Photo must look like a phone chat screenshot — tall portrait.
//   2. Caption (own or adjacent same-author within 5 min) must mention a win
//      signal: money, earned/paid/commission, landed/hired, closed deal, win headers.
//   3. Obvious promo/event captions are still excluded.
//
// Captions are NOT used for display — every entry gets a placeholder caption.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const EXPORT_DIR = process.argv[2];
if (!EXPORT_DIR) {
  console.error("usage: node filter-wins.mjs <ChatExport directory>");
  process.exit(1);
}

const jsonPath = path.join(EXPORT_DIR, "result.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

function flattenText(text) {
  if (!text) return "";
  if (typeof text === "string") return text;
  if (Array.isArray(text)) {
    return text
      .map((seg) => (typeof seg === "string" ? seg : seg.text ?? ""))
      .join("");
  }
  return "";
}

// === STAGE 1: Chat screenshot detection ===
// Phone screenshots of chats are tall portrait: height >> width.
// Heuristic: height >= 1.4 * width AND height >= 800px.
function isChatScreenshot(m) {
  const w = Number(m.width);
  const h = Number(m.height);
  if (!w || !h) return false;
  return h >= 1.3 * w && h >= 700;
}

// === STAGE 2: Win signal (loose — money mention OR win-language is enough) ===
const moneyRe = new RegExp(
  [
    "\\$\\s?\\d",                                      // $X, $5k, $1,200
    "£\\s?\\d",                                        // £X
    "€\\s?\\d",                                        // €X
    "\\b\\d{1,3}(\\.\\d+)?\\s?k\\b",                   // 5k, 1.5k
    "\\b\\d{2,5}\\s?(usd|USD|gbp|GBP|eur|EUR|dollars|pounds|euros|p/m|per month|/month|monthly)\\b",
    "\\b\\d+\\s?figure(s)?\\b",                        // 4 figure, 5 figures
  ].join("|")
);

const winLangRe = new RegExp(
  [
    "earn(ed|ings|ing)?",
    "collect(ed|ing)?",
    "cash[- ]?collected",
    "commission",
    "paycheck",
    "payout",
    "paid in full",
    "got paid",
    "received (a |the )?(payment|commission|payout|paycheck)",
    "lands?\\s+(a|an|the|my|his|another)?\\s*(role|client|gig|offer|deal|setter|closer|sales)",
    "landed\\s+(a|an|the|my|his|another)?\\s*(role|client|gig|offer|deal|setter|closer|sales)",
    "got hired",
    "just hired",
    "hired me",
    "hired as",
    "got the (role|job)",
    "new (role|setter role|closer role|client|gig|deal)",
    "first (role|client|deal|commission|paycheck|setter|closer|gig)",
    "secured (a|an|the|my|his)?\\s*(role|client|offer|gig|deal)",
    "signed (a|an|the|my|his)?\\s*(client|deal)",
    "closed (a|an|the|my|his|up|another)?\\s*(deal|client|appointment|sale|customer)?",
    "deal closed",
    "appointment that closed",
    "closer role",
    "setter role",
    "appointment setter role",
    "community wins?",
    "wins? today",
    "wins? of the (day|week)",
    "win season",
    "(two|three|four|five|six) wins today",
    "big win",
    "huge win",
    "massive win",
    "new win",
    "wins? update",
    "recent wins",
    "OTE",
    "on target earnings",
  ].join("|"),
  "i"
);

// === EXCLUSIONS (only obvious promo/event posts) ===
const EXCLUDE = [
  /\bwebinar\b/i,
  /\bregistration\b/i,
  /\bsign up\b/i,
  /\blive event\b/i,
  /\bfree training\b/i,
  /\bfree course\b/i,
  /\bfree roadmap\b/i,
  /\blimited time offer\b/i,
  /\bi['’]?ve started posting\b/i,
  /\bsoon a new video\b/i,
  /\bnew video will come out\b/i,
  /\bplanning to release\b/i,
  /\bplanning to bring\b/i,
  /\bi (just )?spent\b/i,
  /\bspent \$/i,
  /\bturned down\b/i,
  /\bi (just )?bought\b/i,
  /\bamazon\b/i,
  /\bordered\b/i,
  /\bdelivered\b/i,
  /\bpackage arrived\b/i,
  /\bmy iphone\b/i,
  /\bmy phone\b/i,
  /\bnew phone\b/i,
  /\bsamsung\b/i,
  /\bproduct (review|photo|shot)/i,
];

function isExcluded(text) {
  return EXCLUDE.some((re) => re.test(text));
}

function hasWinSignal(text) {
  if (!text) return false;
  return moneyRe.test(text) || winLangRe.test(text);
}

const photoMessages = data.messages.filter(
  (m) => m && m.type === "message" && typeof m.photo === "string"
);
const allMsgs = data.messages;

function captionFor(m) {
  const own = flattenText(m.text).trim();
  if (own) return own;
  const pos = allMsgs.indexOf(m);
  const ts = Number(m.date_unixtime);
  for (const delta of [1, -1, 2, -2, 3, -3]) {
    const neighbor = allMsgs[pos + delta];
    if (!neighbor) continue;
    if (neighbor.from_id !== m.from_id) continue;
    const nts = Number(neighbor.date_unixtime);
    if (Math.abs(nts - ts) > 300) continue;
    const txt = flattenText(neighbor.text).trim();
    if (txt) return txt;
  }
  return "";
}

// Names already showcased in the homepage testimonials grid — skip wins that
// mention any of them so the wins gallery doesn't duplicate them.
const BANNED_NAMES =
  /\b(aqib|aqic|melih|aeman|muntasir|hossam|hosaam|hosam|shehab|afdhal|abid|hussein|coo)\b/i;

// Pixel-level chat-screenshot detection: chat screenshots are dominated by
// flat backgrounds (white, dark, grayscale, bubble blue/green) with very few
// skin-tone pixels. Real-life portraits invert these ratios.
async function isChatByPixels(filepath) {
  try {
    const { data, info } = await sharp(filepath)
      .resize(64, 64, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const c = info.channels;
    let total = 0;
    let flat = 0;
    let skin = 0;
    let offPaletteSaturated = 0;
    // Track which 30° hue buckets the saturated pixels fall into. Chat bubbles
    // cluster in 1 hue; Google logos / branded UIs / colorful searches span 3+.
    const hueBuckets = new Set();
    for (let i = 0; i < data.length; i += c) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      total++;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const chroma = max - min;
      const isLight = min >= 215;
      const isDark = max <= 45;
      const isGray = chroma <= 10;
      const isBubbleBlue = r < 90 && g < 170 && b > 200;
      const isBubbleGreen = r < 90 && g > 180 && b < 130;
      const isTelegramBlue = r < 120 && g > 130 && b > 200;
      const isBubble = isBubbleBlue || isBubbleGreen || isTelegramBlue;
      if (isLight || isDark || isGray || isBubble) {
        flat++;
      }
      if (chroma > 55 && !isBubble) {
        offPaletteSaturated++;
      }
      // Hue diversity tracking — only strongly saturated pixels.
      if (chroma >= 70) {
        let h;
        if (max === r) h = ((g - b) / chroma) % 6;
        else if (max === g) h = (b - r) / chroma + 2;
        else h = (r - g) / chroma + 4;
        h *= 60;
        if (h < 0) h += 360;
        hueBuckets.add(Math.floor(h / 30));
      }
      if (
        r > 95 &&
        g > 40 &&
        b > 20 &&
        r > g &&
        g > b &&
        r - g > 10 &&
        r - b > 15 &&
        r - b < 140
      ) {
        skin++;
      }
    }
    const flatRatio = flat / total;
    const skinRatio = skin / total;
    const offPaletteRatio = offPaletteSaturated / total;
    // Chat: heavy flat regions, almost no skin, no off-palette color blocks,
    // saturated pixels confined to ≤2 hue buckets (single bubble accent color).
    return (
      flatRatio >= 0.6 &&
      skinRatio <= 0.04 &&
      offPaletteRatio <= 0.06 &&
      hueBuckets.size <= 3
    );
  } catch {
    return false;
  }
}

const MAX_WINS = 200;

const wins = [];
const dropped = {
  not_chat: 0,
  no_signal: 0,
  excluded: 0,
  banned_name: 0,
  missing_file: 0,
  real_life: 0,
};

void hasWinSignal;

for (const m of photoMessages) {
  if (!isChatScreenshot(m)) {
    dropped.not_chat++;
    continue;
  }
  const caption = captionFor(m);
  if (isExcluded(caption)) {
    dropped.excluded++;
    continue;
  }
  if (BANNED_NAMES.test(caption)) {
    dropped.banned_name++;
    continue;
  }
  const filepath = path.join(EXPORT_DIR, m.photo);
  if (!fs.existsSync(filepath)) {
    dropped.missing_file++;
    continue;
  }
  // Pixel content check — drops portraits/selfies that happen to be tall.
  const isChat = await isChatByPixels(filepath);
  if (!isChat) {
    dropped.real_life++;
    continue;
  }
  wins.push({
    photo: m.photo,
    width: m.width,
    height: m.height,
    date: m.date,
    unix: Number(m.date_unixtime),
  });
}

// Dedupe by photo path (first occurrence wins).
const seen = new Set();
const uniqueWins = wins.filter((w) => (seen.has(w.photo) ? false : (seen.add(w.photo), true)));

// Sort most recent first.
uniqueWins.sort((a, b) => b.unix - a.unix);

// Cap at MAX_WINS.
const finalWins = uniqueWins.slice(0, MAX_WINS);

console.log(
  JSON.stringify(
    {
      total_photo_messages: photoMessages.length,
      candidates_before_cap: uniqueWins.length,
      final_wins: finalWins.length,
      dropped,
    },
    null,
    2
  )
);

fs.writeFileSync(path.join(EXPORT_DIR, "wins.json"), JSON.stringify(finalWins, null, 2));
console.log(`\nWrote ${finalWins.length} chat-screenshot wins to wins.json (newest first)`);
