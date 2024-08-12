import { gql } from "@apollo/client"
export const USERS = gql`
        query{
  getUsers {
    id
    name
    popularity
    articles {
      id
      link
    }
  }
}
`

export const createArticle = gql`
  mutation m($link: String, $OwnerId: Int){
  createArticle(link: $link, ownerId: $OwnerId)
}
`
export const updateUser = gql`mutation UpdateUser($Id: Int, $name: String, $popularity: Int) {
  updateUser(id: $Id, name: $name, popularity: $popularity)
}`

export const addUser = gql`mutation CreateUser($name: String, $popularity: Int) {
  createUser(name: $name, popularity: $popularity)
}`
export const deleteArticle = gql`mutation DeleteArticle($deleteArticleId: Int) {
  deleteArticle(id: $deleteArticleId)
}`

export const deleteUser = gql`mutation DeleteUser($Id: Int) {
  deleteUser(id: $Id)
}`