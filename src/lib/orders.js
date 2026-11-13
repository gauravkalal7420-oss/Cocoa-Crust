import { formatPrice } from "@/data/menu";

export function makeReference() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CC-${random}`;
}

export const ORDER_STATUS = {
  pending: { label: "Being baked", className: "bg-butter" },
  ready: { label: "Ready for pickup", className: "bg-blush" },
  collected: { label: "Collected", className: "bg-[#CDEFD8]" },
  cancelled: { label: "Cancelled", className: "bg-[#F7CFCF]" },
};

export function formatPickupDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function earliestPickupDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function summarise(items) {
  return {
    count: items.reduce((total, line) => total + line.quantity, 0),
    total: items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    label: formatPrice(items.reduce((sum, line) => sum + line.price * line.quantity, 0)),
  };
}