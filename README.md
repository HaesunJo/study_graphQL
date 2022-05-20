# Practice GraphQL(query language) and node.js on the side

## See the differences with REST

### What is an API and REST API?

- 🤔 API? Application Programming Interface 
	- Everything has interface such as TV remote controller, could be a menu at the restaurant!
	You can interact with those interfaces.


- 🤔 REST API? You need url to communicate with a server
	- example: youtube.com/watch?id=1234
	it just a bunch of urls like this: https://developer.twitter.com/en/docs/api-reference-index
	send a request and get response as json, pick what you want in json


- 🤔 REST + HTTP Methods -> get, post, put, delete ...

---

### GraphQL
- It is a specification.
- fixes over-fetching problem of REST API ⤵️


| REST                                                          | GQL       |
| ------------------------------------------------------------- | --------- |
|REST loads a lot of data that I didn't want to get but I have to get everything (litterally too much information, takes time to load -> slow) | I can ask data exactly what I need no over-fetching|
                                   





- uder-fetching ⤵️


| REST                                                          | GQL       |
| ------------------------------------------------------------- | --------- |
| when I use REST API to get a specific data such as city I might send two or three resquets to get the data I need | under-fetching is fetch less then what I need (take less time to load -> fast). 'Get many resources in a single request' |



#### get anything more or anything less

```json
/* send request like this :
{
	allFilms {
		totalCount
		films {
			title
		}
	}
}
*/

/* then it will response : */
{
"data": {
		"allFilms": {
			"totalCount": 6,
			"films": [
				{
					"title": "A New Hope"
				},
				{
					"title": "The Empire Strikes Back"
				},
				{
					"title": "Return of the Jedi"
				},
				{
					"title": "The Phantom Menace"
				},
				{
					"title": "Attack of the Clones"
				},
				{
					"title": "Revenge of the Sith"
				}
			]
		}
	}
}

/* more information?

 request:
{
	allFilms {
		totalCount
		films {
			title
		}
	}

	allPeople{
		totalCount
		people {
			name
			hairColor
			eyeColor
		}
	}
}
*/
/* response */
{
"data": {
	"allFilms": {
		"totalCount": 6,
		"films": [
			{
				"title": "A New Hope"
			},
			{
				"title": "The Empire Strikes Back"
			},
			{
				"title": "Return of the Jedi"
			},
			{
				"title": "The Phantom Menace"
			},
			{
				"title": "Attack of the Clones"
			},
			{
				"title": "Revenge of the Sith"
			}
		]
	},
	"allPeople": {
		"totalCount": 82,
		"people": [
			{
				"name": "Luke Skywalker",
				"hairColor": "blond",
				"eyeColor": "blue"
			},
			{
				"name": "C-3PO",
				"hairColor": "n/a",
				"eyeColor": "yellow"
			},
			{
				"name": "R2-D2",
				"hairColor": "n/a",
				"eyeColor": "red"
			},
			{
				"name": "Darth Vader",
				"hairColor": "none",
				"eyeColor": "yellow"
			},
			{
				"name": "Leia Organa",
				"hairColor": "brown",
				"eyeColor": "brown"
			},
			{
				"name": "Owen Lars",
				"hairColor": "brown, grey",
				"eyeColor": "blue"
			},
			{
				"name": "Beru Whitesun lars",
				"hairColor": "brown",
				"eyeColor": "blue"
			}
	}
}
```


## 🤩 start GraphQL

### ✅ prep :


- initialize node repository


```console
		npm init -y
```

- install apollo server and graphql


```console
		npm install apollo-server graphql
```

- install nodemon as a development dependencies


```console
		npm install nodemon -D
```


- create server file called server.js

```console
		npm install touch
		touch server.js
		touch .gitignore
```

- add node_modules/ in gitignore file to initialize git repository

```console
		git init .
```


### ✅ change and add

- change "test" to "dev" in script and add type

```json
	"scripts": {
			"dev": "nodemon server.js"
		},

		"type":"module"
```


### ✅ import server
- if "type":"module" is added

```javascript
import { ApolloServer, gql } from "apollo-server";
```

- if not,

```javascript
const { ApolloerServer, gql } = require("apollo-server");
```


### ✅ check and test npm run dev
```console
$ npm run dev

> lab01_graphql@1.0.0 dev
> nodemon server.js

[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
[nodemon] clean exit - waiting for changes before restart
```

## 🆗 Ready to go 🤞



------

## 📋 Documentation 📋


- add """ description """ above that you want to decribe 

```javascript

type User {
	id: ID!
	"""
	is the sum of firstName and lastName as a string
	"""
	fullname: String!
	firstName: String!
	lastName: String!
}

```


#### ❗❗ conflict in the windows OS

- err msg
	it's because PowerShell security policy

```console
\haesun\lab01_graphQL> touch server.js
touch : File C:...\npm\touch.ps1 cannot be loaded because running scripts is disabled on this system. For   
more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ touch server.js
+ ~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

- run this code in PowerShell

```console
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```