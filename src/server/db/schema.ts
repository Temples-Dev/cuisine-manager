import { pgTable, varchar, integer, boolean, text } from "drizzle-orm/pg-core";

export const cuisinesTable = pgTable("cuisines", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  description: text("description").notNull(),
  originCountry: varchar({ length: 100 }).notNull(),
  isVegetarianFriendly: boolean("is_vegetarian_friendly").notNull(),
  image: varchar({ length: 255 }).notNull(),
});
