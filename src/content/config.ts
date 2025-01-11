import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    readtime: z.number(),
    date: z.preprocess(
      (value) => {
        if (typeof value === "string") {
          // Intenta convertir el string a Date
          const [day, month, year] = value.split("-");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      },
      z.date().refine(
        (date) => !isNaN(date.getTime()), // Valida que sea una fecha válida
        { message: "El campo debe ser una fecha válida en formato DD-MM-YYYY" },
      ),
    ),
    description: z.string(),
    finished: z.boolean(),
  }),
});

const intro = defineCollection({});

export const collections = { blogs, intro };
