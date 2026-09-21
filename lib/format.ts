/**
 * Venezuelan number formatting: period for thousands, comma for decimals.
 * Getting this wrong is one of the fastest ways to read as a foreign site.
 */
const USD = new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatUsd(value: number): string {
  return `$${USD.format(value)}`;
}
