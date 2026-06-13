import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer({ mode: 'boolean' }).notNull().default(false),
	image: text(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull()
});

export const session = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text().notNull(),
	token: text().notNull(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull()
});

export const account = sqliteTable('account', {
	id: text().primaryKey(),
	userId: text().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	accessTokenExpiresAt: integer({ mode: 'timestamp' }),
	refreshTokenExpiresAt: integer({ mode: 'timestamp' }),
	scope: text(),
	idToken: text(),
	password: text(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull()
});

export const verification = sqliteTable('verification', {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	createdAt: integer({ mode: 'timestamp' }).notNull(),
	updatedAt: integer({ mode: 'timestamp' }).notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));

export type DbUser = typeof user.$inferSelect;
export type DbSession = typeof session.$inferSelect;
