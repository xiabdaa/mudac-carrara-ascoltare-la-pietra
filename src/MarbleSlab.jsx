import { Html, RoundedBox, useGLTF } from "@react-three/drei";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_URL = `${import.meta.env.BASE_URL}models/marble_slab.glb`;

function createStoneTexture(kind = "albedo") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (kind === "roughness") {
    base.addColorStop(0, "#d8d6d0");
    base.addColorStop(0.5, "#b9b7b1");
    base.addColorStop(1, "#efede8");
  } else if (kind === "normal") {
    base.addColorStop(0, "#7d7f86");
    base.addColorStop(1, "#858890");
  } else {
    base.addColorStop(0, "#f4f1e9");
    base.addColorStop(0.5, "#d8d3c8");
    base.addColorStop(1, "#fffdf8");
  }
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const veinCount = kind === "normal" ? 70 : 46;
  for (let i = 0; i < veinCount; i += 1) {
    const y = Math.random() * canvas.height;
    const x = -120 + Math.random() * 180;
    const thickness = kind === "normal" ? 1 + Math.random() * 2 : 1 + Math.random() * 5;
    const alpha = kind === "roughness" ? 0.11 : kind === "normal" ? 0.1 : 0.16;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      canvas.width * 0.28,
      y - 90 + Math.random() * 180,
      canvas.width * 0.64,
      y - 120 + Math.random() * 240,
      canvas.width + 140,
      y - 70 + Math.random() * 140
    );
    ctx.strokeStyle =
      kind === "normal"
        ? `rgba(150, 153, 160, ${alpha})`
        : `rgba(81, 78, 72, ${alpha})`;
    ctx.lineWidth = thickness;
    ctx.stroke();
  }

  for (let i = 0; i < 7600; i += 1) {
    const value = kind === "normal" ? 120 + Math.random() * 24 : 225 + Math.random() * 28;
    ctx.fillStyle =
      kind === "roughness"
        ? `rgba(${value - 50}, ${value - 50}, ${value - 50}, 0.055)`
        : `rgba(${value}, ${value}, ${value}, 0.045)`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = kind === "albedo" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.7, 1.05);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function useMarbleMaterial() {
  return useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: "#f2efe7",
      map: createStoneTexture("albedo"),
      roughnessMap: createStoneTexture("roughness"),
      normalMap: createStoneTexture("normal"),
      normalScale: new THREE.Vector2(0.13, 0.08),
      roughness: 0.72,
      metalness: 0,
      clearcoat: 0.08,
      clearcoatRoughness: 0.85,
      sheen: 0.12,
      sheenRoughness: 0.9
    });

    material.envMapIntensity = 0.65;
    return material;
  }, []);
}

function useModelAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(MODEL_URL, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}

function LoadedMarbleModel({ material }) {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = material;
      }
    });
    return clone;
  }, [scene, material]);

  return <primitive object={model} scale={1.15} />;
}

function PlaceholderSlab({ material }) {
  return (
    <RoundedBox args={[3.65, 1.35, 0.46]} radius={0.055} smoothness={18} castShadow receiveShadow>
      <primitive object={material} attach="material" />
    </RoundedBox>
  );
}

function SlabLabel({ onEnter }) {
  return (
    <Html
      transform
      center
      distanceFactor={3}
      position={[0, 0.02, 0.31]}
      rotation={[0, 0, 0]}
      wrapperClass="slab-html"
    >
      <button className="slab-text" type="button" onClick={onEnter}>
        <span>MUDAC Carrara</span>
        <strong role="heading" aria-level="1">ASCOLTARE LA PIETRA</strong>
        <em>Click the marble to enter</em>
      </button>
    </Html>
  );
}

const MarbleSlab = forwardRef(function MarbleSlab({ isEntering, onEnter }, ref) {
  const material = useMarbleMaterial();
  const hasModel = useModelAvailable();
  const { size } = useThree();
  const responsiveScale = size.width < 520 ? 0.68 : size.width < 840 ? 0.82 : 1;

  useFrame(({ clock }) => {
    if (!ref.current || isEntering) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.62) * 0.055;
    ref.current.rotation.x = -0.08 + Math.sin(t * 0.35) * 0.018;
    ref.current.rotation.y = 0.26 + Math.sin(t * 0.28) * 0.035;
    ref.current.rotation.z = -0.035 + Math.sin(t * 0.42) * 0.012;
  });

  return (
    <group
      ref={ref}
      position={[0, 0.05, 0]}
      rotation={[-0.08, 0.26, -0.035]}
      scale={responsiveScale}
      onPointerDown={(event) => {
        event.stopPropagation();
        onEnter();
      }}
    >
      {hasModel ? <LoadedMarbleModel material={material} /> : <PlaceholderSlab material={material} />}
      <SlabLabel onEnter={onEnter} />
    </group>
  );
});

export default MarbleSlab;
