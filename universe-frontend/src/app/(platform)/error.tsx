"use client";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <div className="empty-state"><div className="empty-orbit"><RefreshCw size={20}/></div><h3>Something interrupted this orbit.</h3><p>This page hit an unexpected error. Your locally saved demo data should remain in this browser.</p><button className="button button-primary" onClick={() => reset()}>Try again</button></div>; }
