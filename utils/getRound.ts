export function getRound(round: string | string[]): number {
  if (Array.isArray(round)) {
    const [r] = round;
    return isNaN(Number(r)) ? 0 : Number(r);
  }
  return isNaN(Number(round)) ? 0 : Number(round);
}
