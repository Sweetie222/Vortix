export type Category =
  | "Seguridad y Protección"
  | "Luces y Eléctricos"
  | "Mecánica y Mantenimiento"
  | "Accesorios y Personalización"
  | "Complementos / Otros";

export type Product = {
  ID: number;
  name: string;
  price: string;
  images: string[];
  category?: Category;
};

export type FilterState = {
  selected: Category | "Todos";
};

export const CATEGORIES: Category[] = [
  "Seguridad y Protección",
  "Luces y Eléctricos",
  "Mecánica y Mantenimiento",
  "Accesorios y Personalización",
  "Complementos / Otros",
];

// Fallback temporal - mapeo de ID a categoría
export const categoryById: Record<number, Category> = {
  // Seguridad y Protección
  1: "Seguridad y Protección",
  33: "Seguridad y Protección",
  32: "Seguridad y Protección",
  38: "Seguridad y Protección",
  42: "Seguridad y Protección",
  30: "Seguridad y Protección",
  15: "Seguridad y Protección",
  7: "Seguridad y Protección",
  44: "Seguridad y Protección",
  6: "Seguridad y Protección",

  // Luces y Eléctricos
  16: "Luces y Eléctricos",
  17: "Luces y Eléctricos",
  21: "Luces y Eléctricos",
  40: "Luces y Eléctricos",
  27: "Luces y Eléctricos",
  28: "Luces y Eléctricos",
  29: "Luces y Eléctricos",
  9: "Luces y Eléctricos",

  // Mecánica y Mantenimiento
  10: "Mecánica y Mantenimiento",
  11: "Mecánica y Mantenimiento",
  31: "Mecánica y Mantenimiento",
  12: "Mecánica y Mantenimiento",
  34: "Mecánica y Mantenimiento",
  35: "Mecánica y Mantenimiento",
  39: "Mecánica y Mantenimiento",
  36: "Mecánica y Mantenimiento",
  37: "Mecánica y Mantenimiento",
  24: "Mecánica y Mantenimiento",
  25: "Mecánica y Mantenimiento",

  // Accesorios y Personalización
  2: "Accesorios y Personalización",
  3: "Accesorios y Personalización",
  4: "Accesorios y Personalización",
  5: "Accesorios y Personalización",
  8: "Accesorios y Personalización",
  43: "Accesorios y Personalización",
  20: "Accesorios y Personalización",
  19: "Accesorios y Personalización",
  14: "Accesorios y Personalización",
  41: "Accesorios y Personalización",
  18: "Accesorios y Personalización",
  23: "Accesorios y Personalización",
  22: "Accesorios y Personalización",
  13: "Accesorios y Personalización",
  26: "Accesorios y Personalización",
};

export function normalizeCategory(p: Product): Category {
  return p.category ?? categoryById[p.ID] ?? "Complementos / Otros";
}

export function filterProducts(
  products: Product[],
  state: FilterState
): Product[] {
  if (state.selected === "Todos") return products;
  return products.filter((p) => normalizeCategory(p) === state.selected);
}

