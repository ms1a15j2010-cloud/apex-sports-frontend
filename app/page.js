import TestAPI from "../components/TestAPI";

export const metadata = {
  title: "Live Football Scores Today | Apex Sports",
  description: "Watch live football scores with real-time updates.",
};

export default function HomePage() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Live Football Scores</h1>
      <TestAPI />
    </main>
  );
}
