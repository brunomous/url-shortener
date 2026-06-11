import { Router } from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controllers";

const router = Router();

router.post("/", createShortUrl);

router.get("/:code", redirectToOriginalUrl);

export { router };
