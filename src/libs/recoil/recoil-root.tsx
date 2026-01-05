/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { RecoilContext } from "./recoil-context";
import { RecoilState } from "./types";

export const RecoilRoot = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<Record<string, RecoilState<any>>>({});

  function setDefaultState<T>(recoilState: RecoilState<T>) {
    if (!state[recoilState.key]) {
      state[recoilState.key] = recoilState;
    }
  }

  function useRecoilValue<T>(recoilValue: RecoilState<T>) {
    setDefaultState(recoilValue);

    const retrievedValue = state[recoilValue.key];
    const value = retrievedValue.get();
    return value as T;
  }

  function useSetRecoilState<T>(recoilValue: RecoilState<T>) {
    setDefaultState(recoilValue);

    return (value: T | ((x: T) => T)) => {
      const retrievedValue = state[recoilValue.key];

      if (typeof value === "function") {
        const newValue = (value as (x: T) => T)(retrievedValue.get());
        retrievedValue.set(newValue);
        setState({ ...state, [recoilValue.key]: retrievedValue });
      } else {
        retrievedValue.set(value);
        setState({ ...state, [recoilValue.key]: retrievedValue });
      }
    };
  }

  function useRecoilState<T>(recoilValue: RecoilState<T>) {
    setDefaultState(recoilValue);

    const value = useRecoilValue(recoilValue);
    const setValue = useSetRecoilState(recoilValue);
    return [value, setValue] as [T, (value: T | ((x: T) => T)) => void];
  }

  function useResetRecoilState<T>(recoilValue: RecoilState<T>) {
    setDefaultState(recoilValue);

    return () => {
      const retrievedValue = state[recoilValue.key];
      retrievedValue.reset();
      setState({ ...state, [recoilValue.key]: retrievedValue });
    };
  }

  function useResetAllRecoilState() {
    return () => {
      Object.keys(state).forEach((key) => {
        const retrievedValue = state[key];
        retrievedValue.reset();
        setState({ ...state, [key]: retrievedValue });
      });
    };
  }

  return (
    <RecoilContext.Provider
      value={{
        useRecoilValue,
        useSetRecoilState,
        useRecoilState,
        useResetRecoilState,
        useResetAllRecoilState,
      }}
    >
      {children}
    </RecoilContext.Provider>
  );
};
