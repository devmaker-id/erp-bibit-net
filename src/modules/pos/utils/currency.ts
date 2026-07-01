const DEFAULT_LOCALE = "id-ID";

const DEFAULT_CURRENCY = "IDR";

export function formatCurrency(
  value: number,
  locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY
) {
  return new Intl.NumberFormat(
    locale,
    {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ).format(value);
}

export function formatNumber(
  value: number,
  locale = DEFAULT_LOCALE
) {
  return new Intl.NumberFormat(
    locale
  ).format(value);
}

export function roundCurrency(
  value: number,
  precision = 2
) {
  return Number(
    value.toFixed(precision)
  );
}

export function parseCurrency(
  value: string
) {
  const normalized = value
    .replace(/[^\d,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const result = Number(normalized);

  return Number.isNaN(result)
    ? 0
    : result;
}