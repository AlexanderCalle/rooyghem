# Title of endpoint

Description of endpoint

## Request info

**URL**: /contact/

**Method**: `POST`

**Auth required**: NO

**Body data**:
```json
{
    naam: name of person that wants to make contact,
    onderwerp: subject of contact,
    email: name of person that wants to make contact,
    bericht: content of contact
}
```

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