import RansomWord from "@/components/ransom/RansomWord";

export default function Home() {
  return (
    <main style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
       <h1 style={{ background: "var(--paper)", padding: 24, margin: 0, fontSize: 30, fontWeight: 400 }}>
        <RansomWord text="Richard Okelu" />
      </h1>
      <div style={{ background: "var(--paper)", padding: 24, fontSize: 30 }}>
        <RansomWord text="Works" />
      </div>
    </main>
  );
}
