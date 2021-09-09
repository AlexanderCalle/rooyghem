# Get all groups

Get all groups

## Request info

**URL**: /groups/

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    groups: [
        {
            group_id: id of group,
            name: name of group,
            story: story of group,
            logo: url to logo of group,
            location_id: id of home location of group
        }
    ]
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

# Group logo

Get logo of group

## Request info

**URL**: /groups/:group_name/logo

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: Logo of group as seperate file

## Error Response

### Problems consulting database

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

**Condition**: Coudn't find group

**Code**: `404 NOT FOUND`

**Content**:
```json
{
    statuscode: 404,
    error: Group not found
}
```

# Group information

Get information of group

## Request info

**URL**: /groups/:group_name/info

**Method**: `GET`

**Auth required**: NO

**Body data**:

## Success response

**Code**: `200 OK`

**Content**: 
```json
{
    group: {
        group_id: id,
        name: name of group,
        story: story of group,
        logo: url to logo,
        location_id: id of home location
    },
    location: {
        location_id: id,
        name: name of location,
        adress: adress of location,
        picture: url to picture of location
    },
    leaders: [
        {
            firstname: first name of leader,
            lastname: last name of leader,
            email: email of leader,
            is_banleader: boolean if it is the banleader,
            picture: url to picture of leader
        }
    ],
    activities: [
        {
            activity_id: id,
            title: title of activity,
            start_date: start date of activity,
            end_date: end date of activity,
            meetingpoint: meeting point of activity,
            description: description of activity,
            start_publication: start of publication,
            end_publication: end of publication,
            group_id: id of group
        }
    ],
    albums: [
        {
            date: work year where activity of album took place (for example: '2020-2021')
            albums: [
                {
                    album_id: id,
                    name: name of album,
                    group_id: id of group,
                    description: description of album,
                    activity_start: start of activity where pictures where taken,
                    activity_end: end of activity where pictures where taken,
                    creation_date: date of creation,
                    checked: boolean to indicate if it has been checked,
                    aprroved_by: user that approved,
                    approved_on: date of approval
                }
            ]
        }
    ]
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

# Activities of group

Get activities of group

## Request info

**URL**: /groups/:group_name/info/activities

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
            id: id of activity,
            title: title of activity,
            start: start date,
            end: end date,
            meetingpoint: meeting point of activity
        }
    ]
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