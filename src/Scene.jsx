import { ContactShadows, Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import GreekSculpture from "./GreekSculpture.jsx";

function CameraTransition({ active, targetRef }) {
  const { camera } = useThree();
  const timelineRef = useRef(null);

  useFrame(() => {
    if (!active) camera.lookAt(0, 0.08, 0);
  });

  useEffect(() => {
    if (!active) return undefined;

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .to(
        targetRef.current?.rotation ?? {},
        {
          x: "+=0.018",
          y: "+=0.12",
          z: "-=0.012",
          yoyo: true,
          repeat: 4,
          duration: 0.08,
          ease: "rough({ template: none.out, strength: 0.75, points: 12, taper: none, randomize: true, clamp: false })"
        },
        0
      )
      .to(
        camera.position,
        {
          x: 0.08,
          y: 0.5,
          z: 2.18,
          duration: 1.7,
          ease: "power3.inOut",
          onUpdate: () => camera.lookAt(0, 0.18, 0)
        },
        0.05
      )
      .to(
        camera,
        {
          fov: 25,
          duration: 1.7,
          ease: "power3.inOut",
          onUpdate: () => camera.updateProjectionMatrix()
        },
        0.05
      );

    return () => timelineRef.current?.kill();
  }, [active, camera, targetRef]);

  return null;
}

function CursorLight() {
  const spotRef = useRef(null);
  const pointRef = useRef(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  const lightPosition = useMemo(() => new THREE.Vector3(-1.8, 1.6, 3.2), []);
  const targetPosition = useMemo(() => new THREE.Vector3(0, 0.35, 0), []);
  const { scene } = useThree();

  useEffect(() => {
    scene.add(target);
    if (spotRef.current) spotRef.current.target = target;
    return () => scene.remove(target);
  }, [scene, target]);

  useFrame(({ pointer }) => {
    const x = THREE.MathUtils.clamp(pointer.x, -1, 1);
    const y = THREE.MathUtils.clamp(pointer.y, -1, 1);
    lightPosition.set(x * 3.2, 1.45 + y * 1.45, 3.35);
    targetPosition.set(0.52 + x * 0.62, 0.18 + y * 0.42, 0);

    if (spotRef.current) {
      spotRef.current.position.lerp(lightPosition, 0.13);
      target.position.lerp(targetPosition, 0.15);
      spotRef.current.target.updateMatrixWorld();
    }

    if (pointRef.current) {
      pointRef.current.position.lerp(
        new THREE.Vector3(x * 2.4, 0.9 + y * 1.2, 1.6),
        0.12
      );
    }
  });

  return (
    <>
      <spotLight
        ref={spotRef}
        castShadow
        position={[-1.8, 1.6, 3.2]}
        angle={0.36}
        penumbra={0.9}
        intensity={9.2}
        distance={8.2}
        color="#f6efe2"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00012}
      />
      <pointLight
        ref={pointRef}
        position={[-1.2, 1.1, 1.8]}
        intensity={0.82}
        distance={4.2}
        color="#8fb7ff"
      />
      <directionalLight position={[-2.6, 2.8, 2.4]} intensity={0.78} color="#d9d1c4" />
      <directionalLight position={[3.4, 1.8, -1.8]} intensity={0.42} color="#7f9ad4" />
    </>
  );
}

function DustField() {
  const pointsRef = useRef(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 6.2;
      positions[i * 3 + 1] = Math.random() * 3.2 - 1.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
    }
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return bufferGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.018;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.012} color="#e9dfce" transparent opacity={0.32} depthWrite={false} />
    </points>
  );
}

function SceneContent({ isEntering, onEnter }) {
  const sculptureRef = useRef(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.46, 5.45]} fov={33} />
      <CameraTransition active={isEntering} targetRef={sculptureRef} />
      <color attach="background" args={["#020202"]} />
      <fog attach="fog" args={["#020202", 4.2, 9.4]} />
      <ambientLight intensity={0.035} />
      <hemisphereLight args={["#24324a", "#050302", 0.18]} />
      <CursorLight />

      <Suspense fallback={null}>
        <Environment preset="night" environmentIntensity={0.24} />
        <GreekSculpture ref={sculptureRef} isEntering={isEntering} onEnter={onEnter} />
        <DustField />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.68, 0]} receiveShadow>
        <circleGeometry args={[4.8, 96]} />
        <meshStandardMaterial color="#030303" roughness={0.94} metalness={0} />
      </mesh>
      <ContactShadows
        position={[0, -1.66, 0]}
        opacity={0.48}
        scale={5}
        blur={2.7}
        far={2.8}
        color="#000000"
      />
    </>
  );
}

function MuseumTitle({ onEnter }) {
  return (
    <div className="museum-ui museum-ui--dark">
      <p className="museum-eyebrow">Museo delle Arti Carrara</p>
      <div className="museum-title-stack">
        <p className="museum-context">RESONANT MATTER</p>
        <p className="museum-subtitle">Listening and dialogue revealing form.</p>
      </div>
      <button className="enter-button" type="button" onClick={onEnter}>
        Enter the exhibition
      </button>
    </div>
  );
}

export default function Scene({ isEntering, onEnter }) {
  const shellRef = useRef(null);

  function updateSpot(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    shellRef.current?.style.setProperty("--spot-x", `${x}%`);
    shellRef.current?.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <section
      ref={shellRef}
      className="scene-shell scene-shell--dark"
      aria-label="Resonant Matter exhibition intro"
      onPointerMove={updateSpot}
      onPointerLeave={() => {
        shellRef.current?.style.setProperty("--spot-x", "50%");
        shellRef.current?.style.setProperty("--spot-y", "42%");
      }}
    >
      <Canvas
        className="three-canvas"
        dpr={[1, 2]}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.95;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <SceneContent isEntering={isEntering} onEnter={onEnter} />
      </Canvas>
      <MuseumTitle onEnter={onEnter} />
      <div className="scene-caption" aria-hidden="true">
        <span>cursor light</span>
        <span>marble figure</span>
        <span>Carrara</span>
      </div>
    </section>
  );
}
