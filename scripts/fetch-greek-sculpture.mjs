import { createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { get } from "node:https";

const files = [
  [
    "public/models/greek_sculpture/marble_bust_01_1k.gltf",
    "https://dl.polyhaven.org/file/ph-assets/Models/gltf/1k/marble_bust_01/marble_bust_01_1k.gltf"
  ],
  [
    "public/models/greek_sculpture/marble_bust_01.bin",
    "https://dl.polyhaven.org/file/ph-assets/Models/gltf/8k/marble_bust_01/marble_bust_01.bin"
  ],
  [
    "public/models/greek_sculpture/textures/marble_bust_01_diff_1k.jpg",
    "https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/marble_bust_01/marble_bust_01_diff_1k.jpg"
  ],
  [
    "public/models/greek_sculpture/textures/marble_bust_01_nor_gl_1k.jpg",
    "https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/marble_bust_01/marble_bust_01_nor_gl_1k.jpg"
  ],
  [
    "public/models/greek_sculpture/textures/marble_bust_01_rough_1k.jpg",
    "https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/marble_bust_01/marble_bust_01_rough_1k.jpg"
  ]
];

async function exists(path) {
  try {
    const info = await stat(path);
    return info.size > 0;
  } catch {
    return false;
  }
}

function download(url, destination) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { "User-Agent": "MUDAC-Carrara-GitHub-Pages-build" } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, destination).then(resolve, reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      pipeline(response, createWriteStream(destination)).then(resolve, reject);
    }).on("error", reject);
  });
}

for (const [path, url] of files) {
  if (await exists(path)) continue;
  await mkdir(dirname(path), { recursive: true });
  await download(url, path);
  console.log(`Downloaded ${join(process.cwd(), path)}`);
}
