import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useMemo } from "react";
import * as THREE from "three";

const MODEL_URL = `${import.meta.env.BASE_URL}models/lattice_in_stone.glb`;

function LoadedSculpture() {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 0.9;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = size.y > 0 ? 3.45 / size.y : 1;
    clone.scale.setScalar(scale);
    clone.position.set(
      -center.x * scale,
      -box.min.y * scale - 1.68,
      -center.z * scale
    );

    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

const GreekSculpture = forwardRef(function GreekSculpture(
  { isEntering, onEnter },
  ref
) {
  const { size } = useThree();
  const responsiveScale =
    size.width < 520 ? 0.86 : size.width < 860 ? 0.98 : 1.08;

  useFrame(({ clock }) => {
    if (!ref.current || isEntering) return;
    const time = clock.getElapsedTime();
    ref.current.position.y = -0.02 + Math.sin(time * 0.5) * 0.025;
    ref.current.rotation.y = -0.18 + Math.sin(time * 0.24) * 0.055;
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
      <LoadedSculpture />
    </group>
  );
});

useGLTF.preload(MODEL_URL);

export default GreekSculpture;
