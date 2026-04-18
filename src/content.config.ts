import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const words = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/words" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Jonas Nicolaysen"),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  words,
};
