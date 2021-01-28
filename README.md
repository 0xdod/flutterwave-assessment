# A Rule Validation API

This is a simple API built with expressJs for the flutterwave intern task. It validates a certain rule against a specified conditon.

-   GET / -> returns my data
-   POST /validate-rule -> performs rule validation logic and returns data indicating success or failure

## Setup

-   clone the repo
-   install dependencies
-   run npm start

### Running

-   Make sure to have node >= 12
-   run npm start
-   use your favorite API testing tools to send requests.
    OR
    You can test it live via [this url](https://)

### Testing

## Example

The following are usage examples

###### Request Payload

```json
{
	"rule": {
		"field": "missions",
		"condition": "gte",
		"condition_value": 30
	},
	"data": {
		"name": "James Holden",
		"crew": "Rocinante",
		"age": 34,
		"position": "Captain",
		"missions": 45
	}
}
```

###### Response: (HTTP 200)

```json
{
	"message": "field missions successfully validated.",
	"status": "success",
	"data": {
		"validation": {
			"error": false,
			"field": "missions",
			"field_value": 45,
			"condition": "gte",
			"condition_value": 30
		}
	}
}
```

###### Request Payload

```json
{
	"rule": {
		"field": "0",
		"condition": "eq",
		"condition_value": "a"
	},
	"data": "damien-marley"
}
```

###### Response: (HTTP 400)

```json
{
	"message": "field 0 failed validation.",
	"status": "error",
	"data": {
		"validation": {
			"error": true,
			"field": "0",
			"field_value": "d",
			"condition": "eq",
			"condition_value": "a"
		}
	}
}
```

###### Request Payload

```json
{
	"rule": {
		"field": "5",
		"condition": "contains",
		"condition_value": "rocinante"
	},
	"data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
}
```

###### Response: (HTTP 400)

```json
{
	"message": "field 5 is missing from data.",
	"status": "error",
	"data": null
}
```
