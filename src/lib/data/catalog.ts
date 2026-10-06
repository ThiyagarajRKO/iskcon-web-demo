/**
 * Sample catalog used when API_URL is not set.
 * Replace with data from the Node/Sequelize backend — shapes match `@/lib/types`.
 * Copy, prices and specs are placeholders: verify every claim before launch.
 */
import type { Collection, ImageAsset, Product } from "@/lib/types";

const img = (file: string, width: number, height: number, alt: string): ImageAsset => ({
  src: `/images/${file}`,
  width,
  height,
  alt,
});

export const IMAGES = {
  silverShankha: img("silver-shankha.jpg", 2400, 1234, "Silver-mounted Shankha conch on a deep red background"),
  lotusShankha: img("lotus-shankha.jpg", 2400, 1548, "White Shankha conch hand-carved with a lotus motif"),
  pujaShankha: img("puja-shankha.jpg", 2400, 1600, "Puja Shankha with an engraved dark metal band"),
  ornateConch: img("ornate-ritual-conch.jpg", 2100, 1639, "Ritual conch inlaid with coral and turquoise, with silk tassels"),
  gildedConch: img("gilded-conch.jpg", 2400, 1504, "Conch set in a gilded mount with jewelled dragon relief"),
  carvedConch: img("carved-ritual-conch.jpg", 1387, 2400, "Upright conch carved with fine relief patterns"),
  trumpetShell: img("trumpet-shell.jpg", 2400, 1600, "Natural trumpet conch shell in warm light"),
  tigerCowrie: img("tiger-cowrie.jpg", 1792, 1371, "Tiger cowrie shell mounted on silver feet"),
  cowrieCollection: img("cowrie-collection.jpg", 2400, 1376, "A tray of natural cowrie shells"),
  amberCowrie: img("amber-cowrie.jpg", 2000, 1708, "Seven amber-toned cowrie shells on a pale ground"),
  nautilus: img("nautilus-chalice.jpg", 1800, 2400, "Mother-of-pearl nautilus shell set as a gilded chalice"),
  murexVelvet: img("murex-velvet.jpg", 2400, 1800, "Spider conch shell resting on blue velvet"),
  coneShell: img("cone-shell.jpg", 2400, 1496, "White cone shell with a tented amber pattern"),
  sundial: img("sundial-shell.jpg", 1972, 1924, "Top view of a sundial shell spiral"),
  spiral: img("spiral-shell.jpg", 1948, 2064, "Spiral shell with banded rings"),
  whiteMurex: img("white-murex.jpg", 2400, 1886, "White murex shell with fluted ridges"),
  pearlWhelk: img("pearl-whelk.jpg", 2400, 1128, "Pearl-white whelk shell on dark sand"),
  sandCockle: img("sand-cockle.jpg", 2400, 1754, "A single white cockle shell on sand casting a soft shadow"),
  cockleSand: img("cockle-sand.jpg", 2400, 1730, "A ribbed cockle shell on fine sand"),
} as const;

export const collections: Collection[] = [
  {
    slug: "sacred-shankha",
    name: "Sacred Shankha",
    tagline: "For the altar and daily puja",
    description:
      "A Shankha is a conch shell used in Hindu and Vaishnava worship. It is sounded at the start of arati, used to offer water and kept on the altar as an emblem of Lord Vishnu. Each piece in this collection is chosen for its form, sound and natural finish.",
    image: IMAGES.lotusShankha,
  },
  {
    slug: "blowing-conch",
    name: "Blowing Conch",
    tagline: "Resonant voices for kirtan",
    description:
      "Blowing conches are cut and finished at the tip so they can be sounded like a horn. They are used to open kirtan, temple arati and festivals. Larger, heavier shells give a deeper and longer tone.",
    image: IMAGES.carvedConch,
  },
  {
    slug: "heritage-mounted",
    name: "Heritage Mounted",
    tagline: "Silver, gilt and inlay",
    description:
      "Heritage mounted conches pair a natural shell with hand-worked silver, gilt or stone inlay by traditional metalsmiths. They are made to be displayed, gifted and passed down.",
    image: IMAGES.silverShankha,
  },
  {
    slug: "cowrie",
    name: "Cowrie",
    tagline: "Small shells, ancient meaning",
    description:
      "Cowrie shells are small, glossy sea shells once used as currency across the Indian Ocean. Today they are used in worship, jewellery and decoration. Sets are sorted by size and colour.",
    image: IMAGES.cowrieCollection,
  },
  {
    slug: "collector-shells",
    name: "Collector Shells",
    tagline: "Rare forms from the sea",
    description:
      "Collector shells are natural specimens chosen for rare form, pattern or colour — from spider conches to nautilus. Each is cleaned, documented and shipped with care.",
    image: IMAGES.nautilus,
  },
];

