"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Size } from "@/types";

// ─────────────────────────────────────────────────────────────
//  장바구니 전역 상태 (Zustand)
//  persist 미들웨어로 localStorage에 저장 → 새로고침해도 유지됩니다.
// ─────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  /** SSR/CSR hydration 완료 여부 (배지 깜빡임 방지용) */
  hydrated: boolean;
  setHydrated: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clear: () => void;
}

const sameLine = (a: CartItem, productId: string, size: Size) =>
  a.productId === productId && a.size === size;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, item.productId, item.size)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item.productId, item.size)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, size)),
        })),

      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, productId, size)
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "wdt_cart_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// 파생 셀렉터들
export const selectCount = (s: CartState) =>
  s.items.reduce((acc, i) => acc + i.quantity, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
