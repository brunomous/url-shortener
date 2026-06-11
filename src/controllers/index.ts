import { type Request, type Response } from "express";

export const createShortUrl = (req: Request, res: Response) => {
  res.send("Hello, world! Captured a creation request.");
};

export const redirectToOriginalUrl = (req: Request, res: Response) => {
  res.send("Hello, world! Captured a redirect request.");
};
