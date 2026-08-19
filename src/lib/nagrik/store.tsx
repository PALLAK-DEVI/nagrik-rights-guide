import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CaseRecord, DocumentRecord, Profile } from "./types";

/**
 * Local persistence layer.
 *
 * Everything is namespaced and shaped like the eventual database tables
 * (profiles, cases, case_answers, documents) so it can be swapped for
 * Lovable Cloud / Supabase without touching the UI.
 */

const KEY = "nagrikai.v1";

interface State {
  profile: Profile | null;
  cases: CaseRecord[];
  documents: DocumentRecord[];
}

const empty: State = { profile: null, cases: [], documents: [] };

interface Store extends State {
  ready: boolean;
  signIn: (p: Profile) => void;
  signOut: () => void;
  updateProfile: (p: Partial<Profile>) => void;
  saveCase: (c: CaseRecord) => void;
  getCase: (id: string) => CaseRecord | undefined;
  deleteCase: (id: string) => void;
  saveDocument: (d: DocumentRecord) => void;
  deleteDocument: (id: string) => void;
  reset: () => void;
}

const Ctx = createContext<Store | null>(null);

function read(): State {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as State) } : empty;
  } catch {
    return empty;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  const persist = useCallback((next: State | ((s: State) => State)) => {
    setState((prev) => {
      const value = typeof next === "function" ? (next as (s: State) => State)(prev) : next;
      try {
        window.localStorage.setItem(KEY, JSON.stringify(value));
      } catch {
        /* storage unavailable */
      }
      return value;
    });
  }, []);

  const value = useMemo<Store>(
    () => ({
      ...state,
      ready,
      signIn: (profile) => persist((s) => ({ ...s, profile })),
      signOut: () => persist((s) => ({ ...s, profile: null })),
      updateProfile: (p) =>
        persist((s) => ({ ...s, profile: s.profile ? { ...s.profile, ...p } : s.profile })),
      saveCase: (c) =>
        persist((s) => ({
          ...s,
          cases: [c, ...s.cases.filter((x) => x.id !== c.id)],
        })),
      getCase: (id) => state.cases.find((c) => c.id === id),
      deleteCase: (id) => persist((s) => ({ ...s, cases: s.cases.filter((c) => c.id !== id) })),
      saveDocument: (d) =>
        persist((s) => ({ ...s, documents: [d, ...s.documents.filter((x) => x.id !== d.id)] })),
      deleteDocument: (id) =>
        persist((s) => ({ ...s, documents: s.documents.filter((d) => d.id !== id) })),
      reset: () => persist(empty),
    }),
    [state, ready, persist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
