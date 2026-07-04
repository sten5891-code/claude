"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

// ─────────────────────────────────────────────────────────────
//  Neo-Chrome 히어로의 3D 오브젝트
//  · 액체 크롬처럼 일그러지는 블롭 (MŌRPH = 형태의 변형)
//  · Lightformer 로 만든 절차적 환경 → 외부 HDR 없이 크롬 반사
//  · 마우스 포인터에 반응하는 패럴랙스 회전
//  · prefers-reduced-motion 이면 왜곡/회전을 멈춘 정적 상태로 표시
// ─────────────────────────────────────────────────────────────

function ChromeBlob({ reduced }: { reduced: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    // 포인터 패럴랙스 + 은은한 상시 회전 (reduced 면 고정)
    const targetX = reduced ? 0.15 : state.pointer.y * 0.35 + t * 0.04;
    const targetY = reduced ? 0.5 : state.pointer.x * 0.6 + t * 0.12;
    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.05;
    mesh.rotation.y += (targetY - mesh.rotation.y) * 0.05;
  });

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={0}
      floatIntensity={reduced ? 0 : 1.1}
    >
      <mesh ref={ref} scale={2.15}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color="#e4e5ef"
          metalness={1}
          roughness={0.13}
          envMapIntensity={1.7}
          distort={reduced ? 0.18 : 0.4}
          speed={reduced ? 0 : 1.7}
        />
      </mesh>
    </Float>
  );
}

function ChromeEnvironment() {
  // 보라/시안/마젠타 라이트포머로 이리데센트 크롬 반사를 절차적으로 생성
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        form="circle"
        intensity={2.4}
        color="#8b5cf6"
        position={[-4, 2, 4]}
        scale={5}
      />
      <Lightformer
        form="circle"
        intensity={2.4}
        color="#22d3ee"
        position={[4, -1, 4]}
        scale={5}
      />
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#ec4899"
        position={[0, 3.5, -4]}
        scale={[7, 2, 1]}
      />
      <Lightformer
        form="rect"
        intensity={3}
        color="#ffffff"
        position={[0, -4, 3]}
        scale={[9, 2, 1]}
      />
    </Environment>
  );
}

export default function ChromeScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ChromeBlob reduced={reduced} />
        <ChromeEnvironment />
        <pointLight position={[6, 6, 6]} intensity={0.4} />
      </Suspense>
    </Canvas>
  );
}
