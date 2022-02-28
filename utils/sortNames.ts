import { calculateSeed } from "./calculateSeed";

export function sortNames(names: string[], round: number): string[] {
  return names
    .map((n) => calculateSeed(n, round))
    .sort((a, b) => a.seed - b.seed)
    .map((n) => n.name);
}
