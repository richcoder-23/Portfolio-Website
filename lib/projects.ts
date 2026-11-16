// ALL PROJECTS LIVE HERE.
// add a project = add an object to PROJECTS. the /works page and the
// project details page both read from this list, so nothing else needs editing.
//
// images go in public/images/projects/ and are written as "/images/projects/name.png".
// leave `image` out and the card shows a halftone placeholder instead of a broken picture.

export type Category = "coding" | "3d" | "art";

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: "coding",
    label: "Coding",
    blurb: "Websites and apps I've designed and built.",
  },
  {
    id: "3d",
    label: "3d & animation",
    blurb: "Models, renders and short animations.",
  },
  {
    id: "art",
    label: "Illustrations",
    blurb: "Drawings and digital paintings.",
  },
];

export type Picture = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string; // used in the URL: /works/<slug>
  title: string;
  category: Category;
  summary: string; // one or two sentences for the card
  tools: string[]; // tech stack, or the software you made it in
  image?: Picture;
  // optional short silent loop that plays on the card (the image shows while it loads,
  // and instead of it for visitors who turned on "reduce motion")
  video?: string;
  // the uncropped original for "View in full" (defaults to the card image)
  full?: string;
  // a full-length video (with sound) for "View in full" instead of a picture
  fullVideo?: string;
  status?: string; // optional red tag on the card, e.g. "In progress"
  links?: { href: string; label: string }[];
  // only the project with a details page needs this
  details?: {
    description: string[]; // paragraphs
    problem: string[];
    features: string[];
    screenshots: Picture[];
    learned: string[];
  };
};

