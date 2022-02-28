import { calculateSeed } from "./calculateSeed";

export function sortNames(names: string[]): string[] {
  return names
    .map((n, i) => calculateSeed(n, i))
    .sort((a, b) => a.seed - b.seed)
    .map((n) => n.name);
}
