import raw from '@/data/productos.json';

export type ColorVariant = { name: string; hex: string; image: string };

export type Product = {
  id: number;
  slug: string;
  name: string;
  /** null means we do not publish a price for this item yet. */
  priceUsd: number | null;
  category: CategorySlug;
  images: string[];
  fitment: string[];
  colors?: ColorVariant[];
};

export const CATEGORIES = [
  { slug: 'seguridad-y-proteccion', name: 'Seguridad y protección', short: 'Seguridad' },
  { slug: 'luces-y-electricos', name: 'Luces y eléctricos', short: 'Luces' },
  { slug: 'mecanica-y-mantenimiento', name: 'Mecánica y mantenimiento', short: 'Mecánica' },
  { slug: 'accesorios-y-personalizacion', name: 'Accesorios y personalización', short: 'Accesorios' },
  { slug: 'complementos-y-otros', name: 'Complementos y otros', short: 'Otros' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const PRODUCTS = raw as Product[];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsInCategory(slug: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

/** Categories that actually contain something. An empty chip is a dead end. */
export function activeCategories() {
  const counts = categoryCounts();
  return CATEGORIES.filter((c) => (counts[c.slug] ?? 0) > 0);
}

export function categoryCounts(): Record<string, number> {
  return PRODUCTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Products in the same category, excluding the current one. */
export function relatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

/** The catalogue is small enough to filter in memory on every keystroke. */
export function searchProducts(products: Product[], query: string): Product[] {
  const q = normalize(query.trim());
  if (!q) return products;
  const terms = q.split(/\s+/);
  return products.filter((p) => {
    const haystack = normalize(`${p.name} ${p.fitment.join(' ')} ${p.colors?.map((c) => c.name).join(' ') ?? ''}`);
    return terms.every((t) => haystack.includes(t));
  });
}

/** Lowercase and strip diacritics so "bujia" matches "bujía". */
export function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
