/**
 * Long-form copy shown under each listing (SEO / AEO). Keyed by collection slug.
 * Inline links use [label](/path). Placeholder copy: verify every claim before launch.
 */
import type { ListingGuide } from "@/lib/types";

export const allCreationsGuide: ListingGuide = {
  intro:
    "The Shankha collection brings together sacred conches, shell jewellery and collector specimens from the coasts of India. Each piece is hand-selected, cleaned and finished by craftspeople who have worked with shell for generations, then wrapped and shipped to devotees and collectors around the world.",
  faqs: [
    {
      q: "What can I find in the collection?",
      a: "For worship, there are [Sacred Shankha](/collections/sacred-shankha) for the altar and daily puja, and [Blowing Conch](/collections/blowing-conch) for kirtan and arati. For everyday wear, explore [women's chains](/collections/womens-chains), [rings](/collections/womens-rings), [shakha bangles](/collections/womens-bangles) and [earrings](/collections/womens-earrings). Collectors will find [Heritage Mounted](/collections/heritage-mounted) pieces and rare [Collector Shells](/collections/collector-shells).",
    },
    {
      q: "Are the shells natural?",
      a: "Yes. Every conch and cowrie is a natural shell. Some are hand-carved or set in silver and gold, but none are cast or moulded. Because each shell is unique, small differences in size, colour and pattern from the photographs are to be expected.",
    },
    {
      q: "Do you ship outside India?",
      a: "Yes. Orders are tracked and insured, and shipped worldwide in a cloth-wrapped gift box. See [Shipping & Returns](/shipping-returns) for delivery times and costs.",
    },
  ],
};

