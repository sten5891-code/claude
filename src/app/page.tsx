import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";

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
      {/* Home / Hero — 2단계 */}
      <section
        id="home"
        className="relative flex min-h-[92vh] items-center overflow-hidden"
      >
        {/* 배경 그라데이션 (임시) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.18),transparent_70%)]"
        />
        <div className="container-page">
          <span className="eyebrow animate-fade-up">{site.role}</span>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight tracking-tight animate-fade-up sm:text-6xl">
            안녕하세요, <span className="text-gradient">{site.name}</span>입니다.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted animate-fade-up">
            {site.tagline}
          </p>
          <p className="mt-10 text-sm text-muted">
            ↓ 2단계에서 이 히어로 섹션을 본격적으로 완성합니다.
          </p>
        </div>
      </section>

      <SectionPlaceholder id="about" eyebrow="About" title="소개 & 기술" phase="3단계" />
      <SectionPlaceholder id="projects" eyebrow="Work" title="프로젝트" phase="4단계" />
      <SectionPlaceholder id="experience" eyebrow="Career" title="경력" phase="5단계" />
      <SectionPlaceholder id="contact" eyebrow="Contact" title="연락처" phase="5단계" />
    </>
  );
}
