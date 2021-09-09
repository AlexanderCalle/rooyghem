# All published newsfeeds

Get all newsfeeds that should be shown

## Request info

**URL**: /newsfeeds/

**Method**: `GET`

**Auth required**: NO

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    newsfeeds: [{
        feed_id: id of feed,
        title: title of feed,
        description: description of feed,
        start_publication: start of publication,
        end_publication: end of publication,
        picture_path: url to picture,
        created_by: id of user that created newsfeed
    }]
}
```

## Error Response

**Condition**: Something went wrong consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

# Picture of newsfeed

Get picture of newsfeed

## Request info

**URL**: /newsfeeds/:feed_id/picture

**Method**: `GET`

**Auth required**: NO

## Success response

**Code**: `200 OK`

**Content**: 
The image as file

## Error Response

**Condition**: Something went wrong consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

# New feed

Create new feed

## Request info

**URL**: /newsfeeds/create

**Method**: `POST`

**Auth required**: Admin

**Body data**:
```json
{
    title: title of new feed,
    description: description of new feed,
    start_publication: start of publication,
    end_publication: end of publication,
    file: picture of newsfeed (send as seperate file)
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Feed succesfully created
}
```

## Error Response

### Database error

**Condition**: Something went wrong consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

### No picture

**Condition**: No picture was given

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: No picture was given
}
```

### Authorization error

**Condition**: User is not Authorized (not an admin)

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: you cannot access this
}
```

# Delete newsfeed

Delete newsfeed

## Request info

**URL**: /newsfeeds/delete/:id

**Method**: `GET`

**Auth required**: Admin

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Feed deleted succesfully
}
```

## Error Response

### Database error

**Condition**: Something went wrong consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

### Authorization error

**Condition**: User is not Authorized (not an admin)

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: you cannot access this
}
```

# Update newsfeed

Update existing newsfeed

## Request info

**URL**: /newsfeeds/update/:id

**Method**: `PUT`

**Auth required**: Admin

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Feed updated succesfully
}
```

## Error Response

### Database error

**Condition**: Something went wrong consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

### Authorization error

**Condition**: User is not authorized (not an admin)

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: you cannot access this
}
```