export const guides: Record<string, ListingGuide> = {
  "womens-chains": {
    intro:
      "Our women's chains pair fine metalwork with the sacred forms of the sea. Gold and silver links are finished with small Shankha and cowrie charms, and natural shell strands are strung by hand — pieces light enough to wear every day and meaningful enough to wear to the temple.",
    faqs: [
      {
        q: "What types of chains are available for women?",
        a: "Choose from [gold chains](/collections/womens-chains/gold-chains) in twisted and charm styles, [silver chains](/collections/womens-chains/silver-chains) set with cowries, and hand-strung [shell chains](/collections/womens-chains/shell-chains) in the style of a kanthi. Each can be worn alone or layered with a [pendant](/collections/womens-pendants).",
      },
      {
        q: "What is a Valampuri charm?",
        a: "Valampuri is a right-turning conch — rare in nature and traditionally associated with Lakshmi and Vishnu. Our Valampuri chains carry small charms cut from or modelled on this shell, so its meaning can be worn close.",
      },
      {
        q: "How do I care for a shell or cowrie chain?",
        a: "Keep it away from perfume, soap and long contact with water, and wipe it with a soft dry cloth after wearing. Store it flat or hung, apart from other jewellery, so the shell does not scratch.",
      },
    ],
  },
  "womens-rings": {
    intro:
      "Rings in gold and silver, set with natural conch shell, navaratna stones or engraved signets. Every ring is made to order in your size, so it arrives ready to wear.",
    faqs: [
      {
        q: "Which ring styles can I choose from?",
        a: "Engraved [gold rings](/collections/womens-rings/gold-rings) such as the Lakshmi signet, [silver rings](/collections/womens-rings/silver-rings) with navaratna inlay, and smooth [shell rings](/collections/womens-rings/shell-rings) cut from a single piece of conch.",
      },
      {
        q: "What is a navaratna ring?",
        a: "Navaratna means \"nine gems\". A navaratna ring sets nine stones — traditionally ruby, pearl, coral, emerald, yellow sapphire, diamond, blue sapphire, hessonite and cat's eye — each linked to one of the nine celestial bodies.",
      },
      {
        q: "How do I find my ring size?",
        a: "Measure the inside diameter of a ring that already fits, or ask a [Client Advisor](/contact) for a printable sizer. Rings are made to order, so please check your size before placing an order.",
      },
    ],
  },
  "womens-bangles": {
    intro:
      "Shakha bangles are cut from a single conch shell and polished by hand. Worn in pairs — often with the red pola — they are a symbol of marriage in Bengal, and are equally loved simply for their soft, luminous white.",
    faqs: [
      {
        q: "What is the difference between shakha and gold-capped bangles?",
        a: "Classic [shakha](/collections/womens-bangles/shakha) bangles are pure, natural shell, sometimes carved with a lotus band. [Gold-capped](/collections/womens-bangles/gold-capped) bangles add a hand-chased gold band at the joins, for ceremonies and festivals.",
      },
      {
        q: "How do I choose my bangle size?",
        a: "Bangle sizes such as 2.4, 2.6 and 2.8 refer to the inner diameter in inches. Measure across the widest part of your hand with your fingers held together, or compare with a bangle that already fits.",
      },
    ],
  },
  "womens-earrings": {
    intro:
      "Earrings in gold, shell and cowrie — from temple-style jhumkas for weddings and festivals to light shell studs for every day.",
    faqs: [
      {
        q: "Which earring styles are available?",
        a: "Traditional [jhumkas](/collections/womens-earrings/jhumka) with granulated domes, cowrie [drops](/collections/womens-earrings/drops) on silver hooks, and small pearl-white shell [studs](/collections/womens-earrings/studs).",
      },
      {
        q: "Are the earrings suitable for sensitive ears?",
        a: "Hooks and posts are made in sterling silver or gold. If you have a known metal allergy, ask a [Client Advisor](/contact) before ordering.",
      },
    ],
  },
  "womens-necklaces": {
    intro:
      "Necklaces that let the shell take centre stage — statement collars of graduated shell plaques and finely beaded strands with Shankha and cowrie drops.",
    faqs: [
      {
        q: "Collar or beaded — which should I choose?",
        a: "A [collar](/collections/womens-necklaces/collars) sits flat at the base of the neck and suits open necklines and occasions. A [beaded](/collections/womens-necklaces/beaded) strand is lighter and longer, easy to wear daily or layer with a [chain](/collections/womens-chains).",
      },
      {
        q: "Why are cowries used in jewellery?",
        a: "Cowries were once used as currency across the Indian Ocean and have long been associated with prosperity and protection. Today they remain a popular, natural material for necklaces and earrings.",
      },
    ],
  },
  "womens-pendants": {
    intro:
      "Small emblems to keep close: pendants in gold, silver and natural shell, carrying the forms of the Shankha, Lakshmi and Panchajanya.",
    faqs: [
      {
        q: "What pendants are available?",
        a: "Granulated [gold pendants](/collections/womens-pendants/gold-pendants), and [shell pendants](/collections/womens-pendants/shell-pendants) such as a miniature Valampuri Shankha or a conch set in silver. All pendants are sized to wear on one of our [chains](/collections/womens-chains).",
      },
      {
        q: "What does the Panchajanya represent?",
        a: "Panchajanya is the conch of Lord Krishna, sounded at the start of the battle of Kurukshetra in the Bhagavad Gita. A Panchajanya pendant is worn as a reminder of His protection.",
      },
    ],
  },
  "mens-rings": {
    intro:
      "Heavier signets and navaratna rings in silver and gold, made to order in your size.",
    faqs: [
      {
        q: "Which men's rings are available?",
        a: "Choose a [silver ring](/collections/mens-rings/silver-rings) with navaratna inlay, or a [gold ring](/collections/mens-rings/gold-rings) such as the signet engraved with the Panchajanya conch.",
      },
      {
        q: "Can a ring be resized later?",
        a: "Silver and gold signets can usually be resized by one or two sizes. Inlaid rings are harder to alter, so please confirm your size first. A [Client Advisor](/contact) can help.",
      },
    ],
  },
  "sacred-shankha": {
    intro:
      "The Shankha is sounded at the start of arati, used to offer water during abhishek and kept on the altar as an emblem of Lord Vishnu. Each Shankha in this collection is chosen for its form, sound and natural finish, and arrives ready for worship.",
    faqs: [
      {
        q: "What is the difference between a Valampuri and an Idampuri Shankha?",
        a: "It is the direction of the spiral. A Valampuri Shankha opens to the right — rare in nature and traditionally kept on the altar for Lakshmi and Vishnu. An Idampuri Shankha opens to the left, is far more common, and is the conch most often used for daily puja.",
      },
      {
        q: "Which Shankha should I choose for my altar?",
        a: "For daily abhishek and offering water, a smaller [Puja Shankha](/collections/sacred-shankha/puja-shankha) is easiest to handle. For a centrepiece kept on a stand, choose a larger [Altar Shankha](/collections/sacred-shankha/altar-shankha). If you want to sound the conch in kirtan, see [Blowing Conch](/collections/blowing-conch).",
      },
      {
        q: "How do I care for a Shankha?",
        a: "Rinse it with clean water after use and dry it fully, mouth-down, on a soft cloth. Avoid detergents and long sun exposure, and store it on its stand or wrapped in cloth.",
      },
    ],
  },
  "blowing-conch": {
    intro:
      "Blowing conches are cut and finished at the tip so they can be sounded like a horn — used to open kirtan, temple arati and festivals. Larger, heavier shells give a deeper and longer tone.",
    faqs: [
      {
        q: "What do the names Panchajanya and Devadatta mean?",
        a: "In the Bhagavad Gita, Lord Krishna sounds the Panchajanya and Arjuna sounds the Devadatta. Our conches carry these names to mark their size and voice: the Panchajanya is the deeper, fuller conch, the Devadatta the brighter.",
      },
      {
        q: "Is it hard to learn to blow a conch?",
        a: "Most people produce a steady tone within a few days. Press the tip firmly against closed, buzzing lips — as with a trumpet — and blow steadily from the diaphragm.",
      },
    ],
  },
  "heritage-mounted": {
    intro:
      "Natural conches dressed by traditional metalsmiths in hand-chased silver, gilt and stone inlay — made to be displayed, gifted and passed down.",
    faqs: [
      {
        q: "How are heritage mounted conches made?",
        a: "A natural shell is chosen first, then a mount is shaped around it by hand and worked in repoussé, chasing or inlay. Because each mount is fitted to one shell, no two pieces are identical.",
      },
      {
        q: "Can a mounted conch be used in worship?",
        a: "Yes, though most are kept for display. For daily puja, a lighter [Sacred Shankha](/collections/sacred-shankha) is easier to handle.",
      },
    ],
  },
  cowrie: {
    intro:
      "Small, glossy shells once used as currency across the Indian Ocean. Today cowries are used in worship, jewellery and decoration, and our sets are sorted by size and colour.",
    faqs: [
      {
        q: "Which cowries are available?",
        a: "Counted [sets](/collections/cowrie/sets) — including sets of 108 for puja and mala-making — and single [mounted](/collections/cowrie/mounted) cowries on silver feet for display. Cowrie jewellery is in [women's chains](/collections/womens-chains) and [earrings](/collections/womens-earrings).",
      },
      {
        q: "Why sets of 108?",
        a: "108 is a sacred number in Vedic tradition — a japa mala has 108 beads — so cowries are often counted in 108s for offerings and counting rounds.",
      },
    ],
  },
  "collector-shells": {
    intro:
      "Natural specimens chosen for rare form, pattern or colour — from spider conches and murex to the nautilus. Each is cleaned, documented and shipped with care.",
    faqs: [
      {
        q: "Are collector shells ethically sourced?",
        a: "Our shells are bought from established traders and are not taken live for this collection. Ask a [Client Advisor](/contact) for the details recorded for any specimen.",
      },
      {
        q: "How should I display a collector shell?",
        a: "Keep it out of direct sunlight, which fades colour, and dust it with a soft brush. A small stand or a glass case protects fragile spines.",
      },
    ],
  },
};
