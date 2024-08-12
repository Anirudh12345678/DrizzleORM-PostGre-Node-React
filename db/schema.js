import { Many, max, relations } from 'drizzle-orm';
import { char, integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    popularity: integer("score")
})

export const userRelations = relations(users, ({many}) => ({
    articles: many(articles)
}))

export const articles = pgTable("articles",{
    id: serial("id").primaryKey(),
    link: char("link", {length: 200}),
    ownerId: integer("ownerId").references(() => users.id, {onDelete: 'cascade'})
})

export const articleRelation = relations(articles, ({one}) => ({
    owner: one(users,{
        fields: [articles.ownerId],
        references: [users.id]
    })
}))
