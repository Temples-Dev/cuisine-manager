import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

import { cuisinesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";







// Schema
const cuisineSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  originCountry: z.string(),
  isVegetarianFriendly: z.boolean(),
  image: z.string().url(),
});

// Routes
export const cuisineRouter = createTRPCRouter({
  // Get all cuisines
  getAllCuisine: publicProcedure.query(async ({ctx}) => {
    return await ctx.db.select().from(cuisinesTable);
  }),

  // Get one by ID
  getCuisine: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx,input }) => {
      const result = await ctx.db
        .select()
        .from(cuisinesTable)
        .where(eq(cuisinesTable.id, input.id));
      return result[0] || null;
    }),

  // Create new cuisine
  createCuisine: publicProcedure
    .input(cuisineSchema)
    .mutation(async ({ctx, input }) => {
      const result = await ctx.db.insert(cuisinesTable).values(input).returning();
      return result[0];
    }),

  // Update a cuisine
  updateCuisine: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: cuisineSchema.partial(), // Allow partial updates
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(cuisinesTable)
        .set(input.data)
        .where(eq(cuisinesTable.id, input.id))
        .returning();
      return result[0];
    }),

  // Delete a cuisine
  deleteCuisine: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(cuisinesTable)
        .where(eq(cuisinesTable.id, input.id))
        .returning();
      return result[0];
    }),



});
