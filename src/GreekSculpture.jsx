import { RoundedBox, useGLTF } from "@react-three/drei";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_URL = `${import.meta.env.BASE_URL}models/greek_sculpture/marble_bust_01_1k.gltf`;

function createMarbleTexture(kind = "albedo") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (kind === "normal") {
    base.addColorStop(0, "#7c7f88");
    base.addColorStop(1, "#8d9098");
  } else if (kind === "roughness") {
    base.addColorStop(0, "#b9b6ad");
    base.addColorStop(0.52, "#e1ded7");
    base.addColorStop(1, "#8e8a82");
  } else {
    base.addColorStop(0, "#f3f0e8");
    base.addColorStop(0.45, "#cfc9bd");
    base.addColorStop(1, "#fffdf6");
  }
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 92; i += 1) {
    const y = Math.random() * canvas.height;
    const x = -220 + Math.random() * 260;
    const alpha = kind === "normal" ? 0.1 : 0.16;
    const width = kind === "normal" ? 1 + Math.random() * 2 : 1 + Math.random() * 6;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      canvas.width * 0.25,
      y - 160 + Math.random() * 320,
      canvas.width * 0.66,
      y - 180 + Math.random() * 360,
      canvas.width + 180,
      y - 130 + Math.random() * 260
    );
    ctx.strokeStyle =
      kind === "normal"
        ? `rgba(150, 153, 160, ${alpha})`
        : `rgba(74, 70, 64, ${alpha})`;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  for (let i = 0; i < 9600; i += 1) {
    const value = kind === "roughness" ? 150 + Math.random() * 70 : 214 + Math.random() * 38;
    ctx.fillStyle =
      kind === "roughness"
        ? `rgba(${value}, ${value}, ${value}, 0.045)`
        : `rgba(${value}, ${value}, ${value}, 0.038)`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = kind === "albedo" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.4, 1.4);
  texture.anisotropy = 8;
  return texture;
}

function useMarbleMaterial() {
  return useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: "#eee9df",
      map: createMarbleTexture("albedo"),
      roughnessMap: createMarbleTexture("roughness"),
      normalMap: createMarbleTexture("normal"),
      normalScale: new THREE.Vector2(0.12, 0.16),
      emissive: "#d8cec0",
      emissiveIntensity: 0.18,
      roughness: 0.68,
      metalness: 0,
      clearcoat: 0.16,
      clearcoatRoughness: 0.78
    });

    material.envMapIntensity = 0.58;
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

function LoadedSculpture({ fallbackMaterial }) {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = fallbackMaterial;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = size.y > 0 ? 3.45 / size.y : 1;
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale - 1.68, -center.z * scale);

    return clone;
  }, [scene, fallbackMaterial]);

  return <primitive object={model} />;
}

