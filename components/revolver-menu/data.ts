export type Section = "about" | "works" | "contact";

export const SECTIONS: { id: Section; label: string }[] = [
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

export const labelOf = (id: Section) => SECTIONS.find((s) => s.id === id)!.label;

// where each chamber sits in cylinder.png, as % of its width and height
export const CHAMBERS: [number, number][] = [
  [21.67, 34.91], [48.3, 17.81], [76.53, 32.97],
  [78.33, 65.06], [51.33, 82.19], [23.03, 67.13],
];

// rotating the cylinder by this much puts a chamber exactly at 9 o'clock
export const BASE_ANGLE = 32.5;

export const WORK_LINKS = [
  { href: "#all-works", label: "All works" },
  { href: "#3d", label: "3d & animation" },
  { href: "#coding", label: "Coding" },
  { href: "#art", label: "Illustrations" },
];