# Location of group

Get home location of group

## Request info

**URL**: /locations/:group_name

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    location: {
        location_id: id of location,
        name: name of location,
        adress: adress of location,
        picture: URL to picture of location
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

### Group not found

**Condition**: Group name not found

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Group not found
}
```

# Picture of location

Get picture of location

## Request info

**URL**: /locations/:location_id/picture

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: Picture of location as seperate file

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

### Location not found

**Condition**: Location id not found

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Could not find location
}
```