const shankhaFaqs = [
  {
    q: "How do I care for a Shankha?",
    a: "Rinse with clean water after use and dry it fully, mouth-down, on a soft cloth. Avoid detergents and long sun exposure. Store it on its stand or wrapped in cloth.",
  },
  {
    q: "Can this Shankha be used for daily puja?",
    a: "Yes. It can be kept on the altar, used to offer water during abhishek and placed on a stand when not in use.",
  },
];

const blowingFaqs = [
  {
    q: "Is this conch ready to blow?",
    a: "Yes. The tip is cut and smoothed, so it can be sounded straight away. New players usually need a few days of practice to produce a steady tone.",
  },
  {
    q: "How do I blow a conch?",
    a: "Press the tip firmly against closed, buzzing lips — as with a trumpet — and blow steadily from the diaphragm. Keep the shell's mouth facing outward.",
  },
];

export const products: Product[] = [
  {
    slug: "silver-mounted-shankha",
    sku: "SHK-HM-001",
    name: "Silver-Mounted Shankha",
    collection: "heritage-mounted",
    price: 125000,
    shortDescription: "Natural conch with a hand-chased silver mount and suspension ring.",
    description:
      "A natural conch shell fitted with a hand-chased silver mount, worked in floral repoussé by metalsmiths. The mount wraps the spire and ends in a suspension ring, so the piece can be displayed upright or on its side.",
    images: [IMAGES.silverShankha, IMAGES.pujaShankha],
    specs: [
      { label: "Length", value: "approx. 24 cm" },
      { label: "Mount", value: "Silver, hand-chased" },
      { label: "Finish", value: "Natural, hand-polished" },
      { label: "Includes", value: "Fitted case and care card" },
    ],
    inStock: true,
    isNew: true,
    faqs: shankhaFaqs,
  },
  {
    slug: "lotus-carved-puja-shankha",
    sku: "SHK-SS-002",
    name: "Lotus-Carved Puja Shankha",
    collection: "sacred-shankha",
    price: 8900,
    shortDescription: "White Shankha hand-carved with a lotus and banded rings.",
    description:
      "A white Shankha hand-carved with an eight-petal lotus at its centre and fine banded rings along the body. The lotus is an emblem of purity and of Lord Vishnu — a fitting piece for the home altar.",
    images: [IMAGES.lotusShankha, IMAGES.pujaShankha],
    specs: [
      { label: "Length", value: "approx. 15 cm" },
      { label: "Carving", value: "Hand-carved lotus" },
      { label: "Use", value: "Altar, abhishek" },
    ],
    inStock: true,
    isNew: true,
    faqs: shankhaFaqs,
  },
  {
    slug: "puja-shankha-engraved-band",
    sku: "SHK-SS-003",
    name: "Puja Shankha with Engraved Band",
    collection: "sacred-shankha",
    price: 14500,
    shortDescription: "Polished Shankha set in an engraved, darkened metal band.",
    description:
      "A polished white Shankha set in an engraved metal band with a darkened finish. The band protects the spire and gives the shell a stable base on the altar.",
    images: [IMAGES.pujaShankha, IMAGES.lotusShankha],
    specs: [
      { label: "Length", value: "approx. 18 cm" },
      { label: "Band", value: "Engraved metal" },
      { label: "Use", value: "Altar, display" },
    ],
    inStock: true,
    faqs: shankhaFaqs,
  },
  {
    slug: "coral-turquoise-ritual-conch",
    sku: "SHK-HM-004",
    name: "Coral & Turquoise Ritual Conch",
    collection: "heritage-mounted",
    price: 68000,
    shortDescription: "Conch with a silver sleeve inlaid with coral and turquoise.",
    description:
      "A ritual conch dressed in a silver sleeve set with coral and turquoise, finished with silk tassels. Made in the Himalayan tradition for ceremony and display.",
    images: [IMAGES.ornateConch, IMAGES.gildedConch],
    specs: [
      { label: "Length", value: "approx. 30 cm" },
      { label: "Mount", value: "Silver with stone inlay" },
      { label: "Tassels", value: "Silk" },
    ],
    inStock: true,
  },
  {
    slug: "gilded-dragon-conch",
    sku: "SHK-HM-005",
    name: "Gilded Dragon Conch",
    collection: "heritage-mounted",
    price: 240000,
    shortDescription: "Conch set in a gilded mount with jewelled dragon relief.",
    description:
      "A one-of-a-kind ceremonial conch set within a gilded mount, worked in high relief with dragons and set with coloured stones. A museum-style piece for serious collectors.",
    images: [IMAGES.gildedConch, IMAGES.ornateConch],
    specs: [
      { label: "Length", value: "approx. 38 cm" },
      { label: "Mount", value: "Gilt metal, stone-set" },
      { label: "Edition", value: "One of a kind" },
    ],
    inStock: true,
  },
  {
    slug: "carved-pilgrim-conch",
    sku: "SHK-BC-006",
    name: "Carved Pilgrim Conch",
    collection: "blowing-conch",
    price: 22000,
    shortDescription: "Large blowing conch carved in low relief along the body.",
    description:
      "A large blowing conch carved in low relief from spire to lip. The tip is cut and smoothed for sounding; the carving gives a sure grip during long kirtan.",
    images: [IMAGES.carvedConch, IMAGES.trumpetShell],
    specs: [
      { label: "Length", value: "approx. 28 cm" },
      { label: "Tone", value: "Deep, sustained" },
      { label: "Tip", value: "Cut and smoothed" },
    ],
    inStock: true,
    isNew: true,
    faqs: blowingFaqs,
  },
  {
    slug: "temple-trumpet-conch",
    sku: "SHK-BC-007",
    name: "Temple Trumpet Conch",
    collection: "blowing-conch",
    price: 6800,
    shortDescription: "Natural trumpet conch with a bright, carrying tone.",
    description:
      "A natural trumpet conch left in its raw, sculptural form. Prepared for blowing, it gives a bright tone that carries across a temple room.",
    images: [IMAGES.trumpetShell, IMAGES.carvedConch],
    specs: [
      { label: "Length", value: "approx. 20 cm" },
      { label: "Tone", value: "Bright" },
      { label: "Finish", value: "Natural" },
    ],
    inStock: true,
    faqs: blowingFaqs,
  },
  {
    slug: "tiger-cowrie-silver-feet",
    sku: "SHK-CW-008",
    name: "Tiger Cowrie on Silver Feet",
    collection: "cowrie",
    price: 9500,
    shortDescription: "Glossy tiger cowrie raised on four silver feet.",
    description:
      "A large, naturally glossy tiger cowrie raised on four silver feet — a small sculpture for the desk or altar.",
    images: [IMAGES.tigerCowrie, IMAGES.amberCowrie],
    specs: [
      { label: "Length", value: "approx. 9 cm" },
      { label: "Feet", value: "Silver" },
    ],
    inStock: true,
  },
  {
    slug: "natural-cowrie-set-108",
    sku: "SHK-CW-009",
    name: "Natural Cowrie Set of 108",
    collection: "cowrie",
    price: 2400,
    shortDescription: "108 hand-sorted natural cowries in a cloth pouch.",
    description:
      "One hundred and eight natural cowrie shells, hand-sorted for size and shine, packed in a cotton pouch. Used for worship, jewellery and craft.",
    images: [IMAGES.cowrieCollection, IMAGES.amberCowrie],
    specs: [
      { label: "Quantity", value: "108 shells" },
      { label: "Size", value: "1.5 – 2.5 cm" },
    ],
    inStock: true,
  },
  {
    slug: "amber-cowrie-set",
    sku: "SHK-CW-010",
    name: "Amber Cowrie Set",
    collection: "cowrie",
    price: 3200,
    shortDescription: "Seven polished cowries in warm amber tones.",
    description: "A set of seven polished cowrie shells graded from small to large, in warm amber and honey tones.",
    images: [IMAGES.amberCowrie, IMAGES.cowrieCollection],
    specs: [
      { label: "Quantity", value: "7 shells" },
      { label: "Finish", value: "Polished" },
    ],
    inStock: true,
  },
  {
    slug: "nautilus-chalice",
    sku: "SHK-CS-011",
    name: "Nautilus Chalice",
    collection: "collector-shells",
    price: 380000,
    shortDescription: "Mother-of-pearl nautilus set as a gilded standing cup.",
    description:
      "A pearlescent nautilus shell mounted as a standing cup on a gilded, sculpted stem — a centrepiece in the cabinet-of-curiosities tradition.",
    images: [IMAGES.nautilus, IMAGES.spiral],
    specs: [
      { label: "Height", value: "approx. 34 cm" },
      { label: "Mount", value: "Gilt metal" },
      { label: "Edition", value: "One of a kind" },
    ],
    inStock: true,
    isNew: true,
  },
  {
    slug: "spider-conch-specimen",
    sku: "SHK-CS-012",
    name: "Spider Conch Specimen",
    collection: "collector-shells",
    price: 5600,
    shortDescription: "Spider conch with long, sculptural digits.",
    description: "A spider conch with long, curving digits and a glossy apricot lip — a striking natural sculpture.",
    images: [IMAGES.murexVelvet, IMAGES.whiteMurex],
    specs: [{ label: "Length", value: "approx. 16 cm" }],
    inStock: true,
  },
  {
    slug: "textile-cone-shell",
    sku: "SHK-CS-013",
    name: "Tented Cone Shell",
    collection: "collector-shells",
    price: 4200,
    shortDescription: "White cone shell with a tented amber pattern.",
    description: "A smooth cone shell patterned in amber 'tents' over white — every pattern is unique.",
    images: [IMAGES.coneShell, IMAGES.pearlWhelk],
    specs: [{ label: "Length", value: "approx. 8 cm" }],
    inStock: true,
  },
  {
    slug: "sundial-shell",
    sku: "SHK-CS-014",
    name: "Sundial Shell",
    collection: "collector-shells",
    price: 3600,
    shortDescription: "A perfect spiral in cream and russet bands.",
    description: "A sundial shell whose flat spiral reads like a clock face, banded in cream and russet.",
    images: [IMAGES.sundial, IMAGES.spiral],
    specs: [{ label: "Diameter", value: "approx. 5 cm" }],
    inStock: false,
  },
  {
    slug: "white-murex",
    sku: "SHK-CS-015",
    name: "White Murex",
    collection: "collector-shells",
    price: 4800,
    shortDescription: "Fluted white murex with russet flecks.",
    description: "A fluted white murex with fine russet flecks along each ridge.",
    images: [IMAGES.whiteMurex, IMAGES.pearlWhelk],
    specs: [{ label: "Length", value: "approx. 11 cm" }],
    inStock: true,
  },
];

export const siteFaqs = [
  {
    q: "What is a Shankha?",
    a: "A Shankha is a conch shell used in Hindu and Vaishnava worship. It is sounded at the start of arati, used to offer water during abhishek and kept on the altar as an emblem of Lord Vishnu, who holds the Panchajanya conch.",
  },
  {
    q: "What is the difference between a puja Shankha and a blowing conch?",
    a: "A puja Shankha is kept on the altar and used to offer water, so its tip stays closed. A blowing conch has its tip cut and smoothed so it can be sounded like a horn during kirtan and arati.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship from India to most countries with tracked, insured delivery. Duties and taxes are shown at checkout where available.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders within India usually arrive in 3–7 working days. International orders usually arrive in 7–14 working days, depending on customs.",
  },
  {
    q: "How are fragile shells packed?",
    a: "Each shell is wrapped in cloth, cushioned and boxed individually, then packed in a rigid outer carton.",
  },
  {
    q: "Can I return an item?",
    a: "Unused items in their original packaging can be returned within 14 days of delivery. One-of-a-kind heritage pieces are final sale unless they arrive damaged.",
  },
];
