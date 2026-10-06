export type Collection = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const heroImage = unsplash("photo-1490481651871-ab68de25d43d");

export const collections: Collection[] = [
  {
    id: "women",
    title: "Womenswear",
    description: "Tailoring and drape, built for movement.",
    href: "/collections/women",
    image: unsplash("photo-1483985988355-763728e1935b"),
  },
  {
    id: "men",
    title: "Menswear",
    description: "Considered layers in quiet, lasting colors.",
    href: "/collections/men",
    image: unsplash("photo-1516257984-b1b4d707412e"),
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Leather goods and jewelry, made to last.",
    href: "/collections/accessories",
    image: unsplash("photo-1591047139829-d91aecb6caea"),
  },
];

export const editorial = {
  title: "The Atelier Journal",
  kicker: "In the studio",
  heading: "Craft, considered at every seam.",
  copy: "Every piece begins as a sketch on the studio wall and ends in the hands of artisans who have spent decades perfecting a single stitch. We work with small mills and family-run ateliers across Europe to produce collections that are engineered to outlast the season they were made for.",
  href: "/journal/craft-considered",
  image: unsplash("photo-1441984904996-e0b6ba687e04"),
};
