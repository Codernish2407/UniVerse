import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";
export default function NotFound(){return <main className="not-found-page"><div className="not-found-orbit"><Orbit size={34}/></div><span className="eyebrow">LOST IN THE UNIVERSE?</span><h1>This page isn’t<br/><em>in this orbit.</em></h1><p>The link may have moved, or the page may not exist in this demo.</p><Link href="/" className="button button-primary"><ArrowLeft size={15}/> Back to UniVerse</Link></main>}
