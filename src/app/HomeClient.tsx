"use client";

import { CountdownTimer } from "@/components/delivery/CountdownTimer";

export function HomeClient() {
  return (
    <section className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
      <CountdownTimer />
    </section>
  );
}
