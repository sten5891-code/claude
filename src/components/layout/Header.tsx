"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, selectCount } from "@/lib/store/cart";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/products", label: "전체상품" },
  { href: "/products/raindrop-tee", label: "RAINDROP TEE" },
];

export default function Header() {
  const count = useCart(selectCount);
  const hydrated = useCart((s) => s.hydrated);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-lg font-semibold tracking-[0.2em] text-mist-100">
            AQUA
          </span>
          <span className="h-2 w-2 rounded-full bg-drop shadow-glass transition group-hover:animate-ripple" />
          <span className="text-lg font-light tracking-[0.2em] text-mist-300">
            LABEL
          </span>
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-mist-300 transition hover:text-drop-light"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-4">
          <button
            aria-label="검색"
            className="text-mist-300 transition hover:text-drop-light"
          >
            <SearchIcon />
          </button>

          <Link
            href="/cart"
            aria-label="장바구니"
            className="relative text-mist-300 transition hover:text-drop-light"
          >
            <CartIcon />
            {hydrated && count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-drop px-1 text-[11px] font-semibold text-white shadow-glass">
                {count}
              </span>
            )}
          </Link>

          <button
            aria-label="메뉴"
            className="text-mist-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* 모바일 네비 */}
      {open && (
        <nav className="border-t border-white/5 bg-ink-900 md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-mist-300 transition hover:text-drop-light"
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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6h15l-1.5 9h-12L6 6Z" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
