import aj from "../config/arcjet.js";

export default async function arcjetMiddleware(req, res, next) {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ message: "Too many requests" });
      if (decision.isBot())
        return res.status(403).json({ message: "Bot detected" });

      return res.status(403).json({ message: "access denied" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet middleware error: message: ${error}`);
    next(error);
  }
}
