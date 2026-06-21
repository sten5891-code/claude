import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-900/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-[0.2em]">AQUA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-drop" />
            <span className="text-base font-light tracking-[0.2em] text-mist-300">
              LABEL
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-400">
            비 오는 날의 무드를 담은 미니멀 의류 브랜드. {/* TODO: 브랜드 소개 문구 교체 */}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-mist-200">바로가기</h4>
          <ul className="mt-4 space-y-2 text-sm text-mist-400">
            <li><Link href="/products" className="hover:text-drop-light">전체상품</Link></li>
            <li><Link href="/cart" className="hover:text-drop-light">장바구니</Link></li>
            <li><Link href="/products/raindrop-tee" className="hover:text-drop-light">상품 상세</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-mist-200">고객센터</h4>
          <ul className="mt-4 space-y-2 text-sm text-mist-400">
            {/* TODO: 실제 고객센터 정보로 교체 */}
            <li>전화: 0000-0000</li>
            <li>운영시간: 평일 10:00 - 18:00</li>
            <li>이메일: help@example.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-mist-400 md:flex-row md:items-center md:justify-between">
          {/* TODO: 사업자정보 교체 */}
          <p>상호: AQUA LABEL · 대표: 000 · 사업자등록번호: 000-00-00000</p>
          <p>© {new Date().getFullYear()} AQUA LABEL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
