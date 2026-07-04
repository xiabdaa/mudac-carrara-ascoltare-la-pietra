import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "src/ExhibitionPage.jsx"), "utf8");
const sculpture = readFileSync(resolve(root, "src/GreekSculpture.jsx"), "utf8");
const styles = readFileSync(resolve(root, "src/styles.css"), "utf8");

const requiredAssets = [
  "public/plans/mudac-ground-plan-simple.jpg",
  "public/plans/mudac-first-plan-simple.jpg",
  ...Array.from({ length: 11 }, (_, index) =>
    `public/artworks/ground-${String(index + 1).padStart(2, "0")}.png`
  ),
  ...Array.from({ length: 7 }, (_, index) =>
    `public/artworks/first-${String(index + 1).padStart(2, "0")}.png`
  ),
  "public/artworks/first-06-detail.png",
  "public/models/lattice_in_stone.glb"
];

for (const asset of requiredAssets) {
  if (!existsSync(resolve(root, asset))) {
    throw new Error(`Missing exhibition asset: ${asset}`);
  }
}

const groundIds = page.match(/id: "g\d+"/g) ?? [];
const firstIds = page.match(/id: "f\d+"/g) ?? [];

if (groundIds.length !== 11) {
  throw new Error(`Expected 11 ground-floor works, found ${groundIds.length}`);
}

if (firstIds.length !== 7) {
  throw new Error(`Expected 7 first-floor works, found ${firstIds.length}`);
}

if (
  !page.includes("work.images") ||
  !page.includes("floor-plan-image--") ||
  !page.includes("WorkDetailModal") ||
  !page.includes("work-detail-modal")
) {
  throw new Error("Exhibition page is not using the new artwork and floor-plan image data");
}

if (page.includes("year:") || page.includes("work.year")) {
  throw new Error("Exhibition page still contains artwork year data");
}

if (!sculpture.includes("models/lattice_in_stone.glb")) {
  throw new Error("Landing scene is not using the supplied lattice sculpture model");
}

if (!/id: "f7"[\s\S]*?x: 50,[\s\S]*?y: 64\.5,/.test(page)) {
  throw new Error("First-floor marker 7 is not centered on the lower edge of the central rectangle");
}

for (const [id, x] of [
  ["f3", 38],
  ["f4", 56],
  ["f5", 74],
  ["f6", 92]
]) {
  if (!new RegExp(`id: "${id}"[\\s\\S]*?x: ${x},[\\s\\S]*?y: 85\\.`).test(page)) {
    throw new Error(`First-floor marker ${id} is not evenly distributed along the lower gallery`);
  }
}

if (!/\.work-detail-panel\s*\{[\s\S]*?border-radius: 22px;/.test(styles)) {
  throw new Error("Artwork detail panel does not use the approved rounded corners");
}

if (!/\.map-marker\s*\{[^}]*width: clamp\(22px, 1\.8vw, 26px\);[^}]*height: clamp\(22px, 1\.8vw, 26px\);/.test(styles)) {
  throw new Error("Map markers are not using the approved compact desktop size");
}

if (
  !page.includes("preloadPlanImage(planImages.ground)") ||
  !page.includes("preloadPlanImage(planImages.first)") ||
  !page.includes("await preloadPlanImage(planImages[key])") ||
  !page.includes("onError={handleError}")
) {
  throw new Error("Floor plans are not preloaded, decoded and retried before floor transitions");
}

if (!/\.map-shell\s*\{[^}]*width: 100%;/.test(styles)) {
  throw new Error("Map shell can collapse to zero width in desktop Chrome");
}

if (
  !styles.includes(
    ".map-board {\n    width: min(100%, clamp(330px, 44vh, 410px));\n    height: auto;"
  )
) {
  throw new Error("Desktop map can exceed the available panel height and be clipped");
}

if (
  !styles.includes(
    "grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.85fr);"
  ) ||
  !/\.work-detail-copy h2\s*\{[^}]*overflow-wrap: anywhere;/.test(styles)
) {
  throw new Error("Artwork detail titles can overflow the desktop information column");
}

if (
  !styles.includes("width: min(100%, 380px);") ||
  !styles.includes("height: min(88dvh, 680px);") ||
  !styles.includes("grid-template-rows: minmax(220px, 44dvh) auto;") ||
  !styles.includes("padding: 52px 12px 12px;")
) {
  throw new Error("Mobile artwork detail panel is not using the approved compact layout");
}

if (
  !page.includes('aria-label="Close artwork details"') ||
  !page.includes('<span aria-hidden="true">×</span>')
) {
  throw new Error("Artwork detail panel is not using the compact X close control");
}

if (page.includes("Conceived and developed by Taissiya Shaidarova")) {
  throw new Error("The removed curatorial team credit is still present");
}

console.log("Exhibition content validation passed");
