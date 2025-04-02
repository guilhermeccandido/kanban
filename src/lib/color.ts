import { PROJECT_COLORS } from "./const";

let cache = new Map<string, { bg: string; badge: string }>();

export const getLabelColor = (label: string) => {
  if (cache.has(label)) return cache.get(label)!;

  let hashValue = 0;
  for (let i = 0; i < label.length; i++) {
    const charCode = label.charCodeAt(i);
    hashValue = (hashValue << 5) - hashValue + charCode;
    hashValue |= 0;
  }

  hashValue = Math.abs(hashValue);

  const colorIndex = hashValue % PROJECT_COLORS.length;

  cache.set(label, PROJECT_COLORS[colorIndex]);
  return PROJECT_COLORS[colorIndex];
};
