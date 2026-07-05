import { Reveal } from "@/components/anim/Reveal";
import { HeroR3F } from "@/components/sections/HeroR3F";
import { ScrollStory } from "@/components/sections/ScrollStory";

// Phase 1: 섹션 뼈대(앵커)만 배치합니다.
// 2~5단계에서 각 Placeholder 를 실제 컴포넌트로 교체합니다.
function SectionPlaceholder({
  id,
  eyebrow,
  title,
  phase,
}: {
  id: string;
  eyebrow: string;
  title: string;
  phase: string;
}) {
  return (
    <section id={id} className="section">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="heading-2">{title}</h2>
          <div className="mt-8 flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 text-sm text-muted">
            {phase} 에서 채워집니다
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero + R3F 3D (박스 그리드) */}
      <HeroR3F />

      {/* 스크롤 스토리텔링 — 2단계 */}
      <ScrollStory />

      <SectionPlaceholder id="about" eyebrow="About" title="소개 & 기술" phase="다음 단계" />
      <SectionPlaceholder id="projects" eyebrow="Work" title="프로젝트" phase="다음 단계" />
      <SectionPlaceholder id="experience" eyebrow="Career" title="경력" phase="다음 단계" />
      <SectionPlaceholder id="contact" eyebrow="Contact" title="연락처" phase="다음 단계" />
    </>
  );
}
