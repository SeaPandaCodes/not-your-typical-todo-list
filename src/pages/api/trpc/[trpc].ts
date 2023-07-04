import "dotenv/config";
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import ms from "ms";

const sessionCookie = "task_app_session";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async ({ req, res }) => {
    // Parse browser cookies, check for task_app_session
    const sessionToken = cookie.parse(req.headers.cookie ?? "")[sessionCookie];
    // Assume no user
    let userId: string | undefined = undefined;

    // If session cookie attempt to parse
    if (sessionToken) {
      try {
        // Parse out payload from cookie
        const payload = jwt.verify(
          sessionToken,
          process.env.JWT_SECRET!
        ) as any;
        userId = payload.userId;
      } catch {}
    }

    if (userId === undefined) {
      userId = crypto.randomBytes(16).toString("hex");
      // Initialize db
      // await create sample tasks
      // await create sample rewards
    }

    const newSessionToken = jwt.sign({ userId }, process.env.JWT_SECRET!);

    const newCookie = cookie.serialize(sessionCookie, newSessionToken, {
      maxAge: ms("100d") / 1000,
      path: "/",
      httpOnly: true,
    });

    res.setHeader("Set-Cookie", newCookie);

    return { userId };
  },
});
