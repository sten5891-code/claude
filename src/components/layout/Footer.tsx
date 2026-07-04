import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-30 border-t border-line bg-surface/50">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-extrabold tracking-[0.15em] text-chrome">
              MŌRPH
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-iris-violet" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
            형태를 다시 쓰는 아방가르드 여성복. 크롬처럼 흐르는 실루엣으로 옷과
            조각 사이를 탐구합니다. {/* TODO: 브랜드 소개 문구 교체 */}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text">바로가기</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
            <li>
              <Link href="/products" className="hover:text-iris-cyan">
                전체 컬렉션
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-iris-cyan">
                장바구니
              </Link>
            </li>
            <li>
              <Link
                href="/products/liquid-chrome-dress"
                className="hover:text-iris-cyan"
              >
                시그니처 피스
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text">고객센터</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
            {/* TODO: 실제 고객센터 정보로 교체 */}
            <li>전화: 0000-0000</li>
            <li>운영시간: 평일 11:00 - 18:00</li>
            <li>이메일: studio@morph.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-text-faint md:flex-row md:items-center md:justify-between">
          {/* TODO: 사업자정보 교체 */}
          <p>상호: MŌRPH · 대표: 000 · 사업자등록번호: 000-00-00000</p>
          <p>© {new Date().getFullYear()} MŌRPH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
