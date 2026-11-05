import Image from "next/image";

export default function Home() {
  return (
    <main>
      <p>Portfolio coming soon </p>
      <p style={{ fontFamily: "var(--font-bungee)", fontSize: 40 }}>
        Bungee test
      </p>
      <Image
        src="/images/gun.png"
        alt="Revolver"
        width={1216}
        height={643}
        style={{ width: 400, height: "auto" }}
      />
    </main>
  );
}
