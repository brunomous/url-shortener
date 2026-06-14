import { type Request, type Response } from "express";
import { shortenUrl, getOriginalUrl } from "../services";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    if (!body?.url) {
      res.status(400).send("Orignal URL is required for this operation.");
    }
    const shortUrl = await shortenUrl(
      body.url,
      req.protocol,
      req.get("host") || "",
    );
    res.status(201).send({ shortUrl });
  } catch {
    res.status(500).send("Internal server error");
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      res.status(400).send("URL slug is required for this operation.");
    }
    const originalUrl = await getOriginalUrl(slug as string);
    if (!originalUrl) {
      res.status(404).send("Original URL not found!");
    }
    res.redirect(originalUrl);
  } catch {
    res.status(500).send("Internal server error");
  }
};
