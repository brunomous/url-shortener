import * as zod from "zod";

export const ShorteningPayloadSchema = zod.object({
  url: zod.url(),
});

export const RedirectParamsSchema = zod.object({
  slug: zod.string(),
});