export const PROJECTS: Project[] = [
  // ---------- CODING ----------
  {
    slug: "portfolio",
    title: "Revolver portfolio",
    category: "coding",
    summary:
      "This website. A portfolio where the menu is a revolver: pick a bullet, watch it load and fire, and that section opens.",
    tools: ["Next.js", "React", "TypeScript", "CSS Modules", "Vercel"],
    image: {
      src: "/images/projects/portfolio-card.png",
      alt: "The revolver menu: a halftone revolver with About, Works and Contact bullets beside it",
    },
    full: "/images/projects/portfolio-desktop.png",
    links: [
      {
        href: "https://richard-o-portfolio-website.vercel.app/",
        label: "Live site",
      },
      {
        href: "https://github.com/richcoder-23/Portfolio-Website",
        label: "Code on GitHub",
      },
    ],
    details: {
      description: [
        "My portfolio is built like a game menu. Instead of a navigation bar, a revolver sits on the screen with three bullets beside it: About, Works and Contact. Clicking a bullet plays a short sequence. A close-up of the cylinder slides in, the bullet drops into a chamber, the cylinder turns, the gun recoils and fires, and the chosen section slides in as if it were hit.",
        "The main inspiration is the Persona games, most of all the menus in Persona 5 Royal, where picking an option feels like an event: ransom-note lettering, angled panels and sharp, snappy transitions. I wanted my navigation to feel like that game menu rather than a website header, so I built my own version around a revolver and added comic-style halftone dots and hard black shadows.",
        "I designed it first as a mockup, then rebuilt it in Next.js as real, responsive components.",
      ],
      problem: [
        "Most student portfolios look the same: a hero, a grid of cards, a contact form. I wanted mine to show what I make before anyone reads a word, while still being quick to use and easy to read.",
        "The harder problem was turning a fixed-size design mockup into a site that works on every screen. The mockup was drawn for one desktop size, so on phones, tablets and short laptop screens the gun, bullets and text overlapped or drifted apart. Each screen shape needed its own layout without losing the feel of the design.",
      ],
      features: [
        "Revolver menu with a 1.5-second fire sequence: cylinder close-up, bullet loading, recoil, muzzle flash, tracer and screen shake.",
        "A small state machine (idle, loading, firing, open, closing) so the animation can't be interrupted or double-fired.",
        "A reusable ransom-note lettering component that styles every letter differently but still reads as one word to screen readers.",
        "Separate layouts for phones, tablets held upright, and laptops, so nothing overlaps or scrolls on any screen.",
        "Keyboard support: bullets can be tabbed to, and focus moves to the back button when a section opens.",
        "Respects the 'reduce motion' setting: shake and recoil are turned off and panels fade instead.",
        "A Works page and a project details page driven from one data file, so adding a project is one edit.",
      ],
      screenshots: [
        {
          src: "/images/projects/portfolio-desktop.png",
          alt: "The full revolver menu on a laptop: name tag, revolver, three bullets and the Pick your shot instruction",
          caption: "Desktop",
        },
        {
          src: "/images/projects/portfolio-loading.png",
          alt: "The loading close-up: the cylinder turning as the Works bullet drops into a chamber",
          caption: "Loading a bullet",
        },
        {
          src: "/images/projects/portfolio-about.png",
          alt: "The About panel open beside the revolver, with skills and two buttons",
          caption: "The About panel",
        },
        {
          src: "/images/projects/portfolio-category.png",
          alt: "The Illustrations category page with its ransom-note title and category tabs",
          caption: "A Works category page",
        },
        // { src: "/images/projects/portfolio-phone.png", alt: "Revolver menu on a phone", caption: "Phone" },
      ],
      learned: [
        "[Rewrite these in your own words.] Animations in CSS and timers in JavaScript have to agree. The fire sequence only works because each step in code waits exactly as long as the matching CSS animation lasts.",
        "Laying things out by percentage of screen height breaks on tall screens. On an upright iPad the gun drifted far from my name, so I switched to fixed distances from the top and gave tablets their own layout.",
        "The difference between 100vh and 100dvh: on phones and iPads, 100vh includes space hidden behind the browser toolbar, which made the page scroll.",
        "Splitting one moving object into nested layers (position, tilt, recoil), so separate animations don't overwrite each other's transforms.",
      ],
    },
  },

  {
    slug: "bptrnds",
    title: "Bptrnds",
    category: "coding",
    status: "In progress",
    summary:
      "A blood pressure tracker in the making: log readings over time, see your trends at a glance, and get AI-powered guidance to stay under 120/80. The landing page, log-in and sign-up screens are live; the tracking features come next.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    image: {
      src: "/images/projects/bptrnds.png",
      alt: "The Bptrnds landing page: the name in large black letters on a bright green background",
    },
    full: "/images/projects/full/bptrnds-full.jpg",
    links: [
      { href: "https://bptrnds.vercel.app/", label: "Live site" },
      {
        href: "https://github.com/richcoder-23/Bptrnds",
        label: "Code on GitHub",
      },
    ],
  },

  // ---------- 3D & ANIMATION ----------
  {
    slug: "mushroom-in-a-bottle",
    title: "Mushroom in a Bottle",
    category: "3d",
    summary:
      "A tiny mushroom ecosystem sealed inside a glass bottle. I was going for a semi-realistic render: believable glass with reflections and refraction, soft moss and grass, and warm, glowing light.",
    tools: ["Blender"],
    image: {
      src: "/images/projects/mushroom-bottle.jpg",
      alt: "Two red spotted mushrooms on a patch of moss inside a corked glass bottle, on a warm orange background",
    },
    full: "/images/projects/full/mushroom-bottle-full.jpg",
  },
  {
    slug: "phone-keychain",
    title: "Phone Keychain",
    category: "3d",
    summary:
      "A playful take on old-school phones, reimagined as a keychain charm. Glossy candy-pink casing, chunky lettered keys, a holographic \"Directed By\" screen and a chain looping around it, rendered like a nostalgic product shot.",
    tools: ["Blender"],
    image: {
      src: "/images/projects/phone-keychain.jpg",
      alt: "A glossy pink retro phone with a holographic Directed By screen and a silver chain looping around it",
    },
    full: "/images/projects/full/phone-keychain-full.jpg",
  },
  {
    slug: "vaso",
    title: "Vaso",
    category: "3d",
    summary:
      "Vaso is an original character of mine. This short teaser introduces them: the camera finds Vaso standing by a glowing platform, pushes in for a close-up, then pulls back. I modelled, rigged and animated the character, with outlined, comic-style shading.",
    tools: ["Blender"],
    image: {
      src: "/images/projects/vaso.jpg",
      alt: "Close-up of Vaso, a red block-headed character with spiky hair, a bandage over one eye and a dark jacket",
    },
    video: "/images/projects/vaso-loop.mp4",
    fullVideo: "/images/projects/full/vaso-full.mp4",
  },

  // ---------- ILLUSTRATIONS ----------
  {
    slug: "yellow-angel",
    title: "Yellow Angel",
    category: "art",
    summary:
      "A mix of graffiti and careful airbrushing: a glossy yellow figure with dripping, tag-style wings, set against a flat, loud red background for maximum contrast.",
    tools: ["Procreate"],
    image: {
      src: "/images/projects/yellow-angel.jpg",
      alt: "A small glossy yellow figure with a star on its helmet and white graffiti-style wings, on a bright red background",
    },
    full: "/images/projects/full/yellow-angel-full.jpg",
  },
  {
    slug: "cerberus-balloons",
    title: "Cerberus Balloons",
    category: "art",
    summary:
      "An abstract piece about emotions and the personas people wear. Three faces float like balloons over an erupting volcano, held by a sketched figure, and it carries my GodSaves trademark.",
    tools: ["Procreate"],
    image: {
      src: "/images/projects/cerberus-balloons.jpg",
      alt: "Three faces with different expressions floating like balloons above an erupting volcano, held by a sketched figure, with the words God Saves",
    },
    full: "/images/projects/full/cerberus-balloons-full.jpg",
  },
  {
    slug: "not-icarus",
    title: "Not Icarus",
    category: "art",
    summary:
      "My own take on the Icarus myth, painted loosely and without care for the fall: soft, burning wings, a glowing head and the line \"Not Icarus, but he got too close.\"",
    tools: ["Procreate"],
    image: {
      src: "/images/projects/not-icarus.jpg",
      alt: "A pale winged figure with coral-red feathered wings and a glowing head against a dark background, with the words Not Icarus but he got too close",
    },
    full: "/images/projects/full/not-icarus-full.jpg",
  },
];

export const projectsIn = (category: Category) =>
  PROJECTS.filter((p) => p.category === category);

export const projectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);