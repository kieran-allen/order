import { isArray } from "util";

export function generateNewQueryParams(
  names: string | string[],
  round: number
): string {
  const _names = Array.isArray(names) ? names : [names];
  return _names.reduce(
    (prev, curr, i) => (!i ? `?r=${round}&n=${curr}` : `${prev}&n=${curr}`),
    ""
  );
}
