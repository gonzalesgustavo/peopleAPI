# Persons API
---

This restful API is built using NodeJs with Typescript. Currently it uses a API key to gain access to the routes using the Register and Login routes. Currently this is still in development so more options will come.  

## Routes
---

To Register as a user: /api/v1/register | METHOD: POST

Example Body:
```json
{
    "username" : "danGorbo",
    "email" : "dgorbo@sample.com",
    "password" : "gorbo1234"
}
```

Example Response:
```json
//access key
{
  "key": "4c000610-cdb7-11e9-85be-c152c1086161"
}
```


To get an access token (API KEy): /api/v1/getkey | METHOD: POST

Eample Body:
```json
{
    "username" : "danGorbo",
    "password" : "gorbo1234"
}
```

Example Response: (You must register in order to get a key | Keys do not expire)
```json
//access key
{
  "key": "4c000610-cdb7-11e9-85be-c152c1086161"
}
```

Get all people: /api/v1/people/:key(String) | METHOD: GET

Eample Response:
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "gender": "m",
    "age": 78,
    "medical_history": "Suffers from a wide range of illnesses. Often found wandering in dark alleys and dangerous locations. ",
    "marital_status": "single",
    "current_status": "deceased",
    "bio": "I'm a shy individual who prefers my anonymity. No one knows who I truly am. I'm lonely and forgotten. Tell me who I am. ",
    "created_at": "2019-07-13T22:03:02.000Z"
  },
  {
    "id": 3,
    "first_name": "Jane",
    "last_name": "Doe",
    "gender": "f",
    "age": 14,
    "medical_history": "Suffers from depression, drug abuse, and often times mental instability.",
    "marital_status": "widow",
    "current_status": "deceased",
    "bio": "I'm not always who I appear to be. My looks don't give me away, and although I'm forgotten everyone is silently sad to hear I'm gone.",
    "created_at": "2019-07-13T22:08:25.000Z"
  }
]
```

Get a single person: /api/v1/people/:key(String)/:id(numeric) | METHOD: GET

Eample query string:

/api/v1/people/person?key="4c000610-cdb7-11e9-85be-c152c1086161"&id=1

Example Response:
```json
{
  "person": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "gender": "m",
      "age": 78,
      "medical_history": "Suffers from a wide range of illnesses. Often found wandering in dark alleys and dangerous locations. ",
      "marital_status": "single",
      "current_status": "deceased",
      "bio": "I'm a shy individual who prefers my anonymity. No one knows who I truly am. I'm lonely and forgotten. Tell me who I am. ",
      "created_at": "2019-07-13T22:03:02.000Z"
    }
  ]
}
```

Add a new person: /api/v1/people/:key(String) | METHOD: POST

Eample Body:
```json
{
	"first_name": "Sam",
	"last_name": "Eod",
	"gender": "m",
	"age": 40,
	"medical_history": "Suffers from Anxiety and mental confusion", 
	"marital_status": "single",
	"current_status": "living",
	"bio": "Average build male, nothing special or anti-ordinary"
}
```
---

### ToDo's

[ ] Add JWT or expiration of key

[ ] Implement error handling 

[ ] Improve Registration and Limit keys to one per user

[ ] Improve response data to include row couts and other meaningful data

[ ] Improve registration to maintain a log of users signing up 

[ ] Create a login system

[ ] Add ability to delete a person

[ ] Add ability to update a person


### Logs
[ X ] Register

[ X ] Get key

[ X ] Get all people

[ X ] Get a single person

[ X ] Post new person