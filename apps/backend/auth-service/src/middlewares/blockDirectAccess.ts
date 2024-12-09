function blockDirectAccess(req: any, res: any, next: any) {
  const allowedHeader = req.headers["x-api-gateway-header"];

  if (allowedHeader && allowedHeader === "http://localhost:3000") {
    next(); // Allow the request if the header is present and valid
  } else {
    res.status(403).json({ message: "Forbidden: Direct access not allowed" });
  }
}
