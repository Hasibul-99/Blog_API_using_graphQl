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

## Update post
updatePost(id: "60e7cd190800644fe063afc4", title: "Title 12",  body: "heLLo world ") {
    body
    id
  }

## Add Comment
addComment(comment: "First comment", postId: "60e7cd190800644fe063afc4"){
    comment,
    post{
      id
      title
    }
    user{
      id
      username
    }
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

## Comment
	
comments{
  id
  comment
  post{
    id
    title
  }
  user{
    id
    username
  }
}
  
comment(id: "60e85b5b07170a38807af6f1") {
  id
  comment
  user{
    id
  }
}