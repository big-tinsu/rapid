'use client';
import { AtomOptions, RecoilState } from "./types";

export function atom<T>(options: AtomOptions<T>) {
  return new RecoilState<T>(options.key, options.default);
}
