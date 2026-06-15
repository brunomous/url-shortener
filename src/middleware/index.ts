import { type ZodType } from "zod";
import { type Request, type Response, type NextFunction } from "express";

export function validate(schema: ZodType, source: "body" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    req[source] = result.data;
    next();
  };
}