function HairCurls({ material }) {
  const curls = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const band = index < 9 ? 0 : 1;
        const i = index % 9;
        const angle = -2.28 + i * 0.54;
        const radius = band === 0 ? 0.31 : 0.28;
        return {
          position: [Math.cos(angle) * radius, 1.34 - band * 0.13 + Math.sin(i * 1.7) * 0.018, Math.sin(angle) * 0.1 - 0.08],
          scale: 0.042 + ((i + band) % 3) * 0.008
        };
      }),
    []
  );

  return curls.map((curl, index) => (
    <mesh key={index} castShadow receiveShadow position={curl.position} scale={curl.scale}>
      <sphereGeometry args={[1, 16, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  ));
}

function Drapery({ material }) {
  const folds = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        x: -0.34 + index * 0.095,
        y: -0.64 + index * 0.014,
        z: 0.43 + (index % 2) * 0.012,
        rot: -0.5 + index * 0.04,
        length: 0.34 + (index % 3) * 0.045
      })),
    []
  );

  return folds.map((fold, index) => (
    <mesh
      key={index}
      castShadow
      receiveShadow
      position={[fold.x, fold.y, fold.z]}
      rotation={[0.22, 0.08, fold.rot]}
    >
      <cylinderGeometry args={[0.009, 0.015, fold.length, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  ));
}

function PlaceholderSculpture({ material, baseMaterial }) {
  const shadowMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c9c3b8",
        roughness: 0.76,
        metalness: 0,
        clearcoat: 0.08
      }),
    []
  );

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -1.52, 0]}>
        <cylinderGeometry args={[0.8, 0.92, 0.24, 72]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>
      <RoundedBox args={[1.65, 0.18, 1.08]} radius={0.025} smoothness={10} position={[0, -1.32, 0]} castShadow receiveShadow>
        <primitive object={baseMaterial} attach="material" />
      </RoundedBox>
      <mesh castShadow receiveShadow position={[0, -0.9, 0]} scale={[0.66, 0.54, 0.4]} rotation={[0.04, 0.12, 0]}>
        <sphereGeometry args={[1, 48, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <Drapery material={shadowMaterial} />
      <mesh castShadow receiveShadow position={[0, -0.24, 0.02]} scale={[0.18, 0.3, 0.16]}>
        <cylinderGeometry args={[1, 0.82, 1, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.23, 0.03]} scale={[0.27, 0.16, 0.24]} rotation={[0.08, -0.08, 0]}>
        <sphereGeometry args={[1, 32, 18]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.62, 0.03]} scale={[0.31, 0.4, 0.28]} rotation={[0.02, -0.14, 0.01]}>
        <sphereGeometry args={[1, 56, 36]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.02, 0.61, 0.29]} rotation={[1.5, 0, 0.08]} scale={[0.045, 0.045, 0.11]}>
        <coneGeometry args={[1, 1, 24]} />
        <primitive object={shadowMaterial} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.1, 0.64, 0.28]} scale={[0.024, 0.009, 0.009]}>
        <sphereGeometry args={[1, 12, 8]} />
        <primitive object={shadowMaterial} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.1, 0.64, 0.27]} scale={[0.024, 0.009, 0.009]}>
        <sphereGeometry args={[1, 12, 8]} />
        <primitive object={shadowMaterial} attach="material" />
      </mesh>
      <HairCurls material={shadowMaterial} />
      <mesh castShadow receiveShadow position={[-0.58, -0.51, 0.02]} rotation={[0.18, 0.08, 0.28]} scale={[0.24, 0.46, 0.22]}>
        <sphereGeometry args={[1, 32, 18]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.58, -0.51, -0.02]} rotation={[0.18, -0.06, -0.24]} scale={[0.23, 0.42, 0.21]}>
        <sphereGeometry args={[1, 32, 18]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

const GreekSculpture = forwardRef(function GreekSculpture({ isEntering, onEnter }, ref) {
  const material = useMarbleMaterial();
  const baseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#9f988c",
        roughness: 0.82,
        metalness: 0,
        map: createMarbleTexture("albedo"),
        normalMap: createMarbleTexture("normal"),
        normalScale: new THREE.Vector2(0.06, 0.08)
      }),
    []
  );
  const hasModel = useModelAvailable();
  const { size } = useThree();
  const responsiveScale = size.width < 520 ? 0.86 : size.width < 860 ? 0.98 : 1.08;

  useFrame(({ clock }) => {
    if (!ref.current || isEntering) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = -0.02 + Math.sin(t * 0.5) * 0.025;
    ref.current.rotation.y = -0.18 + Math.sin(t * 0.24) * 0.055;
  });

  return (
    <group
      ref={ref}
      position={[size.width < 760 ? 0.16 : 0.78, -0.18, 0]}
      rotation={[0, -0.18, 0]}
      scale={responsiveScale}
      onPointerDown={(event) => {
        event.stopPropagation();
        onEnter();
      }}
    >
      {hasModel ? (
        <LoadedSculpture fallbackMaterial={material} />
      ) : (
        <PlaceholderSculpture material={material} baseMaterial={baseMaterial} />
      )}
    </group>
  );
});

export default GreekSculpture;
