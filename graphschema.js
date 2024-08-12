export const typeDefs = `#graphql
type User{
    id: Int,
    name: String,
    popularity: Int
    articles: [Article]
}

type Article{
    id: Int,
    link: String,
    ownerId: Int
}

type Query{
    getUsers: [User]
    getUser(id: Int): User
}

type Mutation{
    createUser(name: String, popularity: Int): String
    createArticle(link: String, ownerId: Int): String
    updateUser(id: Int, name: String, popularity: Int): String
    updateArticle(id: Int, link: String): String
    deleteUser(id: Int): String
    deleteArticle(id: Int): String
}
`
