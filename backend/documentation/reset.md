# Reset password

Reset password using token

## Request info

**URL**: /reset/:token

**Method**: `POST`

**Auth required**: NO

**Body data**:
```json
{
    password: new password,
    confirm: confirmation of new password
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Password was changed
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

### Invalid token

**Condition**: Token not found

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Invalid token
}
```

### No matching passwords

**Condition**: Passwords did not match

**Code**: `400 BAD REQUEST` 

**Content**:
```json
{
    statuscode: 400,
    error: Passwords did not match
}
```