import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "./fonts";
import { COLORS } from "./theme";

// ---------------------------------------------------------------------------
// Scene timing (frames @ 30fps). Total = 1350 frames = 45s.
// ---------------------------------------------------------------------------
export const SCENES = {
  hook: { from: 0, duration: 150 },
  problem: { from: 150, duration: 150 },
  start: { from: 300, duration: 180 },
  signs: { from: 480, duration: 240 },
  consequence: { from: 720, duration: 210 },
  hope: { from: 930, duration: 180 },
  cta: { from: 1110, duration: 240 },
};
export const TOTAL_DURATION = 1350;

// ---------------------------------------------------------------------------
// Small animation helpers
// ---------------------------------------------------------------------------
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const useFadeUp = (delay: number, distance = 60, span = 26) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + span], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const y = interpolate(frame, [delay, delay + span], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return { opacity, translate: `0px ${y}px` };
};

const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  return s;
};

// Fade the whole scene in/out at its edges to avoid hard cuts.
const SceneWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 14, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        opacity,
        alignItems: "center",
        justifyContent: "center",
        padding: "160px 90px",
        fontFamily: FONT_FAMILY,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Animated background (shared across scenes)
// ---------------------------------------------------------------------------
const Background: React.FC<{ tint?: string }> = ({ tint = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, TOTAL_DURATION], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 80% at ${
            30 + drift * 40
          }% ${20 + drift * 20}%, ${COLORS.bg} 0%, ${COLORS.bgDeep} 60%)`,
        }}
      />
      {/* soft moving glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 25% at 50% ${
            35 + Math.sin(frame / 60) * 8
          }%, ${tint}22 0%, transparent 70%)`,
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Kicker: React.FC<{ text: string; color?: string; delay?: number }> = ({
  text,
  color = COLORS.hope,
  delay = 0,
}) => {
  const a = useFadeUp(delay, 24);
  return (
    <div
      style={{
        opacity: a.opacity,
        translate: a.translate,
        color,
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: 6,
        textTransform: "uppercase",
        marginBottom: 28,
      }}
    >
      {text}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scene 1 — Hook
// ---------------------------------------------------------------------------
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = usePop(8);
  const line1 = useFadeUp(30);
  const line2 = useFadeUp(48);
  const sub = useFadeUp(78);
  const glow = 0.4 + Math.abs(Math.sin(frame / 18)) * 0.6;

  return (
    <SceneWrap durationInFrames={SCENES.hook.duration}>
      {/* phone motif */}
      <div
        style={{
          scale: String(pop),
          width: 240,
          height: 460,
          borderRadius: 46,
          border: `6px solid ${COLORS.inkSoft}`,
          background: "linear-gradient(160deg, #141a2e 0%, #0d1220 100%)",
          boxShadow: `0 0 ${40 * glow}px ${COLORS.danger}88, inset 0 0 60px #000`,
          marginBottom: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 120, filter: `drop-shadow(0 0 20px ${COLORS.danger})` }}>
          🎰
        </div>
        <div
          style={{
            position: "absolute",
            top: 22,
            width: 90,
            height: 10,
            borderRadius: 8,
            background: "#0a0d18",
          }}
        />
      </div>

      <div
        style={{
          opacity: line1.opacity,
          translate: line1.translate,
          color: COLORS.ink,
          fontSize: 66,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        화면 속 이 게임,
      </div>
      <div
        style={{
          opacity: line2.opacity,
          translate: line2.translate,
          color: COLORS.danger,
          fontSize: 104,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.1,
          marginTop: 6,
          textShadow: `0 0 40px ${COLORS.danger}66`,
        }}
      >
        사실은 도박입니다
      </div>
      <div
        style={{
          opacity: sub.opacity,
          translate: sub.translate,
          color: COLORS.inkSoft,
          fontSize: 40,
          fontWeight: 400,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        청소년 도박, 지금 이야기해야 합니다
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 2 — Problem
// ---------------------------------------------------------------------------
const ProblemScene: React.FC = () => {
  const head = useFadeUp(18);
  const chips = ["온라인 불법 도박", "스포츠 베팅", "사행성 게임"];
  return (
    <SceneWrap durationInFrames={SCENES.problem.duration}>
      <Kicker text="현실" color={COLORS.warn} delay={4} />
      <div
        style={{
          opacity: head.opacity,
          translate: head.translate,
          color: COLORS.ink,
          fontSize: 62,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.35,
          marginBottom: 60,
        }}
      >
        스마트폰 하나면
        <br />
        누구나 쉽게 빠져듭니다
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          width: "100%",
          alignItems: "center",
        }}
      >
        {chips.map((c, i) => {
          const pop = usePop(50 + i * 18);
          return (
            <div
              key={c}
              style={{
                scale: String(pop),
                opacity: pop,
                padding: "26px 46px",
                borderRadius: 20,
                background: "rgba(255,77,94,0.12)",
                border: `2px solid ${COLORS.danger}66`,
                color: COLORS.dangerSoft,
                fontSize: 46,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 3 — It starts small
// ---------------------------------------------------------------------------
const StartScene: React.FC = () => {
  const quotes = ["“친구 따라 딱 한 번”", "“그냥 재미로”", "“용돈 좀 벌려고”"];
  const tail = useFadeUp(120);
  return (
    <SceneWrap durationInFrames={SCENES.start.duration}>
      <Kicker text="시작은 사소하게" color={COLORS.warn} delay={4} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {quotes.map((q, i) => {
          const a = useFadeUp(30 + i * 24, 40);
          return (
            <div
              key={q}
              style={{
                opacity: a.opacity,
                translate: a.translate,
                color: COLORS.ink,
                fontSize: 54,
                fontWeight: 500,
                textAlign: "center",
                padding: "8px 0",
              }}
            >
              {q}
            </div>
          );
        })}
      </div>
      <div
        style={{
          opacity: tail.opacity,
          translate: tail.translate,
          marginTop: 56,
          color: COLORS.danger,
          fontSize: 60,
          fontWeight: 900,
          textAlign: "center",
          textShadow: `0 0 36px ${COLORS.danger}55`,
        }}
      >
        …그러다 멈출 수 없게 됩니다
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 4 — Warning signs
// ---------------------------------------------------------------------------
const SignsScene: React.FC = () => {
  const head = useFadeUp(16);
  const signs: [string, string][] = [
    ["💸", "자꾸 돈이 필요하다며 빌린다"],
    ["📉", "성적이 갑자기 떨어진다"],
    ["😠", "불안해하고 예민해진다"],
    ["📱", "밤새 스마트폰만 붙잡는다"],
    ["🤥", "거짓말이 부쩍 늘어난다"],
  ];
  return (
    <SceneWrap durationInFrames={SCENES.signs.duration}>
      <Kicker text="이런 신호를 놓치지 마세요" color={COLORS.warn} delay={4} />
      <div
        style={{
          opacity: head.opacity,
          translate: head.translate,
          color: COLORS.ink,
          fontSize: 62,
          fontWeight: 900,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        위험 신호
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          width: "100%",
        }}
      >
        {signs.map(([icon, text], i) => {
          const a = useFadeUp(40 + i * 24, 50);
          return (
            <div
              key={text}
              style={{
                opacity: a.opacity,
                translate: a.translate,
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "24px 30px",
                borderRadius: 20,
                background: "rgba(255,176,32,0.08)",
                border: `2px solid ${COLORS.warn}33`,
              }}
            >
              <div style={{ fontSize: 52, flexShrink: 0 }}>{icon}</div>
              <div
                style={{
                  color: COLORS.ink,
                  fontSize: 42,
                  fontWeight: 500,
                  textAlign: "left",
                  lineHeight: 1.25,
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 5 — Consequences + reframe
// ---------------------------------------------------------------------------
const ConsequenceScene: React.FC = () => {
  const words = ["빚", "학업 중단", "관계 단절", "우울·불안"];
  const reframe1 = useFadeUp(120, 50);
  const reframe2 = useFadeUp(140, 50);
  return (
    <SceneWrap durationInFrames={SCENES.consequence.duration}>
      <Kicker text="남는 것" color={COLORS.danger} delay={4} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginBottom: 70,
        }}
      >
        {words.map((w, i) => {
          const pop = usePop(28 + i * 16);
          return (
            <div
              key={w}
              style={{
                scale: String(pop),
                opacity: pop,
                padding: "22px 38px",
                borderRadius: 999,
                background: "rgba(255,77,94,0.16)",
                border: `2px solid ${COLORS.danger}`,
                color: COLORS.dangerSoft,
                fontSize: 46,
                fontWeight: 700,
              }}
            >
              {w}
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: reframe1.opacity,
          translate: reframe1.translate,
          color: COLORS.inkSoft,
          fontSize: 46,
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        도박은 의지의 문제가 아닙니다
      </div>
      <div
        style={{
          opacity: reframe2.opacity,
          translate: reframe2.translate,
          color: COLORS.hope,
          fontSize: 72,
          fontWeight: 900,
          textAlign: "center",
          marginTop: 18,
          lineHeight: 1.2,
          textShadow: `0 0 40px ${COLORS.hope}44`,
        }}
      >
        치료가 필요한
        <br />
        ‘뇌의 질병’입니다
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 6 — Hope
// ---------------------------------------------------------------------------
const HopeScene: React.FC = () => {
  const pop = usePop(8);
  const l1 = useFadeUp(34);
  const l2 = useFadeUp(56);
  const l3 = useFadeUp(86);
  return (
    <SceneWrap durationInFrames={SCENES.hope.duration}>
      <div style={{ scale: String(pop), fontSize: 130, marginBottom: 40 }}>🤝</div>
      <div
        style={{
          opacity: l1.opacity,
          translate: l1.translate,
          color: COLORS.ink,
          fontSize: 58,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        혼자 해결하려 하지 마세요
      </div>
      <div
        style={{
          opacity: l2.opacity,
          translate: l2.translate,
          color: COLORS.hope,
          fontSize: 82,
          fontWeight: 900,
          textAlign: "center",
          marginTop: 16,
          lineHeight: 1.2,
          textShadow: `0 0 40px ${COLORS.hope}44`,
        }}
      >
        도움을 받으면
        <br />
        회복할 수 있습니다
      </div>
      <div
        style={{
          opacity: l3.opacity,
          translate: l3.translate,
          color: COLORS.inkSoft,
          fontSize: 40,
          textAlign: "center",
          marginTop: 40,
          lineHeight: 1.4,
        }}
      >
        부모님, 선생님, 전문기관에
        <br />
        지금 이야기하세요
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Scene 7 — CTA / helpline
// ---------------------------------------------------------------------------
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const slogan = useFadeUp(20);
  const cardPop = usePop(46);
  const sub = useFadeUp(96);
  const youth = useFadeUp(120);
  const pulse = 0.5 + Math.abs(Math.sin(frame / 22)) * 0.5;

  return (
    <SceneWrap durationInFrames={SCENES.cta.duration}>
      <div
        style={{
          opacity: slogan.opacity,
          translate: slogan.translate,
          color: COLORS.ink,
          fontSize: 56,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.35,
          marginBottom: 56,
        }}
      >
        재미가 아니라 <span style={{ color: COLORS.danger }}>덫</span>입니다.
        <br />
        지금 멈추면 다시 시작할 수 있습니다.
      </div>

      <div
        style={{
          scale: String(cardPop),
          opacity: cardPop,
          width: "100%",
          padding: "44px 40px",
          borderRadius: 32,
          background: "rgba(52,224,196,0.10)",
          border: `3px solid ${COLORS.hope}`,
          boxShadow: `0 0 ${50 * pulse}px ${COLORS.hope}55`,
          textAlign: "center",
        }}
      >
        <div style={{ color: COLORS.inkSoft, fontSize: 36, fontWeight: 500 }}>
          도박문제 24시간 상담 · 무료 · 익명
        </div>
        <div
          style={{
            color: COLORS.hope,
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: 8,
            lineHeight: 1.1,
            marginTop: 8,
          }}
        >
          1336
        </div>
        <div style={{ color: COLORS.ink, fontSize: 34, fontWeight: 500 }}>
          한국도박문제예방치유원 · 국번 없이 1336
        </div>
      </div>

      <div
        style={{
          opacity: youth.opacity,
          translate: youth.translate,
          color: COLORS.inkSoft,
          fontSize: 36,
          fontWeight: 500,
          textAlign: "center",
          marginTop: 34,
        }}
      >
        청소년 상담은 <span style={{ color: COLORS.accent, fontWeight: 700 }}>1388</span>
      </div>

      <div
        style={{
          opacity: sub.opacity,
          translate: sub.translate,
          color: COLORS.inkSoft,
          fontSize: 30,
          textAlign: "center",
          marginTop: 26,
        }}
      >
        당신의 잘못이 아닙니다. 도움을 요청하세요.
      </div>
    </SceneWrap>
  );
};

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------
export const GamblingAwareness: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      <Background />
      <Sequence
        name="Hook"
        from={SCENES.hook.from}
        durationInFrames={SCENES.hook.duration}
        layout="none"
      >
        <HookScene />
      </Sequence>
      <Sequence
        name="Problem"
        from={SCENES.problem.from}
        durationInFrames={SCENES.problem.duration}
        layout="none"
      >
        <ProblemScene />
      </Sequence>
      <Sequence
        name="Starts small"
        from={SCENES.start.from}
        durationInFrames={SCENES.start.duration}
        layout="none"
      >
        <StartScene />
      </Sequence>
      <Sequence
        name="Warning signs"
        from={SCENES.signs.from}
        durationInFrames={SCENES.signs.duration}
        layout="none"
      >
        <SignsScene />
      </Sequence>
      <Sequence
        name="Consequences"
        from={SCENES.consequence.from}
        durationInFrames={SCENES.consequence.duration}
        layout="none"
      >
        <ConsequenceScene />
      </Sequence>
      <Sequence
        name="Hope"
        from={SCENES.hope.from}
        durationInFrames={SCENES.hope.duration}
        layout="none"
      >
        <HopeScene />
      </Sequence>
      <Sequence
        name="Helpline"
        from={SCENES.cta.from}
        durationInFrames={SCENES.cta.duration}
        layout="none"
      >
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
};
