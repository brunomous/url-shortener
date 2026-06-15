import { type Request, type Response } from "express";
import { shortenUrl, getOriginalUrl } from "../services/url";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const shortUrl = await shortenUrl(
      body.url,
      req.protocol,
      req.get("host") || "",
    );
    res.status(201).send({ shortUrl });
  } catch (error) {
    console.error(error);
    if (Array.isArray(error)) {
      res.status(400).send(error[0].message);
    }
    res.status(500).send("Internal server error");
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const originalUrl = await getOriginalUrl(slug as string);
    if (!originalUrl) {
      res.status(404).send("Original URL not found!");
    }
    res.redirect(originalUrl);
  } catch {
    res.status(500).send("Internal server error");
  }
};
