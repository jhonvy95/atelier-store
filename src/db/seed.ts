import "dotenv/config";
import { db } from "./index";
import { categories, products, stock } from "./schema";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

const CATEGORY_DEFS = [
  { slug: "outerwear", name: "Outerwear" },
  { slug: "dresses", name: "Dresses" },
  { slug: "tailoring", name: "Tailoring" },
  { slug: "knitwear", name: "Knitwear" },
  { slug: "accessories", name: "Accessories" },
  { slug: "skirts", name: "Skirts" },
  { slug: "footwear", name: "Footwear" },
] as const;

type CategorySlug = (typeof CATEGORY_DEFS)[number]["slug"];

const PRODUCT_DEFS: Array<{
  slug: string;
  name: string;
  category: CategorySlug;
  priceCents: number;
  image: string;
  imageDetail: string;
  description: string;
  details: string[];
  isNew: boolean;
  quantity: number;
}> = [
  {
    slug: "wool-tailored-coat",
    name: "Wool Tailored Coat",
    category: "outerwear",
    priceCents: 62000,
    image: unsplash("photo-1539533018447-63fcce2678e3"),
    imageDetail: unsplash("photo-1608234807905-4466023792f5"),
    description:
      "A double-faced wool coat cut for a clean, tailored silhouette. Finished with horn buttons and a hand-stitched interior canvas that holds its shape season after season.",
    details: [
      "100% double-faced wool",
      "Fully lined, interior chest pocket",
      "Made in Portugal",
      "Dry clean only",
    ],
    isNew: true,
    quantity: 20,
  },
  {
    slug: "silk-slip-dress",
    name: "Silk Slip Dress",
    category: "dresses",
    priceCents: 34000,
    image: unsplash("photo-1595777457583-95e059d581b8"),
    imageDetail: unsplash("photo-1554568218-0f1715e72254"),
    description:
      "Cut on the bias from mulberry silk, this slip dress skims the body without clinging. Adjustable straps and a bias-cut hem give it a fluid, undone drape.",
    details: [
      "100% mulberry silk",
      "Adjustable straps",
      "Made in Italy",
      "Hand wash cold",
    ],
    isNew: true,
    quantity: 3,
  },
  {
    slug: "structured-blazer",
    name: "Structured Blazer",
    category: "tailoring",
    priceCents: 48000,
    image: unsplash("photo-1594938298603-c8148c4dae35"),
    imageDetail: unsplash("photo-1571945153237-4929e783af4a"),
    description:
      "A single-breasted blazer with a sharp shoulder and nipped waist, built on a half-canvas construction for structure that softens with wear.",
    details: [
      "Wool-blend twill",
      "Half-canvas construction",
      "Made in Portugal",
      "Dry clean only",
    ],
    isNew: false,
    quantity: 18,
  },
  {
    slug: "cashmere-knit-sweater",
    name: "Cashmere Knit Sweater",
    category: "knitwear",
    priceCents: 29000,
    image: unsplash("photo-1576871337622-98d48d1cf531"),
    imageDetail: unsplash("photo-1445205170230-053b83016050"),
    description:
      "Knitted from grade-A Mongolian cashmere in a relaxed fit, with a ribbed crew neckline and dropped shoulder seam for easy, everyday layering.",
    details: [
      "100% grade-A cashmere",
      "Ribbed cuffs and hem",
      "Made in Scotland",
      "Hand wash cold",
    ],
    isNew: true,
    quantity: 25,
  },
  {
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    category: "accessories",
    priceCents: 41000,
    image: unsplash("photo-1584917865442-de89df76afd3"),
    imageDetail: unsplash("photo-1601924994987-69e26d50dc26"),
    description:
      "A structured tote in vegetable-tanned leather that develops a rich patina over time. Sized to carry a laptop, with an interior zip pocket and magnetic close.",
    details: [
      "Vegetable-tanned full-grain leather",
      "Interior zip and slip pockets",
      "Made in Spain",
      "Wipe clean",
    ],
    isNew: false,
    quantity: 0,
  },
  {
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    category: "skirts",
    priceCents: 26000,
    image: unsplash("photo-1551803091-e20673f15770"),
    imageDetail: unsplash("photo-1524504388940-b1c1722653e1"),
    description:
      "Fine knife pleats fall from a fitted waistband into a fluid midi length, cut from a lightweight crepe that holds movement without adding bulk.",
    details: [
      "Crepe, fully lined",
      "Concealed side zip",
      "Made in Portugal",
      "Dry clean only",
    ],
    isNew: false,
    quantity: 14,
  },
  {
    slug: "merino-turtleneck",
    name: "Merino Turtleneck",
    category: "knitwear",
    priceCents: 21000,
    image: unsplash("photo-1434389677669-e08b4cac3105"),
    imageDetail: unsplash("photo-1469334031218-e382a71b716b"),
    description:
      "A fine-gauge merino turtleneck designed as a year-round layering piece, with a close-to-body fit and a soft, non-itch handle.",
    details: [
      "100% extra-fine merino wool",
      "Fitted silhouette",
      "Made in Italy",
      "Hand wash cold",
    ],
    isNew: false,
    quantity: 2,
  },
  {
    slug: "leather-ankle-boots",
    name: "Leather Ankle Boots",
    category: "footwear",
    priceCents: 39000,
    image: unsplash("photo-1543163521-1bf539c55dd2"),
    imageDetail: unsplash("photo-1560243563-062bfc001d68"),
    description:
      "A Chelsea-style ankle boot built on a leather sole with a stacked block heel, finished with an elastic side gusset for an easy fit.",
    details: [
      "Full-grain leather upper",
      "Leather sole, stacked heel",
      "Made in Portugal",
      "Condition with leather balm",
    ],
    isNew: true,
    quantity: 16,
  },
];

async function main() {
  const categoryIds = new Map<CategorySlug, string>();

  for (const category of CATEGORY_DEFS) {
    const [row] = await db
      .insert(categories)
      .values({ slug: category.slug, name: category.name })
      .returning({ id: categories.id });
    categoryIds.set(category.slug, row.id);
  }

  for (const product of PRODUCT_DEFS) {
    const categoryId = categoryIds.get(product.category);
    if (!categoryId) {
      throw new Error(`Unknown category slug: ${product.category}`);
    }

    const [row] = await db
      .insert(products)
      .values({
        slug: product.slug,
        name: product.name,
        categoryId,
        description: product.description,
        details: product.details,
        image: product.image,
        imageDetail: product.imageDetail,
        priceCents: product.priceCents,
        isNew: product.isNew,
      })
      .returning({ id: products.id });

    await db.insert(stock).values({
      productId: row.id,
      quantity: product.quantity,
    });
  }

  console.log(
    `Seeded ${CATEGORY_DEFS.length} categories and ${PRODUCT_DEFS.length} products.`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
