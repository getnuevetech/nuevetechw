import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import * as schema from "@db/schema";
import { eq } from "drizzle-orm";

export const sectionRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(schema.sections);
  }),

  getByKey: publicQuery
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(schema.sections)
        .where(eq(schema.sections.key, input.key));
      return results[0] ?? null;
    }),

  upsert: adminQuery
    .input(
      z.object({
        key: z.string().min(1),
        title: z.string().optional(),
        content: z.string().optional(),
        meta: z.any().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(schema.sections)
        .where(eq(schema.sections.key, input.key));

      if (existing.length > 0) {
        const updateData: Record<string, unknown> = {};
        if (input.title !== undefined) updateData.title = input.title;
        if (input.content !== undefined) updateData.content = input.content;
        if (input.meta !== undefined) updateData.meta = input.meta;

        await db
          .update(schema.sections)
          .set(updateData)
          .where(eq(schema.sections.key, input.key));
        return { key: input.key, action: "updated" };
      } else {
        await db.insert(schema.sections).values({
          key: input.key,
          title: input.title,
          content: input.content,
          meta: input.meta,
        });
        return { key: input.key, action: "created" };
      }
    }),

  delete: adminQuery
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.sections).where(eq(schema.sections.key, input.key));
      return { key: input.key, action: "deleted" };
    }),
});
