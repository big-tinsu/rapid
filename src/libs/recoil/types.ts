/* eslint-disable @typescript-eslint/no-explicit-any */
class AbstractRecoilValue<T> {
  key: string;
  private defaultValue?: T;
  private value?: T;

  constructor(key: string, defaultValue?: T) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
  }

  get() {
    return this.value;
  }

  set(value: T) {
    this.value = value;
  }

  reset() {
    this.value = this.defaultValue;
  }
}

export class RecoilState<T> extends AbstractRecoilValue<T> {
  constructor(key: string, defaultValue?: T) {
    super(key, defaultValue);
  }
}

export type RecoilContextState = {
  useRecoilValue: <T>(recoilValue: RecoilState<T>) => T;
  useSetRecoilState: <T>(recoilValue: RecoilState<T>) => (value: T) => void;
  useRecoilState: <T>(
    recoilValue: RecoilState<T>
  ) => [T, (value: T | ((x: T) => T)) => void];
  useResetRecoilState: <T>(recoilValue: RecoilState<T>) => () => void;
  useResetAllRecoilState: () => () => void;
};

export type AtomOptions<T = any> = {
  key: string;
  default?: T;
};
