import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const ordersAttendees = sqliteTable('order_attendees', {
  id: integer('id').primaryKey(),
  attendee_id: text('ticket_id').notNull(),
  seat_number: integer('seat_number'),
  order_id: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export type InsertUser = typeof orders.$inferInsert;
export type SelectUser = typeof orders.$inferSelect;

export type InsertPost = typeof ordersAttendees.$inferInsert;
export type SelectPost = typeof ordersAttendees.$inferSelect;
