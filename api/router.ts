import { authRouter } from "./auth-router";
import { sectionRouter } from "./section-router";
import { settingRouter } from "./setting-router";
import { contactRouter } from "./contact-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  section: sectionRouter,
  setting: settingRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
