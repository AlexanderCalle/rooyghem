# Contact information

Get contact information of bondsteam

## Request info

**URL**: /contact/

**Method**: `GET`

**Auth required**: NO

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    bondsleiders: [{
        firstname: first name of bondsleider,
        lastname: last name of bondsleider,
        email: emailadress of bondsleider,
        user_id: id of bondsleider,
        picture: url to picture of bondsleider
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

# Send email

Send email to bondsteam

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

# Forgot password

Forgot password. Will send email with link to reset the password

## Request info

**URL**: /forgot/

**Method**: `POST`

**Auth required**: User

**Body data**:
```json
{
    email: email of user
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

### Database error

**Condition**: consulting database threw error

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
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

### Unable to update database

**Condition**: Database could not be updated

**Code**: `500 INTERNAL SERVER ERROR`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```