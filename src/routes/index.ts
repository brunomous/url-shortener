import { Router } from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controllers";
import { validate } from "../middleware";
import { CreateShortUrlSchema, SlugParamsSchema } from "../schemas";

const router = Router();

router.post("/", validate(CreateShortUrlSchema, "body"), createShortUrl);

router.get(
  "/:slug",
  validate(SlugParamsSchema, "params"),
  redirectToOriginalUrl,
);

export { router };
