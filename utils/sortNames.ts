import { calculateSeed } from "./calculateSeed";

export function sortNames(names: string[]): string[] {
  return names
    .map(calculateSeed)
    .sort((a, b) => a.seed - b.seed)
    .map((n) => n.name);
}
