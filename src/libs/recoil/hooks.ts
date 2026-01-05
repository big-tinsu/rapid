'use client';
import { useContext } from "react";
import { RecoilContext } from "./recoil-context";
import { RecoilState } from "./types";

/**
 * Returns the value of an atom and subscribes the component to future updates of that state.
 * @param recoilValue
 * @returns value
 */
export function useRecoilValue<T>(recoilValue: RecoilState<T>) {
  const context = useContext(RecoilContext);

  if (!context) {
    throw new Error("useRecoilValue must be used within a RecoilRoot");
  }
  return context.useRecoilValue(recoilValue);
}

/**
 * Returns a setter function for updating Recoil state. Does not subscribe
 * the component to the given state.
 * @param recoilValue
 * @returns setter function
 */
export function useSetRecoilState<T>(recoilValue: RecoilState<T>) {
  const context = useContext(RecoilContext);

  if (!context) {
    throw new Error("useSetRecoilState must be used within a RecoilRoot");
  }
  return context.useSetRecoilState(recoilValue);
}

/**
 * Returns a tuple where the first element is the value of the recoil state
 * and the second is a setter to update that state. Subscribes component
 * to updates of the given state.
 * @param recoilValue
 * @returns [value, setValue]
 */
export function useRecoilState<T>(recoilValue: RecoilState<T>) {
  const context = useContext(RecoilContext);

  if (!context) {
    throw new Error("useRecoilState must be used within a RecoilRoot");
  }
  return context.useRecoilState(recoilValue);
}

/**
 * Returns a function that will reset the given state to its default value.
 * @param recoilValue
 * @returns
 */
export function useResetRecoilState<T>(recoilValue: RecoilState<T>) {
  const context = useContext(RecoilContext);

  if (!context) {
    throw new Error("useResetRecoilState must be used within a RecoilRoot");
  }
  return context.useResetRecoilState(recoilValue);
}

/**
 * Returns a function that will reset all Recoil states to their default values.
 * @returns
 */
export function useResetAllRecoilState() {
  const context = useContext(RecoilContext);

  if (!context) {
    throw new Error("useResetAllRecoilState must be used within a RecoilRoot");
  }

  return context.useResetAllRecoilState();
}
