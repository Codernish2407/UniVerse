import { Navbar } from "@/components/features/landing/navbar/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="flex h-screen items-center justify-center">
        <h1 className="text-5xl font-bold text-white">
          Navbar Working ✅
        </h1>
      </div>
    </main>
  );
}