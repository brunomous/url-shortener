import { Router } from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controllers";
import { validate } from "../middleware";
import { ShorteningPayloadSchema, RedirectParamsSchema } from "../schemas";

const router = Router();

router.post("/", validate(ShorteningPayloadSchema, "body"), createShortUrl);

router.get(
  "/:slug",
  validate(RedirectParamsSchema, "params"),
  redirectToOriginalUrl,
);

export { router };
