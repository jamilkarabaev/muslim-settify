// Copy filtered win photos into public/wins/ and regenerate the
// success-pictures.ts data file used by the homepage and /moresuccess page.
//
// Captions are uniformly "This is a placeholder caption" per current spec.

import fs from "node:fs";
import path from "node:path";

const PLACEHOLDER_CAPTION = "This is a placeholder caption";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const EXPORT_DIR = process.argv[2];
if (!EXPORT_DIR) {
  console.error("usage: node copy-wins.mjs <ChatExport directory>");
  process.exit(1);
}

const wins = JSON.parse(
  fs.readFileSync(path.join(EXPORT_DIR, "wins.json"), "utf8")
);

const outDir = path.join(REPO_ROOT, "public", "wins");
// Wipe and recreate so a re-run reflects exactly the current filter output.
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const entries = [];
for (const win of wins) {
  const srcPath = path.join(EXPORT_DIR, win.photo);
  if (!fs.existsSync(srcPath)) {
    console.warn(`MISSING: ${srcPath}`);
    continue;
  }
  const filename = path.basename(win.photo);
  const destPath = path.join(outDir, filename);
  fs.copyFileSync(srcPath, destPath);
  entries.push({
    src: `/wins/${filename}`,
    caption: PLACEHOLDER_CAPTION,
  });
}

const dataFile = path.join(REPO_ROOT, "data", "success-pictures.ts");
const tsBody = `export type SuccessPicture = {
  src: string;
  caption: string;
};

export const HOMEPAGE_PICTURE_LIMIT = 150;

export const successPictures: SuccessPicture[] = ${JSON.stringify(entries, null, 2)};
`;
fs.writeFileSync(dataFile, tsBody);

console.log(`Copied ${entries.length} win photos to public/wins/`);
console.log(`Regenerated ${path.relative(REPO_ROOT, dataFile)}`);
