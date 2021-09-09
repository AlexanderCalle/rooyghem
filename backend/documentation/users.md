# Get all users

Get all users

## Request info

**URL**: /users/

**Method**: `GET`

**Auth required**: Admin

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    users: {
        user_id: id of leader
        firstname: first name of leader,
        lastname: last name of leader,
        email: email of leader,
        is_banleader: boolean indicating if leader is banleader,
        picture: URL to picture of leader
    }
}
```

## Error Response

### Database error

**Condition**: Could not read database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### Unauthorized access

**Condition**: User has no authorization

**Code**: `403 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 403,
    error: User not authorized
}
```

# User by id

Get detailed info about user by id

## Request info

**URL**: /users/single/:id

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    user: {
        user_id: id of user,
        firstname: first name of user,
        lastname: last name of user,
        email: email of user,
        is_admin: boolean indicating if user is admin,
        username: username of user,
        phone: phone number,
        group_id: id of group,
        bondsteam: string indicating the role in bondsteam,
        is_banleader: boolean indicating if user is banleader,
        picture: URL to picture of user
    }
}
```

## Error Response

### Database error

**Condition**: Problem consulting database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### User not found

**Condition**: Could not find user with user id

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Could not find user
}
```

# Picture of user

Get picture of user

## Request info

**URL**: /users/single/:id/picture

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: picture as seperate file

## Error Response

### Database error

**Condition**: Problem consulting database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### User not found

**Condition**: Could not find user with user id

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Could not find user
}
```

# Create new user

Create new user

## Request info

**URL**: /users/create/

**Method**: `POST`

**Auth required**: Admin

**Body data**:
```json
{
    firstname: first name of new user,
    lastname: last name of new user,
    email: email of new user,
    username: username of new user,
    password: default standard password,
    phone: phone number of new user,
    is_admin: boolean indicating if user is admin (default: false), 
    bondsteam: string indicating role in bondsteam,
    group_id: id of group user belongs to,
    is_banleader: boolean indicating if user is banleader (default: false)
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: User was created
}
```

## Error Response

### Database error

**Condition**: Could not update database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: Gelieve alle velden in te vullen
}
```

### Duplicate username

**Condition**: Create new user with existing username

**Code**: `409 CONFLICT`

**Content**:
```json
{
    statuscode: 409,
    error: Username already exists
}
```

### Unauthorized access

**Condition**: User has no authorization

**Code**: `403 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 403,
    error: User is not authorized
}
```

### Incomplete data

**Condition**: No picture was uploaded

**Code**: `422 UNPROCESSABLE ENTITY`

**Content**:
```json
{
    statuscode: 422,
    error: No picture was found
}
```

# Log in

Log in with username and password credentials

## Request info

**URL**: /users/login

**Method**: `POST`

**Auth required**: NO

**Body data**:
```json
{
    username: username,
    password: password
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Login succesfull
}
```

## Error Response

### Database error

**Condition**: Database could not be read

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### User not found

**Condition**: Username doesn't exist in database

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Username doesn't exist
}
```

### Wrong password

**Condition**: Password was wrong

**Code**: `401 UNAUTHORIZED`

**Content**:
```json
{
    statuscode: 401,
    error: Password is wrong
}
```

### Incomplete information

**Condition**: Username or password was not set

**Code**: `401 UNAUTHORIZED`

**Content**:
```json
{
    statuscode: 401,
    error: errormessage
}
```

# Log out

Log out user

## Request info

**URL**: /users/logout

**Method**: `GET`

**Auth required**: User

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Logged out succesfully
}
```

## Error Response

### Database error

**Condition**: Could not read database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### Not logged in

**Condition**: There was no jwt token in the cookies

**Code**: `401 UNAUTHORIZED`

**Content**:
```json
{
    statuscode: 401,
    error: You cannot access this
}
```

# Update user

Description of endpoint

## Request info

**URL**: /users/single/:id

**Method**: `PUT`

**Auth required**: Admin

**Body data**:
```json
{
    firstname: first name of new user,
    lastname: last name of new user,
    email: email of new user,
    username: username of new user,
    password: default standard password,
    phone: phone number of new user,
    is_admin: boolean indicating if user is admin (default: false), 
    bondsteam: string indicating role in bondsteam,
    group_id: id of group user belongs to,
    is_banleader: boolean indicating if user is banleader (default: false)
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: User was updated
}
```

## Error Response

### Database error

**Condition**: Could not read database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### User not found

**Condition**: User id not found in database

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: User not found
}
```

### Duplicate username

**Condition**: New username is already in use

**Code**: `409 CONFLICT`

**Content**:
```json
{
    statuscode: 409,
    error: Username already in use
}
```

# Delete user

Delete user

## Request info

**URL**: /users/delete/single/:id

**Method**: `GET`

**Auth required**: Admin

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: User was deleted
}
```

## Error Response

### Database error

**Condition**: Could not read database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### Unauthorized

**Condition**: User not authorized

**Code**: `403 UNAUTHORIZED`

**Content**:
```json
{
    statuscode: 403,
    error: You cannot access this
}
```