// NL public holidays 2025-2027 (Vandenberg ships from Netherlands)
const NL_HOLIDAYS = [
  // 2025
  "2025-01-01", "2025-04-18", "2025-04-21", "2025-04-27",
  "2025-05-05", "2025-05-29", "2025-06-08", "2025-06-09",
  "2025-12-25", "2025-12-26",
  // 2026
  "2026-01-01", "2026-04-03", "2026-04-06", "2026-04-27",
  "2026-05-05", "2026-05-14", "2026-05-25", "2026-05-26",
  "2026-12-25", "2026-12-26",
  // 2027
  "2027-01-01", "2027-03-26", "2027-03-29", "2027-04-27",
  "2027-05-05", "2027-05-06", "2027-05-16", "2027-05-17",
  "2027-12-25", "2027-12-26",
];

const CUTOFF_HOUR = 16;
const CUTOFF_MINUTE = 20;

function toAmsterdamTime(date: Date): Date {
  const str = date.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });
  return new Date(str);
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isHoliday(date: Date): boolean {
  return NL_HOLIDAYS.includes(formatDateKey(date));
}

function isBusinessDay(date: Date): boolean {
  return !isWeekend(date) && !isHoliday(date);
}

function nextBusinessDay(from: Date): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + 1);
  while (!isBusinessDay(next)) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export interface DeliveryInfo {
  isNextDay: boolean;
  isBeforeCutoff: boolean;
  nextDeliveryDate: Date;
  deliveryDateFormatted: string;
  cutoffTime: Date;
  remainingMs: number;
  remainingFormatted: string;
}

export function getDeliveryInfo(now: Date = new Date()): DeliveryInfo {
  const ams = toAmsterdamTime(now);

  // Build cutoff time for today in Amsterdam
  const cutoffToday = new Date(ams);
  cutoffToday.setHours(CUTOFF_HOUR, CUTOFF_MINUTE, 0, 0);

  const isBeforeCutoff =
    isBusinessDay(ams) && ams.getTime() < cutoffToday.getTime();

  let nextDelivery: Date;
  if (isBeforeCutoff) {
    // Order before cutoff on a business day → next business day delivery
    nextDelivery = nextBusinessDay(ams);
  } else {
    // After cutoff or weekend/holiday → skip to next business day, then deliver the one after
    const nextBD = isBusinessDay(ams) ? nextBusinessDay(ams) : ams;
    // Find next business day from current or next
    let startFrom = isBusinessDay(ams) ? ams : new Date(ams);
    if (!isBusinessDay(startFrom)) {
      while (!isBusinessDay(startFrom)) {
        startFrom.setDate(startFrom.getDate() + 1);
      }
    }
    nextDelivery = nextBusinessDay(startFrom);
  }

  const remainingMs = isBeforeCutoff
    ? cutoffToday.getTime() - ams.getTime()
    : 0;

  const deliveryDateFormatted = nextDelivery.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    isNextDay: isBeforeCutoff,
    isBeforeCutoff,
    nextDeliveryDate: nextDelivery,
    deliveryDateFormatted,
    cutoffTime: cutoffToday,
    remainingMs,
    remainingFormatted: formatRemaining(remainingMs),
  };
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
