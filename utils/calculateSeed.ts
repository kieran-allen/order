import seed from "seed-random";

export type CalculateSeedReturn = {
  name: string;
  seed: number;
};

export function calculateSeed(
  name: string,
  round: number
): { name: string; seed: number } {
  const date = new Date();
  return {
    name,
    seed: seed(
      `${date.getUTCDate()}${date.getUTCMonth()}${date.getUTCFullYear()}${name}${round}`
    )(),
  };
}
