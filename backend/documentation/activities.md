# Get all activities

Get all activities

## Request info

**URL**: /activities/

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    activities: [
        {
            activitiy_id: id,
            title: title,
            start_date: start date,
            end_date: end date,
            meetingpoint: meeting point,
            description: description,
            start_publication: start of publication,
            end_publication: end of publication,
            group_id: id of group
        }
    ]
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
    error: error message
}
```

# Get all activities of user

Get all activities belonging to a logged in user

## Request info

**URL**: /activities/me

**Method**: `GET`

**Auth required**: User

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    activities: [
        {
            activitiy_id: id,
            title: title,
            start_date: start date,
            end_date: end date,
            meetingpoint: meeting point,
            description: description,
            start_publication: start of publication,
            end_publication: end of publication,
            group_id: id of group
        }
    ]
}
```

## Error Response

### Not logged in

**Condition**: User is not logged in

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: Log in before consulting this endpoint
}
```

### Problems consulting database

**Condition**: Problem consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

# Get activity by id

Get details of activitiy by id

## Request info

**URL**: /activities/:activity_id

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    activity: {
        activity_id: id,
        title: title,
        start_date: start date,
        end_date: end date,
        meetingpoint: meeting point,
        description: description,
        start_publication: start of publication,
        end_publication: end of publication,
        group_id: id of group
    }
}
```

## Error Response

### Database error

**Condition**: Problems consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: error message
}
```

### Activity not found

**Condition**: No activity found with given id

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Activity not found
}
```

# Create new activity

Create new activity

## Request info

**URL**: /activities/create/

**Method**: `POST`

**Auth required**: Auth

**Body data**:
```json
{
    title: title of new activity,
    start_date: start date of new activity,
    end_date: end date of new activity,
    meetingpoint: meeting point of activity,
    description: description of activity,
    start_publication: when to start showing the activity,
    end_publication: when to end showing the activity,
    group_name: name of group of the activity
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Created activity succesfully
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
    error: error message
}
```

### Database error

**Condition**: Problems consulting the database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### Not authorised

**Condition**: User tries to create activity for other group

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: Cannot create activities for another group
}
```

# Delete activity

Description of endpoint

## Request info

**URL**: /activities/delete/:activity_id

**Method**: `GET`

**Auth required**: Auth

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Deleted activity succesfully
}
```

## Error Response

### Database error

**Condition**: Could not delete from database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

# Update activity

Update existing activity

## Request info

**URL**: /activities/update/:activity_id

**Method**: `PUT`

**Auth required**: Auth

**Body data**:
```json
{
    title: new title of activity,
    start_date: new start date of activity,
    end_date: new end date of activity,
    meetingpoint: new meeting point of activity,
    description: new description of activity,
    start_publication: when to start showing the activity,
    end_publication: when to end showing the activity,
    group_name: name of group of the activity
}
```

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    message: Activity updated succesfully
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
    error: errormessage
}
```

### Database error

**Condition**: Could not update database

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
    statuscode: 400,
    error: errormessage
}
```

### No authorization

**Condition**: User tries to update activity of other group

**Code**: `401 NO AUTHORIZATION`

**Content**:
```json
{
    statuscode: 401,
    error: Cannot update activity from another group
}
```