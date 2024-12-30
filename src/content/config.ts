import { defineCollection, z } from "astro:content";
// z -> zod schema
//
const blogs = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		readtime: z.number(),
		date: z.string(), // change to date
		description: z.string(),
	})
})

export const collections = { blogs }
