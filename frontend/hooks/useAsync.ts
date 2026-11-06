"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Load async data with loading/error state and a manual reload.
 * `deps` must be primitives (they are compared via JSON) so pages stay free of fetch plumbing.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const fnRef = useRef(fn);
  useEffect(() => { fnRef.current = fn; });
  const depKey = JSON.stringify(deps);

  useEffect(() => {
    let live = true;
    fnRef.current()
      .then((d) => { if (live) { setData(d); setError(null); setLoading(false); } })
      .catch(() => { if (live) { setError("Something went wrong while loading this data."); setLoading(false); } });
    return () => { live = false; };
  }, [tick, depKey]);

  const reload = useCallback(async () => { setTick((t) => t + 1); }, []);
  return { data, loading, error, reload, setData };
}
