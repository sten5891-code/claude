// ────────────────────────────────────────────────────────────
// Spline Code API 제어 (정식 경로)
// react-spline 의 onLoad 로 받은 Application 객체를 스크롤/마우스에 연결합니다.
// 대상(변수/오브젝트 이름)은 src/lib/site.ts 의 splineControls 에서 설정합니다.
// ────────────────────────────────────────────────────────────
import type { Application } from "@splinetool/runtime";
import { gsap, ScrollTrigger, EASE, DURATION } from "@/lib/gsap";
import { splineControls } from "@/lib/site";

// Application 을 스크롤·마우스와 연결하고, 해제 함수를 반환합니다.
export function attachSplineControls(app: Application, root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  // 1) 제어 대상 파악용: 씬의 오브젝트/변수 이름을 콘솔에 출력
  //    (여기 찍힌 이름을 splineControls 에 넣으면 아래 제어가 켜집니다)
  try {
    const objects = app.getAllObjects();
    // eslint-disable-next-line no-console
    console.info(
      "[Spline] objects:",
      objects.map((o) => o.name).filter(Boolean),
    );
    // eslint-disable-next-line no-console
    console.info("[Spline] variables:", app.getVariables());
  } catch {
    /* noop */
  }

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2) 스크롤 진행도(0~1) → Spline 변수
  if (splineControls.scrollVariable) {
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        try {
          app.setVariable(splineControls.scrollVariable, self.progress);
        } catch {
          /* 변수명 불일치 시 무시 */
        }
      },
    });
    cleanups.push(() => st.kill());
  }

  // 3) 마우스 위치 → 오브젝트 회전 (quickTo 로 부드럽게, 전역 EASE 사용)
  if (!reduce && splineControls.rotateObject) {
    const obj = app.findObjectByName(splineControls.rotateObject);
    if (obj) {
      const rotY = gsap.quickTo(obj.rotation, "y", { duration: DURATION.base, ease: EASE });
      const rotX = gsap.quickTo(obj.rotation, "x", { duration: DURATION.base, ease: EASE });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        rotY(nx * 0.6); // ±0.3 rad
        rotX(ny * 0.6);
      };
      window.addEventListener("mousemove", onMove);
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    }
  }

  // 4) 히어로 진입/이탈 → 오브젝트 mouseHover 이벤트 emit
  if (splineControls.hoverObject) {
    const enter = () => {
      try {
        app.emitEvent("mouseHover", splineControls.hoverObject);
      } catch {
        /* noop */
      }
    };
    root.addEventListener("mouseenter", enter);
    cleanups.push(() => root.removeEventListener("mouseenter", enter));
  }

  return () => cleanups.forEach((fn) => fn());
}
