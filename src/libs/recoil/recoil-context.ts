'use client';
import { createContext } from "react";
import { RecoilContextState } from "./types";

export const RecoilContext = createContext<RecoilContextState | null>(null);
