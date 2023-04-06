import { Flora } from "../generated/resolvers-types";
import crypto from "crypto";

// Normally this data would be fetched from the DB
const flora = new Set([
  {
    id: "61f9b9a2-4694-4b24-84f1-d5bd017bfbf0", // Manual UUID for testing
    title: "Saltbush",
    uses: "Traditionally ground and roasted for damper but the leaves are now mostly used as a wrap around meat or fish, in salads or as a leafy bed for grilled meat or vegetables.",
  },
  {
    id: crypto.randomUUID(),
    title: "Madeira vine",
    uses: "Leaves are boiled or fresh in salads, flowers are used in salads and the roots can be roasted like potatoes.",
  },
  {
    id: crypto.randomUUID(),
    title: "Ilyarnayt",
    uses: "The seeds can be ground into a paste and used for making damper (bread).",
  },
  {
    id: crypto.randomUUID(),
    title: "Myrtle",
    uses: "Mirto is one of the most typical drinks of Sardinia and comes in two varieties: mirto rosso (red) produced by macerating the berries. The berries, whole or ground, can be used as a pepper substitute.",
  },
] satisfies Flora[]);

export default flora;
