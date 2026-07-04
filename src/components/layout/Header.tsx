"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, selectCount } from "@/lib/store/cart";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/products", label: "컬렉션" },
  { href: "/products/nullform-coat", label: "시그니처" },
];

export default function Header() {
  const count = useCart(selectCount);
  const hydrated = useCart((s) => s.hydrated);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-base ${
        scrolled
          ? "border-line bg-void/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-xl font-extrabold tracking-[0.15em] text-chrome">
            MŌRPH
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-iris-violet shadow-glow transition group-hover:scale-150" />
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group relative text-sm text-text-muted transition hover:text-text"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-iris-violet to-iris-cyan transition-all duration-base ease-expo group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            aria-label="장바구니"
            className="relative text-text-muted transition hover:text-text"
          >
            <CartIcon />
            {hydrated && count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-iris-violet px-1 text-[11px] font-semibold text-white shadow-glow">
                {count}
              </span>
            )}
          </Link>

          <button
            aria-label="메뉴"
            className="text-text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* 모바일 네비 */}
      {open && (
        <nav className="border-t border-line bg-surface md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-text-muted transition hover:text-text"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 6h15l-1.5 9h-12L6 6Z" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
