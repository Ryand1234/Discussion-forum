# APIs For Backend of Discussion Forum

## Authentication Routes
### Register
`/user/register` Method Type : POST

Require
```
{
  name
  email
  password
  mobile
  username
}
```

Return

```
{
  "msg" : "User Registered"
}
```

### Login
`/user/login` Method Type : POST

Require
```
{
  email
  password
}
```

Return

```
{
  "msg" : "User Logged In"
}
```

### Profile
`/user/profile`  Method Type: GET

Return
```
{
  name : user's name,
  mobile : user's mobile,
  email : user's email
}
```

### Public Profile
`/user/:id`  Method Type : GET


Return
```
{
  name : user's name,
  mobile : user's mobile,
  email : user's email
}
```


### Logout
`/user/logout`  Method Type : GET

Return
```
{
  "msg" : "User Logged Out"
}
```


### Update Profile
`/user/update`  Method Type : POST


Optional
```
{
  name
  mobile
  username
}
```

Return 
```
{
  "msg" : "Profile Updated"
}
```


## Thread Routes
### Create Thread
`/thread/new`  Method Type: POST

Require
```
{
  topic
  category
  thread
}
```

Return
```
{
  "msg" : "Thread Created"
}
```

### Show All Threads
`/thread/all`  Method Type : GET

Return 

` Array of All the Threads `


### Single Thread
`/thread/:id`  Method Type: GET


### Making Comment on a Thread
`/thread/comment`  Method Type: POST

Require
```
{
  txt
}
```

Return

` Updated Thread `


### Like a Thread
`/thread/like/:id` Method Type: GET

Return 

`  Updated Thread `

### Disike a Thread
`/thread/dilike/:id` Method Type: GET

Return 
`  Updated Thread `
