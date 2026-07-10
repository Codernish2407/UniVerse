import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-2xl border-border bg-card p-10 text-center shadow-2xl">
        <h1 className="mb-4 text-6xl font-bold text-primary">
          🌌 UniVerse
        </h1>

        <p className="mb-8 text-xl text-gray-300">
          Everything a student needs, in one universe.
        </p>

        <Button
          size="lg"
          className="bg-primary text-white hover:bg-secondary"
        >
          Coming Soon 🚀
        </Button>
      </Card>
    </main>
  );
}