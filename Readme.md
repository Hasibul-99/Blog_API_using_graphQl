### mutation

## Register
register(
   username: "hasibul",
   displayName: "hasib",
   email: "hasibul2@gmail.com",
   password: "123456"
)
## Login
login(email: "hasibul@gmail.com", password: "123456")

## Add Post
 addPost(title: "Post two", body: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.") {
   id 
   author {
     id
   }
   title
   body
}


### query

## Users List
users {
   id
   username
}

## User
user(id: "60e74d9941532c2b24c39ae9") {
    username
    email
}

## Posts List
posts {
    id,
    title
}

post(id: "60e7cd190800644fe063afc4") {
    id,
    title
}