import { writeFile } from "node:fs/promises";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    });
  }

  readAsDataURL(blob) {
    blob.arrayBuffer().then((buffer) => {
      const base64 = Buffer.from(buffer).toString("base64");
      this.result = `data:${blob.type || "application/octet-stream"};base64,${base64}`;
      this.onloadend?.();
    });
  }
};

const scene = new THREE.Scene();
const geometry = new RoundedBoxGeometry(3.65, 1.35, 0.46, 18, 0.055);
const material = new THREE.MeshStandardMaterial({
  color: "#f2efe7",
  roughness: 0.72,
  metalness: 0
});

const slab = new THREE.Mesh(geometry, material);
slab.name = "marble_slab_placeholder";
scene.add(slab);

const exporter = new GLTFExporter();
const arrayBuffer = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true
});

await writeFile(new URL("../public/models/marble_slab.glb", import.meta.url), Buffer.from(arrayBuffer));
