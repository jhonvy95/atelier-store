import type { StockStatus } from "@/lib/stock";

const STOCK_COPY: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

const STOCK_DOT: Record<StockStatus, string> = {
  "in-stock": "bg-accent-strong",
  "low-stock": "bg-accent-strong",
  "out-of-stock": "bg-error",
};

const STOCK_TEXT: Record<StockStatus, string> = {
  "in-stock": "text-ink-soft",
  "low-stock": "text-ink-soft",
  "out-of-stock": "text-error",
};

export function StockBadge({
  status,
  quantity,
}: {
  status: StockStatus;
  quantity: number;
}) {
  const label =
    status === "low-stock"
      ? `Low Stock — only ${quantity} left`
      : STOCK_COPY[status];

  return (
    <span
      className={`inline-flex items-center gap-2 text-eyebrow font-medium uppercase tracking-luxe ${STOCK_TEXT[status]}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${STOCK_DOT[status]}`}
      />
      {label}
    </span>
  );
}
