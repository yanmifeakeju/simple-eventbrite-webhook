import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  order_id: text('order_id').notNull().unique(),
  email: text('email').notNull(),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const ordersAttendees = sqliteTable('order_attendees', {
  id: integer('id').primaryKey(),
  attendee_id: text('attendee_id').notNull().unique(),
  order_id: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;

export type InsertOrderAttendees = typeof ordersAttendees.$inferInsert;
export type SelectOrdersAttendees = typeof ordersAttendees.$inferSelect;
