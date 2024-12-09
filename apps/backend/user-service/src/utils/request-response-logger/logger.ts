import { Request, Response, NextFunction } from "express";

function getCambodiaTime(): string {
  const date = new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Phnom_Penh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // fractionalSecondDigits: 3,
    hour12: false,
  }).format(date);
}

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { method, originalUrl } = req;
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // duration in milliseconds
    const timestamp = getCambodiaTime();
    const message = `[${timestamp}] ${method} ${originalUrl} ${res.statusCode} ${duration.toFixed(3)} ms - -`;
    console.log(message);
  });

  next();
}
