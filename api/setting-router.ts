import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const settingRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.siteSettings);
  }),

  getByKey: publicQuery
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.key, input.key));
      return results[0]?.value ?? null;
    }),

  upsert: adminQuery
    .input(
      z.object({
        key: z.string().min(1),
        value: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.key, input.key));

      if (existing.length > 0) {
        await db
          .update(schema.siteSettings)
          .set({ value: input.value })
          .where(eq(schema.siteSettings.key, input.key));
        return { key: input.key, action: "updated" };
      } else {
        await db.insert(schema.siteSettings).values({
          key: input.key,
          value: input.value,
        });
        return { key: input.key, action: "created" };
      }
    }),
});
