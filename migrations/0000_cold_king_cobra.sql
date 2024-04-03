CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`order_id` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order_attendees` (
	`id` integer PRIMARY KEY NOT NULL,
	`attendee_id` text NOT NULL,
	`order_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_id_unique` ON `orders` (`order_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `order_attendees_attendee_id_unique` ON `order_attendees` (`attendee_id`);