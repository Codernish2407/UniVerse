import { Navbar } from "@/components/features/landing/navbar/Navbar";
import Hero from "@/components/features/landing/hero/Hero";


export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
    </main>
  );
}