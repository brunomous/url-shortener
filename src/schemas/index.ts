import * as zod from "zod";

export const CreateShortUrlSchema = zod.object({
  url: zod.url(),
});

export const SlugParamsSchema = zod.object({
  slug: zod.string(),
});
