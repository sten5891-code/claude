"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import { useTheme } from "next-themes";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import { site } from "@/lib/site";

// ── 그리드 설정 ──
const COLS = 7;
const ROWS = 5;
const GAP = 1.12;
const SIZE = 0.86;

type Cell = { key: string; x: number; z: number };
const CELLS: Cell[] = (() => {
  const out: Cell[] = [];
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      out.push({
        key: `${c}-${r}`,
        x: (c - (COLS - 1) / 2) * GAP,
        z: (r - (ROWS - 1) / 2) * GAP,
      });
    }
  }
  return out;
})();

// 마우스가 닿는 지점(월드 좌표)을 계산하기 위한 평면/재사용 벡터
const PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const HIT = new THREE.Vector3();
const NDC = new THREE.Vector2();

function Boxes({ base, accent, reduce }: { base: string; accent: string; reduce: boolean }) {
  const { camera, gl, raycaster } = useThree();
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const matRefs = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });

  // 캔버스 기준 정규화 포인터 (전체 히어로 영역에서 반응하도록 window 리스너 사용)
  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.active = true;
    };
    const onLeave = () => (pointer.current.active = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 마우스 지점을 그리드 평면(y=0)에 투영
    let hx = 999,
      hz = 999;
    if (pointer.current.active) {
      NDC.set(pointer.current.x, pointer.current.y);
      raycaster.setFromCamera(NDC, camera);
      if (raycaster.ray.intersectPlane(PLANE, HIT)) {
        hx = HIT.x;
        hz = HIT.z;
      }
    }

    for (let i = 0; i < CELLS.length; i++) {
      const cell = CELLS[i];
      const mesh = meshRefs.current[i];
      const mat = matRefs.current[i];
      if (!mesh || !mat) continue;

      // 은은한 idle 웨이브
      const idle = reduce ? 0 : Math.sin(t * 0.9 + cell.x * 0.5 + cell.z * 0.4) * 0.06;

      // 마우스 근접 → 가우시안 융기(ripple)
      let lift = 0;
      if (!reduce && pointer.current.active) {
        const dx = cell.x - hx;
        const dz = cell.z - hz;
        const d2 = dx * dx + dz * dz;
        lift = Math.exp(-d2 / (2 * 1.5 * 1.5)) * 1.15; // sigma 1.5, amp 1.15
      }

      const targetY = idle + lift;
      mesh.position.y += (targetY - mesh.position.y) * 0.12; // 부드럽게 추종

      // 융기한 박스일수록 accent 로 빛남 + 살짝 커짐
      const glow = THREE.MathUtils.clamp(mesh.position.y, 0, 1.2);
      mat.emissiveIntensity += (glow * 1.4 - mat.emissiveIntensity) * 0.15;
      const s = 1 + glow * 0.06;
      mesh.scale.x += (s - mesh.scale.x) * 0.15;
      mesh.scale.z += (s - mesh.scale.z) * 0.15;
    }
  });

  return (
    <group rotation={[0, -0.12, 0]}>
      {CELLS.map((cell, i) => (
        <RoundedBox
          key={cell.key}
          ref={(el) => {
            meshRefs.current[i] = el as THREE.Mesh | null;
          }}
          args={[SIZE, SIZE, SIZE]}
          radius={0.1}
          smoothness={4}
          position={[cell.x, 0, cell.z]}
        >
          <meshStandardMaterial
            ref={(el) => {
              matRefs.current[i] = el as THREE.MeshStandardMaterial | null;
            }}
            color={base}
            emissive={accent}
            emissiveIntensity={0}
            metalness={0.35}
            roughness={0.35}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function Scene({ dark }: { dark: boolean }) {
  const base = dark ? "#15151c" : "#dfe0ea";
  const accent = dark ? "#7c5cff" : "#6d4aff";
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <ambientLight intensity={dark ? 0.35 : 0.7} />
      <directionalLight position={[5, 9, 5]} intensity={dark ? 1.1 : 1.4} />
      <pointLight position={[-5, 3, -3]} intensity={dark ? 40 : 20} color={accent} distance={20} />
      <Boxes base={base} accent={accent} reduce={reduce} />
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={dark ? 0.5 : 0.35}
        scale={16}
        blur={2.6}
        far={4}
        color="#000000"
      />
    </>
  );
}

export function HeroR3F() {
  const root = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  useGSAP(
    () => {
      const layer = root.current!.querySelector<HTMLElement>(".hero-3d");
      const copy = root.current!.querySelector<HTMLElement>(".hero-copy");
      if (!layer || !copy) return;

      gsap.from(".hero-copy > *", {
        opacity: 0,
        y: 24,
        duration: DURATION.slow,
        stagger: 0.08,
        ease: EASE,
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // 스크롤 시차 + 페이드 (Lenis→ScrollTrigger scrub)
      gsap.to(layer, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(copy, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* R3F 3D 레이어 */}
      <div className="hero-3d absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 5.5, 6.6], fov: 32 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <Scene dark={dark} />
        </Canvas>
        {/* 가독성 그라데이션 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent sm:via-bg/10" />
      </div>

      {/* 타이포그래피 오버레이 */}
      <div className="hero-copy container-page relative z-10">
        <span className="eyebrow">{site.role}</span>
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          안녕하세요,
          <br />
          <span className="text-gradient">{site.name}</span>입니다.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            작업 보기
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            연락하기
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center text-muted">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
