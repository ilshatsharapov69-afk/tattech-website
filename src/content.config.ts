import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroTitle: z.string(),
    heroLead: z.string(),
    heroPills: z.array(z.string()).max(4).default([]),
    icon: z.string(),
    included: z
      .array(
        z.object({
          title: z.string(),
          desc: z.string().optional(),
        })
      )
      .min(3)
      .max(6),
    pricing: z
      .object({
        lead: z.string().optional(),
        tiers: z
          .array(
            z.object({
              label: z.string(),
              price: z.string(),
              note: z.string().optional(),
              primary: z.boolean().default(false),
            })
          )
          .min(1)
          .max(4),
        footnote: z.string().optional(),
      })
      .optional(),
    itsHighlight: z.enum(['tehno', 'prof', 'none']).optional(),
    relatedSlugs: z.array(z.string()).max(4).default([]),
    casesEyebrow: z.string().default('Опыт в отрасли'),
    casesTitle: z.string(),
    casesLead: z.string().optional(),
    caseTags: z.array(z.string()).min(1).max(8),
    faqEyebrow: z.string().default('Частые вопросы'),
    faqTitle: z.string().default('Что чаще всего спрашивают'),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .min(3)
      .max(6),
    order: z.number().default(99),
  }),
});

export const collections = { services };
