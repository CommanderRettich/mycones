"use client";

import { create } from "zustand";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  isB2B: boolean;
  toggleB2B: () => void;
  addItem: (product: Product, qty?: number) => void;
  updateQty: (artCode: string, qty: number) => void;
  removeItem: (artCode: string) => void;
  setToMC: (artCode: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isB2B: false,

  toggleB2B: () => set((state) => ({ isB2B: !state.isB2B })),

  addItem: (product, qty = 1) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.artCode === product.artCode
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.artCode === product.artCode
              ? { ...item, qty: item.qty + qty }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, qty }] };
    }),

  updateQty: (artCode, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((item) => item.product.artCode !== artCode)
          : state.items.map((item) =>
              item.product.artCode === artCode ? { ...item, qty } : item
            ),
    })),

  removeItem: (artCode) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.artCode !== artCode),
    })),

  setToMC: (artCode) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.artCode === artCode
          ? { ...item, qty: item.product.mcDisplays }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),

  getItemCount: () => get().items.reduce((sum, item) => sum + item.qty, 0),
}));
