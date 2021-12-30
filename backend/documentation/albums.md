# Get all checked albums

Get all checked albums

## Request info

**URL**: /albums/

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Vraag werd verstuurd
}
```

## Error Response

### Not everything filled in

**Condition**: Not all data was given in the request

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: Gelieve alle velden in te vullen
}
```

### Unable to send email

**Condition**: Email could not be send

**Code**: `500 INTERNAL SERVER ERROR`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```