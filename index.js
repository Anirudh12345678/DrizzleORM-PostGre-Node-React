import  db  from './db/connect.js'
import express from "express"
import { articles, users } from './db/schema.js'
import { typeDefs } from './graphschema.js'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { eq } from 'drizzle-orm'
const app = express()
app.use(express.json())
app.get("/users", async (req,res)=>{
    const result = await db.query.users.findMany({
        with: {
            articles: true
        }
    })
    return res.send(result);
});

const resolvers = {
    Query: {
        async getUsers(){
            const result = await db.query.users.findMany({
                with: {
                    articles: true
                }
            })
            return result;
        },

        async getUser(root,args){
            const result = await db.query.users.findFirst({
                where: eq(users.id, args.id),
                with:{
                    articles: true
                }
            })
            return result;
        }
    },
    Mutation: {
        async createUser(root,args){
            await db.insert(users).values({
                name: args.name,
                popularity: args.popularity
            })
            return "Success"
        },
        async createArticle(root,args){
            console.log("Adding")
            await db.insert(articles).values({
                ownerId: args.ownerId,
                link: args.link
            })
            return "Success"
        },
        async updateUser(root,args){
            await db.update(users).set({name: args.name, popularity: args.popularity}).where(eq(users.id,args.id))
            return "Updated"
        },
        async updateArticle(root,args){
            await db.update(articles).set({link: args.link}).where(eq(articles.id, args.id))
            return "Success"
        },
        async deleteUser(root,args){
            await db.delete(users).where(eq(users.id,args.id))
            return "Deleted"
        },
        async deleteArticle(root, args){
            await db.delete(articles).where(eq(articles.id,args.id))
            return "Deleted post"
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port : 4000}
})

app.listen(8080, ()=> {
    console.log("Server Running on 8080")
})